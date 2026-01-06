import type { AllPickedCard, Context, PlayerBoardCard, PlayerID } from "../typescript/interfaces";
/**
 * <h3>Добавляет взятую карту в массив карт игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при взятии карты из текущей таверны.</li>
 * <li>Происходит при взятии карты из карт преимущества по разведчикам в конце 1 эпохи.</li>
 * <li>Происходит при взятии карты из сброса при активации героя.</li>
 * <li>Происходит при взятии карты из сброса при активации карты лагеря.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param card Карта.
 * @returns
 */
export declare const AddCardToPlayerBoardCards: ({ G, ...rest }: Context, playerID: PlayerID, card: PlayerBoardCard) => void;
/**
 * <h3>Добавляет взятую карту в массив карт игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при взятии карты из текущей таверны.</li>
 * <li>Происходит при взятии карты из карт преимущества по разведчикам в конце 1 эпохи.</li>
 * <li>Происходит при взятии карты из сброса при активации героя.</li>
 * <li>Происходит при взятии карты из сброса при активации карты лагеря.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param pickedCard Выбранная карта дворфа/мифического существа или улучшения монет.
 * @returns Добавлена ли карта на поле игрока.
 */
export declare const AddAnyCardToPlayerActions: ({ G, ctx, ...rest }: Context, playerID: PlayerID, pickedCard: AllPickedCard) => void;
//# sourceMappingURL=CardHelpers.d.ts.map