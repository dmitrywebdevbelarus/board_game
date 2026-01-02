import { Context } from "vm";
import { Keyof, MyGameState, PlayOrder, PlayOrderPos } from "./interfaces";

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
declare const TurnOrder: {
    /**
     * DEFAULT
     *
     * The default round-robin turn order.
     */
    DEFAULT: {
        first: ({ ctx }: Context) => PlayOrderPos;
        next: ({ ctx }: Context) => PlayOrderPos;
    };
    /**
     * RESET
     *
     * Similar to DEFAULT, but starts from 0 each time.
     */
    RESET: {
        first: () => PlayOrderPos;
        next: ({ ctx }: Context) => PlayOrderPos;
    };
    /**
     * CONTINUE
     *
     * Similar to DEFAULT, but starts with the player who ended the last phase.
     */
    CONTINUE: {
        first: ({ ctx }: Context) => PlayOrderPos;
        next: ({ ctx }: Context) => PlayOrderPos;
    };
    /**
     * ONCE
     *
     * Another round-robin turn order, but goes around just once.
     * The phase ends after all players have played.
     */
    ONCE: {
        first: () => PlayOrder;
        next: ({ ctx }: Context) => PlayOrderPos;
    };
    /**
     * CUSTOM
     *
     * Identical to DEFAULT, but also sets playOrder at the
     * beginning of the phase.
     *
     * @param {Array} playOrder - The play order.
     */
    CUSTOM: (playOrder: PlayOrder) => {
        playOrder: () => PlayOrder;
        first: () => PlayOrderPos;
        next: ({ ctx }: Context) => PlayOrderPos;
    };
    /**
     * CUSTOM_FROM
     *
     * Identical to DEFAULT, but also sets playOrder at the
     * beginning of the phase to a value specified by a field
     * in G.
     *
     * @param {string} playOrderField - Field in G.
     */
    CUSTOM_FROM: (playOrderField: Keyof<MyGameState>) => {
        playOrder: ({ G }: Context) => PlayOrder;
        first: () => PlayOrderPos;
        next: ({ ctx }: Context) => PlayOrderPos;
    };
};

export default TurnOrder;
