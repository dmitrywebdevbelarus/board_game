import type { Entry } from "../typescript/interfaces";
/**
 * <h3>Получение значений типов у пары [ключ, значение] при вызове Object.entries.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При необходимости получения значений типов у пары [ключ, значение] объекта.</li>
 * </ol>
 *
 * @param object
 * @returns Пары [ключ, значение].
 */
export declare const MyObjectEntries: <T extends {}>(object: T) => readonly Entry<T>[];
//# sourceMappingURL=MyHelpers.d.ts.map