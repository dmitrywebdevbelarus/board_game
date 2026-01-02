import { Context } from "../typescript/interfaces";
import { GetCardsFromSecretDwarfDeck } from "./DecksHelpers";

export const RemovePickedCardFromSecretDwarfDeckByExplorerDistinction = (
    { G, ctx, random, ...rest }: Context,
): void => {
    if (G.explorerDistinctionCardId !== null && ctx.playOrderPos === (ctx.playOrder.length - 1)) {
        GetCardsFromSecretDwarfDeck(
            { G, ctx, random, ...rest },
            1,
            G.explorerDistinctionCardId,
            1,
        );
        G.secret.decks[1] = random.Shuffle(G.secret.decks[1]);
        G.explorerDistinctionCardId = null;
    }
};
