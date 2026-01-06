import { SuitScoringFunctionNames } from "../typescript/enums";
import type { Action, SuitScoringArgs } from "../typescript/interfaces";
/**
 * <h3>Начинает действие по получению победных очков по фракции дворфа.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Выполняется при необходимости получить победные очки по фракции дворфа.</li>
 * </ol>
 *
 * @param action Объект действия.
 * @param params Параметры действия.
 * @returns Количество победных очков по фракции дворфа.
 */
export declare const StartSuitScoring: (action: Action<SuitScoringFunctionNames, undefined>, params: SuitScoringArgs) => number;
//# sourceMappingURL=SuitScoringDispatcher.d.ts.map