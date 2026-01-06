import type { CreatePublicPlayerFromData, Priority, PrivatePlayer, PublicPlayer } from "./typescript/interfaces";
/**
 * <h3>Создаёт всех игроков (приватные данные).</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при инициализации игры.</li>
 * </ol>
 *
 * @returns Приватные данные игрока.
 */
export declare const BuildPlayer: () => PrivatePlayer;
/**
 * <h3>Создаёт всех игроков (публичные данные).</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при инициализации игры.</li>
 * </ol>
 *
 * @param nickname Никнейм.
 * @param priority Кристалл.
 * @param isPrivate Должны ли монеты быть приватными.
 * @returns Публичные данные игрока.
 */
export declare const BuildPublicPlayer: (nickname: string, priority: Priority, isPrivate: boolean) => PublicPlayer;
/**
 * <h3>Создание приватных данных игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при создании всех игроков при инициализации игры.</li>
 * </ol>
 *
 * @param boardCoins Массив монет на столе.
 * @param handCoins Массив монет в руке.
 * @returns Приватные данные игрока.
 */
export declare const CreatePrivatePlayer: ({ boardCoins, handCoins, }: PrivatePlayer) => PrivatePlayer;
/**
 * <h3>Создание публичных данных игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при создании всех игроков при инициализации игры.</li>
 * </ol>
 *
 * @param boardCoins Массив монет на столе.
 * @param buffs Бафы.
 * @param campCards Массив карт лагеря.
 * @param cards Массив карт.
 * @param currentCoinsScore Текущий счёт монет.
 * @param currentMaxCoinValue Текущее значение максимальной монеты.
 * @param giantTokenSuits Состояние токенов Гигантов.
 * @param handCoins Массив монет в руке.
 * @param heroes Массив героев.
 * @param mythologicalCreatureCards Массив карт мифических существ.
 * @param nickname Никнейм.
 * @param priority Кристалл.
 * @param selectedCoin Выбранная монета.
 * @param stack Стек действий.
 * @returns Публичные данные игрока.
 */
export declare const CreatePublicPlayer: ({ boardCoins, buffs, campCards, cards, currentCoinsScore, currentMaxCoinValue, giantTokenSuits, handCoins, heroes, mythologicalCreatureCards, nickname, priority, selectedCoin, stack, }: CreatePublicPlayerFromData) => PublicPlayer;
//# sourceMappingURL=Player.d.ts.map