import { GameModeNames } from "./typescript/enums";
import type { BuildHeroesArray, CreateHeroPlayerCardFromData, HeroPlayerCard } from "./typescript/interfaces";
/**
 * <h3>Создаёт всех героев при инициализации игры.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при создании всех героев при инициализации игры.</li>
 * </ol>
 *
 * @param configOptions Конфиг опций героев.
 * @param mode Режим игры.
 * @returns Массив всех героев.
 */
export declare const BuildHeroes: (configOptions: ("Basic" | "Idavoll" | "Thingvellir")[], mode: GameModeNames) => BuildHeroesArray;
/**
 * <h3>Создание карты героя на поле игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при создании конкретной карты героя на поле игрока.</li>
 * </ol>
 *
 * @param description Описание.
 * @param name Название.
 * @param points Очки.
 * @param rank Шевроны.
 * @param suit Название фракции дворфов.
 * @param type Тип.
 * @returns Карта героя на поле игрока.
 */
export declare const CreateHeroPlayerCard: ({ description, name, points, rank, suit, type, }: CreateHeroPlayerCardFromData) => HeroPlayerCard;
//# sourceMappingURL=Hero.d.ts.map