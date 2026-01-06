import { PhaseNames } from "../typescript/enums";
import type { CanBeVoid, Context } from "../typescript/interfaces";
/**
 * <h3>Проверяет порядок хода при начале фазы 'chooseDifficultySoloMode'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При начале фазы 'chooseDifficultySoloMode'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const CheckChooseDifficultySoloModeOrder: ({ ...rest }: Context) => void;
/**
 * <h3>Проверяет необходимость завершения фазы 'chooseDifficultySoloMode'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При каждом действии с монеткой в фазе 'chooseDifficultySoloMode'.</li>
 * </ol>
 *
 * @param context
 * @returns Необходимость завершения текущей фазы.
 */
export declare const CheckEndChooseDifficultySoloModePhase: ({ G, ctx, ...rest }: Context) => CanBeVoid<boolean>;
/**
 * <h3>Проверяет необходимость завершения хода в фазе 'chooseDifficultySoloMode'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При каждом действии в фазе 'chooseDifficultySoloMode'.</li>
 * </ol>
 *
 * @param context
 * @returns Необходимость завершения текущего хода.
 */
export declare const CheckEndChooseDifficultySoloModeTurn: ({ G, ctx }: Context) => CanBeVoid<boolean>;
/**
 * <h3>Действия при завершении фазы 'chooseDifficultySoloMode'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При завершении фазы 'chooseDifficultySoloMode'.</li>
 * </ol>
 *
 * @param returns
 * @returns
 */
export declare const EndChooseDifficultySoloModeActions: ({ G }: Context) => void;
/**
 * <h3>Действия при завершении мува в фазе 'chooseDifficultySoloMode'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При завершении мува в фазе 'chooseDifficultySoloMode'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const OnChooseDifficultySoloModeMove: ({ ...rest }: Context) => void;
/**
 * <h3>Действия при начале хода в фазе 'chooseDifficultySoloMode'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При начале хода в фазе 'chooseDifficultySoloMode'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const OnChooseDifficultySoloModeTurnBegin: ({ G, ctx, ...rest }: Context) => void;
/**
 * <h3>Проверяет необходимость начала фазы 'Ставки' или фазы 'ChooseDifficultySoloModeAndvari'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При действиях, после которых может начаться фаза 'Ставки' или фаза 'ChooseDifficultySoloModeAndvari'.</li>
 * </ol>
 *
 * @param context
 * @returns Фаза игры.
 */
export declare const StartChooseDifficultySoloModeAndvariOrBidsPhase: ({ G }: Context) => PhaseNames;
//# sourceMappingURL=ChooseDifficultySoloModeHooks.d.ts.map