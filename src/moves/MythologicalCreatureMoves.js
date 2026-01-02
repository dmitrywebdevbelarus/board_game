import { ThrowMyError } from "../Error";
import { IsValidMove } from "../MoveValidator";
import { UpgradeCoinAction } from "../actions/CoinActions";
import { AddPickHeroAction } from "../actions/HeroAutoActions";
import { AddPlusTwoValueToAllCoinsAction } from "../actions/MythologicalCreatureActions";
import { AllStackData } from "../data/StackData";
import { AddBuffToPlayer, CheckPlayerHasBuff, DeleteBuffFromPlayer } from "../helpers/BuffHelpers";
import { AddAnyCardToPlayerActions } from "../helpers/CardHelpers";
import { UpgradeNextCoinsHrungnir } from "../helpers/CoinActionHelpers";
import { AddActionsToStack } from "../helpers/StackHelpers";
import { AssertMythologicalCreatureDeckForSkymirCardId, AssertPlayerCoinId } from "../is_helpers/AssertionTypeHelpers";
import { IsGiantCard } from "../is_helpers/IsMythologicalCreatureTypeHelpers";
import { ButtonMoveNames, CardMoveNames, CardRusNames, CoinMoveNames, CoinNames, CommonBuffNames, ErrorNames, GiantBuffNames, GodBuffNames, GodNames, InvalidMoveNames, SuitMoveNames, SuitNames, TavernsResolutionStageNames, TavernsResolutionWithSubStageNames } from "../typescript/enums";
// TODO godName: GodNames => string and asserts it value if no other strings can be valid in moves!?
export const ActivateGodAbilityMove = ({ G, playerID, ...rest }, godName) => {
    const isValidMove = IsValidMove({ G, playerID, ...rest }, TavernsResolutionWithSubStageNames.ActivateGodAbilityOrNot, CardMoveNames.ActivateGodAbilityMove, godName);
    if (!isValidMove) {
        return InvalidMoveNames.INVALID_MOVE;
    }
    const player = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError({ G, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
    }
    let buffName, _exhaustiveCheck;
    switch (godName) {
        case GodNames.Freyja:
            buffName = GodBuffNames.PlayerHasActiveGodFreyja;
            break;
        case GodNames.Frigg:
            buffName = GodBuffNames.PlayerHasActiveGodFrigg;
            break;
        case GodNames.Loki:
            buffName = GodBuffNames.PlayerHasActiveGodLoki;
            break;
        case GodNames.Odin:
            buffName = GodBuffNames.PlayerHasActiveGodOdin;
            break;
        case GodNames.Thor:
            buffName = GodBuffNames.PlayerHasActiveGodThor;
            break;
        default:
            _exhaustiveCheck = godName;
            throw new Error(`Нет такой карты '${godName}' среди карт богов.`);
            return _exhaustiveCheck;
    }
    DeleteBuffFromPlayer({ G, ...rest }, playerID, buffName);
};
// TODO godName: GodNames => string and asserts it value if no other strings can be valid in moves!?
export const NotActivateGodAbilityMove = ({ G, ctx, playerID, events, ...rest }, godName) => {
    const isValidMove = IsValidMove({ G, ctx, playerID, events, ...rest }, TavernsResolutionWithSubStageNames.ActivateGodAbilityOrNot, ButtonMoveNames.NotActivateGodAbilityMove, godName);
    if (!isValidMove) {
        return InvalidMoveNames.INVALID_MOVE;
    }
    const player = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError({ G, ctx, events, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
    }
    const stack = player.stack[0];
    if (stack === undefined) {
        return ThrowMyError({ G, ctx, events, ...rest }, ErrorNames.FirstStackActionForPlayerWithCurrentIdIsUndefined, playerID);
    }
    const stackDwarfCard = stack.card;
    if (stackDwarfCard !== undefined && !(stackDwarfCard.type === CardRusNames.DwarfCard
        || stackDwarfCard.type === CardRusNames.RoyalOfferingCard)) {
        throw new Error(`В стеке должна быть карта типа '${CardRusNames.DwarfCard}' или '${CardRusNames.RoyalOfferingCard}', а не '${stackDwarfCard.type}'.`);
    }
    let _exhaustiveCheck;
    switch (godName) {
        case GodNames.Freyja:
        case GodNames.Loki:
            AddActionsToStack({ G, ctx, events, ...rest }, playerID, [AllStackData.pickCard()]);
            break;
        case GodNames.Frigg:
            if (stackDwarfCard === undefined) {
                throw new Error(`В стеке не может не быть карты.`);
            }
            AddAnyCardToPlayerActions({ G, ctx, events, ...rest }, playerID, stackDwarfCard);
            break;
        case GodNames.Odin:
            events.endTurn();
            break;
        case GodNames.Thor:
            if (CheckPlayerHasBuff({ G, ctx, events, ...rest }, playerID, GodBuffNames.PlayerHasActiveGodThor)) {
                // TODO Add stack.heroName => AddActionsToStack({ G, ctx, events, ...rest }, playerID, [AllStackData.STACK_DISCARD_HERO!]);
            }
            break;
        default:
            _exhaustiveCheck = godName;
            throw new Error(`Нет такой карты '${godName}' среди карт богов.`);
            return _exhaustiveCheck;
    }
};
/**
 * <h3>Выбор монеты для улучшения по способности Гиганта Hrungnir.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Срабатывает при активации способности Гиганта Hrungnir при наличии героя Uline.</li>
 * </ol>
 *
 * @param context
 * @param coinId Id улучшаемой монеты.
 * @returns
 */
export const ChooseCoinValueForHrungnirUpgradeMove = ({ G, playerID, ...rest }, coinId) => {
    AssertPlayerCoinId(coinId);
    const isValidMove = IsValidMove({ G, playerID, ...rest }, TavernsResolutionStageNames.ChooseCoinValueForHrungnirUpgrade, CoinMoveNames.ChooseCoinValueForHrungnirUpgradeMove, coinId);
    if (!isValidMove) {
        return InvalidMoveNames.INVALID_MOVE;
    }
    const player = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError({ G, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
    }
    const stack = player.stack[0];
    if (stack === undefined) {
        return ThrowMyError({ G, ...rest }, ErrorNames.FirstStackActionForPlayerWithCurrentIdIsUndefined, playerID);
    }
    let nextCoinId = stack.coinId;
    if (nextCoinId === undefined) {
        throw new Error(`В стеке отсутствует 'coinId'.`);
    }
    UpgradeCoinAction({ G, ...rest }, playerID, false, 2, coinId, CoinNames.Hand);
    if (nextCoinId < 4) {
        nextCoinId++;
        AssertPlayerCoinId(nextCoinId);
        UpgradeNextCoinsHrungnir({ G, ...rest }, playerID, nextCoinId);
    }
};
// TODO card: DwarfCard => ?? and asserts it value if no other cards can be valid in moves!?
/**
 * <h3>Выбор карты дворфа, а не активации способности конкретного Гиганта.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Срабатывает при выборе игроком карты Olrun.</li>
 * </ol>
 *
 * @param context
 * @param dwarfCard Карта Дворфа.
 * @returns
 */
export const ClickCardNotGiantAbilityMove = ({ G, playerID, ...rest }, dwarfCard) => {
    const isValidMove = IsValidMove({ G, playerID, ...rest }, TavernsResolutionWithSubStageNames.ActivateGiantAbilityOrPickCard, CardMoveNames.ClickCardNotGiantAbilityMove, dwarfCard);
    if (!isValidMove) {
        return InvalidMoveNames.INVALID_MOVE;
    }
    const player = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError({ G, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
    }
    const stack = player.stack[0];
    if (stack === undefined) {
        return ThrowMyError({ G, ...rest }, ErrorNames.FirstStackActionForPlayerWithCurrentIdIsUndefined, playerID);
    }
    const giant = player.mythologicalCreatureCards.find((card) => card.name === stack.giantName);
    if (giant === undefined) {
        throw new Error(`В массиве карт мифических существ игрока с id '${playerID}' в командной зоне отсутствует карта Гиганта с названием '${stack.giantName}'.`);
    }
    if (!IsGiantCard(giant)) {
        throw new Error(`В массиве карт мифических существ игрока с id '${playerID}' в командной зоне не может быть карта с типом '${giant.type}' вместо типа '${CardRusNames.GiantCard}' с названием '${stack.giantName}'.`);
    }
    let buffName, _exhaustiveCheck;
    switch (dwarfCard.playerSuit) {
        case SuitNames.blacksmith:
            if (CheckPlayerHasBuff({ G, ...rest }, playerID, GiantBuffNames.PlayerHasActiveGiantThrivaldi)) {
                buffName = GiantBuffNames.PlayerHasActiveGiantThrivaldi;
            }
            else {
                throw new Error(`Игрок с id '${playerID}' должен иметь баф '${GiantBuffNames.PlayerHasActiveGiantThrivaldi}'.`);
            }
            break;
        case SuitNames.explorer:
            if (CheckPlayerHasBuff({ G, ...rest }, playerID, GiantBuffNames.PlayerHasActiveGiantGymir)) {
                buffName = GiantBuffNames.PlayerHasActiveGiantGymir;
            }
            else {
                throw new Error(`Игрок с id '${playerID}' должен иметь баф '${GiantBuffNames.PlayerHasActiveGiantGymir}'.`);
            }
            break;
        case SuitNames.hunter:
            if (CheckPlayerHasBuff({ G, ...rest }, playerID, GiantBuffNames.PlayerHasActiveGiantSkymir)) {
                buffName = GiantBuffNames.PlayerHasActiveGiantSkymir;
            }
            else {
                throw new Error(`Игрок с id '${playerID}' должен иметь баф '${GiantBuffNames.PlayerHasActiveGiantSkymir}'.`);
            }
            break;
        case SuitNames.miner:
            if (CheckPlayerHasBuff({ G, ...rest }, playerID, GiantBuffNames.PlayerHasActiveGiantHrungnir)) {
                buffName = GiantBuffNames.PlayerHasActiveGiantHrungnir;
            }
            else {
                throw new Error(`Игрок с id '${playerID}' должен иметь баф '${GiantBuffNames.PlayerHasActiveGiantHrungnir}'.`);
            }
            break;
        case SuitNames.warrior:
            if (CheckPlayerHasBuff({ G, ...rest }, playerID, GiantBuffNames.PlayerHasActiveGiantSurt)) {
                buffName = GiantBuffNames.PlayerHasActiveGiantSurt;
            }
            else {
                throw new Error(`Игрок с id '${playerID}' должен иметь баф '${GiantBuffNames.PlayerHasActiveGiantSurt}'.`);
            }
            break;
        default:
            _exhaustiveCheck = dwarfCard.playerSuit;
            throw new Error(`Карта имеющая принадлежность к фракции должна быть добавлена на стол игрока.`);
            return _exhaustiveCheck;
    }
    DeleteBuffFromPlayer({ G, ...rest }, playerID, buffName);
    AddAnyCardToPlayerActions({ G, ...rest }, playerID, dwarfCard);
};
// TODO card: DwarfCard => ?? and asserts it value if no other cards can be valid in moves!?
/**
 * <h3>Выбор активации способности конкретного Гиганта.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Срабатывает при выборе игроком карты Olrun.</li>
 * </ol>
 *
 * @param context
 * @param card Карта Дворфа.
 * @returns
 */
export const ClickGiantAbilityNotCardMove = ({ G, playerID, ...rest }, card) => {
    const isValidMove = IsValidMove({ G, playerID, ...rest }, TavernsResolutionWithSubStageNames.ActivateGiantAbilityOrPickCard, CardMoveNames.ClickGiantAbilityNotCardMove, card);
    if (!isValidMove) {
        return InvalidMoveNames.INVALID_MOVE;
    }
    const player = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError({ G, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
    }
    const stack = player.stack[0];
    if (stack === undefined) {
        return ThrowMyError({ G, ...rest }, ErrorNames.FirstStackActionForPlayerWithCurrentIdIsUndefined, playerID);
    }
    const giant = player.mythologicalCreatureCards.find((card) => card.name === stack.giantName);
    if (giant === undefined) {
        throw new Error(`В массиве карт мифических существ игрока с id '${playerID}' в командной зоне отсутствует карта Гиганта с названием '${stack.giantName}'.`);
    }
    if (!IsGiantCard(giant)) {
        throw new Error(`В массиве карт мифических существ игрока с id '${playerID}' в командной зоне не может быть карта с типом '${giant.type}' вместо типа '${CardRusNames.GiantCard}' с названием '${stack.giantName}'.`);
    }
    giant.capturedCard = card;
    let buffName, _exhaustiveCheck;
    switch (card.playerSuit) {
        case SuitNames.blacksmith:
            if (CheckPlayerHasBuff({ G, ...rest }, playerID, GiantBuffNames.PlayerHasActiveGiantThrivaldi)) {
                buffName = GiantBuffNames.PlayerHasActiveGiantThrivaldi;
                AddBuffToPlayer({ G, ...rest }, playerID, {
                    name: CommonBuffNames.HasOneNotCountHero,
                });
                AddPickHeroAction({ G, ...rest }, playerID, 1);
            }
            else {
                throw new Error(`Игрок с id '${playerID}' должен иметь баф '${GiantBuffNames.PlayerHasActiveGiantThrivaldi}'.`);
            }
            break;
        case SuitNames.explorer:
            if (CheckPlayerHasBuff({ G, ...rest }, playerID, GiantBuffNames.PlayerHasActiveGiantGymir)) {
                buffName = GiantBuffNames.PlayerHasActiveGiantGymir;
            }
            else {
                throw new Error(`Игрок с id '${playerID}' должен иметь баф '${GiantBuffNames.PlayerHasActiveGiantGymir}'.`);
            }
            break;
        case SuitNames.hunter:
            if (CheckPlayerHasBuff({ G, ...rest }, playerID, GiantBuffNames.PlayerHasActiveGiantSkymir)) {
                buffName = GiantBuffNames.PlayerHasActiveGiantSkymir;
                AddActionsToStack({ G, ...rest }, playerID, [AllStackData.getMythologyCardSkymir()]);
            }
            else {
                throw new Error(`Игрок с id '${playerID}' должен иметь баф '${GiantBuffNames.PlayerHasActiveGiantSkymir}'.`);
            }
            break;
        case SuitNames.miner:
            if (CheckPlayerHasBuff({ G, ...rest }, playerID, GiantBuffNames.PlayerHasActiveGiantHrungnir)) {
                buffName = GiantBuffNames.PlayerHasActiveGiantHrungnir;
                AddPlusTwoValueToAllCoinsAction({ G, ...rest }, playerID);
            }
            else {
                throw new Error(`Игрок с id '${playerID}' должен иметь баф '${GiantBuffNames.PlayerHasActiveGiantHrungnir}'.`);
            }
            break;
        case SuitNames.warrior:
            if (CheckPlayerHasBuff({ G, ...rest }, playerID, GiantBuffNames.PlayerHasActiveGiantSurt)) {
                buffName = GiantBuffNames.PlayerHasActiveGiantSurt;
            }
            else {
                throw new Error(`Игрок с id '${playerID}' должен иметь баф '${GiantBuffNames.PlayerHasActiveGiantSurt}'.`);
            }
            break;
        default:
            _exhaustiveCheck = card.playerSuit;
            throw new Error(`Карта имеющая принадлежность к фракции должна быть добавлена на стол игрока.`);
            return _exhaustiveCheck;
    }
    DeleteBuffFromPlayer({ G, ...rest }, playerID, buffName);
};
// TODO suit: SuitNames => string and asserts it value if no other strings can be valid in moves!?
/**
 * <h3>Выбор фракции карты Olrun.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Срабатывает при выборе игроком карты Olrun.</li>
 * </ol>
 *
 * @param context
 * @param suit Фракция дворфов.
 * @returns
 */
export const ChooseSuitOlrunMove = ({ G, playerID, ...rest }, suit) => {
    const isValidMove = IsValidMove({ G, playerID, ...rest }, TavernsResolutionStageNames.ChooseSuitOlrun, SuitMoveNames.ChooseSuitOlrunMove, suit);
    if (!isValidMove) {
        return InvalidMoveNames.INVALID_MOVE;
    }
    const player = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError({ G, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
    }
    AddBuffToPlayer({ G, ...rest }, playerID, {
        name: CommonBuffNames.SuitIdForOlrun,
    }, suit);
};
/**
 * <h3>Выбор карты мифического существа Skymir.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Срабатывает при выборе игроком карты Olrun.</li>
 * </ol>
 *
 * @param context
 * @param cardId Id выбираемой карты Мифического существа.
 * @returns
 */
export const GetMythologyCardMove = ({ G, playerID, ...rest }, cardId) => {
    AssertMythologicalCreatureDeckForSkymirCardId(cardId);
    const isValidMove = IsValidMove({ G, playerID, ...rest }, TavernsResolutionStageNames.GetMythologyCard, CardMoveNames.GetMythologyCardMove, cardId);
    if (!isValidMove) {
        return InvalidMoveNames.INVALID_MOVE;
    }
    if (G.mythologicalCreatureDeckForSkymir === null) {
        throw new Error(`Массив всех карт мифических существ для Skymir не может не быть заполнен картами.`);
    }
    if (G.mythologicalCreatureDeckForSkymir.length < 4) {
        throw new Error(`Массив всех карт мифических существ для Skymir не может иметь меньше 4 карт на момент выбора.`);
    }
    const mythologyCard = G.mythologicalCreatureDeckForSkymir.splice(cardId, 1)[0];
    if (mythologyCard === undefined) {
        throw new Error(`В массиве карт мифических существ для Skymir отсутствует мифическое существо с id '${cardId}'.`);
    }
    AddAnyCardToPlayerActions({ G, ...rest }, playerID, mythologyCard);
    if (G.mythologicalCreatureDeckForSkymir.length === 4) {
        AddActionsToStack({ G, ...rest }, playerID, [AllStackData.getMythologyCardSkymir(3)]);
    }
};
//# sourceMappingURL=MythologicalCreatureMoves.js.map