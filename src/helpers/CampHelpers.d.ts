import type { Context } from "../typescript/interfaces";
/**
 * <h3>Убирает одну лишнюю карту из таверны в стопку сброса, если какой-то игрок выбрал в лагере артефакт Jarnglofi и если сброшенная обменная монета была выложена на месте одной из таверн.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе каким-то игроком в лагере артефакта Jarnglofi, если сброшенная обменная монета была выложена на месте одной из таверн.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const DiscardCardFromTavernJarnglofi: ({ G, ...rest }: Context) => void;
/**
 * <h3>Автоматически сбрасывает лишнюю карту таверны в колоду сброса, если первый игрок выбрал карту из лагеря.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Проверяется после каждого выбора карты из таверны, если последний игрок в текущей таверне уже выбрал карту.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const DiscardCardIfCampCardPicked: ({ G, ...rest }: Context) => void;
/**
 * <h3>Автоматически заполняет лагерь картами новой эпохи.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при начале новой эпохи.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const RefillCamp: ({ G, ...rest }: Context) => void;
/**
 * <h3>Автоматически заполняет лагерь недостающими картами текущей эпохи.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при начале раунда.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const RefillEmptyCampCards: ({ G, ...rest }: Context) => void;
//# sourceMappingURL=CampHelpers.d.ts.map