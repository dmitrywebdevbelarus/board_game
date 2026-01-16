import { CardRusNames } from "../typescript/enums";
import type { DwarfCard, DwarfPlayerCard } from "../typescript/interfaces";

/**
 * <h3>Проверка, является ли объект картой дворфа.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При проверках в функциях.</li>
 * </ol>
 *
 * @param card Карта.
 * @returns Является ли объект картой дворфа.
 */
export const IsDwarfCard = (
    card: unknown,
): card is DwarfCard => card !== null && (card as DwarfCard).type === CardRusNames.DwarfCard;

export const IsDwarfPlayerCard = (
    card: unknown,
): card is DwarfPlayerCard => card !== null && (card as DwarfPlayerCard).type === CardRusNames.DwarfPlayerCard;
