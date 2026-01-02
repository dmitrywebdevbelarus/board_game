import { ThrowMyError } from "../Error";
import { GetMaxCoinValue } from "../helpers/CoinHelpers";
import { ErrorNames, SuitNames } from "../typescript/enums";
import type { BasicHeroScoring, Context, HeroScoringFunction, PlayerID, RoyalCoinValue } from "../typescript/interfaces";
import { GetRanksValueMultiplier } from "./ScoreHelpers";

/**
 * <h3>Получение победных очков по герою, не имеющему специфических вариантов подсчёта очков.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце игры, когда получаются победные очки по герою, не имеющему специфических вариантов подсчёта очков.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param value Значение.
 * @returns Количество очков по конкретному герою.
 */
export const HeroScoring: HeroScoringFunction = (
    { ...rest }: Context,
    playerID: PlayerID,
    value?: BasicHeroScoring,
): BasicHeroScoring => {
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
 * <h3>Получение победных очков по герою Astrid.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце игры, когда получаются победные очки по герою Astrid.</li>
 * </ol>
 *
 * @param context
 * @returns Количество очков по конкретному герою.
 */
export const AstridScoring: HeroScoringFunction = (
    { ...rest }: Context,
    playerID: PlayerID,
): RoyalCoinValue => GetMaxCoinValue(
    { ...rest },
    playerID,
);

/**
 * <h3>Получение победных очков по герою Idunn.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце игры, когда получаются победные очки по герою Idunn.</li>
 * </ol>
 *
 * @param context
 * @returns Количество очков по конкретному герою.
 */
export const IdunnScoring: HeroScoringFunction = (
    { ...rest }: Context,
    playerID: PlayerID,
): number => GetRanksValueMultiplier(
    { ...rest },
    playerID,
    SuitNames.explorer,
    2,
);
