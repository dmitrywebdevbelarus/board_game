import { ActivateGiantAbilityOrPickCardSubMoveValidatorNames, ActivateGodAbilityOrNotSubMoveValidatorNames, ChooseDifficultySoloModeAndvariMoveValidatorNames, ChooseDifficultySoloModeMoveValidatorNames, CommonMoveValidatorNames, EnlistmentMercenariesMoveValidatorNames, TavernsResolutionMoveValidatorNames, TroopEvaluationMoveValidatorNames } from "../typescript/enums";
import type { ProfitFunction } from "../typescript/interfaces";
/**
 * <h3>Отрисовка для выбора карты Дворфа или активации способности Гиганта.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка игрового поля.</li>
 * </ol>
 *
 * @param context
 * @param validatorName Название валидатора.
 * @param data Глобальные параметры.
 * @param boardCells Ячейки для отрисовки.
 * @returns Поле для выбора карты Дворфа или активации способности Гиганта.
 */
export declare const ActivateGiantAbilityOrPickCardProfit: ProfitFunction<ActivateGiantAbilityOrPickCardSubMoveValidatorNames>;
/**
 * <h3>Отрисовка для выбора активировать или нет способности Бога.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка игрового поля.</li>
 * </ol>
 *
 * @param context
 * @param validatorName Название валидатора.
 * @param data Глобальные параметры.
 * @param boardCells Ячейки для отрисовки.
 * @returns Поле для выбора активировать или нет способности Бога.
 */
export declare const ActivateGodAbilityOrNotProfit: ProfitFunction<ActivateGodAbilityOrNotSubMoveValidatorNames>;
/**
 * <h3>Отрисовка для выбора карты Мифического существа при выборе Skymir.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка игрового поля.</li>
 * </ol>
 *
 * @param context
 * @param validatorName Название валидатора.
 * @param data Глобальные параметры.
 * @param boardCells Ячейки для отрисовки.
 * @returns Поле для выбора карты Мифического существа при выборе Skymir.
 */
export declare const ChooseGetMythologyCardForSkymirProfit: ProfitFunction<TavernsResolutionMoveValidatorNames>;
/**
 * <h3>Отрисовка для выбора уровня сложности стратегий соло бота Андвари соло игры.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка игрового поля.</li>
 * </ol>
 *
 * @param context
 * @param validatorName Название валидатора.
 * @param data Глобальные параметры.
 * @param boardCells Ячейки для отрисовки.
 * @returns Поле для выбора уровня сложности стратегий соло бота Андвари соло игры.
 */
export declare const ChooseStrategyForSoloModeAndvariProfit: ProfitFunction<ChooseDifficultySoloModeAndvariMoveValidatorNames>;
/**
 * <h3>Отрисовка для выбора варианта уровня сложности стратегий соло бота Андвари соло игры.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка игрового поля.</li>
 * </ol>
 *
 * @param context
 * @param validatorName Название валидатора.
 * @param data Глобальные параметры.
 * @param boardCells Ячейки для отрисовки.
 * @returns Поле для выбора варианта уровня сложности стратегий соло бота Андвари соло игры.
 */
export declare const ChooseStrategyVariantForSoloModeAndvariProfit: ProfitFunction<ChooseDifficultySoloModeAndvariMoveValidatorNames>;
/**
 * <h3>Отрисовка для выбора уровня сложности соло игры.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка игрового поля.</li>
 * </ol>
 *
 * @param context
 * @param validatorName Название валидатора.
 * @param data Глобальные параметры.
 * @param boardCells Ячейки для отрисовки.
 * @returns Поле для выбора уровня сложности соло игры.
 */
export declare const ChooseDifficultyLevelForSoloModeProfit: ProfitFunction<ChooseDifficultySoloModeMoveValidatorNames>;
/**
 * <h3>Отрисовка поля для выбора значения улучшения монеты по артефакту 'Vidofnir Vedrfolnir'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка игрового поля.</li>
 * </ol>
 *
 * @param context
 * @param validatorName Название валидатора.
 * @param data Глобальные параметры.
 * @param boardCells Ячейки для отрисовки.
 * @returns Игровое поле для отрисовки выбора значения улучшения монеты по артефакту 'Vidofnir Vedrfolnir'.
 */
export declare const ChooseCoinValueForVidofnirVedrfolnirUpgradeProfit: ProfitFunction<CommonMoveValidatorNames>;
/**
 * <h3>Отрисовка поля для получения профита по фракции разведчиков.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка игрового поля.</li>
 * </ol>
 *
 * @param context
 * @param validatorName Название валидатора.
 * @param data Глобальные параметры.
 * @param boardCells Ячейки для отрисовки.
 * @returns Игровое поле для отрисовки получения профита по фракции разведчиков.
 */
export declare const ExplorerDistinctionProfit: ProfitFunction<TroopEvaluationMoveValidatorNames>;
/**
 * <h3>Отрисовка всех героев для выбора сложности соло игры.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка игрового поля.</li>
 * </ol>
 *
 * @param context
 * @param validatorName Название валидатора.
 * @param data Глобальные параметры.
 * @param boardCells Ячейки для отрисовки.
 * @returns Поле героев для выбора сложности соло игры.
 */
export declare const PickHeroesForSoloModeProfit: ProfitFunction<ChooseDifficultySoloModeMoveValidatorNames>;
/**
 * <h3>Отрисовка поля для старта фазы 'enlistmentMercenaries'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка игрового поля.</li>
 * </ol>
 *
 * @param context
 * @param validatorName Название валидатора.
 * @param data Глобальные параметры.
 * @param boardCells Ячейки для отрисовки.
 * @returns Игровое поле для отрисовки старта фазы 'enlistmentMercenaries'.
 */
export declare const StartOrPassEnlistmentMercenariesProfit: ProfitFunction<EnlistmentMercenariesMoveValidatorNames>;
//# sourceMappingURL=ProfitUI.d.ts.map