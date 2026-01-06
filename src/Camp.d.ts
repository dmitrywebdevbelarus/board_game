import { TierNames } from "./typescript/enums";
import type { ArtefactPlayerCard, CampDeckCard, CreateArtefactPlayerCardFromData, CreateMercenaryPlayerCardFromData, MercenaryPlayerCard } from "./typescript/interfaces";
/**
 * <h3>Создаёт все карты лагеря конкретной эпохи из конфига.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при инициализации игры.</li>
 * </ol>
 *
 * @param tier Эпоха.
 * @returns Все карты лагеря конкретной эпохи.
 */
export declare const BuildCampCards: (tier: TierNames) => CampDeckCard[];
/**
 * <h3>Создание карты артефакта на поле игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при создании конкретной карты артефакта на поле игрока.</li>
 * </ol>
 *
 * @param description Описание.
 * @param name Название.
 * @param path URL путь.
 * @param points Очки.
 * @param rank Шевроны.
 * @param suit Название фракции дворфов.
 * @param type Тип.
 * @returns Карта артефакта на поле игрока.
 */
export declare const CreateArtefactPlayerCard: ({ description, name, path, points, rank, suit, type, }: CreateArtefactPlayerCardFromData) => ArtefactPlayerCard;
/**
 * <h3>Создание карты наёмника на поле игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при создании конкретной карты наёмника на поле игрока.</li>
 * </ol>
 *
 * @param name Название.
 * @param path URL путь.
 * @param points Очки.
 * @param rank Шевроны.
 * @param suit Название фракции дворфов.
 * @param type Тип.
 * @returns Карта наёмника на поле игрока.
 */
export declare const CreateMercenaryPlayerCard: ({ name, path, points, rank, suit, type, }: CreateMercenaryPlayerCardFromData) => MercenaryPlayerCard;
//# sourceMappingURL=Camp.d.ts.map