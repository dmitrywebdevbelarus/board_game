import { ThrowMyError } from "../Error";
import { ErrorNames, SuitNames } from "../typescript/enums";
import type { BasicMythicalAnimalScoring, Context, MythicalAnimalScoringFunction, PlayerID } from "../typescript/interfaces";
import { GetRanksValueMultiplier } from "./ScoreHelpers";

/**
 * <h3>Получение победных очков по Мифическому животному, не имеющему специфических вариантов подсчёта очков.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце игры, когда получаются победные очки по Мифическому животному, не имеющему специфических вариантов подсчёта очков.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param value Значение.
 * @returns Количество очков по конкретному мифическому животному.
 */
export const MythicalAnimalScoring: MythicalAnimalScoringFunction = (
    { ...rest }: Context,
    playerID: PlayerID,
    value?: BasicMythicalAnimalScoring,
): BasicMythicalAnimalScoring => {
    if (value === undefined) {
        return ThrowMyError(
            { ...rest },
            ErrorNames.FunctionParamIsUndefined,
            `value`,
        );
    }
    return value;
};

/**
 * <h3>Получение победных очков по мифическому существу Garm.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце игры, когда получаются победные очки по мифическому существу Garm.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @returns Количество очков по конкретному мифическому животному.
 */
export const GarmScoring: MythicalAnimalScoringFunction = (
    { ...rest }: Context,
    playerID: PlayerID,
): number => GetRanksValueMultiplier(
    { ...rest },
    playerID,
    SuitNames.explorer,
    1,
);

/**
 * <h3>Получение победных очков по мифическому существу Nidhogg.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце игры, когда получаются победные очки по мифическому существу Nidhogg.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @returns Количество очков по конкретному мифическому животному.
 */
export const NidhoggScoring: MythicalAnimalScoringFunction = (
    { ...rest }: Context,
    playerID: PlayerID,
): number => GetRanksValueMultiplier(
    { ...rest },
    playerID,
    SuitNames.warrior,
    2,
);
