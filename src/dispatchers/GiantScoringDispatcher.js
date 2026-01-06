import { GiantScoring, GymirScoring, SurtScoring } from "../score_helpers/GiantScoringHelpers";
import { GiantScoringFunctionNames } from "../typescript/enums";
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
export const StartGiantScoring = ({ ...rest }, playerID, action) => GiantScoringDispatcherSwitcher(action.name)?.({ ...rest }, playerID, action.params);
/**
* <h3>Диспетчер всех действий по получению победных очков по Гиганту.</h3>
* <p>Применения:</p>
* <ol>
* <li>В конце игры, когда получаются победные очки по Гиганту.</li>
* </ol>
*
* @param actionName Название действия.
* @returns Действие.
*/
const GiantScoringDispatcherSwitcher = (actionName) => {
    let action, _exhaustiveCheck;
    switch (actionName) {
        case GiantScoringFunctionNames.BasicGiantScoring:
            action = GiantScoring;
            break;
        case GiantScoringFunctionNames.GymirScoring:
            action = GymirScoring;
            break;
        case GiantScoringFunctionNames.SurtScoring:
            action = SurtScoring;
            break;
        default:
            _exhaustiveCheck = actionName;
            throw new Error(`Нет такого действия.`);
            return _exhaustiveCheck;
    }
    return action;
};
//# sourceMappingURL=GiantScoringDispatcher.js.map