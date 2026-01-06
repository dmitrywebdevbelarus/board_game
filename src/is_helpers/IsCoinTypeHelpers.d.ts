import type { AllCoins, InitialCoin, PublicPlayerCoin, RoyalCoin, TriggerTradingCoin } from "../typescript/interfaces";
/**
 * <h3>Проверка, является ли объект монетой.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При проверках в функции улучшения монеты.</li>
 * </ol>
 *
 * @param coin Пустой объект или монета.
 * @returns Является ли объект монетой.
 */
export declare const IsCoin: (coin: PublicPlayerCoin) => coin is AllCoins;
/**
* <h3>Проверка, является ли объект базовой монетой.</h3>
* <p>Применения:</p>
* <ol>
* <li>При проверках в функции улучшения монеты.</li>
* </ol>
*
* @param coin Пустой объект или монета.
* @returns Является ли объект базовой монетой.
*/
export declare const IsInitialCoin: (coin: PublicPlayerCoin) => coin is InitialCoin;
/**
* <h3>Проверка, является ли объект королевской монетой.</h3>
* <p>Применения:</p>
* <ol>
* <li>При проверках в функции улучшения монеты.</li>
* </ol>
*
* @param coin Пустой объект или королевская монета.
* @returns Является ли объект королевской монетой.
*/
export declare const IsRoyalCoin: (coin: PublicPlayerCoin) => coin is RoyalCoin;
/**
* <h3>Проверка, является ли объект любой монетой, активирующей обмен монет.</h3>
* <p>Применения:</p>
* <ol>
* <li>При проверках в функции улучшения монеты.</li>
* </ol>
*
* @param coin Пустой объект или монета.
* @returns Является ли объект любой монетой, активирующей обмен монет.
*/
export declare const IsTriggerTradingCoin: (coin: PublicPlayerCoin) => coin is TriggerTradingCoin;
//# sourceMappingURL=IsCoinTypeHelpers.d.ts.map