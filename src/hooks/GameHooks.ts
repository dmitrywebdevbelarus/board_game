import { ThrowMyError } from "../Error";
import { CheckPlayerHasBuff } from "../helpers/BuffHelpers";
import { AssertPlayerId } from "../is_helpers/AssertionTypeHelpers";
import { IsMercenaryCampCard } from "../is_helpers/IsCampTypeHelpers";
import { ScoreWinner } from "../Score";
import { ArtefactBuffNames, ErrorNames, HeroBuffNames } from "../typescript/enums";
import type { CanBeUndef, CanBeVoid, Context, MyGameState, PublicPlayer } from "../typescript/interfaces";

/**
 * <h3>Проверяет необходимость завершения игры.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При любом действии.</li>
 * </ol>
 *
 * @param context
 * @returns Необходимость завершения игры.
 */
export const CheckEndGame = (
    { G, ctx, ...rest }: Context,
): CanBeVoid<boolean> => {
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
        if (yludIndex !== -1) {
            return false;
        }
        if (G.expansions.Thingvellir.active) {
            const brisingamensIndex: number =
                Object.values(G.publicPlayers).findIndex((player: PublicPlayer, index: number):
                    boolean => {
                    const playerID: string = String(index);
                    AssertPlayerId(ctx, playerID);
                    return CheckPlayerHasBuff(
                        { G, ctx, ...rest },
                        playerID,
                        ArtefactBuffNames.DiscardCardEndGame,
                    );
                });
            if (brisingamensIndex !== -1) {
                return false;
            }
            const mjollnirIndex: number =
                Object.values(G.publicPlayers).findIndex((player: PublicPlayer, index: number):
                    boolean => {
                    const playerID: string = String(index);
                    AssertPlayerId(ctx, playerID);
                    return CheckPlayerHasBuff(
                        { G, ctx, ...rest },
                        playerID,
                        ArtefactBuffNames.GetMjollnirProfit,
                    );
                });
            if (mjollnirIndex !== -1) {
                return false;
            }
            let allMercenariesPlayed = true;
            for (let i = 0; i < ctx.numPlayers; i++) {
                const playerID: string = String(i);
                AssertPlayerId(ctx, playerID);
                const player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
                if (player === undefined) {
                    return ThrowMyError(
                        { G, ctx, ...rest },
                        ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
                        i,
                    );
                }
                allMercenariesPlayed = player.campCards.filter(IsMercenaryCampCard).length === 0;
                if (!allMercenariesPlayed) {
                    break;
                }
            }
            return allMercenariesPlayed;
        }
        return true;
    }
};

/**
 * <h3>Формирует данные окончания игры.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При завершении игры.</li>
 * </ol>
 *
 * @param context
 * @returns Финальные данные о игре.
 */
export const ReturnEndGameData = (
    { ...rest }: Context,
): CanBeVoid<MyGameState> => ScoreWinner({ ...rest });
