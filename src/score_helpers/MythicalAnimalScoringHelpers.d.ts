import type { MythicalAnimalScoringFunction } from "../typescript/interfaces";
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
export declare const MythicalAnimalScoring: MythicalAnimalScoringFunction;
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
export declare const GarmScoring: MythicalAnimalScoringFunction;
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
export declare const NidhoggScoring: MythicalAnimalScoringFunction;
//# sourceMappingURL=MythicalAnimalScoringHelpers.d.ts.map