import { suitsConfig } from "../../data/SuitData";
import { ArtefactBuffNames, ArtefactDescriptionNames, ArtefactNames, CardRusNames, CommonBuffNames, CommonStageNames, DrawNames, EnlistmentMercenariesStageNames, HeroNames, LogNames, PhaseNames, RoyalOfferingNames, SuitNames, SuitRusNames, TavernNames } from "../../typescript/enums";
import type { CampDeckCard, Context, Ctx, DiscardCampCard, DiscardDeckCard, Expansions, HeroCard, MyGameState, PlayerBoardCard, PlayerBuffs, PlayerStack, PublicPlayer, PublicPlayers, SuitProperty, TavernWithoutExpansionArray } from "../../typescript/interfaces";
import { DiscardAnyCardFromPlayerBoardAction, DiscardCardFromTavernAction, GetEnlistmentMercenariesAction, GetMjollnirProfitAction, PassEnlistmentMercenariesAction, PickDiscardCardAction, PlaceEnlistmentMercenariesAction } from "../Actions";

describe(`Test DiscardAnyCardFromPlayerBoardAction method`, (): void => {
    it(`should remove non-hero discarded card from player's cards to cards discard`, (): void => {
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
                    buffs: [
                        {
                            discardCardEndGame: true,
                        },
                    ],
                } as PublicPlayer,
            },
            discardCardsDeck: [],
            logData: [],
        } as Pick<MyGameState, `publicPlayers` | `discardCardsDeck` | `logData`>,
            ctx = {
                currentPlayer: `0`,
            } as Ctx;
        DiscardAnyCardFromPlayerBoardAction({ G, ctx } as Context, `0`, SuitNames.warrior, 0);
        expect(G).toStrictEqual({
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                    cards: {
                        warrior: [] as PlayerBoardCard[],
                    },
                    buffs: [] as PlayerBuffs[],
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
                    text: `Карта '${CardRusNames.DwarfPlayerCard}' 'Test' убрана в сброс из-за эффекта карты '${CardRusNames.ArtefactCard}' '${ArtefactNames.Brisingamens}'.`,
                },
                {
                    type: LogNames.Game,
                    text: `Игрок 'Dan' потерял баф '${ArtefactBuffNames.DiscardCardEndGame}'.`,
                },
            ],
        } as Pick<MyGameState, `publicPlayers` | `discardCardsDeck` | `logData`>);
    });
    it(`should remove artefact discarded card from player's cards to camp cards discard`, (): void => {
        const G = {
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                    cards: {
                        warrior: [
                            {
                                type: CardRusNames.ArtefactPlayerCard,
                                name: ArtefactNames.Vegvisir,
                                description: ArtefactDescriptionNames.Vegvisir,
                            },
                        ],
                    },
                    buffs: [
                        {
                            discardCardEndGame: true,
                        },
                    ],
                } as PublicPlayer,
            },
            discardCampCardsDeck: [],
            logData: [],
        } as Pick<MyGameState, `publicPlayers` | `discardCampCardsDeck` | `logData`>,
            ctx = {
                currentPlayer: `0`,
            } as Ctx;
        DiscardAnyCardFromPlayerBoardAction({ G, ctx } as Context, `0`, SuitNames.warrior, 0);
        expect(G).toStrictEqual({
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                    cards: {
                        warrior: [] as PlayerBoardCard[],
                    },
                    buffs: [] as PlayerBuffs[],
                } as PublicPlayer,
            },
            discardCampCardsDeck: [
                {
                    type: CardRusNames.ArtefactPlayerCard,
                    name: ArtefactNames.Vegvisir,
                    description: ArtefactDescriptionNames.Vegvisir,
                },
            ] as DiscardCampCard[],
            logData: [
                {
                    type: LogNames.Game,
                    text: `Карта '${CardRusNames.ArtefactPlayerCard}' '${ArtefactNames.Vegvisir}' убрана в сброс из-за эффекта карты '${CardRusNames.ArtefactCard}' '${ArtefactNames.Brisingamens}'.`,
                },
                {
                    type: LogNames.Game,
                    text: `Игрок 'Dan' потерял баф '${ArtefactBuffNames.DiscardCardEndGame}'.`,
                },
            ],
        } as Pick<MyGameState, `publicPlayers` | `discardCampCardsDeck` | `logData`>);
    });
    it(`should remove mercenary player discarded card from player's cards to camp cards discard`, ():
        void => {
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
                    buffs: [
                        {
                            discardCardEndGame: true,
                        },
                    ],
                } as PublicPlayer,
            },
            discardCampCardsDeck: [],
            logData: [],
        } as Pick<MyGameState, `publicPlayers` | `discardCampCardsDeck` | `logData`>,
            ctx = {
                currentPlayer: `0`,
            } as Ctx;
        DiscardAnyCardFromPlayerBoardAction({ G, ctx } as Context, `0`, SuitNames.warrior, 0);
        expect(G).toStrictEqual({
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                    cards: {
                        warrior: [] as PlayerBoardCard[],
                    },
                    buffs: [] as PlayerBuffs[],
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
                    text: `Карта '${CardRusNames.MercenaryPlayerCard}' 'Test' убрана в сброс из-за эффекта карты '${CardRusNames.ArtefactCard}' '${ArtefactNames.Brisingamens}'.`,
                },
                {
                    type: LogNames.Game,
                    text: `Игрок 'Dan' потерял баф '${ArtefactBuffNames.DiscardCardEndGame}'.`,
                },
            ],
        } as Pick<MyGameState, `publicPlayers` | `discardCampCardsDeck` | `logData`>);
    });
    it(`shouldn't remove hero discarded card from player's cards and must throw Error`, (): void => {
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
        } as Pick<MyGameState, `publicPlayers`>,
            ctx = {
                currentPlayer: `0`,
            } as Ctx;
        expect((): void => {
            DiscardAnyCardFromPlayerBoardAction({ G, ctx } as Context, `0`, SuitNames.warrior,
                0);
        }).toThrow(`Сброшенная карта не может быть с типом '${CardRusNames.HeroPlayerCard}'.`);
    });
    it(`shouldn't remove non-exists player's card and must throw Error`, (): void => {
        const G = {
            publicPlayers: {
                0: {
                    cards: {
                        warrior: [] as PlayerBoardCard[],
                    },
                } as PublicPlayer,
            },
        } as Pick<MyGameState, `publicPlayers`>,
            ctx = {
                currentPlayer: `0`,
            } as Ctx;
        expect((): void => {
            DiscardAnyCardFromPlayerBoardAction({ G, ctx } as Context, `0`, SuitNames.warrior,
                0);
        }).toThrow(`В массиве карт игрока с id '0' отсутствует выбранная карта во фракции '${SuitRusNames.warrior}' с id '0': это должно проверяться в MoveValidator.`);
    });
});

describe(`Test DiscardCardFromTavernAction method`, (): void => {
    it(`should remove non-null card from tavern`, (): void => {
        const G = {
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                } as PublicPlayer,
            },
            currentTavern: 0,
            taverns: [
                [
                    {
                        type: CardRusNames.DwarfCard,
                        name: `Test`,
                        playerSuit: SuitNames.warrior,
                    },
                    null,
                    null,
                ] as TavernWithoutExpansionArray,
                [null, null, null],
                [null, null, null],
            ],
            discardCardsDeck: [],
            tavernCardDiscarded2Players: false,
            logData: [],
        } as Pick<MyGameState, `publicPlayers` | `discardCardsDeck` | `logData` | `taverns` | `currentTavern`
            | `tavernCardDiscarded2Players`>,
            ctx = {
                currentPlayer: `0`,
            } as Ctx;
        DiscardCardFromTavernAction({ G, ctx } as Context, `0`, 0);
        expect(G).toStrictEqual({
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                } as PublicPlayer,
            },
            currentTavern: 0,
            taverns: [
                [null, null, null],
                [null, null, null],
                [null, null, null],
            ],
            discardCardsDeck: [
                {
                    type: CardRusNames.DwarfCard,
                    name: `Test`,
                    playerSuit: SuitNames.warrior,
                },
            ] as DiscardDeckCard[],
            tavernCardDiscarded2Players: false,
            logData: [
                {
                    type: LogNames.Game,
                    text: `Игрок 'Dan' должен сбросить в колоду сброса карту из текущей таверны:`,
                },
                {
                    type: LogNames.Game,
                    text: `Карта '${CardRusNames.DwarfCard}' 'Test' из таверны ${TavernNames.LaughingGoblin} убрана в сброс.`,
                },
            ],
        } as Pick<MyGameState, `publicPlayers` | `discardCardsDeck` | `logData` | `taverns` | `currentTavern`>);
    });
    it(`should remove non-null card from tavern for 2 players game`, (): void => {
        const G = {
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                } as PublicPlayer,
            },
            currentTavern: 0,
            taverns: [
                [
                    {
                        type: CardRusNames.DwarfCard,
                        name: `Test`,
                        playerSuit: SuitNames.warrior,
                    },
                    null,
                    null,
                ] as TavernWithoutExpansionArray,
                [null, null, null],
                [null, null, null],
            ],
            discardCardsDeck: [],
            tavernCardDiscarded2Players: false,
            logData: [],
        } as Pick<MyGameState, `publicPlayers` | `discardCardsDeck` | `logData` | `taverns` | `currentTavern`
            | `tavernCardDiscarded2Players`>,
            ctx = {
                numPlayers: 2,
                currentPlayer: `0`,
            } as Ctx;
        DiscardCardFromTavernAction({ G, ctx } as Context, `0`, 0);
        expect(G).toStrictEqual({
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                } as PublicPlayer,
            },
            currentTavern: 0,
            taverns: [
                [null, null, null],
                [null, null, null],
                [null, null, null],
            ],
            discardCardsDeck: [
                {
                    type: CardRusNames.DwarfCard,
                    name: `Test`,
                    playerSuit: SuitNames.warrior,
                },
            ] as DiscardDeckCard[],
            tavernCardDiscarded2Players: true,
            logData: [
                {
                    type: LogNames.Game,
                    text: `Игрок 'Dan' должен сбросить в колоду сброса карту из текущей таверны:`,
                },
                {
                    type: LogNames.Game,
                    text: `Карта '${CardRusNames.DwarfCard}' 'Test' из таверны ${TavernNames.LaughingGoblin} убрана в сброс.`,
                },
            ],
        } as Pick<MyGameState, `publicPlayers` | `discardCardsDeck` | `logData` | `taverns` | `currentTavern`>);
    });
    it(`shouldn't remove null card from tavern and must throw Error`, (): void => {
        const G = {
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                } as PublicPlayer,
            },
            currentTavern: 0,
            taverns: [
                [null, null, null],
                [null, null, null],
                [null, null, null],
            ],
            logData: [],
        } as Pick<MyGameState, `publicPlayers` | `currentTavern` | `taverns` | `logData`>,
            ctx = {
                currentPlayer: `0`,
            } as Ctx;
        expect((): void => {
            DiscardCardFromTavernAction({ G, ctx } as Context, `0`, 0);
        }).toThrow(`В массиве карт текущей таверны с id '0' не может не быть карты с id '0'.`);
    });
    it(`shouldn't remove non-exists card from tavern and must throw Error`, (): void => {
        const G = {
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                } as PublicPlayer,
            },
            currentTavern: 0,
            taverns: [
                [null, null, null],
                [null, null, null],
                [null, null, null],
            ],
            logData: [],
        } as Pick<MyGameState, `publicPlayers` | `currentTavern` | `taverns` | `logData`>,
            ctx = {
                currentPlayer: `0`,
            } as Ctx;
        expect((): void => {
            DiscardCardFromTavernAction({ G, ctx } as Context, `0`, 0);
        }).toThrow(`В массиве карт текущей таверны с id '0' не может не быть карты с id '0'.`);
    });
});

describe(`Test GetEnlistmentMercenariesAction method`, (): void => {
    it(`should get mercenary card from player's camp cards to place`, (): void => {
        const G = {
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                    campCards: [
                        {
                            type: CardRusNames.MercenaryCard,
                            name: `Test`,
                            variants: {},
                        },
                    ],
                    stack: [
                        {},
                    ],
                } as PublicPlayer,
            },
            logData: [],
        } as Pick<MyGameState, `publicPlayers` | `logData`>,
            ctx = {
                currentPlayer: `0`,
                phase: PhaseNames.EnlistmentMercenaries,
            } as Ctx;
        GetEnlistmentMercenariesAction({ G, ctx } as Context, `0`, 0);
        expect(G).toStrictEqual({
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                    campCards: [
                        {
                            type: CardRusNames.MercenaryCard,
                            name: `Test`,
                            variants: {},
                        },
                    ],
                    stack: [
                        {
                            priority: 0,
                        },
                        {
                            stageName: EnlistmentMercenariesStageNames.PlaceEnlistmentMercenaries,
                            drawName: DrawNames.PlaceEnlistmentMercenaries,
                            priority: 0,
                            card: {
                                type: CardRusNames.MercenaryCard,
                                name: `Test`,
                                variants: {},
                            },
                        },
                    ],
                } as PublicPlayer,
            },
            logData: [
                {
                    type: LogNames.Game,
                    text: `Игрок 'Dan' во время фазы '${PhaseNames.EnlistmentMercenaries}' выбрал карту '${CardRusNames.MercenaryCard}' 'Test'.`,
                },
            ],
        } as Pick<MyGameState, `publicPlayers` | `logData`>);
    });
    it(`shouldn't remove non-exists player's camp card and must throw Error`, (): void => {
        const G = {
            publicPlayers: {
                0: {
                    campCards: [] as CampDeckCard[],
                } as PublicPlayer,
            },
        } as Pick<MyGameState, `publicPlayers`>,
            ctx = {
                currentPlayer: `0`,
                phase: PhaseNames.EnlistmentMercenaries,
            } as Ctx;
        expect((): void => {
            GetEnlistmentMercenariesAction({ G, ctx } as Context, `0`, 0);
        }).toThrow(`В массиве карт лагеря игрока с id '0' отсутствует выбранная карта с id '0': это должно проверяться в MoveValidator.`);
    });
    it(`shouldn't remove null card from tavern and must throw Error`, (): void => {
        const G = {
            publicPlayers: {
                0: {
                    campCards: [
                        {},
                    ],
                } as PublicPlayer,
            },
        } as Pick<MyGameState, `publicPlayers`>,
            ctx = {
                currentPlayer: `0`,
                phase: PhaseNames.EnlistmentMercenaries,
            } as Ctx;
        expect((): void => {
            GetEnlistmentMercenariesAction({ G, ctx } as Context, `0`, 0);
        }).toThrow(`Выбранная карта должна быть с типом '${CardRusNames.MercenaryCard}'.`);
    });
});

describe(`Test GetMjollnirProfitAction method`, (): void => {
    it(`should get suit for end game Mjollnir profit`, (): void => {
        const G = {
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                    buffs: [
                        {
                            getMjollnirProfit: true,
                        },
                    ],
                } as PublicPlayer,
            },
            logData: [],
        } as Pick<MyGameState, `publicPlayers` | `logData`>,
            ctx = {
                currentPlayer: `0`,
            } as Ctx;
        GetMjollnirProfitAction({ G, ctx } as Context, `0`, SuitNames.hunter);
        expect(G).toStrictEqual({
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                    buffs: [
                        {
                            suitIdForMjollnir: SuitNames.hunter,
                        },
                    ],
                } as PublicPlayer,
            },
            logData: [
                {
                    type: LogNames.Game,
                    text: `Игрок 'Dan' получил баф '${CommonBuffNames.SuitIdForMjollnir}'.`,
                },
                {
                    type: LogNames.Game,
                    text: `Игрок 'Dan' потерял баф '${ArtefactBuffNames.GetMjollnirProfit}'.`,
                },
                {
                    type: LogNames.Game,
                    text: `Игрок 'Dan' выбрал фракцию '${suitsConfig[SuitNames.hunter].suitName}' для эффекта карты '${CardRusNames.ArtefactCard}' '${ArtefactNames.Mjollnir}'.`,
                },
            ],
        } as Pick<MyGameState, `publicPlayers` | `logData`>);
    });
});

describe(`Test PassEnlistmentMercenariesAction method`, (): void => {
    it(`should first player pass on the beginning of 'enlistmentMercenaries' phase`, (): void => {
        const G = {
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                } as PublicPlayer,
            },
            logData: [],
        } as Pick<MyGameState, `publicPlayers` | `logData`>,
            ctx = {
                currentPlayer: `0`,
                phase: PhaseNames.EnlistmentMercenaries,
            } as Ctx;
        PassEnlistmentMercenariesAction({ G, ctx } as Context, `0`);
        expect(G).toStrictEqual({
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                } as PublicPlayer,
            },
            logData: [
                {
                    type: LogNames.Game,
                    text: `Игрок 'Dan' пасанул во время фазы '${PhaseNames.EnlistmentMercenaries}'.`,
                },
            ],
        } as Pick<MyGameState, `publicPlayers` | `logData`>);
    });
});

describe(`Test PickDiscardCardAction method`, (): void => {
    it(`should pick dwarf discarded card from discard deck`, (): void => {
        const G = {
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                    heroes: [] as HeroCard[],
                    cards: {
                        warrior: [] as PlayerBoardCard[],
                    } as SuitProperty<PlayerBoardCard[]>,
                    buffs: [] as PlayerBuffs[],
                } as PublicPlayer,
            },
            expansions: {
                Idavoll: {
                    active: false,
                },
            } as Expansions,
            discardCardsDeck: [
                {
                    type: CardRusNames.DwarfCard,
                    name: `Test`,
                    playerSuit: SuitNames.warrior,
                },
            ] as DiscardDeckCard[],
            logData: [],
        } as Pick<MyGameState, `publicPlayers` | `discardCardsDeck` | `logData` | `expansions`>,
            ctx = {
                currentPlayer: `0`,
            } as Ctx;
        PickDiscardCardAction({ G, ctx } as Context, `0`, 0);
        expect(G).toStrictEqual({
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                    heroes: [] as HeroCard[],
                    cards: {
                        warrior: [
                            {
                                type: CardRusNames.DwarfPlayerCard,
                                name: `Test`,
                                suit: SuitNames.warrior,
                                points: null,
                                rank: 1,
                            },
                        ],
                    },
                    buffs: [] as PlayerBuffs[],
                } as PublicPlayer,
            },
            expansions: {
                Idavoll: {
                    active: false,
                },
            } as Expansions,
            discardCardsDeck: [],
            logData: [
                {
                    type: LogNames.Game,
                    text: `Игрок 'Dan' взял карту '${CardRusNames.DwarfCard}' 'Test' из колоды сброса.`,
                },
                {
                    type: LogNames.Public,
                    text: `Игрок 'Dan' выбрал карту '${CardRusNames.DwarfPlayerCard}' 'Test' во фракцию '${suitsConfig[SuitNames.warrior].suitName}'.`,
                },
            ],
        } as Pick<MyGameState, `publicPlayers` | `discardCardsDeck` | `logData` | `expansions`>);
    });
    it(`should pick dwarf player discarded card from discard deck`, (): void => {
        const G = {
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                    heroes: [] as HeroCard[],
                    cards: {
                        warrior: [] as PlayerBoardCard[],
                    } as SuitProperty<PlayerBoardCard[]>,
                    buffs: [] as PlayerBuffs[],
                } as PublicPlayer,
            },
            expansions: {
                Idavoll: {
                    active: false,
                },
            } as Expansions,
            discardCardsDeck: [
                {
                    type: CardRusNames.DwarfPlayerCard,
                    name: `Test`,
                    suit: SuitNames.warrior,
                },
            ] as DiscardDeckCard[],
            logData: [],
        } as Pick<MyGameState, `publicPlayers` | `discardCardsDeck` | `logData` | `expansions`>,
            ctx = {
                currentPlayer: `0`,
            } as Ctx;
        PickDiscardCardAction({ G, ctx } as Context, `0`, 0);
        expect(G).toStrictEqual({
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                    heroes: [] as HeroCard[],
                    cards: {
                        warrior: [
                            {
                                type: CardRusNames.DwarfPlayerCard,
                                name: `Test`,
                                suit: SuitNames.warrior,
                            },
                        ],
                    },
                    buffs: [] as PlayerBuffs[],
                } as PublicPlayer,
            },
            expansions: {
                Idavoll: {
                    active: false,
                },
            } as Expansions,
            discardCardsDeck: [],
            logData: [
                {
                    type: LogNames.Game,
                    text: `Игрок 'Dan' взял карту '${CardRusNames.DwarfPlayerCard}' 'Test' из колоды сброса.`,
                },
                {
                    type: LogNames.Public,
                    text: `Игрок 'Dan' выбрал карту '${CardRusNames.DwarfPlayerCard}' 'Test' во фракцию '${suitsConfig[SuitNames.warrior].suitName}'.`,
                },
            ],
        } as Pick<MyGameState, `publicPlayers` | `discardCardsDeck` | `logData` | `expansions`>);
    });
    it(`should pick action discarded card from discard deck`, (): void => {
        const G = {
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                    stack: [
                        {},
                    ],
                } as PublicPlayer,
            },
            expansions: {
                Idavoll: {
                    active: false,
                },
            } as Expansions,
            discardCardsDeck: [
                {
                    stack: {
                        player: [
                            {
                                stageName: CommonStageNames.ClickCoinToUpgrade,
                                value: 5,
                                drawName: DrawNames.UpgradeCoin,
                            },
                        ],
                    },
                    type: CardRusNames.RoyalOfferingCard,
                    name: RoyalOfferingNames.PlusFive,
                    upgradeValue: 5,

                },
            ],
            logData: [],
        } as Pick<MyGameState, `publicPlayers` | `discardCardsDeck` | `logData` | `expansions`>,
            ctx = {
                currentPlayer: `0`,
            } as Ctx;
        PickDiscardCardAction({ G, ctx } as Context, `0`, 0);
        expect(G).toStrictEqual({
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                    stack: [
                        {
                            priority: 0,
                        },
                        {
                            priority: 0,
                            stageName: CommonStageNames.ClickCoinToUpgrade,
                            value: 5,
                            drawName: DrawNames.UpgradeCoin,
                        },
                    ],
                } as PublicPlayer,
            },
            expansions: {
                Idavoll: {
                    active: false,
                },
            } as Expansions,
            discardCardsDeck: [
                {
                    stack: {
                        player: [
                            {
                                priority: 0,
                                stageName: CommonStageNames.ClickCoinToUpgrade,
                                value: 5,
                                drawName: DrawNames.UpgradeCoin,
                            },
                        ],
                    },
                    type: CardRusNames.RoyalOfferingCard,
                    name: RoyalOfferingNames.PlusFive,
                    upgradeValue: 5,

                },
            ],
            logData: [
                {
                    type: LogNames.Game,
                    text: `Игрок 'Dan' взял карту '${CardRusNames.RoyalOfferingCard}' '${RoyalOfferingNames.PlusFive}' из колоды сброса.`,
                },
                {
                    type: LogNames.Public,
                    text: `Игрок 'Dan' выбрал карту '${CardRusNames.RoyalOfferingCard}' '${RoyalOfferingNames.PlusFive}'.`,
                },
                {
                    type: LogNames.Game,
                    text: `Карта '${CardRusNames.RoyalOfferingCard}' '${RoyalOfferingNames.PlusFive}' убрана в сброс после применения её эффекта.`,
                },
            ],
        } as Pick<MyGameState, `publicPlayers` | `discardCardsDeck` | `logData` | `expansions`>);
    });
    it(`should move thrud`, (): void => {
        const G = {
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                    heroes: [
                        {
                            playerSuit: SuitNames.hunter,
                            name: HeroNames.Thrud,
                        },
                    ],
                    stack: [
                        {},
                    ],
                    cards: {
                        hunter: [
                            {
                                suit: SuitNames.hunter,
                                name: HeroNames.Thrud,
                            },
                        ],
                    },
                    buffs: [
                        {
                            moveThrud: SuitNames.hunter,
                        },
                    ],
                } as PublicPlayer,
            },
            expansions: {
                Idavoll: {
                    active: false,
                },
            } as Expansions,
            discardCardsDeck: [
                {
                    type: CardRusNames.DwarfCard,
                    playerSuit: SuitNames.hunter,
                    name: `Test`,
                },
            ] as DiscardDeckCard[],
            logData: [],
        } as Pick<MyGameState, `publicPlayers` | `discardCardsDeck` | `logData` | `expansions`>,
            ctx = {
                currentPlayer: `0`,
            } as Ctx;
        PickDiscardCardAction({ G, ctx } as Context, `0`, 0);
        expect(G).toStrictEqual({
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                    heroes: [
                        {
                            playerSuit: SuitNames.hunter,
                            name: HeroNames.Thrud,
                        },
                    ],
                    stack: [
                        {
                            priority: 0,
                        },
                        {
                            priority: 2,
                            name: HeroNames.Thrud,
                            stageName: CommonStageNames.PlaceThrudHero,
                            drawName: DrawNames.PlaceThrudHero,
                        },
                    ],
                    cards: {
                        hunter: [
                            {
                                type: CardRusNames.DwarfPlayerCard,
                                suit: SuitNames.hunter,
                                name: `Test`,
                                points: null,
                                rank: 1,
                            },
                        ],
                    },
                    buffs: [
                        {
                            moveThrud: SuitNames.hunter,
                        },
                    ],
                } as PublicPlayer,
            },
            expansions: {
                Idavoll: {
                    active: false,
                },
            } as Expansions,
            discardCardsDeck: [],
            logData: [
                {
                    type: LogNames.Game,
                    text: `Игрок 'Dan' взял карту '${CardRusNames.DwarfCard}' 'Test' из колоды сброса.`,
                },
                {
                    type: LogNames.Public,
                    text: `Игрок 'Dan' выбрал карту '${CardRusNames.DwarfPlayerCard}' 'Test' во фракцию '${suitsConfig[SuitNames.hunter].suitName}'.`,
                },
            ],
        } as Pick<MyGameState, `publicPlayers` | `discardCardsDeck` | `logData` | `expansions`>);
    });
    it(`shouldn't remove non-exists discard card and must throw Error`, (): void => {
        const G = {
            publicPlayers: {
                0: {} as PublicPlayer,
            },
            discardCardsDeck: [],
        } as Pick<MyGameState, `publicPlayers` | `discardCardsDeck`>,
            ctx = {
                currentPlayer: `0`,
            } as Ctx;
        expect((): void => {
            PickDiscardCardAction({ G, ctx } as Context, `0`, 0);
        }).toThrow(`В массиве колоды сброса отсутствует выбранная карта с id '0': это должно проверяться в MoveValidator.`);
    });
});

describe(`Test PlaceEnlistmentMercenariesAction method`, (): void => {
    it(`should get mercenary card from player's camp cards to place`, (): void => {
        const G = {
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                    campCards: [
                        {
                            path: ``,
                            name: `Test`,
                            variants: {
                                warrior: {
                                    suit: SuitNames.warrior,
                                    rank: 1,
                                    points: 6,
                                },
                                blacksmith: {
                                    suit: SuitNames.blacksmith,
                                    rank: 1,
                                    points: null,
                                },
                            },
                        },
                    ],
                    stack: [
                        {
                            card: {
                                type: CardRusNames.MercenaryCard,
                                path: ``,
                                name: `Test`,
                                variants: {
                                    warrior: {
                                        suit: SuitNames.warrior,
                                        rank: 1,
                                        points: 6,
                                    },
                                    blacksmith: {
                                        suit: SuitNames.blacksmith,
                                        rank: 1,
                                        points: null,
                                    },
                                },
                            },
                        },
                    ],
                    heroes: [] as HeroCard[],
                    cards: {
                        blacksmith: [] as PlayerBoardCard[],
                        miner: [] as PlayerBoardCard[],
                    },
                    buffs: [] as PlayerBuffs[],
                } as PublicPlayer,
            },
            expansions: {
                Idavoll: {
                    active: false,
                },
            } as Expansions,
            logData: [],
        } as Pick<MyGameState, `publicPlayers` | `expansions` | `logData`>,
            ctx = {
                currentPlayer: `0`,
                phase: PhaseNames.EnlistmentMercenaries,
            } as Ctx;
        PlaceEnlistmentMercenariesAction({ G, ctx } as Context, `0`, SuitNames.blacksmith);
        expect(G).toStrictEqual({
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                    campCards: [] as CampDeckCard[],
                    stack: [
                        {
                            priority: 0,
                            card: {
                                type: CardRusNames.MercenaryCard,
                                path: ``,
                                name: `Test`,
                                playerSuit: SuitNames.blacksmith,
                                rank: 1,
                                points: null,
                                variants: {
                                    warrior: {
                                        suit: SuitNames.warrior,
                                        rank: 1,
                                        points: 6,
                                    },
                                    blacksmith: {
                                        suit: SuitNames.blacksmith,
                                        rank: 1,
                                        points: null,
                                    },
                                },
                            },
                        },
                        {
                            priority: 0,
                            stageName: EnlistmentMercenariesStageNames.PlaceEnlistmentMercenaries,
                            drawName: DrawNames.PlaceEnlistmentMercenaries,
                            card: {
                                type: CardRusNames.MercenaryCard,
                                path: ``,
                                name: `Test`,
                                playerSuit: SuitNames.blacksmith,
                                rank: 1,
                                points: null,
                                variants: {
                                    warrior: {
                                        suit: SuitNames.warrior,
                                        rank: 1,
                                        points: 6,
                                    },
                                    blacksmith: {
                                        suit: SuitNames.blacksmith,
                                        rank: 1,
                                        points: null,
                                    },
                                },
                            },
                        },
                    ],
                    heroes: [] as HeroCard[],
                    cards: {
                        blacksmith: [
                            {
                                type: CardRusNames.MercenaryPlayerCard,
                                suit: SuitNames.blacksmith,
                                rank: 1,
                                points: null,
                                name: `Test`,
                                path: ``,
                            },
                        ],
                        miner: [] as PlayerBoardCard[],
                    },
                    buffs: [] as PlayerBuffs[],
                } as PublicPlayer,
            },
            expansions: {
                Idavoll: {
                    active: false,
                },
            } as Expansions,
            logData: [
                {
                    type: LogNames.Public,
                    text: `Игрок 'Dan' выбрал карту '${CardRusNames.MercenaryPlayerCard}' 'Test' во фракцию '${suitsConfig[SuitNames.blacksmith].suitName}'.`,
                },
            ],
        } as Pick<MyGameState, `publicPlayers` | `expansions` | `logData`>);
    });
    it(`should get mercenary card from player's camp cards to place and move Thrud`, (): void => {
        const G = {
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                    campCards: [
                        {
                            path: ``,
                            name: `Test`,
                            variants: {
                                warrior: {
                                    suit: SuitNames.warrior,
                                    rank: 1,
                                    points: 6,
                                },
                                explorer: {
                                    suit: SuitNames.explorer,
                                    rank: 1,
                                    points: 8,
                                },
                            },
                        },
                    ],
                    stack: [
                        {
                            card: {
                                type: CardRusNames.MercenaryCard,
                                path: ``,
                                name: `Test`,
                                variants: {
                                    warrior: {
                                        suit: SuitNames.warrior,
                                        rank: 1,
                                        points: 6,
                                    },
                                    blacksmith: {
                                        suit: SuitNames.blacksmith,
                                        rank: 1,
                                        points: null,
                                    },
                                },
                            },
                        },
                    ],
                    cards: {
                        warrior: [
                            {
                                suit: SuitNames.warrior,
                                name: HeroNames.Thrud,
                            },
                        ],
                    },
                    buffs: [
                        {
                            moveThrud: SuitNames.warrior,
                        },
                    ],
                } as PublicPlayer,
            },
            expansions: {
                Idavoll: {
                    active: false,
                },
            } as Expansions,
            logData: [],
        } as Pick<MyGameState, `publicPlayers` | `expansions` | `logData`>,
            ctx = {
                currentPlayer: `0`,
                phase: PhaseNames.EnlistmentMercenaries,
            } as Ctx;
        PlaceEnlistmentMercenariesAction({ G, ctx } as Context, `0`, SuitNames.warrior);
        expect(G).toStrictEqual({
            publicPlayers: {
                0: {
                    nickname: `Dan`,
                    campCards: [] as CampDeckCard[],
                    stack: [
                        {
                            priority: 0,
                            card: {
                                type: CardRusNames.MercenaryCard,
                                path: ``,
                                name: `Test`,
                                playerSuit: SuitNames.warrior,
                                rank: 1,
                                points: 6,
                                variants: {
                                    warrior: {
                                        suit: SuitNames.warrior,
                                        rank: 1,
                                        points: 6,
                                    },
                                    blacksmith: {
                                        suit: SuitNames.blacksmith,
                                        rank: 1,
                                        points: null,
                                    },
                                },
                            },
                        },
                        {
                            drawName: DrawNames.PlaceThrudHero,
                            name: HeroNames.Thrud,
                            priority: 2,
                            stageName: CommonStageNames.PlaceThrudHero,
                        } as PlayerStack,
                        {
                            priority: 0,
                            stageName: EnlistmentMercenariesStageNames.PlaceEnlistmentMercenaries,
                            drawName: DrawNames.PlaceEnlistmentMercenaries,
                            card: {
                                type: CardRusNames.MercenaryCard,
                                path: ``,
                                name: `Test`,
                                playerSuit: SuitNames.warrior,
                                rank: 1,
                                points: 6,
                                variants: {
                                    warrior: {
                                        suit: SuitNames.warrior,
                                        rank: 1,
                                        points: 6,
                                    },
                                    blacksmith: {
                                        suit: SuitNames.blacksmith,
                                        rank: 1,
                                        points: null,
                                    },
                                },
                            },
                        },
                    ],
                    cards: {
                        warrior: [
                            {
                                type: CardRusNames.MercenaryPlayerCard,
                                suit: SuitNames.warrior,
                                rank: 1,
                                points: 6,
                                name: `Test`,
                                path: ``,
                            },
                        ] as PlayerBoardCard[],
                    },
                    buffs: [
                        {
                            moveThrud: SuitNames.warrior,
                        },
                    ],
                } as PublicPlayer,
            },
            expansions: {
                Idavoll: {
                    active: false,
                },
            } as Expansions,
            logData: [
                {
                    type: LogNames.Public,
                    text: `Игрок 'Dan' выбрал карту '${CardRusNames.MercenaryPlayerCard}' 'Test' во фракцию '${suitsConfig[SuitNames.warrior].suitName}'.`,
                },
            ],
        } as Pick<MyGameState, `publicPlayers` | `expansions` | `logData`>);
    });
    it(`shouldn't get non-mercenary card to place and must throw Error`, ():
        void => {
        const G = {
            publicPlayers: {
                0: {
                    stack: [
                        {
                            card: {
                                type: CardRusNames.DwarfCard,
                            },
                        },
                    ],
                } as PublicPlayer,
            } as PublicPlayers,
        } as MyGameState,
            ctx = {
                currentPlayer: `0`,
            } as Ctx;
        expect((): void => {
            PlaceEnlistmentMercenariesAction({ G, ctx } as Context, `0`, SuitNames.blacksmith);
        }).toThrow(`Выбранная карта должна быть с типом '${CardRusNames.MercenaryCard}'.`);
    });
    it(`shouldn't get mercenary card which not exists in player's camp cards to place and must throw Error`,
        (): void => {
            const G = {
                publicPlayers: {
                    0: {
                        nickname: `Dan`,
                        campCards: [
                            {
                                name: ``,
                                variants: {},
                            },
                        ],
                        cards: {
                            explorer: [] as PlayerBoardCard[],
                        },
                        stack: [
                            {
                                card: {
                                    type: CardRusNames.MercenaryCard,
                                    path: ``,
                                    name: `Test`,
                                    variants: {
                                        warrior: {
                                            suit: SuitNames.warrior,
                                            rank: 1,
                                            points: 6,
                                        },
                                        blacksmith: {
                                            suit: SuitNames.blacksmith,
                                            rank: 1,
                                            points: null,
                                        },
                                    },
                                },
                            },
                        ],
                    } as PublicPlayer,
                },
                logData: [],
            } as Pick<MyGameState, `publicPlayers` | `logData`>,
                ctx = {
                    currentPlayer: `0`,
                } as Ctx;
            expect((): void => {
                PlaceEnlistmentMercenariesAction({ G, ctx } as Context, `0`, SuitNames.warrior);
            }).toThrow(`У игрока с id '0' в массиве карт лагеря отсутствует выбранная карта с названием 'Test'.`);
        });
    it(`shouldn't use non-existing suit in picked mercenary card and must throw Error`, (): void => {
        const G = {
            publicPlayers: {
                0: {
                    stack: [
                        {
                            card: {
                                type: CardRusNames.MercenaryCard,
                                path: ``,
                                name: `Test`,
                                variants: {
                                    warrior: {
                                        suit: SuitNames.warrior,
                                        rank: 1,
                                        points: 6,
                                    },
                                    blacksmith: {
                                        suit: SuitNames.blacksmith,
                                        rank: 1,
                                        points: null,
                                    },
                                },
                            },
                        },
                    ],
                } as PublicPlayer,
            },
        } as Pick<MyGameState, `publicPlayers`>,
            ctx = {
                currentPlayer: `0`,
            } as Ctx;
        expect((): void => {
            PlaceEnlistmentMercenariesAction({ G, ctx } as Context, `0`, SuitNames.hunter);
        }).toThrow(`У выбранной карты '${CardRusNames.MercenaryCard}' отсутствует принадлежность к выбранной фракции '${SuitNames.hunter}'.`);
    });
});
