import { ChangeIsOpenedCoinStatus } from "../Coin";
import { AllStackData } from "../data/StackData";
import { ThrowMyError } from "../Error";
import { CheckPlayerHasBuff } from "../helpers/BuffHelpers";
import { DiscardTradingCoin } from "../helpers/CoinHelpers";
import { CheckIsStartUseGodAbility } from "../helpers/GodAbilityHelpers";
import { AddActionsToStack } from "../helpers/StackHelpers";
import { AssertCoinsOnPouchNumber, AssertPlayerCoinId, AssertPlayerCoinsNumber, AssertPlayerId, AssertVidofnirVedrfolnirCoinsValue } from "../is_helpers/AssertionTypeHelpers";
import { IsCoin, IsTriggerTradingCoin } from "../is_helpers/IsCoinTypeHelpers";
import { AddDataToLog } from "../Logging";
import { CommonStageNames, ErrorNames, GameModeNames, GodNames, HeroBuffNames, LogNames, SuitNames } from "../typescript/enums";
/**
 * <h3>Действия, связанные со сбросом обменной монеты.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе карты артефакта Jarnglofi.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @returns
 */
export const DiscardTradingCoinAction = ({ G, ...rest }, playerID) => {
    const player = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError({ G, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
    }
    DiscardTradingCoin({ G, ...rest }, playerID);
    AddDataToLog({ G, ...rest }, LogNames.Game, `Игрок '${player.nickname}' сбросил монету активирующую обмен.`);
};
/**
 * <h3>Действия, связанные с завершением выкладки монет на артефакт Odroerir The Mythic Cauldron.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе карты лагеря артефакта Odroerir The Mythic Cauldron.</li>
 * </ol>
 *
 * @param G
 * @returns
 */
export const FinishOdroerirTheMythicCauldronAction = ({ G }) => {
    G.odroerirTheMythicCauldron = false;
};
/**
 * <h3>Старт действия, связанные с сбросом карты из конкретной фракции игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе карты артефакта Hofud.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export const StartDiscardSuitCardAction = ({ G, ctx, events, ...rest }) => {
    // TODO Can i rework it!?
    const value = {};
    let results = 0;
    for (let i = 0; i < ctx.numPlayers; i++) {
        const playerID = String(i);
        AssertPlayerId(ctx, playerID);
        const player = G.publicPlayers[playerID];
        if (player === undefined) {
            return ThrowMyError({ G, ctx, events, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, i);
        }
        if (playerID !== ctx.currentPlayer && player.cards[SuitNames.warrior].length) {
            if (!(G.expansions.Idavoll.active && CheckIsStartUseGodAbility({ G, ctx, events, ...rest }, playerID, GodNames.Thor))) {
                value[playerID] = {
                    stage: CommonStageNames.DiscardSuitCardFromPlayerBoard,
                };
                AddActionsToStack({ G, ctx, events, ...rest }, playerID, [
                    AllStackData.discardSuitCard(playerID),
                ]);
                results++;
            }
        }
    }
    if (results) {
        events === null || events === void 0 ? void 0 : events.setActivePlayers({
            value,
            minMoves: 1,
            maxMoves: 1,
        });
    }
    else {
        // TODO Check it work ok if 1 player who pick Hofud has all warriors cards or all others warrior cards in discard!
        AddDataToLog({ G, ctx, events, ...rest }, LogNames.Game, `Нет игроков с картами во фракции '${SuitNames.warrior}'.`);
    }
};
/**
 * <h3>Действия, связанные со стартом способности артефакта Vidofnir Vedrfolnir.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При старте способности карты артефакта Vidofnir Vedrfolnir.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @returns
 */
export const StartVidofnirVedrfolnirAction = ({ G, ...rest }, playerID) => {
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
    let isStart = true;
    if (CheckPlayerHasBuff({ G, ...rest }, playerID, HeroBuffNames.EveryTurn)) {
        const noCoinsOnPouchNumber = player.boardCoins.filter((coin, index) => index >= G.tavernsNum && coin === null).length;
        AssertCoinsOnPouchNumber(noCoinsOnPouchNumber);
        const handCoinsNumber = handCoins.filter(IsCoin).length;
        AssertPlayerCoinsNumber(handCoinsNumber);
        if (noCoinsOnPouchNumber > 0 && noCoinsOnPouchNumber < 3 && handCoinsNumber >= noCoinsOnPouchNumber) {
            for (let i = 0; i < noCoinsOnPouchNumber; i++) {
                AddActionsToStack({ G, ...rest }, playerID, [
                    AllStackData.addCoinToPouch(),
                ]);
            }
            isStart = false;
        }
        else if (noCoinsOnPouchNumber !== 0 && handCoinsNumber < noCoinsOnPouchNumber) {
            throw new Error(`При наличии бафа '${HeroBuffNames.EveryTurn}' всегда должно быть столько действий добавления монет в кошель, сколько ячеек для монет в кошеле пустые.`);
        }
    }
    if (isStart) {
        let coinsValue = 0, stack = [];
        for (let j = G.tavernsNum; j < player.boardCoins.length; j++) {
            AssertPlayerCoinId(j);
            let boardCoin;
            if (G.mode === GameModeNames.Multiplayer) {
                boardCoin = privatePlayer.boardCoins[j];
                const publicBoardCoin = player.boardCoins[j];
                if (IsCoin(boardCoin) && publicBoardCoin !== null && !IsCoin(publicBoardCoin)) {
                    if (!boardCoin.isOpened) {
                        ChangeIsOpenedCoinStatus(boardCoin, true);
                    }
                    player.boardCoins[j] = boardCoin;
                }
            }
            else {
                boardCoin = player.boardCoins[j];
                if (boardCoin !== null && !IsCoin(boardCoin)) {
                    throw new Error(`В массиве монет игрока с id '${playerID}' на поле не должна быть закрыта монета в кошеле с id '${j}'.`);
                }
                if (boardCoin !== null && !boardCoin.isOpened) {
                    ChangeIsOpenedCoinStatus(boardCoin, true);
                }
            }
            if (IsCoin(boardCoin) && !IsTriggerTradingCoin(boardCoin)) {
                coinsValue++;
            }
        }
        AssertVidofnirVedrfolnirCoinsValue(coinsValue);
        if (coinsValue === 1) {
            stack = [AllStackData.startChooseCoinValueForVidofnirVedrfolnirUpgrade([5])];
        }
        else if (coinsValue === 2) {
            stack = [AllStackData.startChooseCoinValueForVidofnirVedrfolnirUpgrade([2, 3])];
        }
        AddActionsToStack({ G, ...rest }, playerID, stack);
    }
};
//# sourceMappingURL=CampAutoActions.js.map