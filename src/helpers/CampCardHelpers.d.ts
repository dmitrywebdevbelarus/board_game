import type { AllCampCard, ArtefactCard, ArtefactPlayerCard, CampDeckCard, Context, MercenaryCard, MercenaryPlayerCard, PlayerID } from "../typescript/interfaces";
/**
 * <h3>Действия, связанные с добавлением карты лагеря артефакта в массив карт на поле игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе карты лагеря артефакта, добавляющейся на поле игрока.</li>
 * </ol>
 *
 * @param context
 * @param card Карта.
 * @returns Карта артефакт на поле игрока.
 */
export declare const AddArtefactToPlayerCards: (card: ArtefactCard) => ArtefactPlayerCard;
/**
 * <h3>Действия, связанные с добавлением карты наёмника в массив карт на поле игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе карты наёмника, добавляющейся на поле игрока.</li>
 * </ol>
 *
 * @param context
 * @param card Карта.
 * @returns Карта наёмник на поле игрока.
 */
export declare const AddMercenaryToPlayerCards: (card: MercenaryCard) => MercenaryPlayerCard;
/**
 * <h3>Действия, связанные с добавлением карт лагеря в массив карт игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе карт лагеря, добавляющихся на поле игрока.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param card Карта.
 * @returns
 */
export declare const AddCampCardToCards: ({ G, ctx, ...rest }: Context, playerID: PlayerID, card: CampDeckCard) => AllCampCard;
/**
 * <h3>Действия, связанные с выкладкой монет на артефакт Odroerir The Mythic Cauldron.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе карты лагеря.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const AddCoinOnOdroerirTheMythicCauldronCampCard: ({ G, ...rest }: Context) => void;
/**
 * <h3>Действия, связанные с завершением выкладки монет на артефакт Odroerir The Mythic Cauldron.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При отрисовке артефакта Odroerir The Mythic Cauldron.</li>
 * <li>При финальном подсчёте очков за артефакт Odroerir The Mythic Cauldron.</li>
 * </ol>
 *
 * @param context
 * @returns Значение всех монет на артефакте Odroerir The Mythic Cauldron.
 */
export declare const GetOdroerirTheMythicCauldronCoinsValues: ({ G }: Context) => number;
//# sourceMappingURL=CampCardHelpers.d.ts.map