import type { CanBeUndef, Context, PlayerID, PlayOrderPos, PublicPlayersOrderArray } from "../typescript/interfaces";
import { AssertPlayerIndex, AssertPublicPlayersOrderArray } from "../is_helpers/AssertionTypeHelpers";

/**
 * Set of different turn orders possible in a phase.
 * These are meant to be passed to the `turn` setting
 * in the flow objects.
 *
 * Each object defines the first player when the phase / game
 * begins, and also a function `next` to determine who the
 * next player is when the turn ends.
 *
 * The phase ends if next() returns undefined.
 */
export const TurnOrder = {
    /**
     * DEFAULT
     *
     * The default round-robin turn order.
     */
    DEFAULT: {
        first: ({ ctx }: Context): PlayOrderPos => {
            const pos: number = (ctx.playOrderPos + 1) % ctx.playOrder.length;
            AssertPlayerIndex(ctx, pos);
            return ctx.turn === 0 ? ctx.playOrderPos : pos;
        },
        next: ({ ctx }: Context): CanBeUndef<PlayOrderPos> => {
            const pos: number = (ctx.playOrderPos + 1) % ctx.playOrder.length;
            AssertPlayerIndex(ctx, pos);
            return pos;
        },
    },

    /**
     * RESET
     *
     * Similar to DEFAULT, but starts from 0 each time.
     */
    RESET: {
        first: (): PlayOrderPos => 0,
        next: ({ ctx }: Context): CanBeUndef<PlayOrderPos> => {
            const pos: number = (ctx.playOrderPos + 1) % ctx.playOrder.length;
            AssertPlayerIndex(ctx, pos);
            return pos;
        },
    },

    /**
     * CONTINUE
     *
     * Similar to DEFAULT, but starts with the player who ended the last phase.
     */
    CONTINUE: {
        first: ({ ctx }: Context): PlayOrderPos => ctx.playOrderPos,
        next: ({ ctx }: Context): CanBeUndef<PlayOrderPos> => {
            const pos: number = (ctx.playOrderPos + 1) % ctx.playOrder.length;
            AssertPlayerIndex(ctx, pos);
            return pos;
        },
    },

    /**
     * ONCE
     *
     * Another round-robin turn order, but goes around just once.
     * The phase ends after all players have played.
     */
    ONCE: {
        first: (): PlayOrderPos => 0,
        next: ({ ctx }: Context): CanBeUndef<PlayOrderPos> => {
            if (ctx.playOrderPos < ctx.playOrder.length - 1) {
                const pos: number = ctx.playOrderPos + 1;
                AssertPlayerIndex(ctx, pos);
                return pos;
            }
            return undefined;
        },
    },

    /**
     * CUSTOM
     *
     * Identical to DEFAULT, but also sets playOrder at the
     * beginning of the phase.
     *
     * @param {Array} playOrder - The play order.
     */
    CUSTOM: (playOrder: PlayerID[]) => ({
        playOrder: (): PublicPlayersOrderArray => {
            AssertPublicPlayersOrderArray(playOrder);
            return playOrder;
        },
        first: (): PlayOrderPos => 0,
        next: ({ ctx }: Context): CanBeUndef<PlayOrderPos> => {
            const pos: number = (ctx.playOrderPos + 1) % ctx.playOrder.length;
            AssertPlayerIndex(ctx, pos);
            return pos;
        },
    }),

    /**
     * CUSTOM_FROM
     *
     * Identical to DEFAULT, but also sets playOrder at the
     * beginning of the phase to a value specified by a field
     * in G.
     *
     * @param {string} playOrderField - Field in G.
     */
    CUSTOM_FROM: (playOrderField: `publicPlayersOrder`) => ({
        playOrder: ({ G }: Context): PublicPlayersOrderArray => G[playOrderField],
        first: (): PlayOrderPos => 0,
        next: ({ ctx }: Context): CanBeUndef<PlayOrderPos> => {
            const pos: number = (ctx.playOrderPos + 1) % ctx.playOrder.length;
            AssertPlayerIndex(ctx, pos);
            return pos;
        },
    }),
};
