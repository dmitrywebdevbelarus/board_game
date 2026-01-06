import { PhaseNames } from "../typescript/enums";
import type { CanBeVoid, Context } from "../typescript/interfaces";
/**
 * <h3>Проверяет необходимость начала фазы 'Ставки Улина' или фазы 'Посещение таверн'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При действиях, после которых может начаться фаза 'Ставки Улина' или фаза 'Посещение таверн'.</li>
 * </ol>
 *
 * @param context
 * @returns Фаза игры.
 */
export declare const StartBidUlineOrTavernsResolutionPhase: ({ G, ctx, ...rest }: Context) => PhaseNames;
/**
 * <h3>Завершает каждую фазу конца игры и проверяет переход к другим фазам или завершает игру.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>После завершения действий в каждой фазе конца игры.</li>
 * </ol>
 *
 * @param context
 * @returns Фаза игры.
 */
export declare const StartEndGameLastActions: ({ G, ctx, ...rest }: Context) => CanBeVoid<PhaseNames>;
/**
* <h3>Проверка начала фазы 'Поместить Труд' или фазы конца игры.</h3>
* <p>Применения:</p>
* <ol>
* <li>После завершения всех карт в деке каждой эпохи.</li>
* <li>После завершения фазы 'enlistmentMercenaries'.</li>
* </ol>
*
* @param context
* @returns Фаза игры.
*/
export declare const StartEndTierPhaseOrEndGameLastActions: ({ G, ctx, ...rest }: Context) => CanBeVoid<PhaseNames>;
//# sourceMappingURL=NextPhaseHooks.d.ts.map