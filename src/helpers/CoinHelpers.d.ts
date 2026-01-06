import { CoinNames } from "../typescript/enums";
import type { Context, PlayerCoinId, PlayerID, ResolveBoardCoins, RoyalCoinValue } from "../typescript/interfaces";
/**
 * <h3>Сброс обменной монеты.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце 1-й эпохи, когда получается преимущество по фракции охотников (обмен '0' на '3').</li>
 * <li>Действия, связанные со сбросом обменной монеты по карте артефакта Jarnglofi.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @returns Тип и индекс сбрасываемой обменной монеты.
 */
export declare const DiscardTradingCoin: ({ G, ...rest }: Context, playerID: PlayerID) => [CoinNames, PlayerCoinId];
/**
 * <h3>Находит максимальную монету игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце игры, если выбран герой Астрид.</li>
 * <li>В конце игры, если получено преимущество по фракции воинов.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @returns Максимальная монета игрока.
 */
export declare const GetMaxCoinValue: ({ G, ...rest }: Context, playerID: PlayerID) => RoyalCoinValue;
/**
 * <h3>Открывает закрытые монеты на столе игроков.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце игры, когда нужно открыть все закрытые монеты всех игроков.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @returns
 */
export declare const OpenClosedCoinsOnPlayerBoard: ({ G, ...rest }: Context, playerID: PlayerID) => void;
/**
 * <h3>Открывает закрытые монеты текущей таверны на столе игроков.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В момент игры, когда нужно открыть все закрытые монеты текущей таверны всех игроков в фазу 'Смотр войск'.</li>
 * <li>В момент игры, когда нужно открыть все закрытые монеты текущей таверны всех игроков в фазу 'Ставки Улина'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const OpenCurrentTavernClosedCoinsOnPlayerBoard: ({ G, ctx, ...rest }: Context) => void;
/**
 * <h3>Определяет по расположению монет игроками порядок ходов и порядок обмена кристаллов приоритета.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>После выкладки всех монет игроками.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @returns Порядок ходов игроков & порядок изменения ходов игроками.
 */
export declare const ResolveAllBoardCoins: ({ G, ctx, ...rest }: Context) => ResolveBoardCoins;
/**
 * <h3>Возвращает все монеты игрока из руки на стол при наличии героя Улина.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При завершении игры.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @returns
 */
export declare const ReturnCoinsFromPlayerHandsToPlayerBoard: ({ G, ...rest }: Context, playerID: PlayerID) => void;
/**
 * <h3>Возвращает все монеты со стола в руки игроков в начале фазы выставления монет.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В начале фазы выставления монет.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const ReturnCoinsToPlayerHands: ({ G, ctx, ...rest }: Context) => void;
/**
 * <h3>Возвращает указанную монету в руку игрока, если она ещё не в руке.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При возврате всех монет в руку в начале фазы выставления монет.</li>
 * <li>При возврате монет в руку, когда взят герой Улина.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param coinId Id монеты.
 * @param close Нужно ли закрыть монету.
 * @returns Вернулась ли монета в руку.
 */
export declare const ReturnCoinToPlayerHands: ({ G, ...rest }: Context, playerID: PlayerID, coinId: PlayerCoinId, close: boolean) => boolean;
/**
 * <h3>Начинает рандомизацию монет в руке игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В момент подготовки к новому раунду.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const MixUpCoinsInPlayerHands: ({ G, ctx, ...rest }: Context) => void;
//# sourceMappingURL=CoinHelpers.d.ts.map