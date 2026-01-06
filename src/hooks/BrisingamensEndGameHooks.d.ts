import { PhaseNames } from "../typescript/enums";
import type { CanBeVoid, Context } from "../typescript/interfaces";
/**
 * <h3>Проверяет порядок хода при начале фазы 'brisingamensEndGame'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При начале фазы 'brisingamensEndGame'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const CheckBrisingamensEndGameOrder: ({ G, ctx, ...rest }: Context) => void;
/**
 * <h3>Начинает фазу 'getMjollnirProfit'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При завершении фазы 'brisingamensEndGame'.</li>
 * </ol>
 * @param context
 * @returns Необходимость завершения текущей фазы.
 */
export declare const CheckEndBrisingamensEndGamePhase: ({ G, ctx, ...rest }: Context) => CanBeVoid<true>;
/**
 * <h3>Действия при завершении фазы 'brisingamensEndGame'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При завершении фазы 'brisingamensEndGame'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const EndBrisingamensEndGameActions: ({ G }: Context) => void;
/**
 * <h3>Действия при завершении мува в фазе 'brisingamensEndGame'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При завершении мува в фазе 'brisingamensEndGame'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const OnBrisingamensEndGameMove: ({ ...rest }: Context) => void;
/**
 * <h3>Действия при начале хода в фазе 'brisingamensEndGame'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При начале хода в фазе 'brisingamensEndGame'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const OnBrisingamensEndGameTurnBegin: ({ G, ctx, ...rest }: Context) => void;
/**
 * <h3>Проверяет необходимость начала фазы 'getMjollnirProfit'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При действиях, после которых может начаться фаза 'getMjollnirProfit'.</li>
 * </ol>
 *
 * @param context
 * @returns Фаза игры.
 */
export declare const StartGetMjollnirProfitPhase: ({ G, ctx, ...rest }: Context) => CanBeVoid<PhaseNames>;
//# sourceMappingURL=BrisingamensEndGameHooks.d.ts.map