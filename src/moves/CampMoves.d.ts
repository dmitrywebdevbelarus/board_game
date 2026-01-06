import { ButtonMoveNames, CardMoveNames, CoinMoveNames } from "../typescript/enums";
import type { GetMoveArgument, MoveFn } from "../typescript/interfaces";
/**
 * <h3>Выбор монеты для выкладки монет в кошель при наличии героя Улина по артефакту Vidofnir Vedrfolnir.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При клике по монете.</li>
 * </ol>
 *
 * @param context
 * @param coinId Id монеты.
 * @returns
 */
export declare const AddCoinToPouchMove: MoveFn<GetMoveArgument<CoinMoveNames.AddCoinToPouchMove>>;
/**
 * <h3>Выбор значения улучшения монеты при наличии персонажа Улина для начала действия артефакта Vidofnir Vedrfolnir.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При клике по конкретному значению обмена монеты.</li>
 * </ol>
 *
 * @param context
 * @param value Значение улучшения монеты.
 * @returns
 */
export declare const ChooseCoinValueForVidofnirVedrfolnirUpgradeMove: MoveFn<GetMoveArgument<ButtonMoveNames.ChooseCoinValueForVidofnirVedrfolnirUpgradeMove>>;
/**
 * <h3>Выбор карты из лагеря по действию персонажа Хольда.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Срабатывает при выборе карты из лагеря по действию персонажа Хольда.</li>
 * </ol>
 *
 * @param context
 * @param campCardId Id выбираемой карты из лагеря.
 * @returns
 */
export declare const ClickCampCardHoldaMove: MoveFn<GetMoveArgument<CardMoveNames.ClickCampCardHoldaMove>>;
/**
 * <h3>Выбор карты из лагеря.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Срабатывает при выборе карты из лагеря.</li>
 * </ol>
 *
 * @param context
 * @param campCardId Id выбираемой карты из лагеря.
 * @returns
 */
export declare const ClickCampCardMove: MoveFn<GetMoveArgument<CardMoveNames.ClickCampCardMove>>;
/**
 * <h3>Сбрасывает карту конкретной фракции в колоду сброса по выбору игрока при действии артефакта Hofud.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Применяется при сбросе карты конкретной фракции в колоду сброса при взятии артефакта Hofud.</li>
 * </ol>
 *
 * @param context
 * @param cardId Id сбрасываемой карты.
 * @returns
 */
export declare const DiscardSuitCardFromPlayerBoardMove: MoveFn<GetMoveArgument<CardMoveNames.DiscardSuitCardFromPlayerBoardMove>>;
/**
 * <h3>Выбор монеты для улучшения по артефакту Vidofnir Vedrfolnir.</h3>
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
export declare const UpgradeCoinVidofnirVedrfolnirMove: MoveFn<GetMoveArgument<CoinMoveNames.UpgradeCoinVidofnirVedrfolnirMove>>;
//# sourceMappingURL=CampMoves.d.ts.map