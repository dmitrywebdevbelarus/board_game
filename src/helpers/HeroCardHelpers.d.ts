import type { AllHeroCard, Context, HeroCard, PlayerID } from "../typescript/interfaces";
/**
 * <h3>Действия, связанные с добавлением карты героя в массив карт игрока.</li>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе карты героя, добавляющейся в массив карт игрока.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param hero Карта героя.
 * @returns Карта героя | карта героя на пол игрока.
 */
export declare const AddHeroToPlayerCards: ({ ...rest }: Context, playerID: PlayerID, hero: HeroCard) => AllHeroCard;
/**
 * <h3>Действия, связанные с добавлением героев в массив карт соло бота.</li>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе конкретных героев, добавляющихся в массив карт соло бота.</li>
 * </ol>
 *
 * @param context
 * @param hero Карта героя.
 * @returns
 */
export declare const AddHeroForDifficultyToSoloBotCards: ({ G, ...rest }: Context, hero: HeroCard) => void;
//# sourceMappingURL=HeroCardHelpers.d.ts.map