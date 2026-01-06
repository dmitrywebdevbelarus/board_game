import { SuitNames } from "../typescript/enums";
import type { CompareTavernCards, Context, DwarfCard, PlayersNumberTierCardData, TavernAllCardsArray, TavernCard, TavernPossibleCardId } from "../typescript/interfaces";
/**
 * <h3>Сравнивает значения очков основной карт из таверны с остальными картами.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При вычислении сравнения значений карт для ботов.</li>
 * </oL>
 *
 * @param compareCard Основная сравниваемая карта.
 * @param card2 Остальная карта в таверне для сравнения.
 * @returns Сравнительное значение.
 */
export declare const CompareCardsInTavern: (compareCard: TavernCard, card2: TavernCard) => CompareTavernCards;
/**
 * <h3>ДОБАВИТЬ ОПИСАНИЕ.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>ДОБАВИТЬ ПРИМЕНЕНИЯ.</li>
 * </oL>
 *
 * @TODO Саше: сделать описание функции и параметров.
 * @param context
 * @param compareCard Карта для сравнения.
 * @param cardId Id карты.
 * @param tavern Таверна.
 * @returns Сравнительное значение.
 */
export declare const EvaluateTavernCard: ({ G, ctx, ...rest }: Context, compareCard: TavernCard, cardId: TavernPossibleCardId, tavern: TavernAllCardsArray) => number;
/**
 * <h3>Определяет "среднюю карту" в конкретной фракции, определяющую сколько в среднем очков она приносит.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При инициализации игры для каждой фракции.</li>
 * </oL>
 *
 * @param suit Фракция дворфов.
 * @param data Данные о количестве игроков и эпохах.
 * @returns "Средняя" карта дворфа.
 */
export declare const GetAverageSuitCard: (suit: SuitNames, data: PlayersNumberTierCardData) => DwarfCard;
//# sourceMappingURL=BotCardLogic.d.ts.map