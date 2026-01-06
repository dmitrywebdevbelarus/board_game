import type { ActionFunctionWithoutParams, AutoActionFunction } from "../typescript/interfaces";
/**
 * <h3>Действия, связанные с взятием героя.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При игровых моментах, дающих возможность взять карту героя.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param priority Приоритет выбора героя.
 * @returns
 */
export declare const AddPickHeroAction: AutoActionFunction;
/**
 * <h3>Действия, связанные с возвращением закрытых монет со стола в руку.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе конкретных героев, возвращающих закрытые монеты со стола в руку.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const GetClosedCoinIntoPlayerHandAction: ActionFunctionWithoutParams;
/**
 * <h3>Действия, связанные с улучшением минимальной монеты игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе конкретных героев, улучшающих минимальную монету игрока.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param value Значение обмена монеты.
 * @returns
 */
export declare const UpgradeMinCoinAction: AutoActionFunction;
//# sourceMappingURL=HeroAutoActions.d.ts.map