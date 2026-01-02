import { CardRusNames } from "../typescript/enums";
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
export const IsGiantCard = (card) => card.type === CardRusNames.GiantCard;
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
export const IsMythicalAnimalPlayerCard = (card) => card.type === CardRusNames.MythicalAnimalPlayerCard;
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
export const IsValkyryCard = (card) => card.type === CardRusNames.ValkyryCard;
//# sourceMappingURL=IsMythologicalCreatureTypeHelpers.js.map