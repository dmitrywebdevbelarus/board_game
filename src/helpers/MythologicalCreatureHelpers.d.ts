import { SuitNames, ValkyryBuffNames } from "../typescript/enums";
import type { Context, PlayerID } from "../typescript/interfaces";
/**
 * <h3>Проверяет выполнение условия свойства валькирии Olrun.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при каждом действии, которое может выполнить условие свойства валькирии Olrun.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @returns Может ли быть выполнено свойство валькирии Olrun.
 */
export declare const CheckIfRecruitedCardEqualSuitIdForOlrun: ({ G, ...rest }: Context, playerID: PlayerID, suit: SuitNames) => boolean;
/**
 * <h3>Проверяет выполнение условия свойства валькирии.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при каждом действии, которое может выполнить условие свойства валькирии.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param buffName Баф.
 * @returns
 */
export declare const CheckValkyryRequirement: ({ G, ...rest }: Context, playerID: PlayerID, buffName: ValkyryBuffNames) => void;
//# sourceMappingURL=MythologicalCreatureHelpers.d.ts.map