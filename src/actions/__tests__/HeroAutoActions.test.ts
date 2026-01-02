import { CommonStageNames, DrawNames, GameModeNames, LogNames } from "../../typescript/enums";
import type { Coin, Context, Ctx, MyGameState, PlayerStack, PrivatePlayer, PublicPlayer, PublicPlayerCoin } from "../../typescript/interfaces";
import { AddPickHeroAction, GetClosedCoinIntoPlayerHandAction } from "../HeroAutoActions";

describe(`Test AddPickHeroAction method`, (): void => {
    it(`should add pick hero action to stack`, (): void => {
        const G = {
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                    stack: [] as PlayerStack[],
                } as PublicPlayer,
            },
            logData: [],
        } as Pick<MyGameState, `publicPlayers` | `logData`>,
            ctx = {
                currentPlayer: `0`,
            } as Ctx;
        AddPickHeroAction({ G, ctx } as Context, `0`, 1);
        expect(G).toStrictEqual({
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                    stack: [
                        {
                            stageName: CommonStageNames.ClickHeroCard,
                            drawName: DrawNames.PickHero,
                            priority: 1,
                        },
                    ],
                } as PublicPlayer,
            },
            logData: [
                {
                    type: LogNames.Game,
                    text: `Игрок 'Dan' должен выбрать нового героя.`,
                },
            ],
        } as Pick<MyGameState, `publicPlayers` | `logData`>);
    });
});

describe(`Test GetClosedCoinIntoPlayerHandAction method`, (): void => {
    it(`should return all board coins to hand (multiplayer=false)`, (): void => {
        const G = {
            mode: GameModeNames.Basic,
            players: {
                0: {} as PrivatePlayer,
            },
            publicPlayers: {
                0: {
                    boardCoins: [
                        {
                            value: 2,
                        },
                        {
                            value: 0,
                        },
                    ] as PublicPlayerCoin[],
                    handCoins: [
                        null,
                    ] as PublicPlayerCoin[],
                } as PublicPlayer,
            },
            currentTavern: 0,
        } as Pick<MyGameState, `publicPlayers` | `currentTavern` | `players` | `mode`>,
            ctx = {
                currentPlayer: `0`,
            } as Ctx;
        GetClosedCoinIntoPlayerHandAction({ G, ctx } as Context, `0`);
        expect(G).toStrictEqual({
            mode: GameModeNames.Basic,
            players: {
                0: {} as PrivatePlayer,
            },
            publicPlayers: {
                0: {
                    boardCoins: [
                        {
                            value: 2,
                        },
                        null,
                    ] as PublicPlayerCoin[],
                    handCoins: [
                        {
                            value: 0,
                        },
                    ] as PublicPlayerCoin[],
                } as PublicPlayer,
            },
            currentTavern: 0,
        } as Pick<MyGameState, `publicPlayers` | `currentTavern` | `players` | `mode`>);
    });
    it(`should return all closed board coins to hand (multiplayer=true)`, (): void => {
        const G = {
            mode: GameModeNames.Multiplayer,
            players: {
                0: {
                    boardCoins: [
                        {
                            value: 2,
                        },
                        {
                            isOpened: false,
                            value: 0,
                        },
                    ] as Coin[],
                    handCoins: [
                        null,
                    ] as Coin[],
                } as PrivatePlayer,
            },
            publicPlayers: {
                0: {
                    boardCoins: [
                        {
                            value: 2,
                        },
                        {},
                    ] as PublicPlayerCoin[],
                    handCoins: [
                        null,
                    ] as PublicPlayerCoin[],
                } as PublicPlayer,
            },
            currentTavern: 0,
        } as Pick<MyGameState, `publicPlayers` | `currentTavern` | `players` | `mode`>,
            ctx = {
                currentPlayer: `0`,
            } as Ctx;
        GetClosedCoinIntoPlayerHandAction({ G, ctx } as Context, `0`);
        expect(G).toStrictEqual({
            mode: GameModeNames.Multiplayer,
            players: {
                0: {
                    boardCoins: [
                        {
                            value: 2,
                        },
                        null,
                    ] as Coin[],
                    handCoins: [
                        {
                            isOpened: false,
                            value: 0,
                        },
                    ] as Coin[],
                } as PrivatePlayer,
            },
            publicPlayers: {
                0: {
                    boardCoins: [
                        {
                            value: 2,
                        },
                        null,
                    ] as PublicPlayerCoin[],
                    handCoins: [
                        {},
                    ] as PublicPlayerCoin[],
                } as PublicPlayer,
            },
            currentTavern: 0,
        } as Pick<MyGameState, `publicPlayers` | `currentTavern` | `players` | `mode`>);
    });
    it(`should return all isOpened=true board coins to hand (multiplayer=true)`, (): void => {
        const G = {
            mode: GameModeNames.Multiplayer,
            players: {
                0: {
                    boardCoins: [
                        {
                            value: 2,
                        },
                        {
                            isOpened: true,
                            value: 0,
                        },
                    ] as Coin[],
                    handCoins: [
                        null,
                    ] as Coin[],
                } as PrivatePlayer,
            },
            publicPlayers: {
                0: {
                    boardCoins: [
                        {
                            value: 2,
                        },
                        {
                            isOpened: true,
                            value: 0,
                        },
                    ] as PublicPlayerCoin[],
                    handCoins: [
                        null,
                    ] as PublicPlayerCoin[],
                } as PublicPlayer,
            },
            currentTavern: 0,
        } as Pick<MyGameState, `publicPlayers` | `currentTavern` | `players` | `mode`>,
            ctx = {
                currentPlayer: `0`,
            } as Ctx;
        GetClosedCoinIntoPlayerHandAction({ G, ctx } as Context, `0`);
        expect(G).toStrictEqual({
            mode: GameModeNames.Multiplayer,
            players: {
                0: {
                    boardCoins: [
                        {
                            value: 2,
                        },
                        null,
                    ] as Coin[],
                    handCoins: [
                        {
                            isOpened: true,
                            value: 0,
                        },
                    ] as Coin[],
                } as PrivatePlayer,
            },
            publicPlayers: {
                0: {
                    boardCoins: [
                        {
                            value: 2,
                        },
                        null,
                    ] as PublicPlayerCoin[],
                    handCoins: [
                        {
                            isOpened: true,
                            value: 0,
                        },
                    ] as PublicPlayerCoin[],
                } as PublicPlayer,
            },
            currentTavern: 0,
        } as Pick<MyGameState, `publicPlayers` | `currentTavern` | `players` | `mode`>);
    });
});

// TODO Add tests for UpgradeMinCoinAction & all others!
