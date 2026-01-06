import { SuitNames } from "../typescript/enums";
import type { AllDiscardCard, CampCard, CampDeckCard, Context, PlayerBoardCard, PlayerID, TavernCardWithPossibleExpansion, TavernPossibleCardId } from "../typescript/interfaces";
/**
 * <h3>Действия, связанные с убиранием фракционной карты со стола игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При действиях, убирающих фракционные карты со стола игрока.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param suit Название фракции дворфов.
 * @param cardId Id убираемой карты.
 * @returns Убранная карта.
 */
export declare const RemoveCardFromPlayerBoardSuitCards: ({ G, ...rest }: Context, playerID: PlayerID, suit: SuitNames, cardId: number) => PlayerBoardCard;
/**
 * <h3>Действия, связанные с убиранием из таверны карты.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе карты из таверны.</li>
 * <li>При ручном сбросе конкретной карты из таверны.</li>
 * <li>При автоматическом сбросе оставшейся карты из таверны.</li>
 * </ol>
 *
 * @param context
 * @param tavernCardId Id убираемой из таверны карты.
 * @returns Убранная из таверны карта.
 */
export declare const RemoveCardFromTavern: ({ G, ...rest }: Context, tavernCardId: TavernPossibleCardId) => TavernCardWithPossibleExpansion;
/**
 * <h3>Действия, связанные с убиранием карт из лагеря.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При действиях, убирающих карты из лагеря.</li>
 * </ol>
 *
 * @param context
 * @param campCardId Id убираемой карты из лагеря.
 * @param addToCampArray Массив добавляемых в лагерь элементов.
 * @returns Убранная карта из лагеря.
 */
export declare const RemoveCardsFromCampAndAddIfNeeded: ({ G }: Context, campCardId: 0 | 1 | 2 | 3 | 4, addToCampArray: CampCard[]) => CampCard;
/**
 * <h3>Действия, связанные с сбросом карт от действий сбрасывающих карты.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При действиях сбрасывающих карты.</li>
 * </ol>
 *
 * @param context
 * @param discardedCardsArray Сбрасываемые карты.
 * @returns
 */
export declare const DiscardAllCurrentCards: ({ ...rest }: Context, discardedCardsArray: CampDeckCard[]) => void;
/**
 * <h3>Действия, связанные с сбросом карты от действий сбрасывающих карты.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При действиях сбрасывающих карты.</li>
 * </ol>
 *
 * @param context
 * @param discardedCard Сбрасываемая карта.
 * @returns
 */
export declare const DiscardCurrentCard: ({ G }: Context, discardedCard: AllDiscardCard) => void;
//# sourceMappingURL=DiscardCardHelpers.d.ts.map