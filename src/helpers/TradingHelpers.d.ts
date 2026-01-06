import type { Context, PlayerID } from "../typescript/interfaces";
/**
 * <h3>Активирует обмен монет.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Когда заканчивается базовый выбор карты.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const ActivateTrading: ({ G, ctx, ...rest }: Context) => void;
/**
 * <h3>Стартует обмен монет.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Когда заканчивается ход игрока.</li>
 * <li>Когда заканчивается ход соло бота.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param isSoloBotEndRound Является ли данное действие в конце хода соло бота.
 * @returns
 */
export declare const StartTrading: ({ G, ...rest }: Context, playerID: PlayerID, isSoloBotEndRound?: boolean) => void;
//# sourceMappingURL=TradingHelpers.d.ts.map