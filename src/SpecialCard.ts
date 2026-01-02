import { specialCardsConfig } from "./data/SpecialCardData";
import { CardRusNames } from "./typescript/enums";
import type { CreateSpecialCardFromData, CreateSpecialPlayerCardFromData, SpecialCard, SpecialCardData, SpecialCardNamesKeyof, SpecialPlayerCard } from "./typescript/interfaces";

/**
 * <h3>Создание особых карт.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при создании особых карт во время получения преимущества по фракции 'Кузнецы'.</li>
 * </ol>
 *
 * @returns Массив особых карт.
 */
export const BuildSpecialCards = (): SpecialCard[] => {
    const cards: SpecialCard[] = [];
    let cardName: SpecialCardNamesKeyof;
    for (cardName in specialCardsConfig) {
        const card: SpecialCardData = specialCardsConfig[cardName];
        cards.push(CreateSpecialCard({
            name: card.name,
            playerSuit: card.playerSuit,
            points: card.points,
            rank: card.rank,
        }));
    }
    return cards;
};

/**
 * <h3>Создание особой карты.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при создании всех особых карт при инициализации игры.</li>
 * </ol>
 *
 * @param name Название.
 * @param playerSuit Название фракции дворфов.
 * @param points Очки.
 * @param rank Шевроны.
 * @param type Тип.
 * @returns Особая карта.
 */
const CreateSpecialCard = ({
    name,
    playerSuit,
    points = null,
    rank = 2,
    type = CardRusNames.SpecialCard,
}: CreateSpecialCardFromData): SpecialCard => ({
    name,
    playerSuit,
    points,
    rank,
    type,
});

/**
 * <h3>Создание особой карты на поле игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при создании конкретной особой карты на поле игрока.</li>
 * </ol>
 *
 * @param name Название.
 * @param points Очки.
 * @param rank Шевроны.
 * @param suit Название фракции дворфов.
 * @param type Тип.
 * @returns Особая карта на поле игрока.
 */
export const CreateSpecialCardPlayerCard = ({
    name,
    points = null,
    rank = 2,
    suit,
    type = CardRusNames.SpecialPlayerCard,
}: CreateSpecialPlayerCardFromData): SpecialPlayerCard => ({
    name,
    points,
    rank,
    suit,
    type,
});
