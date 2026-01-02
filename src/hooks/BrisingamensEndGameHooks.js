import { AllStackData } from "../data/StackData";
import { ThrowMyError } from "../Error";
import { DrawCurrentProfit } from "../helpers/ActionHelpers";
import { CheckPlayerHasBuff } from "../helpers/BuffHelpers";
import { StartOrEndActions } from "../helpers/GameHooksHelpers";
import { CheckIsStartUseGodAbility } from "../helpers/GodAbilityHelpers";
import { AddActionsToStack } from "../helpers/StackHelpers";
import { AssertPlayerId } from "../is_helpers/AssertionTypeHelpers";
import { ArtefactBuffNames, ErrorNames, GodNames, PhaseNames } from "../typescript/enums";
/**
 * <h3>Проверяет порядок хода при начале фазы 'brisingamensEndGame'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При начале фазы 'brisingamensEndGame'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export const CheckBrisingamensEndGameOrder = ({ G, ctx, ...rest }) => {
    const brisingamensPlayerIndex = Object.values(G.publicPlayers).findIndex((player, index) => {
        const playerID = String(index);
        AssertPlayerId(ctx, playerID);
        return CheckPlayerHasBuff({ G, ctx, ...rest }, playerID, ArtefactBuffNames.DiscardCardEndGame);
    });
    if (brisingamensPlayerIndex === -1) {
        throw new Error(`У игрока отсутствует обязательный баф '${ArtefactBuffNames.DiscardCardEndGame}'.`);
    }
    const brisingamensPlayerId = String(brisingamensPlayerIndex);
    AssertPlayerId(ctx, brisingamensPlayerId);
    G.publicPlayersOrder = [brisingamensPlayerId];
};
/**
 * <h3>Начинает фазу 'getMjollnirProfit'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При завершении фазы 'brisingamensEndGame'.</li>
 * </ol>
 * @param context
 * @returns Необходимость завершения текущей фазы.
 */
export const CheckEndBrisingamensEndGamePhase = ({ G, ctx, ...rest }) => {
    if (G.publicPlayersOrder.length && ctx.playOrder.length === 1 && G.publicPlayersOrder[0] === ctx.playOrder[0]
        && ctx.currentPlayer === ctx.playOrder[0]) {
        const player = G.publicPlayers[ctx.currentPlayer];
        if (player === undefined) {
            return ThrowMyError({ G, ctx, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, ctx.currentPlayer);
        }
        if (!CheckPlayerHasBuff({ G, ctx, ...rest }, ctx.currentPlayer, ArtefactBuffNames.DiscardCardEndGame) && !player.stack.length) {
            const buffIndex = Object.values(G.publicPlayers).findIndex((player, index) => {
                const playerID = String(index);
                AssertPlayerId(ctx, playerID);
                return CheckPlayerHasBuff({ G, ctx, ...rest }, playerID, ArtefactBuffNames.GetMjollnirProfit);
            });
            if (buffIndex !== -1) {
                return true;
            }
        }
    }
};
/**
 * <h3>Действия при завершении фазы 'brisingamensEndGame'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При завершении фазы 'brisingamensEndGame'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export const EndBrisingamensEndGameActions = ({ G }) => {
    G.publicPlayersOrder = [];
};
/**
 * <h3>Действия при завершении мува в фазе 'brisingamensEndGame'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При завершении мува в фазе 'brisingamensEndGame'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export const OnBrisingamensEndGameMove = ({ ...rest }) => StartOrEndActions({ ...rest });
/**
 * <h3>Действия при начале хода в фазе 'brisingamensEndGame'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При начале хода в фазе 'brisingamensEndGame'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export const OnBrisingamensEndGameTurnBegin = ({ G, ctx, ...rest }) => {
    if (!(G.expansions.Idavoll.active && CheckIsStartUseGodAbility({ G, ctx, ...rest }, ctx.currentPlayer, GodNames.Thor))) {
        AddActionsToStack({ G, ctx, ...rest }, ctx.currentPlayer, [AllStackData.brisingamensEndGameAction()]);
        DrawCurrentProfit({ G, ctx, ...rest });
    }
};
/**
 * <h3>Проверяет необходимость начала фазы 'getMjollnirProfit'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При действиях, после которых может начаться фаза 'getMjollnirProfit'.</li>
 * </ol>
 *
 * @param context
 * @returns Фаза игры.
 */
export const StartGetMjollnirProfitPhase = ({ G, ctx, ...rest }) => {
    const buffIndex = Object.values(G.publicPlayers).findIndex((player, index) => {
        const playerID = String(index);
        AssertPlayerId(ctx, playerID);
        return CheckPlayerHasBuff({ G, ctx, ...rest }, playerID, ArtefactBuffNames.GetMjollnirProfit);
    });
    if (buffIndex !== -1) {
        return PhaseNames.GetMjollnirProfit;
    }
};
//# sourceMappingURL=BrisingamensEndGameHooks.js.map