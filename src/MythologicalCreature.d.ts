import type { CreateMythicalAnimalPlayerCardFromData, MythicalAnimalPlayerCard, MythologicalCreatureCard, MythologicalCreatureDecks, NumPlayers } from "./typescript/interfaces";
/**
 * <h3>Создаёт все карты Мифических существ.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при инициализации игры.</li>
 * </ol>
 *.
 * @returns Все карты Мифических существ.
 */
export declare const BuildMythologicalCreatureCards: () => MythologicalCreatureCard[];
/**
 * <h3>Создаёт колоды карт Мифических существ.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при инициализации игры.</li>
 * </ol>
 *
 * @param mythologicalCreatureCardsDeck Колода карт мифических существ.
 * @returns Колода карт мифических существ для выбора игроками/Колода оставшихся карт мифических существ.
 */
export declare const BuildMythologicalCreatureDecks: (mythologicalCreatureCardsDeck: MythologicalCreatureCard[], playersNum: NumPlayers) => MythologicalCreatureDecks;
/**
 * <h3>Создание карты мифического животного на поле игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при создании конкретной карты мифического животного на поле игрока.</li>
 * </ol>
 *
 * @param description Описание.
 * @param name Название.
 * @param points Очки.
 * @param rank Шевроны.
 * @param suit Название фракции дворфов.
 * @param type Тип.
 * @returns Карта мифического животного на поле игрока.
 */
export declare const CreateMythicalAnimalPlayerCard: ({ description, name, points, rank, suit, type, }: CreateMythicalAnimalPlayerCardFromData) => MythicalAnimalPlayerCard;
//# sourceMappingURL=MythologicalCreature.d.ts.map