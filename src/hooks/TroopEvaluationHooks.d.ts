import type { CanBeVoid, Context } from "../typescript/interfaces";
/**
 * <h3>Определяет порядок получения преимуществ при начале фазы 'Смотр войск'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При начале фазы 'Смотр войск'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const CheckAndResolveTroopEvaluationOrders: ({ G, ...rest }: Context) => void;
/**
 * <h3>Проверяет необходимость завершения фазы 'Смотр войск'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При каждом получении преимуществ в фазе 'Смотр войск'.</li>
 * </ol>
 *
 * @param context
 * @returns Необходимость завершения текущей фазы.
 */
export declare const CheckEndTroopEvaluationPhase: ({ G, ctx, ...rest }: Context) => CanBeVoid<boolean>;
/**
 * <h3>Проверяет необходимость завершения хода в фазе 'Смотр войск'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При каждом действии с наёмником в фазе 'Смотр войск'.</li>
 * </ol>
 *
 * @param context
 * @returns Необходимость завершения текущего хода.
 */
export declare const CheckEndTroopEvaluationTurn: ({ ctx, ...rest }: Context) => CanBeVoid<true>;
/**
 * <h3>Действия при завершении фазы 'Смотр войск'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При завершении фазы 'Смотр войск'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const EndTroopEvaluationPhaseActions: ({ G, ...rest }: Context) => void;
/**
 * <h3>Действия при завершении мува в фазе 'Смотр войск'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При завершении мува в фазе 'Смотр войск'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const OnTroopEvaluationMove: ({ ...rest }: Context) => void;
/**
 * <h3>Действия при начале хода в фазе 'Смотр войск'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При начале хода в фазе 'Смотр войск'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const OnTroopEvaluationTurnBegin: ({ G, ctx, ...rest }: Context) => void;
/**
 * <h3>Действия при завершении хода в фазе 'Смотр войск'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При завершении хода в фазе 'Смотр войск'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const OnTroopEvaluationTurnEnd: ({ G, ctx, random, ...rest }: Context) => void;
//# sourceMappingURL=TroopEvaluationHooks.d.ts.map