import { BuildPlayer, BuildPublicPlayer, CreatePrivatePlayer, CreatePublicPlayer } from "../Player";
import type { CanBeNull, CreatePublicPlayerFromData, PlayerBoardCard, PrivatePlayer, PublicPlayer, SuitProperty } from "../typescript/interfaces";
import { expectedAllBuildInitialCoins } from "./Coin.test";

const testPlayerCards: SuitProperty<PlayerBoardCard[]> = {
    blacksmith: [],
    explorer: [],
    hunter: [],
    miner: [],
    warrior: [],
};

const testGiantTokenSuits: SuitProperty<CanBeNull<boolean>> = {
    blacksmith: null,
    explorer: null,
    hunter: null,
    miner: null,
    warrior: null,
};

const testCreatePrivatePlayerData: PrivatePlayer = {
    boardCoins: [null, null, null, null, null],
    handCoins: expectedAllBuildInitialCoins,
};

const expectedPrivatePlayer: PrivatePlayer = {
    boardCoins: [null, null, null, null, null],
    handCoins: expectedAllBuildInitialCoins,
};

const testCreatePublicPlayerInLocalData: CreatePublicPlayerFromData = {
    boardCoins: [null, null, null, null, null],
    cards: testPlayerCards,
    giantTokenSuits: testGiantTokenSuits,
    handCoins: expectedAllBuildInitialCoins,
    nickname: `Dan`,
    priority: {
        isExchangeable: true,
        value: 5,
    },
};

const expectedPublicPlayerInLocal: PublicPlayer = {
    boardCoins: [null, null, null, null, null],
    buffs: [],
    campCards: [],
    cards: testPlayerCards,
    currentCoinsScore: 14,
    currentMaxCoinValue: 5,
    giantTokenSuits: testGiantTokenSuits,
    handCoins: expectedAllBuildInitialCoins,
    heroes: [],
    mythologicalCreatureCards: [],
    nickname: `Dan`,
    priority: {
        isExchangeable: true,
        value: 5,
    },
    selectedCoin: null,
    stack: [],
};

const testCreatePublicPlayerInMultiplayerData: CreatePublicPlayerFromData = {
    boardCoins: [null, null, null, null, null],
    cards: testPlayerCards,
    giantTokenSuits: testGiantTokenSuits,
    handCoins: [{
        value: undefined,
    }, {
        value: undefined,
    }, {
        value: undefined,
    }, {
        value: undefined,
    }, {
        value: undefined,
    }],
    nickname: `Dan`,
    priority: {
        isExchangeable: true,
        value: 5,
    },
};

const expectedPublicPlayerInMultiplayer: PublicPlayer = {
    boardCoins: [null, null, null, null, null],
    buffs: [],
    campCards: [],
    cards: testPlayerCards,
    currentCoinsScore: 14,
    currentMaxCoinValue: 5,
    giantTokenSuits: testGiantTokenSuits,
    handCoins: [{
        value: undefined,
    }, {
        value: undefined,
    }, {
        value: undefined,
    }, {
        value: undefined,
    }, {
        value: undefined,
    }],
    heroes: [],
    mythologicalCreatureCards: [],
    nickname: `Dan`,
    priority: {
        isExchangeable: true,
        value: 5,
    },
    selectedCoin: null,
    stack: [],
};

describe(`Test BuildPlayer method`, (): void => {
    it(`should create private player`, (): void => {
        expect(CreatePrivatePlayer(testCreatePrivatePlayerData)).toStrictEqual(expectedPrivatePlayer);
    });
    it(`should build private player`, (): void => {
        expect(BuildPlayer()).toStrictEqual(expectedPrivatePlayer);
    });
    it(`should create public player (multiplayer=false)`, (): void => {
        expect(CreatePublicPlayer(testCreatePublicPlayerInLocalData)).toStrictEqual(expectedPublicPlayerInLocal);
    });
    it(`should build public player (multiplayer=false)`, (): void => {
        expect(BuildPublicPlayer(`Dan`, { isExchangeable: true, value: 5, }, false)).toStrictEqual(expectedPublicPlayerInLocal);
    });
    it(`should create public player (multiplayer=true)`, (): void => {
        expect(CreatePublicPlayer(testCreatePublicPlayerInMultiplayerData)).toStrictEqual(expectedPublicPlayerInMultiplayer);
    });
    it(`should build public player (multiplayer=true)`, (): void => {
        expect(BuildPublicPlayer(`Dan`, { isExchangeable: true, value: 5, }, true)).toStrictEqual(expectedPublicPlayerInMultiplayer);
    });
});
