import type { BoardProps } from "../typescript/Client";
import { ButtonMoveNames, CardMoveNames, CardRusNames, CoinCssClassNames, CoinMoveNames, DistinctionCardMoveNames, DrawCoinNames, EmptyCardMoveNames, SuitMoveNames, SuitNames } from "../typescript/enums";
import type { AllCard, ButtonMoveArgs, CanBeNull, CardMoveArgs, CoinMoveArgs, Context, DrawCoinAdditionalParam, DrawCoinIdParam, PublicPlayer, PublicPlayerCoin } from "../typescript/interfaces";
/**
 * <h3>Отрисовка кнопок.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка кнопок на игровом поле.</li>
 * </ol>
 *
 * @param context
 * @param data Глобальные параметры.
 * @param boardCells Ячейки для отрисовки.
 * @param name Имя кнопки.
 * @param player Игрок.
 * @param moveName Название действия.
 * @param args Аргументы действия.
 * @returns
 */
export declare const DrawButton: ({ ctx, ...rest }: Context, data: BoardProps, boardCells: JSX.Element[], name: string, player: PublicPlayer, moveName: ButtonMoveNames, args: ButtonMoveArgs) => void;
/**
 * <h3>Отрисовка карт знаков отличия.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка карт знаков отличия на игровом поле.</li>
 * </ol>
 *
 * @param context
 * @param data Глобальные параметры.
 * @param playerCells Ячейки для отрисовки.
 * @param suit Название фракции дворфов.
 * @param player Игрок.
 * @param moveName Название действия.
 * @param args Аргументы действия.
 * @returns
 */
export declare const DrawDistinctionCard: ({ ctx, ...rest }: Context, data: BoardProps, playerCells: JSX.Element[], suit: SuitNames, player?: PublicPlayer | undefined, moveName?: DistinctionCardMoveNames | undefined, args?: readonly [SuitNames] | undefined) => void;
/**
 * <h3>Отрисовка карт.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка карт на игровом поле.</li>
 * </ol>
 *
 * @param context
 * @param data Глобальные параметры.
 * @param playerCells Ячейки для отрисовки.
 * @param card Карта.
 * @param id Id карты.
 * @param player Игрок.
 * @param suit Название фракции дворфов.
 * @param moveName Название действия.
 * @param args Аргументы действия.
 * @returns
 */
export declare const DrawCard: ({ G, ctx, ...rest }: Context, data: BoardProps, playerCells: JSX.Element[], card: AllCard, id: number, suit: CanBeNull<SuitNames>, player?: PublicPlayer | undefined, moveName?: CardMoveNames | undefined, args?: CardMoveArgs | undefined) => void;
/**
 * <h3>Отрисовка пустых ячеек для карт.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка пустых ячеек для карт на игровом поле.</li>
 * </ol>
 *
 * @param context
 * @param data Глобальные параметры.
 * @param playerCells Ячейки для отрисовки.
 * @param cardType Тип карты.
 * @param id Id карты.
 * @param player Игрок.
 * @param suit Название фракции дворфов.
 * @param moveName Название действия.
 * @param args Аргументы действия.
 * @returns
 */
export declare const DrawEmptyCard: ({ ctx, ...rest }: Context, data: BoardProps, playerCells: JSX.Element[], cardType: CardRusNames, id: number, suit: CanBeNull<SuitNames>, player: PublicPlayer, moveName?: EmptyCardMoveNames | undefined, args?: readonly [SuitNames] | undefined) => void;
/**
 * <h3>Отрисовка монет.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка монет на игровом поле.</li>
 * </ol>
 *
 * @param context
 * @param data Глобальные параметры.
 * @param playerCells Ячейки для отрисовки.
 * @param type Тип монеты.
 * @param coin Монета.
 * @param id Id монеты.
 * @param player Игрок.
 * @param coinClasses Дополнительный классы для монеты.
 * @param additionalParam Дополнительные параметры.
 * @param moveName Название действия.
 * @param args Аргументы действия.
 * @returns
 */
export declare const DrawCoin: ({ ctx, ...rest }: Context, data: BoardProps, playerCells: JSX.Element[], type: DrawCoinNames, coin: PublicPlayerCoin, id: DrawCoinIdParam, player: CanBeNull<PublicPlayer>, coinClasses?: CanBeNull<CoinCssClassNames>, additionalParam?: CanBeNull<DrawCoinAdditionalParam>, moveName?: CoinMoveNames | undefined, args?: CoinMoveArgs | undefined) => void;
/**
 * <h3>Отрисовка фракций.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка фракций на игровом поле.</li>
 * </ol>
 *
 * @param context
 * @param data Глобальные параметры.
 * @param playerHeaders Ячейки для отрисовки.
 * @param suit Название фракции дворфов.
 * @param player Игрок.
 * @param moveName Название действия.
 * @param args Аргументы действия.
 * @returns
 */
export declare const DrawSuit: ({ ctx, ...rest }: Context, data: BoardProps, playerHeaders: JSX.Element[], suit: SuitNames, player?: PublicPlayer | undefined, moveName?: SuitMoveNames | undefined, args?: readonly [SuitNames] | undefined) => void;
//# sourceMappingURL=ElementsUI.d.ts.map