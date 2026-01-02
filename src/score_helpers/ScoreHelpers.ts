import { suitsConfig } from "../data/SuitData";
import { ThrowMyError } from "../Error";
import { ErrorNames, HeroNames, SuitNames } from "../typescript/enums";
import type { CanBeUndef, Context, PlayerBoardCard, PlayerID, PublicPlayer, RanksValueMultiplier } from "../typescript/interfaces";

/**
 * <h3>Подсчитывает количество очков фракции в арифметической прогрессии, зависящих от числа шевронов.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Применяется для подсчёта очков фракции, зависящих от арифметической прогрессии очков по количеству шевронов (фракция кузнецов).</li>
 * </ol>
 *
 * @param startValue Стартовое значение очков.
 * @param step Шаг.
 * @param ranksCount Суммарное количество шевронов.
 * @returns Суммарное количество очков фракции.
 */
export const ArithmeticSum = (
    startValue: 3,
    step: 1,
    // TODO Can i add type!?
    ranksCount: number,
): number => (2 * startValue + step * (ranksCount - 1)) * ranksCount / 2;

/**
 * <h3>Высчитывает суммарное количество очков за карты, зависящие от множителя за количество шевронов.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Применяется при подсчёте очков за карты, зависящие от множителя за количество шевронов.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param suit Фракция.
 * @param multiplier Множитель.
 * @returns Суммарное количество очков за множитель.
 */
export const GetRanksValueMultiplier = (
    { G, ...rest }: Context,
    playerID: PlayerID,
    suit: SuitNames,
    multiplier: RanksValueMultiplier,
): number => {
    const player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError(
            { G, ...rest },
            ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
            playerID,
        );
    }
    return player.cards[suit].reduce(TotalRank, 0) * multiplier;
};

/**
 * <h3>Высчитывает текущее суммарное количество очков за карту артефакта Mjollnir.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Применяется при текущем подсчёте очков при наличии карты артефакта Mjollnir.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @returns Суммарное количество очков за карту артефакта Mjollnir.
 */
export const GetSuitValueWithMaxRanksValue = (
    { G, ...rest }: Context,
    playerID: PlayerID,
): SuitNames => {
    const player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError(
            { G, ...rest },
            ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
            playerID,
        );
    }
    const totalSuitsRanks: number[] = [];
    let suit: SuitNames,
        maxRanks = 0,
        suitWithMaxRanks: CanBeUndef<SuitNames>;
    for (suit in suitsConfig) {
        const ranks: number =
            totalSuitsRanks.push(player.cards[suit].reduce(TotalRank, 0) * 2);
        if (ranks > maxRanks) {
            maxRanks = ranks;
            suitWithMaxRanks = suit;
        }
    }
    if (suitWithMaxRanks === undefined) {
        return ThrowMyError(
            { G, ...rest },
            ErrorNames.MustBeSuitWithMaxRanksValue,
        );
    }
    return suitWithMaxRanks;
};

/**
 * <h3>Высчитывает суммарное количество очков фракции.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Применяется при подсчёте очков фракций, не зависящих от количества шевронов.</li>
 * </ol>
 *
 * @param accumulator Аккумулятивное значение очков.
 * @param currentValue Текущее значение очков.
 * @returns Суммарное количество очков фракции.
 */
export const TotalPoints = (
    accumulator: number,
    currentValue: PlayerBoardCard,
): number => {
    if (currentValue.points !== null) {
        return accumulator + currentValue.points;
    }
    return accumulator;
};

/**
 * <h3>Высчитывает суммарное количество шевронов фракции.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Применяется при подсчёте шевронов фракций, не зависящих от количества очков.</li>
 * </ol>
 *
 * @param accumulator Аккумулятивное значение шевронов.
 * @param currentValue Текущее значение шевронов.
 * @returns Суммарное количество шевронов фракции.
 */
export const TotalRank = (
    accumulator: number,
    currentValue: PlayerBoardCard,
): number => {
    if (currentValue.rank !== null) {
        return accumulator + currentValue.rank;
    }
    return accumulator;
};

/**
 * <h3>Высчитывает суммарное количество шевронов фракции.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Применяется при подсчёте шевронов фракций, не зависящих от количества очков.</li>
 * </ol>
 *
 * @param accumulator Аккумулятивное значение шевронов.
 * @param currentValue Текущее значение шевронов.
 * @returns Суммарное количество шевронов фракции.
 */
export const TotalRankWithoutThrud = (
    accumulator: number,
    currentValue: PlayerBoardCard,
): number => {
    if (currentValue.name !== HeroNames.Thrud && currentValue.rank !== null) {
        return accumulator + currentValue.rank;
    }
    return accumulator;
};
