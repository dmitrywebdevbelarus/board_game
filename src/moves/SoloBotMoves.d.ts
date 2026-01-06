import { AutoBotsMoveNames, CardMoveNames, CoinMoveNames, EmptyCardMoveNames } from "../typescript/enums";
import type { GetMoveArgument, MoveFn } from "../typescript/interfaces";
/**
 * <h3>Выбор карты из таверны соло ботом.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе базовой карты из таверны соло ботом.</li>
 * </ol>
 *
 * @param context
 * @param tavernCardId Id карты.
 * @returns
 */
export declare const SoloBotClickCardMove: MoveFn<GetMoveArgument<CardMoveNames.SoloBotClickCardMove>>;
/**
 * <h3>Выбор базовой карты из новой эпохи по преимуществу по фракции разведчиков соло ботом.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе базовой карты из новой эпохи по преимуществу по фракции разведчиков соло ботом.</li>
 * </ol>
 *
 * @param context
 * @param cardId Id карты.
 * @returns
 */
export declare const SoloBotClickCardToPickDistinctionMove: MoveFn<GetMoveArgument<CardMoveNames.SoloBotClickCardToPickDistinctionMove>>;
/**
 * <h3>Выбор героя соло ботом.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При необходимости выбора героя соло ботом.</li>
 * </ol>
 *
 * @param context
 * @param heroId Id героя.
 * @returns
 */
export declare const SoloBotClickHeroCardMove: MoveFn<GetMoveArgument<CardMoveNames.SoloBotClickHeroCardMove>>;
/**
 * <h3>Выкладка монет соло ботом.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Когда соло боту нужно выложить все монеты на игровой планшет.</li>
 * </ol>
 *
 * @param context
 * @param coinsOrder Порядок выкладки монет.
 * @returns
 */
export declare const SoloBotPlaceAllCoinsMove: MoveFn<GetMoveArgument<AutoBotsMoveNames.SoloBotPlaceAllCoinsMove>>;
/**
 * <h3>Расположение героя на планшет соло бота.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе героя Труд со способностью перемещения на планшете соло бота.</li>
 * </ol>
 *
 * @param context
 * @param suit Название фракции дворфов.
 * @returns
 */
export declare const SoloBotPlaceThrudHeroMove: MoveFn<GetMoveArgument<EmptyCardMoveNames.SoloBotPlaceThrudHeroMove>>;
/**
 * <h3>Расположение героя на планшет соло бота.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе героя Илуд со способностью размещения на планшете соло бота в конце эпохи.</li>
 * </ol>
 *
 * @param context
 * @param suit Название фракции дворфов.
 * @returns
 */
export declare const SoloBotPlaceYludHeroMove: MoveFn<GetMoveArgument<EmptyCardMoveNames.SoloBotPlaceYludHeroMove>>;
/**
 * <h3>Выбор монеты для улучшения соло ботом.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При клике по монете соло ботом.</li>
 * </ol>
 *
 * @param context
 * @param coinId Id монеты.
 * @param type Тип монеты.
 * @returns
 */
export declare const SoloBotClickCoinToUpgradeMove: MoveFn<GetMoveArgument<CoinMoveNames.SoloBotClickCoinToUpgradeMove>>;
//# sourceMappingURL=SoloBotMoves.d.ts.map