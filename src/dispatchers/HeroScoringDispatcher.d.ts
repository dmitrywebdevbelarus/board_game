import { HeroScoringFunctionNames } from "../typescript/enums";
import type { Action, Context, PlayerID } from "../typescript/interfaces";
/**
 * <h3>Начинает действие по получению победных очков по герою.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Выполняется при необходимости получить победные очки по герою.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param action Объект действия.
 * @returns Количество победных очков по герою.
 */
export declare const StartHeroScoring: ({ ...rest }: Context, playerID: PlayerID, action: Action<HeroScoringFunctionNames, import("../typescript/interfaces").BasicHeroScoring>) => number;
//# sourceMappingURL=HeroScoringDispatcher.d.ts.map