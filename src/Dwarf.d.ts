import type { CreateDwarfCardFromData, CreateDwarfPlayerCardFromData, DwarfCard, DwarfPlayerCard, PlayersNumberTierCardData } from "./typescript/interfaces";
/**
 * <h3>Создаёт все карты дворфов.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при инициализации игры.</li>
 * </ol>
 *.
 * @param data Данные для создания карт.
 * @returns Все карты дворфов.
 */
export declare const BuildDwarfCards: (data: PlayersNumberTierCardData) => DwarfCard[];
/**
 * <h3>Создание карты дворфа.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при создании всех карт дворфов при инициализации игры.</li>
 * </ol>
 *
 * @param type Тип.
 * @param name Название.
 * @param playerSuit Название фракции дворфов.
 * @param points Очки.
 * @param rank Шевроны.
 * @returns Карта дворфа.
 */
export declare const CreateDwarfCard: ({ name, playerSuit, points, rank, type, }: CreateDwarfCardFromData) => DwarfCard;
/**
 * <h3>Создание карты дворфа на поле игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при создании конкретной карты дворфа на поле игрока.</li>
 * </ol>
 *
 * @param name Название.
 * @param points Очки.
 * @param rank Шевроны.
 * @param suit Название фракции дворфов.
 * @param type Тип.
 * @returns Карта дворфа на поле игрока.
 */
export declare const CreateDwarfPlayerCard: ({ name, points, rank, suit, type, }: CreateDwarfPlayerCardFromData) => DwarfPlayerCard;
//# sourceMappingURL=Dwarf.d.ts.map