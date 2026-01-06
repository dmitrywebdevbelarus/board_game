import { CardMoveNames, EmptyCardMoveNames } from "../typescript/enums";
import type { GetMoveArgument, MoveFn } from "../typescript/interfaces";
/**
 * <h3>Выбор героя.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При необходимости выбора героя.</li>
 * </ol>
 *
 * @param context
 * @param heroId Id героя.
 * @returns
 */
export declare const ClickHeroCardMove: MoveFn<GetMoveArgument<CardMoveNames.ClickHeroCardMove>>;
/**
 * <h3>Сброс карты с верха планшета игрока при выборе героя.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе героя со способностью сброса карт с планшета игрока.</li>
 * </ol>
 *
 * @param context
 * @param suit Название фракции дворфов.
 * @param cardId Id карты.
 * @returns
 */
export declare const DiscardTopCardFromSuitMove: MoveFn<GetMoveArgument<CardMoveNames.DiscardTopCardFromSuitMove>>;
/**
 * <h3>Расположение героя или зависимых карт героя на поле игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе героя Ольвин со способностью выкладки карт на поле игрока.</li>
 * </ol>
 *
 * @param context
 * @param suit Название фракции дворфов.
 * @returns
 */
export declare const PlaceMultiSuitCardMove: MoveFn<GetMoveArgument<EmptyCardMoveNames.PlaceMultiSuitCardMove>>;
/**
 * <h3>Расположение героя на поле игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе героя Труд со способностью перемещения на планшете игрока.</li>
 * </ol>
 *
 * @param context
 * @param suit Название фракции дворфов.
 * @returns
 */
export declare const PlaceThrudHeroMove: MoveFn<GetMoveArgument<EmptyCardMoveNames.PlaceThrudHeroMove>>;
/**
 * <h3>Расположение героя на поле игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе героя Илуд со способностью размещения на планшете игрока в конце эпохи.</li>
 * </ol>
 *
 * @param context
 * @param suit Название фракции дворфов.
 * @returns
 */
export declare const PlaceYludHeroMove: MoveFn<GetMoveArgument<EmptyCardMoveNames.PlaceYludHeroMove>>;
//# sourceMappingURL=HeroMoves.d.ts.map