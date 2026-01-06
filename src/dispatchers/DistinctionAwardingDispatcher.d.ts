import { DistinctionAwardingFunctionNames } from "../typescript/enums";
import type { Action, AllCoinsValue, Context, PlayerID } from "../typescript/interfaces";
/**
 * <h3>Начинает действие по получению преимущества по фракции дворфов.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Выполняется при необходимости получить преимущество по фракции дворфов.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param action Объект действия.
 * @returns Количество очков по преимуществу по фракции.
 */
export declare const StartDistinctionAwarding: ({ ...rest }: Context, playerID: PlayerID, action: Action<DistinctionAwardingFunctionNames, undefined>) => AllCoinsValue;
//# sourceMappingURL=DistinctionAwardingDispatcher.d.ts.map