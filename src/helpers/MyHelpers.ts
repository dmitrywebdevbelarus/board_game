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
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const MyObjectEntries = <T extends {}>(object: T): ReadonlyArray<Entry<T>> =>
    Object.entries(object) as unknown as ReadonlyArray<Entry<T>>;
