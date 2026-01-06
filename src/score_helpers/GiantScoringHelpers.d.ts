import type { GiantScoringFunction } from "../typescript/interfaces";
/**
 * <h3>Получение победных очков по Гиганту, не имеющим специфических вариантов подсчёта очков.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце игры, когда получаются победные очки по Гиганту, не имеющему специфических вариантов подсчёта очков.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param value Значение.
 * @returns Количество очков по конкретному гиганту.
 */
export declare const GiantScoring: GiantScoringFunction;
/**
 * <h3>Получение победных очков по Гиганту Gymir.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце игры, когда получаются победные очки по Гиганту Gymir.</li>
 * </ol>
 *
 * @param context
 * @returns Количество очков по конкретному гиганту.
 */
export declare const GymirScoring: GiantScoringFunction;
/**
 * <h3>Получение победных очков по Гиганту Surt.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце игры, когда получаются победные очки по Гиганту Surt.</li>
 * </ol>
 *
 * @param context
 * @returns Количество очков по конкретному гиганту.
 */
export declare const SurtScoring: GiantScoringFunction;
//# sourceMappingURL=GiantScoringHelpers.d.ts.map