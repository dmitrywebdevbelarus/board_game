import { AssertRefillDeckCardsWithExpansionArray, AssertRefillDeckCardsWithoutExpansionArray } from "../is_helpers/AssertionTypeHelpers";
/**
 * <h3>Получает необходимое количество карт из деки дворфов нужной эпохи.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При пополнении карт таверны в конце хода игроков.</li>
 * <li>При получении преимуществ по количеству шевронов фракции 'Разведчики' в фазе 'Смотр войск'.</li>
 * </ol>
 *
 * @param context
 * @param tier Эпоха.
 * @param start Id карты, с которой идёт получение карты из деки дворфов.
 * @param amount Количество получаемых карт из деки дворфов.
 * @returns Массив полученных карт дворфов.
 */
export const GetCardsFromSecretDwarfDeck = ({ G }, tier, start, 
// TODO Move to type!
amount) => {
    const currentDeck = G.secret.decks[tier], cards = currentDeck.splice(start, amount);
    if (amount !== cards.length) {
        throw new Error(`Недостаточно карт в массиве карт дворфов конкретной эпохи: требуется - '${amount}', в наличии - '${cards.length}'.`);
    }
    G.decksLength[tier] = currentDeck.length;
    AssertRefillDeckCardsWithoutExpansionArray(cards);
    return cards;
};
/**
 * <h3>Получает необходимое количество карт из деки лагеря нужной эпохи.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При пополнении карт лагеря в конце хода игроков.</li>
 * </ol>
 *
 * @param context
 * @param tier Эпоха.
 * @param amount Количество получаемых карт из деки лагеря.
 * @returns Массив полученных карт лагеря.
 */
export const GetCampCardsFromSecretCampDeck = ({ G }, tier, amount) => {
    const campDeck = G.secret.campDecks[tier], campCards = campDeck.splice(0, amount);
    if (amount !== campCards.length) {
        throw new Error(`Недостаточно карт в массиве карт лагеря конкретной эпохи: требуется - '${amount}', в наличии - '${campCards.length}'.`);
    }
    G.campDecksLength[tier] = campDeck.length;
    return campCards;
};
/**
 * <h3>Получает необходимое количество карт из деки мифических существ.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При пополнении карт таверны в конце хода игроков.</li>
 * </ol>
 *
 * @param context
 * @returns Массив полученных карт мифических существ.
 */
export const GetMythologicalCreatureCardsFromSecretMythologicalCreatureDeck = ({ G }) => {
    const currentCampDeck = G.secret.mythologicalCreatureDeck, mythologicalCreatureCards = currentCampDeck.splice(0, G.drawSize);
    if (G.drawSize !== mythologicalCreatureCards.length) {
        throw new Error(`Недостаточно карт в массиве карт мифических существ: требуется - '${G.drawSize}', в наличии - '${mythologicalCreatureCards.length}'.`);
    }
    G.mythologicalCreatureDeckLength = currentCampDeck.length;
    AssertRefillDeckCardsWithExpansionArray(mythologicalCreatureCards);
    return mythologicalCreatureCards;
};
//# sourceMappingURL=DecksHelpers.js.map