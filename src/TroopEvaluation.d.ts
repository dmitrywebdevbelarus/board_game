import { SuitNames } from "./typescript/enums";
import type { Context, MaxCurrentSuitDistinctionPlayersArray } from "./typescript/interfaces";
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
export declare const CheckCurrentSuitDistinctionPlayers: ({ G, ctx, ...rest }: Context, suit: SuitNames, isFinal?: boolean) => MaxCurrentSuitDistinctionPlayersArray;
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
export declare const CheckAllSuitsDistinctions: ({ G, ...rest }: Context) => void;
//# sourceMappingURL=TroopEvaluation.d.ts.map