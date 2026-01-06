import type { Context, DistinctionAwardingFunction, MinerDistinctionsScoring, PlayerID } from "../typescript/interfaces";
/**
 * <h3>Получение преимущества по фракции кузнецов.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце 1-й эпохи, когда получается преимущество по фракции кузнецов.</li>
 * <li>В конце игры, когда получается преимущество по фракции кузнецов.</li>
 * </ol>
 *
 * @param context
 * @returns Количество очков по преимуществу по конкретной фракции.
 */
export declare const BlacksmithDistinctionAwarding: DistinctionAwardingFunction;
/**
 * <h3>Получение преимущества по фракции разведчиков.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце 1-й эпохи, когда получается преимущество по фракции разведчиков.</li>
 * <li>В конце игры, когда получается преимущество по фракции разведчиков.</li>
 * </ol>
 *
 * @param context
 * @returns Количество очков по преимуществу по конкретной фракции.
 */
export declare const ExplorerDistinctionAwarding: DistinctionAwardingFunction;
/**
 * <h3>Получение преимущества по фракции охотников.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце 1-й эпохи, когда получается преимущество по фракции охотников.</li>
 * <li>В конце игры, когда получается преимущество по фракции охотников.</li>
 * </ol>
 *
 * @param context
 * @returns Количество очков по преимуществу по конкретной фракции.
 */
export declare const HunterDistinctionAwarding: DistinctionAwardingFunction;
/**
 * <h3>Получение преимущества по фракции горняков.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце 1-й эпохи, когда получается преимущество по фракции горняков.</li>
 * <li>В конце игры, когда получается преимущество по фракции горняков.</li>
 * </ol>
 *
 * @param context
 * @returns Количество очков по преимуществу по конкретной фракции.
 */
export declare const MinerDistinctionAwarding: DistinctionAwardingFunction;
/**
 * <h3>Получение преимущества по фракции воинов.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце 1-й эпохи, когда получается преимущество по фракции воинов.</li>
 * <li>В конце игры, когда получается преимущество по фракции воинов.</li>
 * </ol>
 *
 * @param context
 * @returns Количество очков по преимуществу по конкретной фракции.
 */
export declare const WarriorDistinctionAwarding: DistinctionAwardingFunction;
export declare const GetMinerDistinctionsScore: ({ G, ...rest }: Context, playerID: PlayerID) => MinerDistinctionsScoring;
/**
 * <h3>Завершение получения преимущества по фракции воинов или разведчиков.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце 1-й эпохи, когда получается преимущество по фракции воинов или разведчиков.</li>
 * <li>В конце игры, когда получается преимущество по фракции воинов или разведчиков.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export declare const EndWarriorOrExplorerDistinctionIfCoinUpgraded: ({ G }: Context) => void;
//# sourceMappingURL=DistinctionAwardingHelpers.d.ts.map