import { AllStackData } from "../data/StackData";
import { suitsConfig } from "../data/SuitData";
import { ThrowMyError } from "../Error";
import { ChangeBuffValue, CheckPlayerHasBuff, DeleteBuffFromPlayer } from "../helpers/BuffHelpers";
import { AddAnyCardToPlayerActions } from "../helpers/CardHelpers";
import { DiscardCurrentCard, RemoveCardFromPlayerBoardSuitCards } from "../helpers/DiscardCardHelpers";
import { CheckIsStartUseGodAbility } from "../helpers/GodAbilityHelpers";
import { AddActionsToStack } from "../helpers/StackHelpers";
import { AddDataToLog } from "../Logging";
import { CardRusNames, ErrorNames, GameModeNames, GodNames, HeroBuffNames, HeroNames, LogNames, MultiSuitCardNames, MythicalAnimalBuffNames, PlayerIdForSoloGameNames, SuitNames } from "../typescript/enums";
/**
 * <h3>Действия, связанные с добавлениям героя игроку или соло боту.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При необходимости выбора героя игроком.</li>
 * <li>При необходимости выбора героя соло ботом Андвари.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param heroId Id героя.
 * @returns
 */
export const AddHeroToPlayerCardsAction = ({ G, ...rest }, playerID, heroId) => {
    const hero = G.heroes[heroId];
    if (hero === undefined) {
        throw new Error(`Не существует кликнутая карта героя с id '${heroId}'.`);
    }
    AddAnyCardToPlayerActions({ G, ...rest }, playerID, hero);
};
/**
 * <h3>Действия, связанные с сбросом карт с планшета игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе конкретных героев, сбрасывающих карты с планшета игрока.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param suit Название фракции дворфов.
 * @param cardId Id карты.
 * @returns
 */
export const DiscardCardsFromPlayerBoardAction = ({ G, ctx, ...rest }, playerID, suit, cardId) => {
    var _a, _b, _c;
    const player = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError({ G, ctx, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
    }
    const discardedCard = RemoveCardFromPlayerBoardSuitCards({ G, ctx, ...rest }, playerID, suit, cardId);
    DiscardCurrentCard({ G, ctx, ...rest }, discardedCard);
    AddDataToLog({ G, ctx, ...rest }, LogNames.Game, `Карта '${discardedCard.type}' '${discardedCard.name}' убрана в сброс из-за выбора карты '${CardRusNames.HeroCard}' '${(_a = player.stack[0]) === null || _a === void 0 ? void 0 : _a.name}'.`);
    if (((_b = player.stack[0]) === null || _b === void 0 ? void 0 : _b.name) === HeroNames.Dagda && ((_c = player.stack[0]) === null || _c === void 0 ? void 0 : _c.pickedSuit) === undefined) {
        // TODO Check this logic!
        if (!(G.expansions.Idavoll.active && ((CheckPlayerHasBuff({ G, ctx, ...rest }, playerID, MythicalAnimalBuffNames.DagdaDiscardOnlyOneCards)) || (CheckIsStartUseGodAbility({ G, ctx, ...rest }, ctx.currentPlayer, GodNames.Thor))))) {
            AddActionsToStack({ G, ctx, ...rest }, ctx.currentPlayer, [AllStackData.discardCardFromBoardDagda(suit)]);
        }
    }
};
/**
 * <h3>Действия, связанные с добавлением других карт на поле игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При добавлении героя Ольвин на игровое поле игрока.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param suit Название фракции дворфов.
 * @returns
 */
export const PlaceMultiSuitCardAction = ({ G, ...rest }, playerID, suit) => {
    const player = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError({ G, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
    }
    const stack = player.stack[0];
    if (stack === undefined) {
        return ThrowMyError({ G, ...rest }, ErrorNames.FirstStackActionForPlayerWithCurrentIdIsUndefined, playerID);
    }
    const playerVariants = {
        blacksmith: {
            suit: SuitNames.blacksmith,
            rank: 1,
            points: null,
        },
        hunter: {
            suit: SuitNames.hunter,
            rank: 1,
            points: null,
        },
        explorer: {
            suit: SuitNames.explorer,
            rank: 1,
            points: 0,
        },
        warrior: {
            suit: SuitNames.warrior,
            rank: 1,
            points: 0,
        },
        miner: {
            suit: SuitNames.miner,
            rank: 1,
            points: 0,
        },
    }, name = stack.name;
    if (name === undefined) {
        throw new Error(`У конфига действия игрока с id '${playerID}' отсутствует обязательный параметр вариантов выкладки карты с типом '${CardRusNames.MultiSuitCard}' '${name}'.`);
    }
    const multiSuitCard = G.multiCardsDeck.find((card) => card.name === name);
    if (multiSuitCard === undefined) {
        throw new Error(`В игре отсутствует карта с типом '${CardRusNames.MultiSuitCard}' '${name}'.`);
    }
    multiSuitCard.playerSuit = suit;
    multiSuitCard.rank = playerVariants[suit].rank;
    multiSuitCard.points = playerVariants[suit].points;
    AddAnyCardToPlayerActions({ G, ...rest }, playerID, multiSuitCard);
    // TODO Move all such logs to AddAnyCardToPlayerActions!
    AddDataToLog({ G, ...rest }, LogNames.Game, `Игрок '${player.nickname}' добавил карту '${multiSuitCard.type}' '${name}' во фракцию '${suitsConfig[suit].suitName}'.`);
    if (stack.pickedSuit === undefined && name === MultiSuitCardNames.OlwinsDouble) {
        AddActionsToStack({ G, ...rest }, playerID, [AllStackData.placeMultiSuitsCards(MultiSuitCardNames.OlwinsDouble, suit, 3)]);
    }
};
/**
 * <h3>Действия, связанные с проверкой расположением конкретного героя на игровом поле игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При добавлении героя Труд на игровое поле игрока.</li>
 * <li>При добавлении героя Труд на игровое поле соло бота.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param suit Название фракции дворфов.
 * @returns
 */
export const PlaceThrudAction = ({ G, ...rest }, playerID, suit) => {
    const player = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError({ G, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
    }
    const stack = player.stack[0];
    if (stack === undefined) {
        throw new Error(`В массиве стека действий ${(G.mode === GameModeNames.Solo || G.mode === GameModeNames.SoloAndvari) && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId ? `соло бота` : `текущего игрока`} с id '${playerID}' отсутствует '0' действие.`);
    }
    const thrudHeroCard = player.heroes.find((hero) => hero.name === HeroNames.Thrud);
    if (thrudHeroCard === undefined) {
        throw new Error(`В массиве карт игрока с id '${playerID}' отсутствует карта '${CardRusNames.HeroPlayerCard}' '${HeroNames.Thrud}'.`);
    }
    thrudHeroCard.playerSuit = suit;
    ChangeBuffValue({ G, ...rest }, playerID, HeroBuffNames.MoveThrud, suit);
    AddAnyCardToPlayerActions({ G, ...rest }, playerID, thrudHeroCard);
};
/**
 * <h3>Действия, связанные с проверкой расположением конкретного героя на игровом поле игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При добавлении героя Илуд на игровом поле игрока.</li>
 * <li>При добавлении героя Илуд на игровом поле соло бота.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param suit Название фракции дворфов.
 * @returns
 */
export const PlaceYludAction = ({ G, ...rest }, playerID, suit) => {
    const player = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError({ G, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
    }
    const stack = player.stack[0];
    if (stack === undefined) {
        return ThrowMyError({ G, ...rest }, ErrorNames.FirstStackActionForPlayerWithCurrentIdIsUndefined, playerID);
    }
    const playerVariants = {
        blacksmith: {
            suit: SuitNames.blacksmith,
            rank: 1,
            points: null,
        },
        hunter: {
            suit: SuitNames.hunter,
            rank: 1,
            points: null,
        },
        explorer: {
            suit: SuitNames.explorer,
            rank: 1,
            points: 11,
        },
        warrior: {
            suit: SuitNames.warrior,
            rank: 1,
            points: 7,
        },
        miner: {
            suit: SuitNames.miner,
            rank: 1,
            points: 1,
        },
    }, yludHeroCard = player.heroes.find((hero) => hero.name === HeroNames.Ylud);
    if (yludHeroCard === undefined) {
        throw new Error(`В массиве карт игрока с id '${playerID}' отсутствует карта '${CardRusNames.HeroPlayerCard}' '${HeroNames.Ylud}'.`);
    }
    yludHeroCard.playerSuit = suit;
    yludHeroCard.rank = playerVariants[suit].rank;
    yludHeroCard.points = playerVariants[suit].points;
    if (G.tierToEnd === 0) {
        DeleteBuffFromPlayer({ G, ...rest }, playerID, HeroBuffNames.EndTier);
    }
    AddAnyCardToPlayerActions({ G, ...rest }, playerID, yludHeroCard);
};
//# sourceMappingURL=HeroActions.js.map