import { AutoActionFunctionNames } from "../typescript/enums";
import type { Action, AutoActionArgs, Context, PlayerID } from "../typescript/interfaces";
/**
 * <h3>Начинает автоматическое действие конкретной карты при его наличии.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Выполняется при необходимости активировать автоматическое действие карты.</li>
 * </ol>
 *
 * @param context
 * @param action Объект автоматического действия.
 * @returns
 */
export declare const StartAutoAction: ({ ...rest }: Context, playerID: PlayerID, action: Action<AutoActionFunctionNames, AutoActionArgs>) => void;
//# sourceMappingURL=AutoActionDispatcher.d.ts.map