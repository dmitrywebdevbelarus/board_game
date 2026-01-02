import { AllStackData } from "../data/StackData";
import { ThrowMyError } from "../Error";
import { DrawCurrentProfit } from "../helpers/ActionHelpers";
import { CheckPlayerHasBuff } from "../helpers/BuffHelpers";
import { StartOrEndActions } from "../helpers/GameHooksHelpers";
import { AddActionsToStack } from "../helpers/StackHelpers";
import { AssertPlayerId } from "../is_helpers/AssertionTypeHelpers";
import { ArtefactBuffNames, CommonBuffNames, ErrorNames } from "../typescript/enums";
import type { CanBeUndef, CanBeVoid, Context, PublicPlayer } from "../typescript/interfaces";

/**
 * <h3>Проверяет необходимость завершения фазы 'getMjollnirProfit'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе фракции для применения эффекта артефакта Mjollnir в фазе 'getMjollnirProfit'.</li>
 * </ol>
 *
 * @param context
 * @returns Необходимость завершения текущей фазы.
 */
export const CheckEndGetMjollnirProfitPhase = (
    { G, ctx, ...rest }: Context,
): CanBeVoid<boolean> => {
    if (G.publicPlayersOrder.length) {
        const player: CanBeUndef<PublicPlayer> = G.publicPlayers[ctx.currentPlayer];
        if (player === undefined) {
            return ThrowMyError(
                { G, ctx, ...rest },
                ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
                ctx.currentPlayer,
            );
        }
        if (!player.stack.length) {
            return CheckPlayerHasBuff(
                { G, ctx, ...rest },
                ctx.currentPlayer,
                CommonBuffNames.SuitIdForMjollnir,
            );
        }
    }
};

/**
 * <h3>Проверяет порядок хода при начале фазы 'getMjollnirProfit'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При начале фазы 'getMjollnirProfit'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export const CheckGetMjollnirProfitOrder = (
    { G, ctx, ...rest }: Context,
): void => {
    const mjollnirPlayerIndex: number =
        Object.values(G.publicPlayers).findIndex((player: PublicPlayer, index: number): boolean => {
            const playerID: string = String(index);
            AssertPlayerId(ctx, playerID);
            return CheckPlayerHasBuff(
                { G, ctx, ...rest },
                playerID,
                ArtefactBuffNames.GetMjollnirProfit,
            );
        });
    if (mjollnirPlayerIndex === -1) {
        throw new Error(`У игроков отсутствует обязательный баф '${ArtefactBuffNames.GetMjollnirProfit}'.`);
    }
    const mjollnirPlayerId = String(mjollnirPlayerIndex);
    AssertPlayerId(ctx, mjollnirPlayerId);
    G.publicPlayersOrder = [mjollnirPlayerId];
};

/**
 * <h3>Действия при завершении мува в фазе 'getMjollnirProfit'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При завершении мува в фазе 'getMjollnirProfit'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export const OnGetMjollnirProfitMove = (
    { ...rest }: Context,
): void => StartOrEndActions({ ...rest });

/**
 * <h3>Действия при начале хода в фазе 'getMjollnirProfit'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При начале хода в фазе 'getMjollnirProfit'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export const OnGetMjollnirProfitTurnBegin = (
    { ctx, ...rest }: Context,
): void => {
    AddActionsToStack(
        { ctx, ...rest },
        ctx.currentPlayer,
        [AllStackData.getMjollnirProfit()],
    );
    DrawCurrentProfit({ ctx, ...rest });
};

/**
 * <h3>Действия завершения игры при завершении фазы 'getMjollnirProfit'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При завершении фазы 'getMjollnirProfit'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export const StartEndGame = (
    { G, events }: Context,
): void => {
    G.publicPlayersOrder = [];
    events.endGame();
};
