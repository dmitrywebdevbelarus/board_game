import type { CanBeVoid, Context } from "../typescript/interfaces";
/**
 * <h3>Проверяет необходимость завершения фазы 'enlistmentMercenaries'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При каждом действии с наёмником в фазе 'enlistmentMercenaries'.</li>
 * </ol>
 *
 * @param context
 * @returns Необходимость завершения текущей фазы.
 */
export declare const CheckEndEnlistmentMercenariesPhase: ({ G, ctx, ...rest }: Context) => CanBeVoid<true>;
/**
 * <h3>Проверяет необходимость завершения хода в фазе 'enlistmentMercenaries'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При каждом действии в фазе 'enlistmentMercenaries'.</li>
 * </ol>
 *
 * @param context
 * @returns Необходимость завершения текущего хода.
 */
export declare const CheckEndEnlistmentMercenariesTurn: ({ G, ctx, ...rest }: Context) => CanBeVoid<boolean>;
/**
 * <h3>Действия при завершении фазы 'enlistmentMercenaries'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При завершении фазы 'enlistmentMercenaries'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const EndEnlistmentMercenariesActions: ({ G, ctx, ...rest }: Context) => void;
/**
 * <h3>Действия при завершении мува в фазе 'enlistmentMercenaries'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При завершении мува в фазе 'enlistmentMercenaries'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const OnEnlistmentMercenariesMove: ({ G, ctx, ...rest }: Context) => void;
/**
 * <h3>Действия при начале хода в фазе 'enlistmentMercenaries'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При начале хода в фазе 'enlistmentMercenaries'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const OnEnlistmentMercenariesTurnBegin: ({ G, ctx, ...rest }: Context) => void;
/**
* <h3>Определяет порядок найма наёмников при начале фазы 'enlistmentMercenaries'.</h3>
* <p>Применения:</p>
* <ol>
* <li>При начале фазы 'enlistmentMercenaries'.</li>
* </ol>
*
* @param context
* @returns
*/
export declare const PrepareMercenaryPhaseOrders: ({ G, ctx }: Context) => void;
//# sourceMappingURL=EnlistmentMercenariesHooks.d.ts.map