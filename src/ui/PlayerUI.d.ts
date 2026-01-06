import type { BoardProps } from "../typescript/Client";
import { SuitNames } from "../typescript/enums";
import type { CanBeNull, Context, MoveArguments, MoveCardsArguments, MoveCoinsArguments, MoveValidatorNames, PlayerCoinId, PlayerID, SuitProperty } from "../typescript/interfaces";
/**
 * <h3>Отрисовка планшета всех карт игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка игрового поля.</li>
 * </ol>
 *
 * @param context
 * @param validatorName Название валидатора.
 * @param playerID ID требуемого игрока.
 * @param data Глобальные параметры.
 * @returns Игровые поля для планшета всех карт игрока.
 */
export declare const DrawPlayersBoards: ({ G, ctx, ...rest }: Context, validatorName: CanBeNull<MoveValidatorNames>, playerID?: CanBeNull<PlayerID>, data?: BoardProps | undefined) => JSX.Element[] | MoveArguments<number[] | SuitNames[] | MoveCardsArguments | Partial<SuitProperty<number[]>>>;
/**
 * <h3>Отрисовка планшета монет, выложенных игроком на стол.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка игрового поля.</li>
 * </ol>
 *
 * @param context
 * @param validatorName Название валидатора.
 * @param data Глобальные параметры.
 * @returns Игровые поля для пользовательских монет на столе | данные для списка доступных аргументов мува.
 */
export declare const DrawPlayersBoardsCoins: ({ G, ctx, ...rest }: Context, validatorName: CanBeNull<MoveValidatorNames>, data?: BoardProps | undefined) => JSX.Element[] | MoveArguments<MoveCoinsArguments[] | PlayerCoinId[]>;
/**
 * <h3>Отрисовка планшета монет, находящихся в руках игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка игрового поля.</li>
 * </ol>
 *
 * @param context
 * @param validatorName Название валидатора.
 * @param data Глобальные параметры.
 * @returns Игровые поля для пользовательских монет в руке.
 */
export declare const DrawPlayersHandsCoins: ({ G, ctx, ...rest }: Context, validatorName: CanBeNull<MoveValidatorNames>, data?: BoardProps | undefined) => JSX.Element[] | MoveArguments<PlayerCoinId[][] | MoveCoinsArguments[] | PlayerCoinId[]>;
//# sourceMappingURL=PlayerUI.d.ts.map