import { AllStackData } from "../data/StackData";
import { ThrowMyError } from "../Error";
import { DrawCurrentProfit } from "../helpers/ActionHelpers";
import { CheckPlayerHasBuff } from "../helpers/BuffHelpers";
import { EndTurnActions, RemoveThrudFromPlayerBoardAfterGameEnd, StartOrEndActions } from "../helpers/GameHooksHelpers";
import { AddActionsToStack } from "../helpers/StackHelpers";
import { AssertPlayerId, AssertPublicPlayersOrderArray } from "../is_helpers/AssertionTypeHelpers";
import { IsMercenaryCampCard } from "../is_helpers/IsCampTypeHelpers";
import { ErrorNames, HeroBuffNames } from "../typescript/enums";
import type { CanBeUndef, CanBeVoid, Context, PlayerID, PublicPlayer, Stack } from "../typescript/interfaces";

/**
 * <h3>Проверяет необходимость завершения фазы 'enlistmentMercenaries'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При каждом действии с наёмником в фазе 'enlistmentMercenaries'.</li>
 * </ol>
 *
 * @param context
 * @returns Необходимость завершения текущей фазы.
 */
export const CheckEndEnlistmentMercenariesPhase = (
    { G, ctx, ...rest }: Context,
): CanBeVoid<true> => {
    if (G.publicPlayersOrder.length) {
        const player: CanBeUndef<PublicPlayer> = G.publicPlayers[ctx.currentPlayer];
        if (player === undefined) {
            return ThrowMyError(
                { G, ctx, ...rest },
                ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
                ctx.currentPlayer,
            );
        }
        if (ctx.currentPlayer === ctx.playOrder[ctx.playOrder.length - 1] && !player.stack.length) {
            let allMercenariesPlayed = true;
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
                allMercenariesPlayed = playerI.campCards.filter(IsMercenaryCampCard).length === 0;
                if (!allMercenariesPlayed) {
                    break;
                }
            }
            if (allMercenariesPlayed) {
                return true;
            }
        }
    }
};

/**
 * <h3>Проверяет необходимость завершения хода в фазе 'enlistmentMercenaries'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При каждом действии в фазе 'enlistmentMercenaries'.</li>
 * </ol>
 *
 * @param context
 * @returns Необходимость завершения текущего хода.
 */
export const CheckEndEnlistmentMercenariesTurn = (
    { G, ctx, ...rest }: Context,
): CanBeVoid<boolean> => {
    const player: CanBeUndef<PublicPlayer> = G.publicPlayers[ctx.currentPlayer];
    if (player === undefined) {
        return ThrowMyError(
            { G, ctx, ...rest },
            ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
            ctx.currentPlayer,
        );
    }
    if (ctx.currentPlayer === ctx.playOrder[0] && Number(ctx.numMoves) === 1 && !player.stack.length) {
        return EndTurnActions({ G, ctx, ...rest });
    } else if (!player.stack.length) {
        return player.campCards.filter(IsMercenaryCampCard).length === 0;
    }
};

/**
 * <h3>Действия при завершении фазы 'enlistmentMercenaries'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При завершении фазы 'enlistmentMercenaries'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export const EndEnlistmentMercenariesActions = (
    { G, ctx, ...rest }: Context,
): void => {
    if (G.tierToEnd === 0) {
        const yludIndex: number =
            Object.values(G.publicPlayers).findIndex((player: PublicPlayer, index: number): boolean => {
                const playerID: string = String(index);
                AssertPlayerId(ctx, playerID);
                return CheckPlayerHasBuff(
                    { G, ctx, ...rest },
                    playerID,
                    HeroBuffNames.EndTier,
                );
            });
        if (yludIndex === -1) {
            RemoveThrudFromPlayerBoardAfterGameEnd({ G, ctx, ...rest });
        }
    }
    G.publicPlayersOrder = [];
};

/**
 * <h3>Действия при завершении мува в фазе 'enlistmentMercenaries'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При завершении мува в фазе 'enlistmentMercenaries'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export const OnEnlistmentMercenariesMove = (
    { G, ctx, ...rest }: Context,
): void => {
    StartOrEndActions({ G, ctx, ...rest });
    const player: CanBeUndef<PublicPlayer> = G.publicPlayers[ctx.currentPlayer];
    if (player === undefined) {
        return ThrowMyError(
            { G, ctx, ...rest },
            ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
            ctx.currentPlayer,
        );
    }
    if (!player.stack.length) {
        const mercenariesCount: number = player.campCards.filter(IsMercenaryCampCard).length;
        if (mercenariesCount) {
            AddActionsToStack(
                { G, ctx, ...rest },
                ctx.currentPlayer,
                [AllStackData.enlistmentMercenaries()],
            );
            DrawCurrentProfit({ G, ctx, ...rest });
        }
    }
};

/**
 * <h3>Действия при начале хода в фазе 'enlistmentMercenaries'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При начале хода в фазе 'enlistmentMercenaries'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export const OnEnlistmentMercenariesTurnBegin = (
    { G, ctx, ...rest }: Context,
): void => {
    const player: CanBeUndef<PublicPlayer> = G.publicPlayers[ctx.currentPlayer];
    if (player === undefined) {
        return ThrowMyError({ G, ctx, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
            ctx.currentPlayer);
    }
    if (!player.stack.length) {
        let stack: Stack[];
        if (ctx.playOrderPos === 0) {
            stack = [AllStackData.startOrPassEnlistmentMercenaries()];
        } else {
            stack = [AllStackData.enlistmentMercenaries()];
        }
        AddActionsToStack({ G, ctx, ...rest }, ctx.currentPlayer, stack);
        DrawCurrentProfit({ G, ctx, ...rest });
    }
};

/**
* <h3>Определяет порядок найма наёмников при начале фазы 'enlistmentMercenaries'.</h3>
* <p>Применения:</p>
* <ol>
* <li>При начале фазы 'enlistmentMercenaries'.</li>
* </ol>
*
* @param context
* @returns
*/
export const PrepareMercenaryPhaseOrders = (
    { G, ctx }: Context,
): void => {
    const sortedPlayers: PublicPlayer[] =
        Object.values(G.publicPlayers).map((player: PublicPlayer): PublicPlayer => player),
        playersIndexes: PlayerID[] = [];
    sortedPlayers.sort((nextPlayer: PublicPlayer, currentPlayer: PublicPlayer): number => {
        if (nextPlayer.campCards.filter(IsMercenaryCampCard).length <
            currentPlayer.campCards.filter(IsMercenaryCampCard).length) {
            return 1;
        } else if (nextPlayer.campCards.filter(IsMercenaryCampCard).length >
            currentPlayer.campCards.filter(IsMercenaryCampCard).length) {
            return -1;
        }
        if (nextPlayer.priority.value < currentPlayer.priority.value) {
            return 1;
        } else if (nextPlayer.priority.value > currentPlayer.priority.value) {
            return -1;
        }
        return 0;
    });
    sortedPlayers.forEach((playerSorted: PublicPlayer): void => {
        if (playerSorted.campCards.filter(IsMercenaryCampCard).length) {
            const playerID: string = String(Object.values(G.publicPlayers)
                .findIndex((player: PublicPlayer): boolean => player.nickname === playerSorted.nickname));
            AssertPlayerId(ctx, playerID);
            playersIndexes.push(playerID);
        }
    });
    AssertPublicPlayersOrderArray(playersIndexes);
    G.publicPlayersOrder = playersIndexes;
    if (playersIndexes.length > 1) {
        const playerIndex: CanBeUndef<PlayerID> = playersIndexes[0];
        if (playerIndex === undefined) {
            throw new Error(`В массиве индексов игроков отсутствует индекс '0'.`);
        }
        const newPlayersIndexes: PlayerID[] = [...playersIndexes, playerIndex];
        AssertPublicPlayersOrderArray(newPlayersIndexes);
        G.publicPlayersOrder = newPlayersIndexes;
    }
};
