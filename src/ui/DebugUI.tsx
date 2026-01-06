import { MyObjectEntries } from "../helpers/MyHelpers";
import type { CanBeNull, CanBeUndef, Context, DebugData, DebugDrawData } from "../typescript/interfaces";

/**
 * <h3>Отрисовка дебаг панели.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка игрового поля.</li>
 * </ol>
 *
 * @param context
 * @returns Дебаг панель.
 */
export const DrawDebugData = (
    { ...rest }: Context,
): CanBeNull<JSX.Element> => {
    const debugData: CanBeUndef<DebugData> = GetDebugData({ ...rest });
    if (debugData === undefined) {
        return null;
    } else {
        return (
            <div>
                <h3>Debug info data:</h3>
                {DrawObjectData(debugData)}
            </div>
        );
    }
};

/**
 * <h3>Отрисовка информации в дебаг панели.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка игрового поля.</li>
 * </ol>
 *
 * @param obj Информация.
 * @returns Данные дебаг панели.
 */
const DrawObjectData = <T extends DebugDrawData>(
    obj: T,
): JSX.Element => {
    const values: JSX.Element[] = [];
    for (const [key, value] of MyObjectEntries(obj)) {
        if (value instanceof Object) {
            const data: JSX.Element = DrawObjectData(value);
            if (Array.isArray(value)) {
                values.push(
                    <li key={key}>
                        <details>
                            <summary><b><span className="text-pink-500">{key}</span>: </b><i>Array({value.length})</i>
                            </summary>
                            <ul className="list-none p-0 ml-5">
                                {data}
                            </ul>
                        </details>
                    </li>
                );
            } else {
                values.push(
                    <li key={key}>
                        <details>
                            <summary><b><span className="text-pink-500">{key}</span>: </b><i>Object</i></summary>
                            <ul className="list-none p-0 ml-5">
                                {data}
                            </ul>
                        </details>
                    </li>
                );
            }
        } else {
            values.push(
                <li key={key}>
                    <b><span className="text-pink-500">{key}</span>:</b> <span
                        className="text-purple-500">{value}</span>
                </li>
            );
        }
    }
    return (
        <div>
            <ul className="list-none p-0 ml-5">
                {values}
            </ul>
        </div>
    );
};

/**
 * <h3>Собирает данные в объект для отрисовки дебаг информации.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Используется в отображении дебаг панели.</li>
 * </ol>
 *
 * @param context
 * @returns Данные для отрисовки дебаг информации.
 */
const GetDebugData = (
    { G, ctx }: Context,
): CanBeUndef<DebugData> => {
    if (G.debug) {
        const debugData: DebugData = {
            G: {},
            ctx: {},
        };
        for (const [key, value] of MyObjectEntries(G)) {
            debugData.G[key] = value;
        }
        for (const [key, value] of MyObjectEntries(ctx)) {
            debugData.ctx[key] = value;
        }
        return debugData;
    }
    return undefined;
};
