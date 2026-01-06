import type { CanBeVoid, Context, MyGameState, PlayerID } from "./typescript/interfaces";
/**
 * <h3>Подсчитывает суммарное количество текущих очков выбранного игрока за карты в колонках фракций.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Подсчёт и вывод на игровое поле текущее количество очков каждого игрока.</li>
 * <li>Подсчёт и вывод на игровое поле финальное количество очков каждого игрока.</li>
 * <li>Подсчёт очков игроков для анализа ботами.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param player Игрок.
 * @returns Текущий счёт указанного игрока.
 */
export declare const AllCurrentScoring: ({ G, ...rest }: Context, playerID: PlayerID) => number;
/**
 * <h3>Подсчитывает финальные очки для определения победителя.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Используется в конце игры для определения победителя для вывода данных на игровое поле.</li>
 * </ol>
 *
 * @param context
 * @returns Финальные данные о победителях, если закончилась игра.
 */
export declare const ScoreWinner: ({ G, ctx, ...rest }: Context) => CanBeVoid<MyGameState>;
//# sourceMappingURL=Score.d.ts.map