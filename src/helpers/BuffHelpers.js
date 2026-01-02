import { ThrowMyError } from "../Error";
import { AddDataToLog } from "../Logging";
import { ErrorNames, LogNames } from "../typescript/enums";
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
export const AddBuffToPlayer = ({ G, ...rest }, playerID, buff, value) => {
    if (buff !== undefined) {
        const player = G.publicPlayers[playerID];
        if (player === undefined) {
            return ThrowMyError({ G, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
        }
        player.buffs.push({
            [buff.name]: value !== null && value !== void 0 ? value : true,
        });
        AddDataToLog({ G, ...rest }, LogNames.Game, `Игрок '${player.nickname}' получил баф '${buff.name}'.`);
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
export const ChangeBuffValue = ({ G, ...rest }, playerID, buffName, value) => {
    const player = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError({ G, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
    }
    const buffIndex = player.buffs.findIndex((buff) => buff[buffName] !== undefined);
    if (buffIndex === -1) {
        throw new Error(`У игрока в массиве бафов отсутствует баф '${buffName}' с id ${buffIndex}.`);
    }
    player.buffs[buffIndex] = {
        [buffName]: value,
    };
    AddDataToLog({ G, ...rest }, LogNames.Game, `У игрок '${player.nickname}' изменилось значение бафа '${buffName}' на новое - '${value}'.`);
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
export const CheckPlayerHasBuff = ({ G, ...rest }, playerID, buffName) => {
    const player = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError({ G, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
    }
    return player.buffs.find((buff) => buff[buffName] !== undefined) !== undefined;
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
export const DeleteBuffFromPlayer = ({ G, ...rest }, playerID, buffName) => {
    const player = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError({ G, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
    }
    const buffIndex = player.buffs.findIndex((buff) => buff[buffName] !== undefined);
    if (buffIndex === -1) {
        throw new Error(`У игрока с id ${playerID} в массиве бафов отсутствует баф '${buffName}' с id ${buffIndex}.`);
    }
    const amount = 1, removedBuffs = player.buffs.splice(buffIndex, 1);
    if (amount !== removedBuffs.length) {
        throw new Error(`Недостаточно бафов в массиве бафов игрока с id '${playerID}': требуется - '${amount}', в наличии - '${removedBuffs.length}'.`);
    }
    AddDataToLog({ G, ...rest }, LogNames.Game, `Игрок '${player.nickname}' потерял баф '${buffName}'.`);
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
export const GetBuffValue = ({ G, ...rest }, playerID, buffName) => {
    const player = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError({ G, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
    }
    const buff = player.buffs.find((buff) => buff[buffName] !== undefined);
    if (buff === undefined) {
        throw new Error(`У игрока в массиве бафов отсутствует баф '${buffName}'.`);
    }
    const buffValue = buff[buffName];
    if (buffValue === undefined) {
        throw new Error(`У игрока в массиве бафов отсутствует значение у бафа '${buffName}'.`);
    }
    return buffValue;
};
//# sourceMappingURL=BuffHelpers.js.map