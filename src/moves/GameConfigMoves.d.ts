import { ButtonMoveNames, CardMoveNames } from "../typescript/enums";
import type { GetMoveArgument, MoveFn } from "../typescript/interfaces";
/**
 * <h3>Выбор уровня сложности в режиме соло игры.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Когда игрок выбирает уровень сложности в режиме соло игры.</li>
 * </ol>
 *
 * @param context
 * @param level Уровень сложности в режиме соло игры.
 * @returns
 */
export declare const ChooseStrategyForSoloModeAndvariMove: MoveFn<GetMoveArgument<ButtonMoveNames.ChooseStrategyForSoloModeAndvariMove>>;
/**
 * <h3>Выбор варианта уровня сложности в режиме соло игры.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Когда игрок выбирает вариант уровня сложности в режиме соло игры.</li>
 * </ol>
 *
 * @param context
 * @param level Вариант уровня сложности в режиме соло игры.
 * @returns
 */
export declare const ChooseStrategyVariantForSoloModeAndvariMove: MoveFn<GetMoveArgument<ButtonMoveNames.ChooseStrategyVariantForSoloModeAndvariMove>>;
/**
 * <h3>Выбор уровня сложности в режиме соло игры.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Когда игрок выбирает уровень сложности в режиме соло игры.</li>
 * </ol>
 *
 * @param context
 * @param level Уровень сложности в режиме соло игры.
 * @returns
 */
export declare const ChooseDifficultyLevelForSoloModeMove: MoveFn<GetMoveArgument<ButtonMoveNames.ChooseDifficultyLevelForSoloModeMove>>;
/**
 * <h3>Выбор героя для выбранного уровня сложности в режиме соло игры.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Когда игрок выбирает героя для выбранного уровня сложности в режиме соло игры.</li>
 * </ol>
 *
 * @param context
 * @param heroId Id героя.
 * @returns
 */
export declare const ChooseHeroForDifficultySoloModeMove: MoveFn<GetMoveArgument<CardMoveNames.ChooseHeroForDifficultySoloModeMove>>;
//# sourceMappingURL=GameConfigMoves.d.ts.map