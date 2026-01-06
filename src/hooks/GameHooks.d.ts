import type { CanBeVoid, Context, MyGameState } from "../typescript/interfaces";
/**
 * <h3>Проверяет необходимость завершения игры.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При любом действии.</li>
 * </ol>
 *
 * @param context
 * @returns Необходимость завершения игры.
 */
export declare const CheckEndGame: ({ G, ctx, ...rest }: Context) => CanBeVoid<boolean>;
/**
 * <h3>Формирует данные окончания игры.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При завершении игры.</li>
 * </ol>
 *
 * @param context
 * @returns Финальные данные о игре.
 */
export declare const ReturnEndGameData: ({ ...rest }: Context) => CanBeVoid<MyGameState>;
//# sourceMappingURL=GameHooks.d.ts.map