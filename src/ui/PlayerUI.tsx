import { JSX } from "react";
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
import { BoardProps } from "../typescript/Client";
import { BidsMoveValidatorNames, BidUlineMoveValidatorNames, BrisingamensEndGameMoveValidatorNames, CardMoveNames, CardRusNames, CoinCssClassNames, CoinMoveNames, CoinNames, CommonMoveValidatorNames, CommonStageNames, DrawCoinNames, EmptyCardMoveNames, EnlistmentMercenariesMoveValidatorNames, EnlistmentMercenariesStageNames, ErrorNames, GameModeNames, GetMjollnirProfitMoveValidatorNames, HeroBuffNames, HeroNames, MultiSuitCardNames, PhaseNames, PlaceYludMoveValidatorNames, PlayerIdForSoloGameNames, RankVariantsNames, SoloBotAndvariCommonMoveValidatorNames, SoloBotAndvariCommonStageNames, SoloBotCommonCoinUpgradeMoveValidatorNames, SoloBotCommonCoinUpgradeStageNames, SoloBotCommonMoveValidatorNames, SoloBotCommonStageNames, SuitMoveNames, SuitNames, TavernsResolutionMoveValidatorNames, TavernsResolutionStageNames } from "../typescript/enums";
import type { ActiveStageNames, CampCard, CanBeNull, CanBeUndef, Coin, Context, HandBorderedCoinCssClasses, HeroCard, MoveArguments, MoveCardsArguments, MoveCoinsArguments, MoveValidatorNames, MythologicalCreatureCommandZoneCard, PlayerBoardCard, PlayerCoinId, PlayerID, PlayerStack, PrivatePlayer, PublicPlayer, PublicPlayerCoin, SuitProperty, Variant } from "../typescript/interfaces";
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
export const DrawPlayersBoards = (
    { G, ctx, ...rest }: Context,
    validatorName: CanBeNull<MoveValidatorNames>,
    playerID: CanBeNull<PlayerID> = null,
    data?: BoardProps,
):
    | JSX.Element[]
    | MoveArguments<
        | number[]
        | SuitNames[]
        | MoveCardsArguments
        | Partial<SuitProperty<number[]>>
    > => {
    const playersBoards: JSX.Element[] = [];
    let moveMainArgs: CanBeUndef<MoveArguments<
        | number[]
        | SuitNames[]
        | MoveCardsArguments
        | Partial<SuitProperty<number[]>>
    >>;
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
        const playerID: string = String(p);
        AssertPlayerId(ctx, playerID);
        const playerRows: JSX.Element[] = [],
            playerHeaders: JSX.Element[] = [],
            playerHeadersCount: JSX.Element[] = [],
            player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID],
            stage: CanBeUndef<ActiveStageNames> = ctx.activePlayers?.[playerID];
        if (player === undefined) {
            return ThrowMyError(
                { G, ctx, ...rest },
                ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
                p,
            );
        }
        const stack: CanBeUndef<PlayerStack> = player.stack[0];
        let suitTop: SuitNames;
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
                    const phase: PhaseNames = ctx.phase;
                    let moveName: SuitMoveNames;
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
                    DrawSuit(
                        { G, ctx, ...rest },
                        data,
                        playerHeaders,
                        suitTop,
                        player,
                        moveName,
                        [suitTop],
                    );
                } else if (validatorName === GetMjollnirProfitMoveValidatorNames.GetMjollnirProfitMoveValidator
                    || validatorName === TavernsResolutionMoveValidatorNames.ChooseSuitOlrunMoveValidator) {
                    if (!Array.isArray(moveMainArgs)) {
                        throw new Error(`Аргумент валидатора '${validatorName}' должен быть массивом`);
                    }
                    (moveMainArgs as MoveArguments<SuitNames[]>).push(suitTop);
                } else {
                    return ThrowMyError(
                        { G, ctx, ...rest },
                        ErrorNames.NoAddedValidator,
                    );
                }
            } else {
                if (data !== undefined) {
                    DrawSuit(
                        { G, ctx, ...rest },
                        data,
                        playerHeaders,
                        suitTop,
                        player,
                    );
                }
            }
            if (data !== undefined) {
                playerHeadersCount.push(
                    <th className={`${suitsConfig[suitTop].suitColor} text-white`}
                        key={`${player.nickname} ${suitsConfig[suitTop].suitName} count`}>
                        <b>{player.cards[suitTop].reduce(TotalRank, 0)}</b>
                    </th>
                );
            }
        }
        if (data !== undefined) {
            for (let s = 0; s < 1 + Number(G.expansions.Thingvellir.active); s++) {
                if (s === 0) {
                    playerHeaders.push(
                        <th className="bg-gray-600" key={`${player.nickname} hero icon`}>
                            <span style={ALlStyles.HeroBack()} className="bg-hero-icon"></span>
                        </th>
                    );
                    playerHeadersCount.push(
                        <th className="bg-gray-600 text-white"
                            key={`${player.nickname} hero count`}>
                            <b>{player.heroes.length}</b>
                        </th>
                    );
                } else if (G.mode === GameModeNames.Basic || G.mode === GameModeNames.Multiplayer) {
                    playerHeaders.push(
                        <th className="bg-yellow-200" key={`${player.nickname} camp icon`}>
                            <span style={ALlStyles.Camp()} className="bg-camp-icon"></span>
                        </th>
                    );
                    playerHeadersCount.push(
                        <th className="bg-yellow-200 text-white"
                            key={`${player.nickname} camp counts`}>
                            <b>{player.campCards.length}</b>
                        </th>
                    );
                }
            }
        }
        for (let i = 0; ; i++) {
            const playerCells: JSX.Element[] = [];
            let isDrawRow = false,
                id = 0,
                j = 0,
                suit: SuitNames;
            for (suit in suitsConfig) {
                id = i + j;
                const card: CanBeUndef<PlayerBoardCard> = player.cards[suit][i],
                    last: number = player.cards[suit].length - 1;
                if (card !== undefined) {
                    isDrawRow = true;
                    if (playerID !== ctx.currentPlayer
                        && stage === CommonStageNames.DiscardSuitCardFromPlayerBoard
                        && suit === SuitNames.warrior && card.type !== CardRusNames.HeroPlayerCard) {
                        if (data !== undefined) {
                            DrawCard(
                                { G, ctx, ...rest },
                                data,
                                playerCells,
                                card,
                                id,
                                suit,
                                player,
                                CardMoveNames.DiscardSuitCardFromPlayerBoardMove,
                                [i],
                            );
                        } else if (validatorName ===
                            CommonMoveValidatorNames.DiscardSuitCardFromPlayerBoardMoveValidator) {
                            if (p === Number(playerID)) {
                                if (moveMainArgs !== undefined && `cards` in moveMainArgs) {
                                    moveMainArgs.cards.push(i);
                                } else {
                                    throw new Error(`Аргумент валидатора '${validatorName}' должен быть объектом с полем 'cards'.`);
                                }
                            }
                        } else {
                            return ThrowMyError(
                                { G, ctx, ...rest },
                                ErrorNames.NoAddedValidator,
                            );
                        }
                    } else if (playerID === ctx.currentPlayer && last === i
                        && stage === CommonStageNames.DiscardTopCardFromSuit
                        && card.type !== CardRusNames.HeroPlayerCard) {
                        // TODO Does it need more then 1 checking?
                        if (stack === undefined) {
                            return ThrowMyError(
                                { G, ctx, ...rest },
                                ErrorNames.FirstStackActionForPlayerWithCurrentIdIsUndefined,
                                p,
                            );
                        }
                        const stackSuit: CanBeUndef<SuitNames> = stack.suit;
                        if (suit !== stackSuit && suit !== stack.pickedSuit) {
                            if (data !== undefined) {
                                DrawCard(
                                    { G, ctx, ...rest },
                                    data,
                                    playerCells,
                                    card,
                                    id,
                                    suit,
                                    player,
                                    CardMoveNames.DiscardTopCardFromSuitMove,
                                    [suit, last],
                                );
                            } else if (validatorName === CommonMoveValidatorNames.DiscardTopCardFromSuitMoveValidator) {
                                if (moveMainArgs === undefined || typeof moveMainArgs !== `object`
                                    || Array.isArray(moveMainArgs) || `cards` in moveMainArgs) {
                                    throw new Error(`Аргумент валидатора '${validatorName}' должен быть объектом с полем '${suit}'.`);
                                }
                                moveMainArgs[suit] = [];
                                const moveMainArgsFoSuit: CanBeUndef<number[]> = moveMainArgs[suit];
                                if (moveMainArgsFoSuit === undefined) {
                                    throw new Error(`Массив значений должен содержать фракцию '${suit}'.`);
                                }
                                moveMainArgsFoSuit.push(last);
                            } else {
                                return ThrowMyError(
                                    { G, ctx, ...rest },
                                    ErrorNames.NoAddedValidator,
                                );
                            }
                        }
                    } else if (playerID === ctx.currentPlayer && ctx.phase === PhaseNames.BrisingamensEndGame
                        && card.type !== CardRusNames.HeroPlayerCard) {
                        if (data !== undefined) {
                            DrawCard(
                                { G, ctx, ...rest },
                                data,
                                playerCells,
                                card,
                                id,
                                suit,
                                player,
                                CardMoveNames.DiscardCardFromPlayerBoardMove,
                                [suit, i],
                            );
                        } else if (validatorName ===
                            BrisingamensEndGameMoveValidatorNames.DiscardCardFromPlayerBoardMoveValidator) {
                            if (moveMainArgs === undefined || typeof moveMainArgs !== `object`
                                || Array.isArray(moveMainArgs) || `cards` in moveMainArgs) {
                                throw new Error(`Аргумент валидатора '${validatorName}' должен быть объектом с полем '${suit}'.`);
                            }
                            const moveMainArgsFoSuit: CanBeUndef<number[]> = moveMainArgs[suit];
                            if (moveMainArgsFoSuit === undefined) {
                                throw new Error(`Массив значений должен содержать фракцию '${suit}'.`);
                            }
                            moveMainArgsFoSuit.push(i);
                        } else {
                            return ThrowMyError(
                                { G, ctx, ...rest },
                                ErrorNames.NoAddedValidator,
                            );
                        }
                    } else {
                        if (data !== undefined) {
                            DrawCard(
                                { G, ctx, ...rest },
                                data,
                                playerCells,
                                card,
                                id,
                                suit,
                                player,
                            );
                        }
                    }
                } else if (playerID === ctx.currentPlayer && (last + 1) === i
                    && ((((ctx.phase === PhaseNames.PlaceYlud && ctx.activePlayers === null)
                        || (ctx.phase === PhaseNames.EnlistmentMercenaries
                            && ctx.activePlayers?.[ctx.currentPlayer]
                            === EnlistmentMercenariesStageNames.PlaceEnlistmentMercenaries)))
                        || stage === CommonStageNames.PlaceMultiSuitCard
                        || stage === CommonStageNames.PlaceThrudHero
                        || stage === SoloBotCommonStageNames.SoloBotPlaceThrudHero
                        || stage === SoloBotAndvariCommonStageNames.SoloBotAndvariPlaceThrudHero)) {
                    if (stack === undefined) {
                        return ThrowMyError(
                            { G, ctx, ...rest },
                            ErrorNames.FirstStackActionForPlayerWithCurrentIdIsUndefined,
                            p,
                        );
                    }
                    let cardVariants: CanBeUndef<Variant<RankVariantsNames.MercenaryRank>>;
                    if (ctx.phase === PhaseNames.EnlistmentMercenaries
                        && ctx.activePlayers?.[ctx.currentPlayer] ===
                        EnlistmentMercenariesStageNames.PlaceEnlistmentMercenaries) {
                        if (IsMercenaryCampCard(stack.card)) {
                            cardVariants = stack.card.variants[suit];
                            if (cardVariants !== undefined && cardVariants.suit !== suit) {
                                throw new Error(`У выбранной карты отсутствует обязательный параметр 'variants[suit]'.`);
                            }
                        } else {
                            throw new Error(`Выбранная карта должна быть с типом '${CardRusNames.MercenaryCard}'.`);
                        }
                    }
                    if (data !== undefined) {
                        // TODO Draw heroes with more then one ranks no after the last card but when last rank of this hero card placed!?
                        // TODO Can Ylud be placed in old place because of "suit !== pickedCard.suit"? Thrud can be placed same suit in solo game!
                        let cardType: CardRusNames,
                            moveName: EmptyCardMoveNames;
                        if (((G.mode === GameModeNames.Solo
                            && ctx.currentPlayer === PlayerIdForSoloGameNames.SoloBotPlayerId)
                            || G.mode === GameModeNames.SoloAndvari
                            || ((G.mode === GameModeNames.Basic || G.mode === GameModeNames.Multiplayer)
                                && (stack.name !== MultiSuitCardNames.OlwinsDouble
                                    || (stack.name === MultiSuitCardNames.OlwinsDouble && suit !== stack.pickedSuit))))
                            || (cardVariants !== undefined && suit === cardVariants.suit)) {
                            let _exhaustiveCheck: never;
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
                                            } else if (ctx.currentPlayer === PlayerIdForSoloGameNames.SoloBotPlayerId) {
                                                moveName = EmptyCardMoveNames.SoloBotPlaceThrudHeroMove;
                                            } else {
                                                return ThrowMyError(
                                                    { G, ctx, ...rest },
                                                    ErrorNames.CanNotBeMoreThenTwoPlayersInSoloGameMode,
                                                );
                                            }
                                            break;
                                        case GameModeNames.SoloAndvari:
                                            if (ctx.currentPlayer === PlayerIdForSoloGameNames.HumanPlayerId) {
                                                moveName = EmptyCardMoveNames.PlaceThrudHeroMove;
                                            } else if (p === 1
                                                && ctx.currentPlayer === PlayerIdForSoloGameNames.SoloBotPlayerId) {
                                                moveName = EmptyCardMoveNames.SoloBotAndvariPlaceThrudHeroMove;
                                            } else {
                                                return ThrowMyError(
                                                    { G, ctx, ...rest },
                                                    ErrorNames.CanNotBeMoreThenTwoPlayersInSoloGameMode,
                                                );
                                            }
                                            break;
                                        default:
                                            _exhaustiveCheck = G.mode;
                                            return ThrowMyError(
                                                { G, ctx, ...rest },
                                                ErrorNames.NoSuchGameMode,
                                            );
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
                                            } else if (ctx.currentPlayer === PlayerIdForSoloGameNames.SoloBotPlayerId) {
                                                moveName = EmptyCardMoveNames.SoloBotPlaceYludHeroMove;
                                            } else {
                                                return ThrowMyError(
                                                    { G, ctx, ...rest },
                                                    ErrorNames.CanNotBeMoreThenTwoPlayersInSoloGameMode,
                                                );
                                            }
                                            break;
                                        case GameModeNames.SoloAndvari:
                                            if (ctx.currentPlayer === PlayerIdForSoloGameNames.HumanPlayerId) {
                                                moveName = EmptyCardMoveNames.PlaceYludHeroMove;
                                            } else if (p === 1
                                                && ctx.currentPlayer === PlayerIdForSoloGameNames.SoloBotPlayerId) {
                                                moveName = EmptyCardMoveNames.SoloBotAndvariPlaceYludHeroMove;
                                            } else {
                                                return ThrowMyError(
                                                    { G, ctx, ...rest },
                                                    ErrorNames.CanNotBeMoreThenTwoPlayersInSoloGameMode,
                                                );
                                            }
                                            break;
                                        default:
                                            _exhaustiveCheck = G.mode;
                                            return ThrowMyError(
                                                { G, ctx, ...rest },
                                                ErrorNames.NoSuchGameMode,
                                            );
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
                                    return ThrowMyError(
                                        { G, ctx, ...rest },
                                        ErrorNames.NoSuchMove,
                                    );
                            }
                            isDrawRow = true;
                            DrawEmptyCard(
                                { G, ctx, ...rest },
                                data,
                                playerCells,
                                cardType,
                                id,
                                suit,
                                player,
                                moveName,
                                [suit],
                            );
                        } else {
                            DrawEmptyCard(
                                { G, ctx, ...rest },
                                data,
                                playerCells,
                                CardRusNames.PlayerBoardCard,
                                id,
                                suit,
                                player,
                            );
                        }
                    } else if (validatorName === CommonMoveValidatorNames.PlaceThrudHeroMoveValidator
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
                            (moveMainArgs as MoveArguments<SuitNames[]>).push(suit);
                        }
                    } else {
                        return ThrowMyError(
                            { G, ctx, ...rest },
                            ErrorNames.NoAddedValidator,
                        );
                    }
                } else {
                    if (data !== undefined) {
                        DrawEmptyCard(
                            { G, ctx, ...rest },
                            data,
                            playerCells,
                            CardRusNames.PlayerBoardCard,
                            id,
                            suit,
                            player,
                        );
                    }
                }
                j++;
            }
            for (let k = 0; k < 1; k++) {
                id += k + 1;
                const playerCards: PlayerBoardCard[] = Object.values(player.cards).flat(),
                    hero: CanBeUndef<HeroCard> = player.heroes[i];
                // TODO Draw heroes from the beginning if player has suit heroes (or draw them with opacity)
                // TODO How draw and count no counting Hero from Thrivaldi!?
                if (hero !== undefined && !hero.playerSuit && !((hero.name === HeroNames.Ylud
                    && playerCards.findIndex((card: PlayerBoardCard): boolean =>
                        card.name === HeroNames.Ylud) !== -1) || (hero.name === HeroNames.Thrud
                            && playerCards.findIndex((card: PlayerBoardCard): boolean =>
                                card.name === HeroNames.Thrud) !== -1))) {
                    isDrawRow = true;
                    if (data !== undefined) {
                        DrawCard(
                            { G, ctx, ...rest },
                            data,
                            playerCells,
                            hero,
                            id,
                            null,
                            player,
                        );
                    }
                } else {
                    if (data !== undefined) {
                        DrawEmptyCard(
                            { G, ctx, ...rest },
                            data,
                            playerCells,
                            CardRusNames.CommandZoneHeroCard,
                            id,
                            null,
                            player,
                        );
                    }
                }
            }
            if (G.mode === GameModeNames.Basic || G.mode === GameModeNames.Multiplayer) {
                for (let t = 0; t < 0 + Number(G.expansions.Thingvellir.active); t++) {
                    id += t + 1;
                    const campCard: CanBeUndef<CampCard> = player.campCards[i];
                    if (campCard !== undefined) {
                        isDrawRow = true;
                        if (campCard.type === CardRusNames.MercenaryCard
                            && ctx.phase === PhaseNames.EnlistmentMercenaries
                            && ctx.activePlayers === null && ctx.currentPlayer === playerID) {
                            if (data !== undefined) {
                                DrawCard(
                                    { G, ctx, ...rest },
                                    data,
                                    playerCells,
                                    campCard,
                                    id,
                                    null,
                                    player,
                                    CardMoveNames.GetEnlistmentMercenariesMove,
                                    [i],
                                );
                            } else if (validatorName ===
                                EnlistmentMercenariesMoveValidatorNames.GetEnlistmentMercenariesMoveValidator) {
                                if (!Array.isArray(moveMainArgs)) {
                                    throw new Error(`Аргумент валидатора '${validatorName}' должен быть массивом.`);
                                }
                                (moveMainArgs as MoveArguments<number[]>).push(i);
                            } else {
                                return ThrowMyError(
                                    { G, ctx, ...rest },
                                    ErrorNames.NoAddedValidator,
                                );
                            }
                        } else {
                            if (data !== undefined) {
                                DrawCard(
                                    { G, ctx, ...rest },
                                    data,
                                    playerCells,
                                    campCard,
                                    id,
                                    null,
                                    player,
                                );
                            }
                        }
                    } else {
                        if (data !== undefined) {
                            DrawEmptyCard(
                                { G, ctx, ...rest },
                                data,
                                playerCells,
                                CardRusNames.CommandZoneCampCard,
                                id,
                                null,
                                player,
                            );
                        }
                    }
                }
                for (let m = 0; m < 0 + Number(G.expansions.Idavoll.active); m++) {
                    id += m + 1;
                    const mythologicalCreatureCommandZoneCard: CanBeUndef<MythologicalCreatureCommandZoneCard> =
                        player.mythologicalCreatureCards[i];
                    if (mythologicalCreatureCommandZoneCard !== undefined) {
                        isDrawRow = true;
                        if (data !== undefined) {
                            DrawCard(
                                { G, ctx, ...rest },
                                data,
                                playerCells,
                                mythologicalCreatureCommandZoneCard,
                                id,
                                null,
                                player,
                            );
                        }
                    } else {
                        if (data !== undefined) {
                            DrawEmptyCard(
                                { G, ctx, ...rest },
                                data,
                                playerCells,
                                CardRusNames.CommandZoneMythologicalCreatureCard,
                                id,
                                null,
                                player,
                            );
                        }
                    }
                }
            }
            if (isDrawRow) {
                if (data !== undefined) {
                    playerRows.push(
                        <tr key={`${player.nickname} board row ${i}`}>{playerCells}</tr>
                    );
                }
            } else {
                break;
            }
        }
        if (data !== undefined) {
            let scoreText = ``;
            if (G.winner) {
                if (G.totalScore === null) {
                    throw new Error(`В массиве итоговых очков игроков должны быть значения.`);
                }
                const finalTotalScore: CanBeUndef<number> = G.totalScore[p];
                if (finalTotalScore === undefined) {
                    throw new Error(`В массиве итоговых очков игроков должно быть значение игрока с id ${p}.`);
                }
                scoreText = `Final: ${finalTotalScore}`;
            } else {
                scoreText = `${AllCurrentScoring({ G, ctx, ...rest }, playerID)}`;
            }
            playersBoards.push(
                <table className="mx-auto" key={`${player.nickname} board`}>
                    <caption>Player {p + 1} ({player.nickname}) cards, {scoreText} points</caption>
                    <thead>
                        <tr>{playerHeaders}</tr>
                        <tr>{playerHeadersCount}</tr>
                    </thead>
                    <tbody>{playerRows}</tbody>
                </table>
            );
        }
    }
    if (data !== undefined) {
        return playersBoards;
    } else if (validatorName !== null && moveMainArgs !== undefined) {
        return moveMainArgs;
    }
    return ThrowMyError(
        { G, ctx, ...rest },
        ErrorNames.FunctionMustHaveReturnValue,
    );
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
export const DrawPlayersBoardsCoins = (
    { G, ctx, ...rest }: Context,
    validatorName: CanBeNull<MoveValidatorNames>,
    data?: BoardProps,
):
    | JSX.Element[]
    | MoveArguments<
        | PlayerCoinId[]
        | MoveCoinsArguments[]
    > => {
    const playersBoardsCoins: JSX.Element[] = [],
        moveMainArgs: MoveArguments<PlayerCoinId[] | MoveCoinsArguments[]> = [];
    let moveName: CanBeUndef<CoinMoveNames>;
    for (let p = 0; p < ctx.numPlayers; p++) {
        const playerID: string = String(p);
        AssertPlayerId(ctx, playerID);
        const stage: CanBeUndef<ActiveStageNames> = ctx.activePlayers?.[playerID];
        switch (ctx.phase) {
            case PhaseNames.Bids:
                moveName = CoinMoveNames.ClickBoardCoinMove;
                break;
            default:
                if (stage === CommonStageNames.ClickCoinToUpgrade
                    || stage === SoloBotCommonCoinUpgradeStageNames.SoloBotClickCoinToUpgrade
                    || stage === SoloBotAndvariCommonStageNames.SoloBotAndvariClickCoinToUpgrade) {
                    let _exhaustiveCheck: never;
                    switch (G.mode) {
                        case GameModeNames.Basic:
                        case GameModeNames.Multiplayer:
                            moveName = CoinMoveNames.ClickCoinToUpgradeMove;
                            break;
                        case GameModeNames.Solo:
                            if (ctx.currentPlayer === PlayerIdForSoloGameNames.HumanPlayerId) {
                                moveName = CoinMoveNames.ClickCoinToUpgradeMove;
                            } else if (ctx.currentPlayer === PlayerIdForSoloGameNames.SoloBotPlayerId) {
                                moveName = CoinMoveNames.SoloBotClickCoinToUpgradeMove;
                            } else {
                                return ThrowMyError(
                                    { G, ctx, ...rest },
                                    ErrorNames.CanNotBeMoreThenTwoPlayersInSoloGameMode,
                                );
                            }
                            break;
                        case GameModeNames.SoloAndvari:
                            if (ctx.currentPlayer === PlayerIdForSoloGameNames.HumanPlayerId) {
                                moveName = CoinMoveNames.ClickCoinToUpgradeMove;
                            } else if (p === 1 && ctx.currentPlayer === PlayerIdForSoloGameNames.SoloBotPlayerId) {
                                moveName = CoinMoveNames.SoloBotAndvariClickCoinToUpgradeMove;
                            } else {
                                return ThrowMyError(
                                    { G, ctx, ...rest },
                                    ErrorNames.CanNotBeMoreThenTwoPlayersInSoloGameMode,
                                );
                            }
                            break;
                        default:
                            _exhaustiveCheck = G.mode;
                            return ThrowMyError(
                                { G, ctx, ...rest },
                                ErrorNames.NoSuchGameMode,
                            );
                            return _exhaustiveCheck;
                    }
                } else if (stage === CommonStageNames.PickConcreteCoinToUpgrade) {
                    moveName = CoinMoveNames.PickConcreteCoinToUpgradeMove;
                } else if (stage === CommonStageNames.UpgradeCoinVidofnirVedrfolnir) {
                    moveName = CoinMoveNames.UpgradeCoinVidofnirVedrfolnirMove;
                }
                break;
        }
        const player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID],
            privatePlayer: CanBeUndef<PrivatePlayer> = G.players[playerID];
        if (player === undefined) {
            return ThrowMyError(
                { G, ctx, ...rest },
                ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
                p,
            );
        }
        const playerRows: JSX.Element[] = [],
            playerHeaders: JSX.Element[] = [],
            playerFooters: JSX.Element[] = [];
        for (let i = 0; i < 2; i++) {
            const playerCells: JSX.Element[] = [];
            for (let t = 0; t < G.tavernsNum; t++) {
                AssertTavernIndex(t);
                if (data !== undefined) {
                    if (i === 0) {
                        playerHeaders.push(
                            <th key={`${player.nickname} tavern ${tavernsConfig[t].name} coin`}>
                                <span style={ALlStyles.Tavern(t)}
                                    className="bg-tavern-icon"></span>
                            </th>
                        );
                    } else {
                        if (t === G.tavernsNum - 1) {
                            playerFooters.push(
                                <th key={`${player.nickname} priority icon`}>
                                    <span style={ALlStyles.Priority()} className="bg-priority-icon"></span>
                                </th>
                            );
                            playerCells.push(
                                <td key={`${player.nickname} priority gem`}
                                    className="bg-gray-300">
                                    <span style={player.priority.value > 0 ?
                                        ALlStyles.Priorities(player.priority.value) : undefined}
                                        className="bg-priority"></span>
                                </td>
                            );
                        } else {
                            if (data !== undefined) {
                                playerFooters.push(
                                    <th key={`${player.nickname} exchange icon ${t}`}>
                                        <span style={ALlStyles.Exchange()} className="bg-small-market-coin"></span>
                                    </th>
                                );
                            }
                        }
                    }
                }
                if (i === 0 || (i === 1 && t !== G.tavernsNum - 1)) {
                    const id: number = (t + G.tavernsNum * i);
                    AssertPlayerCoinId(id);
                    const publicBoardCoin: PublicPlayerCoin = player.boardCoins[id],
                        privateBoardCoin: CanBeUndef<PublicPlayerCoin> = privatePlayer?.boardCoins[id];
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
                                DrawCoin(
                                    { G, ctx, ...rest },
                                    data,
                                    playerCells,
                                    DrawCoinNames.Coin,
                                    privateBoardCoin ?? publicBoardCoin,
                                    id,
                                    player,
                                    null,
                                    null,
                                    moveName,
                                    [id],
                                );
                            } else if (validatorName === BidsMoveValidatorNames.ClickBoardCoinMoveValidator) {
                                (moveMainArgs as MoveArguments<number[]>).push(id);
                            } else {
                                return ThrowMyError(
                                    { G, ctx, ...rest },
                                    ErrorNames.NoAddedValidator,
                                );
                            }
                        } else if (ctx.currentPlayer === playerID && IsCoin(publicBoardCoin)
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
                                DrawCoin(
                                    { G, ctx, ...rest },
                                    data,
                                    playerCells,
                                    DrawCoinNames.Coin,
                                    publicBoardCoin,
                                    id,
                                    player,
                                    CoinCssClassNames.BorderedCoin,
                                    null,
                                    moveName,
                                    [id, CoinNames.Board],
                                );
                            } else if (validatorName === CommonMoveValidatorNames.ClickCoinToUpgradeMoveValidator
                                || validatorName ===
                                SoloBotCommonCoinUpgradeMoveValidatorNames.SoloBotClickCoinToUpgradeMoveValidator
                                || validatorName ===
                                SoloBotAndvariCommonMoveValidatorNames.SoloBotAndvariClickCoinToUpgradeMoveValidator
                                || validatorName === CommonMoveValidatorNames.PickConcreteCoinToUpgradeMoveValidator
                                || validatorName ===
                                CommonMoveValidatorNames.UpgradeCoinVidofnirVedrfolnirMoveValidator) {
                                // TODO Is it may be sometimes AssertPlayerPouchCoinId and must i differentiate it!?
                                (moveMainArgs as MoveArguments<MoveCoinsArguments[]>).push({
                                    coinId: id,
                                    type: CoinNames.Board,
                                });
                            } else {
                                return ThrowMyError(
                                    { G, ctx, ...rest },
                                    ErrorNames.NoAddedValidator,
                                );
                            }
                        } else {
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
                                    DrawCoin(
                                        { G, ctx, ...rest },
                                        data,
                                        playerCells,
                                        DrawCoinNames.Coin,
                                        publicBoardCoin,
                                        id,
                                        player,
                                    );
                                }
                            } else {
                                if (G.mode === GameModeNames.Multiplayer && privateBoardCoin !== undefined) {
                                    if (IsCoin(publicBoardCoin)) {
                                        if (!publicBoardCoin.isOpened) {
                                            throw new Error(`В массиве монет игрока на столе не может быть закрыта для других игроков ранее открытая монета с id '${id}'.`);
                                        }
                                        if (data !== undefined) {
                                            if (ctx.phase !== PhaseNames.Bids && i === 0 && G.currentTavern < t) {
                                                DrawCoin(
                                                    { G, ctx, ...rest },
                                                    data,
                                                    playerCells,
                                                    DrawCoinNames.Coin,
                                                    publicBoardCoin,
                                                    id,
                                                    player,
                                                );
                                            } else {
                                                DrawCoin(
                                                    { G, ctx, ...rest },
                                                    data,
                                                    playerCells,
                                                    DrawCoinNames.HiddenCoin,
                                                    publicBoardCoin,
                                                    id,
                                                    player,
                                                    CoinCssClassNames.SmallCoinBG,
                                                );
                                            }
                                        }
                                    } else {
                                        if (ctx.currentPlayer === playerID && IsCoin(privateBoardCoin)
                                            && !!IsTriggerTradingCoin(privateBoardCoin)
                                            && ((stage === CommonStageNames.ClickCoinToUpgrade)
                                                || (stage === CommonStageNames.PickConcreteCoinToUpgrade
                                                    && player.stack[0]?.coinValue === privateBoardCoin.value))) {
                                            if (data !== undefined) {
                                                DrawCoin(
                                                    { G, ctx, ...rest },
                                                    data,
                                                    playerCells,
                                                    DrawCoinNames.HiddenCoin,
                                                    privateBoardCoin,
                                                    id,
                                                    player,
                                                    CoinCssClassNames.SmallCoinBG,
                                                    null,
                                                    moveName,
                                                    [id, CoinNames.Board],
                                                );
                                            } else if (validatorName ===
                                                CommonMoveValidatorNames.ClickCoinToUpgradeMoveValidator
                                                || validatorName ===
                                                CommonMoveValidatorNames.PickConcreteCoinToUpgradeMoveValidator) {
                                                (moveMainArgs as MoveArguments<MoveCoinsArguments[]>)
                                                    .push({
                                                        coinId: id,
                                                        type: CoinNames.Board,
                                                    });
                                            } else {
                                                return ThrowMyError(
                                                    { G, ctx, ...rest },
                                                    ErrorNames.NoAddedValidator,
                                                );
                                            }
                                        } else {
                                            if (data !== undefined) {
                                                if (!IsCoin(privateBoardCoin)) {
                                                    throw new Error(`Монета с id '${id}' на столе текущего приватного игрока не может отсутствовать.`);
                                                }
                                                DrawCoin(
                                                    { G, ctx, ...rest },
                                                    data,
                                                    playerCells,
                                                    DrawCoinNames.HiddenCoin,
                                                    privateBoardCoin,
                                                    id,
                                                    player,
                                                    CoinCssClassNames.SmallCoinBG,
                                                );
                                            }
                                        }
                                    }
                                } else {
                                    if (data !== undefined) {
                                        if (!IsCoin(publicBoardCoin) || !publicBoardCoin.isOpened) {
                                            DrawCoin(
                                                { G, ctx, ...rest },
                                                data,
                                                playerCells,
                                                DrawCoinNames.Back,
                                                publicBoardCoin,
                                                id,
                                                player,
                                            );
                                        } else if (publicBoardCoin.isOpened) {
                                            DrawCoin(
                                                { G, ctx, ...rest },
                                                data,
                                                playerCells,
                                                DrawCoinNames.HiddenCoin,
                                                publicBoardCoin,
                                                id,
                                                player,
                                                CoinCssClassNames.SmallCoinBG,
                                            );
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        if (ctx.phase === PhaseNames.Bids && player.selectedCoin !== null
                            && ((G.mode === GameModeNames.Basic && (ctx.currentPlayer === playerID))
                                || (G.mode === GameModeNames.Multiplayer
                                    && (ctx.currentPlayer === playerID))
                                || ((G.mode === GameModeNames.Solo || G.mode === GameModeNames.SoloAndvari)
                                    && ctx.currentPlayer === PlayerIdForSoloGameNames.HumanPlayerId))) {
                            if (data !== undefined) {
                                if (i === 0) {
                                    DrawCoin(
                                        { G, ctx, ...rest },
                                        data,
                                        playerCells,
                                        DrawCoinNames.BackTavernIcon,
                                        publicBoardCoin,
                                        id,
                                        player,
                                        null,
                                        id,
                                        moveName,
                                        [id],
                                    );
                                } else {
                                    DrawCoin(
                                        { G, ctx, ...rest },
                                        data,
                                        playerCells,
                                        DrawCoinNames.BackSmallMarketCoin,
                                        publicBoardCoin,
                                        id,
                                        player,
                                        null,
                                        null,
                                        moveName,
                                        [id],
                                    );
                                }
                            } else if (validatorName === BidsMoveValidatorNames.ClickBoardCoinMoveValidator) {
                                (moveMainArgs as MoveArguments<number[]>).push(id);
                            } else {
                                return ThrowMyError(
                                    { G, ctx, ...rest },
                                    ErrorNames.NoAddedValidator,
                                );
                            }
                        } else {
                            if (data !== undefined) {
                                if (i === 0) {
                                    DrawCoin(
                                        { G, ctx, ...rest },
                                        data,
                                        playerCells,
                                        DrawCoinNames.BackTavernIcon,
                                        publicBoardCoin,
                                        id,
                                        player,
                                        null,
                                        id,
                                    );
                                } else {
                                    DrawCoin(
                                        { G, ctx, ...rest },
                                        data,
                                        playerCells,
                                        DrawCoinNames.BackSmallMarketCoin,
                                        publicBoardCoin,
                                        id,
                                        player,
                                    );
                                }
                            }
                        }
                    }
                }
            }
            if (data !== undefined) {
                playerRows.push(
                    <tr key={`${player.nickname} board coins row ${i}`}>{playerCells}</tr>
                );
            }
        }
        if (data !== undefined) {
            playersBoardsCoins.push(
                <table className="mx-auto" key={`${player.nickname} board coins`}>
                    <caption>
                        Player {p + 1} ({player.nickname}) played coins
                    </caption>
                    <thead>
                        <tr>{playerHeaders}</tr>
                    </thead>
                    <tbody>
                        {playerRows}
                    </tbody>
                    <tfoot>
                        <tr>{playerFooters}</tr>
                    </tfoot>
                </table>
            );
        }
    }
    if (data !== undefined) {
        return playersBoardsCoins;
    } else if (validatorName !== null) {
        return moveMainArgs;
    }
    return ThrowMyError(
        { G, ctx, ...rest },
        ErrorNames.FunctionMustHaveReturnValue,
    );
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
export const DrawPlayersHandsCoins = (
    { G, ctx, ...rest }: Context,
    validatorName: CanBeNull<MoveValidatorNames>,
    data?: BoardProps,
):
    | JSX.Element[]
    | MoveArguments<
        | PlayerCoinId[][]
        | PlayerCoinId[]
        | MoveCoinsArguments[]
    > => {
    const playersHandsCoins: JSX.Element[] = [],
        moveMainArgs: MoveArguments<
            | PlayerCoinId[][]
            | PlayerCoinId[]
            | MoveCoinsArguments[]
        > = [];
    if (validatorName === BidsMoveValidatorNames.SoloBotPlaceAllCoinsMoveValidator
        || validatorName === BidsMoveValidatorNames.SoloBotAndvariPlaceAllCoinsMoveValidator) {
        moveMainArgs[0] = [];
    }
    let moveName: CanBeUndef<CoinMoveNames>;
    for (let p = 0; p < ctx.numPlayers; p++) {
        const playerID: string = String(p);
        AssertPlayerId(ctx, playerID);
        const stage: CanBeUndef<ActiveStageNames> = ctx.activePlayers?.[playerID];
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
                    let _exhaustiveCheck: never;
                    switch (G.mode) {
                        case GameModeNames.Basic:
                        case GameModeNames.Multiplayer:
                            moveName = CoinMoveNames.ClickCoinToUpgradeMove;
                            break;
                        case GameModeNames.Solo:
                            if (ctx.currentPlayer === PlayerIdForSoloGameNames.HumanPlayerId) {
                                moveName = CoinMoveNames.ClickCoinToUpgradeMove;
                            } else if (ctx.currentPlayer === PlayerIdForSoloGameNames.SoloBotPlayerId) {
                                moveName = CoinMoveNames.SoloBotClickCoinToUpgradeMove;
                            } else {
                                return ThrowMyError(
                                    { G, ctx, ...rest },
                                    ErrorNames.CanNotBeMoreThenTwoPlayersInSoloGameMode,
                                );
                            }
                            break;
                        case GameModeNames.SoloAndvari:
                            if (ctx.currentPlayer === PlayerIdForSoloGameNames.HumanPlayerId) {
                                moveName = CoinMoveNames.ClickCoinToUpgradeMove;
                            }
                            break;
                        default:
                            _exhaustiveCheck = G.mode;
                            return ThrowMyError(
                                { G, ctx, ...rest },
                                ErrorNames.NoSuchGameMode,
                            );
                            return _exhaustiveCheck;
                    }
                } else if (stage === TavernsResolutionStageNames.ClickHandTradingCoinUline) {
                    moveName = CoinMoveNames.ClickHandTradingCoinUlineMove;
                } else if (stage === CommonStageNames.PickConcreteCoinToUpgrade) {
                    moveName = CoinMoveNames.PickConcreteCoinToUpgradeMove;
                } else if (stage === CommonStageNames.AddCoinToPouch) {
                    moveName = CoinMoveNames.AddCoinToPouchMove;
                }
                break;
        }
        const player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID],
            privatePlayer: CanBeUndef<PrivatePlayer> = G.players[playerID],
            playerCells: JSX.Element[] = [];
        if (player === undefined) {
            return ThrowMyError(
                { G, ctx, ...rest },
                ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
                p,
            );
        }
        for (let i = 0; i < 1; i++) {
            for (let j = 0; j < 5; j++) {
                AssertPlayerCoinId(j);
                const publicHandCoin: PublicPlayerCoin = player.handCoins[j],
                    privateHandCoin: CanBeUndef<Coin> = privatePlayer?.handCoins[j];
                if ((G.mode === GameModeNames.Multiplayer && privateHandCoin !== undefined
                    && IsCoin(privateHandCoin))
                    || (((G.mode === GameModeNames.Basic && ctx.currentPlayer === playerID)
                        || ((G.mode === GameModeNames.Solo || G.mode === GameModeNames.SoloAndvari)
                            && (p === 0 || ctx.phase === PhaseNames.ChooseDifficultySoloMode)))
                        && IsCoin(publicHandCoin))) {
                    let coinClasses: HandBorderedCoinCssClasses = CoinCssClassNames.BorderedCoin;
                    if (player.selectedCoin === j) {
                        coinClasses = CoinCssClassNames.BorderedCoinPicked;
                    }
                    const handCoin: PublicPlayerCoin = privateHandCoin ?? publicHandCoin;
                    if (!IsCoin(handCoin)) {
                        throw new Error(`В массиве монет игрока в руке должна быть открыта монета с id '${j}'.`);
                    }
                    if (ctx.currentPlayer === playerID
                        && (ctx.phase === PhaseNames.Bids || ctx.phase === PhaseNames.BidUline
                            || (stage === TavernsResolutionStageNames.ClickHandTradingCoinUline)
                            || ((G.mode === GameModeNames.Basic || G.mode === GameModeNames.Multiplayer)
                                && stage === CommonStageNames.AddCoinToPouch && CheckPlayerHasBuff(
                                    { G, ctx, ...rest },
                                    playerID,
                                    HeroBuffNames.EveryTurn,
                                )))) {
                        if (data !== undefined) {
                            DrawCoin(
                                { G, ctx, ...rest },
                                data,
                                playerCells,
                                DrawCoinNames.Coin,
                                handCoin,
                                j,
                                player,
                                coinClasses,
                                null,
                                moveName,
                                [j],
                            );
                        } else if (validatorName === BidsMoveValidatorNames.ClickHandCoinMoveValidator
                            || validatorName === BidUlineMoveValidatorNames.ClickHandCoinUlineMoveValidator
                            || validatorName ===
                            TavernsResolutionMoveValidatorNames.ClickHandTradingCoinUlineMoveValidator
                            || validatorName === CommonMoveValidatorNames.AddCoinToPouchMoveValidator) {
                            (moveMainArgs as MoveArguments<PlayerCoinId[]>).push(j);
                        } else {
                            return ThrowMyError(
                                { G, ctx, ...rest },
                                ErrorNames.NoAddedValidator,
                            );
                        }
                    } else if ((((G.mode === GameModeNames.Basic || G.mode === GameModeNames.Multiplayer)
                        && ctx.currentPlayer === playerID
                        && CheckPlayerHasBuff(
                            { G, ctx, ...rest },
                            playerID,
                            HeroBuffNames.EveryTurn,
                        ))
                        || ((G.mode === GameModeNames.Solo || G.mode === GameModeNames.SoloAndvari)
                            && ctx.currentPlayer === playerID
                            && ctx.currentPlayer === PlayerIdForSoloGameNames.SoloBotPlayerId
                            && ctx.phase === PhaseNames.ChooseDifficultySoloMode))
                        && (stage === CommonStageNames.ClickCoinToUpgrade
                            || stage === SoloBotCommonCoinUpgradeStageNames.SoloBotClickCoinToUpgrade
                            || (stage === CommonStageNames.PickConcreteCoinToUpgrade
                                && player.stack[0]?.coinValue === handCoin.value))) {
                        if (data !== undefined) {
                            DrawCoin(
                                { G, ctx, ...rest },
                                data,
                                playerCells,
                                DrawCoinNames.Coin,
                                handCoin,
                                j,
                                player,
                                coinClasses,
                                null,
                                moveName,
                                [j, CoinNames.Hand],
                            );
                        } else if (validatorName === CommonMoveValidatorNames.ClickCoinToUpgradeMoveValidator
                            || validatorName ===
                            SoloBotCommonCoinUpgradeMoveValidatorNames.SoloBotClickCoinToUpgradeMoveValidator
                            || validatorName === CommonMoveValidatorNames.PickConcreteCoinToUpgradeMoveValidator) {
                            (moveMainArgs as MoveArguments<MoveCoinsArguments[]>).push({
                                coinId: j,
                                type: CoinNames.Hand,
                            });
                        } else {
                            return ThrowMyError(
                                { G, ctx, ...rest },
                                ErrorNames.NoAddedValidator,
                            );
                        }
                    } else {
                        if (data !== undefined) {
                            DrawCoin(
                                { G, ctx, ...rest },
                                data,
                                playerCells,
                                DrawCoinNames.Coin,
                                handCoin,
                                j,
                                player,
                                coinClasses,
                            );
                        }
                    }
                } else if (((G.mode === GameModeNames.Basic || G.mode === GameModeNames.Solo
                    || G.mode === GameModeNames.SoloAndvari)
                    || (G.mode === GameModeNames.Multiplayer && privateHandCoin === undefined))
                    && IsCoin(publicHandCoin) && publicHandCoin.isOpened) {
                    if (data !== undefined) {
                        DrawCoin(
                            { G, ctx, ...rest },
                            data,
                            playerCells,
                            DrawCoinNames.HiddenCoin,
                            publicHandCoin,
                            j,
                            player,
                            CoinCssClassNames.SmallCoinBG,
                        );
                    }
                } else {
                    // TODO Add Throw errors to all UI files
                    if (G.mode === GameModeNames.Basic && IsCoin(publicHandCoin) && !publicHandCoin.isOpened) {
                        if (data !== undefined) {
                            const handCoin: PublicPlayerCoin = privateHandCoin ?? publicHandCoin;
                            if (!IsCoin(handCoin)) {
                                throw new Error(`В массиве монет игрока в руке должна быть открыта для текущего игрока с id '${p}' монета с id '${j}'.`);
                            }
                            DrawCoin(
                                { G, ctx, ...rest },
                                data,
                                playerCells,
                                DrawCoinNames.Back,
                                handCoin,
                                j,
                                player,
                            );
                        }
                    } else if ((G.mode === GameModeNames.Solo || G.mode === GameModeNames.SoloAndvari)
                        && p === 1 && !IsCoin(publicHandCoin) && publicHandCoin !== null) {
                        if (data !== undefined) {
                            DrawCoin(
                                { G, ctx, ...rest },
                                data,
                                playerCells,
                                DrawCoinNames.Back,
                                publicHandCoin,
                                j,
                                player,
                            );
                        } else if (validatorName === BidsMoveValidatorNames.SoloBotPlaceAllCoinsMoveValidator
                            || validatorName === BidsMoveValidatorNames.SoloBotAndvariPlaceAllCoinsMoveValidator) {
                            const moveMainArg: CanBeUndef<MoveArguments<number[]>> =
                                (moveMainArgs as MoveArguments<PlayerCoinId[][]>)[0];
                            if (moveMainArg === undefined) {
                                throw new Error(`В массиве аргументов мува отсутствует значение аргумента с id '0'.`);
                            }
                            moveMainArg.push(j);
                        } else {
                            return ThrowMyError(
                                { G, ctx, ...rest },
                                ErrorNames.NoAddedValidator,
                            );
                        }
                    } else if (G.mode === GameModeNames.Multiplayer && privateHandCoin === undefined) {
                        if (data !== undefined) {
                            DrawCoin(
                                { G, ctx, ...rest },
                                data,
                                playerCells,
                                DrawCoinNames.Back,
                                null,
                                j,
                                player,
                            );
                        }
                    } else {
                        if (data !== undefined) {
                            // TODO Move empty coin to the DrawCoin or add DrawEmptyCoin?!
                            playerCells.push(
                                <td key={`${player.nickname} hand coin ${j} empty`}
                                    className="bg-yellow-300">
                                    <span className="bg-coin bg-yellow-300 border-2"></span>
                                </td>
                            );
                        }
                    }
                }
            }
        }
        if (data !== undefined) {
            playersHandsCoins.push(
                <table className="mx-auto" key={`${player.nickname} hand coins`}>
                    <caption>Player {p + 1} ({player.nickname}) coins</caption>
                    <tbody>
                        <tr>{playerCells}</tr>
                    </tbody>
                </table>
            );
        }
    }
    if (data !== undefined) {
        return playersHandsCoins;
    } else if (validatorName !== null) {
        return moveMainArgs;
    }
    return ThrowMyError(
        { G, ctx, ...rest },
        ErrorNames.FunctionMustHaveReturnValue,
    );
};
