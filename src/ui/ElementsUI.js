import { jsx as _jsx } from "react/jsx-runtime";
import { ALlStyles } from "../data/StyleData";
import { suitsConfig } from "../data/SuitData";
import { ThrowMyError } from "../Error";
import { GetOdroerirTheMythicCauldronCoinsValues } from "../helpers/CampCardHelpers";
import { AssertTavernIndex } from "../is_helpers/AssertionTypeHelpers";
import { IsCoin, IsInitialCoin, IsRoyalCoin } from "../is_helpers/IsCoinTypeHelpers";
import { ArtefactNames, ButtonMoveNames, CardMoveNames, CardRusNames, CardWithoutSuitAndWithActionCssTDClassNames, CoinMoveNames, CoinRusNames, DistinctionCardMoveNames, DrawCoinNames, EmptyCardMoveNames, ErrorNames, HeroCardCssSpanClassNames, SuitMoveNames } from "../typescript/enums";
/**
 * <h3>Отрисовка кнопок.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка кнопок на игровом поле.</li>
 * </ol>
 *
 * @param context
 * @param data Глобальные параметры.
 * @param boardCells Ячейки для отрисовки.
 * @param name Имя кнопки.
 * @param player Игрок.
 * @param moveName Название действия.
 * @param args Аргументы действия.
 * @returns
 */
export const DrawButton = ({ ctx, ...rest }, data, boardCells, name, player, moveName, args) => {
    let action, _exhaustiveCheck;
    switch (moveName) {
        case ButtonMoveNames.NotActivateGodAbilityMove:
            action = data.moves.NotActivateGodAbilityMove;
            break;
        case ButtonMoveNames.PassEnlistmentMercenariesMove:
            action = data.moves.PassEnlistmentMercenariesMove;
            break;
        case ButtonMoveNames.StartEnlistmentMercenariesMove:
            action = data.moves.StartEnlistmentMercenariesMove;
            break;
        // Start
        case ButtonMoveNames.ChooseCoinValueForVidofnirVedrfolnirUpgradeMove:
            action = data.moves.ChooseCoinValueForVidofnirVedrfolnirUpgradeMove;
            break;
        // Solo Mode
        case ButtonMoveNames.ChooseDifficultyLevelForSoloModeMove:
            action = data.moves.ChooseDifficultyLevelForSoloModeMove;
            break;
        // Solo Mode Andvari
        case ButtonMoveNames.ChooseStrategyVariantForSoloModeAndvariMove:
            action = data.moves.ChooseStrategyVariantForSoloModeAndvariMove;
            break;
        case ButtonMoveNames.ChooseStrategyForSoloModeAndvariMove:
            action = data.moves.ChooseStrategyForSoloModeAndvariMove;
            break;
        default:
            _exhaustiveCheck = moveName;
            return ThrowMyError({ ctx, ...rest }, ErrorNames.NoSuchMove);
            return _exhaustiveCheck;
    }
    boardCells.push(_jsx("td", { className: CardWithoutSuitAndWithActionCssTDClassNames.CursorPointer, onClick: () => action?.({ ctx, playerID: ctx.currentPlayer, ...rest }, ...args), children: _jsx("button", { className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-sm", children: name }) }, `${player?.nickname ? `Player ${player.nickname} ` : ``}${name}`));
};
/**
 * <h3>Отрисовка карт знаков отличия.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка карт знаков отличия на игровом поле.</li>
 * </ol>
 *
 * @param context
 * @param data Глобальные параметры.
 * @param playerCells Ячейки для отрисовки.
 * @param suit Название фракции дворфов.
 * @param player Игрок.
 * @param moveName Название действия.
 * @param args Аргументы действия.
 * @returns
 */
export const DrawDistinctionCard = ({ ctx, ...rest }, data, playerCells, suit, player, moveName, args) => {
    let tdClasses = `bg-green-500`, action;
    let _exhaustiveCheck;
    switch (moveName) {
        case DistinctionCardMoveNames.ClickDistinctionCardMove:
            action = data.moves.ClickDistinctionCardMove;
            break;
        case undefined:
            action = undefined;
            break;
        default:
            _exhaustiveCheck = moveName;
            return ThrowMyError({ ctx, ...rest }, ErrorNames.NoSuchMove);
            return _exhaustiveCheck;
    }
    if (action !== undefined) {
        tdClasses = `${tdClasses} ${CardWithoutSuitAndWithActionCssTDClassNames.CursorPointer}`;
    }
    playerCells.push(_jsx("td", { className: tdClasses, onClick: () => args === undefined ? undefined : action?.({ ctx, playerID: ctx.currentPlayer, ...rest }, ...args), children: _jsx("span", { style: ALlStyles.Distinction(suit), title: suitsConfig[suit].distinction.description, className: "bg-suit-distinction" }) }, `${player?.nickname ? `player ${player.nickname} ` : ``} distinction ${suit} card`));
};
/**
 * <h3>Отрисовка карт.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка карт на игровом поле.</li>
 * </ol>
 *
 * @param context
 * @param data Глобальные параметры.
 * @param playerCells Ячейки для отрисовки.
 * @param card Карта.
 * @param id Id карты.
 * @param player Игрок.
 * @param suit Название фракции дворфов.
 * @param moveName Название действия.
 * @param args Аргументы действия.
 * @returns
 */
export const DrawCard = ({ G, ctx, ...rest }, data, playerCells, card, 
// TODO Can i rework number?
id, suit, player, moveName, args) => {
    let styles = { background: ``, }, tdClasses = ``, spanClasses = ``, description, 
    // TODO Can i rework number?
    value = null, action;
    if (`description` in card) {
        description = card.description;
    }
    if (suit !== null) {
        tdClasses = suitsConfig[suit].suitColor;
    }
    let _exhaustiveCheck;
    switch (moveName) {
        case CardMoveNames.ActivateGodAbilityMove:
            action = data.moves.ActivateGodAbilityMove;
            break;
        case CardMoveNames.ClickCardNotGiantAbilityMove:
            action = data.moves.ClickCardNotGiantAbilityMove;
            break;
        case CardMoveNames.ClickCardMove:
            action = data.moves.ClickCardMove;
            break;
        case CardMoveNames.ClickGiantAbilityNotCardMove:
            action = data.moves.ClickGiantAbilityNotCardMove;
            break;
        case CardMoveNames.ClickCardToPickDistinctionMove:
            action = data.moves.ClickCardToPickDistinctionMove;
            break;
        case CardMoveNames.ClickCampCardMove:
            action = data.moves.ClickCampCardMove;
            break;
        case CardMoveNames.DiscardCardFromPlayerBoardMove:
            action = data.moves.DiscardCardFromPlayerBoardMove;
            break;
        case CardMoveNames.GetEnlistmentMercenariesMove:
            action = data.moves.GetEnlistmentMercenariesMove;
            break;
        case CardMoveNames.GetMythologyCardMove:
            action = data.moves.GetMythologyCardMove;
            break;
        // Start
        case CardMoveNames.ClickCampCardHoldaMove:
            action = data.moves.ClickCampCardHoldaMove;
            break;
        case CardMoveNames.ClickHeroCardMove:
            action = data.moves.ClickHeroCardMove;
            break;
        case CardMoveNames.DiscardTopCardFromSuitMove:
            action = data.moves.DiscardTopCardFromSuitMove;
            break;
        case CardMoveNames.DiscardCard2PlayersMove:
            action = data.moves.DiscardCard2PlayersMove;
            break;
        case CardMoveNames.DiscardSuitCardFromPlayerBoardMove:
            action = data.moves.DiscardSuitCardFromPlayerBoardMove;
            break;
        case CardMoveNames.PickDiscardCardMove:
            action = data.moves.PickDiscardCardMove;
            break;
        // Solo Mode
        case CardMoveNames.ChooseHeroForDifficultySoloModeMove:
            action = data.moves.ChooseHeroForDifficultySoloModeMove;
            break;
        // Solo Bot
        case CardMoveNames.SoloBotClickHeroCardMove:
            action = data.moves.SoloBotClickHeroCardMove;
            break;
        case CardMoveNames.SoloBotClickCardMove:
            action = data.moves.SoloBotClickCardMove;
            break;
        case CardMoveNames.SoloBotClickCardToPickDistinctionMove:
            action = data.moves.SoloBotClickCardMove;
            break;
        // Solo Bot Andvari
        case CardMoveNames.SoloBotAndvariClickCardMove:
            action = data.moves.SoloBotAndvariClickCardMove;
            break;
        case CardMoveNames.SoloBotAndvariClickHeroCardMove:
            action = data.moves.SoloBotAndvariClickHeroCardMove;
            break;
        case CardMoveNames.SoloBotAndvariClickCardToPickDistinctionMove:
            action = data.moves.SoloBotAndvariClickCardToPickDistinctionMove;
            break;
        case undefined:
            action = undefined;
            break;
        default:
            _exhaustiveCheck = moveName;
            return ThrowMyError({ G, ctx, ...rest }, ErrorNames.NoSuchMove);
            return _exhaustiveCheck;
    }
    if (action !== undefined) {
        if (tdClasses === ``) {
            tdClasses = CardWithoutSuitAndWithActionCssTDClassNames.CursorPointer;
        }
        else {
            tdClasses = `${tdClasses} ${CardWithoutSuitAndWithActionCssTDClassNames.CursorPointer}`;
        }
    }
    switch (card.type) {
        case CardRusNames.HeroCard:
        case CardRusNames.HeroPlayerCard:
            styles = ALlStyles.Hero(card.name);
            if (player === null && `active` in card && !card.active) {
                spanClasses = HeroCardCssSpanClassNames.InactiveHero;
            }
            else {
                spanClasses = HeroCardCssSpanClassNames.Hero;
            }
            if (suit === null) {
                if (tdClasses === ``) {
                    tdClasses = `bg-gray-600`;
                }
                else if (tdClasses === CardWithoutSuitAndWithActionCssTDClassNames.CursorPointer) {
                    tdClasses = `bg-gray-600 ${tdClasses}`;
                }
                else {
                    throw new Error(`Стили 'tdClasses' не должны содержать классов 'SuitBGColorNames', т.к. 'suit === null'.`);
                }
            }
            break;
        case CardRusNames.MercenaryCard:
        case CardRusNames.MercenaryPlayerCard:
        case CardRusNames.ArtefactCard:
        case CardRusNames.ArtefactPlayerCard:
            styles = ALlStyles.CampCard(card.path);
            spanClasses = `bg-camp`;
            if (suit === null) {
                if (tdClasses === ``) {
                    tdClasses = `bg-yellow-200`;
                }
                else if (tdClasses === CardWithoutSuitAndWithActionCssTDClassNames.CursorPointer) {
                    tdClasses = `bg-yellow-200 ${tdClasses}`;
                }
                else {
                    throw new Error(`Стили 'tdClasses' не должны содержать классов 'SuitBGColorNames', т.к. 'suit === null'.`);
                }
                if (card.type === CardRusNames.ArtefactCard
                    && card.name === ArtefactNames.OdroerirTheMythicCauldron) {
                    value = GetOdroerirTheMythicCauldronCoinsValues({ G, ctx, ...rest });
                }
            }
            break;
        case CardRusNames.DwarfCard:
        case CardRusNames.DwarfPlayerCard:
        case CardRusNames.MultiSuitCard:
        case CardRusNames.MultiSuitPlayerCard:
        case CardRusNames.SpecialCard:
        case CardRusNames.SpecialPlayerCard:
            spanClasses = `bg-card`;
            if (`suit` in card) {
                styles = ALlStyles.Card(card.suit, card.name, card.points);
            }
            else if (`playerSuit` in card && card.playerSuit !== null) {
                styles = ALlStyles.Card(card.playerSuit, card.name, card.points);
            }
            break;
        case CardRusNames.RoyalOfferingCard:
            spanClasses = `bg-royal-offering`;
            styles = ALlStyles.RoyalOffering(card.name);
            value = card.upgradeValue;
            break;
        case CardRusNames.GiantCard:
        case CardRusNames.GodCard:
        case CardRusNames.MythicalAnimalCard:
        case CardRusNames.MythicalAnimalPlayerCard:
        case CardRusNames.ValkyryCard:
            if (`isActivated` in card && card.isActivated === true) {
                // TODO Draw capturedCard for Giant if captured!
                spanClasses = `bg-mythological-creature-inactive`;
            }
            else {
                spanClasses = `bg-mythological-creature`;
            }
            // TODO Draw valkyry requirements!
            styles = ALlStyles.MythologicalCreature(card.name);
            break;
        default:
            _exhaustiveCheck = card;
            throw new Error(`Добавленная на поле игрока карта не может быть с недопустимым типом.`);
            return _exhaustiveCheck;
    }
    if (`points` in card) {
        value = card.points;
    }
    //TODO Draw Power token on Gods if needed and Strength token on valkyries! And Loki token!
    playerCells.push(_jsx("td", { className: tdClasses, onClick: () => args === undefined ? undefined : action?.({ G, ctx, playerID: ctx.currentPlayer, ...rest }, ...args), children: _jsx("span", { style: styles, title: description ?? card.name, className: spanClasses, children: _jsx("b", { children: value }) }) }, `${player?.nickname ? `player ${player.nickname} ` : ``}${suit} card ${id} ${card.name}`));
};
/**
 * <h3>Отрисовка пустых ячеек для карт.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка пустых ячеек для карт на игровом поле.</li>
 * </ol>
 *
 * @param context
 * @param data Глобальные параметры.
 * @param playerCells Ячейки для отрисовки.
 * @param cardType Тип карты.
 * @param id Id карты.
 * @param player Игрок.
 * @param suit Название фракции дворфов.
 * @param moveName Название действия.
 * @param args Аргументы действия.
 * @returns
 */
export const DrawEmptyCard = ({ ctx, ...rest }, data, playerCells, cardType, 
// TODO Can i rework number?
id, suit, player, moveName, args) => {
    let tdClasses = ``, action;
    if (suit !== null) {
        tdClasses = suitsConfig[suit].suitColor;
    }
    let _exhaustiveCheck;
    switch (moveName) {
        case EmptyCardMoveNames.PlaceThrudHeroMove:
            action = data.moves.PlaceThrudHeroMove;
            break;
        case EmptyCardMoveNames.PlaceYludHeroMove:
            action = data.moves.PlaceYludHeroMove;
            break;
        case EmptyCardMoveNames.PlaceMultiSuitCardMove:
            action = data.moves.PlaceMultiSuitCardMove;
            break;
        case EmptyCardMoveNames.PlaceEnlistmentMercenariesMove:
            action = data.moves.PlaceEnlistmentMercenariesMove;
            break;
        // Solo Bot
        case EmptyCardMoveNames.SoloBotPlaceThrudHeroMove:
            action = data.moves.SoloBotPlaceThrudHeroMove;
            break;
        case EmptyCardMoveNames.SoloBotPlaceYludHeroMove:
            action = data.moves.SoloBotPlaceYludHeroMove;
            break;
        // Solo Bot Andvari
        case EmptyCardMoveNames.SoloBotAndvariPlaceThrudHeroMove:
            action = data.moves.SoloBotAndvariPlaceThrudHeroMove;
            break;
        case EmptyCardMoveNames.SoloBotAndvariPlaceYludHeroMove:
            action = data.moves.SoloBotAndvariPlaceYludHeroMove;
            break;
        case undefined:
            action = undefined;
            break;
        default:
            _exhaustiveCheck = moveName;
            return ThrowMyError({ ctx, ...rest }, ErrorNames.NoSuchMove);
            return _exhaustiveCheck;
    }
    if (action !== undefined) {
        if (tdClasses === ``) {
            tdClasses = CardWithoutSuitAndWithActionCssTDClassNames.CursorPointer;
        }
        else {
            tdClasses = `${tdClasses} ${CardWithoutSuitAndWithActionCssTDClassNames.CursorPointer}`;
        }
    }
    // TODO Check colors of empty camp & others cards!
    playerCells.push(_jsx("td", { className: tdClasses, onClick: () => args === undefined ? undefined : action?.({ ctx, playerID: ctx.currentPlayer, ...rest }, ...args) }, `${player?.nickname ? `player ${player.nickname} ` : ``}${suit} empty ${cardType} ${id}`));
};
/**
 * <h3>Отрисовка монет.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка монет на игровом поле.</li>
 * </ol>
 *
 * @param context
 * @param data Глобальные параметры.
 * @param playerCells Ячейки для отрисовки.
 * @param type Тип монеты.
 * @param coin Монета.
 * @param id Id монеты.
 * @param player Игрок.
 * @param coinClasses Дополнительный классы для монеты.
 * @param additionalParam Дополнительные параметры.
 * @param moveName Название действия.
 * @param args Аргументы действия.
 * @returns
 */
export const DrawCoin = ({ ctx, ...rest }, data, playerCells, type, coin, id, player, coinClasses = null, additionalParam = null, moveName, args) => {
    let styles = { background: `` }, span = null, tdClasses = `bg-yellow-300`, spanClasses = ``, action, _exhaustiveCheck;
    switch (moveName) {
        case CoinMoveNames.ChooseCoinValueForHrungnirUpgradeMove:
            action = data.moves.ChooseCoinValueForHrungnirUpgradeMove;
            break;
        case CoinMoveNames.ClickBoardCoinMove:
            action = data.moves.ClickBoardCoinMove;
            break;
        case CoinMoveNames.ClickHandCoinMove:
            action = data.moves.ClickHandCoinMove;
            break;
        case CoinMoveNames.ClickHandCoinUlineMove:
            action = data.moves.ClickHandCoinUlineMove;
            break;
        case CoinMoveNames.ClickHandTradingCoinUlineMove:
            action = data.moves.ClickHandTradingCoinUlineMove;
            break;
        // Start
        case CoinMoveNames.AddCoinToPouchMove:
            action = data.moves.AddCoinToPouchMove;
            break;
        case CoinMoveNames.ClickCoinToUpgradeMove:
            action = data.moves.ClickCoinToUpgradeMove;
            break;
        case CoinMoveNames.PickConcreteCoinToUpgradeMove:
            action = data.moves.PickConcreteCoinToUpgradeMove;
            break;
        case CoinMoveNames.UpgradeCoinVidofnirVedrfolnirMove:
            action = data.moves.UpgradeCoinVidofnirVedrfolnirMove;
            break;
        // Solo Bot
        case CoinMoveNames.SoloBotClickCoinToUpgradeMove:
            action = data.moves.SoloBotClickCoinToUpgradeMove;
            break;
        // Solo Bot Andvari
        case CoinMoveNames.SoloBotAndvariClickCoinToUpgradeMove:
            action = data.moves.SoloBotAndvariClickCoinToUpgradeMove;
            break;
        case undefined:
            action = undefined;
            break;
        default:
            _exhaustiveCheck = moveName;
            return ThrowMyError({ ctx, ...rest }, ErrorNames.NoSuchMove);
            return _exhaustiveCheck;
    }
    if (action !== undefined) {
        tdClasses = `${tdClasses} ${CardWithoutSuitAndWithActionCssTDClassNames.CursorPointer}`;
    }
    if (type === DrawCoinNames.Market) {
        if (!IsCoin(coin)) {
            throw new Error(`Монета на рынке не может отсутствовать.`);
        }
        if (!IsRoyalCoin(coin)) {
            throw new Error(`Монета на рынке не может не быть с типом '${CoinRusNames.Royal}'.`);
        }
        styles = ALlStyles.Coin(coin.value, false);
        spanClasses = `bg-market-coin`;
        if (coinClasses !== null && coinClasses !== undefined) {
            span = (_jsx("span", { className: coinClasses, children: additionalParam }));
        }
    }
    else if (type === DrawCoinNames.HiddenCoin) {
        spanClasses = `bg-coin`;
        if (IsCoin(coin) && coinClasses !== null && coinClasses !== undefined) {
            styles = ALlStyles.CoinBack();
            span = (_jsx("span", { style: ALlStyles.Coin(coin.value, IsInitialCoin(coin)), className: coinClasses }));
        }
    }
    else {
        spanClasses = `bg-coin`;
        if (coinClasses !== null && coinClasses !== undefined) {
            spanClasses = `${spanClasses} ${coinClasses}`;
        }
        if (type === DrawCoinNames.Coin) {
            if (coin === null) {
                styles = ALlStyles.CoinBack();
            }
            else {
                if (!IsCoin(coin)) {
                    throw new Error(`Монета с типом 'coin' не может быть закрыта.`);
                }
                styles = ALlStyles.Coin(coin.value, IsInitialCoin(coin));
            }
        }
        else {
            styles = ALlStyles.CoinBack();
            if (type === DrawCoinNames.BackSmallMarketCoin) {
                span = (_jsx("span", { style: ALlStyles.Exchange(), className: "bg-small-market-coin" }));
            }
            else if (type === DrawCoinNames.BackTavernIcon) {
                if (additionalParam !== null && additionalParam !== undefined) {
                    AssertTavernIndex(additionalParam);
                    span = (_jsx("span", { style: ALlStyles.Tavern(additionalParam), className: "bg-tavern-icon" }));
                }
            }
        }
    }
    playerCells.push(_jsx("td", { className: tdClasses, onClick: () => args === undefined ? undefined : action?.({ ctx, playerID: ctx.currentPlayer, ...rest }, ...args), children: _jsx("span", { style: styles, className: spanClasses, children: span }) }, `${player?.nickname ? `player ${player.nickname} ` : ``}coin ${id}${IsCoin(coin) ? ` ${coin.value}` : ` empty`}`));
};
/**
 * <h3>Отрисовка фракций.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка фракций на игровом поле.</li>
 * </ol>
 *
 * @param context
 * @param data Глобальные параметры.
 * @param playerHeaders Ячейки для отрисовки.
 * @param suit Название фракции дворфов.
 * @param player Игрок.
 * @param moveName Название действия.
 * @param args Аргументы действия.
 * @returns
 */
export const DrawSuit = ({ ctx, ...rest }, data, playerHeaders, suit, player, moveName, args) => {
    let className = `${suitsConfig[suit].suitColor}`, action, _exhaustiveCheck;
    switch (moveName) {
        case SuitMoveNames.ChooseSuitOlrunMove:
            action = data.moves.ChooseSuitOlrunMove;
            break;
        case SuitMoveNames.GetMjollnirProfitMove:
            action = data.moves.GetMjollnirProfitMove;
            break;
        case undefined:
            action = undefined;
            break;
        default:
            _exhaustiveCheck = moveName;
            return ThrowMyError({ ctx, ...rest }, ErrorNames.NoSuchMove);
            return _exhaustiveCheck;
    }
    if (action !== undefined) {
        className = `${className} ${CardWithoutSuitAndWithActionCssTDClassNames.CursorPointer}`;
    }
    playerHeaders.push(_jsx("th", { className: `${className}`, onClick: () => args === undefined ? undefined : action?.({ ctx, playerID: ctx.currentPlayer, ...rest }, ...args), children: _jsx("span", { style: ALlStyles.Suit(suit), className: "bg-suit-icon" }) }, `${player?.nickname ? `player ${player.nickname} ` : ``}${suitsConfig[suit].suitName} suit`));
};
//# sourceMappingURL=ElementsUI.js.map