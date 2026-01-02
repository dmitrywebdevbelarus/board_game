import { ThrowMyError } from "./Error";
import { CheckPlayerHasBuff } from "./helpers/BuffHelpers";
import { OpenClosedCoinsOnPlayerBoard, ReturnCoinsFromPlayerHandsToPlayerBoard } from "./helpers/CoinHelpers";
import { CurrentAllSuitsScoring, CurrentOrFinalAllArtefactScoring, CurrentOrFinalAllHeroesScoring, CurrentOrFinalAllMythologicalCreaturesScoring, CurrentPotentialMinerDistinctionsScoring, CurrentPotentialWarriorDistinctionsScoring, FinalAllBoardCoinsScoring, FinalAllSuitsScoring, FinalMinerDistinctionsScoring, FinalWarriorDistinctionsScoring } from "./helpers/ScoringHelpers";
import { AssertMaxPlyersWithTotalScore, AssertPlayerId, AssertTotalScoreArray, AssertWinnerArray, AssertWinnersNum } from "./is_helpers/AssertionTypeHelpers";
import { AddDataToLog } from "./Logging";
import { ErrorNames, GameModeNames, HeroBuffNames, LogNames, PlayerIdForSoloGameNames } from "./typescript/enums";
import type { CanBeUndef, CanBeVoid, Context, MyGameState, PlayerID, PublicPlayer, WinnersNum } from "./typescript/interfaces";

/**
 * <h3>Подсчитывает суммарное количество текущих очков выбранного игрока за карты в колонках фракций.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Подсчёт и вывод на игровое поле текущее количество очков каждого игрока.</li>
 * <li>Подсчёт и вывод на игровое поле финальное количество очков каждого игрока.</li>
 * <li>Подсчёт очков игроков для анализа ботами.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param player Игрок.
 * @returns Текущий счёт указанного игрока.
 */
export const AllCurrentScoring = (
    { G, ...rest }: Context,
    playerID: PlayerID,
): number => {
    const player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError(
            { G, ...rest },
            ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
            playerID,
        );
    }
    let totalScore: number = CurrentAllSuitsScoring(
        { G, ...rest },
        playerID,
    )
        + player.currentCoinsScore
        + CurrentPotentialWarriorDistinctionsScoring(
            { G, ...rest },
            playerID,
        )
        + CurrentPotentialMinerDistinctionsScoring(
            { G, ...rest },
            playerID,
        )
        // TODO Think about heroes in players hands which can be deleted in end game scoring both suit and heroes!?
        + CurrentOrFinalAllHeroesScoring(
            { G, ...rest },
            playerID,
        );
    if (G.expansions.Thingvellir.active) {
        totalScore += CurrentOrFinalAllArtefactScoring(
            { G, ...rest },
            playerID,
        );
    }
    if (G.expansions.Idavoll.active) {
        totalScore += CurrentOrFinalAllMythologicalCreaturesScoring(
            { G, ...rest },
            playerID,
        );
    }
    return totalScore;
};

/**
 * <h3>Подсчитывает финальное количество очков выбранного игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Подсчёт и вывод на игровое поле финальное количество очков каждого игрока.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @returns Финальный счёт указанного игрока.
 */
const FinalScoring = (
    { G, ...rest }: Context,
    playerID: PlayerID,
): number => {
    const player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError(
            { G, ...rest },
            ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
            playerID,
        );
    }
    AddDataToLog(
        { G, ...rest },
        LogNames.Game,
        `Результаты игры ${(G.mode === GameModeNames.Solo || G.mode === GameModeNames.SoloAndvari) && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId ? `соло бота` : `игрока '${player.nickname}'`}:`,
    );
    let totalScore: number = FinalAllSuitsScoring(
        { G, ...rest },
        playerID,
    )
        + FinalAllBoardCoinsScoring(
            { G, ...rest },
            playerID,
        )
        + FinalWarriorDistinctionsScoring(
            { G, ...rest },
            playerID,
        )
        + FinalMinerDistinctionsScoring(
            { G, ...rest },
            playerID,
        )
        + CurrentOrFinalAllHeroesScoring(
            { G, ...rest },
            playerID,
            true,
        );
    if (G.expansions.Thingvellir.active) {
        totalScore += CurrentOrFinalAllArtefactScoring(
            { G, ...rest },
            playerID,
            true,
        );
    }
    if (G.expansions.Idavoll.active) {
        totalScore += CurrentOrFinalAllMythologicalCreaturesScoring(
            { G, ...rest },
            playerID,
            true,
        );
    }
    AddDataToLog(
        { G, ...rest },
        LogNames.Public,
        `Итоговый счёт ${(G.mode === GameModeNames.Solo || G.mode === GameModeNames.SoloAndvari) && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId ? `соло бота` : `игрока '${player.nickname}'`}: '${totalScore}'.`,
    );
    return totalScore;
};

/**
 * <h3>Подсчитывает финальные очки для определения победителя.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Используется в конце игры для определения победителя для вывода данных на игровое поле.</li>
 * </ol>
 *
 * @param context
 * @returns Финальные данные о победителях, если закончилась игра.
 */
export const ScoreWinner = (
    { G, ctx, ...rest }: Context,
): CanBeVoid<MyGameState> => {
    Object.values(G.publicPlayers).forEach((player: PublicPlayer, index: number): void => {
        const playerID: string = String(index);
        AssertPlayerId(ctx, playerID);
        if ((G.mode === GameModeNames.Solo && ctx.currentPlayer === PlayerIdForSoloGameNames.SoloBotPlayerId)
            || (G.mode === GameModeNames.SoloAndvari && ctx.currentPlayer === PlayerIdForSoloGameNames.SoloBotPlayerId)
            || ((G.mode === GameModeNames.Basic || G.mode === GameModeNames.Multiplayer
                || (G.mode === GameModeNames.SoloAndvari
                    && ctx.currentPlayer === PlayerIdForSoloGameNames.HumanPlayerId)) && CheckPlayerHasBuff(
                        { G, ctx, ...rest },
                        playerID,
                        HeroBuffNames.EveryTurn,
                    ))) {
            ReturnCoinsFromPlayerHandsToPlayerBoard(
                { G, ctx, ...rest },
                playerID,
            );
        }
        OpenClosedCoinsOnPlayerBoard(
            { G, ctx, ...rest },
            playerID,
        );
    });
    G.drawProfit = null;
    AddDataToLog(
        { G, ctx, ...rest },
        LogNames.Game,
        `Финальные результаты игры:`,
    );
    const totalScore: number[] = [];
    for (let i = 0; i < ctx.numPlayers; i++) {
        const playerID: string = String(i);
        AssertPlayerId(ctx, playerID);
        totalScore.push(FinalScoring(
            { G, ctx, ...rest },
            playerID,
        ));
    }
    AssertTotalScoreArray(totalScore);
    G.totalScore = totalScore;
    const maxScore: number = Math.max(...G.totalScore),
        maxPlayers: number = G.totalScore.filter((score: number): boolean => score === maxScore).length,
        winnerArray: PlayerID[] = [];
    AssertMaxPlyersWithTotalScore(maxPlayers);
    let winners: WinnersNum = 0;
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
        if (maxScore === G.totalScore[i] && maxPlayers > winners) {
            winnerArray.push(playerID);
            winners++;
            AddDataToLog(
                { G, ctx, ...rest },
                LogNames.Game,
                `Определился победитель: игрок '${player.nickname}'.`,
            );
            AssertWinnersNum(winners);
            if (maxPlayers === winners) {
                break;
            }
        }
    }
    AssertWinnerArray(winnerArray);
    G.winner = winnerArray;
    return G;
};
