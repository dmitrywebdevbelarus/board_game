import { CoinNames } from "../typescript/enums";
import type { CoinCanBeUpgradedByValue, Context, PlayerCoinId, PlayerID } from "../typescript/interfaces";
/**
 * <h3>Действия, связанные с улучшением монет от карт улучшения монет.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе карт, улучшающих монеты.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param isTrading Является ли монета обменной.
 * @param value Значение улучшения монеты.
 * @param upgradingCoinId Id обменной монеты.
 * @param type Тип обменной монеты.
 * @returns
 */
export declare const UpgradeCoinAction: ({ G, ...rest }: Context, playerID: PlayerID, isTrading: boolean, value: CoinCanBeUpgradedByValue, upgradingCoinId: PlayerCoinId, type: CoinNames) => void;
//# sourceMappingURL=CoinActions.d.ts.map