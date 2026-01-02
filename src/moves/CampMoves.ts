import { IsValidMove } from "../MoveValidator";
import { AddCoinToPouchAction, ChooseCoinValueForVidofnirVedrfolnirUpgradeAction, DiscardSuitCardAction, PickCampCardAction, UpgradeCoinVidofnirVedrfolnirAction } from "../actions/CampActions";
import { AssertBasicVidofnirVedrfolnirUpgradeValue, AssertCampIndex, AssertPlayerCoinId, AssertPlayerPouchCoinId } from "../is_helpers/AssertionTypeHelpers";
import { ButtonMoveNames, CardMoveNames, CoinMoveNames, CoinNames, CommonStageNames, InvalidMoveNames, TavernsResolutionDefaultStageNames } from "../typescript/enums";
import { BasicVidofnirVedrfolnirUpgradeValue, CampCardArrayIndex, CanBeVoid, GetMoveArgument, InvalidMove, MoveContext, MoveFn, PlayerCoinId, PlayerPouchCoinId } from "../typescript/interfaces";

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
export const AddCoinToPouchMove: MoveFn<GetMoveArgument<CoinMoveNames.AddCoinToPouchMove>> = (
    { playerID, ...rest }: MoveContext,
    coinId: PlayerCoinId,
): CanBeVoid<InvalidMove> => {
    AssertPlayerCoinId(coinId);
    const isValidMove: boolean = IsValidMove(
        { playerID, ...rest },
        CommonStageNames.AddCoinToPouch,
        CoinMoveNames.AddCoinToPouchMove,
        coinId,
    );
    if (!isValidMove) {
        return InvalidMoveNames.INVALID_MOVE;
    }
    AddCoinToPouchAction(
        { ...rest },
        playerID,
        coinId,
    );
};

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
export const ChooseCoinValueForVidofnirVedrfolnirUpgradeMove:
    MoveFn<GetMoveArgument<ButtonMoveNames.ChooseCoinValueForVidofnirVedrfolnirUpgradeMove>> = (
        { playerID, ...rest }: MoveContext,
        value: BasicVidofnirVedrfolnirUpgradeValue,
    ): CanBeVoid<InvalidMove> => {
        AssertBasicVidofnirVedrfolnirUpgradeValue(value);
        const isValidMove: boolean = IsValidMove(
            { playerID, ...rest },
            CommonStageNames.ChooseCoinValueForVidofnirVedrfolnirUpgrade,
            ButtonMoveNames.ChooseCoinValueForVidofnirVedrfolnirUpgradeMove,
            value,
        );
        if (!isValidMove) {
            return InvalidMoveNames.INVALID_MOVE;
        }
        ChooseCoinValueForVidofnirVedrfolnirUpgradeAction(
            { ...rest },
            playerID,
            value,
        );
    };

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
export const ClickCampCardHoldaMove: MoveFn<GetMoveArgument<CardMoveNames.ClickCampCardHoldaMove>> = (
    { playerID, ...rest }: MoveContext,
    campCardId: CampCardArrayIndex,
): CanBeVoid<InvalidMove> => {
    AssertCampIndex(campCardId);
    const isValidMove: boolean = IsValidMove(
        { playerID, ...rest },
        CommonStageNames.ClickCampCardHolda,
        CardMoveNames.ClickCampCardHoldaMove,
        campCardId,
    );
    if (!isValidMove) {
        return InvalidMoveNames.INVALID_MOVE;
    }
    PickCampCardAction(
        { ...rest },
        playerID,
        campCardId,
    );
};

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
export const ClickCampCardMove: MoveFn<GetMoveArgument<CardMoveNames.ClickCampCardMove>> = (
    { playerID, ...rest }: MoveContext,
    campCardId: CampCardArrayIndex,
): CanBeVoid<InvalidMove> => {
    AssertCampIndex(campCardId);
    const isValidMove: boolean = IsValidMove(
        { playerID, ...rest },
        TavernsResolutionDefaultStageNames.ClickCampCard,
        CardMoveNames.ClickCampCardMove,
        campCardId,
    );
    if (!isValidMove) {
        return InvalidMoveNames.INVALID_MOVE;
    }
    PickCampCardAction(
        { ...rest },
        playerID,
        campCardId,
    );
};

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
export const DiscardSuitCardFromPlayerBoardMove:
    MoveFn<GetMoveArgument<CardMoveNames.DiscardSuitCardFromPlayerBoardMove>> = (
        { playerID, ...rest }: MoveContext,
        // TODO Can i refactor number?!
        cardId: number,
    ): CanBeVoid<InvalidMove> => {
        const isValidMove: boolean = IsValidMove(
            { playerID, ...rest },
            CommonStageNames.DiscardSuitCardFromPlayerBoard,
            CardMoveNames.DiscardSuitCardFromPlayerBoardMove,
            {
                cardId,
            },
        );
        if (!isValidMove) {
            return InvalidMoveNames.INVALID_MOVE;
        }
        DiscardSuitCardAction(
            { ...rest },
            playerID,
            cardId,
        );
    };

// TODO type: CoinTypeNames => string and asserts it value if no other strings can be valid in moves!?
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
export const UpgradeCoinVidofnirVedrfolnirMove:
    MoveFn<GetMoveArgument<CoinMoveNames.UpgradeCoinVidofnirVedrfolnirMove>> = (
        { playerID, ...rest }: MoveContext,
        // TODO Check if PlayerPouchCoinIdType work correctly!
        coinId: PlayerPouchCoinId,
        type: CoinNames,
    ): CanBeVoid<InvalidMove> => {
        AssertPlayerPouchCoinId(coinId);
        const isValidMove: boolean = IsValidMove(
            { playerID, ...rest },
            CommonStageNames.UpgradeCoinVidofnirVedrfolnir,
            CoinMoveNames.UpgradeCoinVidofnirVedrfolnirMove,
            {
                coinId,
                type,
            },
        );
        if (!isValidMove) {
            return InvalidMoveNames.INVALID_MOVE;
        }
        UpgradeCoinVidofnirVedrfolnirAction(
            { ...rest },
            playerID,
            coinId,
            type,
        );
    };
