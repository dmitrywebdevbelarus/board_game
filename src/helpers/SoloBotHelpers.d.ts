import { CoinNames } from "../typescript/enums";
import type { AllCoinsValue, Context, MoveCoinsArguments, PlayerCoinId, PlayerID, PublicPlayerCoin } from "../typescript/interfaces";
/**
 * <h3>Определяет минимальную видимую монету соло бота.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при необходимости обмена минимальной видимой монеты соло ботом.</li>
 * </ol>
 *
 * @param context
 * @param coins Все видимые монеты соло бота.
 * @param minValue Минимальное видимое значение монеты соло бота.
 * @returns Id минимальной видимой монеты соло бота.
 */
export declare const CheckMinCoinVisibleIndexForSoloBot: ({ ...rest }: Context, coins: PublicPlayerCoin[], minValue: AllCoinsValue) => PlayerCoinId;
/**
 * <h3>Определяет минимальную монету соло бота Андвари.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при необходимости обмена минимальной монеты соло ботом Андвари.</li>
 * </ol>
 *
 * @param context
 * @param coins Все монеты соло бота Андвари.
 * @param minValue Минимальное значение монеты соло бота Андвари.
 * @returns Id минимальной монеты соло бота Андвари.
 */
export declare const CheckMinCoinIndexForSoloBotAndvari: ({ ...rest }: Context, coins: PublicPlayerCoin[], minValue: AllCoinsValue) => PlayerCoinId;
/**
 * <h3>Определяет значение минимальной видимой монеты соло бота.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при необходимости обмена минимальной видимой монеты соло ботом.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param moveArguments Аргументы действия соло бота.
 * @param type Тип минимальной видимой монеты соло бота.
 * @returns Значение минимальной видимой монеты соло бота.
 */
export declare const CheckMinCoinVisibleValueForSoloBot: ({ G, ctx, ...rest }: Context, playerID: PlayerID, moveArguments: MoveCoinsArguments[], type: CoinNames) => AllCoinsValue;
/**
 * <h3>Определяет значение минимальной монеты соло бота Андвари.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при необходимости обмена минимальной монеты соло ботом Андвари.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param moveArguments Аргументы действия соло бота.
 * @returns Значение минимальной монеты соло бота Андвари.
 */
export declare const CheckMinCoinVisibleValueForSoloBotAndvari: ({ G, ctx, ...rest }: Context, playerID: PlayerID, moveArguments: MoveCoinsArguments[]) => AllCoinsValue;
/**
 * <h3>Определяет минимальную видимую монету соло ботов.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при необходимости обмена минимальной видимой монеты соло ботом.</li>
 * <li>Происходит при необходимости обмена минимальной видимой монеты соло ботом Андвари.</li>
 * </ol>
 *
 * @param context
 * @param coins Все видимые монеты соло ботов.
 * @param minValue Минимальное видимое значение монеты соло ботов.
 * @returns Id минимальной видимой монеты соло ботов.
 */
export declare const GetMinCoinVisibleIndex: ({ G, ctx }: Context, coins: PublicPlayerCoin[], minValue: AllCoinsValue) => PlayerCoinId;
/**
 * <h3>Выкладка монет соло ботами в текущем порядке из руки.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Когда соло боту нужно выложить все монеты на игровой планшет.</li>
 * <li>Когда соло боту Андвари нужно выложить все монеты на игровой планшет.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @returns
 */
export declare const PlaceAllCoinsInCurrentOrderForSoloBot: ({ G, ...rest }: Context, playerID: PlayerID) => void;
/**
 * <h3>Выкладка монет соло ботами из руки в порядке, когда обменная монета не в кошеле.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Когда соло боту Андвари нужно выложить все монеты на игровой планшет.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @returns
 */
export declare const PlaceAllCoinsInOrderWithZeroNotOnThePouchForSoloBotAndvari: ({ G, ...rest }: Context, playerID: PlayerID) => void;
//# sourceMappingURL=SoloBotHelpers.d.ts.map