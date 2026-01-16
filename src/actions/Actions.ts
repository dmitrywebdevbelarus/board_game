import { AllStackData } from "../data/StackData";
import { suitsConfig } from "../data/SuitData";
import { ThrowMyError } from "../Error";
import { AddBuffToPlayer, DeleteBuffFromPlayer } from "../helpers/BuffHelpers";
import { AddAnyCardToPlayerActions, AddCardToPlayerBoardCards } from "../helpers/CardHelpers";
import { DiscardCurrentCard, RemoveCardFromPlayerBoardSuitCards, RemoveCardFromTavern } from "../helpers/DiscardCardHelpers";
import { AddActionsToStack } from "../helpers/StackHelpers";
import { IsMercenaryCampCard } from "../is_helpers/IsCampTypeHelpers";
import { AddDataToLog } from "../Logging";
import { DiscardConcreteCardFromTavern } from "../Tavern";
import { ArtefactBuffNames, ArtefactNames, CardRusNames, CommonBuffNames, ErrorNames, LogNames, RankVariantsNames, SuitNames, SuitRusNames } from "../typescript/enums";
import type { ActionFunctionWithoutParams, CampCard, CampCreatureCommandZoneCard, CanBeUndef, Context, DiscardDeckCard, DwarfDeckCard, ExplorerDistinctionCardId, MercenaryCard, PlayerBoardCard, PlayerID, PlayerStack, PublicPlayer, TavernCardWithPossibleExpansion, TavernPossibleCardId, Variant } from "../typescript/interfaces";
import { IsDwarfCard, IsDwarfPlayerCard } from "../is_helpers/IsDwarfTypeHelpers";

/**
 * <h3>Действия, связанные с выбором карты из таверны.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Применяется при выборе карты из таверны игроком.</li>
 * <li>Применяется при выборе карты из таверны соло ботом.</li>
 * <li>Применяется при выборе карты из таверны соло ботом Андвари.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param tavernCardId Id карты.
 * @returns
 */
export const ClickCardAction = (
    { ...rest }: Context,
    playerID: PlayerID,
    tavernCardId: TavernPossibleCardId,
): void => {
    const tavernCard: TavernCardWithPossibleExpansion = RemoveCardFromTavern(
        { ...rest },
        tavernCardId,
    );
    AddAnyCardToPlayerActions(
        { ...rest },
        playerID,
        tavernCard,
    );
};

/**
 * <h3>Действия, связанные с отправкой любой указанной карты со стола игрока в колоду сброса.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Применяется при отправке карты в колоду сброса в конце игры при наличии артефакта Brisingamens.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param suit Название фракции дворфов.
 * @param cardId Id карты.
 * @returns
 */
export const DiscardAnyCardFromPlayerBoardAction = (
    { ctx, ...rest }: Context,
    playerID: PlayerID,
    suit: SuitNames,
    cardId: number,
): void => {
    const discardedCard: PlayerBoardCard = RemoveCardFromPlayerBoardSuitCards(
        { ctx, ...rest },
        ctx.currentPlayer,
        suit,
        cardId,
    );
    DiscardCurrentCard(
        { ctx, ...rest },
        discardedCard,
    );
    AddDataToLog(
        { ctx, ...rest },
        LogNames.Game,
        `Карта '${discardedCard.type}' '${discardedCard.name}' убрана в сброс из-за эффекта карты '${CardRusNames.ArtefactCard}' '${ArtefactNames.Brisingamens}'.`,
    );
    DeleteBuffFromPlayer(
        { ctx, ...rest },
        playerID,
        ArtefactBuffNames.DiscardCardEndGame,
    );
};

/**
 * <h3>Сбрасывает карту из таверны в колоду сброса по выбору игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Применяется после выбора первым игроком карты из лагеря при игре на двух игроков.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param tavernCardId Id карты.
 * @returns
 */
export const DiscardCardFromTavernAction = (
    { G, ctx, ...rest }: Context,
    playerID: PlayerID,
    tavernCardId: TavernPossibleCardId,
): void => {
    if (playerID === undefined) {
        return ThrowMyError(
            { G, ctx, ...rest },
            ErrorNames.PlayerIDIsNotDefined,
        );
    }
    const player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError(
            { G, ctx, ...rest },
            ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
            playerID,
        );
    }
    AddDataToLog(
        { G, ctx, ...rest },
        LogNames.Game,
        `Игрок '${player.nickname}' должен сбросить в колоду сброса карту из текущей таверны:`,
    );
    DiscardConcreteCardFromTavern(
        { G, ctx, ...rest },
        tavernCardId,
    );
    if (ctx.numPlayers === 2) {
        G.tavernCardDiscarded2Players = true;
    }
};

/**
 * <h3>Игрок выбирает наёмника для вербовки.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Применяется когда игроку нужно выбрать наёмника для вербовки.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param cardId Id карты.
 * @returns
 */
export const GetEnlistmentMercenariesAction = (
    { G, ctx, ...rest }: Context,
    playerID: PlayerID,
    cardId: number,
): void => {
    if (playerID === undefined) {
        return ThrowMyError(
            { G, ctx, ...rest },
            ErrorNames.PlayerIDIsNotDefined,
        );
    }
    const player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError(
            { G, ctx, ...rest },
            ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
            playerID,
        );
    }
    const pickedCard: CanBeUndef<CampCard> = player.campCards[cardId];
    if (pickedCard === undefined) {
        throw new Error(`В массиве карт лагеря игрока с id '${playerID}' отсутствует выбранная карта с id '${cardId}': это должно проверяться в MoveValidator.`);
    }
    if (!IsMercenaryCampCard(pickedCard)) {
        throw new Error(`Выбранная карта должна быть с типом '${CardRusNames.MercenaryCard}'.`);
    }
    AddActionsToStack(
        { G, ctx, ...rest },
        playerID,
        [AllStackData.placeEnlistmentMercenaries(pickedCard)],
    );
    AddDataToLog(
        { G, ctx, ...rest },
        LogNames.Game,
        `Игрок '${player.nickname}' во время фазы '${ctx.phase}' выбрал карту '${CardRusNames.MercenaryCard}' '${pickedCard.name}'.`,
    );
};

/**
 * <h3>Выбор фракции для применения финального эффекта артефакта Mjollnir.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце игры при выборе игроком фракции для применения финального эффекта артефакта Mjollnir.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param suit Название фракции дворфов.
 * @returns
 */
export const GetMjollnirProfitAction = (
    { G, ...rest }: Context,
    playerID: PlayerID,
    suit: SuitNames,
): void => {
    const player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError(
            { G, ...rest },
            ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
            playerID,
        );
    }
    AddBuffToPlayer(
        { G, ...rest },
        playerID,
        {
            name: CommonBuffNames.SuitIdForMjollnir,
        },
        suit,
    );
    DeleteBuffFromPlayer(
        { G, ...rest },
        playerID,
        ArtefactBuffNames.GetMjollnirProfit,
    );
    AddDataToLog(
        { G, ...rest },
        LogNames.Game,
        `Игрок '${player.nickname}' выбрал фракцию '${suitsConfig[suit].suitName}' для эффекта карты '${CardRusNames.ArtefactCard}' '${ArtefactNames.Mjollnir}'.`,
    );
};

/**
 * <h3>Первый игрок в фазе вербовки наёмников может пасануть, чтобы вербовать последним.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Может применятся первым игроком в фазе вербовки наёмников.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @returns
 */
export const PassEnlistmentMercenariesAction: ActionFunctionWithoutParams = (
    { G, ctx, ...rest }: Context,
    playerID: PlayerID,
): void => {
    if (playerID === undefined) {
        return ThrowMyError(
            { G, ctx, ...rest },
            ErrorNames.PlayerIDIsNotDefined,
        );
    }
    const player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError(
            { G, ctx, ...rest },
            ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
            playerID,
        );
    }
    AddDataToLog(
        { G, ctx, ...rest },
        LogNames.Game,
        `Игрок '${player.nickname}' пасанул во время фазы '${ctx.phase}'.`,
    );
};

/**
 * <h3>Действия, связанные с взятием карт из колоды сброса.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе конкретных героев, дающих возможность взять карты из колоды сброса.</li>
 * <li>При выборе конкретных карт лагеря, дающих возможность взять карты из колоды сброса.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param cardId Id карты.
 * @returns
 */
export const PickDiscardCardAction = (
    { G, ...rest }: Context,
    playerID: PlayerID,
    cardId: number,
): void => {
    const player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError(
            { G, ...rest },
            ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
            playerID,
        );
    }
    const cardFromDiscard: CanBeUndef<DiscardDeckCard> =
        G.discardCardsDeck.splice(cardId, 1)[0];
    if (cardFromDiscard === undefined) {
        throw new Error(`В массиве колоды сброса отсутствует выбранная карта с id '${cardId}': это должно проверяться в MoveValidator.`);
    }
    AddDataToLog(
        { G, ...rest },
        LogNames.Game,
        `Игрок '${player.nickname}' взял карту '${cardFromDiscard.type}' '${cardFromDiscard.name}' из колоды сброса.`,
    );
    if (IsDwarfPlayerCard(cardFromDiscard)) {
        AddCardToPlayerBoardCards(
            { G, ...rest },
            playerID,
            cardFromDiscard,
        );
    } else {
        AddAnyCardToPlayerActions(
            { G, ...rest },
            playerID,
            cardFromDiscard,
        );
    }
};

/**
 * <h3>Действия, связанные с взятием базовой карты из новой эпохи по преимуществу по фракции разведчиков.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе базовой карты из новой эпохи по преимуществу по фракции разведчиков игроком.</li>
 * <li>При выборе базовой карты из новой эпохи по преимуществу по фракции разведчиков соло ботом.</li>
 * <li>При выборе базовой карты из новой эпохи по преимуществу по фракции разведчиков соло ботом Андвари.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param cardId Id карты.
 * @returns
 */
export const PickCardToPickDistinctionAction = (
    { G, ...rest }: Context,
    playerID: PlayerID,
    cardId: ExplorerDistinctionCardId,
): void => {
    if (G.explorerDistinctionCards === null) {
        throw new Error(`В массиве карт для получения преимущества по фракции '${SuitRusNames.explorer}' не может не быть карт.`);
    }
    const explorerDistinctionCard: CanBeUndef<DwarfDeckCard> = G.explorerDistinctionCards[cardId];
    if (explorerDistinctionCard === undefined) {
        throw new Error(`Отсутствует выбранная карта с id '${cardId}' эпохи '2'.`);
    }
    G.explorerDistinctionCards = null;
    AddAnyCardToPlayerActions(
        { G, ...rest },
        playerID,
        explorerDistinctionCard,
    );
    if (IsDwarfCard(explorerDistinctionCard)) {
        G.distinctions[SuitNames.explorer] = undefined;
    }
    G.explorerDistinctionCardId = cardId;
};

/**
 * <h3>Игрок выбирает фракцию для вербовки указанного наёмника.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Применяется когда игроку нужно выбрать фракцию для вербовки наёмника.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param suit Название фракции дворфов.
 * @returns
 */
export const PlaceEnlistmentMercenariesAction = (
    { G, ...rest }: Context,
    playerID: PlayerID,
    suit: SuitNames,
): void => {
    const player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError(
            { G, ...rest },
            ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
            playerID,
        );
    }
    const stack: CanBeUndef<PlayerStack> = player.stack[0];
    if (stack === undefined) {
        return ThrowMyError(
            { G, ...rest },
            ErrorNames.FirstStackActionForPlayerWithCurrentIdIsUndefined,
            playerID,
        );
    }
    if (!IsMercenaryCampCard(stack.card)) {
        throw new Error(`Выбранная карта должна быть с типом '${CardRusNames.MercenaryCard}'.`);
    }
    const mercenaryCard: CanBeUndef<MercenaryCard> = stack.card;
    if (mercenaryCard === undefined) {
        throw new Error(`В стеке отсутствует 'card'.`);
    }
    const cardVariants: CanBeUndef<Variant<RankVariantsNames.MercenaryRank>> = mercenaryCard.variants[suit];
    if (cardVariants === undefined) {
        throw new Error(`У выбранной карты '${CardRusNames.MercenaryCard}' отсутствует принадлежность к выбранной фракции '${suit}'.`);
    }
    mercenaryCard.playerSuit = suit;
    mercenaryCard.points = cardVariants.points;
    mercenaryCard.rank = cardVariants.rank;
    const cardIndex: number = player.campCards.findIndex((card: CampCreatureCommandZoneCard): boolean =>
        card.name === mercenaryCard.name);
    if (cardIndex === -1) {
        throw new Error(`У игрока с id '${playerID}' в массиве карт лагеря отсутствует выбранная карта с названием '${mercenaryCard.name}'.`);
    }
    AddAnyCardToPlayerActions(
        { G, ...rest },
        playerID,
        mercenaryCard,
    );
    const amount = 1,
        removedMercenaryCards: CampCreatureCommandZoneCard[] =
            player.campCards.splice(cardIndex, amount);
    if (removedMercenaryCards.length !== amount) {
        throw new Error(`Недостаточно карт в массиве карт лагеря: требуется - '${amount}', в наличии - '${removedMercenaryCards.length}'.`);
    }
};
