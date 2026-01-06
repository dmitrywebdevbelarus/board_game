import type { AllCoins, AllInitialCoins, BuildRoyalCoinsOptions, CoinNumberValues, Context, CreateSpecialTriggerTradingCoinFromData, MarketCoinNumberValues, RoyalCoin, SpecialTriggerTradingCoin } from "./typescript/interfaces";
/**
 * <h3>Создание всех базовых монет игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Вызывается при создании всех базовых монет игроков.</li>
 * </ol>
 *
 * @returns Массив всех базовых монет.
 */
export declare const BuildInitialCoins: () => AllInitialCoins;
/**
 * <h3>Создание всех королевских монет рынка.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Вызывается при создании всех королевских монет рынка.</li>
 * </ol>
 *
 * @param options Опции создания монет.
 * @returns Массив всех монет.
 */
export declare const BuildRoyalCoins: (options: BuildRoyalCoinsOptions) => RoyalCoin[];
/**
 * <h3>Изменяет статус, который открывает или закрывает монету.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Вызывается при различных действиях с монетами.</li>
 * </ol>
 *
 * @param coin Монета.
 * @param status Статус, который показывает нужно ли открыть или закрыть монету.
 * @returns
 */
export declare const ChangeIsOpenedCoinStatus: (coin: AllCoins, status: boolean) => void;
/**
 * <h3>Вычисляет количество монет каждого номинала на рынке монет.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Вызывается при отображении рынка монет.</li>
 * </ol>
 *
 * @param context
 * @returns Количество всех монет на рынке (с повторами).
 */
export declare const CountRoyalCoins: ({ G }: Context) => CoinNumberValues<MarketCoinNumberValues>;
/**
 * <h3>Создание особой монеты, активирующей обмен монет.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при создании особых монет,активирующих обмен монет.</li>
 * </ol>
 *.
 * @param isOpened Является ли монета открытой.
 * @param type Тип.
 * @param value Значение.
 * @returns Особая монета, активирующая обмен монет.
 */
export declare const CreateSpecialTriggerTradingCoin: ({ isOpened, type, value, }: CreateSpecialTriggerTradingCoinFromData) => SpecialTriggerTradingCoin;
//# sourceMappingURL=Coin.d.ts.map