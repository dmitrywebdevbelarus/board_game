import type { BoardProps } from "../typescript/Client";
import { CommonMoveValidatorNames, SoloBotCommonMoveValidatorNames, SuitNames, TavernsResolutionMoveValidatorNames, TroopEvaluationMoveValidatorNames } from "../typescript/enums";
import type { CanBeNull, Context, MoveValidatorNames } from "../typescript/interfaces";
/**
 * <h3>Отрисовка карт лагеря.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка игрового поля.</li>
 * </ol>
 *
 * @param context
 * @param validatorName Название валидатора.
 * @param data Глобальные параметры.
 * @returns Поле лагеря | данные для списка доступных аргументов мува.
 */
export declare const DrawCamp: ({ G, ctx, ...rest }: Context, validatorName: CanBeNull<MoveValidatorNames>, data?: BoardProps | undefined) => import("../typescript/interfaces").SoloGameDifficultyLevelArg[] | JSX.Element;
/**
 * <h3>Отрисовка фазы и стадии игры.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка фазы и стадии игры на игровом поле.</li>
 * </ol>
 *
 * @param context
 * @returns Поле информации о текущей фазе и стадии игры.
 */
export declare const DrawCurrentPhaseStage: ({ ctx }: Context) => JSX.Element;
/**
 * <h3>Отрисовка игровой информации о текущем игроке и текущем ходе.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка игрового поля.</li>
 * </ol>
 *
 * @param context
 * @returns Поле информации о текущем ходу.
 */
export declare const DrawCurrentPlayerTurn: ({ ctx }: Context) => JSX.Element;
/**
 * <h3>Отрисовка преимуществ по фракциям в конце эпохи.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка игрового поля.</li>
 * </ol>
 *
 * @param context
 * @param validatorName Название валидатора.
 * @param data Глобальные параметры.
 * @returns Поле преимуществ в конце эпохи.
 */
export declare const DrawDistinctions: ({ G, ctx, ...rest }: Context, validatorName: CanBeNull<TroopEvaluationMoveValidatorNames>, data?: BoardProps | undefined) => SuitNames[] | JSX.Element;
/**
 * <h3>Отрисовка колоды сброса карт.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка игрового поля.</li>
 * </ol>
 *
 * @param context
 * @param validatorName Название валидатора.
 * @param data Глобальные параметры.
 * @returns Поле колоды сброса карт.
 */
export declare const DrawDiscardedCards: ({ G, ctx, ...rest }: Context, validatorName: CanBeNull<CommonMoveValidatorNames>, data?: BoardProps | undefined) => number[] | JSX.Element;
/**
 * <h3>Отрисовка всех героев.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка игрового поля.</li>
 * </ol>
 *
 * @param context
 * @param validatorName Название валидатора.
 * @param data Глобальные параметры.
 * @returns Поле героев.
 */
export declare const DrawHeroes: ({ G, ctx, ...rest }: Context, validatorName: CanBeNull<MoveValidatorNames>, data?: BoardProps | undefined) => number[] | JSX.Element;
/**
 * <h3>Отрисовка всех героев для выбора соло ботом.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка игрового поля.</li>
 * </ol>
 *
 * @param context
 * @param validatorName Название валидатора.
 * @param data Глобальные параметры.
 * @returns Поле героев для соло бота.
 */
export declare const DrawHeroesForSoloBotUI: ({ G, ctx, ...rest }: Context, validatorName: CanBeNull<SoloBotCommonMoveValidatorNames>, data?: BoardProps | undefined) => import("../typescript/interfaces").SoloGameDifficultyLevelArg[] | JSX.Element;
/**
 * <h3>Отрисовка рынка монет.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка игрового поля.</li>
 * </ol>
 *
 * @param context
 * @param data Глобальные параметры.
 * @returns Поле рынка монет.
 */
export declare const DrawMarketCoins: ({ G, ctx, ...rest }: Context, data: BoardProps) => JSX.Element;
/**
 * <h3>Отрисовка профита от карт и героев.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка игрового поля.</li>
 * </ol>
 *
 * @param context
 * @param data Глобальные параметры.
 * @returns Поле профита.
 */
export declare const DrawProfit: ({ G, ctx, ...rest }: Context, data: BoardProps) => JSX.Element;
/**
 * <h3>Отрисовка стратегий соло бота Андвари.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка игрового поля.</li>
 * </ol>
 *
 * @param context
 * @param data Глобальные параметры.
 * @returns Поле стратегий соло бота Андвари.
 */
export declare const DrawStrategyForSoloBotAndvariUI: ({ G, ...rest }: Context, data: BoardProps) => JSX.Element;
/**
 * <h3>Отрисовка карт таверн.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка игрового поля.</li>
 * </ol>
 *
 * @param context
 * @param validatorName Название валидатора.
 * @param data Глобальные параметры.
 * @param gridClass Класс для отрисовки таверны.
 * @returns Поле таверн.
 */
export declare const DrawTaverns: ({ G, ctx, ...rest }: Context, validatorName: CanBeNull<TavernsResolutionMoveValidatorNames>, data?: BoardProps | undefined, gridClass?: string | undefined) => number[] | JSX.Element[];
/**
 * <h3>Отрисовка игровой информации о текущей эпохе и количестве карт в деках.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка игрового поля.</li>
 * </ol>
 *
 * @param context
 * @returns Поле информации о количестве карт по эпохам.
 */
export declare const DrawTierCards: ({ G }: Context) => JSX.Element;
/**
 * <h3>Отрисовка игровой информации о текущем статусе игры.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка игрового поля.</li>
 * </ol>
 *
 * @param context
 * @returns Поле информации о ходе/победителях игры.
 */
export declare const DrawWinner: ({ G, ctx }: Context) => JSX.Element;
//# sourceMappingURL=GameBoardUI.d.ts.map