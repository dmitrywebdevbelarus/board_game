import type { CreateSpecialPlayerCardFromData, SpecialCard, SpecialPlayerCard } from "./typescript/interfaces";
/**
 * <h3>Создание особых карт.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при создании особых карт во время получения преимущества по фракции 'Кузнецы'.</li>
 * </ol>
 *
 * @returns Массив особых карт.
 */
export declare const BuildSpecialCards: () => SpecialCard[];
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
export declare const CreateSpecialCardPlayerCard: ({ name, points, rank, suit, type, }: CreateSpecialPlayerCardFromData) => SpecialPlayerCard;
//# sourceMappingURL=SpecialCard.d.ts.map