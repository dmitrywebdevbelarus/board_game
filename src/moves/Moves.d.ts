import { ButtonMoveNames, CardMoveNames, DistinctionCardMoveNames, EmptyCardMoveNames, SuitMoveNames } from "../typescript/enums";
import type { GetMoveArgument, MoveFn } from "../typescript/interfaces";
/**
 * <h3>Выбор карты из таверны.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе базовой карты из таверны игроком.</li>
 * </ol>
 *
 * @param context
 * @param tavernCardId Id карты.
 * @returns
 */
export declare const ClickCardMove: MoveFn<GetMoveArgument<CardMoveNames.ClickCardMove>>;
/**
 * <h3>Выбор базовой карты из новой эпохи по преимуществу по фракции разведчиков.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе базовой карты из новой эпохи по преимуществу по фракции разведчиков.</li>
 * </ol>
 *
 * @param context
 * @param cardId Id карты.
 * @returns
 */
export declare const ClickCardToPickDistinctionMove: MoveFn<GetMoveArgument<CardMoveNames.ClickCardToPickDistinctionMove>>;
/**
 * <h3>Выбор конкретного преимущества по фракциям в конце первой эпохи.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>После определения преимуществ по фракциям в конце первой эпохи.</li>
 * </ol>
 *
 * @param context
 * @param suit Фракция.
 * @returns
 */
export declare const ClickDistinctionCardMove: MoveFn<GetMoveArgument<DistinctionCardMoveNames.ClickDistinctionCardMove>>;
/**
 * <h3>Убирает карту в колоду сброса в конце игры по выбору игрока при финальном действии артефакта Brisingamens.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Применяется при отправке карты в колоду сброса в конце игры при наличии артефакта Brisingamens.</li>
 * </ol>
 *
 * @param context
 * @param suit Название фракции дворфов.
 * @param cardId Id сбрасываемой карты.
 * @returns
 */
export declare const DiscardCardFromPlayerBoardMove: MoveFn<GetMoveArgument<CardMoveNames.DiscardCardFromPlayerBoardMove>>;
/**
 * <h3>Сбрасывает карту из таверны при выборе карты из лагеря на двоих игроков.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Применяется при выборе первым игроком карты из лагеря.</li>
 * </ol>
 *
 * @param context
 * @param tavernCardId Id сбрасываемой карты.
 * @returns
 */
export declare const DiscardCard2PlayersMove: MoveFn<GetMoveArgument<CardMoveNames.DiscardCard2PlayersMove>>;
/**
 * <h3>Выбор игроком карты наёмника для вербовки.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе какую карту наёмника будет вербовать игрок.</li>
 * </ol>
 *
 * @param context
 * @param cardId Id карты.
 * @returns
 */
export declare const GetEnlistmentMercenariesMove: MoveFn<GetMoveArgument<CardMoveNames.GetEnlistmentMercenariesMove>>;
/**
 * <h3>Выбирает фракцию для применения финального эффекта артефакта Mjollnir.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце игры при выборе игроком фракции для применения финального эффекта артефакта Mjollnir.</li>
 * </ol>
 *
 * @param context
 * @param suit Название фракции дворфов.
 * @returns
 */
export declare const GetMjollnirProfitMove: MoveFn<GetMoveArgument<SuitMoveNames.GetMjollnirProfitMove>>;
/**
 * <h3>Пасс первого игрока в начале фазы вербовки наёмников.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Первый игрок в начале фазы вербовки наёмников пасует для того, чтобы вербовать последним.</li>
 * </ol>
 *
 * @param context
 * @param param Параметр.
 * @returns
 */
export declare const PassEnlistmentMercenariesMove: MoveFn<GetMoveArgument<ButtonMoveNames.PassEnlistmentMercenariesMove>>;
/**
 * <h3>Выбор карт из колоды сброса.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе карт из колоды сброса по действию героев.</li>
 * <li>Выбор карт из колоды сброса по действию артефактов.</li>
 * </ol>
 *
 * @param context
 * @param cardId Id карты.
 * @returns
 */
export declare const PickDiscardCardMove: MoveFn<GetMoveArgument<CardMoveNames.PickDiscardCardMove>>;
/**
 * <h3>Выбор фракции куда будет завербован наёмник.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе фракции, куда будет завербован наёмник.</li>
 * </ol>
 *
 * @param context
 * @param suit Название фракции дворфов.
 * @returns
 */
export declare const PlaceEnlistmentMercenariesMove: MoveFn<GetMoveArgument<EmptyCardMoveNames.PlaceEnlistmentMercenariesMove>>;
/**
 * <h3>Начало вербовки наёмников.</li>
 * <p>Применения:</p>
 * <ol>
 * <li>Первый игрок в начале фазы вербовки наёмников выбирает старт вербовки.</li>
 * </ol>
 *
 * @param context
 * @param param Параметр.
 * @returns
 */
export declare const StartEnlistmentMercenariesMove: MoveFn<GetMoveArgument<ButtonMoveNames.StartEnlistmentMercenariesMove>>;
//# sourceMappingURL=Moves.d.ts.map