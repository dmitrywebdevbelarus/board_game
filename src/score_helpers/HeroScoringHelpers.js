import { ThrowMyError } from "../Error";
import { GetMaxCoinValue } from "../helpers/CoinHelpers";
import { ErrorNames, SuitNames } from "../typescript/enums";
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
export const HeroScoring = ({ ...rest }, playerID, value) => {
    if (value === undefined) {
        return ThrowMyError({ ...rest }, ErrorNames.FunctionParamIsUndefined, `value`);
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
export const AstridScoring = ({ ...rest }, playerID) => GetMaxCoinValue({ ...rest }, playerID);
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
export const IdunnScoring = ({ ...rest }, playerID) => GetRanksValueMultiplier({ ...rest }, playerID, SuitNames.explorer, 2);
//# sourceMappingURL=HeroScoringHelpers.js.map