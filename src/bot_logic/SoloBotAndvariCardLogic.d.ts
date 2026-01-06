import type { CanBeUndef, Context, PlayerID } from "../typescript/interfaces";
/**
 * <h3>Проверяет возможность получения нового героя при выборе карты из таверны соло ботом Андвари.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При необходимости выбора карты из таверны соло ботом Андвари.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param moveArguments Аргументы действия соло бота Андвари.
 * @returns Id карты из таверны, при выборе которой можно получить нового героя.
 */
export declare const CheckSoloBotAndvariMustTakeCardToPickHero: ({ G, ...rest }: Context, playerID: PlayerID, moveArguments: number[]) => CanBeUndef<number>;
/**
 * <h3>Проверяет возможность получения карты по главной стратегии при выборе карты из таверны соло ботом Андвари.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При необходимости выбора карты из таверны соло ботом Андвари.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param moveArguments Аргументы действия соло бота Андвари.
 * @returns Id карты из таверны, при выборе которой можно получить карту по главной стратегии соло бота Андвари.
 */
export declare const CheckSoloBotAndvariMustTakeCardFromGeneralStrategy: ({ G, ...rest }: Context, playerID: PlayerID, moveArguments: number[]) => CanBeUndef<number>;
/**
 * <h3>Проверяет возможность получения карты по резервной стратегии при выборе карты из таверны соло ботом Андвари.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При необходимости выбора карты из таверны соло ботом Андвари.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param moveArguments Аргументы действия соло бота Андвари.
 * @returns Id карты из таверны, при выборе которой можно получить карту по резервной стратегии соло бота Андвари.
 */
export declare const SoloBotMustTakeCardFromReserveStrategy: ({ G, ...rest }: Context, playerID: PlayerID, moveArguments: number[]) => number;
/**
 * <h3>Проверяет получение карты Королевской награды при выборе карты из таверны соло ботом Андвари.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При необходимости выбора карты из таверны соло ботом Андвари.</li>
 * </ol>
 *
 * @param context
 * @param moveArguments Аргументы действия соло бота Андвари.
 * @returns Id карты Королевской награды из таверны.
 */
export declare const CheckSoloBotAndvariMustTakeRoyalOfferingCard: ({ G, ...rest }: Context, moveArguments: number[]) => CanBeUndef<number>;
//# sourceMappingURL=SoloBotAndvariCardLogic.d.ts.map