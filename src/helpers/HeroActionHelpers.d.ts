import type { Context, PlayerBoardCard, PlayerID } from "../typescript/interfaces";
/**
 * <h3>Действия, связанные с проверкой перемещения героя Труд или выбора героя.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При добавлении карт, героев или карт лагеря, помещающихся на карту героя Труд на игровом поле игрока.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param card Карта, помещающаяся на карту героя Труд.
 * @returns
 */
export declare const CheckAndMoveThrudAction: ({ G, ctx, ...rest }: Context, playerID: PlayerID, card: PlayerBoardCard) => void;
//# sourceMappingURL=HeroActionHelpers.d.ts.map