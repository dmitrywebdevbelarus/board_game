import { ThrowMyError } from "../Error";
import { AddDataToLog } from "../Logging";
import { ErrorNames, LogNames } from "../typescript/enums";
import type { CanBeUndef, Context, PlayerStack, PublicPlayer, Stack } from "../typescript/interfaces";

/**
 * <h3>Действия, связанные с отображением профита.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе конкретных героев, дающих профит.</li>
 * <li>При выборе конкретных карт лагеря, дающих профит.</li>
 * <li>При выборе конкретных карт улучшения монет, дающих профит.</li>
 * <li>При игровых моментах, дающих профит.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export const DrawCurrentProfit = (
    { G, ctx, events, ...rest }: Context,
): void => {
    const player: CanBeUndef<PublicPlayer> = G.publicPlayers[ctx.currentPlayer];
    if (player === undefined) {
        return ThrowMyError(
            { G, ctx, events, ...rest },
            ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
            ctx.currentPlayer,
        );
    }
    const stack: CanBeUndef<PlayerStack> = player.stack[0];
    if (stack !== undefined) {
        AddDataToLog(
            { G, ctx, events, ...rest },
            LogNames.Game,
            `Игрок '${player.nickname}' должен получить преимущества от действия '${stack.drawName}'.`,
        );
        StartOrEndActionStage(
            { G, ctx, events, ...rest },
            stack,
        );
        if (stack.configName !== undefined) {
            G.drawProfit = stack.configName;
            return;
        }
    }
    G.drawProfit = null;
};

/**
 * <h3>Действия, связанные со стартом конкретной стадии.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При начале действий, требующих старта конкретной стадии.</li>
 * </ol>
 *
 * @param context
 * @param stack Стек действий.
 * @returns
 */
const StartOrEndActionStage = (
    { ctx, events, ...rest }: Context,
    stack: Stack,
): void => {
    if (stack.stageName !== undefined) {
        events.setActivePlayers({
            currentPlayer: stack.stageName,
        });
        AddDataToLog(
            { ctx, events, ...rest },
            LogNames.Game,
            `Начало стадии '${stack.stageName}'.`,
        );
    } else if (ctx.activePlayers?.[ctx.currentPlayer] !== undefined) {
        events.endStage();
    }
};
