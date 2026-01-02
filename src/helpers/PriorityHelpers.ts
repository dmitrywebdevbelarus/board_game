import { ThrowMyError } from "../Error";
import { AssertAllPriorityValue, AssertPlayerId } from "../is_helpers/AssertionTypeHelpers";
import { AddDataToLog } from "../Logging";
import { ErrorNames, LogNames } from "../typescript/enums";
import type { AllPriorityValue, CanBeUndef, Context, PlayerID, Priority, PublicPlayer } from "../typescript/interfaces";

/**
 * <h3>Определяет наличие у выбранного игрока наименьшего кристалла.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Используется для ботов при определении приоритета выставления монет.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @returns Имеет ли игрок наименьший кристалл.
 */
export const HasLowestPriority = (
    { G, ...rest }: Context,
    playerID: PlayerID,
): boolean => {
    const tempPriorities: AllPriorityValue[] =
        Object.values(G.publicPlayers).map((player: PublicPlayer): AllPriorityValue =>
            player.priority.value),
        minPriority: number = Math.min(...tempPriorities),
        player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
    AssertAllPriorityValue(minPriority);
    if (player === undefined) {
        return ThrowMyError(
            { G, ...rest },
            ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
            playerID,
        );
    }
    return player.priority.value === minPriority;
};

/**
 * <h3>Изменяет приоритет игроков для выбора карт из текущей таверны.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Используется в конце фазы выбора карт.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export const ChangePlayersPriorities = (
    { G, ctx, ...rest }: Context,
): void => {
    if (G.exchangeOrder === null) {
        throw new Error(`В массиве изменения порядка хода игроков не может не быть значений.`);
    }
    const tempPriorities: CanBeUndef<Priority>[] = [];
    for (let i = 0; i < G.exchangeOrder.length; i++) {
        const exchangeOrder: CanBeUndef<PlayerID> = G.exchangeOrder[i];
        if (exchangeOrder === undefined) {
            throw new Error(`В массиве порядка хода игроков отсутствует текущий с id '${i}'.`);
        }
        const exchangePlayer: CanBeUndef<PublicPlayer> = G.publicPlayers[exchangeOrder];
        if (exchangePlayer === undefined) {
            return ThrowMyError(
                { G, ctx, ...rest },
                ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
                exchangeOrder,
            );
        }
        tempPriorities[i] = exchangePlayer.priority;
    }
    if (tempPriorities.length) {
        AddDataToLog(
            { G, ctx, ...rest },
            LogNames.Game,
            `Обмен кристаллами между игроками:`,
        );
        for (let i = 0; i < G.exchangeOrder.length; i++) {
            const playerID: string = String(i);
            AssertPlayerId(ctx, playerID);
            const tempPriority: CanBeUndef<Priority> = tempPriorities[i],
                player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
            if (player === undefined) {
                return ThrowMyError(
                    { G, ctx, ...rest },
                    ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
                    i,
                );
            }
            if (tempPriority !== undefined && player.priority.value !== tempPriority.value) {
                player.priority = tempPriority;
                AddDataToLog(
                    { G, ctx, ...rest },
                    LogNames.Public,
                    `Игрок '${player.nickname}' получил кристалл с приоритетом '${tempPriority.value}'.`,
                );
            }
        }
    }
};
