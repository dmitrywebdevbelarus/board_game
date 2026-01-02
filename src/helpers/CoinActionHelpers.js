import { UpgradeCoinAction } from "../actions/CoinActions";
import { ChangeIsOpenedCoinStatus } from "../Coin";
import { AllStackData } from "../data/StackData";
import { ThrowMyError } from "../Error";
import { AssertPlayerCoinId } from "../is_helpers/AssertionTypeHelpers";
import { CoinNames, ErrorNames, GameModeNames } from "../typescript/enums";
import { AddActionsToStack } from "./StackHelpers";
/**
 * <h3>Действия, связанные с улучшением монет от действий улучшающих монеты.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При действиях улучшающих монеты.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param coinId Id монеты.
 * @param type Тип обменной монеты.
 * @returns Значение на которое улучшается монета.
 */
export const UpgradeCoinActions = ({ G, ...rest }, playerID, coinId, type) => {
    const player = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError({ G, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
    }
    const stack = player.stack[0];
    if (stack === undefined) {
        return ThrowMyError({ G, ...rest }, ErrorNames.FirstStackActionForPlayerWithCurrentIdIsUndefined, playerID);
    }
    const value = stack.value;
    if (value === undefined) {
        throw new Error(`У игрока с id '${playerID}' в стеке действий отсутствует обязательный параметр 'config.value'.`);
    }
    UpgradeCoinAction({ G, ...rest }, playerID, false, value, coinId, type);
    return value;
};
export const UpgradeNextCoinsHrungnir = ({ G, ...rest }, playerID, coinId) => {
    const player = G.publicPlayers[playerID], privatePlayer = G.players[playerID];
    if (player === undefined) {
        return ThrowMyError({ G, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
    }
    if (privatePlayer === undefined) {
        return ThrowMyError({ G, ...rest }, ErrorNames.PrivatePlayerWithCurrentIdIsUndefined, playerID);
    }
    for (let j = coinId; j < 5; j++) {
        AssertPlayerCoinId(j);
        // TODO Check for Local and Multiplayer games!
        const privateBoardCoin = privatePlayer.boardCoins[j];
        // TODO Check `if (G.mode === GameModeNames.Multiplayer) {`
        if (G.mode === GameModeNames.Multiplayer) {
            // TODO Check if player has coins in hands to continue upgrade!?
            if (privateBoardCoin === null) {
                coinId = j;
                break;
            }
            if (!privateBoardCoin.isOpened) {
                ChangeIsOpenedCoinStatus(privateBoardCoin, true);
            }
            player.boardCoins[j] = privateBoardCoin;
        }
        UpgradeCoinAction({ G, ...rest }, playerID, false, 2, j, CoinNames.Board);
    }
    AddActionsToStack({ G, ...rest }, playerID, [AllStackData.startAddPlusTwoValueToAllCoinsUline(coinId)]);
};
//# sourceMappingURL=CoinActionHelpers.js.map