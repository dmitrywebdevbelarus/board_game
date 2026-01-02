import { suitsConfig } from "./data/SuitData";
import { ThrowMyError } from "./Error";
import { GetCardsFromSecretDwarfDeck } from "./helpers/DecksHelpers";
import { DiscardCurrentCard } from "./helpers/DiscardCardHelpers";
import { CheckValkyryRequirement } from "./helpers/MythologicalCreatureHelpers";
import { AssertMaxCurrentSuitDistinctionPlayersArray, AssertPlayerId, AssertPlayerIndex, AssertPlayerRanksForDistinctionsArray } from "./is_helpers/AssertionTypeHelpers";
import { AddDataToLog } from "./Logging";
import { TotalRank } from "./score_helpers/ScoreHelpers";
import { ErrorNames, LogNames, SuitNames, SuitRusNames, ValkyryBuffNames } from "./typescript/enums";
import type { CanBeUndef, Context, Distinctions, DwarfDeckCard, MaxCurrentSuitDistinctionPlayersArray, PlayerID, PlayerRanksAndMaxRanksForDistinctionsArray, PublicPlayer } from "./typescript/interfaces";

/**
 * <h3>Высчитывает наличие единственного игрока с преимуществом по количеству шевронов в конкретной фракции в фазе 'Смотр войск'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При подсчёте преимуществ по количеству шевронов фракций в фазе 'Смотр войск'.</li>
 * </ol>
 *
 * @param context
 * @param suit Фракция.
 * @returns Индекс единственного игрока с преимуществом по количеству шевронов фракции, если имеется.
 */
const CheckCurrentSuitDistinction = (
    { G, ctx, ...rest }: Context,
    suit: SuitNames,
): Distinctions => {
    const [
        playersRanks,
        maxRanks,
    ]: PlayerRanksAndMaxRanksForDistinctionsArray = CountPlayerRanksAndMaxRanksForCurrentDistinction(
        { G, ctx, ...rest },
        suit,
    ),
        maxPlayers: number[] = playersRanks.filter((count: number): boolean => count === maxRanks),
        suitName: SuitRusNames = suitsConfig[suit].suitName;
    AssertPlayerRanksForDistinctionsArray(maxPlayers);
    if (maxPlayers.length === 1) {
        const maxPlayerIndex: number = maxPlayers[0];
        AssertPlayerIndex(ctx, maxPlayerIndex);
        const playerDistinctionIndex: number = playersRanks.indexOf(maxPlayerIndex);
        AssertPlayerIndex(ctx, playerDistinctionIndex);
        const playerDist: CanBeUndef<PublicPlayer> = G.publicPlayers[playerDistinctionIndex],
            playerID: string = String(playerDistinctionIndex);
        AssertPlayerId(ctx, playerID);
        if (playerDist === undefined) {
            return ThrowMyError(
                { G, ctx, ...rest },
                ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
                playerDistinctionIndex,
            );
        }
        if (G.expansions.Idavoll.active) {
            CheckValkyryRequirement(
                { G, ctx, ...rest },
                playerID,
                ValkyryBuffNames.CountDistinctionAmount,
            );
        }
        AddDataToLog(
            { G, ctx, ...rest },
            LogNames.Public,
            `Преимущество по фракции '${suitName}' получил игрок: '${playerDist.nickname}'.`,
        );
        return playerID;
    }
    AddDataToLog(
        { G, ctx, ...rest },
        LogNames.Public,
        `Преимущество по фракции '${suitName}' никто не получил.`,
    );
    return undefined;
};

/**
 * <h3>Высчитывает наличие игроков с преимуществом по количеству шевронов конкретной фракции.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При подсчёте преимуществ по количеству шевронов фракции в конце игры (фракция воинов).</li>
 * </ol>
 *
 * @param context
 * @param suit Название фракции дворфов.
 * @param isFinal Является ли финальным подсчётом очков.
 * @returns Индексы игроков с преимуществом по количеству шевронов конкретной фракции.
 */
export const CheckCurrentSuitDistinctionPlayers = (
    { G, ctx, ...rest }: Context,
    suit: SuitNames,
    isFinal = false,
): MaxCurrentSuitDistinctionPlayersArray => {
    const [
        playersRanks,
        maxRanks,
    ]: PlayerRanksAndMaxRanksForDistinctionsArray = CountPlayerRanksAndMaxRanksForCurrentDistinction(
        { G, ctx, ...rest },
        suit,
        isFinal,
    ),
        maxPlayers: PlayerID[] = [],
        suitName: SuitRusNames = suitsConfig[suit].suitName;
    playersRanks.forEach((value: number, index: number): void => {
        const playerID: string = String(index);
        AssertPlayerId(ctx, playerID);
        if (value === maxRanks) {
            maxPlayers.push(playerID);
            const playerIndex: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
            if (playerIndex === undefined) {
                return ThrowMyError(
                    { G, ctx, ...rest },
                    ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
                    playerID,
                );
            }
            if (isFinal) {
                AddDataToLog(
                    { G, ctx, ...rest },
                    LogNames.Public,
                    `Преимущество по фракции '${suitName}' получил игрок: '${playerIndex.nickname}'.`,
                );
            }
        }
    });
    AssertMaxCurrentSuitDistinctionPlayersArray(maxPlayers);
    // TODO Is it possible maxRanks === 0!?
    if (isFinal && !maxPlayers.length) {
        return ThrowMyError(
            { G, ctx, ...rest },
            ErrorNames.SuitDistinctionMustBePresent,
            suitName,
        );
    }
    return maxPlayers;
};

/**
 * <h3>Подсчёт преимуществ по количеству шевронов фракций в фазе 'Смотр войск'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрабатывает в начале фазы получения преимуществ по количеству шевронов каждой фракции в фазе 'Смотр войск'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export const CheckAllSuitsDistinctions = (
    { G, ...rest }: Context,
): void => {
    AddDataToLog(
        { G, ...rest },
        LogNames.Game,
        `Преимущество по фракциям в конце эпохи:`,
    );
    let suit: SuitNames;
    for (suit in suitsConfig) {
        const result: Distinctions = CheckCurrentSuitDistinction(
            { G, ...rest },
            suit,
        );
        G.distinctions[suit] = result;
        DiscardOneCardFromTierTwoDeckIfNoExplorerDistinction(
            { G, ...rest },
            suit,
            result,
        );
    }
};

/**
 * <h3>Подсчёт количество шевронов каждого игрока конкретной фракции и максимальное количество шевронов конкретной фракции.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При получении преимуществ по количеству шевронов каждой фракции в фазе 'Смотр войск'.</li>
 * <li>При получении преимущества по количеству шевронов фракции 'Воины' в конце игры.</li>
 * </ol>
 *
 * @param context
 * @param suit Название фракции дворфов.
 * @param isFinal Является ли финальным подсчётом очков.
 * @returns [Количество шевронов каждого игрока конкретной фракции, Максимальное количество шевронов конкретной фракции].
 */
const CountPlayerRanksAndMaxRanksForCurrentDistinction = (
    { G, ctx, ...rest }: Context,
    suit: SuitNames,
    isFinal = false,
): PlayerRanksAndMaxRanksForDistinctionsArray => {
    const playersRanks: number[] = [];
    for (let i = 0; i < ctx.numPlayers; i++) {
        const playerID: string = String(i);
        AssertPlayerId(ctx, playerID);
        const playerI: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
        if (playerI === undefined) {
            return ThrowMyError(
                { G, ctx, ...rest },
                ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
                i,
            );
        }
        playersRanks.push(playerI.cards[suit].reduce(TotalRank, 0));
    }
    AssertPlayerRanksForDistinctionsArray(playersRanks);
    const maxRanks: number = Math.max(...playersRanks);
    // TODO Is it possible maxRanks === 0!?
    if (isFinal && maxRanks === 0) {
        return ThrowMyError(
            { G, ctx, ...rest },
            ErrorNames.PlayersCurrentSuitCardsMustHaveCardsForDistinction,
            suitsConfig[suit].suitName,
        );
    }
    return [
        playersRanks,
        maxRanks,
    ];
};

/**
 * <h3>Сбрасывает одну карту из колоды карт второй эпохи, если никто из игроков не получил преимущество по фракции 'Разведчики' в фазе 'Смотр войск'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При получении преимуществ по количеству шевронов фракции 'Разведчики' в фазе 'Смотр войск'.</li>
 * </ol>
 *
 * @param context
 * @param suit Название фракции дворфов.
 * @param result Id игрока, получившего преимущество (если имеется).
 * @returns
 */
const DiscardOneCardFromTierTwoDeckIfNoExplorerDistinction = (
    { ...rest }: Context,
    suit: SuitNames,
    result: Distinctions,
): void => {
    if (suit === SuitNames.explorer && result === undefined) {
        const discardedCard: CanBeUndef<DwarfDeckCard> =
            GetCardsFromSecretDwarfDeck(
                { ...rest },
                1,
                0,
                1,
            )[0];
        if (discardedCard === undefined) {
            return ThrowMyError(
                { ...rest },
                ErrorNames.NoCardsToDiscardWhenNoWinnerInExplorerDistinction,
            );
        }
        DiscardCurrentCard(
            { ...rest },
            discardedCard,
        );
        AddDataToLog(
            { ...rest },
            LogNames.Private,
            `Из-за отсутствия преимущества по фракции '${SuitRusNames.explorer}' сброшена карта: '${discardedCard.name}'.`,
        );
    }
};
