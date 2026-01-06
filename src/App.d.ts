/**
 * <h3>Игровой клиент.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Используется при создании игры.</li>
 * </ol>
 */
declare const App: {
    new (props: Pick<import("./typescript/Client").ClientOpts, "credentials" | "debug" | "matchID" | "playerID"> & Pick<import("./typescript/Client").BoardProps, never>): {
        client: import("./typescript/Client")._ClientImpl;
        unsubscribe?: () => void;
        componentDidMount(): void;
        componentWillUnmount(): void;
        componentDidUpdate(prevProps: Pick<import("./typescript/Client").ClientOpts, "credentials" | "debug" | "matchID" | "playerID"> & Pick<import("./typescript/Client").BoardProps, never>): void;
        render(): JSX.Element;
        context: unknown;
        setState<K extends never>(state: Pick<{}, K> | ((prevState: Readonly<{}>, props: Readonly<Pick<import("./typescript/Client").ClientOpts, "credentials" | "debug" | "matchID" | "playerID"> & Pick<import("./typescript/Client").BoardProps, never>>) => Pick<{}, K> | {}) | {}, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Pick<import("./typescript/Client").ClientOpts, "credentials" | "debug" | "matchID" | "playerID"> & Pick<import("./typescript/Client").BoardProps, never>> & Readonly<{
            children?: import("react").ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: import("react").ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<Pick<import("./typescript/Client").ClientOpts, "credentials" | "debug" | "matchID" | "playerID"> & Pick<import("./typescript/Client").BoardProps, never>>, nextState: Readonly<{}>, nextContext: unknown): boolean;
        componentDidCatch?(error: Error, errorInfo: import("react").ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<import("./typescript/Client").ClientOpts, "credentials" | "debug" | "matchID" | "playerID"> & Pick<import("./typescript/Client").BoardProps, never>>, prevState: Readonly<{}>): unknown;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Pick<import("./typescript/Client").ClientOpts, "credentials" | "debug" | "matchID" | "playerID"> & Pick<import("./typescript/Client").BoardProps, never>>, nextContext: unknown): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<import("./typescript/Client").ClientOpts, "credentials" | "debug" | "matchID" | "playerID"> & Pick<import("./typescript/Client").BoardProps, never>>, nextContext: unknown): void;
        componentWillUpdate?(nextProps: Readonly<Pick<import("./typescript/Client").ClientOpts, "credentials" | "debug" | "matchID" | "playerID"> & Pick<import("./typescript/Client").BoardProps, never>>, nextState: Readonly<{}>, nextContext: unknown): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<import("./typescript/Client").ClientOpts, "credentials" | "debug" | "matchID" | "playerID"> & Pick<import("./typescript/Client").BoardProps, never>>, nextState: Readonly<{}>, nextContext: unknown): void;
    };
    propTypes: {
        matchID: Requireable<string>;
        playerID: Requireable<import("./typescript/interfaces").PlayerID>;
        credentials: Requireable<string>;
        debug: Requireable<unknown>;
    };
    defaultProps: {
        matchID: string;
        playerID: import("./typescript/interfaces").PlayerID;
        credentials: unknown;
        debug: boolean;
    };
    contextType?: import("react").Context<unknown>;
};
export default App;
//# sourceMappingURL=App.d.ts.map