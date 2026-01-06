import type { CanBeVoid, Context } from "../typescript/interfaces";
/**
 * <h3>Проверяет необходимость завершения хода в любой фазе.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При проверке завершения любой фазы.</li>
 * </ol>
 *
 * @param context
 * @returns Должна ли быть завершена фаза.
 */
export declare const EndTurnActions: ({ G, ctx, ...rest }: Context) => CanBeVoid<true>;
/**
 * <h3>Удаляет Труд в конце игры с поля игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит в конце матча после всех игровых событий.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const RemoveThrudFromPlayerBoardAfterGameEnd: ({ G, ctx, ...rest }: Context) => void;
/**
 * <h3>Действия старта или завершения действий при завершении мува в любой фазе.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При завершении мува в любой фазе.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const StartOrEndActions: ({ G, ctx, ...rest }: Context) => void;
//# sourceMappingURL=GameHooksHelpers.d.ts.map