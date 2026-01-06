import type { CanBeVoid, Context } from "../typescript/interfaces";
/**
 * <h3>Проверяет необходимость завершения фазы 'Ставки'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При каждом действии с монеткой в фазе 'Ставки'.</li>
 * </ol>
 *
 * @param context
 * @returns Необходимость завершения текущей фазы.
 */
export declare const CheckEndPlaceYludPhase: ({ G, ctx, ...rest }: Context) => CanBeVoid<true>;
/**
 * <h3>Проверяет порядок хода при начале фазы 'Поместить Труд'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При начале фазы 'Поместить Труд'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const CheckPlaceYludOrder: ({ G, ctx, ...rest }: Context) => void;
/**
 * <h3>Проверяет необходимость завершения хода в фазе 'Поместить Труд'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При каждом действии в фазе 'Поместить Труд'.</li>
 * </ol>
 *
 * @param context
 * @returns Необходимость завершения текущего хода.
 */
export declare const CheckEndPlaceYludTurn: ({ ...rest }: Context) => CanBeVoid<true>;
/**
 * <h3>Действия при завершении фазы 'Поместить Труд'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При завершении фазы 'Поместить Труд'.</li>
 * </ol>
 *
 * @param context
 */
export declare const EndPlaceYludActions: ({ G, ...rest }: Context) => void;
/**
 * <h3>Действия при завершении мува в фазе 'Поместить Труд'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При завершении мува в фазе 'Поместить Труд'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const OnPlaceYludMove: ({ ...rest }: Context) => void;
/**
 * <h3>Действия при начале хода в фазе 'Поместить Труд'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При начале хода в фазе 'Поместить Труд'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const OnPlaceYludTurnBegin: ({ G, ctx, ...rest }: Context) => void;
//# sourceMappingURL=PlaceYludHooks.d.ts.map