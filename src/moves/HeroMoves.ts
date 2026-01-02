import { IsValidMove } from "../MoveValidator";
import { AddHeroToPlayerCardsAction, DiscardCardsFromPlayerBoardAction, PlaceMultiSuitCardAction, PlaceThrudAction, PlaceYludAction } from "../actions/HeroActions";
import { AssertAllBasicHeroesPossibleCardId, AssertAllHeroesForPlayerOrSoloBotAddToPlayerBoardPossibleCardId, AssertAllHeroesForPlayerSoloModeAndvariPossibleCardId, AssertAllHeroesForPlayerSoloModePossibleCardId, AssertAllHeroesPossibleCardId } from "../is_helpers/AssertionTypeHelpers";
import { CardMoveNames, CommonStageNames, EmptyCardMoveNames, GameModeNames, InvalidMoveNames, PlaceYludDefaultStageNames, SuitNames } from "../typescript/enums";
import type { AllHeroesForPlayerOrSoloBotAddToPlayerBoardPossibleCardId, CanBeVoid, GetMoveArgument, InvalidMove, MoveContext, MoveFn } from "../typescript/interfaces";

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
export const ClickHeroCardMove: MoveFn<GetMoveArgument<CardMoveNames.ClickHeroCardMove>> = (
    { G, playerID, ...rest }: MoveContext,
    heroId: AllHeroesForPlayerOrSoloBotAddToPlayerBoardPossibleCardId,
): CanBeVoid<InvalidMove> => {
    AssertAllHeroesForPlayerOrSoloBotAddToPlayerBoardPossibleCardId(heroId);
    if (G.mode === GameModeNames.Solo) {
        AssertAllHeroesForPlayerSoloModePossibleCardId(heroId);
    } else if (G.mode === GameModeNames.SoloAndvari) {
        AssertAllHeroesForPlayerSoloModeAndvariPossibleCardId(heroId);
    } else {
        if (G.expansions.Basic && !G.expansions.Thingvellir) {
            AssertAllBasicHeroesPossibleCardId(heroId);
        } else {
            AssertAllHeroesPossibleCardId(heroId);
        }
    }
    const isValidMove: boolean = IsValidMove(
        { G, playerID, ...rest },
        CommonStageNames.ClickHeroCard,
        CardMoveNames.ClickHeroCardMove,
        heroId,
    );
    if (!isValidMove) {
        return InvalidMoveNames.INVALID_MOVE;
    }
    AddHeroToPlayerCardsAction(
        { G, ...rest },
        playerID,
        heroId,
    );
};

// TODO suit: SuitNames => string and asserts it value if no other strings can be valid in moves!?
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
export const DiscardTopCardFromSuitMove: MoveFn<GetMoveArgument<CardMoveNames.DiscardTopCardFromSuitMove>> = (
    { playerID, ...rest }: MoveContext,
    suit: SuitNames,
    cardId: number,
): CanBeVoid<InvalidMove> => {
    const isValidMove: boolean = IsValidMove(
        { playerID, ...rest },
        CommonStageNames.DiscardTopCardFromSuit,
        CardMoveNames.DiscardTopCardFromSuitMove,
        {
            suit,
            cardId,
        },
    );
    if (!isValidMove) {
        return InvalidMoveNames.INVALID_MOVE;
    }
    DiscardCardsFromPlayerBoardAction(
        { ...rest },
        playerID,
        suit,
        cardId,
    );
};

// TODO suit: SuitNames => string and asserts it value if no other strings can be valid in moves!?
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
export const PlaceMultiSuitCardMove: MoveFn<GetMoveArgument<EmptyCardMoveNames.PlaceMultiSuitCardMove>> = (
    { playerID, ...rest }: MoveContext,
    suit: SuitNames,
): CanBeVoid<InvalidMove> => {
    const isValidMove: boolean = IsValidMove(
        { playerID, ...rest },
        CommonStageNames.PlaceMultiSuitCard,
        EmptyCardMoveNames.PlaceMultiSuitCardMove,
        suit,
    );
    if (!isValidMove) {
        return InvalidMoveNames.INVALID_MOVE;
    }
    PlaceMultiSuitCardAction(
        { ...rest },
        playerID,
        suit,
    );
};

// TODO suit: SuitNames => string and asserts it value if no other strings can be valid in moves!?
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
export const PlaceThrudHeroMove: MoveFn<GetMoveArgument<EmptyCardMoveNames.PlaceThrudHeroMove>> = (
    { playerID, ...rest }: MoveContext,
    suit: SuitNames,
): CanBeVoid<InvalidMove> => {
    const isValidMove: boolean = IsValidMove(
        { playerID, ...rest },
        CommonStageNames.PlaceThrudHero,
        EmptyCardMoveNames.PlaceThrudHeroMove,
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
export const PlaceYludHeroMove: MoveFn<GetMoveArgument<EmptyCardMoveNames.PlaceYludHeroMove>> = (
    { playerID, ...rest }: MoveContext,
    suit: SuitNames,
): CanBeVoid<InvalidMove> => {
    const isValidMove: boolean = IsValidMove(
        { playerID, ...rest },
        PlaceYludDefaultStageNames.PlaceYludHero,
        EmptyCardMoveNames.PlaceYludHeroMove,
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
