import type { CanBeVoid, Context } from "../typescript/interfaces";
/**
 * <h3>Проверяет порядок хода при начале фазы 'chooseDifficultySoloModeAndvari'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При начале фазы 'chooseDifficultySoloModeAndvari'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const CheckChooseStrategyForSoloModeAndvariOrder: ({ ...rest }: Context) => void;
/**
 * <h3>Проверяет необходимость завершения фазы 'chooseDifficultySoloModeAndvari'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При каждом действии в фазе 'chooseDifficultySoloModeAndvari'.</li>
 * </ol>
 *
 * @param context
 * @returns Необходимость завершения текущей фазы.
 */
export declare const CheckChooseStrategyForSoloModeAndvariPhase: ({ G, ctx }: Context) => CanBeVoid<boolean>;
/**
 * <h3>Проверяет необходимость завершения хода в фазе 'chooseDifficultySoloModeAndvari'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При каждом действии в фазе 'chooseDifficultySoloModeAndvari'.</li>
 * </ol>
 *
 * @param context
 * @returns Необходимость завершения текущего хода.
 */
export declare const CheckEndChooseStrategyForSoloModeAndvariTurn: ({ G, ctx }: Context) => CanBeVoid<boolean>;
/**
 * <h3>Действия при завершении фазы 'chooseDifficultySoloModeAndvari'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При завершении фазы 'chooseDifficultySoloModeAndvari'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const EndChooseStrategyForSoloModeAndvariActions: ({ G }: Context) => void;
/**
 * <h3>Действия при завершении мува в фазе 'chooseDifficultySoloModeAndvari'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При завершении мува в фазе 'chooseDifficultySoloModeAndvari'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const OnChooseStrategyForSoloModeAndvariMove: ({ ...rest }: Context) => void;
/**
 * <h3>Действия при начале хода в фазе 'chooseDifficultySoloModeAndvari'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При начале хода в фазе 'chooseDifficultySoloModeAndvari'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const OnChooseStrategyForSoloModeAndvariTurnBegin: ({ G, ctx, random, ...rest }: Context) => void;
//# sourceMappingURL=ChooseStrategyForSoloModeAndvariHooks.d.ts.map