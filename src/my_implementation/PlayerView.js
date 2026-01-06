/**
 * PlayerView reducers.
 */
export const PlayerView = {
    /**
     * STRIP_SECRETS
     *
     * Reducer which removes a key named `secret` and
     * removes all the keys in `players`, except for the one
     * corresponding to the current playerID.
     */
    STRIP_SECRETS: ({ G, playerID }) => {
        const r = { ...G };
        if (r.secret !== undefined) {
            // TODO FIT IT FOR MULTIPLAYER!
            // delete r.secret;
        }
        if (r.players) {
            r.players = playerID ? {
                [playerID]: r.players[playerID],
            } : {};
        }
        return r;
    },
};
//# sourceMappingURL=PlayerView.js.map