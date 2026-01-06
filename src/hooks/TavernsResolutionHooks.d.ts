import { PhaseNames } from "../typescript/enums";
import type { CanBeVoid, Context } from "../typescript/interfaces";
/**
 * <h3>Проверяет необходимость завершения фазы 'Посещение таверн'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При каждом пике карты в фазе 'Посещение таверн'.</li>
 * </ol>
 *
 * @param context
 * @returns Необходимость завершения текущей фазы.
 */
export declare const CheckEndTavernsResolutionPhase: ({ G, ctx, ...rest }: Context) => CanBeVoid<true>;
/**
 * <h3>Проверяет необходимость завершения хода в фазе 'Посещение таверн'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При каждом пике карты в фазе 'Посещение таверн'.</li>
 * </ol>
 *
 * @param context
 * @returns Необходимость завершения текущего хода.
 */
export declare const CheckEndTavernsResolutionTurn: ({ G, ctx, ...rest }: Context) => CanBeVoid<true>;
/**
 * <h3>Действия при завершении фазы 'Посещение таверн'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При завершении фазы 'Посещение таверн'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const EndTavernsResolutionActions: ({ G, ctx, ...rest }: Context) => void;
/**
 * <h3>Действия при завершении мува в фазе 'Посещение таверн'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При завершении мува в фазе 'Посещение таверн'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const OnTavernsResolutionMove: ({ G, ctx, ...rest }: Context) => void;
/**
 * <h3>Действия при начале хода в фазе 'Посещение таверн'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При начале хода в фазе 'Посещение таверн'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const OnTavernsResolutionTurnBegin: ({ G, ctx, ...rest }: Context) => void;
/**
 * <h3>Действия при завершении хода в фазе 'Посещение таверн'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При завершении хода в фазе 'Посещение таверн'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const OnTavernsResolutionTurnEnd: ({ G, ctx, ...rest }: Context) => void;
/**
 * <h3>Определяет порядок взятия карт из таверны и обмена кристалами при начале фазы 'Посещение таверн'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При начале фазы 'Посещение таверн'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const ResolveCurrentTavernOrders: ({ G, ctx, ...rest }: Context) => void;
/**
 * <h3>Проверяет необходимость начала фазы 'Ставки Улина' или фазы 'Посещение таверн' или фазы 'EndTier' или фазы конца игры.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При действиях, после которых может начаться фаза 'Ставки Улина' или фаза 'Посещение таверн' или фаза 'EndTier' или фазы конца игры.</li>
 * </ol>
 *
 * @param context
 * @returns Фаза игры.
 */
export declare const StartBidUlineOrTavernsResolutionOrEndTierPhaseOrEndGameLastActionsPhase: ({ G, ...rest }: Context) => CanBeVoid<PhaseNames>;
//# sourceMappingURL=TavernsResolutionHooks.d.ts.map