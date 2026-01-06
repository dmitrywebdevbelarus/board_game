import { CoinNames } from "../typescript/enums";
import type { Context, PlayerCoinId, PlayerID, UpgradableCoinValue } from "../typescript/interfaces";
/**
 * <h3>Действия, связанные с улучшением монет от действий улучшающих монеты.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При действиях улучшающих монеты.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param coinId Id монеты.
 * @param type Тип обменной монеты.
 * @returns Значение на которое улучшается монета.
 */
export declare const UpgradeCoinActions: ({ G, ...rest }: Context, playerID: PlayerID, coinId: PlayerCoinId, type: CoinNames) => UpgradableCoinValue;
export declare const UpgradeNextCoinsHrungnir: ({ G, ...rest }: Context, playerID: PlayerID, coinId: PlayerCoinId) => void;
//# sourceMappingURL=CoinActionHelpers.d.ts.map