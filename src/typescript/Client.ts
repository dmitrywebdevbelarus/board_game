import { ActionPayload, ChatMessage, FilteredMetadata, LogEntry, PluginState, Store, Undo } from "boardgame.io";
import type { DebugOpt } from "boardgame.io/dist/types/src/client/client";
import type { Transport, TransportOpts } from "boardgame.io/dist/types/src/client/transport/transport";
import type { Flow } from 'boardgame.io/dist/types/src/core/flow';
import { JSX } from "react";
import type { StoreEnhancer } from 'redux';
import { InvalidMoveNames, PhaseNames } from "./enums";
import { ActivePlayersArg, ActiveStageNames, Args, CanBeNull, Ctx, Game, Keyof, MoveFn, MoveNames, MyGameState, NumPlayers, PlayerID } from "./interfaces";

/**
 * Client
 *
 * boardgame.io React client.
 *
 * @param {...object} game - The return value of `Game`.
 * @param {...object} numPlayers - The number of players.
 * @param {...object} board - The React component for the game.
 * @param {...object} loading - (optional) The React component for the loading state.
 * @param {...object} multiplayer - Set to a falsy value or a transportFactory, e.g., SocketIO()
 * @param {...object} debug - Enables the Debug UI.
 * @param {...object} enhancer - Optional enhancer to send to the Redux store
 *
 * Returns:
 *   A React component that wraps board and provides an
 *   API through props for it to interact with the framework
 *   and dispatch actions such as MAKE_MOVE, GAME_EVENT, RESET,
 *   UNDO and REDO.
 */
declare function Client<P extends BoardProps = BoardProps>(opts: ReactClientOpts<P>): {
    new(props: Pick<ClientOpts,
        | "matchID"
        | "playerID"
        | "credentials"
        | "debug"
    > & Pick<P, Exclude<keyof P,
        | "matchID"
        | "playerID"
        | "credentials"
        | "debug"
        | "log"
        | "moves"
        | "events"
        | "reset"
        | "undo"
        | "redo"
        | "matchData"
        | "sendChatMessage"
        | "chatMessages"
        | "plugins"
        | "deltalog"
        | "G"
        | "ctx"
        | "_undo"
        | "_redo"
        | "_stateID"
        | "isActive"
        | "isConnected"
        | "isMultiplayer"
    >>): {
        client: _ClientImpl;
        unsubscribe?: () => void;
        componentDidMount(): void;
        componentWillUnmount(): void;
        componentDidUpdate(prevProps: Pick<ClientOpts,
            | "matchID"
            | "playerID"
            | "credentials"
            | "debug"
        > & Pick<P, Exclude<keyof P,
            | "matchID"
            | "playerID"
            | "credentials"
            | "debug"
            | "log"
            | "moves"
            | "events"
            | "reset"
            | "undo"
            | "redo"
            | "matchData"
            | "sendChatMessage"
            | "chatMessages"
            | "plugins"
            | "deltalog"
            | "G"
            | "ctx"
            | "_undo"
            | "_redo"
            | "_stateID"
            | "isActive"
            | "isConnected"
            | "isMultiplayer"
        >>): void;
        render(): JSX.Element;
        context: unknown;
        setState<K extends never>(state:
            // eslint-disable-next-line @typescript-eslint/no-empty-object-type
            | {}
            // eslint-disable-next-line @typescript-eslint/no-empty-object-type
            | ((prevState: Readonly<{}>, props: Readonly<Pick<ClientOpts,
                | "matchID"
                | "playerID"
                | "credentials"
                | "debug"
            > & Pick<P, Exclude<keyof P,
                | "matchID"
                | "playerID"
                | "credentials"
                | "debug"
                | "log"
                | "moves"
                | "events"
                | "reset"
                | "undo"
                | "redo"
                | "matchData"
                | "sendChatMessage"
                | "chatMessages"
                | "plugins"
                | "deltalog"
                | "G"
                | "ctx"
                | "_undo"
                | "_redo"
                | "_stateID"
                | "isActive"
                | "isConnected"
                | "isMultiplayer"
            >>>) =>
                // eslint-disable-next-line @typescript-eslint/no-empty-object-type
                | {}
                // eslint-disable-next-line @typescript-eslint/no-empty-object-type
                | Pick<{}, K>
            )
            // eslint-disable-next-line @typescript-eslint/no-empty-object-type
            | Pick<{}, K>
            , callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        readonly props: Readonly<Pick<ClientOpts,
            | "matchID"
            | "playerID"
            | "credentials"
            | "debug"
        > & Pick<P, Exclude<keyof P,
            | "matchID"
            | "playerID"
            | "credentials"
            | "debug"
            | "log"
            | "moves"
            | "events"
            | "reset"
            | "undo"
            | "redo"
            | "matchData"
            | "sendChatMessage"
            | "chatMessages"
            | "plugins"
            | "deltalog"
            | "G"
            | "ctx"
            | "_undo"
            | "_redo"
            | "_stateID"
            | "isActive"
            | "isConnected"
            | "isMultiplayer"
        >>> & Readonly<{
            children?: React.ReactNode;
        }>;
        // eslint-disable-next-line @typescript-eslint/no-empty-object-type
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<Pick<ClientOpts,
            | "matchID"
            | "playerID"
            | "credentials"
            | "debug"
        > & Pick<P, Exclude<keyof P,
            | "matchID"
            | "playerID"
            | "credentials"
            | "debug"
            | "log"
            | "moves"
            | "events"
            | "reset"
            | "undo"
            | "redo"
            | "matchData"
            | "sendChatMessage"
            | "chatMessages"
            | "plugins"
            | "deltalog"
            | "G"
            | "ctx"
            | "_undo"
            | "_redo"
            | "_stateID"
            | "isActive"
            | "isConnected"
            | "isMultiplayer"
        // eslint-disable-next-line @typescript-eslint/no-empty-object-type
        >>>, nextState: Readonly<{}>, nextContext: unknown): boolean;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<ClientOpts,
            | "matchID"
            | "playerID"
            | "credentials"
            | "debug"
        > & Pick<P, Exclude<keyof P,
            | "matchID"
            | "playerID"
            | "credentials"
            | "debug"
            | "log"
            | "moves"
            | "events"
            | "reset"
            | "undo"
            | "redo"
            | "matchData"
            | "sendChatMessage"
            | "chatMessages"
            | "plugins"
            | "deltalog"
            | "G"
            | "ctx"
            | "_undo"
            | "_redo"
            | "_stateID"
            | "isActive"
            | "isConnected"
            | "isMultiplayer"
        // eslint-disable-next-line @typescript-eslint/no-empty-object-type
        >>>, prevState: Readonly<{}>): unknown;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Pick<ClientOpts,
            | "matchID"
            | "playerID"
            | "credentials"
            | "debug"
        > & Pick<P, Exclude<keyof P,
            | "matchID"
            | "playerID"
            | "credentials"
            | "debug"
            | "log"
            | "moves"
            | "events"
            | "reset"
            | "undo"
            | "redo"
            | "matchData"
            | "sendChatMessage"
            | "chatMessages"
            | "plugins"
            | "deltalog"
            | "G"
            | "ctx"
            | "_undo"
            | "_redo"
            | "_stateID"
            | "isActive"
            | "isConnected"
            | "isMultiplayer"
        >>>, nextContext: unknown): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<ClientOpts,
            | "matchID"
            | "playerID"
            | "credentials"
            | "debug"
        > & Pick<P, Exclude<keyof P,
            | "matchID"
            | "playerID"
            | "credentials"
            | "debug"
            | "log"
            | "moves"
            | "events"
            | "reset"
            | "undo"
            | "redo"
            | "matchData"
            | "sendChatMessage"
            | "chatMessages"
            | "plugins"
            | "deltalog"
            | "G"
            | "ctx"
            | "_undo"
            | "_redo"
            | "_stateID"
            | "isActive"
            | "isConnected"
            | "isMultiplayer"
        >>>, nextContext: unknown): void;
        componentWillUpdate?(nextProps: Readonly<Pick<ClientOpts,
            | "matchID"
            | "playerID"
            | "credentials"
            | "debug"
        > & Pick<P, Exclude<keyof P,
            | "matchID"
            | "playerID"
            | "credentials"
            | "debug"
            | "log"
            | "moves"
            | "events"
            | "reset"
            | "undo"
            | "redo"
            | "matchData"
            | "sendChatMessage"
            | "chatMessages"
            | "plugins"
            | "deltalog"
            | "G"
            | "ctx"
            | "_undo"
            | "_redo"
            | "_stateID"
            | "isActive"
            | "isConnected"
            | "isMultiplayer"
        // eslint-disable-next-line @typescript-eslint/no-empty-object-type
        >>>, nextState: Readonly<{}>, nextContext: unknown): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<ClientOpts,
            | "matchID"
            | "playerID"
            | "credentials"
            | "debug"
        > & Pick<P, Exclude<keyof P,
            | "matchID"
            | "playerID"
            | "credentials"
            | "debug"
            | "log"
            | "moves"
            | "events"
            | "reset"
            | "undo"
            | "redo"
            | "matchData"
            | "sendChatMessage"
            | "chatMessages"
            | "plugins"
            | "deltalog"
            | "G"
            | "ctx"
            | "_undo"
            | "_redo"
            | "_stateID"
            | "isActive"
            | "isConnected"
            | "isMultiplayer"
        // eslint-disable-next-line @typescript-eslint/no-empty-object-type
        >>>, nextState: Readonly<{}>, nextContext: unknown): void;
    };
    propTypes: {
        matchID: Requireable<string>;
        playerID: Requireable<PlayerID>;
        credentials: Requireable<string>;
        debug: Requireable<unknown>;
    };
    defaultProps: {
        matchID: string;
        playerID: PlayerID;
        credentials: unknown;
        debug: boolean;
    };
    contextType?: React.Context<unknown>;
};

export default Client;

interface Requireable<T> extends Validator<T | undefined | null> {
    isRequired: Validator<NonNullable<T>>;
}

const nominalTypeHack: unique symbol = Symbol();

interface Validator<T> {
    (
        props: { [key: string]: unknown; },
        propName: string,
        componentName: string,
        location: string,
        propFullName: string,
    ): Error | null;
    [nominalTypeHack]?: {
        type: T;
    } | undefined;
}

declare type ReactClientOpts<P extends BoardProps = BoardProps> =
    Omit<ClientOpts, WrappedBoardDelegates> & {
        board?: React.ComponentType<P>;
        loading?: React.ComponentType;
    };

export declare class _ClientImpl {
    private gameStateOverride?;
    private initialState;
    readonly multiplayer: (
        opts: TransportOpts,
    ) => Transport;
    private reducer;
    private _running;
    private subscribers;
    private transport;
    private manager;
    readonly debugOpt?:
        | DebugOpt
        | boolean
        ;
    readonly game: ReturnType<typeof ProcessGameConfig>;
    readonly store: Store;
    log: State['deltalog'];
    matchID: string;
    playerID: CanBeNull<PlayerID>;
    credentials: string;
    matchData?: FilteredMetadata;
    moves: Record<MoveNames, MoveFn<Args>>;
    events: {
        endGame?: (
            gameover?: unknown,
        ) => void;
        endPhase?: () => void;
        endTurn?: (
            arg?: {
                next: PlayerID,
            },
        ) => void;
        setPhase?: (
            newPhase: PhaseNames,
        ) => void;
        endStage?: () => void;
        setStage?: (
            newStage: ActiveStageNames,
        ) => void;
        setActivePlayers?: (
            arg: ActivePlayersArg,
        ) => void;
    };
    plugins: Record<string, (
        ...args: unknown[],
    ) => void>;
    reset: () => void;
    undo: () => void;
    redo: () => void;
    sendChatMessage: (
        message: unknown,
    ) => void;
    chatMessages: ChatMessage[];
    constructor(
        {
            game,
            debug,
            numPlayers,
            multiplayer,
            matchID,
            playerID,
            credentials,
            enhancer,
        }: ClientOpts);
    /** Handle incoming match data from a multiplayer transport. */
    private receiveMatchData;
    /** Handle an incoming chat message from a multiplayer transport. */
    private receiveChatMessage;
    /** Handle all incoming updates from a multiplayer transport. */
    private receiveTransportData;
    private notifySubscribers;
    overrideGameState(
        state: unknown,
    ): void;
    start(): void;
    stop(): void;
    subscribe(fn: (
        state: ClientState,
    ) => void): () => void;
    getInitialState(): State;
    getState(): ClientState;
    private createDispatchers;
    updatePlayerID(
        playerID: CanBeNull<PlayerID>,
    ): void;
    updateMatchID(
        matchID: string,
    ): void;
    updateCredentials(
        credentials: string,
    ): void;
}

export interface ClientOpts {
    game: Game;
    debug?: DebugOpt | boolean;
    numPlayers?: NumPlayers;
    multiplayer?: (opts: TransportOpts) => Transport;
    matchID?: string;
    playerID?: PlayerID;
    credentials?: string;
    enhancer?: StoreEnhancer;
}

declare type ProcessedGame = Game & {
    flow: ReturnType<typeof Flow>;
    moveNames: MoveNames[];
    pluginNames: string[];
    processMove: (state: State, action: ActionPayload.MakeMove) => State | typeof InvalidMoveNames;
};

export type ClientState = CanBeNull<State
    & {
        isActive: boolean;
        isConnected: boolean;
        log: LogEntry[];
    }>;

export interface State {
    G: MyGameState;
    ctx: Ctx;
    deltalog?: LogEntry[];
    plugins: {
        [pluginName: string]: PluginState;
    };
    _undo: Undo[];
    _redo: Undo[];
    _stateID: number;
}

type WrappedBoardProps = Pick<ClientOpts,
    | WrappedBoardDelegates
    | 'debug'
>;

type ExposedClientProps = Pick<_ClientImpl,
    | 'log'
    | 'moves'
    | 'events'
    | 'reset'
    | 'undo'
    | 'redo'
    | 'playerID'
    | 'matchID'
    | 'matchData'
    | 'sendChatMessage'
    | 'chatMessages'
>;

export type BoardProps = ClientState & Omit<WrappedBoardProps, Keyof<ExposedClientProps>> & ExposedClientProps & {
    isMultiplayer: boolean,
};

export type WrappedBoardDelegates =
    | 'matchID'
    | 'playerID'
    | 'credentials'
    ;



/**
 * Helper to generate the game move reducer. The returned
 * reducer has the following signature:
 *
 * (G, action, ctx) => {}
 *
 * You can roll your own if you like, or use any Redux
 * addon to generate such a reducer.
 *
 * The convention used in this framework is to
 * have action.type contain the name of the move, and
 * action.args contain any additional arguments as an
 * Array.
 */
export declare function ProcessGameConfig(game: Game | ProcessedGame): ProcessedGame;
