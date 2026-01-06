import type { Context, PlayerID } from "../typescript/interfaces";
/**
 * <h3>Действия, связанные с возможностью сброса карт с планшета игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе конкретных героев, дающих возможность сброса карт с планшета игрока.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param id Id героя.
 * @returns Можно ли пикнуть конкретного героя.
 */
export declare const IsCanPickHeroWithDiscardCardsFromPlayerBoardValidator: ({ G, ...rest }: Context, playerID: PlayerID, id: number) => boolean;
/**
 * <h3>Действия, связанные с выбором героев по определённым условиям.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе конкретных героев, получаемых по определённым условиям.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param id Id героя.
 * @returns Можно ли пикнуть конкретного героя.
 */
export declare const IsCanPickHeroWithConditionsValidator: ({ G, ...rest }: Context, playerID: PlayerID, id: number) => boolean;
//# sourceMappingURL=IsCanPickCurrentHeroValidator.d.ts.map