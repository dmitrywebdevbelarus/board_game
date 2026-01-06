import { SuitNames } from "../typescript/enums";
import type { AllHeroesForPlayerOrSoloBotAddToPlayerBoardPossibleCardId, Context, PlayerID } from "../typescript/interfaces";
/**
 * <h3>Действия, связанные с добавлениям героя игроку или соло боту.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При необходимости выбора героя игроком.</li>
 * <li>При необходимости выбора героя соло ботом Андвари.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param heroId Id героя.
 * @returns
 */
export declare const AddHeroToPlayerCardsAction: ({ G, ...rest }: Context, playerID: PlayerID, heroId: AllHeroesForPlayerOrSoloBotAddToPlayerBoardPossibleCardId) => void;
/**
 * <h3>Действия, связанные с сбросом карт с планшета игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе конкретных героев, сбрасывающих карты с планшета игрока.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param suit Название фракции дворфов.
 * @param cardId Id карты.
 * @returns
 */
export declare const DiscardCardsFromPlayerBoardAction: ({ G, ctx, ...rest }: Context, playerID: PlayerID, suit: SuitNames, cardId: number) => void;
/**
 * <h3>Действия, связанные с добавлением других карт на поле игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При добавлении героя Ольвин на игровое поле игрока.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param suit Название фракции дворфов.
 * @returns
 */
export declare const PlaceMultiSuitCardAction: ({ G, ...rest }: Context, playerID: PlayerID, suit: SuitNames) => void;
/**
 * <h3>Действия, связанные с проверкой расположением конкретного героя на игровом поле игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При добавлении героя Труд на игровое поле игрока.</li>
 * <li>При добавлении героя Труд на игровое поле соло бота.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param suit Название фракции дворфов.
 * @returns
 */
export declare const PlaceThrudAction: ({ G, ...rest }: Context, playerID: PlayerID, suit: SuitNames) => void;
/**
 * <h3>Действия, связанные с проверкой расположением конкретного героя на игровом поле игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При добавлении героя Илуд на игровом поле игрока.</li>
 * <li>При добавлении героя Илуд на игровом поле соло бота.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param suit Название фракции дворфов.
 * @returns
 */
export declare const PlaceYludAction: ({ G, ...rest }: Context, playerID: PlayerID, suit: SuitNames) => void;
//# sourceMappingURL=HeroActions.d.ts.map