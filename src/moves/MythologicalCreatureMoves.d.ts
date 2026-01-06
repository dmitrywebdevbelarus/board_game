import { ButtonMoveNames, CardMoveNames, CoinMoveNames, SuitMoveNames } from "../typescript/enums";
import type { GetMoveArgument, MoveFn } from "../typescript/interfaces";
export declare const ActivateGodAbilityMove: MoveFn<GetMoveArgument<CardMoveNames.ActivateGodAbilityMove>>;
export declare const NotActivateGodAbilityMove: MoveFn<GetMoveArgument<ButtonMoveNames.NotActivateGodAbilityMove>>;
/**
 * <h3>Выбор монеты для улучшения по способности Гиганта Hrungnir.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Срабатывает при активации способности Гиганта Hrungnir при наличии героя Uline.</li>
 * </ol>
 *
 * @param context
 * @param coinId Id улучшаемой монеты.
 * @returns
 */
export declare const ChooseCoinValueForHrungnirUpgradeMove: MoveFn<GetMoveArgument<CoinMoveNames.ChooseCoinValueForHrungnirUpgradeMove>>;
/**
 * <h3>Выбор карты дворфа, а не активации способности конкретного Гиганта.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Срабатывает при выборе игроком карты Olrun.</li>
 * </ol>
 *
 * @param context
 * @param dwarfCard Карта Дворфа.
 * @returns
 */
export declare const ClickCardNotGiantAbilityMove: MoveFn<GetMoveArgument<CardMoveNames.ClickCardNotGiantAbilityMove>>;
/**
 * <h3>Выбор активации способности конкретного Гиганта.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Срабатывает при выборе игроком карты Olrun.</li>
 * </ol>
 *
 * @param context
 * @param card Карта Дворфа.
 * @returns
 */
export declare const ClickGiantAbilityNotCardMove: MoveFn<GetMoveArgument<CardMoveNames.ClickGiantAbilityNotCardMove>>;
/**
 * <h3>Выбор фракции карты Olrun.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Срабатывает при выборе игроком карты Olrun.</li>
 * </ol>
 *
 * @param context
 * @param suit Фракция дворфов.
 * @returns
 */
export declare const ChooseSuitOlrunMove: MoveFn<GetMoveArgument<SuitMoveNames.ChooseSuitOlrunMove>>;
/**
 * <h3>Выбор карты мифического существа Skymir.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Срабатывает при выборе игроком карты Olrun.</li>
 * </ol>
 *
 * @param context
 * @param cardId Id выбираемой карты Мифического существа.
 * @returns
 */
export declare const GetMythologyCardMove: MoveFn<GetMoveArgument<CardMoveNames.GetMythologyCardMove>>;
//# sourceMappingURL=MythologicalCreatureMoves.d.ts.map