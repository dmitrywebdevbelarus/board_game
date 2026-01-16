import { RoyalOfferingCard } from "../typescript/interfaces";
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
export const IsRoyalOfferingCard = (
    card: unknown,
): card is RoyalOfferingCard => card !== null && (card as RoyalOfferingCard).type === CardRusNames.RoyalOfferingCard;
