import { GodNames, PhaseNames, SoloGameAndvariStrategyNames, SuitNames } from "./typescript/enums";
import type { Context, DwarfCard, MoveBy, MoveCardsArguments, MoveCoinsArguments, MoveContext, MoveNames, MoveValidator, MoveValidators, MoveValidatorValue, PlayerCoinId, PlayerID, SoloGameDifficultyLevelArg, StageNames, SuitProperty } from "./typescript/interfaces";
/**
 * <h3>ДОБАВИТЬ ОПИСАНИЕ.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>ДОБАВИТЬ ПРИМЕНЕНИЯ.</li>
 * </oL>
 *
 * @TODO Саше: сделать описание функции и параметров.
 * @param context
 * @param playerID ID требуемого игрока.
 * @param coinData Данные монеты.
 * @returns Валидация обмена монет.
 */
export declare const CoinUpgradeValidation: ({ G, ...rest }: Context, playerID: PlayerID, coinData: MoveCoinsArguments) => boolean;
/**
 * <h3>ДОБАВИТЬ ОПИСАНИЕ.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>ДОБАВИТЬ ПРИМЕНЕНИЯ.</li>
 * </oL>
 *
 * @TODO Саше: сделать описание функции и параметров.
 * @param context
 * @param stage Стадия.
 * @param type Тип мува.
 * @param id Данные для валидации.
 * @returns Валидный ли мув.
 */
export declare const IsValidMove: ({ ctx, playerID, ...rest }: MoveContext, stage: StageNames, type: MoveNames, id: MoveValidatorValue) => boolean;
/**
 * <h3>ДОБАВИТЬ ОПИСАНИЕ.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>ДОБАВИТЬ ПРИМЕНЕНИЯ.</li>
 * </oL>
 *
 * @TODO Саше: сделать описание функции и параметров.
 * @param phase Фаза игры.
 * @param stage Стадия игры.
 * @param type Тип мува.
 * @returns Валидатор.
 */
export declare const GetValidator: (phase: PhaseNames, stage: StageNames, type: MoveNames) => MoveValidator<SoloGameDifficultyLevelArg[] | number[] | PlayerCoinId[][] | MoveCoinsArguments[] | GodNames[] | SoloGameAndvariStrategyNames[] | SuitNames[] | DwarfCard | MoveCardsArguments | Partial<SuitProperty<number[]>> | null>;
/**
 * <h3>ДОБАВИТЬ ОПИСАНИЕ.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>ДОБАВИТЬ ПРИМЕНЕНИЯ.</li>
 * </oL>
 * @TODO Саше: сделать описание функции и параметров.
 */
export declare const moveValidators: MoveValidators;
/**
 * <h3>ДОБАВИТЬ ОПИСАНИЕ.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>ДОБАВИТЬ ПРИМЕНЕНИЯ.</li>
 * </oL>
 * @TODO Саше: сделать описание функции и параметров.
 */
export declare const moveBy: MoveBy;
//# sourceMappingURL=MoveValidator.d.ts.map