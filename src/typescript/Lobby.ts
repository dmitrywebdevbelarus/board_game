import type { LobbyAPI } from "boardgame.io";
import type { DebugOpt } from "boardgame.io/dist/types/src/client/client";
import type { LobbyClient } from 'boardgame.io/dist/types/src/lobby/client';
import type { MatchOpts } from "boardgame.io/dist/types/src/lobby/match-instance";
import PropTypes from 'prop-types';
import React, { type ComponentType } from "react";
import { LobbyPhases } from "./enums";
import type { Game, NumPlayers, PlayerID } from "./interfaces";
import { Client } from "boardgame.io/react";

export interface GameComponent {
    game: Game;
    // TODO Fix it!
    board: ComponentType<unknown>;
}

export interface LobbyRendererProps {
    errorMsg: string;
    gameComponents: GameComponent[];
    matches: LobbyAPI.MatchList['matches'];
    phase: LobbyPhases;
    playerName: string;
    runningMatch?: RunningMatch;
    handleEnterLobby: (
        playerName: string,
    ) => void;
    handleExitLobby: () => Promise<void>;
    handleCreateMatch: (
        gameName: string,
        numPlayers: NumPlayers,
    ) => Promise<void>;
    handleJoinMatch: (
        gameName: string,
        matchID: string,
        playerID: PlayerID,
    ) => Promise<void>;
    handleLeaveMatch: (
        gameName: string,
        matchID: string,
    ) => Promise<void>;
    handleExitMatch: () => void;
    handleRefreshMatches: () => Promise<void>;
    handleStartMatch: (
        gameName: string,
        matchOpts: MatchOpts,
    ) => void;
}

interface LobbyConnectionOpts {
    server: string;
    playerName?: string;
    playerCredentials?: string;
    gameComponents: GameComponent[];
}
declare class _LobbyConnectionImpl {
    client: LobbyClient;
    gameComponents: GameComponent[];
    playerName: string;
    playerCredentials?: string;
    matches: LobbyAPI.MatchList['matches'];
    constructor({ server, gameComponents, playerName, playerCredentials, }: LobbyConnectionOpts);
    refresh(): Promise<void>;
    _getMatchInstance(matchID: string): LobbyAPI.Match;
    _getGameComponents(gameName: string): GameComponent;
    _findPlayer(playerName: string): LobbyAPI.Match;
    join(gameName: string, matchID: string, playerID: PlayerID): Promise<void>;
    leave(gameName: string, matchID: string): Promise<void>;
    disconnect(): Promise<void>;
    create(gameName: string, numPlayers: NumPlayers): Promise<void>;
}
/**
 * LobbyConnection
 *
 * Lobby model.
 *
 * @param {string}   server - '<host>:<port>' of the server.
 * @param {Array}    gameComponents - A map of Board and Game objects for the supported games.
 * @param {string}   playerName - The name of the player.
 * @param {string}   playerCredentials - The credentials currently used by the player, if any.
 *
 * Returns:
 *   A JS object that synchronizes the list of running game instances with the server and provides an API to create/join/start instances.
 */
export declare function LobbyConnection(opts: LobbyConnectionOpts): _LobbyConnectionImpl;

declare type RunningMatch = {
    app: ReturnType<typeof Client>;
    matchID: string;
    playerID: PlayerID;
    credentials?: string;
};

declare type LobbyProps = {
    gameComponents: GameComponent[];
    lobbyServer?: string;
    gameServer?: string;
    debug?: DebugOpt | boolean;
    clientFactory?: typeof Client;
    refreshInterval?: number;
    renderer?: (args: {
        errorMsg: string;
        gameComponents: GameComponent[];
        matches: LobbyAPI.MatchList['matches'];
        phase: LobbyPhases;
        playerName: string;
        runningMatch?: RunningMatch;
        handleEnterLobby: (playerName: string) => void;
        handleExitLobby: () => Promise<void>;
        handleCreateMatch: (gameName: string, numPlayers: NumPlayers) => Promise<void>;
        handleJoinMatch: (gameName: string, matchID: string, playerID: PlayerID) => Promise<void>;
        handleLeaveMatch: (gameName: string, matchID: string) => Promise<void>;
        handleExitMatch: () => void;
        handleRefreshMatches: () => Promise<void>;
        handleStartMatch: (gameName: string, matchOpts: MatchOpts) => void;
    }) => JSX.Element;
};
declare type LobbyState = {
    phase: LobbyPhases;
    playerName: string;
    runningMatch?: RunningMatch;
    errorMsg: string;
    credentialStore?: {
        [playerName: string]: string;
    };
};

/**
 * Lobby
 *
 * React lobby component.
 *
 * @param {Array}  gameComponents - An array of Board and Game objects for the supported games.
 * @param {string} lobbyServer - Address of the lobby server (for example 'localhost:8000').
 *                               If not set, defaults to the server that served the page.
 * @param {string} gameServer - Address of the game server (for example 'localhost:8001').
 *                              If not set, defaults to the server that served the page.
 * @param {function} clientFactory - Function that is used to create the game clients.
 * @param {number} refreshInterval - Interval between server updates (default: 2000ms).
 * @param {bool}   debug - Enable debug information (default: false).
 *
 * Returns:
 *   A React component that provides a UI to create, list, join, leave, play or
 *   spectate matches (game instances).
 */
declare class Lobby extends React.Component<LobbyProps, LobbyState> {
    static propTypes: {
        gameComponents: PropTypes.Validator<unknown[]>;
        lobbyServer: PropTypes.Requireable<string>;
        gameServer: PropTypes.Requireable<string>;
        debug: PropTypes.Requireable<boolean>;
        clientFactory: PropTypes.Requireable<(...args: unknown[]) => unknown>;
        refreshInterval: PropTypes.Requireable<number>;
    };
    static defaultProps: {
        debug: boolean;
        clientFactory: typeof Client;
        refreshInterval: number;
    };
    state: {
        phase: LobbyPhases;
        playerName: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        runningMatch: any;
        errorMsg: string;
        // TODO Fix it!!!
        // eslint-disable-next-line @typescript-eslint/no-empty-object-type
        credentialStore: {};
    };
    private connection?;
    private _currentInterval?;
    constructor(props: LobbyProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: LobbyProps, prevState: LobbyState): void;
    componentWillUnmount(): void;
    _startRefreshInterval(): void;
    _clearRefreshInterval(): void;
    _createConnection: (props: LobbyProps) => void;
    _updateCredentials: (playerName: string, credentials: string) => void;
    _updateConnection: () => Promise<void>;
    _enterLobby: (playerName: string) => void;
    _exitLobby: () => Promise<void>;
    _createMatch: (gameName: string, numPlayers: NumPlayers) => Promise<void>;
    _joinMatch: (gameName: string, matchID: string, playerID: PlayerID) => Promise<void>;
    _leaveMatch: (gameName: string, matchID: string) => Promise<void>;
    _startMatch: (gameName: string, matchOpts: MatchOpts) => void;
    _exitMatch: () => void;
    _getPhaseVisibility: (phase: LobbyPhases) => "hidden" | "phase";
    renderMatches: (matches: LobbyAPI.MatchList['matches'], playerName: string) => JSX.Element[];
    render(): JSX.Element;
}

export default Lobby;
