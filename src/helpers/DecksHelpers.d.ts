import { TierNames } from "../typescript/enums";
import type { CampDeckCard, Context, DrawTavernCardSize, ExplorerDistinctionCardId, RefillDeckCardsWithExpansionArray, RefillDeckCardsWithoutExpansionArray } from "../typescript/interfaces";
export declare const GetCardsFromSecretDwarfDeck: ({ G }: Context, tier: TierNames, start: ExplorerDistinctionCardId, amount: 1 | DrawTavernCardSize) => RefillDeckCardsWithoutExpansionArray;
export declare const GetCampCardsFromSecretCampDeck: ({ G }: Context, tier: TierNames, amount?: TierNames | undefined) => CampDeckCard[];
export declare const GetMythologicalCreatureCardsFromSecretMythologicalCreatureDeck: ({ G }: Context) => RefillDeckCardsWithExpansionArray;
//# sourceMappingURL=DecksHelpers.d.ts.map