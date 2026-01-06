import { SuitNames } from "../typescript/enums";
import type { Context, PlayerBoardCard, PlayerID, RanksValueMultiplier } from "../typescript/interfaces";
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
export declare const ArithmeticSum: (startValue: 3, step: 1, ranksCount: number) => number;
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
export declare const GetRanksValueMultiplier: ({ G, ...rest }: Context, playerID: PlayerID, suit: SuitNames, multiplier: RanksValueMultiplier) => number;
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
export declare const GetSuitValueWithMaxRanksValue: ({ G, ...rest }: Context, playerID: PlayerID) => SuitNames;
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
export declare const TotalPoints: (accumulator: number, currentValue: PlayerBoardCard) => number;
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
export declare const TotalRank: (accumulator: number, currentValue: PlayerBoardCard) => number;
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
export declare const TotalRankWithoutThrud: (accumulator: number, currentValue: PlayerBoardCard) => number;
//# sourceMappingURL=ScoreHelpers.d.ts.map