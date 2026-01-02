import { CoinRusNames } from "../typescript/enums";
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
export const IsCoin = (
    coin: PublicPlayerCoin,
): coin is AllCoins => coin !== null && (coin as AllCoins).value !== undefined;

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
export const IsInitialCoin = (
    coin: PublicPlayerCoin,
): coin is InitialCoin => coin !== null && ((coin as InitialCoin).type === CoinRusNames.InitialNotTriggerTrading
    || (coin as InitialCoin).type === CoinRusNames.InitialTriggerTrading);

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
export const IsRoyalCoin = (
    coin: PublicPlayerCoin,
): coin is RoyalCoin => coin !== null && (coin as RoyalCoin).type === CoinRusNames.Royal;

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
export const IsTriggerTradingCoin = (
    coin: PublicPlayerCoin,
): coin is TriggerTradingCoin => coin !== null
    && ((coin as TriggerTradingCoin).type === CoinRusNames.InitialTriggerTrading
        || (coin as TriggerTradingCoin).type === CoinRusNames.SpecialTriggerTrading);
