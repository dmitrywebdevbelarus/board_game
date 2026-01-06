import type { CreateMultiSuitPlayerCardFromData, MultiSuitCard, MultiSuitPlayerCard } from "./typescript/interfaces";
/**
 * <h3>Создание особых мультифракционных карт.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при создании мультифракционных карт во время инициализации игры.</li>
 * </ol>
 *
 * @param configOptions Конфиг опций мультифракционных карт.
 * @returns Массив мультифракционных карт.
 */
export declare const BuildMultiSuitCards: (configOptions: ("Basic" | "Idavoll" | "Thingvellir")[]) => MultiSuitCard[];
/**
 * <h3>Создание мультифракционной карты на поле игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при создании конкретной мультифракционной карты на поле игрока.</li>
 * </ol>
 *
 * @param name Название.
 * @param points Очки.
 * @param rank Шевроны.
 * @param suit Название фракции дворфов.
 * @param type Тип.
 * @returns Мультифракционная карта на поле игрока.
 */
export declare const CreateMultiSuitPlayerCard: ({ name, points, rank, suit, type, }: CreateMultiSuitPlayerCardFromData) => MultiSuitPlayerCard;
//# sourceMappingURL=MultiSuitCard.d.ts.map