import type { CanBeVoid, Context } from "../typescript/interfaces";
/**
 * <h3>Проверяет необходимость завершения фазы 'getMjollnirProfit'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе фракции для применения эффекта артефакта Mjollnir в фазе 'getMjollnirProfit'.</li>
 * </ol>
 *
 * @param context
 * @returns Необходимость завершения текущей фазы.
 */
export declare const CheckEndGetMjollnirProfitPhase: ({ G, ctx, ...rest }: Context) => CanBeVoid<boolean>;
/**
 * <h3>Проверяет порядок хода при начале фазы 'getMjollnirProfit'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При начале фазы 'getMjollnirProfit'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const CheckGetMjollnirProfitOrder: ({ G, ctx, ...rest }: Context) => void;
/**
 * <h3>Действия при завершении мува в фазе 'getMjollnirProfit'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При завершении мува в фазе 'getMjollnirProfit'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const OnGetMjollnirProfitMove: ({ ...rest }: Context) => void;
/**
 * <h3>Действия при начале хода в фазе 'getMjollnirProfit'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При начале хода в фазе 'getMjollnirProfit'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const OnGetMjollnirProfitTurnBegin: ({ ctx, ...rest }: Context) => void;
/**
 * <h3>Действия завершения игры при завершении фазы 'getMjollnirProfit'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При завершении фазы 'getMjollnirProfit'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const StartEndGame: ({ G, events }: Context) => void;
//# sourceMappingURL=GetMjollnirProfitHooks.d.ts.map