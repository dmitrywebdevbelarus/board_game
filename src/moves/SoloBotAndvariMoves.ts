import { IsValidMove } from "../MoveValidator";
import { ClickCardAction, PickCardToPickDistinctionAction } from "../actions/Actions";
import { AddHeroToPlayerCardsAction, PlaceThrudAction, PlaceYludAction } from "../actions/HeroActions";
import { UpgradeCoinActions } from "../helpers/CoinActionHelpers";
import { EndWarriorOrExplorerDistinctionIfCoinUpgraded } from "../helpers/DistinctionAwardingHelpers";
import { PlaceAllCoinsInCurrentOrderForSoloBot, PlaceAllCoinsInOrderWithZeroNotOnThePouchForSoloBotAndvari } from "../helpers/SoloBotHelpers";
import { AssertAllHeroesForSoloBotAndvariPossibleCardId, AssertExplorerDistinctionCardId, AssertPlayerCoinId, AssertTavernCardId } from "../is_helpers/AssertionTypeHelpers";
import { AutoBotsMoveNames, BidsDefaultStageNames, CardMoveNames, CoinMoveNames, CoinNames, EmptyCardMoveNames, InvalidMoveNames, PlaceYludDefaultStageNames, SoloBotAndvariCommonStageNames, SuitNames, TavernsResolutionDefaultStageNames, TroopEvaluationStageNames } from "../typescript/enums";
import type { AllHeroesForSoloBotAndvariPossibleCardId, CanBeVoid, ExplorerDistinctionCardId, GetMoveArgument, InvalidMove, MoveContext, MoveFn, PlayerCoinId, TavernPossibleCardId } from "../typescript/interfaces";

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
export const SoloBotAndvariClickCardMove: MoveFn<GetMoveArgument<CardMoveNames.SoloBotAndvariClickCardMove>> = (
    { playerID, ...rest }: MoveContext,
    tavernCardId: TavernPossibleCardId,
): CanBeVoid<InvalidMove> => {
    AssertTavernCardId(tavernCardId);
    const isValidMove: boolean = IsValidMove(
        { playerID, ...rest },
        TavernsResolutionDefaultStageNames.SoloBotClickCard,
        CardMoveNames.SoloBotAndvariClickCardMove,
        tavernCardId,
    );
    if (!isValidMove) {
        return InvalidMoveNames.INVALID_MOVE;
    }
    ClickCardAction(
        { ...rest },
        playerID,
        tavernCardId,
    );
};

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
export const SoloBotAndvariClickCardToPickDistinctionMove:
    MoveFn<GetMoveArgument<CardMoveNames.SoloBotAndvariClickCardToPickDistinctionMove>> = (
        { playerID, ...rest }: MoveContext,
        cardId: ExplorerDistinctionCardId,
    ): CanBeVoid<InvalidMove> => {
        AssertExplorerDistinctionCardId(cardId);
        const isValidMove: boolean = IsValidMove(
            { playerID, ...rest },
            TroopEvaluationStageNames.SoloBotAndvariClickCardToPickDistinction,
            CardMoveNames.SoloBotAndvariClickCardToPickDistinctionMove,
            cardId,
        );
        if (!isValidMove) {
            return InvalidMoveNames.INVALID_MOVE;
        }
        PickCardToPickDistinctionAction(
            { ...rest },
            playerID,
            cardId,
        );
    };

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
export const SoloBotAndvariClickHeroCardMove: MoveFn<GetMoveArgument<CardMoveNames.SoloBotAndvariClickHeroCardMove>> = (
    { playerID, ...rest }: MoveContext,
    heroId: AllHeroesForSoloBotAndvariPossibleCardId,
): CanBeVoid<InvalidMove> => {
    AssertAllHeroesForSoloBotAndvariPossibleCardId(heroId);
    const isValidMove: boolean = IsValidMove(
        { playerID, ...rest },
        SoloBotAndvariCommonStageNames.SoloBotAndvariClickHeroCard,
        CardMoveNames.SoloBotAndvariClickHeroCardMove,
        heroId,
    );
    if (!isValidMove) {
        return InvalidMoveNames.INVALID_MOVE;
    }
    AddHeroToPlayerCardsAction(
        { ...rest },
        playerID,
        heroId,
    );
};

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
export const SoloBotAndvariPlaceAllCoinsMove:
    MoveFn<GetMoveArgument<AutoBotsMoveNames.SoloBotAndvariPlaceAllCoinsMove>> = (
        { G, playerID, ...rest }: MoveContext,
        coinsOrder: PlayerCoinId[],
    ): CanBeVoid<InvalidMove> => {
        const isValidMove: boolean = IsValidMove(
            { G, playerID, ...rest },
            BidsDefaultStageNames.SoloBotAndvariPlaceAllCoins,
            AutoBotsMoveNames.SoloBotAndvariPlaceAllCoinsMove,
            coinsOrder,
        );
        if (!isValidMove) {
            return InvalidMoveNames.INVALID_MOVE;
        }
        if (G.tierToEnd === 2) {
            PlaceAllCoinsInOrderWithZeroNotOnThePouchForSoloBotAndvari(
                { G, ...rest },
                playerID,
            );
        } else if (G.tierToEnd === 1) {
            PlaceAllCoinsInCurrentOrderForSoloBot(
                { G, ...rest },
                playerID,
            );
        }
    };

// TODO suit: SuitNames => string and asserts it value if no other strings can be valid in moves!?
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
export const SoloBotAndvariPlaceThrudHeroMove:
    MoveFn<GetMoveArgument<EmptyCardMoveNames.SoloBotAndvariPlaceThrudHeroMove>> = (
        { playerID, ...rest }: MoveContext,
        suit: SuitNames,
    ): CanBeVoid<InvalidMove> => {
        const isValidMove: boolean = IsValidMove(
            { playerID, ...rest },
            SoloBotAndvariCommonStageNames.SoloBotAndvariPlaceThrudHero,
            EmptyCardMoveNames.SoloBotAndvariPlaceThrudHeroMove,
            suit,
        );
        if (!isValidMove) {
            return InvalidMoveNames.INVALID_MOVE;
        }
        PlaceThrudAction(
            { ...rest },
            playerID,
            suit,
        );
    };

// TODO suit: SuitNames => string and asserts it value if no other strings can be valid in moves!?
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
export const SoloBotAndvariPlaceYludHeroMove:
    MoveFn<GetMoveArgument<EmptyCardMoveNames.SoloBotAndvariPlaceYludHeroMove>> = (
        { playerID, ...rest }: MoveContext,
        suit: SuitNames,
    ): CanBeVoid<InvalidMove> => {
        const isValidMove: boolean = IsValidMove(
            { playerID, ...rest },
            PlaceYludDefaultStageNames.SoloBotAndvariPlaceYludHero,
            EmptyCardMoveNames.SoloBotAndvariPlaceYludHeroMove,
            suit,
        );
        if (!isValidMove) {
            return InvalidMoveNames.INVALID_MOVE;
        }
        PlaceYludAction(
            { ...rest },
            playerID,
            suit,
        );
    };

// TODO type: CoinTypeNames => string and asserts it value if no other strings can be valid in moves!?
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
export const SoloBotAndvariClickCoinToUpgradeMove:
    MoveFn<GetMoveArgument<CoinMoveNames.SoloBotAndvariClickCoinToUpgradeMove>> = (
        { playerID, ...rest }: MoveContext,
        coinId: PlayerCoinId,
        type: CoinNames,
    ): CanBeVoid<InvalidMove> => {
        AssertPlayerCoinId(coinId);
        const isValidMove: boolean = IsValidMove(
            { playerID, ...rest },
            SoloBotAndvariCommonStageNames.SoloBotAndvariClickCoinToUpgrade,
            CoinMoveNames.SoloBotAndvariClickCoinToUpgradeMove,
            {
                coinId,
                type,
            },
        );
        if (!isValidMove) {
            return InvalidMoveNames.INVALID_MOVE;
        }
        EndWarriorOrExplorerDistinctionIfCoinUpgraded({ ...rest });
        UpgradeCoinActions(
            { ...rest },
            playerID,
            coinId,
            type,
        );
    };
