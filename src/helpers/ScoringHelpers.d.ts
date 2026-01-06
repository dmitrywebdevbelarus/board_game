import type { Context, CurrentPlayerCoinsScore, MinerDistinctionsScoring, PlayerID, RoyalCoinValue } from "../typescript/interfaces";
export declare const CurrentAllSuitsScoring: ({ ...rest }: Context, playerID: PlayerID) => number;
export declare const CurrentPotentialMinerDistinctionsScoring: ({ ...rest }: Context, playerID: PlayerID) => MinerDistinctionsScoring;
export declare const CurrentPotentialWarriorDistinctionsScoring: ({ G, ...rest }: Context, playerID: PlayerID) => number;
export declare const CurrentOrFinalAllHeroesScoring: ({ G, ...rest }: Context, playerID: PlayerID, isFinal?: boolean) => number;
export declare const CurrentOrFinalAllMythologicalCreaturesScoring: ({ G, ...rest }: Context, playerID: PlayerID, isFinal?: boolean) => number;
export declare const CurrentOrFinalAllArtefactScoring: ({ G, ...rest }: Context, playerID: PlayerID, isFinal?: boolean) => number;
export declare const FinalAllSuitsScoring: ({ G, ...rest }: Context, playerID: PlayerID) => number;
export declare const FinalAllBoardCoinsScoring: ({ G, ...rest }: Context, playerID: PlayerID) => CurrentPlayerCoinsScore;
export declare const FinalMinerDistinctionsScoring: ({ G, ...rest }: Context, playerID: PlayerID) => MinerDistinctionsScoring;
export declare const FinalWarriorDistinctionsScoring: ({ G, ...rest }: Context, playerID: PlayerID) => RoyalCoinValue;
//# sourceMappingURL=ScoringHelpers.d.ts.map