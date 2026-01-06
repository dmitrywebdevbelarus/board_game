import type { GiantCard, MythicalAnimalPlayerCard, ValkyryCard } from "../typescript/interfaces";
/**
 * <h3>Проверка, является ли объект картой гиганта.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При проверках в функциях.</li>
 * </ol>
 *
 * @param card Карта.
 * @returns Является ли объект картой гиганта.
 */
export declare const IsGiantCard: (card: unknown) => card is GiantCard;
/**
 * <h3>Проверка, является ли объект картой мифического животного на поле игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При проверках в функциях.</li>
 * </ol>
 *
 * @param card Карта.
 * @returns Является ли объект картой мифического животного на поле игрока.
 */
export declare const IsMythicalAnimalPlayerCard: (card: unknown) => card is MythicalAnimalPlayerCard;
/**
* <h3>Проверка, является ли объект картой валькирии.</h3>
* <p>Применения:</p>
* <ol>
* <li>При проверках в функциях.</li>
* </ol>
*
* @param card Карта.
* @returns Является ли объект картой валькирии.
*/
export declare const IsValkyryCard: (card: unknown) => card is ValkyryCard;
//# sourceMappingURL=IsMythologicalCreatureTypeHelpers.d.ts.map