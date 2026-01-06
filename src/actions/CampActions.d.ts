import { CoinNames } from "../typescript/enums";
import type { BasicVidofnirVedrfolnirUpgradeValue, Context, PlayerCoinId, PlayerID, PlayerPouchCoinId } from "../typescript/interfaces";
/**
 * <h3>Действия, связанные с добавлением монет в кошель для обмена при наличии персонажа Улина для начала действия артефакта Vidofnir Vedrfolnir.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе карты артефакта Vidofnir Vedrfolnir и наличии героя Улина.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param coinId Id монеты.
 * @returns
 */
export declare const AddCoinToPouchAction: ({ G, ...rest }: Context, playerID: PlayerID, coinId: PlayerCoinId) => void;
/**
 * <h3>Действия, связанные с выбором значения улучшения монеты при наличии персонажа Улина для начала действия артефакта Vidofnir Vedrfolnir.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе карты артефакта Vidofnir Vedrfolnir и наличии героя Улина.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param value Значение улучшения монеты.
 * @returns
 */
export declare const ChooseCoinValueForVidofnirVedrfolnirUpgradeAction: ({ G, ...rest }: Context, playerID: PlayerID, value: BasicVidofnirVedrfolnirUpgradeValue) => void;
/**
 * <h3>Действия, связанные с сбросом карты из конкретной фракции игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе карты для сброса по действию карты лагеря артефакта Hofud.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param cardId Id сбрасываемой карты.
 * @returns
 */
export declare const DiscardSuitCardAction: ({ G, ...rest }: Context, playerID: PlayerID, cardId: number) => void;
/**
 * <h3>Действия, связанные с выбором карты лагеря.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе карты лагеря.</li>
 * <li>При выборе карты лагеря по действию персонажа Хольда.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param campCardId Id выбранной карты.
 * @returns
 */
export declare const PickCampCardAction: ({ G, ...rest }: Context, playerID: PlayerID, campCardId: 0 | 1 | 2 | 3 | 4) => void;
/**
 * <h3>Действия, связанные с улучшением монеты способности артефакта Vidofnir Vedrfolnir.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При старте улучшения монеты карты лагеря артефакта Vidofnir Vedrfolnir.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param coinId Id монеты.
 * @param type Тип монеты.
 * @returns
 */
export declare const UpgradeCoinVidofnirVedrfolnirAction: ({ G, ...rest }: Context, playerID: PlayerID, coinId: PlayerPouchCoinId, type: CoinNames) => void;
//# sourceMappingURL=CampActions.d.ts.map