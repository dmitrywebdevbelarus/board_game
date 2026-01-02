import { AstridScoring, HeroScoring, IdunnScoring } from "../score_helpers/HeroScoringHelpers";
import { HeroScoringFunctionNames } from "../typescript/enums";
import type { Action, Context, HeroScoringArgsCanBeOptional, HeroScoringFunction, PlayerID } from "../typescript/interfaces";

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
export const StartHeroScoring = (
    { ...rest }: Context,
    playerID: PlayerID,
    action: Action<HeroScoringFunctionNames, HeroScoringArgsCanBeOptional>,
): number => HeroScoringDispatcherSwitcher(action.name)?.(
    { ...rest },
    playerID,
    action.params,
);

/**
* <h3>Диспетчер всех действий по получению победных очков по герою.</h3>
* <p>Применения:</p>
* <ol>
* <li>В конце игры, когда получаются победные очки по герою.</li>
* </ol>
*
* @param actionName Название действия.
* @returns Действие.
*/
const HeroScoringDispatcherSwitcher = (
    actionName: HeroScoringFunctionNames,
): HeroScoringFunction => {
    let action: HeroScoringFunction,
        _exhaustiveCheck: never;
    switch (actionName) {
        case HeroScoringFunctionNames.BasicHeroScoring:
            action = HeroScoring;
            break;
        case HeroScoringFunctionNames.AstridScoring:
            action = AstridScoring;
            break;
        case HeroScoringFunctionNames.IdunnScoring:
            action = IdunnScoring;
            break;
        default:
            _exhaustiveCheck = actionName;
            throw new Error(`Нет такого действия.`);
            return _exhaustiveCheck;
    }
    return action;
};
