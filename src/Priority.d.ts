import type { CreatePriorityFromData, Ctx, PrioritiesForPlayerNumbers, Priority } from "./typescript/interfaces";
/**
 * <h3>Создание кристаллов.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Используется в массиве всех кристаллов.</li>
 * <li>Используется при раздаче кристаллов игрокам.</li>
 * <li>Используется при выдаче преимущества в виде кристалла горняков.</li>
 * </ol>
 *
 * @param isExchangeable Является ли кристалл обменным.
 * @param value Значение кристалла.
 * @returns Кристалл.
 */
export declare const CreatePriority: ({ isExchangeable, value, }: CreatePriorityFromData) => Priority;
/**
 * <h3>Генерирует кристаллы из конфига кристаллов по количеству игроков.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при инициализации игры.</li>
 * </ol>
 *
 * @param ctx
 * @param solo Является ли режим игры соло игрой.
 * @returns Массив базовых кристаллов.
 */
export declare const GeneratePrioritiesForPlayerNumbers: (ctx: Ctx, solo: boolean) => PrioritiesForPlayerNumbers;
//# sourceMappingURL=Priority.d.ts.map