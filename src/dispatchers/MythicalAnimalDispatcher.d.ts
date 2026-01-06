import { MythicalAnimalScoringFunctionNames } from "../typescript/enums";
import type { Action, Context, PlayerID } from "../typescript/interfaces";
/**
 * <h3>Начинает действие по получению победных очков по мифическому животному.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Выполняется при необходимости получить победные очки по мифическому животному.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param action Объект действия.
 * @returns Количество победных очков по мифическому животному.
 */
export declare const StartMythicalAnimalScoring: ({ ...rest }: Context, playerID: PlayerID, action: Action<MythicalAnimalScoringFunctionNames, 0>) => number;
//# sourceMappingURL=MythicalAnimalDispatcher.d.ts.map