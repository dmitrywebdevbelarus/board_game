import { ThrowMyError } from "../Error";
import { AssertPlayerId } from "../is_helpers/AssertionTypeHelpers";
import { AddDataToLog } from "../Logging";
import { ErrorNames, HeroBuffNames, HeroNames, LogNames } from "../typescript/enums";
import { DrawCurrentProfit } from "./ActionHelpers";
import { CheckPlayerHasBuff } from "./BuffHelpers";
import { RemoveCardFromPlayerBoardSuitCards } from "./DiscardCardHelpers";
import { CheckPickHero } from "./HeroHelpers";
/**
 * <h3>Проверяет необходимость завершения хода в любой фазе.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При проверке завершения любой фазы.</li>
 * </ol>
 *
 * @param context
 * @returns Должна ли быть завершена фаза.
 */
export const EndTurnActions = ({ G, ctx, ...rest }) => {
    const player = G.publicPlayers[ctx.currentPlayer];
    if (player === undefined) {
        return ThrowMyError({ G, ctx, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, ctx.currentPlayer);
    }
    if (!player.stack.length) {
        return true;
    }
};
/**
 * <h3>Удаляет Труд в конце игры с поля игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит в конце матча после всех игровых событий.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export const RemoveThrudFromPlayerBoardAfterGameEnd = ({ G, ctx, ...rest }) => {
    const thrudPlayerIndex = Object.values(G.publicPlayers).findIndex((player, index) => {
        const playerID = String(index);
        AssertPlayerId(ctx, playerID);
        return CheckPlayerHasBuff({ G, ctx, ...rest }, playerID, HeroBuffNames.MoveThrud);
    });
    if (thrudPlayerIndex !== -1) {
        const playerID = String(thrudPlayerIndex);
        AssertPlayerId(ctx, playerID);
        const player = G.publicPlayers[playerID];
        if (player === undefined) {
            return ThrowMyError({ G, ctx, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, thrudPlayerIndex);
        }
        const playerCards = Object.values(player.cards).flat(), thrud = playerCards.find((card) => card.name === HeroNames.Thrud);
        if (thrud !== undefined && thrud.suit !== null) {
            const thrudIndex = player.cards[thrud.suit].findIndex((card) => card.name === HeroNames.Thrud);
            if (thrudIndex === -1) {
                throw new Error(`У игрока с id '${thrudPlayerIndex}' отсутствует обязательная карта героя '${HeroNames.Thrud}'.`);
            }
            RemoveCardFromPlayerBoardSuitCards({ G, ctx, ...rest }, playerID, thrud.suit, thrudIndex);
            AddDataToLog({ G, ctx, ...rest }, LogNames.Game, `Герой '${HeroNames.Thrud}' игрока '${player.nickname}' уходит с игрового поля.`);
        }
    }
};
/**
 * <h3>Действия старта или завершения действий при завершении мува в любой фазе.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При завершении мува в любой фазе.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export const StartOrEndActions = ({ G, ctx, ...rest }) => {
    const player = G.publicPlayers[ctx.currentPlayer];
    if (player === undefined) {
        return ThrowMyError({ G, ctx, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, ctx.currentPlayer);
    }
    if (ctx.activePlayers === null || ctx.activePlayers?.[ctx.currentPlayer] !== undefined) {
        player.stack.shift();
        if (player.stack[0]?.priority !== 1) {
            CheckPickHero({ G, ctx, ...rest });
        }
        DrawCurrentProfit({ G, ctx, ...rest });
    }
};
//# sourceMappingURL=GameHooksHelpers.js.map