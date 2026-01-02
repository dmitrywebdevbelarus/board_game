import { GetAverageSuitCard } from "./bot_logic/BotCardLogic";
import { GetAllPicks, k_combinations, Permute } from "./bot_logic/BotConfig";
import { BuildCampCards } from "./Camp";
import { BuildRoyalCoins } from "./Coin";
import { initialCoinsConfig } from "./data/CoinData";
import { suitsConfig } from "./data/SuitData";
import { BuildDwarfCards } from "./Dwarf";
import { BuildHeroes } from "./Hero";
import { AssertCamp, AssertPlayerCoinId, AssertPlayerId, AssertRandomPriorityIndex, AssertRoyalCoinsUnique, AssertSecretAllCampDecksIndex, AssertSecretAllDwarfDecksIndex, AssertTierIndex } from "./is_helpers/AssertionTypeHelpers";
import { BuildMultiSuitCards } from "./MultiSuitCard";
import { BuildMythologicalCreatureCards, BuildMythologicalCreatureDecks } from "./MythologicalCreature";
import { BuildPlayer, BuildPublicPlayer } from "./Player";
import { GeneratePrioritiesForPlayerNumbers } from "./Priority";
import { BuildRoyalOfferingCards } from "./RoyalOffering";
import { BuildSpecialCards } from "./SpecialCard";
import { GameModeNames, SuitNames, TierNames } from "./typescript/enums";
import type { AIBotData, BuildHeroesArray, CanBeNull, CanBeUndef, DiscardCampCard, DiscardDeckCard, DiscardMythologicalCreatureCard, Distinctions, DrawTavernCardSize, DwarfCard, Expansions, GameNamesKeyof, GameSetupData, LogData, MultiSuitCard, MultiSuitPlayerCard, MyGameState, MythologicalCreatureCard, PlayerCoinId, Players, PlayersNumberTierCardData, PrioritiesForPlayerNumbers, Priority, PublicPlayers, PublicPlayersOrderArray, RoyalCoin, RoyalOfferingCard, SecretCampDeck, SecretCampDecksLength, SecretDwarfDeck, SecretDwarfDecksLength, SecretMyGameStateData, SpecialCard, SpecialPlayerCard, SuitProperty, TavernsArray, TavernsNum, TotalScoreArray, WinnerArray } from "./typescript/interfaces";

/**
 * <h3>Инициализация игры.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Данные используются в игре.</li>
 * </ol>
 *
 * @param context
 * @returns Данные игры.
 */
export const SetupGame = (
    { ctx, random }: GameSetupData,
): MyGameState => {
    // TODO Rework it!
    const mode: GameModeNames = ctx.numPlayers === 2 ? GameModeNames.Solo : ctx.numPlayers === 3
        ? GameModeNames.SoloAndvari : ctx.numPlayers === 4 ? GameModeNames.Multiplayer : GameModeNames.Basic,
        suitsNum = 5,
        tierToEnd = 2,
        campNum = 5,
        round = -1,
        drawSize: DrawTavernCardSize = ctx.numPlayers === 2 ? 3 : ctx.numPlayers,
        soloGameDifficultyLevel = null,
        soloGameAndvariStrategyLevel = null,
        soloGameAndvariStrategyVariantLevel = null,
        explorerDistinctionCardId = null,
        odroerirTheMythicCauldron = false,
        log = true,
        debug = false,
        tavernCardDiscarded2Players = false,
        drawProfit = null,
        expansions: Expansions = {
            Basic: {
                active: true,
            },
            Thingvellir: {
                active: mode === GameModeNames.Solo || mode === GameModeNames.SoloAndvari ? false : true,
            },
            // TODO Fix me to "true" after expansion finished
            Idavoll: {
                active: mode === GameModeNames.Solo || mode === GameModeNames.SoloAndvari ? false : true,
            },
        },
        totalScore: CanBeNull<TotalScoreArray> = null,
        logData: LogData[] = [],
        odroerirTheMythicCauldronCoins: RoyalCoin[] = [],
        specialCardsDeck: SpecialCard[] = BuildSpecialCards(),
        configOptions: GameNamesKeyof[] = [],
        discardCardsDeck: DiscardDeckCard[] = [],
        explorerDistinctionCards = null,
        strategyForSoloBotAndvari = null,
        distinctions: SuitProperty<Distinctions> = {} as SuitProperty<Distinctions>,
        secret: SecretMyGameStateData = {
            campDecks: [[], []],
            decks: [[], []],
            mythologicalCreatureDeck: [],
            mythologicalCreatureNotInGameDeck: [],
        };
    let suit: SuitNames;
    for (suit in suitsConfig) {
        distinctions[suit] = null;
    }
    const winner: CanBeNull<WinnerArray> = null,
        campPicked = false,
        mustDiscardTavernCardJarnglofi = null,
        discardCampCardsDeck: DiscardCampCard[] = [],
        discardMythologicalCreaturesCards: DiscardMythologicalCreatureCard[] = [],
        discardMultiCards: MultiSuitPlayerCard[] = [],
        discardSpecialCards: SpecialPlayerCard[] = [],
        campDecksLength: SecretCampDecksLength = [0, 0],
        decksLength: SecretDwarfDecksLength = [0, 0],
        mythologicalCreatureDeckForSkymir = null,
        camp: null[] = Array(campNum).fill(null);
    AssertCamp(camp);
    for (let i = 0; i < tierToEnd; i++) {
        AssertTierIndex(i);
        if (expansions.Thingvellir.active) {
            secret.campDecks[i] = BuildCampCards(i);
            AssertSecretAllCampDecksIndex(i);
            let campDeck: SecretCampDeck = secret.campDecks[i];
            campDeck = random.Shuffle(campDeck);
            secret.campDecks[i] = campDeck;
            campDecksLength[i] = campDeck.length;
            campDecksLength[0] = secret.campDecks[0].length;
        }
        secret.decks[i] = [];
        const data: PlayersNumberTierCardData = {
            players: ctx.numPlayers,
            tier: i,
        },
            dwarfDeck: DwarfCard[] = BuildDwarfCards(data),
            royalOfferingDeck: RoyalOfferingCard[] = BuildRoyalOfferingCards(data);
        AssertSecretAllDwarfDecksIndex(i);
        let deck: SecretDwarfDeck = secret.decks[i];
        deck = deck.concat(dwarfDeck, royalOfferingDeck);
        decksLength[i] = deck.length;
        secret.decks[i] = random.Shuffle(deck);
    }
    let expansion: GameNamesKeyof;
    for (expansion in expansions) {
        if (expansions[expansion].active) {
            configOptions.push(expansion);
        }
    }
    const [heroes, heroesForSoloBot, heroesForSoloGameDifficultyLevel, heroesInitialForSoloGameForBotAndvari]:
        BuildHeroesArray = BuildHeroes(
            configOptions,
            mode,
        ),
        heroesForSoloGameForStrategyBotAndvari = null,
        multiCardsDeck: MultiSuitCard[] = BuildMultiSuitCards(configOptions),
        // TODO Fix it!
        taverns: [null[], null[], null[]] = [[], [], []],
        tavernsNum: TavernsNum = 3,
        currentTavern = 0;
    decksLength[0] = secret.decks[0].length;
    let mythologicalCreatureDeckLength = 0,
        mythologicalCreatureNotInGameDeckLength = 0;
    if (expansions.Idavoll.active) {
        let mythologicalCreatureCardsDeck: MythologicalCreatureCard[] = BuildMythologicalCreatureCards();
        mythologicalCreatureCardsDeck = random.Shuffle(mythologicalCreatureCardsDeck);
        [secret.mythologicalCreatureDeck, secret.mythologicalCreatureNotInGameDeck] =
            BuildMythologicalCreatureDecks(
                mythologicalCreatureCardsDeck,
                ctx.numPlayers,
            );
        // TODO Add Idavoll decks length info on main page?
        mythologicalCreatureDeckLength = secret.mythologicalCreatureDeck.length;
        mythologicalCreatureNotInGameDeckLength = secret.mythologicalCreatureNotInGameDeck.length;
    }
    for (let i = 0; i < tavernsNum; i++) {
        taverns[i] = Array(drawSize).fill(null);
    }
    // TODO Can i rework AS?!
    const players: Players = {} as Players,
        publicPlayers: PublicPlayers = {} as PublicPlayers,
        publicPlayersOrder: PublicPlayersOrderArray = [],
        exchangeOrder: null = null,
        priorities: PrioritiesForPlayerNumbers = GeneratePrioritiesForPlayerNumbers(
            ctx,
            mode === GameModeNames.Solo,
        );
    for (let i = 0; i < ctx.numPlayers; i++) {
        const playerID: string = String(i);
        AssertPlayerId(ctx, playerID);
        // TODO Move Generate & Randomize Priority in one place or different functions!?
        const randomPriorityIndex: number =
            mode === GameModeNames.Solo ? 0 : Math.floor(Math.random() * priorities.length);
        AssertRandomPriorityIndex(ctx, randomPriorityIndex);
        const priority: CanBeUndef<Priority> = priorities.splice(randomPriorityIndex, 1)[0];
        if (priority === undefined) {
            throw new Error(`Отсутствует приоритет ${i}.`);
        }
        players[playerID] = BuildPlayer();
        const soloBot: boolean = (mode === GameModeNames.Solo || mode === GameModeNames.SoloAndvari) && i === 1;
        publicPlayers[playerID] = BuildPublicPlayer(
            soloBot ? `SoloBot` : `Dan${i}`,
            priority,
            soloBot || mode === GameModeNames.Multiplayer,
        );
    }
    const royalCoinsUnique: RoyalCoin[] = [],
        royalCoins: RoyalCoin[] = BuildRoyalCoins({
            count: royalCoinsUnique,
            players: ctx.numPlayers,
        }),
        averageCards: SuitProperty<DwarfCard> = {} as SuitProperty<DwarfCard>;
    AssertRoyalCoinsUnique(royalCoinsUnique);
    for (suit in suitsConfig) {
        averageCards[suit] = GetAverageSuitCard(suit, {
            players: ctx.numPlayers,
            tier: TierNames.First,
        });
    }
    const initHandCoinsId: PlayerCoinId[] = Array(initialCoinsConfig.length).fill(undefined)
        .map((item: undefined, index: number): PlayerCoinId => {
            AssertPlayerCoinId(index);
            return index;
        }),
        initCoinsOrder: PlayerCoinId[][] = k_combinations(
            initHandCoinsId,
            tavernsNum,
        );
    let allCoinsOrder: PlayerCoinId[][] = [];
    for (let i = 0; i < initCoinsOrder.length; i++) {
        const coinsOrder: CanBeUndef<PlayerCoinId[]> = initCoinsOrder[i];
        if (coinsOrder === undefined) {
            throw new Error(`Отсутствует порядок выкладки монет ${i}.`);
        }
        allCoinsOrder = allCoinsOrder.concat(Permute(coinsOrder));
    }
    const botData: AIBotData = {
        allCoinsOrder,
        allPicks: GetAllPicks(
            tavernsNum,
            ctx.numPlayers,
        ),
        maxIter: 1000,
        deckLength: secret.decks[0].length,
    };
    return {
        mode,
        soloGameDifficultyLevel,
        soloGameAndvariStrategyLevel,
        soloGameAndvariStrategyVariantLevel,
        odroerirTheMythicCauldron,
        tavernCardDiscarded2Players,
        averageCards,
        botData,
        odroerirTheMythicCauldronCoins,
        camp,
        explorerDistinctionCards,
        explorerDistinctionCardId,
        decksLength,
        campDecksLength,
        mythologicalCreatureDeckLength,
        mythologicalCreatureNotInGameDeckLength,
        mythologicalCreatureDeckForSkymir,
        secret,
        campNum,
        campPicked,
        mustDiscardTavernCardJarnglofi,
        currentTavern,
        debug,
        multiCardsDeck,
        specialCardsDeck,
        discardCampCardsDeck,
        discardCardsDeck,
        discardMythologicalCreaturesCards,
        discardMultiCards,
        discardSpecialCards,
        distinctions,
        drawProfit,
        drawSize,
        exchangeOrder,
        expansions,
        heroes,
        heroesForSoloBot,
        heroesForSoloGameDifficultyLevel,
        heroesInitialForSoloGameForBotAndvari,
        heroesForSoloGameForStrategyBotAndvari,
        strategyForSoloBotAndvari,
        log,
        logData,
        royalCoins,
        royalCoinsUnique,
        round,
        suitsNum,
        // TODO Fix it!
        taverns: taverns as TavernsArray,
        tavernsNum,
        tierToEnd,
        totalScore,
        players,
        publicPlayers,
        publicPlayersOrder,
        winner,
    };
};
