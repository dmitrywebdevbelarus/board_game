import { ThrowMyError } from "../Error";
import { CheckPlayerHasBuff } from "../helpers/BuffHelpers";
import { RefillEmptyCampCards } from "../helpers/CampHelpers";
import { MixUpCoinsInPlayerHands, ReturnCoinsToPlayerHands } from "../helpers/CoinHelpers";
import { CheckPlayersBasicOrder } from "../helpers/PlayerHelpers";
import { AssertPlayerId } from "../is_helpers/AssertionTypeHelpers";
import { IsCoin } from "../is_helpers/IsCoinTypeHelpers";
import { RefillTaverns } from "../Tavern";
import { ErrorNames, GameModeNames, HeroBuffNames, PlayerIdForSoloGameNames } from "../typescript/enums";
/**
 * <h3>Проверяет необходимость завершения фазы 'Ставки'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При каждом действии с монетой в фазе 'Ставки'.</li>
 * </ol>
 *
 * @param context
 * @returns Необходимость завершения текущей фазы.
 */
export const CheckEndBidsPhase = ({ G, ctx, ...rest }) => {
    if (G.publicPlayersOrder.length && ctx.currentPlayer === ctx.playOrder[ctx.playOrder.length - 1]) {
        const isEveryPlayersHandCoinsEmpty = Object.values(G.publicPlayers).map((player) => player).every((player, playerIndex) => {
            const playerID = String(playerIndex);
            AssertPlayerId(ctx, playerID);
            if ((G.mode === GameModeNames.Solo && PlayerIdForSoloGameNames.SoloBotPlayerId === playerID)
                || (G.mode === GameModeNames.SoloAndvari
                    && PlayerIdForSoloGameNames.SoloBotPlayerId === playerID)
                || (G.mode === GameModeNames.Multiplayer && !CheckPlayerHasBuff({ G, ctx, ...rest }, playerID, HeroBuffNames.EveryTurn))) {
                const playerID = String(playerIndex);
                AssertPlayerId(ctx, playerID);
                const privatePlayer = G.players[playerID];
                if (privatePlayer === undefined) {
                    return ThrowMyError({ G, ctx, ...rest }, ErrorNames.PrivatePlayerWithCurrentIdIsUndefined, playerIndex);
                }
                return privatePlayer.handCoins.every((coin) => coin === null);
            }
            else if ((G.mode === GameModeNames.Solo && PlayerIdForSoloGameNames.HumanPlayerId === playerID)
                || (G.mode === GameModeNames.SoloAndvari && PlayerIdForSoloGameNames.HumanPlayerId === playerID)
                || (G.mode === GameModeNames.Basic && !CheckPlayerHasBuff({ G, ctx, ...rest }, playerID, HeroBuffNames.EveryTurn))) {
                return player.handCoins.every((coin, coinIndex) => {
                    if (coin !== null && !IsCoin(coin)) {
                        throw new Error(`В массиве монет игрока с id '${playerIndex}' в руке не может быть закрыта монета с id '${coinIndex}'.`);
                    }
                    return coin === null;
                });
            }
            return true;
        });
        return isEveryPlayersHandCoinsEmpty;
    }
};
/**
 * <h3>Проверяет необходимость завершения хода в фазе 'Ставки'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При каждом действии с монеткой в фазе 'Ставки'.</li>
 * </ol>
 *
 * @param context
 * @returns Необходимость завершения текущего хода.
 */
export const CheckEndBidsTurn = ({ G, ctx, ...rest }) => {
    const player = G.publicPlayers[ctx.currentPlayer], privatePlayer = G.players[ctx.currentPlayer];
    if (player === undefined) {
        return ThrowMyError({ G, ctx, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, ctx.currentPlayer);
    }
    if (privatePlayer === undefined) {
        return ThrowMyError({ G, ctx, ...rest }, ErrorNames.PrivatePlayerWithCurrentIdIsUndefined, ctx.currentPlayer);
    }
    let handCoins;
    if ((G.mode === GameModeNames.Solo && ctx.currentPlayer === PlayerIdForSoloGameNames.SoloBotPlayerId)
        || (G.mode === GameModeNames.SoloAndvari && ctx.currentPlayer === PlayerIdForSoloGameNames.SoloBotPlayerId)
        || G.mode === GameModeNames.Multiplayer) {
        handCoins = privatePlayer.handCoins;
    }
    else {
        handCoins = player.handCoins;
    }
    const isEveryCoinsInHandsNull = handCoins.every((coin, index) => {
        if (coin !== null && !IsCoin(coin)) {
            throw new Error(`В массиве монет игрока с id '${ctx.currentPlayer}' в руке не может быть закрыта монета с id '${index}'.`);
        }
        return coin === null;
    });
    if (isEveryCoinsInHandsNull) {
        return true;
    }
};
/**
 * <h3>Действия при завершении фазы 'Ставки'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При завершении фазы 'Ставки'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export const EndBidsActions = ({ G }) => {
    G.publicPlayersOrder = [];
};
/**
 * <h3>Действия при начале фазы 'Ставки'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При начале фазы 'Ставки'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export const PreparationPhaseActions = ({ G, ...rest }) => {
    G.round++;
    G.currentTavern = 0;
    if (G.round !== 0) {
        ReturnCoinsToPlayerHands({ G, ...rest });
    }
    if (G.expansions.Thingvellir.active) {
        RefillEmptyCampCards({ G, ...rest });
    }
    RefillTaverns({ G, ...rest });
    MixUpCoinsInPlayerHands({ G, ...rest });
    CheckPlayersBasicOrder({ G, ...rest });
};
//# sourceMappingURL=BidsHooks.js.map