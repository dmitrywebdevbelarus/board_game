import { ThrowMyError } from "../Error";
import { AddDataToLog } from "../Logging";
import { ErrorNames, LogNames, SuitNames } from "../typescript/enums";
import type { AddBuffToPlayerFunction, AllBuffNames, Buff, BuffValue, CanBeUndef, Context, PlayerBuffs, PlayerID, PublicPlayer } from "../typescript/interfaces";

/**
 * <h3>Действия, связанные с добавлением бафов игроку.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе конкретных героев, добавляющих бафы игроку.</li>
 * <li>При выборе конкретных артефактов, добавляющих бафы игроку.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param buff Баф.
 * @param value Значение бафа.
 * @returns
 */
export const AddBuffToPlayer: AddBuffToPlayerFunction = (
    { G, ...rest }: Context,
    playerID: PlayerID,
    buff: CanBeUndef<Buff>,
    value?: BuffValue,
): void => {
    if (buff !== undefined) {
        const player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
        if (player === undefined) {
            return ThrowMyError(
                { G, ...rest },
                ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
                playerID,
            );
        }
        player.buffs.push({
            [buff.name]: value ?? true,
        });
        AddDataToLog(
            { G, ...rest },
            LogNames.Game,
            `Игрок '${player.nickname}' получил баф '${buff.name}'.`,
        );
    }
};

/**
 * <h3>Действия, связанные с изменением значения бафа игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При необходимости изменить значение бафа игрока.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param buffName Баф.
 * @param value Новое значение бафа.
 * @returns
 */
export const ChangeBuffValue = (
    { G, ...rest }: Context,
    playerID: PlayerID,
    buffName: AllBuffNames,
    value: SuitNames,
): void => {
    const player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError(
            { G, ...rest },
            ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
            playerID,
        );
    }
    const buffIndex: number =
        player.buffs.findIndex((buff: PlayerBuffs): boolean => buff[buffName] !== undefined);
    if (buffIndex === -1) {
        throw new Error(`У игрока в массиве бафов отсутствует баф '${buffName}' с id ${buffIndex}.`);
    }
    player.buffs[buffIndex] = {
        [buffName]: value,
    };
    AddDataToLog(
        { G, ...rest },
        LogNames.Game,
        `У игрок '${player.nickname}' изменилось значение бафа '${buffName}' на новое - '${value}'.`,
    );
};

/**
 * <h3>Действия, связанные с проверкой наличия конкретного бафа у игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В любой ситуации, требующей наличия конкретного бафа у игрока.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param buffName Баф.
 * @returns
 */
export const CheckPlayerHasBuff = (
    { G, ...rest }: Context,
    playerID: PlayerID,
    buffName: AllBuffNames,
): boolean => {
    const player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError(
            { G, ...rest },
            ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
            playerID,
        );
    }
    return player.buffs.find((buff: PlayerBuffs): boolean => buff[buffName] !== undefined) !== undefined;
};

/**
* <h3>Действия, связанные с удалением бафов у игрока.</h3>
* <p>Применения:</p>
* <ol>
* <li>>В любой ситуации, требующей удаления конкретного бафа у игрока.</li>
* </ol>
*
* @param context
* @param playerID ID требуемого игрока.
* @param buffName Баф.
* @returns
*/
export const DeleteBuffFromPlayer = (
    { G, ...rest }: Context,
    playerID: PlayerID,
    buffName: AllBuffNames,
): void => {
    const player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError(
            { G, ...rest },
            ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
            playerID,
        );
    }
    const buffIndex: number =
        player.buffs.findIndex((buff: PlayerBuffs): boolean => buff[buffName] !== undefined);
    if (buffIndex === -1) {
        throw new Error(`У игрока с id ${playerID} в массиве бафов отсутствует баф '${buffName}' с id ${buffIndex}.`);
    }
    const amount = 1,
        removedBuffs: PlayerBuffs[] = player.buffs.splice(buffIndex, 1);
    if (amount !== removedBuffs.length) {
        throw new Error(`Недостаточно бафов в массиве бафов игрока с id '${playerID}': требуется - '${amount}', в наличии - '${removedBuffs.length}'.`);
    }
    AddDataToLog(
        { G, ...rest },
        LogNames.Game,
        `Игрок '${player.nickname}' потерял баф '${buffName}'.`,
    );
};

/**
 * <h3>Действия, связанные с получением значения бафа игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При необходимости получения значения бафа игрока.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param buffName Баф.
 * @returns
 */
export const GetBuffValue = (
    { G, ...rest }: Context,
    playerID: PlayerID,
    buffName: AllBuffNames,
): BuffValue => {
    const player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError(
            { G, ...rest },
            ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
            playerID,
        );
    }
    const buff: CanBeUndef<PlayerBuffs> =
        player.buffs.find((buff: PlayerBuffs): boolean => buff[buffName] !== undefined);
    if (buff === undefined) {
        throw new Error(`У игрока в массиве бафов отсутствует баф '${buffName}'.`);
    }
    const buffValue: CanBeUndef<BuffValue> = buff[buffName];
    if (buffValue === undefined) {
        throw new Error(`У игрока в массиве бафов отсутствует значение у бафа '${buffName}'.`);
    }
    return buffValue;
};
