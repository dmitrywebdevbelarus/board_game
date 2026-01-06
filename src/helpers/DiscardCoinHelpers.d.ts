import type { Context, PlayerCoinId, PlayerID, PublicPlayerCoins, RoyalCoin } from "../typescript/interfaces";
/**
 * <h3>Действия, связанные с убиранием монеты с рынка.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При действиях, убирающих монеты с рынка.</li>
 * </ol>
 *
 * @param context
 * @param coinId Id убираемой монеты.
 * @returns Убираемая монета с рынка.
 */
export declare const RemoveCoinFromMarket: ({ G }: Context, coinId: number) => RoyalCoin;
/**
 * <h3>Действия, связанные с убиранием монеты у игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При действиях, убирающих монеты у игрока.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param coins Массив монет игрока, откуда убирается монета.
 * @param coinId Id убираемой монеты.
 * @param isMultiplayer Является ли мультиплеером.
 * @returns Убираемая монета у игрока.
 */
export declare const RemoveCoinFromPlayer: ({ G, ...rest }: Context, playerID: PlayerID, coins: PublicPlayerCoins, coinId: PlayerCoinId, isMultiplayer?: boolean) => void;
//# sourceMappingURL=DiscardCoinHelpers.d.ts.map