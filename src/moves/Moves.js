import { IsValidMove } from "../MoveValidator";
import { ClickCardAction, DiscardAnyCardFromPlayerBoardAction, DiscardCardFromTavernAction, GetEnlistmentMercenariesAction, GetMjollnirProfitAction, PassEnlistmentMercenariesAction, PickCardToPickDistinctionAction, PickDiscardCardAction, PlaceEnlistmentMercenariesAction } from "../actions/Actions";
import { AllStackData } from "../data/StackData";
import { suitsConfig } from "../data/SuitData";
import { StartDistinctionAwarding } from "../dispatchers/DistinctionAwardingDispatcher";
import { AddActionsToStack } from "../helpers/StackHelpers";
import { AssertExplorerDistinctionCardId, AssertTavernCardId } from "../is_helpers/AssertionTypeHelpers";
import { BrisingamensEndGameDefaultStageNames, ButtonMoveNames, CardMoveNames, CommonStageNames, DistinctionCardMoveNames, EmptyCardMoveNames, EnlistmentMercenariesDefaultStageNames, EnlistmentMercenariesStageNames, GetMjollnirProfitDefaultStageNames, InvalidMoveNames, SuitMoveNames, TavernsResolutionDefaultStageNames, TavernsResolutionStageNames, TroopEvaluationDefaultStageNames, TroopEvaluationStageNames } from "../typescript/enums";
// TODO In all moves types must be number/string/union and checked in assertions!
/**
 * <h3>Выбор карты из таверны.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе базовой карты из таверны игроком.</li>
 * </ol>
 *
 * @param context
 * @param tavernCardId Id карты.
 * @returns
 */
export const ClickCardMove = ({ playerID, ...rest }, tavernCardId) => {
    AssertTavernCardId(tavernCardId);
    const isValidMove = IsValidMove({ playerID, ...rest }, TavernsResolutionDefaultStageNames.ClickCard, CardMoveNames.ClickCardMove, tavernCardId);
    if (!isValidMove) {
        return InvalidMoveNames.INVALID_MOVE;
    }
    ClickCardAction({ ...rest }, playerID, tavernCardId);
};
/**
 * <h3>Выбор базовой карты из новой эпохи по преимуществу по фракции разведчиков.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе базовой карты из новой эпохи по преимуществу по фракции разведчиков.</li>
 * </ol>
 *
 * @param context
 * @param cardId Id карты.
 * @returns
 */
export const ClickCardToPickDistinctionMove = ({ playerID, ...rest }, cardId) => {
    AssertExplorerDistinctionCardId(cardId);
    const isValidMove = IsValidMove({ playerID, ...rest }, TroopEvaluationStageNames.ClickCardToPickDistinction, CardMoveNames.ClickCardToPickDistinctionMove, cardId);
    if (!isValidMove) {
        return InvalidMoveNames.INVALID_MOVE;
    }
    PickCardToPickDistinctionAction({ ...rest }, playerID, cardId);
};
// TODO suit: SuitNames => string and asserts it value if no other strings can be valid in moves!?
/**
 * <h3>Выбор конкретного преимущества по фракциям в конце первой эпохи.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>После определения преимуществ по фракциям в конце первой эпохи.</li>
 * </ol>
 *
 * @param context
 * @param suit Фракция.
 * @returns
 */
export const ClickDistinctionCardMove = ({ playerID, ...rest }, suit) => {
    const isValidMove = IsValidMove({ playerID, ...rest }, TroopEvaluationDefaultStageNames.ClickDistinctionCard, DistinctionCardMoveNames.ClickDistinctionCardMove, suit);
    if (!isValidMove) {
        return InvalidMoveNames.INVALID_MOVE;
    }
    StartDistinctionAwarding({ ...rest }, playerID, suitsConfig[suit].distinction.awarding);
};
// TODO suit: SuitNames => string and asserts it value if no other strings can be valid in moves!?
/**
 * <h3>Убирает карту в колоду сброса в конце игры по выбору игрока при финальном действии артефакта Brisingamens.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Применяется при отправке карты в колоду сброса в конце игры при наличии артефакта Brisingamens.</li>
 * </ol>
 *
 * @param context
 * @param suit Название фракции дворфов.
 * @param cardId Id сбрасываемой карты.
 * @returns
 */
export const DiscardCardFromPlayerBoardMove = ({ playerID, ...rest }, suit, cardId) => {
    const isValidMove = IsValidMove({ playerID, ...rest }, BrisingamensEndGameDefaultStageNames.DiscardCardFromPlayerBoard, CardMoveNames.DiscardCardFromPlayerBoardMove, {
        suit,
        cardId,
    });
    if (!isValidMove) {
        return InvalidMoveNames.INVALID_MOVE;
    }
    DiscardAnyCardFromPlayerBoardAction({ ...rest }, playerID, suit, cardId);
};
/**
 * <h3>Сбрасывает карту из таверны при выборе карты из лагеря на двоих игроков.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Применяется при выборе первым игроком карты из лагеря.</li>
 * </ol>
 *
 * @param context
 * @param tavernCardId Id сбрасываемой карты.
 * @returns
 */
export const DiscardCard2PlayersMove = ({ playerID, ...rest }, tavernCardId) => {
    AssertTavernCardId(tavernCardId);
    const isValidMove = IsValidMove({ playerID, ...rest }, TavernsResolutionStageNames.DiscardCard2Players, CardMoveNames.DiscardCard2PlayersMove, tavernCardId);
    if (!isValidMove) {
        return InvalidMoveNames.INVALID_MOVE;
    }
    DiscardCardFromTavernAction({ ...rest }, playerID, tavernCardId);
};
/**
 * <h3>Выбор игроком карты наёмника для вербовки.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе какую карту наёмника будет вербовать игрок.</li>
 * </ol>
 *
 * @param context
 * @param cardId Id карты.
 * @returns
 */
export const GetEnlistmentMercenariesMove = ({ playerID, ...rest }, cardId) => {
    const isValidMove = IsValidMove({ playerID, ...rest }, EnlistmentMercenariesDefaultStageNames.GetEnlistmentMercenaries, CardMoveNames.GetEnlistmentMercenariesMove, cardId);
    if (!isValidMove) {
        return InvalidMoveNames.INVALID_MOVE;
    }
    GetEnlistmentMercenariesAction({ ...rest }, playerID, cardId);
};
// TODO suit: SuitNames => string and asserts it value if no other strings can be valid in moves!?
/**
 * <h3>Выбирает фракцию для применения финального эффекта артефакта Mjollnir.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце игры при выборе игроком фракции для применения финального эффекта артефакта Mjollnir.</li>
 * </ol>
 *
 * @param context
 * @param suit Название фракции дворфов.
 * @returns
 */
export const GetMjollnirProfitMove = ({ playerID, ...rest }, suit) => {
    const isValidMove = IsValidMove({ playerID, ...rest }, GetMjollnirProfitDefaultStageNames.GetMjollnirProfit, SuitMoveNames.GetMjollnirProfitMove, suit);
    if (!isValidMove) {
        return InvalidMoveNames.INVALID_MOVE;
    }
    GetMjollnirProfitAction({ ...rest }, playerID, suit);
};
/**
 * <h3>Пасс первого игрока в начале фазы вербовки наёмников.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Первый игрок в начале фазы вербовки наёмников пасует для того, чтобы вербовать последним.</li>
 * </ol>
 *
 * @param context
 * @param param Параметр.
 * @returns
 */
export const PassEnlistmentMercenariesMove = ({ playerID, ...rest }, param) => {
    const isValidMove = IsValidMove({ playerID, ...rest }, EnlistmentMercenariesDefaultStageNames.PassEnlistmentMercenaries, ButtonMoveNames.PassEnlistmentMercenariesMove, param);
    if (!isValidMove) {
        return InvalidMoveNames.INVALID_MOVE;
    }
    PassEnlistmentMercenariesAction({ ...rest }, playerID);
};
/**
 * <h3>Выбор карт из колоды сброса.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе карт из колоды сброса по действию героев.</li>
 * <li>Выбор карт из колоды сброса по действию артефактов.</li>
 * </ol>
 *
 * @param context
 * @param cardId Id карты.
 * @returns
 */
export const PickDiscardCardMove = ({ playerID, ...rest }, cardId) => {
    const isValidMove = IsValidMove({ playerID, ...rest }, CommonStageNames.PickDiscardCard, CardMoveNames.PickDiscardCardMove, cardId);
    if (!isValidMove) {
        return InvalidMoveNames.INVALID_MOVE;
    }
    PickDiscardCardAction({ ...rest }, playerID, cardId);
};
// TODO suit: SuitNames => string and asserts it value if no other strings can be valid in moves!?
/**
 * <h3>Выбор фракции куда будет завербован наёмник.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе фракции, куда будет завербован наёмник.</li>
 * </ol>
 *
 * @param context
 * @param suit Название фракции дворфов.
 * @returns
 */
export const PlaceEnlistmentMercenariesMove = ({ playerID, ...rest }, suit) => {
    const isValidMove = IsValidMove({ playerID, ...rest }, EnlistmentMercenariesStageNames.PlaceEnlistmentMercenaries, EmptyCardMoveNames.PlaceEnlistmentMercenariesMove, suit);
    if (!isValidMove) {
        return InvalidMoveNames.INVALID_MOVE;
    }
    PlaceEnlistmentMercenariesAction({ ...rest }, playerID, suit);
};
/**
 * <h3>Начало вербовки наёмников.</li>
 * <p>Применения:</p>
 * <ol>
 * <li>Первый игрок в начале фазы вербовки наёмников выбирает старт вербовки.</li>
 * </ol>
 *
 * @param context
 * @param param Параметр.
 * @returns
 */
export const StartEnlistmentMercenariesMove = ({ playerID, ...rest }, param) => {
    const isValidMove = IsValidMove({ playerID, ...rest }, EnlistmentMercenariesDefaultStageNames.StartEnlistmentMercenaries, ButtonMoveNames.StartEnlistmentMercenariesMove, param);
    if (!isValidMove) {
        return InvalidMoveNames.INVALID_MOVE;
    }
    AddActionsToStack({ ...rest }, playerID, [AllStackData.enlistmentMercenaries()]);
};
//# sourceMappingURL=Moves.js.map