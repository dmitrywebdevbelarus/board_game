import type { AIAllObjectives, Ctx, Moves, MyGameState, PlayerID, PlayoutDepth } from "./typescript/interfaces";
/**
 * <h3>Возвращает массив возможных ходов для ботов.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Используется ботами для доступных ходов.</li>
 * </ol>
 *
 * @param G
 * @param ctx
 * @param playerID Id требуемого игрока.
 * @returns Массив возможных мувов у ботов.
 */
export declare const enumerate: (G: MyGameState, ctx: Ctx, playerID: PlayerID) => Moves[];
/**
* <h3>ДОБАВИТЬ ОПИСАНИЕ.</h3>
* <p>Применения:</p>
* <ol>
* <li>ДОБАВИТЬ ПРИМЕНЕНИЯ.</li>
* </oL>
*
* @TODO Саше: сделать описание функции и параметров.
* @param G
* @param ctx
* @param playerID ID требуемого игрока.
* @returns Итерации.
*/
export declare const iterations: (G: MyGameState, ctx: Ctx, playerID?: PlayerID | undefined) => 1 | 1000;
/**
 * <h3>Возвращает цели игры для ботов.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Используется ботами для определения целей.</li>
 * </ol>
 *
 * @param G
 * @param ctx
 * @param playerID ID требуемого игрока.
 * @returns Цели.
 */
export declare const objectives: (G: MyGameState, ctx: Ctx, playerID?: PlayerID | undefined) => AIAllObjectives;
/**
 * <h3>ДОБАВИТЬ ОПИСАНИЕ.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>ДОБАВИТЬ ПРИМЕНЕНИЯ.</li>
 * </oL>
 *
 * @TODO Саше: сделать описание функции и параметров.
 * @param G
 * @param ctx
 * @param playerID ID требуемого игрока.
 * @returns Глубина.
 */
export declare const playoutDepth: (G: MyGameState, ctx: Ctx, playerID?: PlayerID | undefined) => PlayoutDepth;
//# sourceMappingURL=AI.d.ts.map