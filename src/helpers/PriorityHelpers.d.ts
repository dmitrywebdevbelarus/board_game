import type { Context, PlayerID } from "../typescript/interfaces";
/**
 * <h3>Определяет наличие у выбранного игрока наименьшего кристалла.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Используется для ботов при определении приоритета выставления монет.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @returns Имеет ли игрок наименьший кристалл.
 */
export declare const HasLowestPriority: ({ G, ...rest }: Context, playerID: PlayerID) => boolean;
/**
 * <h3>Изменяет приоритет игроков для выбора карт из текущей таверны.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Используется в конце фазы выбора карт.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const ChangePlayersPriorities: ({ G, ctx, ...rest }: Context) => void;
//# sourceMappingURL=PriorityHelpers.d.ts.map