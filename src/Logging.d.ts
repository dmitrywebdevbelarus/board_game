import { LogNames } from "./typescript/enums";
import type { Context } from "./typescript/interfaces";
/**
 * <h3>Логирует данные.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Используется в выводе данных логов на игровом поле.</li>
 * </ol>
 *
 * @param context
 * @param type Тип лога.
 * @param value Значение, заносимое в лог.
 * @returns
 */
export declare const AddDataToLog: ({ G }: Context, type: LogNames, value: string) => void;
//# sourceMappingURL=Logging.d.ts.map