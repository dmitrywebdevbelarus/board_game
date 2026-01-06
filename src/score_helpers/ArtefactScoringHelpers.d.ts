import type { ArtefactScoringFunction } from "../typescript/interfaces";
/**
 * <h3>Получение победных очков по артефактам, не имеющим специфических вариантов подсчёта очков.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце игры, когда получаются победные очки по артефактам, не имеющим специфических вариантов подсчёта очков.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param isFinal Является ли финальным подсчётом очков.
 * @param value Значение очков артефакта.
 * @returns Количество очков по конкретному артефакту.
 */
export declare const ArtefactScoring: ArtefactScoringFunction;
/**
 * <h3>Получение победных очков по артефакту Draupnir.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце игры, когда получаются победные очки по артефакту Draupnir.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param isFinal Является ли финальным подсчётом очков.
 * @returns Количество очков по конкретному артефакту.
 */
export declare const DraupnirScoring: ArtefactScoringFunction;
/**
 * <h3>Получение победных очков по артефакту Hrafnsmerki.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце игры, когда получаются победные очки по артефакту Hrafnsmerki.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @returns Количество очков по конкретному артефакту.
 */
export declare const HrafnsmerkiScoring: ArtefactScoringFunction;
/**
 * <h3>Получение победных очков по артефакту Mjollnir.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце игры, когда получаются победные очки по артефакту Mjollnir.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param isFinal Является ли финальным подсчётом очков.
 * @returns Количество очков по конкретному артефакту.
 */
export declare const MjollnirScoring: ArtefactScoringFunction;
/**
 * <h3>Получение победных очков по артефакту Odroerir The Mythic Cauldron.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце игры, когда получаются победные очки по артефакту Odroerir The Mythic Cauldron.</li>
 * </ol>
 *
 * @param context
 * @returns Количество очков по конкретному артефакту.
 */
export declare const OdroerirTheMythicCauldronScoring: ArtefactScoringFunction;
/**
 * <h3>Получение победных очков по артефакту Svalinn.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце игры, когда получаются победные очки по артефакту Svalinn.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @returns Количество очков по конкретному артефакту.
 */
export declare const SvalinnScoring: ArtefactScoringFunction;
//# sourceMappingURL=ArtefactScoringHelpers.d.ts.map