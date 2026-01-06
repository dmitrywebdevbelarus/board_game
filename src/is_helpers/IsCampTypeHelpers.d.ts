import type { MercenaryCard, MercenaryPlayerCard } from "../typescript/interfaces";
/**
 * <h3>Проверка, является ли объект картой наёмника.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При проверках в функциях.</li>
 * </ol>
 *
 * @param card Карта.
 * @returns Является ли объект картой наёмника.
 */
export declare const IsMercenaryCampCard: (card: unknown) => card is MercenaryCard;
/**
* <h3>Проверка, является ли объект картой наёмника на поле игрока.</h3>
* <p>Применения:</p>
* <ol>
* <li>При проверках в функциях.</li>
* </ol>
*
* @param card Карта.
* @returns Является ли объект картой наёмника на поле игрока.
*/
export declare const IsMercenaryPlayerCampCard: (card: unknown) => card is MercenaryPlayerCard;
//# sourceMappingURL=IsCampTypeHelpers.d.ts.map