import { GiantScoringFunctionNames } from "../typescript/enums";
import type { Action, Context, PlayerID } from "../typescript/interfaces";
/**
 * <h3>Начинает действие по получению победных очков по Гиганту.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Выполняется при необходимости получить победные очки по Гиганту.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param action Объект действия.
 * @returns Количество победных очков по Гиганту.
 */
export declare const StartGiantScoring: ({ ...rest }: Context, playerID: PlayerID, action: Action<GiantScoringFunctionNames, 0>) => number;
//# sourceMappingURL=GiantScoringDispatcher.d.ts.map