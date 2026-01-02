import { ThrowMyError } from "../Error";
import { CardRusNames, ErrorNames, SuitNames, SuitRusNames } from "../typescript/enums";
import type { AllDiscardCard, CampCard, CampCardArrayIndex, CampDeckCard, CanBeUndef, Context, PlayerBoardCard, PlayerID, PublicPlayer, TavernAllCardsArray, TavernCard, TavernCardWithPossibleExpansion, TavernPossibleCardId } from "../typescript/interfaces";

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
export const RemoveCardFromPlayerBoardSuitCards = (
    { G, ...rest }: Context,
    playerID: PlayerID,
    suit: SuitNames,
    cardId: number,
): PlayerBoardCard => {
    const player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError(
            { G, ...rest },
            ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
            playerID,
        );
    }
    const removedCard: CanBeUndef<PlayerBoardCard> =
        player.cards[suit].splice(cardId, 1)[0];
    if (removedCard === undefined) {
        throw new Error(`В массиве карт игрока с id '${playerID}' отсутствует выбранная карта во фракции '${SuitRusNames[suit]}' с id '${cardId}': это должно проверяться в MoveValidator.`);
    }
    return removedCard;
};

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
export const RemoveCardFromTavern = (
    { G, ...rest }: Context,
    tavernCardId: TavernPossibleCardId,
): TavernCardWithPossibleExpansion => {
    const currentTavern: TavernAllCardsArray = G.taverns[G.currentTavern],
        removedTavernCard: CanBeUndef<TavernCard> = currentTavern[tavernCardId];
    if (removedTavernCard === undefined) {
        return ThrowMyError(
            { G, ...rest },
            ErrorNames.CurrentTavernCardWithCurrentIdIsUndefined,
            tavernCardId,
        );
    }
    if (removedTavernCard === null) {
        return ThrowMyError(
            { G, ...rest },
            ErrorNames.CurrentTavernCardWithCurrentIdIsNull,
            tavernCardId,
        );
    }
    currentTavern.splice(tavernCardId, 1, null);
    return removedTavernCard;
};

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
export const RemoveCardsFromCampAndAddIfNeeded = (
    { G }: Context,
    campCardId: CampCardArrayIndex,
    addToCampArray: CampCard[],
): CampCard => {
    const removedCampCard: CanBeUndef<CampCard> =
        G.camp.splice(campCardId, 1, ...addToCampArray)[0];
    if (removedCampCard === undefined) {
        throw new Error(`В массиве карт лагеря отсутствует карта лагеря с id '${campCardId}' для сброса.`);
    }
    return removedCampCard;
};

// TODO Rework CampDeckCardType[] to universal all discarded card types
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
export const DiscardAllCurrentCards = (
    { ...rest }: Context,
    discardedCardsArray: CampDeckCard[],
): void => {
    for (let i = 0; i < discardedCardsArray.length; i++) {
        const campCard: CanBeUndef<CampDeckCard> = discardedCardsArray[i];
        if (campCard === undefined) {
            throw new Error(`Сброшенная карта не может отсутствовать в массиве карт для сброса.`);
        }
        DiscardCurrentCard({ ...rest }, campCard);
    }
};

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
export const DiscardCurrentCard = (
    { G }: Context,
    discardedCard: AllDiscardCard,
): void => {
    let _exhaustiveCheck: never;
    switch (discardedCard.type) {
        case CardRusNames.MercenaryCard:
        case CardRusNames.MercenaryPlayerCard:
        case CardRusNames.ArtefactCard:
        case CardRusNames.ArtefactPlayerCard:
            G.discardCampCardsDeck.push(discardedCard);
            break;
        case CardRusNames.DwarfCard:
        case CardRusNames.DwarfPlayerCard:
        case CardRusNames.RoyalOfferingCard:
            G.discardCardsDeck.push(discardedCard);
            break;
        case CardRusNames.GiantCard:
        case CardRusNames.GodCard:
        case CardRusNames.ValkyryCard:
        case CardRusNames.MythicalAnimalCard:
        case CardRusNames.MythicalAnimalPlayerCard:
            G.discardMythologicalCreaturesCards.push(discardedCard);
            break;
        case CardRusNames.SpecialPlayerCard:
            G.discardSpecialCards.push(discardedCard);
            break;
        case CardRusNames.MultiSuitPlayerCard:
            G.discardMultiCards.push(discardedCard);
            break;
        case CardRusNames.HeroPlayerCard:
            throw new Error(`Сброшенная карта не может быть с типом '${CardRusNames.HeroPlayerCard}'.`);
        default:
            _exhaustiveCheck = discardedCard;
            throw new Error(`Сброшенная карта не может быть с недопустимым для сброса типом.`);
            return _exhaustiveCheck;
    }
};
