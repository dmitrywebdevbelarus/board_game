import { AutoBotsMoveNames, CardMoveNames, CoinMoveNames, EmptyCardMoveNames } from "../typescript/enums";
import type { GetMoveArgument, MoveFn } from "../typescript/interfaces";
/**
 * <h3>Выбор карты из таверны соло ботом Андвари.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе базовой карты из таверны соло ботом Андвари.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param tavernCardId Id карты.
 * @returns
 */
export declare const SoloBotAndvariClickCardMove: MoveFn<GetMoveArgument<CardMoveNames.SoloBotAndvariClickCardMove>>;
/**
 * <h3>Выбор базовой карты из новой эпохи по преимуществу по фракции разведчиков соло ботом Андвари.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе базовой карты из новой эпохи по преимуществу по фракции разведчиков соло ботом Андвари.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param cardId Id карты.
 * @returns
 */
export declare const SoloBotAndvariClickCardToPickDistinctionMove: MoveFn<GetMoveArgument<CardMoveNames.SoloBotAndvariClickCardToPickDistinctionMove>>;
/**
 * <h3>Выбор героя соло ботом Андвари.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При необходимости выбора героя соло ботом Андвари.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param heroId Id героя.
 * @returns
 */
export declare const SoloBotAndvariClickHeroCardMove: MoveFn<GetMoveArgument<CardMoveNames.SoloBotAndvariClickHeroCardMove>>;
/**
 * <h3>Выкладка монет соло ботом Андвари.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Когда соло боту Андвари нужно выложить все монеты на игровой планшет.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param coinsOrder Порядок выкладки монет.
 * @returns
 */
export declare const SoloBotAndvariPlaceAllCoinsMove: MoveFn<GetMoveArgument<AutoBotsMoveNames.SoloBotAndvariPlaceAllCoinsMove>>;
/**
 * <h3>Расположение героя на планшет соло бота Андвари.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе героя Труд со способностью перемещения на планшете соло бота Андвари.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param suit Название фракции дворфов.
 * @returns
 */
export declare const SoloBotAndvariPlaceThrudHeroMove: MoveFn<GetMoveArgument<EmptyCardMoveNames.SoloBotAndvariPlaceThrudHeroMove>>;
/**
 * <h3>Расположение героя на планшет соло бота Андвари.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе героя Илуд со способностью размещения на планшете соло бота Андвари в конце эпохи.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param suit Название фракции дворфов.
 * @returns
 */
export declare const SoloBotAndvariPlaceYludHeroMove: MoveFn<GetMoveArgument<EmptyCardMoveNames.SoloBotAndvariPlaceYludHeroMove>>;
/**
 * <h3>Выбор монеты для улучшения соло ботом Андвари.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При клике по монете соло ботом Андвари.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param coinId Id монеты.
 * @param type Тип монеты.
 * @returns
 */
export declare const SoloBotAndvariClickCoinToUpgradeMove: MoveFn<GetMoveArgument<CoinMoveNames.SoloBotAndvariClickCoinToUpgradeMove>>;
//# sourceMappingURL=SoloBotAndvariMoves.d.ts.map