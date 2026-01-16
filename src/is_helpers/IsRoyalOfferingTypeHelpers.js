import { CardRusNames } from "../typescript/enums";
/**
 * <h3>Проверка, является ли объект картой улучшения монеты.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При проверках в функциях.</li>
 * </ol>
 *
 * @param card Карта.
 * @returns Является ли объект картой улучшения монеты.
 */
export const IsRoyalOfferingCard = (card) => card !== null && card.type === CardRusNames.RoyalOfferingCard;
//# sourceMappingURL=IsRoyalOfferingTypeHelpers.js.map