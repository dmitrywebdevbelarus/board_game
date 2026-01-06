import type { CanBeVoid, Context } from "../typescript/interfaces";
/**
 * <h3>Проверяет необходимость завершения фазы 'Ставки'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При каждом действии с монетой в фазе 'Ставки'.</li>
 * </ol>
 *
 * @param context
 * @returns Необходимость завершения текущей фазы.
 */
export declare const CheckEndBidsPhase: ({ G, ctx, ...rest }: Context) => CanBeVoid<boolean>;
/**
 * <h3>Проверяет необходимость завершения хода в фазе 'Ставки'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При каждом действии с монеткой в фазе 'Ставки'.</li>
 * </ol>
 *
 * @param context
 * @returns Необходимость завершения текущего хода.
 */
export declare const CheckEndBidsTurn: ({ G, ctx, ...rest }: Context) => CanBeVoid<true>;
/**
 * <h3>Действия при завершении фазы 'Ставки'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При завершении фазы 'Ставки'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const EndBidsActions: ({ G }: Context) => void;
/**
 * <h3>Действия при начале фазы 'Ставки'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При начале фазы 'Ставки'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const PreparationPhaseActions: ({ G, ...rest }: Context) => void;
//# sourceMappingURL=BidsHooks.d.ts.map