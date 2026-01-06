import { ArtefactScoringFunctionNames } from "../typescript/enums";
import type { Action, Context, PlayerID } from "../typescript/interfaces";
/**
 * <h3>Начинает действие по получению победных очков по артефакту.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Выполняется при необходимости получить победные очки по артефакту.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param action Объект действия.
 * @param isFinal Происходит ли подсчёт очков в конце игры.
 * @returns Количество победных очков по артефакту.
 */
export declare const StartArtefactScoring: ({ ...rest }: Context, playerID: PlayerID, action: Action<ArtefactScoringFunctionNames, import("../typescript/interfaces").BasicArtefactScoring>, isFinal?: boolean) => number;
//# sourceMappingURL=ArtefactScoringDispatcher.d.ts.map