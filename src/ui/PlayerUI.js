import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ALlStyles } from "../data/StyleData";
import { suitsConfig } from "../data/SuitData";
import { ThrowMyError } from "../Error";
import { CheckPlayerHasBuff } from "../helpers/BuffHelpers";
import { AssertPlayerCoinId, AssertPlayerId, AssertTavernIndex } from "../is_helpers/AssertionTypeHelpers";
import { IsMercenaryCampCard } from "../is_helpers/IsCampTypeHelpers";
import { IsCoin, IsTriggerTradingCoin } from "../is_helpers/IsCoinTypeHelpers";
import { AllCurrentScoring } from "../Score";
import { TotalRank } from "../score_helpers/ScoreHelpers";
import { tavernsConfig } from "../Tavern";
import { BidsMoveValidatorNames, BidUlineMoveValidatorNames, BrisingamensEndGameMoveValidatorNames, CardMoveNames, CardRusNames, CoinCssClassNames, CoinMoveNames, CoinNames, CommonMoveValidatorNames, CommonStageNames, DrawCoinNames, EmptyCardMoveNames, EnlistmentMercenariesMoveValidatorNames, EnlistmentMercenariesStageNames, ErrorNames, GameModeNames, GetMjollnirProfitMoveValidatorNames, HeroBuffNames, HeroNames, MultiSuitCardNames, PhaseNames, PlaceYludMoveValidatorNames, PlayerIdForSoloGameNames, SoloBotAndvariCommonMoveValidatorNames, SoloBotAndvariCommonStageNames, SoloBotCommonCoinUpgradeMoveValidatorNames, SoloBotCommonCoinUpgradeStageNames, SoloBotCommonMoveValidatorNames, SoloBotCommonStageNames, SuitMoveNames, SuitNames, TavernsResolutionMoveValidatorNames, TavernsResolutionStageNames } from "../typescript/enums";
import { DrawCard, DrawCoin, DrawEmptyCard, DrawSuit } from "./ElementsUI";
// TODO Check Solo Bot & multiplayer actions!
// TODO Move strings coins class names to enum!
/**
 * <h3>Отрисовка планшета всех карт игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка игрового поля.</li>
 * </ol>
 *
 * @param context
 * @param validatorName Название валидатора.
 * @param playerID ID требуемого игрока.
 * @param data Глобальные параметры.
 * @returns Игровые поля для планшета всех карт игрока.
 */
export const DrawPlayersBoards = ({ G, ctx, ...rest }, validatorName, playerID = null, data) => {
    const playersBoards = [];
    let moveMainArgs;
    if (validatorName !== null) {
        switch (validatorName) {
            case CommonMoveValidatorNames.PlaceThrudHeroMoveValidator:
            case SoloBotCommonMoveValidatorNames.SoloBotPlaceThrudHeroMoveValidator:
            case SoloBotAndvariCommonMoveValidatorNames.SoloBotAndvariPlaceThrudHeroMoveValidator:
            case PlaceYludMoveValidatorNames.PlaceYludHeroMoveValidator:
            case PlaceYludMoveValidatorNames.SoloBotPlaceYludHeroMoveValidator:
            case PlaceYludMoveValidatorNames.SoloBotAndvariPlaceYludHeroMoveValidator:
            case CommonMoveValidatorNames.PlaceMultiSuitCardMoveValidator:
            case EnlistmentMercenariesMoveValidatorNames.PlaceEnlistmentMercenariesMoveValidator:
            case EnlistmentMercenariesMoveValidatorNames.GetEnlistmentMercenariesMoveValidator:
            case GetMjollnirProfitMoveValidatorNames.GetMjollnirProfitMoveValidator:
            case TavernsResolutionMoveValidatorNames.ChooseSuitOlrunMoveValidator:
                moveMainArgs = [];
                break;
            case BrisingamensEndGameMoveValidatorNames.DiscardCardFromPlayerBoardMoveValidator:
            case CommonMoveValidatorNames.DiscardTopCardFromSuitMoveValidator:
                moveMainArgs = {};
                break;
            case CommonMoveValidatorNames.DiscardSuitCardFromPlayerBoardMoveValidator:
                if (playerID === null) {
                    throw new Error(`Отсутствует обязательный параметр '${playerID}'.`);
                }
                moveMainArgs = {
                    cards: [],
                };
                break;
            default:
                throw new Error(`Не существует валидатора '${validatorName}'.`);
        }
    }
    for (let p = 0; p < ctx.numPlayers; p++) {
        const playerID = String(p);
        AssertPlayerId(ctx, playerID);
        const playerRows = [], playerHeaders = [], playerHeadersCount = [], player = G.publicPlayers[playerID], stage = ctx.activePlayers?.[playerID];
        if (player === undefined) {
            return ThrowMyError({ G, ctx, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, p);
        }
        const stack = player.stack[0];
        let suitTop;
        // TODO Draw player has distinction card after troop evaluation!
        // TODO Draw Giant Capture token on suit if needed!
        for (suitTop in suitsConfig) {
            if (((G.mode === GameModeNames.Basic || G.mode === GameModeNames.Multiplayer))
                && playerID === ctx.currentPlayer
                && validatorName === BrisingamensEndGameMoveValidatorNames.DiscardCardFromPlayerBoardMoveValidator) {
                if (player.cards[suitTop].length) {
                    if (moveMainArgs === undefined || typeof moveMainArgs !== `object`
                        || Array.isArray(moveMainArgs) || `cards` in moveMainArgs) {
                        throw new Error(`Аргумент валидатора '${validatorName}' должен быть объектом с полем '${suitTop}'.`);
                    }
                    moveMainArgs[suitTop] = [];
                }
            }
            if ((G.mode === GameModeNames.Basic || G.mode === GameModeNames.Multiplayer)
                && playerID === ctx.currentPlayer && (ctx.phase === PhaseNames.GetMjollnirProfit
                || ctx.activePlayers?.[ctx.currentPlayer] === TavernsResolutionStageNames.ChooseSuitOlrun)) {
                if (data !== undefined) {
                    const phase = ctx.phase;
                    let moveName;
                    switch (phase) {
                        case PhaseNames.GetMjollnirProfit:
                            moveName = SuitMoveNames.GetMjollnirProfitMove;
                            break;
                        default:
                            if (ctx.activePlayers?.[ctx.currentPlayer]
                                === TavernsResolutionStageNames.ChooseSuitOlrun) {
                                moveName = SuitMoveNames.ChooseSuitOlrunMove;
                                break;
                            }
                            throw new Error(`Не может не быть доступного мува.`);
                    }
                    DrawSuit({ G, ctx, ...rest }, data, playerHeaders, suitTop, player, moveName, [suitTop]);
                }
                else if (validatorName === GetMjollnirProfitMoveValidatorNames.GetMjollnirProfitMoveValidator
                    || validatorName === TavernsResolutionMoveValidatorNames.ChooseSuitOlrunMoveValidator) {
                    if (!Array.isArray(moveMainArgs)) {
                        throw new Error(`Аргумент валидатора '${validatorName}' должен быть массивом`);
                    }
                    moveMainArgs.push(suitTop);
                }
                else {
                    return ThrowMyError({ G, ctx, ...rest }, ErrorNames.NoAddedValidator);
                }
            }
            else {
                if (data !== undefined) {
                    DrawSuit({ G, ctx, ...rest }, data, playerHeaders, suitTop, player);
                }
            }
            if (data !== undefined) {
                playerHeadersCount.push(_jsx("th", { className: `${suitsConfig[suitTop].suitColor} text-white`, children: _jsx("b", { children: player.cards[suitTop].reduce(TotalRank, 0) }) }, `${player.nickname} ${suitsConfig[suitTop].suitName} count`));
            }
        }
        if (data !== undefined) {
            for (let s = 0; s < 1 + Number(G.expansions.Thingvellir.active); s++) {
                if (s === 0) {
                    playerHeaders.push(_jsx("th", { className: "bg-gray-600", children: _jsx("span", { style: ALlStyles.HeroBack(), className: "bg-hero-icon" }) }, `${player.nickname} hero icon`));
                    playerHeadersCount.push(_jsx("th", { className: "bg-gray-600 text-white", children: _jsx("b", { children: player.heroes.length }) }, `${player.nickname} hero count`));
                }
                else if (G.mode === GameModeNames.Basic || G.mode === GameModeNames.Multiplayer) {
                    playerHeaders.push(_jsx("th", { className: "bg-yellow-200", children: _jsx("span", { style: ALlStyles.Camp(), className: "bg-camp-icon" }) }, `${player.nickname} camp icon`));
                    playerHeadersCount.push(_jsx("th", { className: "bg-yellow-200 text-white", children: _jsx("b", { children: player.campCards.length }) }, `${player.nickname} camp counts`));
                }
            }
        }
        for (let i = 0;; i++) {
            const playerCells = [];
            let isDrawRow = false, id = 0, j = 0, suit;
            for (suit in suitsConfig) {
                id = i + j;
                const card = player.cards[suit][i], last = player.cards[suit].length - 1;
                if (card !== undefined) {
                    isDrawRow = true;
                    if (playerID !== ctx.currentPlayer
                        && stage === CommonStageNames.DiscardSuitCardFromPlayerBoard
                        && suit === SuitNames.warrior && card.type !== CardRusNames.HeroPlayerCard) {
                        if (data !== undefined) {
                            DrawCard({ G, ctx, ...rest }, data, playerCells, card, id, suit, player, CardMoveNames.DiscardSuitCardFromPlayerBoardMove, [i]);
                        }
                        else if (validatorName ===
                            CommonMoveValidatorNames.DiscardSuitCardFromPlayerBoardMoveValidator) {
                            if (p === Number(playerID)) {
                                if (moveMainArgs !== undefined && `cards` in moveMainArgs) {
                                    moveMainArgs.cards.push(i);
                                }
                                else {
                                    throw new Error(`Аргумент валидатора '${validatorName}' должен быть объектом с полем 'cards'.`);
                                }
                            }
                        }
                        else {
                            return ThrowMyError({ G, ctx, ...rest }, ErrorNames.NoAddedValidator);
                        }
                    }
                    else if (playerID === ctx.currentPlayer && last === i
                        && stage === CommonStageNames.DiscardTopCardFromSuit
                        && card.type !== CardRusNames.HeroPlayerCard) {
                        // TODO Does it need more then 1 checking?
                        if (stack === undefined) {
                            return ThrowMyError({ G, ctx, ...rest }, ErrorNames.FirstStackActionForPlayerWithCurrentIdIsUndefined, p);
                        }
                        const stackSuit = stack.suit;
                        if (suit !== stackSuit && suit !== stack.pickedSuit) {
                            if (data !== undefined) {
                                DrawCard({ G, ctx, ...rest }, data, playerCells, card, id, suit, player, CardMoveNames.DiscardTopCardFromSuitMove, [suit, last]);
                            }
                            else if (validatorName === CommonMoveValidatorNames.DiscardTopCardFromSuitMoveValidator) {
                                if (moveMainArgs === undefined || typeof moveMainArgs !== `object`
                                    || Array.isArray(moveMainArgs) || `cards` in moveMainArgs) {
                                    throw new Error(`Аргумент валидатора '${validatorName}' должен быть объектом с полем '${suit}'.`);
                                }
                                moveMainArgs[suit] = [];
                                const moveMainArgsFoSuit = moveMainArgs[suit];
                                if (moveMainArgsFoSuit === undefined) {
                                    throw new Error(`Массив значений должен содержать фракцию '${suit}'.`);
                                }
                                moveMainArgsFoSuit.push(last);
                            }
                            else {
                                return ThrowMyError({ G, ctx, ...rest }, ErrorNames.NoAddedValidator);
                            }
                        }
                    }
                    else if (playerID === ctx.currentPlayer && ctx.phase === PhaseNames.BrisingamensEndGame
                        && card.type !== CardRusNames.HeroPlayerCard) {
                        if (data !== undefined) {
                            DrawCard({ G, ctx, ...rest }, data, playerCells, card, id, suit, player, CardMoveNames.DiscardCardFromPlayerBoardMove, [suit, i]);
                        }
                        else if (validatorName ===
                            BrisingamensEndGameMoveValidatorNames.DiscardCardFromPlayerBoardMoveValidator) {
                            if (moveMainArgs === undefined || typeof moveMainArgs !== `object`
                                || Array.isArray(moveMainArgs) || `cards` in moveMainArgs) {
                                throw new Error(`Аргумент валидатора '${validatorName}' должен быть объектом с полем '${suit}'.`);
                            }
                            const moveMainArgsFoSuit = moveMainArgs[suit];
                            if (moveMainArgsFoSuit === undefined) {
                                throw new Error(`Массив значений должен содержать фракцию '${suit}'.`);
                            }
                            moveMainArgsFoSuit.push(i);
                        }
                        else {
                            return ThrowMyError({ G, ctx, ...rest }, ErrorNames.NoAddedValidator);
                        }
                    }
                    else {
                        if (data !== undefined) {
                            DrawCard({ G, ctx, ...rest }, data, playerCells, card, id, suit, player);
                        }
                    }
                }
                else if (playerID === ctx.currentPlayer && (last + 1) === i
                    && ((((ctx.phase === PhaseNames.PlaceYlud && ctx.activePlayers === null)
                        || (ctx.phase === PhaseNames.EnlistmentMercenaries
                            && ctx.activePlayers?.[ctx.currentPlayer]
                                === EnlistmentMercenariesStageNames.PlaceEnlistmentMercenaries)))
                        || stage === CommonStageNames.PlaceMultiSuitCard
                        || stage === CommonStageNames.PlaceThrudHero
                        || stage === SoloBotCommonStageNames.SoloBotPlaceThrudHero
                        || stage === SoloBotAndvariCommonStageNames.SoloBotAndvariPlaceThrudHero)) {
                    if (stack === undefined) {
                        return ThrowMyError({ G, ctx, ...rest }, ErrorNames.FirstStackActionForPlayerWithCurrentIdIsUndefined, p);
                    }
                    let cardVariants;
                    if (ctx.phase === PhaseNames.EnlistmentMercenaries
                        && ctx.activePlayers?.[ctx.currentPlayer] ===
                            EnlistmentMercenariesStageNames.PlaceEnlistmentMercenaries) {
                        if (IsMercenaryCampCard(stack.card)) {
                            cardVariants = stack.card.variants[suit];
                            if (cardVariants !== undefined && cardVariants.suit !== suit) {
                                throw new Error(`У выбранной карты отсутствует обязательный параметр 'variants[suit]'.`);
                            }
                        }
                        else {
                            throw new Error(`Выбранная карта должна быть с типом '${CardRusNames.MercenaryCard}'.`);
                        }
                    }
                    if (data !== undefined) {
                        // TODO Draw heroes with more then one ranks no after the last card but when last rank of this hero card placed!?
                        // TODO Can Ylud be placed in old place because of "suit !== pickedCard.suit"? Thrud can be placed same suit in solo game!
                        let cardType, moveName;
                        if (((G.mode === GameModeNames.Solo
                            && ctx.currentPlayer === PlayerIdForSoloGameNames.SoloBotPlayerId)
                            || G.mode === GameModeNames.SoloAndvari
                            || ((G.mode === GameModeNames.Basic || G.mode === GameModeNames.Multiplayer)
                                && (stack.name !== MultiSuitCardNames.OlwinsDouble
                                    || (stack.name === MultiSuitCardNames.OlwinsDouble && suit !== stack.pickedSuit))))
                            || (cardVariants !== undefined && suit === cardVariants.suit)) {
                            let _exhaustiveCheck;
                            switch (stack.name) {
                                case HeroNames.Thrud:
                                    switch (G.mode) {
                                        case GameModeNames.Basic:
                                        case GameModeNames.Multiplayer:
                                            moveName = EmptyCardMoveNames.PlaceThrudHeroMove;
                                            break;
                                        case GameModeNames.Solo:
                                            if (ctx.currentPlayer === PlayerIdForSoloGameNames.HumanPlayerId) {
                                                moveName = EmptyCardMoveNames.PlaceThrudHeroMove;
                                            }
                                            else if (ctx.currentPlayer === PlayerIdForSoloGameNames.SoloBotPlayerId) {
                                                moveName = EmptyCardMoveNames.SoloBotPlaceThrudHeroMove;
                                            }
                                            else {
                                                return ThrowMyError({ G, ctx, ...rest }, ErrorNames.CanNotBeMoreThenTwoPlayersInSoloGameMode);
                                            }
                                            break;
                                        case GameModeNames.SoloAndvari:
                                            if (ctx.currentPlayer === PlayerIdForSoloGameNames.HumanPlayerId) {
                                                moveName = EmptyCardMoveNames.PlaceThrudHeroMove;
                                            }
                                            else if (p === 1
                                                && ctx.currentPlayer === PlayerIdForSoloGameNames.SoloBotPlayerId) {
                                                moveName = EmptyCardMoveNames.SoloBotAndvariPlaceThrudHeroMove;
                                            }
                                            else {
                                                return ThrowMyError({ G, ctx, ...rest }, ErrorNames.CanNotBeMoreThenTwoPlayersInSoloGameMode);
                                            }
                                            break;
                                        default:
                                            _exhaustiveCheck = G.mode;
                                            return ThrowMyError({ G, ctx, ...rest }, ErrorNames.NoSuchGameMode);
                                            return _exhaustiveCheck;
                                    }
                                    cardType = CardRusNames.HeroPlayerCard;
                                    break;
                                case HeroNames.Ylud:
                                    switch (G.mode) {
                                        case GameModeNames.Basic:
                                        case GameModeNames.Multiplayer:
                                            moveName = EmptyCardMoveNames.PlaceYludHeroMove;
                                            break;
                                        case GameModeNames.Solo:
                                            if (ctx.currentPlayer === PlayerIdForSoloGameNames.HumanPlayerId) {
                                                moveName = EmptyCardMoveNames.PlaceYludHeroMove;
                                            }
                                            else if (ctx.currentPlayer === PlayerIdForSoloGameNames.SoloBotPlayerId) {
                                                moveName = EmptyCardMoveNames.SoloBotPlaceYludHeroMove;
                                            }
                                            else {
                                                return ThrowMyError({ G, ctx, ...rest }, ErrorNames.CanNotBeMoreThenTwoPlayersInSoloGameMode);
                                            }
                                            break;
                                        case GameModeNames.SoloAndvari:
                                            if (ctx.currentPlayer === PlayerIdForSoloGameNames.HumanPlayerId) {
                                                moveName = EmptyCardMoveNames.PlaceYludHeroMove;
                                            }
                                            else if (p === 1
                                                && ctx.currentPlayer === PlayerIdForSoloGameNames.SoloBotPlayerId) {
                                                moveName = EmptyCardMoveNames.SoloBotAndvariPlaceYludHeroMove;
                                            }
                                            else {
                                                return ThrowMyError({ G, ctx, ...rest }, ErrorNames.CanNotBeMoreThenTwoPlayersInSoloGameMode);
                                            }
                                            break;
                                        default:
                                            _exhaustiveCheck = G.mode;
                                            return ThrowMyError({ G, ctx, ...rest }, ErrorNames.NoSuchGameMode);
                                            return _exhaustiveCheck;
                                    }
                                    cardType = CardRusNames.HeroPlayerCard;
                                    break;
                                case MultiSuitCardNames.OlwinsDouble:
                                case MultiSuitCardNames.Gullinbursti:
                                    cardType = CardRusNames.MultiSuitPlayerCard;
                                    moveName = EmptyCardMoveNames.PlaceMultiSuitCardMove;
                                    break;
                                default:
                                    if (ctx.activePlayers?.[ctx.currentPlayer] ===
                                        EnlistmentMercenariesStageNames.PlaceEnlistmentMercenaries
                                        && ctx.currentPlayer === playerID) {
                                        cardType = CardRusNames.MercenaryPlayerCard;
                                        moveName = EmptyCardMoveNames.PlaceEnlistmentMercenariesMove;
                                        break;
                                    }
                                    return ThrowMyError({ G, ctx, ...rest }, ErrorNames.NoSuchMove);
                            }
                            isDrawRow = true;
                            DrawEmptyCard({ G, ctx, ...rest }, data, playerCells, cardType, id, suit, player, moveName, [suit]);
                        }
                        else {
                            DrawEmptyCard({ G, ctx, ...rest }, data, playerCells, CardRusNames.PlayerBoardCard, id, suit, player);
                        }
                    }
                    else if (validatorName === CommonMoveValidatorNames.PlaceThrudHeroMoveValidator
                        || validatorName === SoloBotCommonMoveValidatorNames.SoloBotPlaceThrudHeroMoveValidator
                        || validatorName ===
                            SoloBotAndvariCommonMoveValidatorNames.SoloBotAndvariPlaceThrudHeroMoveValidator
                        || validatorName ===
                            PlaceYludMoveValidatorNames.PlaceYludHeroMoveValidator
                        || validatorName === PlaceYludMoveValidatorNames.SoloBotPlaceYludHeroMoveValidator
                        || validatorName === PlaceYludMoveValidatorNames.SoloBotAndvariPlaceYludHeroMoveValidator
                        || validatorName === CommonMoveValidatorNames.PlaceMultiSuitCardMoveValidator
                        || validatorName ===
                            EnlistmentMercenariesMoveValidatorNames.PlaceEnlistmentMercenariesMoveValidator) {
                        if (!(validatorName ===
                            EnlistmentMercenariesMoveValidatorNames.PlaceEnlistmentMercenariesMoveValidator
                            && ((cardVariants !== undefined && suit !== cardVariants.suit)
                                || (cardVariants === undefined)))) {
                            moveMainArgs.push(suit);
                        }
                    }
                    else {
                        return ThrowMyError({ G, ctx, ...rest }, ErrorNames.NoAddedValidator);
                    }
                }
                else {
                    if (data !== undefined) {
                        DrawEmptyCard({ G, ctx, ...rest }, data, playerCells, CardRusNames.PlayerBoardCard, id, suit, player);
                    }
                }
                j++;
            }
            for (let k = 0; k < 1; k++) {
                id += k + 1;
                const playerCards = Object.values(player.cards).flat(), hero = player.heroes[i];
                // TODO Draw heroes from the beginning if player has suit heroes (or draw them with opacity)
                // TODO How draw and count no counting Hero from Thrivaldi!?
                if (hero !== undefined && !hero.playerSuit && !((hero.name === HeroNames.Ylud
                    && playerCards.findIndex((card) => card.name === HeroNames.Ylud) !== -1) || (hero.name === HeroNames.Thrud
                    && playerCards.findIndex((card) => card.name === HeroNames.Thrud) !== -1))) {
                    isDrawRow = true;
                    if (data !== undefined) {
                        DrawCard({ G, ctx, ...rest }, data, playerCells, hero, id, null, player);
                    }
                }
                else {
                    if (data !== undefined) {
                        DrawEmptyCard({ G, ctx, ...rest }, data, playerCells, CardRusNames.CommandZoneHeroCard, id, null, player);
                    }
                }
            }
            if (G.mode === GameModeNames.Basic || G.mode === GameModeNames.Multiplayer) {
                for (let t = 0; t < 0 + Number(G.expansions.Thingvellir.active); t++) {
                    id += t + 1;
                    const campCard = player.campCards[i];
                    if (campCard !== undefined) {
                        isDrawRow = true;
                        if (IsMercenaryCampCard(campCard)
                            && ctx.phase === PhaseNames.EnlistmentMercenaries
                            && ctx.activePlayers === null && ctx.currentPlayer === playerID) {
                            if (data !== undefined) {
                                DrawCard({ G, ctx, ...rest }, data, playerCells, campCard, id, null, player, CardMoveNames.GetEnlistmentMercenariesMove, [i]);
                            }
                            else if (validatorName ===
                                EnlistmentMercenariesMoveValidatorNames.GetEnlistmentMercenariesMoveValidator) {
                                if (!Array.isArray(moveMainArgs)) {
                                    throw new Error(`Аргумент валидатора '${validatorName}' должен быть массивом.`);
                                }
                                moveMainArgs.push(i);
                            }
                            else {
                                return ThrowMyError({ G, ctx, ...rest }, ErrorNames.NoAddedValidator);
                            }
                        }
                        else {
                            if (data !== undefined) {
                                DrawCard({ G, ctx, ...rest }, data, playerCells, campCard, id, null, player);
                            }
                        }
                    }
                    else {
                        if (data !== undefined) {
                            DrawEmptyCard({ G, ctx, ...rest }, data, playerCells, CardRusNames.CommandZoneCampCard, id, null, player);
                        }
                    }
                }
                for (let m = 0; m < 0 + Number(G.expansions.Idavoll.active); m++) {
                    id += m + 1;
                    const mythologicalCreatureCommandZoneCard = player.mythologicalCreatureCards[i];
                    if (mythologicalCreatureCommandZoneCard !== undefined) {
                        isDrawRow = true;
                        if (data !== undefined) {
                            DrawCard({ G, ctx, ...rest }, data, playerCells, mythologicalCreatureCommandZoneCard, id, null, player);
                        }
                    }
                    else {
                        if (data !== undefined) {
                            DrawEmptyCard({ G, ctx, ...rest }, data, playerCells, CardRusNames.CommandZoneMythologicalCreatureCard, id, null, player);
                        }
                    }
                }
            }
            if (isDrawRow) {
                if (data !== undefined) {
                    playerRows.push(_jsx("tr", { children: playerCells }, `${player.nickname} board row ${i}`));
                }
            }
            else {
                break;
            }
        }
        if (data !== undefined) {
            let scoreText = ``;
            if (G.winner) {
                if (G.totalScore === null) {
                    throw new Error(`В массиве итоговых очков игроков должны быть значения.`);
                }
                const finalTotalScore = G.totalScore[p];
                if (finalTotalScore === undefined) {
                    throw new Error(`В массиве итоговых очков игроков должно быть значение игрока с id ${p}.`);
                }
                scoreText = `Final: ${finalTotalScore}`;
            }
            else {
                scoreText = `${AllCurrentScoring({ G, ctx, ...rest }, playerID)}`;
            }
            playersBoards.push(_jsxs("table", { className: "mx-auto", children: [
                    _jsxs("caption", { children: ["Player ", p + 1, " (", player.nickname, ") cards, ", scoreText, " points"] }), _jsxs("thead", { children: [
                            _jsx("tr", { children: playerHeaders }), _jsx("tr", { children: playerHeadersCount })
                        ] }), _jsx("tbody", { children: playerRows })
                ] }, `${player.nickname} board`));
        }
    }
    if (data !== undefined) {
        return playersBoards;
    }
    else if (validatorName !== null && moveMainArgs !== undefined) {
        return moveMainArgs;
    }
    return ThrowMyError({ G, ctx, ...rest }, ErrorNames.FunctionMustHaveReturnValue);
};
// TODO Check all solo bot coins opened during Troop Evaluation phase to upgrade coin!
/**
 * <h3>Отрисовка планшета монет, выложенных игроком на стол.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка игрового поля.</li>
 * </ol>
 *
 * @param context
 * @param validatorName Название валидатора.
 * @param data Глобальные параметры.
 * @returns Игровые поля для пользовательских монет на столе | данные для списка доступных аргументов мува.
 */
export const DrawPlayersBoardsCoins = ({ G, ctx, ...rest }, validatorName, data) => {
    const playersBoardsCoins = [], moveMainArgs = [];
    let moveName;
    for (let p = 0; p < ctx.numPlayers; p++) {
        const playerID = String(p);
        AssertPlayerId(ctx, playerID);
        const stage = ctx.activePlayers?.[playerID];
        switch (ctx.phase) {
            case PhaseNames.Bids:
                moveName = CoinMoveNames.ClickBoardCoinMove;
                break;
            default:
                if (stage === CommonStageNames.ClickCoinToUpgrade
                    || stage === SoloBotCommonCoinUpgradeStageNames.SoloBotClickCoinToUpgrade
                    || stage === SoloBotAndvariCommonStageNames.SoloBotAndvariClickCoinToUpgrade) {
                    let _exhaustiveCheck;
                    switch (G.mode) {
                        case GameModeNames.Basic:
                        case GameModeNames.Multiplayer:
                            moveName = CoinMoveNames.ClickCoinToUpgradeMove;
                            break;
                        case GameModeNames.Solo:
                            if (ctx.currentPlayer === PlayerIdForSoloGameNames.HumanPlayerId) {
                                moveName = CoinMoveNames.ClickCoinToUpgradeMove;
                            }
                            else if (ctx.currentPlayer === PlayerIdForSoloGameNames.SoloBotPlayerId) {
                                moveName = CoinMoveNames.SoloBotClickCoinToUpgradeMove;
                            }
                            else {
                                return ThrowMyError({ G, ctx, ...rest }, ErrorNames.CanNotBeMoreThenTwoPlayersInSoloGameMode);
                            }
                            break;
                        case GameModeNames.SoloAndvari:
                            if (ctx.currentPlayer === PlayerIdForSoloGameNames.HumanPlayerId) {
                                moveName = CoinMoveNames.ClickCoinToUpgradeMove;
                            }
                            else if (p === 1 && ctx.currentPlayer === PlayerIdForSoloGameNames.SoloBotPlayerId) {
                                moveName = CoinMoveNames.SoloBotAndvariClickCoinToUpgradeMove;
                            }
                            else {
                                return ThrowMyError({ G, ctx, ...rest }, ErrorNames.CanNotBeMoreThenTwoPlayersInSoloGameMode);
                            }
                            break;
                        default:
                            _exhaustiveCheck = G.mode;
                            return ThrowMyError({ G, ctx, ...rest }, ErrorNames.NoSuchGameMode);
                            return _exhaustiveCheck;
                    }
                }
                else if (stage === CommonStageNames.PickConcreteCoinToUpgrade) {
                    moveName = CoinMoveNames.PickConcreteCoinToUpgradeMove;
                }
                else if (stage === CommonStageNames.UpgradeCoinVidofnirVedrfolnir) {
                    moveName = CoinMoveNames.UpgradeCoinVidofnirVedrfolnirMove;
                }
                break;
        }
        const player = G.publicPlayers[playerID], privatePlayer = G.players[playerID];
        if (player === undefined) {
            return ThrowMyError({ G, ctx, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, p);
        }
        const playerRows = [], playerHeaders = [], playerFooters = [];
        for (let i = 0; i < 2; i++) {
            const playerCells = [];
            for (let t = 0; t < G.tavernsNum; t++) {
                AssertTavernIndex(t);
                if (data !== undefined) {
                    if (i === 0) {
                        playerHeaders.push(_jsx("th", { children: _jsx("span", { style: ALlStyles.Tavern(t), className: "bg-tavern-icon" }) }, `${player.nickname} tavern ${tavernsConfig[t].name} coin`));
                    }
                    else {
                        if (t === G.tavernsNum - 1) {
                            playerFooters.push(_jsx("th", { children: _jsx("span", { style: ALlStyles.Priority(), className: "bg-priority-icon" }) }, `${player.nickname} priority icon`));
                            playerCells.push(_jsx("td", { className: "bg-gray-300", children: _jsx("span", { style: player.priority.value > 0 ?
                                        ALlStyles.Priorities(player.priority.value) : undefined, className: "bg-priority" }) }, `${player.nickname} priority gem`));
                        }
                        else {
                            if (data !== undefined) {
                                playerFooters.push(_jsx("th", { children: _jsx("span", { style: ALlStyles.Exchange(), className: "bg-small-market-coin" }) }, `${player.nickname} exchange icon ${t}`));
                            }
                        }
                    }
                }
                if (i === 0 || (i === 1 && t !== G.tavernsNum - 1)) {
                    const id = (t + G.tavernsNum * i);
                    AssertPlayerCoinId(id);
                    const publicBoardCoin = player.boardCoins[id], privateBoardCoin = privatePlayer?.boardCoins[id];
                    if (publicBoardCoin !== null) {
                        if (ctx.phase === PhaseNames.Bids && ctx.currentPlayer === playerID
                            && ((G.mode === GameModeNames.Multiplayer && privateBoardCoin !== undefined)
                                || (G.mode === GameModeNames.Basic && publicBoardCoin !== undefined))) {
                            if (data !== undefined) {
                                if (G.mode === GameModeNames.Multiplayer && privateBoardCoin === undefined) {
                                    throw new Error(`Монета с id '${id}' на столе текущего приватного игрока не может отсутствовать.`);
                                }
                                // TODO Add errors!
                                if (G.mode === GameModeNames.Basic && !IsCoin(publicBoardCoin)
                                    || (G.mode === GameModeNames.Multiplayer && privateBoardCoin !== undefined
                                        && !IsCoin(privateBoardCoin))) {
                                    throw new Error(`Монета с id '${id}' на столе текущего игрока не может быть закрытой для него.`);
                                }
                                DrawCoin({ G, ctx, ...rest }, data, playerCells, DrawCoinNames.Coin, privateBoardCoin ?? publicBoardCoin, id, player, null, null, moveName, [id]);
                            }
                            else if (validatorName === BidsMoveValidatorNames.ClickBoardCoinMoveValidator) {
                                moveMainArgs.push(id);
                            }
                            else {
                                return ThrowMyError({ G, ctx, ...rest }, ErrorNames.NoAddedValidator);
                            }
                        }
                        else if (ctx.currentPlayer === playerID && IsCoin(publicBoardCoin)
                            && !IsTriggerTradingCoin(publicBoardCoin)
                            && ((stage === CommonStageNames.ClickCoinToUpgrade
                                || stage === SoloBotCommonCoinUpgradeStageNames.SoloBotClickCoinToUpgrade
                                || stage === SoloBotAndvariCommonStageNames.SoloBotAndvariClickCoinToUpgrade)
                                || (stage === CommonStageNames.PickConcreteCoinToUpgrade
                                    && player.stack[0]?.coinValue === publicBoardCoin.value)
                                || (stage === CommonStageNames.UpgradeCoinVidofnirVedrfolnir
                                    && player.stack[0]?.coinId !== id && id >= G.tavernsNum))) {
                            if (data !== undefined) {
                                if (G.mode === GameModeNames.Multiplayer && !publicBoardCoin.isOpened) {
                                    throw new Error(`В массиве монет игрока на столе не может быть закрыта ранее открытая монета с id '${id}'.`);
                                }
                                DrawCoin({ G, ctx, ...rest }, data, playerCells, DrawCoinNames.Coin, publicBoardCoin, id, player, CoinCssClassNames.BorderedCoin, null, moveName, [id, CoinNames.Board]);
                            }
                            else if (validatorName === CommonMoveValidatorNames.ClickCoinToUpgradeMoveValidator
                                || validatorName ===
                                    SoloBotCommonCoinUpgradeMoveValidatorNames.SoloBotClickCoinToUpgradeMoveValidator
                                || validatorName ===
                                    SoloBotAndvariCommonMoveValidatorNames.SoloBotAndvariClickCoinToUpgradeMoveValidator
                                || validatorName === CommonMoveValidatorNames.PickConcreteCoinToUpgradeMoveValidator
                                || validatorName ===
                                    CommonMoveValidatorNames.UpgradeCoinVidofnirVedrfolnirMoveValidator) {
                                // TODO Is it may be sometimes AssertPlayerPouchCoinId and must i differentiate it!?
                                moveMainArgs.push({
                                    coinId: id,
                                    type: CoinNames.Board,
                                });
                            }
                            else {
                                return ThrowMyError({ G, ctx, ...rest }, ErrorNames.NoAddedValidator);
                            }
                        }
                        else {
                            if (G.winner || ((G.mode === GameModeNames.Solo)
                                || (G.mode === GameModeNames.SoloAndvari) && p === 0)
                                || (ctx.phase !== PhaseNames.Bids && i === 0 && G.currentTavern >= t)) {
                                if (data !== undefined) {
                                    if (!IsCoin(publicBoardCoin)) {
                                        throw new Error(`Монета с id '${id}' на столе текущего игрока не может быть закрытой для него.`);
                                    }
                                    if (!publicBoardCoin.isOpened) {
                                        throw new Error(`В массиве монет игрока на столе не может быть закрыта для других игроков ранее открытая монета с id '${id}'.`);
                                    }
                                    DrawCoin({ G, ctx, ...rest }, data, playerCells, DrawCoinNames.Coin, publicBoardCoin, id, player);
                                }
                            }
                            else {
                                if (G.mode === GameModeNames.Multiplayer && privateBoardCoin !== undefined) {
                                    if (IsCoin(publicBoardCoin)) {
                                        if (!publicBoardCoin.isOpened) {
                                            throw new Error(`В массиве монет игрока на столе не может быть закрыта для других игроков ранее открытая монета с id '${id}'.`);
                                        }
                                        if (data !== undefined) {
                                            if (ctx.phase !== PhaseNames.Bids && i === 0 && G.currentTavern < t) {
                                                DrawCoin({ G, ctx, ...rest }, data, playerCells, DrawCoinNames.Coin, publicBoardCoin, id, player);
                                            }
                                            else {
                                                DrawCoin({ G, ctx, ...rest }, data, playerCells, DrawCoinNames.HiddenCoin, publicBoardCoin, id, player, CoinCssClassNames.SmallCoinBG);
                                            }
                                        }
                                    }
                                    else {
                                        if (ctx.currentPlayer === playerID && IsCoin(privateBoardCoin)
                                            && !!IsTriggerTradingCoin(privateBoardCoin)
                                            && ((stage === CommonStageNames.ClickCoinToUpgrade)
                                                || (stage === CommonStageNames.PickConcreteCoinToUpgrade
                                                    && player.stack[0]?.coinValue === privateBoardCoin.value))) {
                                            if (data !== undefined) {
                                                DrawCoin({ G, ctx, ...rest }, data, playerCells, DrawCoinNames.HiddenCoin, privateBoardCoin, id, player, CoinCssClassNames.SmallCoinBG, null, moveName, [id, CoinNames.Board]);
                                            }
                                            else if (validatorName ===
                                                CommonMoveValidatorNames.ClickCoinToUpgradeMoveValidator
                                                || validatorName ===
                                                    CommonMoveValidatorNames.PickConcreteCoinToUpgradeMoveValidator) {
                                                moveMainArgs
                                                    .push({
                                                    coinId: id,
                                                    type: CoinNames.Board,
                                                });
                                            }
                                            else {
                                                return ThrowMyError({ G, ctx, ...rest }, ErrorNames.NoAddedValidator);
                                            }
                                        }
                                        else {
                                            if (data !== undefined) {
                                                if (!IsCoin(privateBoardCoin)) {
                                                    throw new Error(`Монета с id '${id}' на столе текущего приватного игрока не может отсутствовать.`);
                                                }
                                                DrawCoin({ G, ctx, ...rest }, data, playerCells, DrawCoinNames.HiddenCoin, privateBoardCoin, id, player, CoinCssClassNames.SmallCoinBG);
                                            }
                                        }
                                    }
                                }
                                else {
                                    if (data !== undefined) {
                                        if (!IsCoin(publicBoardCoin) || !publicBoardCoin.isOpened) {
                                            DrawCoin({ G, ctx, ...rest }, data, playerCells, DrawCoinNames.Back, publicBoardCoin, id, player);
                                        }
                                        else if (publicBoardCoin.isOpened) {
                                            DrawCoin({ G, ctx, ...rest }, data, playerCells, DrawCoinNames.HiddenCoin, publicBoardCoin, id, player, CoinCssClassNames.SmallCoinBG);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else {
                        if (ctx.phase === PhaseNames.Bids && player.selectedCoin !== null
                            && ((G.mode === GameModeNames.Basic && (ctx.currentPlayer === playerID))
                                || (G.mode === GameModeNames.Multiplayer
                                    && (ctx.currentPlayer === playerID))
                                || ((G.mode === GameModeNames.Solo || G.mode === GameModeNames.SoloAndvari)
                                    && ctx.currentPlayer === PlayerIdForSoloGameNames.HumanPlayerId))) {
                            if (data !== undefined) {
                                if (i === 0) {
                                    DrawCoin({ G, ctx, ...rest }, data, playerCells, DrawCoinNames.BackTavernIcon, publicBoardCoin, id, player, null, id, moveName, [id]);
                                }
                                else {
                                    DrawCoin({ G, ctx, ...rest }, data, playerCells, DrawCoinNames.BackSmallMarketCoin, publicBoardCoin, id, player, null, null, moveName, [id]);
                                }
                            }
                            else if (validatorName === BidsMoveValidatorNames.ClickBoardCoinMoveValidator) {
                                moveMainArgs.push(id);
                            }
                            else {
                                return ThrowMyError({ G, ctx, ...rest }, ErrorNames.NoAddedValidator);
                            }
                        }
                        else {
                            if (data !== undefined) {
                                if (i === 0) {
                                    DrawCoin({ G, ctx, ...rest }, data, playerCells, DrawCoinNames.BackTavernIcon, publicBoardCoin, id, player, null, id);
                                }
                                else {
                                    DrawCoin({ G, ctx, ...rest }, data, playerCells, DrawCoinNames.BackSmallMarketCoin, publicBoardCoin, id, player);
                                }
                            }
                        }
                    }
                }
            }
            if (data !== undefined) {
                playerRows.push(_jsx("tr", { children: playerCells }, `${player.nickname} board coins row ${i}`));
            }
        }
        if (data !== undefined) {
            playersBoardsCoins.push(_jsxs("table", { className: "mx-auto", children: [
                    _jsxs("caption", { children: ["Player ", p + 1, " (", player.nickname, ") played coins"] }), _jsx("thead", { children: _jsx("tr", { children: playerHeaders }) }), _jsx("tbody", { children: playerRows }), _jsx("tfoot", { children: _jsx("tr", { children: playerFooters }) })
                ] }, `${player.nickname} board coins`));
        }
    }
    if (data !== undefined) {
        return playersBoardsCoins;
    }
    else if (validatorName !== null) {
        return moveMainArgs;
    }
    return ThrowMyError({ G, ctx, ...rest }, ErrorNames.FunctionMustHaveReturnValue);
};
/**
 * <h3>Отрисовка планшета монет, находящихся в руках игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка игрового поля.</li>
 * </ol>
 *
 * @param context
 * @param validatorName Название валидатора.
 * @param data Глобальные параметры.
 * @returns Игровые поля для пользовательских монет в руке.
 */
export const DrawPlayersHandsCoins = ({ G, ctx, ...rest }, validatorName, data) => {
    const playersHandsCoins = [], moveMainArgs = [];
    if (validatorName === BidsMoveValidatorNames.SoloBotPlaceAllCoinsMoveValidator
        || validatorName === BidsMoveValidatorNames.SoloBotAndvariPlaceAllCoinsMoveValidator) {
        moveMainArgs[0] = [];
    }
    let moveName;
    for (let p = 0; p < ctx.numPlayers; p++) {
        const playerID = String(p);
        AssertPlayerId(ctx, playerID);
        const stage = ctx.activePlayers?.[playerID];
        switch (ctx.phase) {
            case PhaseNames.Bids:
                moveName = CoinMoveNames.ClickHandCoinMove;
                break;
            case PhaseNames.BidUline:
                moveName = CoinMoveNames.ClickHandCoinUlineMove;
                break;
            default:
                if (stage === CommonStageNames.ClickCoinToUpgrade
                    || stage === SoloBotCommonCoinUpgradeStageNames.SoloBotClickCoinToUpgrade) {
                    let _exhaustiveCheck;
                    switch (G.mode) {
                        case GameModeNames.Basic:
                        case GameModeNames.Multiplayer:
                            moveName = CoinMoveNames.ClickCoinToUpgradeMove;
                            break;
                        case GameModeNames.Solo:
                            if (ctx.currentPlayer === PlayerIdForSoloGameNames.HumanPlayerId) {
                                moveName = CoinMoveNames.ClickCoinToUpgradeMove;
                            }
                            else if (ctx.currentPlayer === PlayerIdForSoloGameNames.SoloBotPlayerId) {
                                moveName = CoinMoveNames.SoloBotClickCoinToUpgradeMove;
                            }
                            else {
                                return ThrowMyError({ G, ctx, ...rest }, ErrorNames.CanNotBeMoreThenTwoPlayersInSoloGameMode);
                            }
                            break;
                        case GameModeNames.SoloAndvari:
                            if (ctx.currentPlayer === PlayerIdForSoloGameNames.HumanPlayerId) {
                                moveName = CoinMoveNames.ClickCoinToUpgradeMove;
                            }
                            break;
                        default:
                            _exhaustiveCheck = G.mode;
                            return ThrowMyError({ G, ctx, ...rest }, ErrorNames.NoSuchGameMode);
                            return _exhaustiveCheck;
                    }
                }
                else if (stage === TavernsResolutionStageNames.ClickHandTradingCoinUline) {
                    moveName = CoinMoveNames.ClickHandTradingCoinUlineMove;
                }
                else if (stage === CommonStageNames.PickConcreteCoinToUpgrade) {
                    moveName = CoinMoveNames.PickConcreteCoinToUpgradeMove;
                }
                else if (stage === CommonStageNames.AddCoinToPouch) {
                    moveName = CoinMoveNames.AddCoinToPouchMove;
                }
                break;
        }
        const player = G.publicPlayers[playerID], privatePlayer = G.players[playerID], playerCells = [];
        if (player === undefined) {
            return ThrowMyError({ G, ctx, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, p);
        }
        for (let i = 0; i < 1; i++) {
            for (let j = 0; j < 5; j++) {
                AssertPlayerCoinId(j);
                const publicHandCoin = player.handCoins[j], privateHandCoin = privatePlayer?.handCoins[j];
                if ((G.mode === GameModeNames.Multiplayer && privateHandCoin !== undefined
                    && IsCoin(privateHandCoin))
                    || (((G.mode === GameModeNames.Basic && ctx.currentPlayer === playerID)
                        || ((G.mode === GameModeNames.Solo || G.mode === GameModeNames.SoloAndvari)
                            && (p === 0 || ctx.phase === PhaseNames.ChooseDifficultySoloMode)))
                        && IsCoin(publicHandCoin))) {
                    let coinClasses = CoinCssClassNames.BorderedCoin;
                    if (player.selectedCoin === j) {
                        coinClasses = CoinCssClassNames.BorderedCoinPicked;
                    }
                    const handCoin = privateHandCoin ?? publicHandCoin;
                    if (!IsCoin(handCoin)) {
                        throw new Error(`В массиве монет игрока в руке должна быть открыта монета с id '${j}'.`);
                    }
                    if (ctx.currentPlayer === playerID
                        && (ctx.phase === PhaseNames.Bids || ctx.phase === PhaseNames.BidUline
                            || (stage === TavernsResolutionStageNames.ClickHandTradingCoinUline)
                            || ((G.mode === GameModeNames.Basic || G.mode === GameModeNames.Multiplayer)
                                && stage === CommonStageNames.AddCoinToPouch && CheckPlayerHasBuff({ G, ctx, ...rest }, playerID, HeroBuffNames.EveryTurn)))) {
                        if (data !== undefined) {
                            DrawCoin({ G, ctx, ...rest }, data, playerCells, DrawCoinNames.Coin, handCoin, j, player, coinClasses, null, moveName, [j]);
                        }
                        else if (validatorName === BidsMoveValidatorNames.ClickHandCoinMoveValidator
                            || validatorName === BidUlineMoveValidatorNames.ClickHandCoinUlineMoveValidator
                            || validatorName ===
                                TavernsResolutionMoveValidatorNames.ClickHandTradingCoinUlineMoveValidator
                            || validatorName === CommonMoveValidatorNames.AddCoinToPouchMoveValidator) {
                            moveMainArgs.push(j);
                        }
                        else {
                            return ThrowMyError({ G, ctx, ...rest }, ErrorNames.NoAddedValidator);
                        }
                    }
                    else if ((((G.mode === GameModeNames.Basic || G.mode === GameModeNames.Multiplayer)
                        && ctx.currentPlayer === playerID
                        && CheckPlayerHasBuff({ G, ctx, ...rest }, playerID, HeroBuffNames.EveryTurn))
                        || ((G.mode === GameModeNames.Solo || G.mode === GameModeNames.SoloAndvari)
                            && ctx.currentPlayer === playerID
                            && ctx.currentPlayer === PlayerIdForSoloGameNames.SoloBotPlayerId
                            && ctx.phase === PhaseNames.ChooseDifficultySoloMode))
                        && (stage === CommonStageNames.ClickCoinToUpgrade
                            || stage === SoloBotCommonCoinUpgradeStageNames.SoloBotClickCoinToUpgrade
                            || (stage === CommonStageNames.PickConcreteCoinToUpgrade
                                && player.stack[0]?.coinValue === handCoin.value))) {
                        if (data !== undefined) {
                            DrawCoin({ G, ctx, ...rest }, data, playerCells, DrawCoinNames.Coin, handCoin, j, player, coinClasses, null, moveName, [j, CoinNames.Hand]);
                        }
                        else if (validatorName === CommonMoveValidatorNames.ClickCoinToUpgradeMoveValidator
                            || validatorName ===
                                SoloBotCommonCoinUpgradeMoveValidatorNames.SoloBotClickCoinToUpgradeMoveValidator
                            || validatorName === CommonMoveValidatorNames.PickConcreteCoinToUpgradeMoveValidator) {
                            moveMainArgs.push({
                                coinId: j,
                                type: CoinNames.Hand,
                            });
                        }
                        else {
                            return ThrowMyError({ G, ctx, ...rest }, ErrorNames.NoAddedValidator);
                        }
                    }
                    else {
                        if (data !== undefined) {
                            DrawCoin({ G, ctx, ...rest }, data, playerCells, DrawCoinNames.Coin, handCoin, j, player, coinClasses);
                        }
                    }
                }
                else if (((G.mode === GameModeNames.Basic || G.mode === GameModeNames.Solo
                    || G.mode === GameModeNames.SoloAndvari)
                    || (G.mode === GameModeNames.Multiplayer && privateHandCoin === undefined))
                    && IsCoin(publicHandCoin) && publicHandCoin.isOpened) {
                    if (data !== undefined) {
                        DrawCoin({ G, ctx, ...rest }, data, playerCells, DrawCoinNames.HiddenCoin, publicHandCoin, j, player, CoinCssClassNames.SmallCoinBG);
                    }
                }
                else {
                    // TODO Add Throw errors to all UI files
                    if (G.mode === GameModeNames.Basic && IsCoin(publicHandCoin) && !publicHandCoin.isOpened) {
                        if (data !== undefined) {
                            const handCoin = privateHandCoin ?? publicHandCoin;
                            if (!IsCoin(handCoin)) {
                                throw new Error(`В массиве монет игрока в руке должна быть открыта для текущего игрока с id '${p}' монета с id '${j}'.`);
                            }
                            DrawCoin({ G, ctx, ...rest }, data, playerCells, DrawCoinNames.Back, handCoin, j, player);
                        }
                    }
                    else if ((G.mode === GameModeNames.Solo || G.mode === GameModeNames.SoloAndvari)
                        && p === 1 && !IsCoin(publicHandCoin) && publicHandCoin !== null) {
                        if (data !== undefined) {
                            DrawCoin({ G, ctx, ...rest }, data, playerCells, DrawCoinNames.Back, publicHandCoin, j, player);
                        }
                        else if (validatorName === BidsMoveValidatorNames.SoloBotPlaceAllCoinsMoveValidator
                            || validatorName === BidsMoveValidatorNames.SoloBotAndvariPlaceAllCoinsMoveValidator) {
                            const moveMainArg = moveMainArgs[0];
                            if (moveMainArg === undefined) {
                                throw new Error(`В массиве аргументов мува отсутствует значение аргумента с id '0'.`);
                            }
                            moveMainArg.push(j);
                        }
                        else {
                            return ThrowMyError({ G, ctx, ...rest }, ErrorNames.NoAddedValidator);
                        }
                    }
                    else if (G.mode === GameModeNames.Multiplayer && privateHandCoin === undefined) {
                        if (data !== undefined) {
                            DrawCoin({ G, ctx, ...rest }, data, playerCells, DrawCoinNames.Back, null, j, player);
                        }
                    }
                    else {
                        if (data !== undefined) {
                            // TODO Move empty coin to the DrawCoin or add DrawEmptyCoin?!
                            playerCells.push(_jsx("td", { className: "bg-yellow-300", children: _jsx("span", { className: "bg-coin bg-yellow-300 border-2" }) }, `${player.nickname} hand coin ${j} empty`));
                        }
                    }
                }
            }
        }
        if (data !== undefined) {
            playersHandsCoins.push(_jsxs("table", { className: "mx-auto", children: [
                    _jsxs("caption", { children: ["Player ", p + 1, " (", player.nickname, ") coins"] }), _jsx("tbody", { children: _jsx("tr", { children: playerCells }) })
                ] }, `${player.nickname} hand coins`));
        }
    }
    if (data !== undefined) {
        return playersHandsCoins;
    }
    else if (validatorName !== null) {
        return moveMainArgs;
    }
    return ThrowMyError({ G, ctx, ...rest }, ErrorNames.FunctionMustHaveReturnValue);
};
//# sourceMappingURL=PlayerUI.js.map