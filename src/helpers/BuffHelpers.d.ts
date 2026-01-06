import { SuitNames } from "../typescript/enums";
import type { AddBuffToPlayerFunction, AllBuffNames, BuffValue, Context, PlayerID } from "../typescript/interfaces";
/**
 * <h3>Действия, связанные с добавлением бафов игроку.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе конкретных героев, добавляющих бафы игроку.</li>
 * <li>При выборе конкретных артефактов, добавляющих бафы игроку.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param buff Баф.
 * @param value Значение бафа.
 * @returns
 */
export declare const AddBuffToPlayer: AddBuffToPlayerFunction;
/**
 * <h3>Действия, связанные с изменением значения бафа игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При необходимости изменить значение бафа игрока.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param buffName Баф.
 * @param value Новое значение бафа.
 * @returns
 */
export declare const ChangeBuffValue: ({ G, ...rest }: Context, playerID: PlayerID, buffName: AllBuffNames, value: SuitNames) => void;
/**
 * <h3>Действия, связанные с проверкой наличия конкретного бафа у игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В любой ситуации, требующей наличия конкретного бафа у игрока.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param buffName Баф.
 * @returns
 */
export declare const CheckPlayerHasBuff: ({ G, ...rest }: Context, playerID: PlayerID, buffName: AllBuffNames) => boolean;
/**
* <h3>Действия, связанные с удалением бафов у игрока.</h3>
* <p>Применения:</p>
* <ol>
* <li>>В любой ситуации, требующей удаления конкретного бафа у игрока.</li>
* </ol>
*
* @param context
* @param playerID ID требуемого игрока.
* @param buffName Баф.
* @returns
*/
export declare const DeleteBuffFromPlayer: ({ G, ...rest }: Context, playerID: PlayerID, buffName: AllBuffNames) => void;
/**
 * <h3>Действия, связанные с получением значения бафа игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При необходимости получения значения бафа игрока.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param buffName Баф.
 * @returns
 */
export declare const GetBuffValue: ({ G, ...rest }: Context, playerID: PlayerID, buffName: AllBuffNames) => BuffValue;
//# sourceMappingURL=BuffHelpers.d.ts.map