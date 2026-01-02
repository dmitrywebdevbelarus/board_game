import { ArtefactScoring, DraupnirScoring, HrafnsmerkiScoring, MjollnirScoring, OdroerirTheMythicCauldronScoring, SvalinnScoring } from "../score_helpers/ArtefactScoringHelpers";
import { ArtefactScoringFunctionNames } from "../typescript/enums";
import type { Action, ArtefactScoringArgsCanBeOptional, ArtefactScoringFunction, Context, PlayerID } from "../typescript/interfaces";

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
export const StartArtefactScoring = (
    { ...rest }: Context,
    playerID: PlayerID,
    action: Action<ArtefactScoringFunctionNames, ArtefactScoringArgsCanBeOptional>,
    isFinal = false,
): number => ArtefactScoringDispatcherSwitcher(action.name)?.(
    { ...rest },
    playerID,
    isFinal,
    action.params,
);

/**
* <h3>Диспетчер всех действий по получению победных очков по артефакту.</h3>
* <p>Применения:</p>
* <ol>
* <li>В конце игры, когда получаются победные очки по артефакту.</li>
* </ol>
*
* @param actionName Название действия.
* @returns Действие.
*/
const ArtefactScoringDispatcherSwitcher = (
    actionName: ArtefactScoringFunctionNames,
): ArtefactScoringFunction => {
    let action: ArtefactScoringFunction,
        _exhaustiveCheck: never;
    switch (actionName) {
        case ArtefactScoringFunctionNames.BasicArtefactScoring:
            action = ArtefactScoring;
            break;
        case ArtefactScoringFunctionNames.DraupnirScoring:
            action = DraupnirScoring;
            break;
        case ArtefactScoringFunctionNames.HrafnsmerkiScoring:
            action = HrafnsmerkiScoring;
            break;
        case ArtefactScoringFunctionNames.MjollnirScoring:
            action = MjollnirScoring;
            break;
        case ArtefactScoringFunctionNames.OdroerirTheMythicCauldronScoring:
            action = OdroerirTheMythicCauldronScoring;
            break;
        case ArtefactScoringFunctionNames.SvalinnScoring:
            action = SvalinnScoring;
            break;
        default:
            _exhaustiveCheck = actionName;
            throw new Error(`Нет такого действия.`);
            return _exhaustiveCheck;
    }
    return action;
};
