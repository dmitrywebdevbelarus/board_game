import { ChangeIsOpenedCoinStatus } from "../Coin";
import { ThrowMyError } from "../Error";
import { CheckPlayerHasBuff } from "../helpers/BuffHelpers";
import { UpgradeNextCoinsHrungnir } from "../helpers/CoinActionHelpers";
import { AssertPlayerCoinId } from "../is_helpers/AssertionTypeHelpers";
import { CoinNames, ErrorNames, GameModeNames, HeroBuffNames } from "../typescript/enums";
import type { ActionFunctionWithoutParams, CanBeUndef, Coin, Context, PlayerID, PrivatePlayer, PublicPlayer, PublicPlayerCoin } from "../typescript/interfaces";
import { UpgradeCoinAction } from "./CoinActions";

/**
 * <h3>Действия, связанные с улучшением всех монет игрока на +2 Hrungnir.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При активации способности Гиганта Hrungnir.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export const AddPlusTwoValueToAllCoinsAction: ActionFunctionWithoutParams = (
    { G, ...rest }: Context,
    playerID: PlayerID,
): void => {
    const player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID],
        privatePlayer: CanBeUndef<PrivatePlayer> = G.players[playerID];
    if (player === undefined) {
        return ThrowMyError(
            { G, ...rest },
            ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
            playerID,
        );
    }
    if (privatePlayer === undefined) {
        return ThrowMyError(
            { G, ...rest },
            ErrorNames.PrivatePlayerWithCurrentIdIsUndefined,
            playerID,
        );
    }
    for (let j = 0; j < 5; j++) {
        AssertPlayerCoinId(j);
        // TODO Check for Local and Multiplayer games!
        const privateBoardCoin: Coin = privatePlayer.boardCoins[j];
        let publicBoardCoin: PublicPlayerCoin = player.boardCoins[j];
        // TODO Check `if (G.mode === GameModeNames.Multiplayer) {`
        if (G.mode === GameModeNames.Multiplayer) {
            if (privateBoardCoin !== null) {
                if (!privateBoardCoin.isOpened) {
                    ChangeIsOpenedCoinStatus(privateBoardCoin, true);
                }
                publicBoardCoin = privateBoardCoin;
            }
        }
        // TODO Duplicate opening
        // if (!publicBoardCoin.isOpened) {
        //     ChangeIsOpenedCoinStatus(publicBoardCoin, true);
        // }
        if (publicBoardCoin !== null) {
            UpgradeCoinAction(
                { G, ...rest },
                playerID,
                false,
                2,
                j,
                CoinNames.Board,
            );
        }
    }
    if (CheckPlayerHasBuff(
        { G, ...rest },
        playerID,
        HeroBuffNames.EveryTurn,
    )) {
        UpgradeNextCoinsHrungnir(
            { G, ...rest },
            playerID,
            0,
        );
    }
};
