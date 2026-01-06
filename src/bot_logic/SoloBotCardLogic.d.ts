import { SuitNames } from "../typescript/enums";
import type { CanBeUndef, Context, PlayerID } from "../typescript/interfaces";
/**
 * <h3>Проверяет возможность получения нового героя при выборе карты конкретной фракции из таверны соло ботом.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При необходимости выбора карты из таверны соло ботом.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @returns Фракция дворфов для выбора карты, чтобы получить нового героя.
 */
export declare const CheckSoloBotCanPickHero: ({ G, ...rest }: Context, playerID: PlayerID) => CanBeUndef<SuitNames>;
/**
 * <h3>Проверяет наименее представленные фракции в армии соло бота при выборе карты из таверны соло ботом.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При необходимости выбора карты из таверны соло ботом.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @returns Фракции дворфов с наименьшим количеством карт для выбора карты/минимальное количество карт в наименьших фракциях.
 */
export declare const CheckSuitsLeastPresentOnSoloBotBoard: ({ G, ...rest }: Context, playerID: PlayerID) => [SuitNames[], number];
/**
 * <h3>Проверяет возможность получения нового героя при выборе карты из таверны соло ботом.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При необходимости выбора карты из таверны соло ботом.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param moveArguments Аргументы действия соло бота.
 * @returns Id карты из таверны, при выборе которой можно получить нового героя.
 */
export declare const CheckSoloBotMustTakeCardToPickHero: ({ G, ...rest }: Context, playerID: PlayerID, moveArguments: number[]) => CanBeUndef<number>;
/**
 * <h3>Проверяет наибольшее значение для получения карты при выборе карты из таверны соло ботом.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При необходимости выбора карты из таверны соло ботом.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param moveArguments Аргументы действия соло бота.
 * @returns Id карты из таверны, при выборе которой можно получить карту с наибольшим значением.
 */
export declare const CheckSoloBotMustTakeCardWithHighestValue: ({ G, ...rest }: Context, moveArguments: number[]) => number;
/**
 * <h3>Проверяет возможность получения карты наименее представленной в армии соло бота при выборе карты из таверны соло ботом.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При необходимости выбора карты из таверны соло ботом.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param moveArguments Аргументы действия соло бота.
 * @returns Id карты из таверны, при выборе которой можно получить карту с наибольшим значением.
 */
export declare const CheckSoloBotMustTakeCardWithSuitsLeastPresentOnPlayerBoard: ({ G, ctx, ...rest }: Context, playerID: PlayerID, moveArguments: number[]) => CanBeUndef<number>;
/**
 * <h3>Проверяет получение карты Королевской награды при выборе карты из таверны соло ботом.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При необходимости выбора карты из таверны соло ботом.</li>
 * </ol>
 *
 * @param context
 * @param moveArguments Аргументы действия соло бота.
 * @returns Id карты Королевской награды из таверны.
 */
export declare const CheckSoloBotMustTakeRoyalOfferingCard: ({ G, ...rest }: Context, moveArguments: number[]) => CanBeUndef<number>;
/**
 * <h3>Проверяет получение случайной карты при выборе карты из таверны соло ботом.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При необходимости выбора карты из таверны соло ботом.</li>
 * </ol>
 *
 * @param context
 * @param moveArguments Аргументы действия соло бота.
 * @returns Id случайной карты из таверны.
 */
export declare const SoloBotMustTakeRandomCard: ({ ...rest }: Context, moveArguments: number[]) => number;
//# sourceMappingURL=SoloBotCardLogic.d.ts.map