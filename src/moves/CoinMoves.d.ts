import { CoinMoveNames } from "../typescript/enums";
import type { GetMoveArgument, MoveFn } from "../typescript/interfaces";
/**
 * <h3>Выбор места для монет на столе для выкладки монет.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При клике по месту для монет на столе.</li>
 * </ol>
 *
 * @param context
 * @param coinId Id монеты.
 * @returns
 */
export declare const ClickBoardCoinMove: MoveFn<GetMoveArgument<CoinMoveNames.ClickBoardCoinMove>>;
/**
 * <h3>Выбор монеты для улучшения.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При клике по монете.</li>
 * </ol>
 *
 * @param context
 * @param coinId Id монеты.
 * @param type Тип монеты.
 * @returns
 */
export declare const ClickCoinToUpgradeMove: MoveFn<GetMoveArgument<CoinMoveNames.ClickCoinToUpgradeMove>>;
/**
 * <h3>Выбор конкретной монеты для улучшения.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При клике по конкретной монете.</li>
 * </ol>
 *
 * @param context
 * @param coinId Id монеты.
 * @param type Тип монеты.
 * @returns
 */
export declare const PickConcreteCoinToUpgradeMove: MoveFn<GetMoveArgument<CoinMoveNames.PickConcreteCoinToUpgradeMove>>;
/**
 * <h3>Выбор монеты в руке для выкладки монет.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При клике по монете в руке.</li>
 * </ol>
 *
 * @param context
 * @param coinId Id монеты.
 * @returns
 */
export declare const ClickHandCoinMove: MoveFn<GetMoveArgument<CoinMoveNames.ClickHandCoinMove>>;
/**
 * <h3>Выбор монеты в руке для выкладки монет.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При клике по монете в руке.</li>
 * </ol>
 *
 * @param context
 * @param coinId Id монеты.
 * @returns
 */
export declare const ClickHandCoinUlineMove: MoveFn<GetMoveArgument<CoinMoveNames.ClickHandCoinUlineMove>>;
/**
 * <h3>Выбор монеты в руке для выкладки монет.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При клике по монете в руке.</li>
 * </ol>
 *
 * @param context
 * @param coinId Id монеты.
 * @returns
 */
export declare const ClickHandTradingCoinUlineMove: MoveFn<GetMoveArgument<CoinMoveNames.ClickHandTradingCoinUlineMove>>;
//# sourceMappingURL=CoinMoves.d.ts.map