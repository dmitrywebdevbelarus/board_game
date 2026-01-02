import { ChangeIsOpenedCoinStatus } from "../Coin";
import { ThrowMyError } from "../Error";
import { AssertAllCoinsValue, AssertAllPriorityValue, AssertExchangeOrderArray, AssertPlayerCoinId, AssertPlayerCoinNumberValues, AssertPlayerId, AssertPrivateHandCoins, AssertResolvedPlayersOrderArray, AssertRoyalCoinValue } from "../is_helpers/AssertionTypeHelpers";
import { IsCoin, IsTriggerTradingCoin } from "../is_helpers/IsCoinTypeHelpers";
import { AddDataToLog } from "../Logging";
import { CoinNames, ErrorNames, GameModeNames, HeroBuffNames, LogNames, PlayerIdForSoloGameNames, ValkyryBuffNames } from "../typescript/enums";
import type { AllCoins, AllCoinsValue, CanBeUndef, CanBeZeroPlayerCoinNumberValues, Coin, CoinNumberValues, Context, PlayerCoinId, PlayerCoinNumberValues, PlayerHandCoins, PlayerID, Priority, PrivatePlayer, PublicPlayer, PublicPlayerCoin, ResolveBoardCoins, RoyalCoinValue } from "../typescript/interfaces";
import { CheckPlayerHasBuff } from "./BuffHelpers";
import { RemoveCoinFromPlayer } from "./DiscardCoinHelpers";
import { CheckValkyryRequirement } from "./MythologicalCreatureHelpers";

/**
 * <h3>Сброс обменной монеты.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце 1-й эпохи, когда получается преимущество по фракции охотников (обмен '0' на '3').</li>
 * <li>Действия, связанные со сбросом обменной монеты по карте артефакта Jarnglofi.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @returns Тип и индекс сбрасываемой обменной монеты.
 */
export const DiscardTradingCoin = (
    { G, ...rest }: Context,
    playerID: PlayerID,
): [
        CoinNames,
        PlayerCoinId,
    ] => {
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
    let handCoins: PlayerHandCoins;
    if (G.mode === GameModeNames.Multiplayer) {
        handCoins = privatePlayer.handCoins;
    } else {
        handCoins = player.handCoins;
    }
    let tradingCoinIndex: number = player.boardCoins.findIndex((coin: PublicPlayerCoin): boolean =>
        IsTriggerTradingCoin(coin)),
        type: CoinNames = CoinNames.Board;
    if (tradingCoinIndex === -1 && G.mode === GameModeNames.Multiplayer) {
        tradingCoinIndex = privatePlayer.boardCoins.findIndex((coin: Coin, index: number): boolean => {
            if (coin !== null && !IsCoin(coin)) {
                throw new Error(`В массиве монет приватного игрока с id '${playerID}' на столе не может быть закрыта монета с id '${index}'.`);
            }
            return IsTriggerTradingCoin(coin);
        });
    }
    if ((G.mode === GameModeNames.Basic || G.mode === GameModeNames.Multiplayer) && tradingCoinIndex === -1
        && CheckPlayerHasBuff(
            { G, ...rest },
            playerID,
            HeroBuffNames.EveryTurn,
        )) {
        tradingCoinIndex = handCoins.findIndex((coin: PublicPlayerCoin, index: number): boolean => {
            if (coin !== null && !IsCoin(coin)) {
                throw new Error(`В массиве монет игрока с id '${playerID}' в руке не может быть закрыта монета с id '${index}'.`);
            }
            return IsTriggerTradingCoin(coin);
        });
        if (tradingCoinIndex === -1) {
            throw new Error(`В массиве монет игрока с id '${playerID}' в руке отсутствует обменная монета при наличии бафа '${HeroBuffNames.EveryTurn}'.`);
        }
        type = CoinNames.Hand;
        AssertPlayerCoinId(tradingCoinIndex);
        RemoveCoinFromPlayer(
            { G, ...rest },
            playerID,
            handCoins,
            tradingCoinIndex,
        );
        if (G.mode === GameModeNames.Multiplayer) {
            RemoveCoinFromPlayer(
                { G, ...rest },
                playerID,
                player.handCoins,
                tradingCoinIndex,
                true,
            );
        }
    } else {
        if (tradingCoinIndex === -1) {
            throw new Error(`У игрока с id '${playerID}' на столе не может отсутствовать обменная монета.`);
        }
        AssertPlayerCoinId(tradingCoinIndex);
        if (G.mode === GameModeNames.Multiplayer) {
            RemoveCoinFromPlayer(
                { G, ...rest },
                playerID,
                privatePlayer.boardCoins,
                tradingCoinIndex,
                true,
            );
        }
        RemoveCoinFromPlayer(
            { G, ...rest },
            playerID,
            player.boardCoins,
            tradingCoinIndex,
        );
    }
    return [
        type,
        tradingCoinIndex,
    ];
};

/**
 * <h3>Находит максимальную монету игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце игры, если выбран герой Астрид.</li>
 * <li>В конце игры, если получено преимущество по фракции воинов.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @returns Максимальная монета игрока.
 */
export const GetMaxCoinValue = (
    { G, ...rest }: Context,
    playerID: PlayerID,
): RoyalCoinValue => {
    const player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError(
            { G, ...rest },
            ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
            playerID,
        );
    }
    const coinMaxValue: number =
        Math.max(...player.boardCoins.filter(IsCoin).map((coin: AllCoins,
            index: number): number => {
            if (!coin.isOpened) {
                throw new Error(`В массиве монет игрока '${player.nickname}' на поле не может быть ранее не открыта монета с id '${index}'.`);
            }
            return coin.value;
        }));
    AssertRoyalCoinValue(coinMaxValue);
    return coinMaxValue;
};

/**
 * <h3>Открывает закрытые монеты на столе игроков.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце игры, когда нужно открыть все закрытые монеты всех игроков.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @returns
 */
export const OpenClosedCoinsOnPlayerBoard = (
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
    for (let j = 0; j < player.boardCoins.length; j++) {
        AssertPlayerCoinId(j);
        const privateBoardCoin: Coin = privatePlayer.boardCoins[j];
        if (G.mode === GameModeNames.Multiplayer) {
            if (IsCoin(privateBoardCoin)) {
                if (!privateBoardCoin.isOpened) {
                    ChangeIsOpenedCoinStatus(
                        privateBoardCoin,
                        true,
                    );
                }
                player.boardCoins[j] = privateBoardCoin;
            }
        }
        const publicBoardCoin: PublicPlayerCoin = player.boardCoins[j];
        if (publicBoardCoin !== null && !IsCoin(publicBoardCoin)) {
            throw new Error(`В массиве монет публичного игрока с id '${playerID}' на поле не может быть закрыта монета с id '${j}'.`);
        }
        if (IsCoin(publicBoardCoin)) {
            if (!publicBoardCoin.isOpened) {
                ChangeIsOpenedCoinStatus(
                    publicBoardCoin,
                    true,
                );
            }
        }
    }
};

/**
 * <h3>Открывает закрытые монеты текущей таверны на столе игроков.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В момент игры, когда нужно открыть все закрытые монеты текущей таверны всех игроков в фазу 'Смотр войск'.</li>
 * <li>В момент игры, когда нужно открыть все закрытые монеты текущей таверны всех игроков в фазу 'Ставки Улина'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export const OpenCurrentTavernClosedCoinsOnPlayerBoard = (
    { G, ctx, ...rest }: Context,
): void => {
    Object.values(G.publicPlayers).forEach((player: PublicPlayer, index: number): void => {
        if (G.mode === GameModeNames.Multiplayer || (G.mode === GameModeNames.Solo && index === 1)
            || (G.mode === GameModeNames.SoloAndvari && index === 1)) {
            const playerID: string = String(index);
            AssertPlayerId(ctx, playerID);
            const privatePlayer: CanBeUndef<PrivatePlayer> = G.players[playerID];
            if (privatePlayer === undefined) {
                return ThrowMyError(
                    { G, ctx, ...rest },
                    ErrorNames.PrivatePlayerWithCurrentIdIsUndefined,
                    index,
                );
            }
            const privateBoardCoin: Coin = privatePlayer.boardCoins[G.currentTavern];
            if (privateBoardCoin !== null && !privateBoardCoin.isOpened) {
                ChangeIsOpenedCoinStatus(
                    privateBoardCoin,
                    true,
                );
            }
            player.boardCoins[G.currentTavern] = privateBoardCoin;
        } else {
            const publicBoardCoin: PublicPlayerCoin = player.boardCoins[G.currentTavern];
            if (publicBoardCoin !== null && !IsCoin(publicBoardCoin)) {
                throw new Error(`В массиве монет игрока с id '${index}' в руке не может быть закрыта монета текущей таверны с id '${G.currentTavern}'.`);
            }
            if (publicBoardCoin !== null && !publicBoardCoin.isOpened) {
                ChangeIsOpenedCoinStatus(
                    publicBoardCoin,
                    true,
                );
            }
        }
    });
};

/**
 * <h3>Определяет по расположению монет игроками порядок ходов и порядок обмена кристаллов приоритета.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>После выкладки всех монет игроками.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @returns Порядок ходов игроков & порядок изменения ходов игроками.
 */
export const ResolveAllBoardCoins = (
    { G, ctx, ...rest }: Context,
): ResolveBoardCoins => {
    const playersOrderNumbers: PlayerID[] = [],
        coinValues: AllCoinsValue[] = [],
        exchangeOrder: PlayerID[] = [];
    for (let i = 0; i < ctx.numPlayers; i++) {
        const playerID: string = String(i);
        AssertPlayerId(ctx, playerID);
        const playerI: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
        if (playerI === undefined) {
            return ThrowMyError(
                { G, ctx, ...rest },
                ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
                i,
            );
        }
        const coin: PublicPlayerCoin = playerI.boardCoins[G.currentTavern];
        exchangeOrder.push(playerID);
        if (IsCoin(coin)) {
            coinValues[i] = coin.value;
            playersOrderNumbers.push(playerID);
        }
        for (let j: number = playersOrderNumbers.length - 1; j > 0; j--) {
            const playersOrderNumberCur: CanBeUndef<PlayerID> = playersOrderNumbers[j],
                playersOrderNumberPrev: CanBeUndef<PlayerID> = playersOrderNumbers[j - 1];
            if (playersOrderNumberCur === undefined) {
                throw new Error(`В массиве порядка хода игроков отсутствует текущий с id '${j}'.`);
            }
            if (playersOrderNumberPrev === undefined) {
                throw new Error(`В массиве порядка хода игроков отсутствует предыдущий с id '${j - 1}'.`);
            }
            const playerCur: CanBeUndef<PublicPlayer> = G.publicPlayers[playersOrderNumberCur],
                playerPrev: CanBeUndef<PublicPlayer> = G.publicPlayers[playersOrderNumberPrev];
            if (playerCur === undefined) {
                return ThrowMyError(
                    { G, ctx, ...rest },
                    ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
                    playersOrderNumberCur,
                );
            }
            if (playerPrev === undefined) {
                return ThrowMyError(
                    { G, ctx, ...rest },
                    ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
                    playersOrderNumberPrev,
                );
            }
            const coin: PublicPlayerCoin = playerCur.boardCoins[G.currentTavern],
                prevCoin: PublicPlayerCoin = playerPrev.boardCoins[G.currentTavern];
            if (IsCoin(coin) && IsCoin(prevCoin)) {
                if (coin.value > prevCoin.value) {
                    [playersOrderNumbers[j], playersOrderNumbers[j - 1]] =
                        [playersOrderNumberPrev, playersOrderNumberCur];
                } else if (coin.value === prevCoin.value) {
                    const priority: Priority = playerCur.priority,
                        prevPriority: Priority = playerPrev.priority;
                    if (priority.value > prevPriority.value) {
                        [playersOrderNumbers[j], playersOrderNumbers[j - 1]] =
                            [playersOrderNumberPrev, playersOrderNumberCur];
                    }
                } else {
                    break;
                }
            }
        }
    }
    const counts: CoinNumberValues<PlayerCoinNumberValues> = {};
    for (let i = 0; i < coinValues.length; i++) {
        const coinValue: CanBeUndef<AllCoinsValue> = coinValues[i];
        if (coinValue !== undefined) {
            const value: CanBeZeroPlayerCoinNumberValues = counts[coinValue] ?? 0,
                newValue: number = 1 + value;
            AssertPlayerCoinNumberValues(newValue);
            counts[coinValue] = newValue;
        }
    }
    for (const prop in counts) {
        const coinsValue = Number(prop);
        AssertAllCoinsValue(coinsValue);
        const value: CanBeUndef<PlayerCoinNumberValues> = counts[coinsValue];
        if (value === undefined) {
            throw new Error(`В массиве значений монет отсутствует с id '${prop}'.`);
        }
        if (value <= 1) {
            continue;
        }
        const tiePlayers: PublicPlayer[] =
            Object.values(G.publicPlayers).filter((player: PublicPlayer, index: number): boolean => {
                const boardCoinCurrentTavern: PublicPlayerCoin = player.boardCoins[G.currentTavern];
                if (boardCoinCurrentTavern !== null && !IsCoin(boardCoinCurrentTavern)) {
                    throw new Error(`В массиве монет игрока с id '${index}' не может быть закрыта монета текущей таверны с id '${G.currentTavern}'.`);
                }
                return boardCoinCurrentTavern?.value === Number(prop) && player.priority.isExchangeable;
            });
        while (tiePlayers.length > 1) {
            // TODO Add types for all `number`!?
            const tiePlayersPriorities: number[] =
                tiePlayers.map((player: PublicPlayer): number => player.priority.value),
                maxPriority: number = Math.max(...tiePlayersPriorities),
                minPriority: number = Math.min(...tiePlayersPriorities);
            AssertAllPriorityValue(maxPriority);
            AssertAllPriorityValue(minPriority);
            const maxIndex: number =
                Object.values(G.publicPlayers).findIndex((player: PublicPlayer): boolean =>
                    player.priority.value === maxPriority),
                minIndex: number =
                    Object.values(G.publicPlayers).findIndex((player: PublicPlayer): boolean =>
                        player.priority.value === minPriority),
                amount = 1,
                removedTiePlayersWithMaxPriority: PublicPlayer[] =
                    tiePlayers.splice(tiePlayers.findIndex((player: PublicPlayer): boolean =>
                        player.priority.value === maxPriority), amount),
                removedTiePlayersWithMinPriority: PublicPlayer[] =
                    tiePlayers.splice(tiePlayers.findIndex((player: PublicPlayer): boolean =>
                        player.priority.value === minPriority), amount);
            if (amount !== removedTiePlayersWithMaxPriority.length) {
                throw new Error(`Недостаточно игроков в массиве игроков с максимальным приоритетом: требуется - '${amount}', в наличии - '${removedTiePlayersWithMaxPriority.length}'.`);
            }
            if (amount !== removedTiePlayersWithMinPriority.length) {
                throw new Error(`Недостаточно игроков в массиве игроков с минимальным приоритетом: требуется - '${amount}', в наличии - '${removedTiePlayersWithMinPriority.length}'.`);
            }
            const exchangeOrderMax: CanBeUndef<PlayerID> = exchangeOrder[maxIndex],
                exchangeOrderMin: CanBeUndef<PlayerID> = exchangeOrder[minIndex];
            if (exchangeOrderMax === undefined) {
                throw new Error(`В массиве изменений порядка хода игроков отсутствует максимальная '${exchangeOrder[maxIndex]}' с id '${maxIndex}'.`);
            }
            if (exchangeOrderMin === undefined) {
                throw new Error(`В массиве изменений порядка хода игроков отсутствует минимальная '${exchangeOrder[minIndex]}'  с id '${minIndex}'.`);
            }
            [exchangeOrder[minIndex], exchangeOrder[maxIndex]] = [exchangeOrderMax, exchangeOrderMin];
        }
    }
    const playersOrder: PlayerID[] = playersOrderNumbers.map((index: PlayerID): PlayerID => index);
    AssertResolvedPlayersOrderArray(playersOrder);
    if (G.expansions.Idavoll.active) {
        const firstPlayer: PlayerID = playersOrder[0];
        CheckValkyryRequirement(
            { G, ctx, ...rest },
            firstPlayer,
            ValkyryBuffNames.CountBidWinnerAmount,
        );
    }
    AssertExchangeOrderArray(exchangeOrder);
    return {
        playersOrder,
        exchangeOrder,
    };
};

/**
 * <h3>Возвращает все монеты игрока из руки на стол при наличии героя Улина.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При завершении игры.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @returns
 */
export const ReturnCoinsFromPlayerHandsToPlayerBoard = (
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
    let handCoins: PlayerHandCoins;
    if (G.mode === GameModeNames.Multiplayer) {
        handCoins = privatePlayer.handCoins;
    } else {
        handCoins = player.handCoins;
    }
    for (let i = 0; i < handCoins.length; i++) {
        AssertPlayerCoinId(i);
        const handCoin: PublicPlayerCoin = handCoins[i];
        if (handCoin !== null && !IsCoin(handCoin)) {
            throw new Error(`В массиве монет игрока с id '${playerID}' в руке не может быть закрыта монета с id '${i}'.`);
        }
        if (IsCoin(handCoin)) {
            const tempCoinId: number = player.boardCoins.indexOf(null);
            if (tempCoinId !== -1) {
                AssertPlayerCoinId(tempCoinId);
                if (!handCoin.isOpened) {
                    ChangeIsOpenedCoinStatus(handCoin, true);
                }
                if (G.mode === GameModeNames.Multiplayer) {
                    privatePlayer.boardCoins[tempCoinId] = handCoin;
                    player.handCoins[i] = null;
                }
                player.boardCoins[tempCoinId] = handCoin;
                handCoins[i] = null;
            }
        }
    }
};

// TODO Do coins return to Solo Bot hands in private and closed for all!
/**
 * <h3>Возвращает все монеты со стола в руки игроков в начале фазы выставления монет.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В начале фазы выставления монет.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export const ReturnCoinsToPlayerHands = (
    { G, ctx, ...rest }: Context,
): void => {
    for (let i = 0; i < ctx.numPlayers; i++) {
        const playerID: string = String(i);
        AssertPlayerId(ctx, playerID);
        const player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID],
            privatePlayer: CanBeUndef<PrivatePlayer> = G.players[playerID];
        if (player === undefined) {
            return ThrowMyError(
                { G, ctx, ...rest },
                ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
                i,
            );
        }
        if (privatePlayer === undefined) {
            return ThrowMyError(
                { G, ctx, ...rest },
                ErrorNames.PrivatePlayerWithCurrentIdIsUndefined,
                i,
            );
        }
        if ((G.mode === GameModeNames.Basic || G.mode === GameModeNames.Multiplayer) && CheckPlayerHasBuff(
            { G, ctx, ...rest },
            playerID,
            HeroBuffNames.EveryTurn,
        )) {
            for (let j = 0; j < player.handCoins.length; j++) {
                AssertPlayerCoinId(j);
                const handCoin: PublicPlayerCoin = player.handCoins[j];
                if (IsCoin(handCoin) && handCoin.isOpened) {
                    ChangeIsOpenedCoinStatus(handCoin, false);
                }
                if (G.mode === GameModeNames.Multiplayer) {
                    if (IsCoin(handCoin)) {
                        player.handCoins[j] = {
                            value: undefined,
                        };
                        privatePlayer.handCoins[j] = handCoin;
                    }
                }
            }
        }
        for (let j = 0; j < player.boardCoins.length; j++) {
            AssertPlayerCoinId(j);
            const isCoinReturned: boolean =
                ReturnCoinToPlayerHands(
                    { G, ctx, ...rest },
                    playerID,
                    j,
                    true,
                );
            if (!isCoinReturned) {
                break;
            }
        }
    }
    AddDataToLog(
        { G, ctx, ...rest },
        LogNames.Game,
        `Все монеты вернулись в руки игроков.`,
    );
};

/**
 * <h3>Возвращает указанную монету в руку игрока, если она ещё не в руке.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При возврате всех монет в руку в начале фазы выставления монет.</li>
 * <li>При возврате монет в руку, когда взят герой Улина.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param coinId Id монеты.
 * @param close Нужно ли закрыть монету.
 * @returns Вернулась ли монета в руку.
 */
export const ReturnCoinToPlayerHands = (
    { G, ...rest }: Context,
    playerID: PlayerID,
    coinId: PlayerCoinId,
    close: boolean,
): boolean => {
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
    let handCoins: PlayerHandCoins;
    if (G.mode === GameModeNames.Multiplayer || (G.mode === GameModeNames.Solo
        && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId)
        || (G.mode === GameModeNames.SoloAndvari && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId)) {
        handCoins = privatePlayer.handCoins;
    } else {
        handCoins = player.handCoins;
    }
    const tempCoinId: number = handCoins.indexOf(null);
    if (tempCoinId === -1) {
        return false;
    }
    AssertPlayerCoinId(tempCoinId);
    const coin: PublicPlayerCoin = player.boardCoins[coinId];
    if (IsCoin(coin)) {
        if (G.mode === GameModeNames.Multiplayer || (G.mode === GameModeNames.Solo
            && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId)
            || (G.mode === GameModeNames.SoloAndvari && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId)) {
            if (!coin.isOpened) {
                throw new Error(`В массиве монет игрока с id '${playerID}' на поле не может быть ранее не открыта монета с id '${coinId}'.`);
            }
        }
        if (close && coin.isOpened) {
            ChangeIsOpenedCoinStatus(coin, false);
        }
        handCoins[tempCoinId] = coin;
    } else {
        if (G.mode === GameModeNames.Multiplayer || (G.mode === GameModeNames.Solo
            && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId)
            || (G.mode === GameModeNames.SoloAndvari && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId)) {
            const privateBoardCoin: PublicPlayerCoin = privatePlayer.boardCoins[coinId];
            if (IsCoin(privateBoardCoin)) {
                if (close && privateBoardCoin.isOpened) {
                    ChangeIsOpenedCoinStatus(
                        privateBoardCoin,
                        false,
                    );
                }
                handCoins[tempCoinId] = privateBoardCoin;
            }
        }
    }
    if (G.mode === GameModeNames.Multiplayer || (G.mode === GameModeNames.Solo
        && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId)
        || (G.mode === GameModeNames.SoloAndvari && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId)) {
        if (close) {
            player.handCoins[tempCoinId] = {
                value: undefined,
            };
        } else {
            player.handCoins[tempCoinId] = coin;
        }
        privatePlayer.boardCoins[coinId] = null;
    }
    player.boardCoins[coinId] = null;
    return true;
};

/**
 * <h3>Рандомизирует монеты в руке игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В момент подготовки к новому раунду.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @returns
 */
const MixUpCoins = (
    { G, random, ...rest }: Context,
    playerID: PlayerID,
): void => {
    const privatePlayer: CanBeUndef<PrivatePlayer> = G.players[playerID];
    if (privatePlayer === undefined) {
        return ThrowMyError(
            { G, random, ...rest },
            ErrorNames.PrivatePlayerWithCurrentIdIsUndefined,
            playerID,
        );
    }
    const handCoins: Coin[] = random.Shuffle(privatePlayer.handCoins);
    AssertPrivateHandCoins(handCoins);
    privatePlayer.handCoins = handCoins;
};

/**
 * <h3>Начинает рандомизацию монет в руке игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В момент подготовки к новому раунду.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export const MixUpCoinsInPlayerHands = (
    { G, ctx, ...rest }: Context,
): void => {
    if (G.mode === GameModeNames.Multiplayer) {
        for (let p = 0; p < ctx.numPlayers; p++) {
            const playerID: string = String(p);
            AssertPlayerId(ctx, playerID);
            MixUpCoins(
                { G, ctx, ...rest },
                playerID,
            );
        }
    } else if (G.mode === GameModeNames.Solo || G.mode === GameModeNames.SoloAndvari) {
        MixUpCoins(
            { G, ctx, ...rest },
            PlayerIdForSoloGameNames.SoloBotPlayerId,
        );
    }
};
