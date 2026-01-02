import { AssertPlayerId, AssertPublicPlayersOrderArray } from "../is_helpers/AssertionTypeHelpers";
import { GameModeNames, HeroBuffNames, PhaseNames } from "../typescript/enums";
import { Context, PlayerID } from "../typescript/interfaces";
import { CheckPlayerHasBuff } from "./BuffHelpers";

/**
* <h3>Проверяет базовый порядок хода игроков.</h3>
* <p>Применения:</p>
* <ol>
* <li>Происходит при необходимости выставления монет на игровое поле.</li>
* <li>Происходит при необходимости выставления монет на игровое поле при наличии героя Улина.</li>
* </ol>
*
* @param context
* @returns
*/
export const CheckPlayersBasicOrder = (
    { G, ctx, ...rest }: Context,
): void => {
    G.publicPlayersOrder = [];
    const currentPublicPlayersOrder: PlayerID[] = [];
    for (let i = 0; i < ctx.numPlayers; i++) {
        const playerID: string = String(i);
        AssertPlayerId(ctx, playerID);
        if (ctx.phase !== PhaseNames.BidUline) {
            if (G.mode === GameModeNames.Solo || G.mode === GameModeNames.SoloAndvari
                || ((G.mode === GameModeNames.Basic || G.mode === GameModeNames.Multiplayer)
                    && !CheckPlayerHasBuff(
                        { G, ctx, ...rest },
                        playerID,
                        HeroBuffNames.EveryTurn,
                    ))) {
                // TODO Can i don't repeat it twice?
                currentPublicPlayersOrder.push(playerID);
            }
        } else {
            if ((G.mode === GameModeNames.Basic || G.mode === GameModeNames.Multiplayer)
                && CheckPlayerHasBuff(
                    { G, ctx, ...rest },
                    playerID,
                    HeroBuffNames.EveryTurn,
                )) {
                currentPublicPlayersOrder.push(playerID);
            }
        }
    }
    AssertPublicPlayersOrderArray(currentPublicPlayersOrder);
    G.publicPlayersOrder = currentPublicPlayersOrder;
};
