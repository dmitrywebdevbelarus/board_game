import { ArtefactNames, CardRusNames, CommonStageNames, DrawNames, GameModeNames, LogNames, SuitNames } from "../../typescript/enums";
import type { Coin, Context, Ctx, DiscardCampCard, DiscardDeckCard, MyGameState, PlayerBoardCard, PlayerStack, PrivatePlayer, PublicPlayer, PublicPlayerCoin } from "../../typescript/interfaces";
import { AddCoinToPouchAction, DiscardSuitCardAction } from "../CampActions";

describe(`Test AddCoinToPouchAction method`, (): void => {
    it(`should add first coin isOpened=false to pouch of 2 necessary coins and add next AddCoinToPouchAction to stack (multiplayer=false)`, (): void => {
        const G = {
            mode: GameModeNames.Basic,
            tavernsNum: 3,
            players: {
                0: {} as PrivatePlayer,
            },
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                    boardCoins: [
                        {},
                        {},
                        {},
                        null,
                        null,
                    ],
                    handCoins: [
                        {
                            isOpened: false,
                            value: 2,
                        },
                        {
                            value: 3,
                        },
                    ] as PublicPlayerCoin[],
                    buffs: [
                        {
                            everyTurn: true,
                        },
                    ],
                    stack: [
                        {
                            stageName: CommonStageNames.AddCoinToPouch,
                            drawName: DrawNames.AddCoinToPouchVidofnirVedrfolnir,
                        },
                    ],
                } as PublicPlayer,
            },
            logData: [],
        } as Pick<MyGameState, `publicPlayers` | `tavernsNum` | `players` | `mode` | `logData`>,
            ctx = {
                currentPlayer: `0`,
            } as Ctx;
        AddCoinToPouchAction({ G, ctx } as Context, `0`, 0);
        expect(G).toStrictEqual({
            mode: GameModeNames.Basic,
            tavernsNum: 3,
            players: {
                0: {} as PrivatePlayer,
            },
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                    boardCoins: [
                        {},
                        {},
                        {},
                        {
                            isOpened: true,
                            value: 2,
                        },
                        null,
                    ],
                    handCoins: [
                        null,
                        {
                            value: 3,
                        },
                    ] as PublicPlayerCoin[],
                    buffs: [
                        {
                            everyTurn: true,
                        },
                    ],
                    stack: [
                        {
                            stageName: CommonStageNames.AddCoinToPouch,
                            drawName: DrawNames.AddCoinToPouchVidofnirVedrfolnir,
                        },
                    ],
                } as PublicPlayer,
            },
            logData: [
                {
                    type: LogNames.Game,
                    text: `Игрок 'Dan' положил монету ценностью '2' в свой кошель.`,
                },
            ],
        } as Pick<MyGameState, `publicPlayers` | `players` | `tavernsNum` | `mode` | `logData`>);
    });
    it(`should add first coin isOpened=true to pouch of 2 necessary coins and add next AddCoinToPouchAction to stack (multiplayer=false)`, (): void => {
        const G = {
            mode: GameModeNames.Basic,
            tavernsNum: 3,
            players: {
                0: {} as PrivatePlayer,
            },
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                    boardCoins: [
                        {},
                        {},
                        {},
                        null,
                        null,
                    ],
                    handCoins: [
                        {
                            isOpened: true,
                            value: 2,
                        },
                        {
                            value: 3,
                        },
                    ] as PublicPlayerCoin[],
                    buffs: [
                        {
                            everyTurn: true,
                        },
                    ],
                    stack: [
                        {
                            stageName: CommonStageNames.AddCoinToPouch,
                            drawName: DrawNames.AddCoinToPouchVidofnirVedrfolnir,
                        },
                    ],
                } as PublicPlayer,
            },
            logData: [],
        } as Pick<MyGameState, `publicPlayers` | `tavernsNum` | `players` | `mode` | `logData`>,
            ctx = {
                currentPlayer: `0`,
            } as Ctx;
        AddCoinToPouchAction({ G, ctx } as Context, `0`, 0);
        expect(G).toStrictEqual({
            mode: GameModeNames.Basic,
            tavernsNum: 3,
            players: {
                0: {} as PrivatePlayer,
            },
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                    boardCoins: [
                        {},
                        {},
                        {},
                        {
                            isOpened: true,
                            value: 2,
                        },
                        null,
                    ],
                    handCoins: [
                        null,
                        {
                            value: 3,
                        },
                    ] as PublicPlayerCoin[],
                    buffs: [
                        {
                            everyTurn: true,
                        },
                    ],
                    stack: [
                        {
                            stageName: CommonStageNames.AddCoinToPouch,
                            drawName: DrawNames.AddCoinToPouchVidofnirVedrfolnir,
                        },
                    ],
                } as PublicPlayer,
            },
            logData: [
                {
                    type: LogNames.Game,
                    text: `Игрок 'Dan' положил монету ценностью '2' в свой кошель.`,
                },
            ],
        } as Pick<MyGameState, `publicPlayers` | `players` | `tavernsNum` | `mode` | `logData`>);
    });
    it(`should add first coin to pouch of 2 necessary coins and add next AddCoinToPouchAction to stack (multiplayer=true)`, (): void => {
        const G = {
            mode: GameModeNames.Multiplayer,
            tavernsNum: 3,
            players: {
                0: {
                    boardCoins: [
                        {},
                        {},
                        {},
                        null,
                        null,
                    ],
                    handCoins: [
                        {
                            isOpened: false,
                            value: 2,
                        },
                        {
                            value: 3,
                        },
                    ] as Coin[],
                } as PrivatePlayer,
            },
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                    boardCoins: [
                        {},
                        {},
                        {},
                        null,
                        null,
                    ],
                    handCoins: [
                        {},
                        {},
                    ] as PublicPlayerCoin[],
                    buffs: [
                        {
                            everyTurn: true,
                        },
                    ],
                    stack: [
                        {
                            stageName: CommonStageNames.AddCoinToPouch,
                            drawName: DrawNames.AddCoinToPouchVidofnirVedrfolnir,
                        },
                    ],
                } as PublicPlayer,
            },
            logData: [],
        } as Pick<MyGameState, `publicPlayers` | `tavernsNum` | `players` | `mode` | `logData`>,
            ctx = {
                currentPlayer: `0`,
            } as Ctx;
        AddCoinToPouchAction({ G, ctx } as Context, `0`, 0);
        expect(G).toStrictEqual({
            mode: GameModeNames.Multiplayer,
            tavernsNum: 3,
            players: {
                0: {
                    boardCoins: [
                        {},
                        {},
                        {},
                        {
                            isOpened: true,
                            value: 2,
                        },
                        null,
                    ],
                    handCoins: [
                        null,
                        {
                            value: 3,
                        },
                    ] as Coin[],
                } as PrivatePlayer,
            },
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                    boardCoins: [
                        {},
                        {},
                        {},
                        {
                            isOpened: true,
                            value: 2,
                        },
                        null,
                    ],
                    handCoins: [
                        null,
                        {},
                    ] as PublicPlayerCoin[],
                    buffs: [
                        {
                            everyTurn: true,
                        },
                    ],
                    stack: [
                        {
                            stageName: CommonStageNames.AddCoinToPouch,
                            drawName: DrawNames.AddCoinToPouchVidofnirVedrfolnir,
                        },
                    ],
                } as PublicPlayer,
            },
            logData: [
                {
                    type: LogNames.Game,
                    text: `Игрок 'Dan' положил монету ценностью '2' в свой кошель.`,
                },
            ],
        } as Pick<MyGameState, `publicPlayers` | `players` | `tavernsNum` | `mode` | `logData`>);
    });
    it(`should add last coin to pouch and start VidofnirVedrfolnir action (multiplayer=false)`, (): void => {
        const G = {
            mode: GameModeNames.Basic,
            tavernsNum: 3,
            players: {
                0: {} as PrivatePlayer,
            },
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                    boardCoins: [
                        {},
                        {},
                        {},
                        {
                            isOpened: true,
                            value: 2,
                        },
                        null,
                    ],
                    handCoins: [
                        {
                            isOpened: false,
                            value: 3,
                        },
                    ] as PublicPlayerCoin[],
                    buffs: [
                        {
                            everyTurn: true,
                        },
                    ],
                    stack: [
                        {
                            stageName: CommonStageNames.AddCoinToPouch,
                            drawName: DrawNames.AddCoinToPouchVidofnirVedrfolnir,
                        },
                    ],
                } as PublicPlayer,
            },
            logData: [],
        } as Pick<MyGameState, `publicPlayers` | `tavernsNum` | `players` | `mode` | `logData`>,
            ctx = {
                currentPlayer: `0`,
            } as Ctx;
        AddCoinToPouchAction({ G, ctx } as Context, `0`, 0);
        expect(G).toStrictEqual({
            mode: GameModeNames.Basic,
            tavernsNum: 3,
            players: {
                0: {} as PrivatePlayer,
            },
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                    boardCoins: [
                        {},
                        {},
                        {},
                        {
                            isOpened: true,
                            value: 2,
                        },
                        {
                            isOpened: true,
                            value: 3,
                        },
                    ],
                    handCoins: [
                        null,
                    ] as PublicPlayerCoin[],
                    buffs: [
                        {
                            everyTurn: true,
                        },
                    ],
                    stack: [
                        {
                            stageName: CommonStageNames.AddCoinToPouch,
                            drawName: DrawNames.AddCoinToPouchVidofnirVedrfolnir,
                        },
                    ],
                } as PublicPlayer,
            },
            logData: [
                {
                    type: LogNames.Game,
                    text: `Игрок 'Dan' положил монету ценностью '3' в свой кошель.`,
                },
            ],
        } as Pick<MyGameState, `publicPlayers` | `players` | `tavernsNum` | `mode` | `logData`>);
    });
    it(`should add last coin to pouch and start VidofnirVedrfolnir action (multiplayer=true)`, (): void => {
        const G = {
            mode: GameModeNames.Multiplayer,
            tavernsNum: 3,
            players: {
                0: {
                    boardCoins: [
                        {},
                        {},
                        {},
                        {
                            value: 2,
                        },
                        null,
                    ],
                    handCoins: [
                        {
                            isOpened: false,
                            value: 3,
                        },
                    ] as Coin[],
                } as PrivatePlayer,
            },
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                    boardCoins: [
                        {},
                        {},
                        {},
                        {
                            value: 2,
                        },
                        null,
                    ],
                    handCoins: [
                        {
                            isOpened: false,
                            value: 3,
                        },
                    ] as PublicPlayerCoin[],
                    buffs: [
                        {
                            everyTurn: true,
                        },
                    ],
                    stack: [
                        {
                            stageName: CommonStageNames.AddCoinToPouch,
                            drawName: DrawNames.AddCoinToPouchVidofnirVedrfolnir,
                        },
                    ],
                } as PublicPlayer,
            },
            logData: [],
        } as Pick<MyGameState, `publicPlayers` | `tavernsNum` | `players` | `mode` | `logData`>,
            ctx = {
                currentPlayer: `0`,
            } as Ctx;
        AddCoinToPouchAction({ G, ctx } as Context, `0`, 0);
        expect(G).toStrictEqual({
            mode: GameModeNames.Multiplayer,
            tavernsNum: 3,
            players: {
                0: {
                    boardCoins: [
                        {},
                        {},
                        {},
                        {
                            value: 2,
                        },
                        {
                            isOpened: true,
                            value: 3,
                        },
                    ],
                    handCoins: [
                        null,
                    ] as Coin[],
                } as PrivatePlayer,
            },
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                    boardCoins: [
                        {},
                        {},
                        {},
                        {
                            value: 2,
                        },
                        {
                            isOpened: true,
                            value: 3,
                        },
                    ],
                    handCoins: [
                        null,
                    ] as PublicPlayerCoin[],
                    buffs: [
                        {
                            everyTurn: true,
                        },
                    ],
                    stack: [
                        {
                            stageName: CommonStageNames.AddCoinToPouch,
                            drawName: DrawNames.AddCoinToPouchVidofnirVedrfolnir,
                        },
                    ],
                } as PublicPlayer,
            },
            logData: [
                {
                    type: LogNames.Game,
                    text: `Игрок 'Dan' положил монету ценностью '3' в свой кошель.`,
                },
            ],
        } as Pick<MyGameState, `publicPlayers` | `players` | `tavernsNum` | `mode` | `logData`>);
    });
    // Unreal Errors to reproduce
    it(`shouldn't add coin to pouch because all coins are on the pouch and must throw Error`,
        (): void => {
            const G = {
                mode: GameModeNames.Basic,
                tavernsNum: 3,
                players: {
                    0: {} as PrivatePlayer,
                },
                publicPlayers: {
                    0: {
                        nickname: `Dan`,
                        boardCoins: [] as PublicPlayerCoin[],
                    } as PublicPlayer,
                },
                logData: [],
            } as Pick<MyGameState, `publicPlayers` | `tavernsNum` | `players` | `mode` | `logData`>,
                ctx = {
                    currentPlayer: `0`,
                } as Ctx;
            expect((): void => {
                AddCoinToPouchAction({ G, ctx } as Context, `0`, 0);
            }).toThrow(`В массиве монет игрока с id '0' на столе отсутствует место для добавления в кошель для действия карты '${CardRusNames.ArtefactCard}' '${ArtefactNames.VidofnirVedrfolnir}'.`);
        });
    it(`shouldn't add null coin to pouch (multiplayer=false) and must throw Error`,
        (): void => {
            const G = {
                mode: GameModeNames.Basic,
                tavernsNum: 3,
                players: {
                    0: {} as PrivatePlayer,
                },
                publicPlayers: {
                    0: {
                        nickname: `Dan`,
                        boardCoins: [
                            {},
                            {},
                            {},
                            null,
                        ] as PublicPlayerCoin[],
                        handCoins: [
                            null,
                        ] as PublicPlayerCoin[],
                    } as PublicPlayer,
                },
                logData: [],
            } as Pick<MyGameState, `publicPlayers` | `tavernsNum` | `players` | `mode` | `logData`>,
                ctx = {
                    currentPlayer: `0`,
                } as Ctx;
            expect((): void => {
                AddCoinToPouchAction({ G, ctx } as Context, `0`, 0);
            }).toThrow(`В массиве монет игрока с id '0' в руке не может не быть монеты с id '0'.`);
        });
    it(`shouldn't add null coin to pouch (multiplayer=true) and must throw Error`,
        (): void => {
            const G = {
                mode: GameModeNames.Multiplayer,
                tavernsNum: 3,
                players: {
                    0: {
                        boardCoins: [
                            {},
                            {},
                            {},
                            null,
                        ] as Coin[],
                        handCoins: [
                            null,
                        ] as Coin[],
                    } as PrivatePlayer,
                },
                publicPlayers: {
                    0: {
                        nickname: `Dan`,
                        boardCoins: [
                            {},
                            {},
                            {},
                            null,
                        ] as PublicPlayerCoin[],
                    } as PublicPlayer,
                },
                logData: [],
            } as Pick<MyGameState, `publicPlayers` | `tavernsNum` | `players` | `mode` | `logData`>,
                ctx = {
                    currentPlayer: `0`,
                } as Ctx;
            expect((): void => {
                AddCoinToPouchAction({ G, ctx } as Context, `0`, 0);
            }).toThrow(`В массиве монет игрока с id '0' в руке не может не быть монеты с id '0'.`);
        });
    it(`shouldn't add null coin to pouch (multiplayer=false) and must throw Error`,
        (): void => {
            const G = {
                mode: GameModeNames.Basic,
                tavernsNum: 3,
                players: {
                    0: {} as PrivatePlayer,
                },
                publicPlayers: {
                    0: {
                        nickname: `Dan`,
                        boardCoins: [
                            {},
                            {},
                            {},
                            null,
                        ] as PublicPlayerCoin[],
                        handCoins: [
                            {},
                        ] as PublicPlayerCoin[],
                    } as PublicPlayer,
                },
                logData: [],
            } as Pick<MyGameState, `publicPlayers` | `tavernsNum` | `players` | `mode` | `logData`>,
                ctx = {
                    currentPlayer: `0`,
                } as Ctx;
            expect((): void => {
                AddCoinToPouchAction({ G, ctx } as Context, `0`, 0);
            }).toThrow(`Монета с id '0' в руке текущего игрока с id '0' не может быть закрытой для него.`);
        });
});

describe(`Test DiscardSuitCardAction method`, (): void => {
    it(`should discard warrior card to cards discard`, (): void => {
        const G = {
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                    cards: {
                        warrior: [
                            {
                                type: CardRusNames.DwarfPlayerCard,
                                name: `Test`,
                                suit: SuitNames.warrior,
                            },
                        ],
                    },
                    stack: [
                        {
                            playerID: `0`,
                        },
                    ],
                } as PublicPlayer,
            },
            discardCardsDeck: [],
            logData: [],
        } as Pick<MyGameState, `publicPlayers` | `discardCardsDeck` | `logData`>;
        DiscardSuitCardAction({ G } as Context, `0`, 0);
        expect(G).toStrictEqual({
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                    cards: {
                        warrior: [] as PlayerBoardCard[],
                    },
                    stack: [] as PlayerStack[],
                } as PublicPlayer,
            },
            discardCardsDeck: [
                {
                    type: CardRusNames.DwarfPlayerCard,
                    name: `Test`,
                    suit: SuitNames.warrior,
                },
            ] as DiscardDeckCard[],
            logData: [
                {
                    type: LogNames.Game,
                    text: `Карта '${CardRusNames.DwarfPlayerCard}' 'Test' убрана в сброс из-за выбора карты '${CardRusNames.ArtefactCard}' '${ArtefactNames.Hofud}'.`,
                },
            ],
        } as Pick<MyGameState, `publicPlayers` | `discardCardsDeck` | `logData`>);
    });
    it(`should discard warrior mercenary player card to camp cards discard`, (): void => {
        const G = {
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                    cards: {
                        warrior: [
                            {
                                type: CardRusNames.MercenaryPlayerCard,
                                name: `Test`,
                                suit: SuitNames.warrior,
                            },
                        ],
                    },
                    stack: [
                        {
                            playerID: `0`,
                        },
                    ],
                } as PublicPlayer,
            },
            discardCampCardsDeck: [],
            logData: [],
        } as Pick<MyGameState, `publicPlayers` | `discardCampCardsDeck` | `logData`>;
        DiscardSuitCardAction({ G } as Context, `0`, 0);
        expect(G).toStrictEqual({
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                    cards: {
                        warrior: [] as PlayerBoardCard[],
                    },
                    stack: [] as PlayerStack[],
                } as PublicPlayer,
            },
            discardCampCardsDeck: [
                {
                    type: CardRusNames.MercenaryPlayerCard,
                    name: `Test`,
                    suit: SuitNames.warrior,
                },
            ] as DiscardCampCard[],
            logData: [
                {
                    type: LogNames.Game,
                    text: `Карта '${CardRusNames.MercenaryPlayerCard}' 'Test' убрана в сброс из-за выбора карты '${CardRusNames.ArtefactCard}' '${ArtefactNames.Hofud}'.`,
                },
            ],
        } as Pick<MyGameState, `publicPlayers` | `discardCampCardsDeck` | `logData`>);
    });
    it(`shouldn't discard warrior hero card to discard and must throw Error`,
        (): void => {
            const G = {
                publicPlayers: {
                    0: {
                        cards: {
                            warrior: [
                                {
                                    type: CardRusNames.HeroPlayerCard,
                                },
                            ],
                        },
                    } as PublicPlayer,
                },
            } as Pick<MyGameState, `publicPlayers`>;
            expect((): void => {
                DiscardSuitCardAction({ G } as Context, `0`, 0);
            }).toThrow(`Сброшенная карта не может быть с типом '${CardRusNames.HeroPlayerCard}'.`);
        });
});
