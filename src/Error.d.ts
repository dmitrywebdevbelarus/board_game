import { ErrorNames } from "./typescript/enums";
import type { Context, ErrorArgs } from "./typescript/interfaces";
/**
 * <h3>Все возможные ошибки/исключения в игре.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при любой ошибке/исключении.</li>
 * </ol>
 *
 * @param context
 * @param error Ошибка.
 * @param errorArgs Аргументы действия.
 * @returns
 */
export declare const ThrowMyError: ({ G, ctx }: Context, error: ErrorNames, ...errorArgs: ErrorArgs) => never;
//# sourceMappingURL=Error.d.ts.map