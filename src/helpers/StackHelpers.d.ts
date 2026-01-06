import type { CardsHasStack, Context, PlayerID, Stack } from "../typescript/interfaces";
/**
 * <h3>Добавляет действия в стек действий конкретного игрока после текущего.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Выполняется при необходимости добавить действия в стек действий после текущего.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param stack Стек действий.
 * @param card Карта.
 * @returns
 */
export declare const AddActionsToStack: ({ G, ctx, ...rest }: Context, playerID: PlayerID, stack?: Stack[] | undefined, card?: CardsHasStack | undefined) => void;
//# sourceMappingURL=StackHelpers.d.ts.map