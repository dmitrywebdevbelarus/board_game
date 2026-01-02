import { ChangeIsOpenedCoinStatus } from "../Coin";
import { ThrowMyError } from "../Error";
import { IsValidMove } from "../MoveValidator";
import { AssertPlayerCoinId } from "../is_helpers/AssertionTypeHelpers";
import { IsCoin } from "../is_helpers/IsCoinTypeHelpers";
import { AutoBotsMoveNames, BidsDefaultStageNames, ErrorNames, GameModeNames, InvalidMoveNames, PlayerIdForSoloGameNames } from "../typescript/enums";
// TODO Add Bot place all coins for human player opened in solo game
/**
 * <h3>Выкладка монет ботами.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Когда ботам нужно выложить все монеты на игровой планшет.</li>
 * </ol>
 *
 * @param context
 * @param coinsOrder Порядок выкладки монет.
 * @returns
 */
export const BotsPlaceAllCoinsMove = ({ G, playerID, ...rest }, 
// TODO Can i make it tuple?!
coinsOrder) => {
    // TODO Check it bot can't play in multiplayer now...
    const isValidMove = IsValidMove({ G, playerID, ...rest }, BidsDefaultStageNames.BotsPlaceAllCoins, AutoBotsMoveNames.BotsPlaceAllCoinsMove, coinsOrder);
    if (!isValidMove) {
        return InvalidMoveNames.INVALID_MOVE;
    }
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
    for (let i = 0; i < player.boardCoins.length; i++) {
        const coinId = coinsOrder[i]
            || handCoins.findIndex((coin, index) => {
                if (coin !== null && !IsCoin(coin)) {
                    throw new Error(`В массиве монет игрока с id '${playerID}' в руке не может быть закрыта для него монета с id '${index}'.`);
                }
                if (IsCoin(coin) && coin.isOpened) {
                    throw new Error(`В массиве монет игрока с id '${playerID}' в руке не может быть ранее открыта монета с id '${index}'.`);
                }
                return IsCoin(coin);
            });
        if (coinId !== -1) {
            AssertPlayerCoinId(coinId);
            const handCoin = handCoins[coinId];
            if (handCoin !== null && !IsCoin(handCoin)) {
                throw new Error(`В массиве монет игрока с id '${playerID}' в руке не может быть закрыта для него монета с id '${coinId}'.`);
            }
            if (IsCoin(handCoin) && handCoin.isOpened) {
                throw new Error(`В массиве монет игрока с id '${playerID}' в руке не может быть ранее открыта монета с id '${coinId}'.`);
            }
            if (G.mode === GameModeNames.Multiplayer) {
                privatePlayer.boardCoins[i] = handCoin;
                player.boardCoins[i] = {
                    value: undefined,
                };
                player.handCoins[i] = null;
            }
            else {
                if (handCoin !== null && (G.mode === GameModeNames.Solo || G.mode === GameModeNames.SoloAndvari)
                    && playerID === PlayerIdForSoloGameNames.HumanPlayerId) {
                    ChangeIsOpenedCoinStatus(handCoin, true);
                }
                player.boardCoins[i] = handCoin;
            }
            handCoins[coinId] = null;
        }
    }
};
//# sourceMappingURL=BotMoves.js.map