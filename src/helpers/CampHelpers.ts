import { AssertCampIndex, AssertSecretAllCampDecksIndex, AssertTierIndex } from "../is_helpers/AssertionTypeHelpers";
import { AddDataToLog } from "../Logging";
import { DiscardCardFromTavern, tavernsConfig } from "../Tavern";
import { ArtefactNames, LogNames } from "../typescript/enums";
import type { CampCard, CampCardArrayIndex, CampDeckCard, CanBeNull, CanBeUndef, Context, SecretCampDeck, SecretCampDeckTier1 } from "../typescript/interfaces";
import { GetCampCardsFromSecretCampDeck } from "./DecksHelpers";
import { DiscardAllCurrentCards, DiscardCurrentCard, RemoveCardsFromCampAndAddIfNeeded } from "./DiscardCardHelpers";

/**
* <h3>Заполняет лагерь новой картой из карт лагерь деки текущей эпохи.</h3>
* <p>Применения:</p>
* <ol>
* <li>Происходит при заполнении лагеря недостающими картами.</li>
* <li>Происходит при заполнении лагеря картами новой эпохи.</li>
* </ol>
*
* @param context
* @param cardId Индекс карты.
* @returns
*/
const AddCardToCamp = (
    { G, ...rest }: Context,
    cardId: CampCardArrayIndex,
): void => {
    const tier: number = G.secret.campDecks.length - G.tierToEnd;
    AssertTierIndex(tier);
    const newCampCard: CanBeUndef<CampDeckCard> = GetCampCardsFromSecretCampDeck(
        { G, ...rest },
        tier,
        1,
    )[0];
    if (newCampCard === undefined) {
        throw new Error(`Отсутствует карта лагеря в колоде карт лагеря текущей эпохи '${G.secret.campDecks.length - G.tierToEnd}'.`);
    }
    RemoveCardsFromCampAndAddIfNeeded(
        { G, ...rest },
        cardId,
        [newCampCard],
    );
};

/**
 * <h3>Перемещает все оставшиеся неиспользованные карты лагеря в колоду сброса.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит в конце 1-й эпохи.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
const AddRemainingCampCardsToDiscard = (
    { G, ...rest }: Context,
): void => {
    // TODO Add LogTypes.ERROR logging? Must be only 1-2 discarded card in specific condition!?
    for (let i = 0; i < G.campNum; i++) {
        AssertCampIndex(i);
        const campCard: CampCard = G.camp[i];
        if (campCard !== null) {
            const discardedCard: CampCard = RemoveCardsFromCampAndAddIfNeeded(
                { G, ...rest },
                i,
                [null],
            );
            if (discardedCard !== null) {
                DiscardCurrentCard(
                    { G, ...rest },
                    discardedCard,
                );
            }
        }
    }
    const currentTier: number = G.secret.campDecks.length - G.tierToEnd - 1;
    AssertSecretAllCampDecksIndex(currentTier);
    // TODO DiscardCardType!?
    const discardedCardsArray: CampDeckCard[] = G.secret.campDecks[currentTier];
    if (discardedCardsArray.length) {
        DiscardAllCurrentCards(
            { G, ...rest },
            discardedCardsArray,
        );
        AssertTierIndex(currentTier);
        GetCampCardsFromSecretCampDeck(
            { G, ...rest },
            currentTier,
        );
    }
    AddDataToLog(
        { G, ...rest },
        LogNames.Game,
        `Оставшиеся карты лагеря сброшены.`,
    );
};

/**
 * <h3>Убирает одну лишнюю карту из таверны в стопку сброса, если какой-то игрок выбрал в лагере артефакт Jarnglofi и если сброшенная обменная монета была выложена на месте одной из таверн.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе каким-то игроком в лагере артефакта Jarnglofi, если сброшенная обменная монета была выложена на месте одной из таверн.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export const DiscardCardFromTavernJarnglofi = (
    { G, ...rest }: Context,
): void => {
    AddDataToLog(
        { G, ...rest },
        LogNames.Game,
        `Лишняя карта из таверны ${tavernsConfig[G.currentTavern].name} должна быть убрана в сброс при выборе артефакта '${ArtefactNames.Jarnglofi}'.`,
    );
    DiscardCardFromTavern({ G, ...rest });
    G.mustDiscardTavernCardJarnglofi = false;
};

/**
 * <h3>Автоматически сбрасывает лишнюю карту таверны в колоду сброса, если первый игрок выбрал карту из лагеря.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Проверяется после каждого выбора карты из таверны, если последний игрок в текущей таверне уже выбрал карту.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export const DiscardCardIfCampCardPicked = (
    { G, ...rest }: Context,
): void => {
    if (G.campPicked) {
        AddDataToLog(
            { G, ...rest },
            LogNames.Game,
            `Лишняя карта из текущей таверны ${tavernsConfig[G.currentTavern].name} должна быть убрана в сброс при после выбора карты лагеря в конце выбора карт из таверны.`,
        );
        DiscardCardFromTavern({ G, ...rest });
        G.campPicked = false;
    }
};

/**
 * <h3>Автоматически заполняет лагерь картами новой эпохи.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при начале новой эпохи.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export const RefillCamp = (
    { G, ...rest }: Context,
): void => {
    AddRemainingCampCardsToDiscard({ G, ...rest });
    const campDeck1: SecretCampDeckTier1 = G.secret.campDecks[1],
        index: number = campDeck1.findIndex((card: CampDeckCard): boolean =>
            card.name === ArtefactNames.OdroerirTheMythicCauldron);
    if (index === -1) {
        throw new Error(`Отсутствует артефакт '${ArtefactNames.OdroerirTheMythicCauldron}' в колоде лагеря '2' эпохи.`);
    }
    const campCardTemp: CanBeUndef<CampDeckCard> = campDeck1[0];
    if (campCardTemp === undefined) {
        throw new Error(`Отсутствует артефакт '${ArtefactNames.OdroerirTheMythicCauldron}' в колоде лагеря '1' эпохи.`);
    }
    const odroerirTheMythicCauldron: CanBeUndef<CampDeckCard> = campDeck1[index];
    if (odroerirTheMythicCauldron === undefined) {
        throw new Error(`В колоде лагеря '2' эпохи отсутствует карта с id '${index}'.`);
    }
    campDeck1[0] = odroerirTheMythicCauldron;
    campDeck1[index] = campCardTemp;
    for (let i = 0; i < G.campNum; i++) {
        AssertCampIndex(i);
        AddCardToCamp(
            { G, ...rest },
            i,
        );
    }
    G.odroerirTheMythicCauldron = true;
    AddDataToLog(
        { G, ...rest },
        LogNames.Game,
        `Кэмп заполнен новыми картами новой эпохи.`,
    );
};

/**
 * <h3>Автоматически заполняет лагерь недостающими картами текущей эпохи.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при начале раунда.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export const RefillEmptyCampCards = (
    { G, ...rest }: Context,
): void => {
    const emptyCampCards: CanBeNull<CampCardArrayIndex>[] =
        G.camp.map((card: CampCard, index: number): CanBeNull<CampCardArrayIndex> => {
            if (card === null) {
                AssertCampIndex(index);
                return index;
            }
            return null;
        }),
        isEmptyCampCards: boolean = emptyCampCards.length === 0,
        currentTier: number = G.secret.campDecks.length - G.tierToEnd;
    AssertSecretAllCampDecksIndex(currentTier);
    const campDeck: SecretCampDeck = G.secret.campDecks[currentTier];
    let isEmptyCurrentTierCampDeck: boolean = campDeck.length === 0;
    if (!isEmptyCampCards && !isEmptyCurrentTierCampDeck) {
        emptyCampCards.forEach((cardIndex: CanBeNull<CampCardArrayIndex>): void => {
            // TODO Is it dynamically change campDeck.length after AddCardToCamp!?
            isEmptyCurrentTierCampDeck = campDeck.length === 0;
            if (cardIndex !== null && !isEmptyCurrentTierCampDeck) {
                AddCardToCamp(
                    { G, ...rest },
                    cardIndex,
                );
            }
        });
        AddDataToLog(
            { G, ...rest },
            LogNames.Game,
            `Кэмп заполнен новыми картами.`,
        );
    }
};
