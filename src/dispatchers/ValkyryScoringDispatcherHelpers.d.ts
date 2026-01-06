import { ValkyryScoringFunctionNames } from "../typescript/enums";
import type { Action, ValkyryScoring, ValkyryScoringArgs } from "../typescript/interfaces";
/**
 * <h3>Начинает действие по получению победных очков по Валькирии.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Выполняется при необходимости получить победные очки по Валькирии.</li>
 * </ol>
 *
 * @param action Объект действия.
 * @param params Параметры действия.
 * @returns Количество победных очков по Валькирии.
 */
export declare const StartValkyryScoring: (action: Action<ValkyryScoringFunctionNames, undefined>, params: ValkyryScoringArgs) => ValkyryScoring;
//# sourceMappingURL=ValkyryScoringDispatcherHelpers.d.ts.map