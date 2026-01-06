import { CompareCardsInTavern, EvaluateTavernCard } from "./bot_logic/BotCardLogic";
import { CheckHeuristicsForCoinsPlacement } from "./bot_logic/BotConfig";
import { CheckSoloBotAndvariMustTakeCardFromGeneralStrategy, CheckSoloBotAndvariMustTakeCardToPickHero, CheckSoloBotAndvariMustTakeRoyalOfferingCard, SoloBotMustTakeCardFromReserveStrategy } from "./bot_logic/SoloBotAndvariCardLogic";
import { CheckSoloBotCanPickHero, CheckSoloBotMustTakeCardToPickHero, CheckSoloBotMustTakeCardWithSuitsLeastPresentOnPlayerBoard, CheckSoloBotMustTakeRoyalOfferingCard, CheckSuitsLeastPresentOnSoloBotBoard, SoloBotMustTakeRandomCard } from "./bot_logic/SoloBotCardLogic";
import { ThrowMyError } from "./Error";
import { CheckPlayerHasBuff } from "./helpers/BuffHelpers";
import { HasLowestPriority } from "./helpers/PriorityHelpers";
import { CheckMinCoinIndexForSoloBotAndvari, CheckMinCoinVisibleIndexForSoloBot, CheckMinCoinVisibleValueForSoloBot, CheckMinCoinVisibleValueForSoloBotAndvari } from "./helpers/SoloBotHelpers";
import { AssertAllHeroesForDifficultySoloModePossibleCardId, AssertAllHeroesForPlayerOrSoloBotAddToPlayerBoardPossibleCardId, AssertAllHeroesForSoloBotAndvariPossibleCardId, AssertAllHeroesForSoloBotPossibleCardId, AssertBasicVidofnirVedrfolnirUpgradeValue, AssertCampIndex, AssertExplorerDistinctionCardId, AssertMythologicalCreatureDeckForSkymirCardId, AssertPlayerCoinId, AssertSoloGameDifficultyLevelArg, AssertTavernCardId, AssertTavernsHeuristicArray, AssertTavernsHeuristicArrayIndex } from "./is_helpers/AssertionTypeHelpers";
import { IsMercenaryCampCard } from "./is_helpers/IsCampTypeHelpers";
import { IsCoin, IsTriggerTradingCoin } from "./is_helpers/IsCoinTypeHelpers";
import { IsCanPickHeroWithConditionsValidator, IsCanPickHeroWithDiscardCardsFromPlayerBoardValidator } from "./move_validators/IsCanPickCurrentHeroValidator";
import { TotalRank } from "./score_helpers/ScoreHelpers";
import { ActivateGiantAbilityOrPickCardSubMoveValidatorNames, ActivateGodAbilityOrNotSubMoveValidatorNames, ArtefactBuffNames, AutoBotsMoveNames, BidsMoveValidatorNames, BidUlineMoveValidatorNames, BrisingamensEndGameMoveValidatorNames, ButtonMoveNames, CardMoveNames, ChooseDifficultySoloModeAndvariMoveValidatorNames, ChooseDifficultySoloModeMoveValidatorNames, CoinMoveNames, CoinNames, CommonMoveValidatorNames, DistinctionCardMoveNames, EmptyCardMoveNames, EnlistmentMercenariesMoveValidatorNames, ErrorNames, GameModeNames, GetMjollnirProfitMoveValidatorNames, PhaseNames, PickHeroCardValidatorNames, PlaceYludMoveValidatorNames, PlayerIdForSoloGameNames, SoloBotAndvariCommonMoveValidatorNames, SoloBotCommonCoinUpgradeMoveValidatorNames, SoloBotCommonMoveValidatorNames, SuitMoveNames, SuitNames, TavernsResolutionMoveValidatorNames, TroopEvaluationMoveValidatorNames } from "./typescript/enums";
import { DrawCamp, DrawDiscardedCards, DrawDistinctions, DrawHeroes, DrawHeroesForSoloBotUI, DrawTaverns } from "./ui/GameBoardUI";
import { DrawPlayersBoards, DrawPlayersBoardsCoins, DrawPlayersHandsCoins } from "./ui/PlayerUI";
import { ActivateGiantAbilityOrPickCardProfit, ActivateGodAbilityOrNotProfit, ChooseCoinValueForVidofnirVedrfolnirUpgradeProfit, ChooseDifficultyLevelForSoloModeProfit, ChooseGetMythologyCardForSkymirProfit, ChooseStrategyForSoloModeAndvariProfit, ChooseStrategyVariantForSoloModeAndvariProfit, ExplorerDistinctionProfit, PickHeroesForSoloModeProfit, StartOrPassEnlistmentMercenariesProfit } from "./ui/ProfitUI";
/**
 * <h3>ДОБАВИТЬ ОПИСАНИЕ.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>ДОБАВИТЬ ПРИМЕНЕНИЯ.</li>
 * </oL>
 *
 * @TODO Саше: сделать описание функции и параметров.
 * @param context
 * @param playerID ID требуемого игрока.
 * @param coinData Данные монеты.
 * @returns Валидация обмена монет.
 */
export const CoinUpgradeValidation = ({ G, ...rest }, playerID, coinData) => {
    const player = G.publicPlayers[playerID], privatePlayer = G.players[playerID];
    if (player === undefined) {
        return ThrowMyError({ G, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
    }
    if (privatePlayer === undefined) {
        return ThrowMyError({ G, ...rest }, ErrorNames.PrivatePlayerWithCurrentIdIsUndefined, playerID);
    }
    let handCoins, boardCoins;
    if (G.mode === GameModeNames.Multiplayer) {
        handCoins = privatePlayer.handCoins;
        boardCoins = privatePlayer.boardCoins;
    }
    else {
        handCoins = player.handCoins;
        boardCoins = player.boardCoins;
    }
    const handCoin = handCoins[coinData.coinId], boardCoin = boardCoins[coinData.coinId];
    let _exhaustiveCheck;
    switch (coinData.type) {
        case CoinNames.Hand:
            if (handCoin === null) {
                throw new Error(`Выбранная для улучшения монета игрока с id '${playerID}' в руке с id '${coinData.coinId}' не может отсутствовать там.`);
            }
            if (!IsCoin(handCoin)) {
                throw new Error(`Монета с id '${coinData.coinId}' в руке текущего игрока с id '${playerID}' не может быть закрытой для него.`);
            }
            if (!IsTriggerTradingCoin(handCoin)) {
                return true;
            }
            break;
        case CoinNames.Board:
            if (boardCoin === null) {
                throw new Error(`Выбранная для улучшения монета игрока с id '${playerID}' на столе с id '${coinData.coinId}' не может отсутствовать там.`);
            }
            if (!IsCoin(boardCoin)) {
                throw new Error(`Монета с id '${coinData.coinId}' на столе текущего игрока с id '${playerID}' не может быть закрытой для него.`);
            }
            if (!IsTriggerTradingCoin(boardCoin)) {
                return true;
            }
            break;
        default:
            _exhaustiveCheck = coinData.type;
            throw new Error(`Не существует такого типа монеты.`);
            return _exhaustiveCheck;
    }
    return false;
};
/**
 * <h3>ДОБАВИТЬ ОПИСАНИЕ.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>ДОБАВИТЬ ПРИМЕНЕНИЯ.</li>
 * </oL>
 *
 * @TODO Саше: сделать описание функции и параметров.
 * @param context
 * @param stage Стадия.
 * @param type Тип мува.
 * @param id Данные для валидации.
 * @returns Валидный ли мув.
 */
export const IsValidMove = ({ ctx, playerID, ...rest }, stage, type, id) => {
    const validator = GetValidator(ctx.phase, stage, type);
    let isValid = false;
    if (validator !== null) {
        if (typeof id === `number`) {
            // TODO Can i fix AS?
            isValid =
                ValidateByArrayValues(id, validator.getRange({ ctx, ...rest }, playerID));
        }
        else if (typeof id === `string`) {
            isValid =
                ValidateByArrayValues(id, validator.getRange({ ctx, ...rest }, playerID));
        }
        else if (typeof id === `object` && !Array.isArray(id) && id !== null) {
            if (`coinId` in id) {
                isValid = ValidateByObjectCoinIdTypeIsInitialValues(id, validator.getRange({ ctx, ...rest }, playerID));
            }
            else if (`rank` in id) {
                isValid = ValidateObjectEqualValues(id, validator.getRange({ ctx, ...rest }, playerID));
            }
            else if (`suit` in id) {
                isValid = ValidateByObjectSuitCardIdValues(id, validator.getRange({ ctx, ...rest }, playerID));
            }
            else if (`cardId` in id) {
                isValid = ValidateByObjectCardIdValues(id, validator.getRange({ ctx, ...rest }, playerID));
            }
            // TODO Add validation logic for Array.isArray(id) -> PlayerCoinIdType[]!?
        }
        else if (Array.isArray(id) || id === null) {
            isValid = true;
        }
        else {
            throw new Error(`Нет такого типа значений у аргументов мува.`);
        }
        if (isValid) {
            isValid = validator.validate({ ctx, ...rest }, playerID, id);
        }
    }
    return isValid;
};
/**
 * <h3>ДОБАВИТЬ ОПИСАНИЕ.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>ДОБАВИТЬ ПРИМЕНЕНИЯ.</li>
 * </oL>
 *
 * @TODO Саше: сделать описание функции и параметров.
 * @param phase Фаза игры.
 * @param stage Стадия игры.
 * @param type Тип мува.
 * @returns Валидатор.
 */
export const GetValidator = (phase, stage, type) => {
    let moveByForValidator, validator, _exhaustiveCheck;
    switch (phase) {
        case PhaseNames.ChooseDifficultySoloMode:
            // TODO Can i delete AS in all places here?
            moveByForValidator = moveBy[phase][stage];
            // TODO Can i delete AS in all places here?
            validator = moveByForValidator[type];
            break;
        case PhaseNames.ChooseDifficultySoloModeAndvari:
            moveByForValidator = moveBy[phase][stage];
            validator = moveByForValidator[type];
            break;
        case PhaseNames.Bids:
            moveByForValidator = moveBy[phase][stage];
            validator = moveByForValidator[type];
            break;
        case PhaseNames.BidUline:
            moveByForValidator = moveBy[phase][stage];
            // TODO Can i delete AS in all places here?
            validator = moveByForValidator[type];
            break;
        case PhaseNames.TavernsResolution:
            moveByForValidator = moveBy[phase][stage];
            validator = moveByForValidator[type];
            break;
        case PhaseNames.EnlistmentMercenaries:
            moveByForValidator = moveBy[phase][stage];
            validator = moveByForValidator[type];
            break;
        case PhaseNames.PlaceYlud:
            moveByForValidator = moveBy[phase][stage];
            validator = moveByForValidator[type];
            break;
        case PhaseNames.TroopEvaluation:
            moveByForValidator = moveBy[phase][stage];
            validator = moveByForValidator[type];
            break;
        case PhaseNames.BrisingamensEndGame:
            moveByForValidator = moveBy[phase][stage];
            validator = moveByForValidator[type];
            break;
        case PhaseNames.GetMjollnirProfit:
            moveByForValidator = moveBy[phase][stage];
            validator = moveByForValidator[type];
            break;
        default:
            _exhaustiveCheck = phase;
            throw new Error(`Нет валидатора для такой фазы.`);
            return _exhaustiveCheck;
    }
    return validator;
};
// TODO Return type number can be other TYPE!
// TODO MOVE ALL SAME VALIDATING LOGIC FROM GET RANGE/GET VALUE TO VALIDATE! And not same in another functions too to reduce logic here!
/**
 * <h3>ДОБАВИТЬ ОПИСАНИЕ.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>ДОБАВИТЬ ПРИМЕНЕНИЯ.</li>
 * </oL>
 * @TODO Саше: сделать описание функции и параметров.
 */
export const moveValidators = {
    // TODO Fix it!
    ActivateGodAbilityMoveValidator: {
        getRange: ({ ...rest }) => ActivateGodAbilityOrNotProfit({ ...rest }, ActivateGodAbilityOrNotSubMoveValidatorNames.ActivateGodAbilityMoveValidator),
        getValue: ({ ...rest }, currentMoveArguments) => {
            const moveArgument = currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError({ ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            return moveArgument;
        },
        moveName: CardMoveNames.ActivateGodAbilityMove,
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer,
    },
    NotActivateGodAbilityMoveValidator: {
        getRange: ({ ...rest }) => ActivateGodAbilityOrNotProfit({ ...rest }, ActivateGodAbilityOrNotSubMoveValidatorNames.NotActivateGodAbilityMoveValidator),
        getValue: ({ ...rest }, currentMoveArguments) => {
            const moveArgument = currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError({ ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            return moveArgument;
        },
        moveName: ButtonMoveNames.NotActivateGodAbilityMove,
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer,
    },
    ClickCardNotGiantAbilityMoveValidator: {
        getRange: ({ ...rest }) => ActivateGiantAbilityOrPickCardProfit({ ...rest }, ActivateGiantAbilityOrPickCardSubMoveValidatorNames.ClickCardNotGiantAbilityMoveValidator),
        getValue: (
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        { ...rest }, currentMoveArguments) => currentMoveArguments,
        moveName: CardMoveNames.ClickCardNotGiantAbilityMove,
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer,
    },
    ClickGiantAbilityNotCardMoveValidator: {
        getRange: ({ ...rest }) => ActivateGiantAbilityOrPickCardProfit({ ...rest }, ActivateGiantAbilityOrPickCardSubMoveValidatorNames.ClickGiantAbilityNotCardMoveValidator),
        getValue: (
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        { ...rest }, currentMoveArguments) => currentMoveArguments,
        moveName: CardMoveNames.ClickGiantAbilityNotCardMove,
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer,
    },
    ChooseCoinValueForHrungnirUpgradeMoveValidator: {
        getRange: ({ ...rest }) => DrawPlayersBoardsCoins({ ...rest }, TavernsResolutionMoveValidatorNames.ChooseCoinValueForHrungnirUpgradeMoveValidator),
        getValue: ({ ...rest }, currentMoveArguments) => {
            const moveArgument = currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError({ ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            return moveArgument;
        },
        moveName: CoinMoveNames.ChooseCoinValueForHrungnirUpgradeMove,
        validate: ({ ctx, ...rest }, playerID, id) => playerID === ctx.currentPlayer
            && CoinUpgradeValidation({ ctx, ...rest }, playerID, id),
    },
    ChooseSuitOlrunMoveValidator: {
        getRange: ({ ...rest }) => DrawPlayersBoards({ ...rest }, TavernsResolutionMoveValidatorNames.ChooseSuitOlrunMoveValidator),
        getValue: ({ ...rest }, currentMoveArguments) => {
            const moveArgument = currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError({ ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            return moveArgument;
        },
        moveName: SuitMoveNames.ChooseSuitOlrunMove,
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer,
    },
    GetMythologyCardMoveValidator: {
        getRange: ({ ...rest }) => ChooseGetMythologyCardForSkymirProfit({ ...rest }, TavernsResolutionMoveValidatorNames.GetMythologyCardMoveValidator),
        getValue: ({ ...rest }, currentMoveArguments) => {
            const moveArgument = currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError({ ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            AssertMythologicalCreatureDeckForSkymirCardId(moveArgument);
            return moveArgument;
        },
        moveName: CardMoveNames.GetMythologyCardMove,
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer,
    },
    ClickBoardCoinMoveValidator: {
        getRange: ({ ...rest }) => DrawPlayersBoardsCoins({ ...rest }, BidsMoveValidatorNames.ClickBoardCoinMoveValidator),
        getValue: ({ ...rest }, currentMoveArguments) => {
            const moveArgument = currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError({ ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            AssertPlayerCoinId(moveArgument);
            return moveArgument;
        },
        moveName: CoinMoveNames.ClickBoardCoinMove,
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer,
    },
    ClickCampCardMoveValidator: {
        getRange: ({ ...rest }) => DrawCamp({ ...rest }, TavernsResolutionMoveValidatorNames.ClickCampCardMoveValidator),
        getValue: ({ ...rest }, currentMoveArguments) => {
            const moveArgument = currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError({ ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            AssertCampIndex(moveArgument);
            return moveArgument;
        },
        moveName: CardMoveNames.ClickCampCardMove,
        validate: ({ G, ctx, ...rest }, playerID) => {
            if (playerID === undefined) {
                return ThrowMyError({ G, ctx, ...rest }, ErrorNames.PlayerIDIsNotDefined);
            }
            const player = G.publicPlayers[playerID];
            if (player === undefined) {
                return ThrowMyError({ G, ctx, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
            }
            return playerID === ctx.currentPlayer && G.expansions.Thingvellir.active
                && (ctx.currentPlayer === G.publicPlayersOrder[0] || (!G.campPicked
                    && CheckPlayerHasBuff({ G, ctx, ...rest }, playerID, ArtefactBuffNames.GoCamp)));
        },
    },
    ClickCardMoveValidator: {
        getRange: ({ ...rest }) => DrawTaverns({ ...rest }, TavernsResolutionMoveValidatorNames.ClickCardMoveValidator),
        getValue: ({ G, ...rest }, currentMoveArguments) => {
            // TODO Get MythologicalCreature cards for AI bots...
            const uniqueArr = [], currentTavern = G.taverns[G.currentTavern];
            let flag = true;
            for (let i = 0; i < currentMoveArguments.length; i++) {
                const moveArgument = currentMoveArguments[i];
                if (moveArgument === undefined) {
                    throw new Error(`В массиве аргументов мува отсутствует аргумент с id '${i}'.`);
                }
                AssertTavernCardId(moveArgument);
                const tavernCard = currentTavern[moveArgument];
                if (tavernCard === undefined) {
                    return ThrowMyError({ G, ...rest }, ErrorNames.CurrentTavernCardWithCurrentIdIsUndefined, moveArgument);
                }
                if (tavernCard === null) {
                    return ThrowMyError({ G, ...rest }, ErrorNames.CurrentTavernCardWithCurrentIdIsNull, moveArgument);
                }
                if (currentTavern.some((card) => CompareCardsInTavern(tavernCard, card) < 0)) {
                    continue;
                }
                const isCurrentCardWorse = EvaluateTavernCard({ G, ...rest }, tavernCard, moveArgument, currentTavern) < 0, isExistCardNotWorse = currentTavern.some((card) => EvaluateTavernCard({ G, ...rest }, card, moveArgument, currentTavern) >= 0);
                if (isCurrentCardWorse && isExistCardNotWorse) {
                    continue;
                }
                for (let j = 0; j < uniqueArr.length; j++) {
                    const uniqueCard = uniqueArr[j];
                    if (uniqueCard === undefined) {
                        throw new Error(`В массиве уникальных карт отсутствует карта с id '${j}'.`);
                    }
                    if (CompareCardsInTavern(tavernCard, uniqueCard) === 0) {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    // TODO Error to return moveArgument after 1st push!?
                    uniqueArr.push(tavernCard);
                    return moveArgument;
                }
                flag = true;
            }
            // TODO If all cards equal after all CompareTavernCards return currentMoveArguments[0] by default!?
            throw new Error(`Отсутствует вариант выбора карты из таверны для ботов.`);
        },
        moveName: CardMoveNames.ClickCardMove,
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer,
    },
    ClickCardToPickDistinctionMoveValidator: {
        getRange: ({ ...rest }) => ExplorerDistinctionProfit({ ...rest }, TroopEvaluationMoveValidatorNames.ClickCardToPickDistinctionMoveValidator),
        getValue: ({ ...rest }, currentMoveArguments) => {
            const moveArgument = currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError({ ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            AssertExplorerDistinctionCardId(moveArgument);
            return moveArgument;
        },
        moveName: CardMoveNames.ClickCardToPickDistinctionMove,
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer,
    },
    ClickDistinctionCardMoveValidator: {
        getRange: ({ ...rest }) => DrawDistinctions({ ...rest }, TroopEvaluationMoveValidatorNames.ClickDistinctionCardMoveValidator),
        getValue: ({ ...rest }, currentMoveArguments) => {
            const moveArgument = currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError({ ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            return moveArgument;
        },
        moveName: DistinctionCardMoveNames.ClickDistinctionCardMove,
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer,
    },
    ClickHandCoinMoveValidator: {
        getRange: ({ ...rest }) => DrawPlayersHandsCoins({ ...rest }, BidsMoveValidatorNames.ClickHandCoinMoveValidator),
        getValue: ({ ...rest }, currentMoveArguments) => {
            const moveArgument = currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError({ ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            AssertPlayerCoinId(moveArgument);
            return moveArgument;
        },
        moveName: CoinMoveNames.ClickHandCoinMove,
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer,
    },
    ClickHandCoinUlineMoveValidator: {
        getRange: ({ ...rest }) => DrawPlayersHandsCoins({ ...rest }, BidUlineMoveValidatorNames.ClickHandCoinUlineMoveValidator),
        getValue: ({ ...rest }, currentMoveArguments) => {
            const moveArgument = currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError({ ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            AssertPlayerCoinId(moveArgument);
            return moveArgument;
        },
        moveName: CoinMoveNames.ClickHandCoinUlineMove,
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer,
    },
    ClickHandTradingCoinUlineMoveValidator: {
        getRange: ({ ...rest }) => DrawPlayersHandsCoins({ ...rest }, TavernsResolutionMoveValidatorNames.ClickHandTradingCoinUlineMoveValidator),
        getValue: ({ ...rest }, currentMoveArguments) => {
            const moveArgument = currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError({ ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            AssertPlayerCoinId(moveArgument);
            return moveArgument;
        },
        moveName: CoinMoveNames.ClickHandTradingCoinUlineMove,
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer,
    },
    DiscardCardFromPlayerBoardMoveValidator: {
        getRange: ({ ...rest }) => DrawPlayersBoards({ ...rest }, BrisingamensEndGameMoveValidatorNames.DiscardCardFromPlayerBoardMoveValidator),
        getValue: ({ ...rest }, currentMoveArguments) => {
            const suitNames = [];
            let suit;
            for (suit in currentMoveArguments) {
                suitNames.push(suit);
            }
            const suitName = suitNames[Math.floor(Math.random() * suitNames.length)];
            if (suitName === undefined) {
                throw new Error(`Отсутствует выбранная случайно фракция '${suitName}' для сброса карты.`);
            }
            const moveArgumentForSuit = currentMoveArguments[suitName];
            if (moveArgumentForSuit === undefined) {
                throw new Error(`Отсутствует обязательный параметр с аргументом '${suitName}'.`);
            }
            const moveArgument = moveArgumentForSuit[Math.floor(Math.random() * moveArgumentForSuit.length)];
            if (moveArgument === undefined) {
                return ThrowMyError({ ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            return {
                suit: suitName,
                cardId: moveArgument,
            };
        },
        moveName: CardMoveNames.DiscardCardFromPlayerBoardMove,
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer,
    },
    DiscardCard2PlayersMoveValidator: {
        getRange: ({ ...rest }) => DrawTaverns({ ...rest }, TavernsResolutionMoveValidatorNames.DiscardCard2PlayersMoveValidator),
        getValue: ({ ...rest }, currentMoveArguments) => {
            const moveArgument = currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError({ ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            AssertTavernCardId(moveArgument);
            return moveArgument;
        },
        moveName: CardMoveNames.DiscardCard2PlayersMove,
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer,
    },
    GetEnlistmentMercenariesMoveValidator: {
        getRange: ({ ...rest }) => DrawPlayersBoards({ ...rest }, EnlistmentMercenariesMoveValidatorNames.GetEnlistmentMercenariesMoveValidator),
        getValue: ({ ...rest }, currentMoveArguments) => {
            const moveArgument = currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError({ ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            return moveArgument;
        },
        moveName: CardMoveNames.GetEnlistmentMercenariesMove,
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer,
    },
    GetMjollnirProfitMoveValidator: {
        getRange: ({ ...rest }) => DrawPlayersBoards({ ...rest }, GetMjollnirProfitMoveValidatorNames.GetMjollnirProfitMoveValidator),
        getValue: ({ G, ...rest }, currentMoveArguments, playerID) => {
            if (playerID === undefined) {
                return ThrowMyError({ G, ...rest }, ErrorNames.PlayerIDIsNotDefined);
            }
            const totalSuitsRanks = [], player = G.publicPlayers[playerID];
            if (player === undefined) {
                return ThrowMyError({ G, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
            }
            for (let j = 0; j < currentMoveArguments.length; j++) {
                const moveArgumentI = currentMoveArguments[j];
                if (moveArgumentI === undefined) {
                    throw new Error(`В массиве аргументов мува отсутствует аргумент с id '${j}'.`);
                }
                totalSuitsRanks.push(player.cards[moveArgumentI]
                    .reduce(TotalRank, 0) * 2);
            }
            const index = totalSuitsRanks.indexOf(Math.max(...totalSuitsRanks));
            if (index === -1) {
                return ThrowMyError({ G, ...rest }, ErrorNames.MustBeSuitWithMaxRanksValue);
            }
            const moveArgument = currentMoveArguments[index];
            if (moveArgument === undefined) {
                throw new Error(`В массиве аргументов мува отсутствует аргумент с id '${index}'.`);
            }
            return moveArgument;
        },
        moveName: SuitMoveNames.GetMjollnirProfitMove,
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer,
    },
    PassEnlistmentMercenariesMoveValidator: {
        getRange: ({ ...rest }) => StartOrPassEnlistmentMercenariesProfit({ ...rest }, EnlistmentMercenariesMoveValidatorNames.StartEnlistmentMercenariesMoveValidator),
        getValue: (
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        { ...rest }, currentMoveArguments) => currentMoveArguments,
        moveName: ButtonMoveNames.PassEnlistmentMercenariesMove,
        validate: ({ G, ctx, ...rest }, playerID) => {
            if (playerID === undefined) {
                return ThrowMyError({ G, ctx, ...rest }, ErrorNames.PlayerIDIsNotDefined);
            }
            const player = G.publicPlayers[playerID];
            if (player === undefined) {
                return ThrowMyError({ G, ctx, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
            }
            return playerID === ctx.currentPlayer && ctx.playOrderPos === 0
                && ctx.currentPlayer === ctx.playOrder[ctx.playOrder.length - 1]
                && player.campCards.filter(IsMercenaryCampCard).length > 0;
        },
    },
    PlaceEnlistmentMercenariesMoveValidator: {
        getRange: ({ ...rest }) => DrawPlayersBoards({ ...rest }, EnlistmentMercenariesMoveValidatorNames.PlaceEnlistmentMercenariesMoveValidator),
        getValue: ({ ...rest }, currentMoveArguments) => {
            const moveArgument = currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError({ ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            return moveArgument;
        },
        moveName: EmptyCardMoveNames.PlaceEnlistmentMercenariesMove,
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer,
    },
    PlaceYludHeroMoveValidator: {
        getRange: ({ ...rest }) => DrawPlayersBoards({ ...rest }, PlaceYludMoveValidatorNames.PlaceYludHeroMoveValidator),
        getValue: ({ ...rest }, currentMoveArguments) => {
            const moveArgument = currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError({ ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            return moveArgument;
        },
        moveName: EmptyCardMoveNames.PlaceYludHeroMove,
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer,
    },
    StartEnlistmentMercenariesMoveValidator: {
        getRange: ({ ...rest }) => StartOrPassEnlistmentMercenariesProfit({ ...rest }, EnlistmentMercenariesMoveValidatorNames.StartEnlistmentMercenariesMoveValidator),
        getValue: (
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        { ...rest }, currentMoveArguments) => currentMoveArguments,
        moveName: ButtonMoveNames.StartEnlistmentMercenariesMove,
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer,
    },
    // Bots
    BotsPlaceAllCoinsMoveValidator: {
        // TODO Move to Get from validator BidsMoveValidatorNames.BotsPlaceAllCoinsMoveValidator!?
        getRange: ({ G }) => G.botData.allCoinsOrder,
        getValue: ({ G, ...rest }, currentMoveArguments, playerID) => {
            if (playerID === undefined) {
                return ThrowMyError({ G, ...rest }, ErrorNames.PlayerIDIsNotDefined);
            }
            const hasLowestPriority = HasLowestPriority({ G, ...rest }, playerID);
            let resultsForCoins = CheckHeuristicsForCoinsPlacement({ G, ...rest });
            if (hasLowestPriority) {
                const results = resultsForCoins.map((num, index) => index === 0 ? num - 20 : num);
                AssertTavernsHeuristicArray(results);
                resultsForCoins = results;
            }
            const minResultForCoins = Math.min(...resultsForCoins), maxResultForCoins = Math.max(...resultsForCoins), tradingProfit = G.secret.decks[1].length > 9 ? 1 : 0;
            // TODO Move it to type!?
            let [positionForMinCoin, positionForMaxCoin] = [-1, -1];
            if (minResultForCoins <= 0) {
                const minCoinPosition = resultsForCoins.indexOf(minResultForCoins);
                AssertTavernsHeuristicArrayIndex(minCoinPosition);
                positionForMinCoin = minCoinPosition;
            }
            if (maxResultForCoins >= 0) {
                const maxCoinPosition = resultsForCoins.indexOf(maxResultForCoins);
                AssertTavernsHeuristicArrayIndex(maxCoinPosition);
                positionForMaxCoin = maxCoinPosition;
            }
            // TODO Check it bot can't play in multiplayer now...
            const player = G.publicPlayers[playerID], privatePlayer = G.players[playerID];
            if (player === undefined) {
                return ThrowMyError({ G, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
            }
            if (privatePlayer === undefined) {
                return ThrowMyError({ G, ...rest }, ErrorNames.PrivatePlayerWithCurrentIdIsUndefined, playerID);
            }
            let handCoins;
            if (G.mode === GameModeNames.Multiplayer) {
                handCoins = privatePlayer.handCoins;
            }
            else {
                handCoins = player.handCoins;
            }
            for (let i = 0; i < currentMoveArguments.length; i++) {
                const allCoinsOrderI = currentMoveArguments[i];
                if (allCoinsOrderI === undefined) {
                    throw new Error(`В массиве выкладки монет отсутствует выкладка '${i}'.`);
                }
                const hasTrading = allCoinsOrderI.some((coinId) => {
                    AssertPlayerCoinId(coinId);
                    const handCoin = handCoins[coinId];
                    if (handCoin !== null && !IsCoin(handCoin)) {
                        throw new Error(`В массиве монет игрока с id '${playerID}' в руке не может быть закрыта монета с id '${coinId}'.`);
                    }
                    if (IsCoin(handCoin) && handCoin.isOpened) {
                        throw new Error(`В массиве монет игрока с id '${playerID}' в руке не может быть ранее открыта монета с id '${coinId}'.`);
                    }
                    return IsTriggerTradingCoin(handCoin);
                });
                // TODO How tradingProfit can be < 0?
                if (tradingProfit < 0) {
                    if (hasTrading) {
                        continue;
                    }
                    return allCoinsOrderI;
                }
                else if (tradingProfit > 0) {
                    const isEveryCoinsInHands = handCoins.every((coin, index) => {
                        if (coin !== null && !IsCoin(coin)) {
                            throw new Error(`В массиве монет игрока с id '${playerID}' в руке не может быть закрыта монета с id '${index}'.`);
                        }
                        if (IsCoin(coin) && coin.isOpened) {
                            throw new Error(`В массиве монет игрока с id '${playerID}' в руке не может быть ранее открыта монета с id '${index}'.`);
                        }
                        return IsCoin(coin);
                    });
                    if (!hasTrading && isEveryCoinsInHands) {
                        continue;
                    }
                    const hasPositionForMaxCoin = positionForMaxCoin !== -1, hasPositionForMinCoin = positionForMinCoin !== -1, coinsOrderPositionForMaxCoin = allCoinsOrderI[positionForMaxCoin], coinsOrderPositionForMinCoin = allCoinsOrderI[positionForMinCoin];
                    if (coinsOrderPositionForMaxCoin !== undefined && coinsOrderPositionForMinCoin !== undefined) {
                        AssertPlayerCoinId(coinsOrderPositionForMaxCoin);
                        AssertPlayerCoinId(coinsOrderPositionForMinCoin);
                        const maxCoin = handCoins[coinsOrderPositionForMaxCoin], minCoin = handCoins[coinsOrderPositionForMinCoin];
                        if (maxCoin === null) {
                            throw new Error(`В массиве выкладки монет игрока с id '${playerID}' не может не быть максимальной монеты с id '${coinsOrderPositionForMaxCoin}'.`);
                        }
                        if (minCoin === null) {
                            throw new Error(`В массиве выкладки монет игрока с id '${playerID}' не может не быть минимальной монеты с id '${coinsOrderPositionForMinCoin}'.`);
                        }
                        if (!IsCoin(maxCoin)) {
                            throw new Error(`В массиве выкладки монет игрока с id '${playerID}' не может быть закрыта максимальная монета с id '${coinsOrderPositionForMaxCoin}'.`);
                        }
                        if (!IsCoin(minCoin)) {
                            throw new Error(`В массиве выкладки монет игрока с id '${playerID}' не может быть закрыта минимальная монета с id '${coinsOrderPositionForMinCoin}'.`);
                        }
                        if (IsCoin(maxCoin) && maxCoin.isOpened) {
                            throw new Error(`В массиве монет игрока с id '${playerID}' в руке не может быть ранее открыта максимальная монета с id '${coinsOrderPositionForMaxCoin}'.`);
                        }
                        if (IsCoin(minCoin) && minCoin.isOpened) {
                            throw new Error(`В массиве монет игрока с id '${playerID}' в руке не может быть ранее открыта максимальная монета с id '${coinsOrderPositionForMinCoin}'.`);
                        }
                        let isTopCoinsOnPosition = false, isMinCoinsOnPosition = false;
                        if (hasPositionForMaxCoin) {
                            isTopCoinsOnPosition = allCoinsOrderI.filter((coinIndex) => {
                                AssertPlayerCoinId(coinIndex);
                                const handCoin = handCoins[coinIndex];
                                if (handCoin !== null && !IsCoin(handCoin)) {
                                    throw new Error(`В массиве монет игрока с id '${playerID}' в руке не может быть закрыта монета с id '${coinIndex}'.`);
                                }
                                if (IsCoin(handCoin) && handCoin.isOpened) {
                                    throw new Error(`В массиве монет игрока с id '${playerID}' в руке не может быть ранее открыта монета с id '${coinIndex}'.`);
                                }
                                return IsCoin(handCoin) && handCoin.value > maxCoin.value;
                            }).length <= 1;
                        }
                        if (hasPositionForMinCoin) {
                            isMinCoinsOnPosition =
                                handCoins.filter((coin, index) => {
                                    if (coin !== null && !IsCoin(coin)) {
                                        throw new Error(`В массиве монет игрока с id '${playerID}' в руке не может быть закрыта монета с id '${index}'.`);
                                    }
                                    if (IsCoin(coin) && coin.isOpened) {
                                        throw new Error(`В массиве монет игрока с id '${playerID}' в руке не может быть ранее открыта монета с id '${index}'.`);
                                    }
                                    return IsCoin(coin) && coin.value < minCoin.value;
                                }).length <= 1;
                        }
                        if (isTopCoinsOnPosition && isMinCoinsOnPosition) {
                            return allCoinsOrderI;
                            //console.log(`#` + i.toString().padStart(2) + `: ` + allCoinsOrder[i].map(item => handCoins[item].value));
                        }
                    }
                }
                else {
                    // TODO Why if trading profit === 0 we not checked min max coins positions!?
                    return allCoinsOrderI;
                }
            }
            throw new Error(`Отсутствует вариант выкладки монет для ботов.`);
        },
        moveName: AutoBotsMoveNames.BotsPlaceAllCoinsMove,
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer,
    },
    // Solo Bot
    SoloBotPlaceAllCoinsMoveValidator: {
        getRange: ({ ...rest }) => DrawPlayersHandsCoins({ ...rest }, BidsMoveValidatorNames.SoloBotPlaceAllCoinsMoveValidator),
        getValue: ({ ...rest }, currentMoveArguments) => {
            const moveArgument = currentMoveArguments[0];
            if (moveArgument === undefined) {
                return ThrowMyError({ ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            return moveArgument;
        },
        moveName: AutoBotsMoveNames.SoloBotPlaceAllCoinsMove,
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId,
    },
    SoloBotClickCardMoveValidator: {
        getRange: ({ ...rest }) => DrawTaverns({ ...rest }, TavernsResolutionMoveValidatorNames.SoloBotClickCardMoveValidator),
        getValue: ({ ...rest }, currentMoveArguments, playerID) => {
            // TODO If last round of tier 0 => get card not given distinction to other player and get for you if can't take hero or least present! If last round of the game => get most valuable points if can't pick hero anymore (can't check least present)!
            let moveArgument = CheckSoloBotMustTakeCardToPickHero({ ...rest }, playerID, currentMoveArguments);
            if (moveArgument === undefined) {
                moveArgument = CheckSoloBotMustTakeCardWithSuitsLeastPresentOnPlayerBoard({ ...rest }, playerID, currentMoveArguments);
            }
            if (moveArgument === undefined) {
                moveArgument = CheckSoloBotMustTakeRoyalOfferingCard({ ...rest }, currentMoveArguments);
            }
            if (moveArgument === undefined) {
                moveArgument = SoloBotMustTakeRandomCard({ ...rest }, currentMoveArguments);
            }
            AssertTavernCardId(moveArgument);
            return moveArgument;
        },
        moveName: CardMoveNames.SoloBotClickCardMove,
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId,
    },
    SoloBotClickHeroCardMoveValidator: {
        getRange: ({ ...rest }) => DrawHeroesForSoloBotUI({ ...rest }, SoloBotCommonMoveValidatorNames.SoloBotClickHeroCardMoveValidator),
        getValue: ({ ...rest }, currentMoveArguments) => {
            const moveArgument = currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError({ ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            AssertAllHeroesForSoloBotPossibleCardId(moveArgument);
            return moveArgument;
        },
        moveName: CardMoveNames.SoloBotClickHeroCardMove,
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId,
    },
    SoloBotClickCardToPickDistinctionMoveValidator: {
        getRange: ({ ...rest }) => ExplorerDistinctionProfit({ ...rest }, TroopEvaluationMoveValidatorNames.SoloBotClickCardToPickDistinctionMoveValidator),
        getValue: ({ ...rest }, currentMoveArguments) => {
            const moveArgument = currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError({ ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            AssertExplorerDistinctionCardId(moveArgument);
            return moveArgument;
        },
        moveName: CardMoveNames.SoloBotClickCardToPickDistinctionMove,
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId,
    },
    SoloBotPlaceThrudHeroMoveValidator: {
        getRange: ({ ...rest }) => DrawPlayersBoards({ ...rest }, SoloBotCommonMoveValidatorNames.SoloBotPlaceThrudHeroMoveValidator),
        getValue: ({ ...rest }, currentMoveArguments, playerID) => {
            // TODO Move same logic for SuitTypes & number to functions and use it in getValue
            // TODO Same logic for Ylud placement and move in one func!?
            let moveArgument;
            const suit = CheckSoloBotCanPickHero({ ...rest }, playerID);
            if (suit === undefined) {
                const [suits] = CheckSuitsLeastPresentOnSoloBotBoard({ ...rest }, playerID);
                if (suits.length === 0) {
                    // TODO Move Thrud/Ylud in most left suit from `suits`
                    throw new Error(`Не может не быть фракций с минимальным количеством карт.`);
                }
                else if (suits.length === 1) {
                    const leastPresentSuit = suits[0];
                    if (leastPresentSuit === undefined) {
                        throw new Error(`В массиве возможных аргументов мува для соло бота отсутствует нужное значение наименее представленной фракции.`);
                    }
                    moveArgument = currentMoveArguments[currentMoveArguments.indexOf(leastPresentSuit)];
                }
                else {
                    // TODO Move Thrud/Ylud in most left suit from least present `suits`!
                }
            }
            else {
                moveArgument = suit;
            }
            if (moveArgument === undefined) {
                return ThrowMyError({ ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            return moveArgument;
        },
        moveName: EmptyCardMoveNames.SoloBotPlaceThrudHeroMove,
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId,
    },
    SoloBotPlaceYludHeroMoveValidator: {
        getRange: ({ ...rest }) => DrawPlayersBoards({ ...rest }, PlaceYludMoveValidatorNames.SoloBotPlaceYludHeroMoveValidator),
        getValue: ({ ...rest }, currentMoveArguments) => {
            // TODO Same logic from Thrud placement and move in one func!?
            const moveArgument = currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError({ ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            return moveArgument;
        },
        moveName: EmptyCardMoveNames.SoloBotPlaceYludHeroMove,
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId,
    },
    SoloBotClickCoinToUpgradeMoveValidator: {
        getRange: ({ ...rest }) => DrawPlayersBoardsCoins({ ...rest }, SoloBotCommonCoinUpgradeMoveValidatorNames.SoloBotClickCoinToUpgradeMoveValidator).concat(DrawPlayersHandsCoins({ ...rest }, SoloBotCommonCoinUpgradeMoveValidatorNames.SoloBotClickCoinToUpgradeMoveValidator)),
        getValue: ({ G, ctx, ...rest }, currentMoveArguments, playerID) => {
            if (playerID === undefined) {
                return ThrowMyError({ G, ctx, ...rest }, ErrorNames.PlayerIDIsNotDefined);
            }
            const player = G.publicPlayers[playerID];
            if (player === undefined) {
                return ThrowMyError({ G, ctx, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
            }
            let type, coins;
            if (ctx.phase === PhaseNames.ChooseDifficultySoloMode) {
                type = CoinNames.Hand;
                coins = player.handCoins;
            }
            else {
                type = CoinNames.Board;
                coins = player.boardCoins;
            }
            const minValue = CheckMinCoinVisibleValueForSoloBot({ G, ctx, ...rest }, playerID, currentMoveArguments, type);
            if (minValue === 0) {
                throw new Error(`В массиве монет соло бота с id '${playerID}' ${type === CoinNames.Board ? `в руке` : `на столе`} не может быть минимальная монета для улучшения с значением '${minValue}'.`);
            }
            const coinId = CheckMinCoinVisibleIndexForSoloBot({ G, ctx, ...rest }, coins, minValue), moveArgument = currentMoveArguments[coinId];
            if (moveArgument === undefined) {
                return ThrowMyError({ G, ctx, ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            return moveArgument;
        },
        moveName: CoinMoveNames.SoloBotClickCoinToUpgradeMove,
        validate: ({ ctx, ...rest }, playerID, id) => playerID === ctx.currentPlayer && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId
            && CoinUpgradeValidation({ ctx, ...rest }, playerID, id),
    },
    // Solo Mode
    ChooseDifficultyLevelForSoloModeMoveValidator: {
        getRange: ({ ...rest }) => ChooseDifficultyLevelForSoloModeProfit({ ...rest }, ChooseDifficultySoloModeMoveValidatorNames.ChooseDifficultyLevelForSoloModeMoveValidator),
        getValue: ({ ...rest }, currentMoveArguments) => {
            const moveArgument = currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError({ ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            AssertSoloGameDifficultyLevelArg(moveArgument);
            return moveArgument;
        },
        moveName: ButtonMoveNames.ChooseDifficultyLevelForSoloModeMove,
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer && playerID === PlayerIdForSoloGameNames.HumanPlayerId,
    },
    ChooseHeroForDifficultySoloModeMoveValidator: {
        getRange: ({ ...rest }) => PickHeroesForSoloModeProfit({ ...rest }, ChooseDifficultySoloModeMoveValidatorNames.ChooseHeroForDifficultySoloModeMoveValidator),
        getValue: ({ ...rest }, currentMoveArguments) => {
            const moveArgument = currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError({ ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            AssertAllHeroesForDifficultySoloModePossibleCardId(moveArgument);
            return moveArgument;
        },
        moveName: CardMoveNames.ChooseHeroForDifficultySoloModeMove,
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer && playerID === PlayerIdForSoloGameNames.HumanPlayerId,
    },
    // Solo Mode Andvari
    ChooseStrategyVariantForSoloModeAndvariMoveValidator: {
        getRange: ({ ...rest }) => ChooseStrategyVariantForSoloModeAndvariProfit({ ...rest }, ChooseDifficultySoloModeAndvariMoveValidatorNames.ChooseStrategyVariantForSoloModeAndvariMoveValidator),
        getValue: ({ ...rest }, currentMoveArguments) => {
            const moveArgument = currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError({ ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            return moveArgument;
        },
        moveName: ButtonMoveNames.ChooseStrategyVariantForSoloModeAndvariMove,
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer && playerID === PlayerIdForSoloGameNames.HumanPlayerId,
    },
    ChooseStrategyForSoloModeAndvariMoveValidator: {
        getRange: ({ ...rest }) => ChooseStrategyForSoloModeAndvariProfit({ ...rest }, ChooseDifficultySoloModeAndvariMoveValidatorNames.ChooseStrategyForSoloModeAndvariMoveValidator),
        getValue: ({ ...rest }, currentMoveArguments) => {
            const moveArgument = currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError({ ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            return moveArgument;
        },
        moveName: ButtonMoveNames.ChooseStrategyForSoloModeAndvariMove,
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer && playerID === PlayerIdForSoloGameNames.HumanPlayerId,
    },
    SoloBotAndvariPlaceAllCoinsMoveValidator: {
        getRange: ({ ...rest }) => DrawPlayersHandsCoins({ ...rest }, BidsMoveValidatorNames.SoloBotAndvariPlaceAllCoinsMoveValidator),
        getValue: ({ ...rest }, currentMoveArguments) => {
            const moveArgument = currentMoveArguments[0];
            if (moveArgument === undefined) {
                return ThrowMyError({ ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            return moveArgument;
        },
        moveName: AutoBotsMoveNames.SoloBotAndvariPlaceAllCoinsMove,
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId,
    },
    SoloBotAndvariClickCardMoveValidator: {
        getRange: ({ ...rest }) => DrawTaverns({ ...rest }, TavernsResolutionMoveValidatorNames.SoloBotAndvariClickCardMoveValidator),
        getValue: ({ ...rest }, currentMoveArguments, playerID) => {
            let moveArgument = CheckSoloBotAndvariMustTakeCardFromGeneralStrategy({ ...rest }, playerID, currentMoveArguments);
            if (moveArgument === undefined) {
                moveArgument = CheckSoloBotAndvariMustTakeCardToPickHero({ ...rest }, playerID, currentMoveArguments);
            }
            if (moveArgument === undefined) {
                moveArgument = CheckSoloBotAndvariMustTakeRoyalOfferingCard({ ...rest }, currentMoveArguments);
            }
            if (moveArgument === undefined) {
                moveArgument = SoloBotMustTakeCardFromReserveStrategy({ ...rest }, playerID, currentMoveArguments);
            }
            AssertTavernCardId(moveArgument);
            return moveArgument;
        },
        moveName: CardMoveNames.SoloBotAndvariClickCardMove,
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId,
    },
    SoloBotAndvariClickHeroCardMoveValidator: {
        getRange: ({ ...rest }) => DrawHeroes({ ...rest }, SoloBotAndvariCommonMoveValidatorNames.SoloBotAndvariClickHeroCardMoveValidator),
        getValue: ({ G, ...rest }, currentMoveArguments) => {
            let moveArgument;
            const dwergBrotherIndex = G.heroes.findIndex((hero) => hero.active && hero.name.startsWith(`Dwerg`));
            if (dwergBrotherIndex !== -1) {
                moveArgument = dwergBrotherIndex;
            }
            else {
                moveArgument = currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            }
            if (moveArgument === undefined) {
                return ThrowMyError({ G, ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            AssertAllHeroesForSoloBotAndvariPossibleCardId(moveArgument);
            return moveArgument;
        },
        moveName: CardMoveNames.SoloBotAndvariClickHeroCardMove,
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId,
    },
    SoloBotAndvariClickCardToPickDistinctionMoveValidator: {
        getRange: ({ ...rest }) => ExplorerDistinctionProfit({ ...rest }, TroopEvaluationMoveValidatorNames.SoloBotAndvariClickCardToPickDistinctionMoveValidator),
        getValue: ({ ...rest }, currentMoveArguments) => {
            const moveArgument = currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError({ ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            AssertExplorerDistinctionCardId(moveArgument);
            return moveArgument;
        },
        moveName: CardMoveNames.SoloBotAndvariClickCardToPickDistinctionMove,
        validate: ({ ctx }, playerID, id) => playerID === ctx.currentPlayer && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId && id === 0,
    },
    SoloBotAndvariPlaceThrudHeroMoveValidator: {
        getRange: ({ ...rest }) => DrawPlayersBoards({ ...rest }, SoloBotAndvariCommonMoveValidatorNames.SoloBotAndvariPlaceThrudHeroMoveValidator),
        getValue: ({ G, ...rest }, currentMoveArguments) => {
            // TODO Move same logic for SuitTypes & number to functions and use it in getValue
            // TODO Move same logic for Ylud placement in one func!
            if (G.strategyForSoloBotAndvari === null) {
                throw new Error(`В объекте стратегий для соло бота Андвари не может не быть фракций.`);
            }
            const strategySuitIndex = currentMoveArguments.findIndex((suit) => {
                if (G.strategyForSoloBotAndvari === null) {
                    throw new Error(`В объекте стратегий для соло бота Андвари не может не быть фракций.`);
                }
                return suit === G.strategyForSoloBotAndvari.general[0];
            });
            if (strategySuitIndex === -1) {
                throw new Error(`В массиве возможных аргументов мува для соло бота отсутствует нужное значение главной стратегии фракции '${G.strategyForSoloBotAndvari.general[0]}'.`);
            }
            const moveArgument = currentMoveArguments[strategySuitIndex];
            if (moveArgument === undefined) {
                return ThrowMyError({ G, ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            return moveArgument;
        },
        moveName: EmptyCardMoveNames.SoloBotAndvariPlaceThrudHeroMove,
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId,
    },
    SoloBotAndvariPlaceYludHeroMoveValidator: {
        getRange: ({ ...rest }) => DrawPlayersBoards({ ...rest }, PlaceYludMoveValidatorNames.SoloBotAndvariPlaceYludHeroMoveValidator),
        getValue: ({ G, ...rest }, currentMoveArguments) => {
            // TODO Move same logic for Thrud placement in one func!
            if (G.strategyForSoloBotAndvari === null) {
                throw new Error(`В объекте стратегий для соло бота Андвари не может не быть фракций.`);
            }
            const strategySuitIndex = currentMoveArguments.findIndex((suit) => {
                if (G.strategyForSoloBotAndvari === null) {
                    throw new Error(`В объекте стратегий для соло бота Андвари не может не быть фракций.`);
                }
                return suit === G.strategyForSoloBotAndvari.general[0];
            });
            if (strategySuitIndex === -1) {
                throw new Error(`В массиве возможных аргументов мува для соло бота отсутствует нужное значение главной стратегии фракции '${G.strategyForSoloBotAndvari.general[0]}'.`);
            }
            const moveArgument = currentMoveArguments[strategySuitIndex];
            if (moveArgument === undefined) {
                return ThrowMyError({ G, ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            return moveArgument;
        },
        moveName: EmptyCardMoveNames.SoloBotAndvariPlaceYludHeroMove,
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId,
    },
    SoloBotAndvariClickCoinToUpgradeMoveValidator: {
        getRange: ({ ...rest }) => DrawPlayersBoardsCoins({ ...rest }, SoloBotAndvariCommonMoveValidatorNames.SoloBotAndvariClickCoinToUpgradeMoveValidator),
        getValue: ({ G, ...rest }, currentMoveArguments, playerID) => {
            if (playerID === undefined) {
                return ThrowMyError({ G, ...rest }, ErrorNames.PlayerIDIsNotDefined);
            }
            const player = G.publicPlayers[playerID];
            if (player === undefined) {
                return ThrowMyError({ G, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
            }
            const coins = player.boardCoins, minValue = CheckMinCoinVisibleValueForSoloBotAndvari({ G, ...rest }, playerID, currentMoveArguments);
            if (minValue === 0) {
                throw new Error(`В массиве монет соло бота Андвари с id '${playerID}' не может быть минимальная монета для улучшения с значением '${minValue}'.`);
            }
            const coinId = CheckMinCoinIndexForSoloBotAndvari({ G, ...rest }, coins, minValue), moveArgument = currentMoveArguments[coinId];
            if (moveArgument === undefined) {
                return ThrowMyError({ G, ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            return moveArgument;
        },
        moveName: CoinMoveNames.SoloBotAndvariClickCoinToUpgradeMove,
        validate: ({ ctx, ...rest }, playerID, id) => playerID === ctx.currentPlayer && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId
            && CoinUpgradeValidation({ ctx, ...rest }, playerID, id),
    },
    // start
    AddCoinToPouchMoveValidator: {
        getRange: ({ ...rest }) => DrawPlayersHandsCoins({ ...rest }, CommonMoveValidatorNames.AddCoinToPouchMoveValidator),
        getValue: ({ ...rest }, currentMoveArguments) => {
            const moveArgument = currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError({ ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            AssertPlayerCoinId(moveArgument);
            return moveArgument;
        },
        moveName: CoinMoveNames.AddCoinToPouchMove,
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer,
    },
    ChooseCoinValueForVidofnirVedrfolnirUpgradeMoveValidator: {
        getRange: ({ ...rest }) => ChooseCoinValueForVidofnirVedrfolnirUpgradeProfit({ ...rest }, CommonMoveValidatorNames.ChooseCoinValueForVidofnirVedrfolnirUpgradeMoveValidator),
        getValue: ({ ...rest }, currentMoveArguments) => {
            const moveArgument = currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError({ ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            AssertBasicVidofnirVedrfolnirUpgradeValue(moveArgument);
            return moveArgument;
        },
        moveName: ButtonMoveNames.ChooseCoinValueForVidofnirVedrfolnirUpgradeMove,
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer,
    },
    ClickCampCardHoldaMoveValidator: {
        getRange: ({ ...rest }) => DrawCamp({ ...rest }, CommonMoveValidatorNames.ClickCampCardHoldaMoveValidator),
        getValue: ({ ...rest }, currentMoveArguments) => {
            const moveArgument = currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError({ ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            AssertCampIndex(moveArgument);
            return moveArgument;
        },
        moveName: CardMoveNames.ClickCampCardHoldaMove,
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer,
    },
    // TODO Is it need for solo bot and andvari!?
    PickConcreteCoinToUpgradeMoveValidator: {
        getRange: ({ ...rest }) => DrawPlayersBoardsCoins({ ...rest }, CommonMoveValidatorNames.PickConcreteCoinToUpgradeMoveValidator).concat(DrawPlayersHandsCoins({ ...rest }, CommonMoveValidatorNames.PickConcreteCoinToUpgradeMoveValidator)),
        getValue: ({ ...rest }, currentMoveArguments) => {
            const moveArgument = currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError({ ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            return moveArgument;
        },
        moveName: CoinMoveNames.PickConcreteCoinToUpgradeMove,
        validate: ({ ctx, ...rest }, playerID, id) => playerID === ctx.currentPlayer && CoinUpgradeValidation({ ctx, ...rest }, playerID, id),
    },
    ClickCoinToUpgradeMoveValidator: {
        getRange: ({ ...rest }) => DrawPlayersBoardsCoins({ ...rest }, CommonMoveValidatorNames.ClickCoinToUpgradeMoveValidator).concat(DrawPlayersHandsCoins({ ...rest }, CommonMoveValidatorNames.ClickCoinToUpgradeMoveValidator)),
        getValue: ({ ...rest }, currentMoveArguments) => {
            const moveArgument = currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError({ ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            return moveArgument;
        },
        moveName: CoinMoveNames.ClickCoinToUpgradeMove,
        validate: ({ ctx, ...rest }, playerID, id) => playerID === ctx.currentPlayer && CoinUpgradeValidation({ ctx, ...rest }, playerID, id),
    },
    ClickHeroCardMoveValidator: {
        getRange: ({ ...rest }) => DrawHeroes({ ...rest }, CommonMoveValidatorNames.ClickHeroCardMoveValidator),
        getValue: ({ ...rest }, currentMoveArguments) => {
            const moveArgument = currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError({ ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            AssertAllHeroesForPlayerOrSoloBotAddToPlayerBoardPossibleCardId(moveArgument);
            return moveArgument;
        },
        moveName: CardMoveNames.ClickHeroCardMove,
        validate: ({ G, ctx, ...rest }, playerID, id) => {
            let isValid = false;
            const hero = G.heroes[id];
            if (hero === undefined) {
                throw new Error(`В массиве карт героев отсутствует герой с id '${id}'.`);
            }
            const validators = hero.pickValidators;
            if (validators !== undefined) {
                let validator, _exhaustiveCheck;
                for (validator in validators) {
                    if (validator === PickHeroCardValidatorNames.conditions) {
                        isValid = IsCanPickHeroWithConditionsValidator({ G, ctx, ...rest }, playerID, id);
                    }
                    else if (validator === PickHeroCardValidatorNames.discardCard) {
                        isValid = IsCanPickHeroWithDiscardCardsFromPlayerBoardValidator({ G, ctx, ...rest }, playerID, id);
                    }
                    else {
                        _exhaustiveCheck = validator;
                        throw new Error(`Отсутствует валидатор для выбора карты героя.`);
                        return _exhaustiveCheck;
                    }
                }
            }
            else {
                isValid = true;
            }
            return playerID === ctx.currentPlayer && isValid;
        },
    },
    DiscardTopCardFromSuitMoveValidator: {
        getRange: ({ ...rest }) => DrawPlayersBoards({ ...rest }, CommonMoveValidatorNames.DiscardTopCardFromSuitMoveValidator),
        getValue: ({ ...rest }, currentMoveArguments) => {
            const suitNamesArray = [];
            let suit;
            for (suit in currentMoveArguments) {
                suitNamesArray.push(suit);
            }
            const suitName = suitNamesArray[Math.floor(Math.random() * suitNamesArray.length)];
            if (suitName === undefined) {
                throw new Error(`Отсутствует выбранная случайно фракция для сброса карты.`);
            }
            const moveArgumentForSuit = currentMoveArguments[suitName];
            if (moveArgumentForSuit === undefined) {
                throw new Error(`Отсутствует обязательный параметр с аргументом '${suitName}'.`);
            }
            const moveArgument = moveArgumentForSuit[Math.floor(Math.random() * moveArgumentForSuit.length)];
            if (moveArgument === undefined) {
                return ThrowMyError({ ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            return {
                suit: suitName,
                cardId: moveArgument,
            };
        },
        moveName: CardMoveNames.DiscardTopCardFromSuitMove,
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer,
    },
    DiscardSuitCardFromPlayerBoardMoveValidator: {
        getRange: ({ ...rest }, playerID) => DrawPlayersBoards({ ...rest }, CommonMoveValidatorNames.DiscardSuitCardFromPlayerBoardMoveValidator, playerID),
        getValue: ({ G, ...rest }, currentMoveArguments, playerID) => {
            if (playerID === undefined) {
                return ThrowMyError({ G, ...rest }, ErrorNames.PlayerIDIsNotDefined);
            }
            // TODO Check playerID here!!!
            const player = G.publicPlayers[playerID];
            if (player === undefined) {
                return ThrowMyError({ G, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
            }
            const cardFirst = player.cards[SuitNames.warrior][0];
            if (cardFirst === undefined) {
                throw new Error(`В массиве карт игрока во фракции '${SuitNames.warrior}' отсутствует первая карта.`);
            }
            let minCardIndex = 0, minCardValue = cardFirst.points;
            currentMoveArguments.cards.forEach((value, index) => {
                const card = player.cards[SuitNames.warrior][value];
                if (card === undefined) {
                    throw new Error(`В массиве карт игрока во фракции '${SuitNames.warrior}' отсутствует карта ${value}.`);
                }
                const cardPoints = card.points;
                if (cardPoints === null || minCardValue === null) {
                    throw new Error(`Фракция должна иметь параметр 'points'.`);
                }
                if (cardPoints < minCardValue) {
                    minCardIndex = index;
                    minCardValue = cardPoints;
                }
            });
            const cardIndex = currentMoveArguments.cards[minCardIndex];
            if (cardIndex === undefined) {
                throw new Error(`В массиве аргументов для 'cardId' отсутствует значение с id '${minCardIndex}'.`);
            }
            return {
                cardId: cardIndex,
            };
        },
        moveName: CardMoveNames.DiscardSuitCardFromPlayerBoardMove,
        // TODO validate Not bot playerID === ctx.currentPlayer & for Bot playerID exists in playersNum and card not hero?
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer,
    },
    PickDiscardCardMoveValidator: {
        getRange: ({ ...rest }) => DrawDiscardedCards({ ...rest }, CommonMoveValidatorNames.PickDiscardCardMoveValidator),
        getValue: ({ ...rest }, currentMoveArguments) => {
            const moveArgument = currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError({ ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            return moveArgument;
        },
        moveName: CardMoveNames.PickDiscardCardMove,
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer,
    },
    PlaceMultiSuitCardMoveValidator: {
        getRange: ({ ...rest }) => DrawPlayersBoards({ ...rest }, CommonMoveValidatorNames.PlaceMultiSuitCardMoveValidator),
        getValue: ({ ...rest }, currentMoveArguments) => {
            const moveArgument = currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError({ ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            return moveArgument;
        },
        moveName: EmptyCardMoveNames.PlaceMultiSuitCardMove,
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer,
    },
    PlaceThrudHeroMoveValidator: {
        getRange: ({ ...rest }) => DrawPlayersBoards({ ...rest }, CommonMoveValidatorNames.PlaceThrudHeroMoveValidator),
        getValue: ({ ...rest }, currentMoveArguments) => {
            // TODO Move same logic for SuitTypes & number to functions and use it in getValue
            // TODO Same logic for Ylud placement!
            const moveArgument = currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError({ ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            return moveArgument;
        },
        moveName: EmptyCardMoveNames.PlaceThrudHeroMove,
        validate: ({ ctx }, playerID) => playerID === ctx.currentPlayer,
    },
    UpgradeCoinVidofnirVedrfolnirMoveValidator: {
        getRange: ({ ...rest }) => DrawPlayersBoardsCoins({ ...rest }, CommonMoveValidatorNames.UpgradeCoinVidofnirVedrfolnirMoveValidator),
        getValue: ({ ...rest }, currentMoveArguments) => {
            const moveArgument = currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError({ ...rest }, ErrorNames.CurrentMoveArgumentIsUndefined);
            }
            return moveArgument;
        },
        moveName: CoinMoveNames.UpgradeCoinVidofnirVedrfolnirMove,
        validate: ({ G, ctx, ...rest }, playerID, id) => {
            if (playerID === undefined) {
                return ThrowMyError({ G, ctx, ...rest }, ErrorNames.PlayerIDIsNotDefined);
            }
            const player = G.publicPlayers[playerID];
            if (player === undefined) {
                return ThrowMyError({ G, ctx, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
            }
            return playerID === ctx.currentPlayer && player.stack[0]?.coinId !== id.coinId && CoinUpgradeValidation({ G, ctx, ...rest }, playerID, id);
        },
    },
    // end
};
/**
 * <h3>ДОБАВИТЬ ОПИСАНИЕ.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>ДОБАВИТЬ ПРИМЕНЕНИЯ.</li>
 * </oL>
 * @TODO Саше: сделать описание функции и параметров.
 */
export const moveBy = {
    default: null,
    ChooseDifficultySoloMode: {
        ChooseDifficultyLevelForSoloMode: {
            ChooseDifficultyLevelForSoloModeMove: moveValidators.ChooseDifficultyLevelForSoloModeMoveValidator,
        },
        ChooseHeroForDifficultySoloMode: {
            ChooseHeroForDifficultySoloModeMove: moveValidators.ChooseHeroForDifficultySoloModeMoveValidator,
        },
        // Solo Bot
        SoloBotClickCoinToUpgrade: {
            SoloBotClickCoinToUpgradeMove: moveValidators.SoloBotClickCoinToUpgradeMoveValidator,
        },
    },
    ChooseDifficultySoloModeAndvari: {
        ChooseStrategyVariantForSoloModeAndvari: {
            ChooseStrategyVariantForSoloModeAndvariMove: moveValidators.ChooseStrategyVariantForSoloModeAndvariMoveValidator,
        },
        ChooseStrategyForSoloModeAndvari: {
            ChooseStrategyForSoloModeAndvariMove: moveValidators.ChooseStrategyForSoloModeAndvariMoveValidator,
        },
    },
    Bids: {
        ClickHandCoin: {
            ClickHandCoinMove: moveValidators.ClickHandCoinMoveValidator,
        },
        ClickBoardCoin: {
            ClickBoardCoinMove: moveValidators.ClickBoardCoinMoveValidator,
        },
        // Bots
        BotsPlaceAllCoins: {
            BotsPlaceAllCoinsMove: moveValidators.BotsPlaceAllCoinsMoveValidator,
        },
        // Solo Bot
        SoloBotPlaceAllCoins: {
            SoloBotPlaceAllCoinsMove: moveValidators.SoloBotPlaceAllCoinsMoveValidator,
        },
        // Solo Bot Andvari
        SoloBotAndvariPlaceAllCoins: {
            SoloBotAndvariPlaceAllCoinsMove: moveValidators.SoloBotAndvariPlaceAllCoinsMoveValidator,
        },
    },
    BidUline: {
        ClickHandCoinUline: {
            ClickHandCoinUlineMove: moveValidators.ClickHandCoinUlineMoveValidator,
        },
    },
    TavernsResolution: {
        ClickCard: {
            ClickCardMove: moveValidators.ClickCardMoveValidator,
        },
        ClickCampCard: {
            ClickCampCardMove: moveValidators.ClickCampCardMoveValidator,
        },
        // TODO Check/Fix
        // start
        AddCoinToPouch: {
            AddCoinToPouchMove: moveValidators.AddCoinToPouchMoveValidator,
        },
        ChooseCoinValueForVidofnirVedrfolnirUpgrade: {
            ChooseCoinValueForVidofnirVedrfolnirUpgradeMove: moveValidators.ChooseCoinValueForVidofnirVedrfolnirUpgradeMoveValidator,
        },
        DiscardTopCardFromSuit: {
            DiscardTopCardFromSuitMove: moveValidators.DiscardTopCardFromSuitMoveValidator,
        },
        DiscardSuitCardFromPlayerBoard: {
            DiscardSuitCardFromPlayerBoardMove: moveValidators.DiscardSuitCardFromPlayerBoardMoveValidator,
        },
        ClickCampCardHolda: {
            ClickCampCardHoldaMove: moveValidators.ClickCampCardHoldaMoveValidator,
        },
        PickConcreteCoinToUpgrade: {
            PickConcreteCoinToUpgradeMove: moveValidators.PickConcreteCoinToUpgradeMoveValidator,
        },
        PickDiscardCard: {
            PickDiscardCardMove: moveValidators.PickDiscardCardMoveValidator,
        },
        ClickHeroCard: {
            ClickHeroCardMove: moveValidators.ClickHeroCardMoveValidator,
        },
        PlaceMultiSuitCard: {
            PlaceMultiSuitCardMove: moveValidators.PlaceMultiSuitCardMoveValidator,
        },
        PlaceThrudHero: {
            PlaceThrudHeroMove: moveValidators.PlaceThrudHeroMoveValidator,
        },
        ClickCoinToUpgrade: {
            ClickCoinToUpgradeMove: moveValidators.ClickCoinToUpgradeMoveValidator,
        },
        UpgradeCoinVidofnirVedrfolnir: {
            UpgradeCoinVidofnirVedrfolnirMove: moveValidators.UpgradeCoinVidofnirVedrfolnirMoveValidator,
        },
        // end
        ActivateGiantAbilityOrPickCard: {
            ClickCardNotGiantAbilityMove: moveValidators.ClickCardNotGiantAbilityMoveValidator,
            ClickGiantAbilityNotCardMove: moveValidators.ClickGiantAbilityNotCardMoveValidator,
        },
        ActivateGodAbilityOrNot: {
            ActivateGodAbilityMove: moveValidators.ActivateGodAbilityMoveValidator,
            NotActivateGodAbilityMove: moveValidators.NotActivateGodAbilityMoveValidator,
        },
        ChooseCoinValueForHrungnirUpgrade: {
            ChooseCoinValueForHrungnirUpgradeMove: moveValidators.ChooseCoinValueForHrungnirUpgradeMoveValidator,
        },
        ChooseSuitOlrun: {
            ChooseSuitOlrunMove: moveValidators.ChooseSuitOlrunMoveValidator,
        },
        DiscardCard2Players: {
            DiscardCard2PlayersMove: moveValidators.DiscardCard2PlayersMoveValidator,
        },
        GetMythologyCard: {
            GetMythologyCardMove: moveValidators.GetMythologyCardMoveValidator,
        },
        ClickHandTradingCoinUline: {
            ClickHandTradingCoinUlineMove: moveValidators.ClickHandTradingCoinUlineMoveValidator,
        },
        // Solo Bot
        SoloBotClickCard: {
            SoloBotClickCardMove: moveValidators.SoloBotClickCardMoveValidator,
        },
        // Common Solo Bot Start
        SoloBotClickHeroCard: {
            SoloBotClickHeroCardMove: moveValidators.SoloBotClickHeroCardMoveValidator,
        },
        SoloBotPlaceThrudHero: {
            SoloBotPlaceThrudHeroMove: moveValidators.SoloBotPlaceThrudHeroMoveValidator,
        },
        SoloBotClickCoinToUpgrade: {
            SoloBotClickCoinToUpgradeMove: moveValidators.SoloBotClickCoinToUpgradeMoveValidator,
        },
        // Common Solo Bot End
        // Solo Bot Andvari
        SoloBotAndvariClickCard: {
            SoloBotAndvariClickCardMove: moveValidators.SoloBotAndvariClickCardMoveValidator,
        },
        // Common Solo Bot Andvari Start
        SoloBotAndvariClickHeroCard: {
            SoloBotAndvariClickHeroCardMove: moveValidators.SoloBotAndvariClickHeroCardMoveValidator,
        },
        SoloBotAndvariPlaceThrudHero: {
            SoloBotAndvariPlaceThrudHeroMove: moveValidators.SoloBotAndvariPlaceThrudHeroMoveValidator,
        },
        SoloBotAndvariClickCoinToUpgrade: {
            SoloBotAndvariClickCoinToUpgradeMove: moveValidators.SoloBotAndvariClickCoinToUpgradeMoveValidator,
        },
        // Common Solo Bot Andvari End
    },
    EnlistmentMercenaries: {
        StartEnlistmentMercenaries: {
            StartEnlistmentMercenariesMove: moveValidators.StartEnlistmentMercenariesMoveValidator,
        },
        PassEnlistmentMercenaries: {
            PassEnlistmentMercenariesMove: moveValidators.PassEnlistmentMercenariesMoveValidator,
        },
        GetEnlistmentMercenaries: {
            GetEnlistmentMercenariesMove: moveValidators.GetEnlistmentMercenariesMoveValidator,
        },
        PlaceEnlistmentMercenaries: {
            PlaceEnlistmentMercenariesMove: moveValidators.PlaceEnlistmentMercenariesMoveValidator,
        },
        // start
        AddCoinToPouch: {
            AddCoinToPouchMove: moveValidators.AddCoinToPouchMoveValidator,
        },
        ChooseCoinValueForVidofnirVedrfolnirUpgrade: {
            ChooseCoinValueForVidofnirVedrfolnirUpgradeMove: moveValidators.ChooseCoinValueForVidofnirVedrfolnirUpgradeMoveValidator,
        },
        DiscardTopCardFromSuit: {
            DiscardTopCardFromSuitMove: moveValidators.DiscardTopCardFromSuitMoveValidator,
        },
        DiscardSuitCardFromPlayerBoard: {
            DiscardSuitCardFromPlayerBoardMove: moveValidators.DiscardSuitCardFromPlayerBoardMoveValidator,
        },
        ClickCampCardHolda: {
            ClickCampCardHoldaMove: moveValidators.ClickCampCardHoldaMoveValidator,
        },
        PickConcreteCoinToUpgrade: {
            PickConcreteCoinToUpgradeMove: moveValidators.PickConcreteCoinToUpgradeMoveValidator,
        },
        PickDiscardCard: {
            PickDiscardCardMove: moveValidators.PickDiscardCardMoveValidator,
        },
        ClickHeroCard: {
            ClickHeroCardMove: moveValidators.ClickHeroCardMoveValidator,
        },
        PlaceMultiSuitCard: {
            PlaceMultiSuitCardMove: moveValidators.PlaceMultiSuitCardMoveValidator,
        },
        PlaceThrudHero: {
            PlaceThrudHeroMove: moveValidators.PlaceThrudHeroMoveValidator,
        },
        ClickCoinToUpgrade: {
            ClickCoinToUpgradeMove: moveValidators.ClickCoinToUpgradeMoveValidator,
        },
        UpgradeCoinVidofnirVedrfolnir: {
            UpgradeCoinVidofnirVedrfolnirMove: moveValidators.UpgradeCoinVidofnirVedrfolnirMoveValidator,
        },
        // end
    },
    PlaceYlud: {
        PlaceYludHero: {
            PlaceYludHeroMove: moveValidators.PlaceYludHeroMoveValidator,
        },
        // start
        AddCoinToPouch: {
            AddCoinToPouchMove: moveValidators.AddCoinToPouchMoveValidator,
        },
        ChooseCoinValueForVidofnirVedrfolnirUpgrade: {
            ChooseCoinValueForVidofnirVedrfolnirUpgradeMove: moveValidators.ChooseCoinValueForVidofnirVedrfolnirUpgradeMoveValidator,
        },
        DiscardTopCardFromSuit: {
            DiscardTopCardFromSuitMove: moveValidators.DiscardTopCardFromSuitMoveValidator,
        },
        DiscardSuitCardFromPlayerBoard: {
            DiscardSuitCardFromPlayerBoardMove: moveValidators.DiscardSuitCardFromPlayerBoardMoveValidator,
        },
        ClickCampCardHolda: {
            ClickCampCardHoldaMove: moveValidators.ClickCampCardHoldaMoveValidator,
        },
        PickConcreteCoinToUpgrade: {
            PickConcreteCoinToUpgradeMove: moveValidators.PickConcreteCoinToUpgradeMoveValidator,
        },
        PickDiscardCard: {
            PickDiscardCardMove: moveValidators.PickDiscardCardMoveValidator,
        },
        ClickHeroCard: {
            ClickHeroCardMove: moveValidators.ClickHeroCardMoveValidator,
        },
        PlaceMultiSuitCard: {
            PlaceMultiSuitCardMove: moveValidators.PlaceMultiSuitCardMoveValidator,
        },
        PlaceThrudHero: {
            PlaceThrudHeroMove: moveValidators.PlaceThrudHeroMoveValidator,
        },
        ClickCoinToUpgrade: {
            ClickCoinToUpgradeMove: moveValidators.ClickCoinToUpgradeMoveValidator,
        },
        UpgradeCoinVidofnirVedrfolnir: {
            UpgradeCoinVidofnirVedrfolnirMove: moveValidators.UpgradeCoinVidofnirVedrfolnirMoveValidator,
        },
        // end
        // Solo Bot
        SoloBotPlaceYludHero: {
            SoloBotPlaceYludHeroMove: moveValidators.SoloBotPlaceYludHeroMoveValidator,
        },
        // Common Solo Bot Start
        SoloBotClickHeroCard: {
            SoloBotClickHeroCardMove: moveValidators.SoloBotClickHeroCardMoveValidator,
        },
        SoloBotPlaceThrudHero: {
            SoloBotPlaceThrudHeroMove: moveValidators.SoloBotPlaceThrudHeroMoveValidator,
        },
        SoloBotClickCoinToUpgrade: {
            SoloBotClickCoinToUpgradeMove: moveValidators.SoloBotClickCoinToUpgradeMoveValidator,
        },
        // Common Solo Bot End
        // Solo Bot Andvari
        SoloBotAndvariPlaceYludHero: {
            SoloBotAndvariPlaceYludHeroMove: moveValidators.SoloBotAndvariPlaceYludHeroMoveValidator,
        },
        // Common Solo Bot Andvari Start
        SoloBotAndvariClickHeroCard: {
            SoloBotAndvariClickHeroCardMove: moveValidators.SoloBotAndvariClickHeroCardMoveValidator,
        },
        SoloBotAndvariPlaceThrudHero: {
            SoloBotAndvariPlaceThrudHeroMove: moveValidators.SoloBotAndvariPlaceThrudHeroMoveValidator,
        },
        SoloBotAndvariClickCoinToUpgrade: {
            SoloBotAndvariClickCoinToUpgradeMove: moveValidators.SoloBotAndvariClickCoinToUpgradeMoveValidator,
        },
        // Common Solo Bot Andvari End
    },
    TroopEvaluation: {
        ClickDistinctionCard: {
            ClickDistinctionCardMove: moveValidators.ClickDistinctionCardMoveValidator,
        },
        // start
        AddCoinToPouch: {
            AddCoinToPouchMove: moveValidators.AddCoinToPouchMoveValidator,
        },
        ChooseCoinValueForVidofnirVedrfolnirUpgrade: {
            ChooseCoinValueForVidofnirVedrfolnirUpgradeMove: moveValidators.ChooseCoinValueForVidofnirVedrfolnirUpgradeMoveValidator,
        },
        DiscardTopCardFromSuit: {
            DiscardTopCardFromSuitMove: moveValidators.DiscardTopCardFromSuitMoveValidator,
        },
        DiscardSuitCardFromPlayerBoard: {
            DiscardSuitCardFromPlayerBoardMove: moveValidators.DiscardSuitCardFromPlayerBoardMoveValidator,
        },
        ClickCampCardHolda: {
            ClickCampCardHoldaMove: moveValidators.ClickCampCardHoldaMoveValidator,
        },
        PickConcreteCoinToUpgrade: {
            PickConcreteCoinToUpgradeMove: moveValidators.PickConcreteCoinToUpgradeMoveValidator,
        },
        PickDiscardCard: {
            PickDiscardCardMove: moveValidators.PickDiscardCardMoveValidator,
        },
        ClickHeroCard: {
            ClickHeroCardMove: moveValidators.ClickHeroCardMoveValidator,
        },
        PlaceMultiSuitCard: {
            PlaceMultiSuitCardMove: moveValidators.PlaceMultiSuitCardMoveValidator,
        },
        PlaceThrudHero: {
            PlaceThrudHeroMove: moveValidators.PlaceThrudHeroMoveValidator,
        },
        ClickCoinToUpgrade: {
            ClickCoinToUpgradeMove: moveValidators.ClickCoinToUpgradeMoveValidator,
        },
        UpgradeCoinVidofnirVedrfolnir: {
            UpgradeCoinVidofnirVedrfolnirMove: moveValidators.UpgradeCoinVidofnirVedrfolnirMoveValidator,
        },
        // end
        ClickCardToPickDistinction: {
            ClickCardToPickDistinctionMove: moveValidators.ClickCardToPickDistinctionMoveValidator,
        },
        // Solo Bot
        SoloBotClickCardToPickDistinction: {
            SoloBotClickCardToPickDistinctionMove: moveValidators.SoloBotClickCardToPickDistinctionMoveValidator,
        },
        // Common Solo Bot Start
        SoloBotClickHeroCard: {
            SoloBotClickHeroCardMove: moveValidators.SoloBotClickHeroCardMoveValidator,
        },
        SoloBotPlaceThrudHero: {
            SoloBotPlaceThrudHeroMove: moveValidators.SoloBotPlaceThrudHeroMoveValidator,
        },
        SoloBotClickCoinToUpgrade: {
            SoloBotClickCoinToUpgradeMove: moveValidators.SoloBotClickCoinToUpgradeMoveValidator,
        },
        // Common Solo Bot End
        // Solo Bot Andvari
        SoloBotAndvariClickCardToPickDistinction: {
            SoloBotAndvariClickCardToPickDistinctionMove: moveValidators.SoloBotAndvariClickCardToPickDistinctionMoveValidator,
        },
        // Common Solo Bot Andvari Start
        SoloBotAndvariClickHeroCard: {
            SoloBotAndvariClickHeroCardMove: moveValidators.SoloBotAndvariClickHeroCardMoveValidator,
        },
        SoloBotAndvariPlaceThrudHero: {
            SoloBotAndvariPlaceThrudHeroMove: moveValidators.SoloBotAndvariPlaceThrudHeroMoveValidator,
        },
        SoloBotAndvariClickCoinToUpgrade: {
            SoloBotAndvariClickCoinToUpgradeMove: moveValidators.SoloBotAndvariClickCoinToUpgradeMoveValidator,
        },
        // Common Solo Bot Andvari End
    },
    BrisingamensEndGame: {
        DiscardCardFromPlayerBoard: {
            DiscardCardFromPlayerBoardMove: moveValidators.DiscardCardFromPlayerBoardMoveValidator,
        },
    },
    GetMjollnirProfit: {
        GetMjollnirProfit: {
            GetMjollnirProfitMove: moveValidators.GetMjollnirProfitMoveValidator,
        },
    },
};
// TODO Move to function generic type with extends number & SuitNames
/**
 * <h3>ДОБАВИТЬ ОПИСАНИЕ.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>ДОБАВИТЬ ПРИМЕНЕНИЯ.</li>
 * </oL>
 *
 * @TODO Саше: сделать описание функции и параметров.
 * @param value Значение для валидации.
 * @param values Массив значений, допустимых для прохождения валидации.
 * @returns Валидация значений мувов.
 */
const ValidateByArrayValues = (value, values) => values.includes(value);
/**
 * <h3>ДОБАВИТЬ ОПИСАНИЕ.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>ДОБАВИТЬ ПРИМЕНЕНИЯ.</li>
 * </oL>
 *
 * @TODO Саше: сделать описание функции и параметров.
 * @param value
 * @param values
 * @returns Валидация монет.
 */
const ValidateByObjectCoinIdTypeIsInitialValues = (value, values) => values.findIndex((coin) => value.coinId === coin.coinId && value.type === coin.type) !== -1;
/**
 * <h3>ДОБАВИТЬ ОПИСАНИЕ.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>ДОБАВИТЬ ПРИМЕНЕНИЯ.</li>
 * </oL>
 *
 * @TODO Саше: сделать описание функции и параметров.
 * @param value
 * @param values
 * @returns Валидация карт.
 */
const ValidateByObjectSuitCardIdValues = (value, values) => {
    const objectSuitCardIdValues = values[value.suit];
    return objectSuitCardIdValues !== undefined && objectSuitCardIdValues.includes(value.cardId);
};
/**
 * <h3>ДОБАВИТЬ ОПИСАНИЕ.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>ДОБАВИТЬ ПРИМЕНЕНИЯ.</li>
 * </oL>
 *
 * @TODO Саше: сделать описание функции и параметров.
 * @param value
 * @param values
 * @returns Валидация карт.
 */
const ValidateByObjectCardIdValues = (value, values) => values.cards.includes(value.cardId);
/**
* <h3>ДОБАВИТЬ ОПИСАНИЕ.</h3>
* <p>Применения:</p>
* <ol>
* <li>ДОБАВИТЬ ПРИМЕНЕНИЯ.</li>
* </oL>
*
* @TODO Саше: сделать описание функции и параметров.
* @param value
* @param values
* @returns Валидация карт.
*/
const ValidateObjectEqualValues = (value, values) => {
    const props1 = Object.getOwnPropertyNames(value), props2 = Object.getOwnPropertyNames(values);
    if (props1.length !== props2.length) {
        return false;
    }
    for (let i = 0; i < props1.length; i++) {
        const prop = props1[i];
        if (prop === undefined) {
            throw new Error(`Не существует такого 'prop'.`);
        }
        if (value[prop] !== values[prop]) {
            return false;
        }
    }
    return true;
};
//# sourceMappingURL=MoveValidator.js.map