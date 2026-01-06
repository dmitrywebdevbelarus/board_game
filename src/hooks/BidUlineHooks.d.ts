import type { CanBeVoid, Context } from "../typescript/interfaces";
/**
 * <h3>Проверяет необходимость завершения фазы 'Ставки Улина'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При каждой выкладке монеты на стол игрока в фазе 'Ставки Улина'.</li>
 * </ol>
 *
 * @param context
 * @returns Необходимость завершения текущей фазы.
 */
export declare const CheckEndBidUlinePhase: ({ G, ctx, ...rest }: Context) => CanBeVoid<boolean>;
/**
 * <h3>Проверяет порядок хода при начале фазы 'Ставки Улина'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При начале фазы 'Ставки Улина'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const CheckBidUlineOrder: ({ ...rest }: Context) => void;
/**
 * <h3>Действия при завершении фазы 'Ставки Улина'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При завершении фазы 'Ставки Улина'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const EndBidUlineActions: ({ G }: Context) => void;
//# sourceMappingURL=BidUlineHooks.d.ts.map