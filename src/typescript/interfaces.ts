import type { ActionPayload, AiEnumerate, DefaultPluginAPIs, Plugin, State } from "boardgame.io";
import type { Flow } from "boardgame.io/dist/types/src/core/flow";
import type { BoardProps } from "./Client";
import type { ActivateGiantAbilityOrPickCardSubMoveValidatorNames, ActivateGiantAbilityOrPickCardSubStageNames, ActivateGodAbilityOrNotSubMoveValidatorNames, ActivateGodAbilityOrNotSubStageNames, ArtefactBuffNames, ArtefactDescriptionNames, ArtefactNames, ArtefactScoringFunctionNames, AutoActionFunctionNames, AutoBotsMoveNames, BidsDefaultStageNames, BidsMoveValidatorNames, BidUlineDefaultStageNames, BidUlineMoveValidatorNames, BrisingamensEndGameDefaultStageNames, BrisingamensEndGameMoveValidatorNames, ButtonMoveNames, ButtonNames, CardMoveNames, CardRusNames, CardWithoutSuitAndWithActionCssTDClassNames, ChooseDifficultySoloModeAndvariDefaultStageNames, ChooseDifficultySoloModeAndvariMoveValidatorNames, ChooseDifficultySoloModeDefaultStageNames, ChooseDifficultySoloModeMoveValidatorNames, ChooseDifficultySoloModeStageNames, CoinCssClassNames, CoinMoveNames, CoinNames, CoinRusNames, CommonBuffNames, CommonMoveValidatorNames, CommonStageNames, ConfigNames, DistinctionAwardingFunctionNames, DistinctionCardMoveNames, DistinctionDescriptionNames, DrawNames, EmptyCardMoveNames, EnlistmentMercenariesDefaultStageNames, EnlistmentMercenariesMoveValidatorNames, EnlistmentMercenariesStageNames, GameModeNames, GameNames, GetMjollnirProfitDefaultStageNames, GetMjollnirProfitMoveValidatorNames, GiantBuffNames, GiantDescriptionNames, GiantNames, GiantScoringFunctionNames, GodBuffNames, GodDescriptionNames, GodNames, HeroBuffNames, HeroCardCssSpanClassNames, HeroDescriptionNames, HeroNames, HeroScoringFunctionNames, InvalidMoveNames, LogNames, MultiSuitCardNames, MythicalAnimalBuffNames, MythicalAnimalDescriptionNames, MythicalAnimalNames, MythicalAnimalScoringFunctionNames, PhaseNames, PickCardValidatorNames, PickHeroCardValidatorNames, PlaceYludDefaultStageNames, PlaceYludMoveValidatorNames, RankVariantsNames, RoyalOfferingNames, SoloBotAndvariCommonMoveValidatorNames, SoloBotAndvariCommonStageNames, SoloBotCommonCoinUpgradeMoveValidatorNames, SoloBotCommonCoinUpgradeStageNames, SoloBotCommonMoveValidatorNames, SoloBotCommonStageNames, SoloGameAndvariStrategyNames, SpecialCardNames, SuitCssBGColorClassNames, SuitDescriptionNames, SuitMoveNames, SuitNames, SuitRusNames, SuitScoringFunctionNames, TavernNames, TavernsResolutionDefaultStageNames, TavernsResolutionMoveValidatorNames, TavernsResolutionStageNames, TavernsResolutionWithSubStageNames, TierNames, TroopEvaluationDefaultStageNames, TroopEvaluationMoveValidatorNames, TroopEvaluationStageNames, ValkyryBuffNames, ValkyryDescriptionNames, ValkyryNames, ValkyryScoringFunctionNames } from "./enums";

// TODO Check all number/string types here!

// Secret Data Start
/**
 * <h3>Все скрытые от всех игроков данные в `G`.</h3>
 */
export interface SecretMyGameStateData {
    readonly campDecks: SecretAllCampDecks;
    readonly decks: SecretAllDwarfDecksArray;
    mythologicalCreatureDeck: SecretMythologicalCreatureDeck;
    mythologicalCreatureNotInGameDeck: SecretMythologicalCreatureNotInGameDeck;
}

/**
 * <h3>Скрытые от всех игроков данные всех колод карт лагеря со всех эпох в `G`.</h3>
 */
export type SecretAllCampDecks = [
    SecretCampDeckTier0,
    SecretCampDeckTier1,
];

/**
 * <h3>Скрытые от всех игроков данные колоды карт лагеря 1 эпохи в `G`.</h3>
 */
export type SecretCampDeckTier0 = CampDeckCard[];

/**
* <h3>Скрытые от всех игроков данные колоды карт лагеря 2 эпохи в `G`.</h3>
*/
export type SecretCampDeckTier1 = CampDeckCard[];

/**
 * <h3>Объединение скрытых от всех игроков данных колоды карт лагеря каждой конкретной эпохи в `G`.</h3>
 */
export type SecretCampDeck =
    | SecretCampDeckTier0
    | SecretCampDeckTier1
    ;

/**
 * <h3>Скрытые от всех игроков данные всех колод карт дворфов со всех эпох в `G`.</h3>
 */
export type SecretAllDwarfDecksArray = [
    SecretDwarfDeckTier0,
    SecretDwarfDeckTier1,
];

export type SecretAllDwarfDecksArrayIndex = IndexOf<SecretAllDwarfDecksArray>;

/**
 * <h3>Скрытые от всех игроков данные колоды карт дворфов 1 эпохи в `G`.</h3>
 */
export type SecretDwarfDeckTier0 = DwarfDeckCard[];

/**
 * <h3>Скрытые от всех игроков данные колоды карт дворфов 2 эпохи в `G`.</h3>
 */
export type SecretDwarfDeckTier1 = DwarfDeckCard[];

/**
 * <h3>Объединение скрытых от всех игроков данных колоды карт дворфов каждой конкретной эпохи в `G`.</h3>
 */
export type SecretDwarfDeck =
    | SecretDwarfDeckTier0
    | SecretDwarfDeckTier1
    ;

/**
 * <h3>Скрытые от всех игроков данные колоды карт мифических существ в `G`.</h3>
 */
export type SecretMythologicalCreatureDeck = MythologicalCreatureCard[];

/**
 * <h3>Скрытые от всех игроков данные отложенной колоды карт мифических существ в `G`.</h3>
 */
export type SecretMythologicalCreatureNotInGameDeck = MythologicalCreatureCard[];

// Secret Deck Public Length Start
/**
 * <h3>Количество карт в колодах карт лагеря по каждой эпохе.</h3>
 */
export type SecretCampDecksLength = [
    SecretCampDeckTier0[`length`],
    SecretCampDeckTier1[`length`],
];

/**
 * <h3>Количество карт в колодах карт дворфов по каждой эпохе.</h3>
 */
export type SecretDwarfDecksLength = [
    SecretDwarfDeckTier0[`length`],
    SecretDwarfDeckTier1[`length`],
];
// Secret Deck Public Length End
// Secret Data End

// AI Start
export type AIPickCardOrCampCard =
    | `card`
    | `camp`
    ;

export type AIActivateGiantAbilityOrPickCard =
    | `ability`
    | `card`
    ;

export type AIActivateGodAbilityOrPickCard =
    | `ability`
    | `not`
    ;

/**
 * <h3>Данные для бота.</h3>
 */
export interface AIBotData {
    readonly allCoinsOrder: PlayerCoinId[][];
    readonly allPicks: readonly PlayerCoinId[][];
    readonly deckLength: SecretDwarfDecksLength[0];
    readonly maxIter: 1000;
}

/**
 * <h3>Вес для различных действий ботов.</h3>
 */
interface AIWeight {
    readonly weight:
    | -100
    | 0
    | 0.5
    ;
}

export type AICardCharacteristicsArray = readonly [
    AICardCharacteristics,
    AICardCharacteristics,
    AICardCharacteristics,
];

/**
 * <h3>Эвристика для ботов.</h3>
 */
export interface AIHeuristic extends AIWeight {
    readonly heuristic: (array: TavernAllCardsArray) => boolean;
}

/**
 * <h3>Цель для ботов.</h3>
 */
interface AIObjective extends AIWeight {
    readonly checker: (G: MyGameState, ctx: Ctx) => boolean;
}

/**
 * <h3>Все цели для ботов.</h3>
 */
export interface AIAllObjectives {
    readonly isEarlyGame: AIObjective;
    readonly isFirst: AIObjective;
    readonly isStronger: AIObjective;
}

/**
 * <h3>Характеристики карты для ботов.</h3>
 */
export interface AICardCharacteristics {
    readonly mean: number;
    readonly variation: number;
}

export type TavernsHeuristicArrayIndex = IndexOf<TavernsHeuristicArray>;

export type TavernsHeuristicArray = [
    number,
    number,
    number,
];

export type CompareTavernCards =
    | -1
    | 0
    | 1
    ;

export type CompareCards = CanBeVoid<CompareTavernCards>;
// AI End

// Debug Start
/**
 * <h3>Данные для панели дебага.</h3>
 */
export interface DebugData {
    readonly G: Partial<Record<Keyof<MyGameState>, MyGameState[Keyof<MyGameState>]>>;
    readonly ctx: Partial<Record<Keyof<Ctx>, Ctx[Keyof<Ctx>]>>;
}

/**
 * <h3>Объект данных для отрисовки панели дебага.</h3>
 */
export type DebugDrawData<T extends DrawDebugObjectData = DrawDebugObjectData> = {
    readonly [key in Keyof<T>]: T[key];
};

type DeepGetObject<T extends object> = {
    readonly [key in Keyof<T>]-?:
    T[key] extends CanBeUndef<CanBeNull<object>>
    ? FilterUndefinedAndNullObject<T[key]> | (
        T[key] extends CanBeUndef<CanBeNull<Array<infer R> | ReadonlyArray<infer R>>>
        ? (
            R extends CanBeUndef<CanBeNull<object>>
            ? FilterUndefinedAndNullObject<R> | (
                R extends CanBeUndef<CanBeNull<Array<infer P> | ReadonlyArray<infer P>>>
                ? (
                    P extends CanBeUndef<CanBeNull<object>>
                    ? DeepGetObject<FilterUndefinedAndNullObject<P>>
                    : never
                )
                : DeepGetObject<FilterUndefinedAndNullObject<R>>
            )
            : never
        )
        : DeepGetObject<FilterUndefinedAndNullObject<T[key]>>
    )
    : never
    ;
}[keyof T];

/**
 * <h3>Объединение данных для отрисовки панели дебага.</h3>
 */
export type DrawDebugObjectData =
    | DebugData
    | DebugData[Keyof<DebugData>]
    | DeepGetObject<MyGameState>
    | DeepGetObject<Ctx>
    ;

// Debug End

// Suit Start
/**
 * <h3>Конфиг всех фракций дворфов.</h3>
 */
export type SuitConfig = Readonly<Record<SuitNames, Suit>>;

/**
 * <h3>Фракция дворфов.</h3>
 */
export interface Suit {
    readonly description: SuitDescriptionNames;
    readonly distinction: Distinction;
    readonly scoringRule: Action<SuitScoringFunctionNames>;
    readonly suit: SuitNames;
    readonly suitColor: SuitCssBGColorClassNames;
    readonly suitName: SuitRusNames;
    readonly pointsValues: () => PointsValues;
}

/**
 * <h3>Типы данных для типов свойств фракционных объектов.</h3>
 */
type SuitPropertyArg = CanBeNull<
    | DwarfCard
    | Distinctions
    | boolean
    | readonly number[]
    | readonly PlayerBoardCard[]
    | Variant<RankVariantsNames>
>;

/**
 * <h3>Типы данных для свойств фракционных объектов.</h3>
 */
export type SuitProperty<T extends SuitPropertyArg> = {
    -readonly [Property in SuitNames]: T;
};
//Suit End

// Card Start
/**
 * <h3>Типы данных для всех типов карт.</h3>
 */
export type AllCard =
    | PlayerBoardCard
    | AllPickedCard
    ;

/**
 * <h3>Типы данных для карт на планшете игрока.</h3>
 */
export type PlayerBoardCard =
    | DwarfPlayerCard
    | SpecialPlayerCard
    | MultiSuitPlayerCard
    | ArtefactPlayerCard
    | HeroPlayerCard
    | MercenaryPlayerCard
    | MythicalAnimalPlayerCard
    ;

/**
* <h3>Типы данных для всех типов карт, которые выбирает игрок.</h3>
*/
export type AllPickedCard =
    | DwarfDeckCard
    | CampDeckCard
    | HeroCard
    | MythologicalCreatureCard
    | MultiSuitCard
    | SpecialCard
    ;

//Card End

// Dwarf Cards Start
/**
 * <h3>Объединение данных для колоды карт дворфов.</h3>
 */
export type DwarfDeckCard =
    | DwarfCard
    | RoyalOfferingCard
    ;

export type AllDrawLikeCardPoints =
    | DwarfCardPoints
    | MultiSuitCardPoints
    | SpecialCardPoints
    ;

// DwarfCard Start
/**
 * <h3>Интерфейс для значений очков карт.</h3>
 */
export type PointsValues = Readonly<Record<NumPlayersWithBot,
    | NumberTierValues<DwarfPlayersAmount>
    | DwarfPointsArrayValues
>>;

type DwarfPointsValuesForMiner =
    | 0
    | 1
    | 2
    ;

export type DwarfPointsValues =
    | DwarfPointsValuesForMiner
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    ;

type AllDwarfPointsValuesArrays =
    | [
        DwarfPointsValuesForMiner,
        DwarfPointsValuesForMiner,
        DwarfPointsValuesForMiner,
        DwarfPointsValuesForMiner,
        DwarfPointsValuesForMiner,
        DwarfPointsValuesForMiner,
    ]
    | [
        DwarfPointsValues,
        DwarfPointsValues,
        DwarfPointsValues,
        DwarfPointsValues,
        DwarfPointsValues,
        DwarfPointsValues,
        DwarfPointsValues,
    ]
    | [
        DwarfPointsValues,
        DwarfPointsValues,
        DwarfPointsValues,
        DwarfPointsValues,
        DwarfPointsValues,
        DwarfPointsValues,
        DwarfPointsValues,
        DwarfPointsValues,
    ]
    | [
        DwarfPointsValues,
        DwarfPointsValues,
        DwarfPointsValues,
        DwarfPointsValues,
        DwarfPointsValues,
        DwarfPointsValues,
        DwarfPointsValues,
        DwarfPointsValues,
        DwarfPointsValues,
    ];

export type AllDwarfPointsValuesArraysLength =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    ;

/**
 * <h3>Интерфейс для числовых индексов и массивов числовых значений.</h3>
 */
type DwarfPointsArrayValues = Readonly<Record<TierNames, AllDwarfPointsValuesArrays>>;

/**
 * <h3>Типы данных для очков у карт.</h3>
 */
export type DwarfPoints =
    | DwarfPlayersAmount
    | AllDwarfPointsValuesArrays
    ;

export type AllDwarfPlayersAmountId =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    ;

export type AllDwarfPlayersAmount =
    | 6
    | 7
    | 8
    | 9
    | 10
    ;

export type DwarfPlayersAmount =
    | 6
    | 8
    | 10
    ;

export type CanBeNegativeDwarfCardPoints =
    | -12
    | -11
    | -10
    | -9
    | -8
    | -7
    | -6
    | -5
    | -4
    | -3
    | -2
    | -1
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    ;

export type DwarfCardPoints =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    ;

/**
 * <h3>Карта дворфа.</h3>
 */
export interface DwarfCard extends PlayerSuitableNonNullableCardInfo<DwarfRank> {
    // TODO Rework all cards name in Enums
    readonly name: string;
    readonly points: CanBeNull<DwarfCardPoints>;
    readonly type: CardRusNames.DwarfCard;
}

/**
 * <h3>Создание карты дворфа.</h3>
 */
export type CreateDwarfCardFromData = Omit<PartialBy<DwarfCard,
    | `type`
    | `rank`
>,
    `points`>
    & {
        readonly points: CanBeUndef<DwarfCard[`points`]>;
    };
// DwarfCard End

// DwarfPlayerCard Start
/**
 * <h3>Карта дворфа на поле игрока.</h3>
 */
export interface DwarfPlayerCard extends Pick<DwarfCard,
    | `name`
    | `points`
>,
    BasicSuitableNonNullableCardInfo<DwarfRank> {
    readonly type: CardRusNames.DwarfPlayerCard;
}

/**
 * <h3>Создание карты дворфа на поле игрока.</h3>
 */
export type CreateDwarfPlayerCardFromData = PartialBy<DwarfPlayerCard,
    | `type`
    | `rank`
    | `points`
>;
// DwarfPlayerCard End
// Dwarf Cards End

// RoyalOfferingCard Start
/**
 * <h3>Конфиг всех карт королевских наград по каждой эпохе.</h3>
 */
export type RoyalOfferingsConfig = readonly [
    RoyalOfferingCardData,
    RoyalOfferingCardData,
];

/**
 * <h3>Данные карты королевской награды.</h3>
 */
export interface RoyalOfferingCardData extends Omit<RoyalOfferingCard, `type`> {
    readonly amount: () => RoyalOfferingCardPlayers;
}

/**
 * <h3>Карта королевской награды.</h3>
 */
export interface RoyalOfferingCard extends Required<StackCardInfo> {
    readonly name: RoyalOfferingNames;
    readonly type: CardRusNames.RoyalOfferingCard;
    readonly upgradeValue: RoyalOfferingCardValue;
}

/**
 * <h3>Создание карты королевской награды.</h3>
 */
export type CreateRoyalOfferingCardFromData = PartialBy<RoyalOfferingCard, `type`>;

export type RoyalOfferingCardPlayersAmount =
    | 0
    | 1
    | 2
    | 3
    ;

/**
 * <h3>Количество карт королевской награды в каждой эпохе в зависимости от количества игроков.</h3>
 */
export type RoyalOfferingCardPlayers =
    Readonly<Record<NumPlayersWithBot, NumberTierValues<RoyalOfferingCardPlayersAmount>>>;

/**
 * <h3>Объединение данных для значений карт королевской награды.</h3>
 */
export type RoyalOfferingCardValue =
    | 3
    | 5
    ;
// RoyalOfferingCard End

// Hero Cards Start
export type AllHeroesForPlayerOrSoloBotAddToPlayerBoardPossibleCardId =
    | AllHeroesPossibleCardId
    | AllHeroesForPlayerSoloModePossibleCardId
    | AllHeroesForSoloBotAndvariPossibleCardId
    ;

export type AllHeroesPossibleCardId =
    | AllBasicHeroesPossibleCardId
    | AllAddThingvellirHeroesToBasicPossibleCardId
    ;

export type AllBasicHeroesPossibleCardId =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    ;

export type AllAddThingvellirHeroesToBasicPossibleCardId =
    | 22
    | 23
    | 24
    | 25
    | 26
    | 27
    ;

export type AllHeroesForPlayerSoloModePossibleCardId =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    ;

export type AllHeroesForPlayerSoloModeAndvariPossibleCardId =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    ;

export type AllHeroesForDifficultySoloModePossibleCardId =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    ;

export type AllHeroesForSoloBotPossibleCardId =
    | 0
    | 1
    | 2
    | 3
    | 4
    ;

export type AllHeroesForSoloBotAndvariPossibleCardId =
    | 0
    | 1
    | 2
    | 3
    | 4
    ;

/**
 * Объединение данных всех типов карт героев.
 */
export type AllHeroCard =
    | HeroCard
    | HeroPlayerCard
    ;

/**
 * <h3>Массив данных для создания всех массивов карт героев.</h3>
 */
export type BuildHeroesArray = readonly [
    HeroCard[],
    CanBeNull<HeroesForSoloGameArray>,
    CanBeNull<HeroesForSoloGameDifficultyLevelArray>,
    CanBeNull<HeroesInitialForSoloGameForBotAndvariArray>,
];

/**
 * <h3>Массив данных всех карт героев для стратегий соло бота Андвари в соло игре.</h3>
 */
export type HeroesForSoloGameForStrategyBotAndvariArray = readonly [
    HeroCard,
    HeroCard,
    HeroCard,
    HeroCard,
    HeroCard,
];

export type HeroesForSoloGameDifficultyLevelArray =
    | []
    | [
        HeroCard,
    ]
    | [
        HeroCard,
        HeroCard,
    ]
    | [
        HeroCard,
        HeroCard,
        HeroCard,
    ]
    | [
        HeroCard,
        HeroCard,
        HeroCard,
        HeroCard,
    ]
    | [
        HeroCard,
        HeroCard,
        HeroCard,
        HeroCard,
        HeroCard,
    ]
    | [
        HeroCard,
        HeroCard,
        HeroCard,
        HeroCard,
        HeroCard,
        HeroCard,
    ]
    ;

/**
 * <h3>Массив данных всех карт героев для соло бота.</h3>
 */
export type HeroesForSoloGameArray = [
    HeroCard,
    HeroCard,
    HeroCard,
    HeroCard,
    HeroCard,
];

/**
 * <h3>Массив данных всех карт героев для выбора уровня сложности для соло бота.</h3>
 */
export type HeroesInitialForSoloGameForBotAndvariArray = readonly [
    HeroCard,
    HeroCard,
    HeroCard,
    HeroCard,
    HeroCard,
    HeroCard,
    HeroCard,
    HeroCard,
    HeroCard,
    HeroCard,
];

/**
* <h3>Типы данных для ключей перечислений названий героев.</h3>
*/
export type HeroNamesKeyof = Keyof<typeof HeroNames>;

/**
 * <h3>Типы данных для ключей перечислений названий героев для лёгкого уровня сложности стратегий соло бота Андвари.</h3>
 */
export type HeroNamesForEasyStrategyAndvariKeyof = Keyof<SoloGameAndvariEasyStrategyHeroesConfig>;

/**
 * <h3>Типы данных для ключей перечислений названий героев для сложного уровня сложности стратегий соло бота Андвари.</h3>
 */
export type HeroNamesForHardStrategyAndvariKeyof = Keyof<SoloGameAndvariHardStrategyHeroesConfig>;

/**
* <h3>Тип для конфига уровня сложности для соло игры.</h3>
*/
export type SoloGameDifficultyLevelHeroesConfig = Pick<HeroConfig,
    | `Astrid`
    | `Grid`
    | `Skaa`
    | `Thrud`
    | `Uline`
    | `Ylud`
>;

/**
* <h3>Тип для конфига лёгких стратегий соло бота Андвари для соло игры.</h3>
*/
export type SoloGameAndvariEasyStrategyHeroesConfig = Pick<HeroConfig,
    | `Bonfur`
    | `Hourya`
    | `Kraal`
    | `Zoral`
    | `Dagda`
>;

/**
* <h3>Тип для конфига сложных стратегий соло бота Андвари для соло игры.</h3>
*/
export type SoloGameAndvariHardStrategyHeroesConfig = Pick<HeroConfig,
    | `Lokdur`
    | `Idunn`
    | `Tarah`
    | `Aral`
    | `Aegur`
>;

export type SoloGameAndvariHeroesForPlayersConfig = Pick<HeroConfig,
    | `Astrid`
    | `DwergAesir`
    | `DwergBergelmir`
    | `DwergJungir`
    | `DwergSigmir`
    | `DwergYmir`
    | `Grid`
    | `Skaa`
    | `Thrud`
    | `Uline`
    | `Ylud`
>;

/**
* <h3>Тип для конфига героев для соло бота для соло игры.</h3>
*/
export type SoloGameHeroesForBotConfig = Pick<HeroConfig,
    | `DwergAesir`
    | `DwergBergelmir`
    | `DwergJungir`
    | `DwergSigmir`
    | `DwergYmir`
>;

/**
* <h3>Тип для конфига героев для игрока для соло игры.</h3>
*/
export type SoloGameHeroesForPlayerConfig = Pick<HeroConfig,
    | `Kraal`
    | `Tarah`
    | `Aral`
    | `Dagda`
    | `Lokdur`
    | `Zoral`
    | `Aegur`
    | `Bonfur`
    | `Hourya`
    | `Idunn`
>;

// HeroCard Start
/**
 * <h3>Конфига всех карт героев по каждой эпохе.</h3>
 */
export type HeroConfig = Readonly<Record<Keyof<typeof HeroNames>, HeroCardData>>;

/**
 * <h3>Данные карты героя.</h3>
 */
export interface HeroCardData extends ExpansionCardInfo, PartialBy<Omit<HeroCard,
    | `type`
    | `active`
>,
    | `playerSuit`
    | `rank`
    | `points`
    | `buff`
    | `actions`
    | `stack`
    | `pickValidators`
    | `validators`
> {
    readonly scoringRule: Action<HeroScoringFunctionNames, HeroScoringArgsCanBeOptional>;
}

type HeroCardPoints =
    | 1
    | 3
    | 4
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 17
    | 20
    | 25
    ;

/**
 * <h3>Карта героя.</h3>
 */
export interface HeroCard extends PlayerSuitableNullableCardInfo<HeroRank>, AutoActionCardInfo, StackCardInfo {
    active: boolean;
    readonly buff: CanBeUndef<HeroBuff>;
    readonly description: HeroDescriptionNames;
    readonly name: HeroNames;
    readonly pickValidators: CanBeUndef<PickValidatorsConfig>;
    points: CanBeNull<HeroCardPoints>;
    readonly type: CardRusNames.HeroCard;
}

/**
 * <h3>Создание карты героя.</h3>
 */
export type CreateHeroCardFromData = Omit<PartialBy<Omit<HeroCard, `active`>
    & ReadonlyBy<HeroCard, `active`>,
    | `type`
    | `active`
>,
    | `playerSuit`
    | `points`
    | `rank`
>
    & PlayerSuitableNullableCanBeUndefCardInfo<HeroRank>
    & {
        readonly points: CanBeUndef<HeroCard[`points`]>;
    };

// HeroCard End

// HeroPlayerCard Start
/**
 * <h3>Карта героя на поле игрока.</h3>
 */
export interface HeroPlayerCard extends Pick<HeroCard,
    | `name`
    | `description`
    | `points`
>,
    BasicSuitableNonNullableCardInfo<HeroRank> {
    readonly type: CardRusNames.HeroPlayerCard;
}

/**
 * <h3>Создание карты героя на поле игрока.</h3>
 */
export type CreateHeroPlayerCardFromData = PartialBy<HeroPlayerCard,
    | `type`
    | `rank`
    | `points`
>;
// HeroPlayerCard End
// Hero Cards End

// Special Cards Start
/**
 * <h3>Типы данных для ключей перечислений названий особых карт.</h3>
 */
export type SpecialCardNamesKeyof = Keyof<typeof SpecialCardNames>;

// SpecialCard Start
/**
 * <h3>Конфиг всех особых карт по каждой эпохе.</h3>
 */
export type SpecialCardsConfig = Readonly<Record<Keyof<typeof SpecialCardNames>, SpecialCardData>>;

/**
 * <h3>Данные особой карты.</h3>
 */
export type SpecialCardData = PartialBy<Omit<SpecialCard, `type`>, `points`>;

type SpecialCardPoints = null;

/**
 * <h3>Особая карта.</h3>
 */
export interface SpecialCard extends PlayerSuitableNullableCardInfo<SpecialRank> {
    readonly type: CardRusNames.SpecialCard;
    readonly name: SpecialCardNames;
    readonly points: SpecialCardPoints;
}

/**
* <h3>Создание особой карты.</h3>
*/
export type CreateSpecialCardFromData = Omit<PartialBy<SpecialCard, `type`>,
    | `rank`
    | `points`
>
    & Omit<PlayerSuitableNullableCanBeUndefCardInfo<SpecialRank>, `placedSuit`>
    & {
        readonly points: CanBeUndef<SpecialCard[`points`]>;
    }
    ;
// SpecialCard End
// Special Cards End

// MultiSuit Cards Start
/**
 * <h3>Типы данных для ключей перечислений названий мультифракционных карт.</h3>
 */
export type MultiSuitCardNamesKeyof = Keyof<typeof MultiSuitCardNames>;

// MultiSuitPlayerCard Start
/**
 * <h3>Особая карта на поле игрока.</h3>
 */
export interface SpecialPlayerCard extends Pick<SpecialCard,
    | `name`
    | `points`
>,
    BasicSuitableNonNullableCardInfo<SpecialRank> {
    readonly type: CardRusNames.SpecialPlayerCard;
}

/**
 * <h3>Создание особой карты на поле игрока.</h3>
 */
export type CreateSpecialPlayerCardFromData = PartialBy<SpecialPlayerCard,
    | `type`
    | `rank`
    | `points`
>;
// MultiSuitPlayerCard End

// MultiSuitCard Start
/**
 * <h3Конфиг всех мультифракционных карт по каждой эпохе.</h3>
 */
export type MultiSuitCardsConfig = Readonly<Record<Keyof<typeof MultiSuitCardNames>, MultiSuitCardData>>;

/**
 * <h3>Данные мультифракционной карты.</h3>
 */
export type MultiSuitCardData = Pick<MultiSuitCard, `name`> & ExpansionCardInfo;

type MultiSuitCardPoints = 0;

/**
 * <h3>Мультифракционная карта.</h3>
 */
export interface MultiSuitCard extends PlayerSuitableNullableCardInfo<MultiSuitRank> {
    readonly name: MultiSuitCardNames;
    points: CanBeNull<MultiSuitCardPoints>;
    readonly type: CardRusNames.MultiSuitCard;
}

/**
* <h3>Создание мультифракционной карты.</h3>
*/
export type CreateMultiSuitCardFromData = PartialBy<MultiSuitCard,
    | `type`
    | `playerSuit`
    | `rank`
    | `points`
>;
// MultiSuitCard End

// MultiSuitPlayerCard Start
/**
 * <h3>Мультифракционная карта на поле игрока.</h3>
 */
export interface MultiSuitPlayerCard extends Pick<MultiSuitCard,
    | `name`
    | `points`
>,
    BasicSuitableNonNullableCardInfo<MultiSuitRank> {
    readonly type: CardRusNames.MultiSuitPlayerCard;
}

/**
 * <h3>Создание мультифракционной карты на поле игрока.</h3>
 */
export type CreateMultiSuitPlayerCardFromData = PartialBy<MultiSuitPlayerCard,
    | `type`
    | `rank`
    | `points`
>;
// MultiSuitPlayerCard End
// MultiSuit Cards End

// Camp Cards Start
/**
 * <h3>Объединение данных для всех карт лагеря.</h3>
 */
export type AllCampCard =
    | CampDeckCard
    | ArtefactPlayerCard
    | MercenaryPlayerCard
    ;

/**
 * <h3>Объединение данных для карт в лагере.</h3>
 */
export type CampCard = CanBeNull<CampDeckCard>;

/**
 * <h3>Объединение данных для карт колоды лагеря.</h3>
 */
export type CampDeckCard =
    | ArtefactCard
    | MercenaryCard
    ;

/**
 * <h3>Объединение данных для карт колоды лагеря в командной зоне игрока.</h3>
 */
export type CampCreatureCommandZoneCard = CampDeckCard;

/**
 * <h3>Массив данных всех карт в лагере.</h3>
 */
export type CampCardArray = [
    CampCard,
    CampCard,
    CampCard,
    CampCard,
    CampCard,
];

export type CampCardArrayIndex = IndexOf<CampCardArray>;

// Artefact Cards Start
/**
 * <h3>Типы данных для ключей перечислений названий артефактов.</h3>
 */
export type ArtefactNamesKeyof = Keyof<typeof ArtefactNames>;

// ArtefactCard Start
/**
 * <h3>Конфиг всех карт артефактов по каждой эпохе.</h3>
 */
export type ArtefactConfig = Readonly<Record<Keyof<typeof ArtefactNames>, ArtefactCardData>>;

/**
 * <h3>Данные карты артефакта.</h3>
 */
export interface ArtefactCardData extends TierInfo, PartialBy<Omit<ArtefactCard,
    | `type`
    | `path`
>,
    | `playerSuit`
    | `points`
    | `rank`
    | `actions`
    | `buff`
    | `stack`
    | `validators`
> {
    readonly scoringRule: Action<ArtefactScoringFunctionNames, ArtefactScoringArgsCanBeOptional>;
}

type ArtefactCardPoints = 13;

/**
 * <h3>Карта артефакта.</h3>
 */
export interface ArtefactCard extends PlayerSuitableNullableCardInfo<ArtefactRank>, PathCardInfo,
    AutoActionCardInfo, StackCardInfo {
    readonly buff: CanBeUndef<ArtefactBuff>;
    readonly description: ArtefactDescriptionNames;
    readonly name: ArtefactNames;
    readonly type: CardRusNames.ArtefactCard;
    readonly points: CanBeNull<ArtefactCardPoints>;
}

/**
 * <h3>Создание карты артефакта.</h3>
 */
export type CreateArtefactCardFromData = Omit<PartialBy<ArtefactCard, `type`>,
    | `playerSuit`
    | `rank`
    | `points`
>
    & PlayerSuitableNullableCanBeUndefCardInfo<ArtefactRank>
    & {
        readonly points: CanBeUndef<ArtefactCard[`points`]>;
    }
    ;
// ArtefactCard End

// ArtefactPlayerCard Start
/**
 * <h3>Карта артефакта на поле игрока.</h3>
 */
export interface ArtefactPlayerCard extends Pick<ArtefactCard,
    | `name`
    | `points`
>,
    BasicSuitableNonNullableCardInfo<ArtefactRank>, PathCardInfo {
    readonly description: ArtefactDescriptionNames;
    readonly type: CardRusNames.ArtefactPlayerCard;
}

/**
 * <h3>Создание карты артефакта на поле игрока.</h3>
 */
export type CreateArtefactPlayerCardFromData = PartialBy<ArtefactPlayerCard,
    | `type`
    | `rank`
    | `points`
>;
// ArtefactPlayerCard End
// Artefact Cards End

// MercenaryCard Start
/**
 * <h3>Конфиг всех карт наёмников по каждой эпохе.</h3>
 */
export type MercenariesConfigArray = readonly [
    MercenariesConfigTier0,
    MercenariesConfigTier1,
];

export type MercenariesConfigIndex = IndexOf<MercenariesConfigArray>;

/**
 * <h3>Данные конфига карт наёмников 1 эпохи.</h3>
 */
export type MercenariesConfigTier0 = readonly [
    MercenaryData,
    MercenaryData,
    MercenaryData,
    MercenaryData,
    MercenaryData,
    MercenaryData,
];

/**
 * <h3>Данные конфига карт наёмников 2 эпохи.</h3>
 */
export type MercenariesConfigTier1 = readonly [
    MercenaryData,
    MercenaryData,
    MercenaryData,
    MercenaryData,
    MercenaryData,
    MercenaryData,
];

/**
* <h3>Объединение данных конфигов карт наёмников каждой конкретной эпохи.</h3>
*/
export type MercenariesConfig =
    | MercenariesConfigTier0
    | MercenariesConfigTier1
    ;

/**
 * <h3>Данные для создания карты наёмника.</h3>
 */
export type MercenaryData = Partial<SuitProperty<Variant<RankVariantsNames.MercenaryRank>>>;

type MercenaryCardPoints =
    | 1
    | 6
    | 8
    | 9
    | 11
    ;

/**
 * <h3>Карта наёмника.</h3>
 */
export interface MercenaryCard extends PlayerSuitableNullableCardInfo<MercenaryRank>, PathCardInfo {
    // TODO Rework all cards name in Enums
    readonly name: string;
    readonly type: CardRusNames.MercenaryCard;
    readonly variants: MercenaryData;
    points: CanBeNull<MercenaryCardPoints>;
}

/**
 * <h3>Создание карты наёмника.</h3>
 */
export type CreateMercenaryCardFromData = PartialBy<MercenaryCard,
    | `type`
    | `playerSuit`
    | `points`
    | `rank`
>;
// MercenaryCard End

// MercenaryPlayerCard Start
/**
 * <h3>Карты наёмника на поле игрока.</h3>
 */
export interface MercenaryPlayerCard extends Variant<RankVariantsNames.MercenaryRank>, PathCardInfo {
    // TODO Rework all cards name in Enums
    readonly name: string;
    readonly type: CardRusNames.MercenaryPlayerCard;
}

/**
 * <h3>Создание карты наёмника на поле игрока.</h3>
 */
export type CreateMercenaryPlayerCardFromData = PartialBy<MercenaryPlayerCard,
    | `type`
    | `rank`
    | `points`
>;
// MercenaryPlayerCard End
// Camp Cards End

// MythologicalCreature Cards Start
/**
 * <h3>Объединение данных для всех карт колоды мифических существ.</h3>
 */
export type MythologicalCreatureCard =
    | GodCard
    | GiantCard
    | ValkyryCard
    | MythicalAnimalCard
    ;

/**
 * <h3>Объединение данных для карт мифических существ в командной зоне игрока.</h3>
 */
export type MythologicalCreatureCommandZoneCard =
    | GodCard
    | GiantCard
    | ValkyryCard
    ;

/**
 * <h3>Данные всех колод карт мифических существ.</h3>
 */
export type MythologicalCreatureDecks = readonly [
    MythologicalCreatureCard[],
    MythologicalCreatureCard[],
];

/**
 * <h3>Типы данных для id главной стратегии соло бота Андвари.</h3>
 */
export type GeneralStrategyForSoloBotAndvariId =
    | 0
    | 1
    | 2
    ;

/**
 * <h3>Типы данных для id резервной стратегии соло бота Андвари.</h3>
 */
export type ReserveStrategyForSoloBotAndvariId =
    | 1
    | 2
    | 3
    | 4
    ;

export type MythologicalCreatureDeckForSkymirCardId =
    | 0
    | 1
    | 2
    | 3
    | 4
    ;

/**
 * <h3>Массив всех карт мифических существ для выбора по способности карты Skymir.</h3>
 */
export type MythologicalCreatureCardsForGiantSkymirArray =
    | []
    | [
        MythologicalCreatureCard,
    ]
    | [
        MythologicalCreatureCard,
        MythologicalCreatureCard,
    ]
    | [
        MythologicalCreatureCard,
        MythologicalCreatureCard,
        MythologicalCreatureCard,
    ]
    | [
        MythologicalCreatureCard,
        MythologicalCreatureCard,
        MythologicalCreatureCard,
        MythologicalCreatureCard,
    ]
    | [
        MythologicalCreatureCard,
        MythologicalCreatureCard,
        MythologicalCreatureCard,
        MythologicalCreatureCard,
        MythologicalCreatureCard,
    ];

/**
* <h3>Объединение всех имён для карт мифологических существ.</h3>
*/
export type MythologicalCreatureName =
    | GiantNames
    | GodNames
    | MythicalAnimalNames
    | ValkyryNames
    ;

// Giant Cards Start
/**
 * <h3>Типы данных для ключей перечислений названий гигантов.</h3>
 */
export type GiantNamesKeyof = Keyof<typeof GiantNames>;

// Giant Start
/**
 * <h3>Конфиг всех карт гигантов по каждой эпохе.</h3>
 */
export type GiantConfig = Readonly<Record<Keyof<typeof GiantNames>, GiantData>>;

/**
 * <h3>Данные карты гиганта.</h3>
 */
export interface GiantData extends PartialBy<Omit<GiantCard,
    | `type`
    | `capturedCard`
    | `isActivated`
>,
    `actions`> {
    readonly scoringRule: Action<GiantScoringFunctionNames, GiantScoringArgsCanBeOptional>;
}

/**
 * <h3>Карта гиганта.</h3>
 */
export interface GiantCard extends Pick<AutoActionCardInfo, `actions`>, ActivatedCardInfo {
    readonly buff: GiantBuff;
    capturedCard: CanBeNull<DwarfCard>;
    readonly description: GiantDescriptionNames;
    readonly name: GiantNames;
    readonly placedSuit: SuitNames;
    readonly type: CardRusNames.GiantCard;
}

/**
 * <h3>Создание карты гиганта.</h3>
 */
export type CreateGiantCardFromData = PartialBy<Omit<GiantCard, `capturedCard`>
    & ReadonlyBy<GiantCard, `capturedCard`>,
    | `type`
    | `capturedCard`
    | `isActivated`
>;
// Giant End
// Giant Cards End

// God Cards Start
/**
 * <h3>Типы данных для ключей перечислений названий богов.</h3>
 */
export type GodNamesKeyof = Keyof<typeof GodNames>;

// God Start
/**
 * <h3>Конфиг всех карт богов по каждой эпохе.</h3>
 */
export type GodConfig = Readonly<Record<Keyof<typeof GodNames>, GodData>>;

/**
 * <h3>Данные карты бога.</h3>
 */
export type GodData = Omit<GodCard,
    | `type`
    | `isActivated`
>;

type GodCardPoints =
    | 0
    | 8
    | 12
    | 15
    ;

/**
 * <h3>Карта бога.</h3>
 */
export interface GodCard extends ActivatedCardInfo {
    readonly buff: GodBuff;
    readonly description: GodDescriptionNames;
    readonly name: GodNames;
    readonly points: GodCardPoints;
    readonly type: CardRusNames.GodCard;
}

/**
 * <h3>Создание карты бога.</h3>
 */
export type CreateGodCardFromData = PartialBy<GodCard,
    | `type`
    | `isActivated`
>;
// God End
// God Cards End

// MythologicalCreature Start
export type MythologicalCreaturePlayersAmount =
    | 9
    | 12
    | 15
    ;
/**
 * <h3>Конфиг всех карт мифических существ.</h3>
 */
export type MythologicalCreatureConfig = Readonly<Record<NumPlayers, MythologicalCreaturePlayersAmount>>;
// MythologicalCreature End

// MythicalAnimal Cards Start
/**
 * <h3>Типы данных для ключей перечислений названий мифических животных.</h3>
 */
export type MythicalAnimalNamesKeyof = Keyof<typeof MythicalAnimalNames>;

// MythicalAnimal Start
/**
 * <h3>Конфиг всех карт мифических животных по каждой эпохе.</h3>
 */
export type MythicalAnimalConfig = Readonly<Record<Keyof<typeof MythicalAnimalNames>, MythicalAnimalData>>;

/**
 * <h3>Данные карты мистического животного.</h3>
 */
export interface MythicalAnimalData extends PartialBy<Omit<MythicalAnimalCard, `type`>,
    | `rank`
    | `points`
    | `stack`
    | `buff`
> {
    readonly scoringRule: Action<MythicalAnimalScoringFunctionNames, MythicalAnimalScoringArgsCanBeOptional>;
}

type MythicalAnimalCardPoints =
    | 2
    | 5
    | 9
    ;

/**
 * <h3>Карта мистического животного.</h3>
 */
export interface MythicalAnimalCard extends PlayerSuitableNonNullableCardInfo<MythicalAnimalRank>, StackCardInfo {
    readonly buff: CanBeUndef<MythicalAnimalBuff>;
    readonly description: MythicalAnimalDescriptionNames;
    readonly name: MythicalAnimalNames;
    readonly type: CardRusNames.MythicalAnimalCard;
    readonly points: CanBeNull<MythicalAnimalCardPoints>;
}

/**
 * <h3>Создание карты мистического животного.</h3>
 */
export type CreateMythicalAnimalCardFromData = Omit<PartialBy<MythicalAnimalCard, `type`>,
    | `rank`
    | `points`
>
    & {
        readonly points: CanBeUndef<MythicalAnimalCard[`points`]>;
        readonly rank: CanBeUndef<MythicalAnimalCard[`rank`]>;
    }
    ;
// MythicalAnimal End

// MythicalAnimalPlayerCard Start
/**
 * <h3>Карта мифического животного на поле игрока.</h3>
 */
export interface MythicalAnimalPlayerCard extends Pick<MythicalAnimalCard,
    | `name`
    | `description`
    | `points`
>,
    BasicSuitableNonNullableCardInfo<MythicalAnimalRank> {
    readonly type: CardRusNames.MythicalAnimalPlayerCard;
}

/**
 * <h3>Создание карты мифического животного на поле игрока.</h3>
 */
export type CreateMythicalAnimalPlayerCardFromData = PartialBy<MythicalAnimalPlayerCard,
    | `type`
    | `rank`
    | `points`
>;
// MythicalAnimalPlayerCard End
// MythicalAnimal Cards End

// Valkyry Cards Start
/**
 * <h3>Типы данных для ключей перечислений названий валькирий.</h3>
 */
export type ValkyryNamesKeyof = Keyof<typeof ValkyryNames>;

// Valkyry Start
/**
 * <h3>Конфиг всех карт валькирий по каждой эпохе.</h3>
 */
export type ValkyryConfig = Readonly<Record<Keyof<typeof ValkyryNames>, ValkyryData>>;

/**
 * <h3>Данные карты валькирии.</h3>
 */
export interface ValkyryData extends PartialBy<Omit<ValkyryCard,
    | `type`
    | `strengthTokenNotch`
>,
    `stack`> {
    readonly scoringRule: Action<ValkyryScoringFunctionNames>;
}

/**
 * <h3>Карта валькирии.</h3>
 */
export interface ValkyryCard extends StackCardInfo {
    readonly buff: ValkyryBuff;
    readonly description: ValkyryDescriptionNames;
    readonly name: ValkyryNames;
    strengthTokenNotch: CanBeNull<StrengthTokenNotch>;
    readonly type: CardRusNames.ValkyryCard;
}

/**
 * <h3>Создание карты валькирии.</h3>
 */
export type CreateValkyryCardFromData = PartialBy<Omit<ValkyryCard, `strengthTokenNotch`>
    & ReadonlyBy<ValkyryCard, `strengthTokenNotch`>,
    | `type`
    | `strengthTokenNotch`
>;

// StrengthToken Start
export type StrengthTokenNotch =
    | 0
    | 1
    | 2
    | 3
    | 4
    ;

/**
 * <h3>Типы данных для короткого максимального значения токена силы Валькирии.</h3>
*/
export type StrengthTokenNotchShortMax =
    | 0
    | 1
    | 2
    | 3
    ;

/**
 * <h3>Типы данных для длинного максимального значения токена силы Валькирии.</h3>
*/
export type StrengthTokenNotchLongMax =
    | 0
    | 1
    | 2
    | 3
    | 4
    ;

/**
 * <h3>Тип для подсчёта очков по положению токена силы валькирии при 4 значениях.</h3>
 */
export type StrengthTokenFourNotchPoints = readonly [
    0,
    | 0
    | 4
    | 8
    ,
    | 8
    | 16
    ,
    | 0
    | 16
    ,
];

/**
 * <h3>Тип для подсчёта очков по положению токена силы валькирии при 5 значениях.</h3>
 */
export type StrengthTokenFiveNotchPoints = readonly [
    0,
    3,
    6,
    10,
    16,
];
// StrengthToken End
// Valkyry End
// Valkyry Cards End

// MythologicalCreature Cards End

// Card Info Start
// TODO Move it into another section not `Card Info`?!
/**
 * <h3>Интерфейс для количества игроков и эпох.</h3>
 */
export interface PlayersNumberTierCardData extends TierInfo {
    readonly players: NumPlayers;
}

export type AllCardsDescriptionNames =
    | ArtefactDescriptionNames
    | HeroDescriptionNames
    | MythicalAnimalDescriptionNames
    | GodDescriptionNames
    | GiantDescriptionNames
    | ValkyryDescriptionNames
    ;

/**
 * <h3>Интерфейс для аргументов id карты у мува.</h3>
 */
interface CardId {
    readonly cardId: number;
}

/**
 * <h3>Интерфейс для данных эпохи карты.</h3>
 */
interface TierInfo {
    readonly tier: TierNames;
}

// Rank Start
// TODO is it in this `Rank` category?
/**
 * <h3>Тип для варианта карты героя.</h3>
 */
export type Variant<T extends RankVariantsNames> =
    BasicSuitableNonNullableCardInfo<T extends RankVariantsNames.MercenaryRank ? MercenaryRank
        : T extends RankVariantsNames.MultiSuitRank ? MultiSuitRank
        : T extends RankVariantsNames.HeroRank ? HeroRank
        : never>
    & {
        readonly points: T extends RankVariantsNames.MercenaryRank ? CanBeNull<MercenaryCardPoints>
        : T extends RankVariantsNames.MultiSuitRank ? CanBeNull<MultiSuitCardPoints>
        : T extends RankVariantsNames.HeroRank ? CanBeNull<HeroCardPoints>
        : never;
    }
    ;

export type RanksValueMultiplier =
    | 1
    | 2
    ;

type Rank =
    | RankVariantsNames
    | ArtefactRank
    | DwarfRank
    | HeroRank
    | MercenaryRank
    | MultiSuitRank
    | MythicalAnimalRank
    | SpecialRank
    ;

type DwarfRank = 1;

export type MultiSuitRank = 1;

type ArtefactRank = 1;

export type MercenaryRank = 1;

type SpecialRank = 2;

export type HeroRank =
    | 1
    | 2
    | 3
    ;

type MythicalAnimalRank =
    | 1
    | 2
    ;
// Rank End

/**
 * <h3>Данные карты с основными характеристиками, которые могут и не присутствовать.</h3>
 */
export interface BasicSuitableNullableCardInfo<T extends Rank> {
    readonly rank: CanBeNull<T>;
    readonly suit: CanBeNull<SuitNames>;
}

/**
 * <h3>Данные карты с основными характеристиками, которые должны присутствовать.</h3>
 */
interface BasicSuitableNonNullableCardInfo<T extends Rank> {
    readonly rank: NonNullable<BasicSuitableNullableCardInfo<T>[`rank`]>;
    readonly suit: SuitNames;
}

/**
 * <h3>Данные карты на поле игрока с основными характеристиками, которые могут и не присутствовать.</h3>
 */
interface PlayerSuitableNullableCardInfo<T extends Rank> extends Pick<BasicSuitableNullableCardInfo<T>, `rank`> {
    playerSuit: CanBeNull<SuitNames>;
    rank: BasicSuitableNullableCardInfo<T>[`rank`];
}

interface PlayerSuitableNullableCanBeUndefCardInfo<T extends Rank> {
    readonly playerSuit: CanBeUndef<PlayerSuitableNullableCardInfo<T>[`playerSuit`]>;
    readonly rank: CanBeUndef<PlayerSuitableNullableCardInfo<T>[`rank`]>;
}

/**
 * <h3>Данные карты на поле игрока с основными характеристиками, которые должны присутствовать.</h3>
 */
interface PlayerSuitableNonNullableCardInfo<T extends Rank> extends
    Pick<BasicSuitableNonNullableCardInfo<T>, `rank`> {
    readonly playerSuit: SuitNames;
}

/**
 * <h3>Данные путей отрисовки карты.</h3>
 */
export interface PathCardInfo {
    // TODO Add to enum!?
    readonly path: string;
}

/**
 * <h3>Данные базы/дополнения игры.</h3>
 */
interface ExpansionCardInfo {
    readonly game: GameNamesKeyof;
}

/**
 * <h3>Типы данных для ключей перечислений названий базы/дополнений игры.</h3>
 */
export type GameNamesKeyof = Keyof<typeof GameNames>;

/**
 * <h3>Данные карты с возможными автоматическими действиями и возможной валидацией.</h3>
 */
interface AutoActionCardInfo {
    readonly actions: CanBeUndef<Action<AutoActionFunctionNames, AutoActionArgs>>;
    readonly validators: CanBeUndef<ValidatorsConfig>;
}

/**
 * <h3>Данные карты с переключением активации.</h3>
 */
interface ActivatedCardInfo {
    isActivated: CanBeNull<boolean>;
}

/**
 * <h3>Данные карты со стеком.</h3>
 */
interface StackCardInfo {
    readonly stack: CanBeUndef<StackCard>;
}

/**
 * <h3>Стек у карты.</h3>
 */
interface StackCard {
    readonly player?: Stack[];
    readonly soloBot?: Stack[];
    readonly soloBotAndvari?: Stack[];
}
// Card Info End

// Buff Start
/**
 * <h3>Баф карты артефакта.</h3>
 */
interface ArtefactBuff {
    readonly name: ArtefactBuffNames;
}

/**
 * <h3>Баф карты героя.</h3>
 */
interface HeroBuff {
    readonly name: HeroBuffNames;
}

/**
 * <h3>Баф карты гиганта.</h3>
 */
interface GiantBuff {
    readonly name: GiantBuffNames;
}

/**
 * <h3>Баф карты бога.</h3>
 */
interface GodBuff {
    readonly name: GodBuffNames;
}

/**
 * <h3>Баф карты мифического животного.</h3>
 */
interface MythicalAnimalBuff {
    readonly name: MythicalAnimalBuffNames;
}

/**
 * <h3>Баф карты валькирии.</h3>
 */
interface ValkyryBuff {
    readonly name: ValkyryBuffNames;
}

/**
 * <h3>Остальные бафы.</h3>
 */
interface CommonBuff {
    readonly name: CommonBuffNames;
}

export interface BasicBuff {
    readonly name: AllBuffNames;
}

export interface AddBuffToPlayerFunction {
    (
        context: Context,
        playerID: PlayerID,
        buff: CanBeUndef<Buff extends BasicBuff ? Buff : never>,
        value?: BuffValue,
    ): void;
}

/**
 * <h3>Объединение данных всех бафов.</h3>
 */
export type Buff =
    | ArtefactBuff
    | CommonBuff
    | GiantBuff
    | GodBuff
    | HeroBuff
    | MythicalAnimalBuff
    | ValkyryBuff
    ;

/**
* <h3>Объединение данных названий всех бафов.</h3>
*/
export type AllBuffNames =
    | ArtefactBuffNames
    | CommonBuffNames
    | GiantBuffNames
    | GodBuffNames
    | HeroBuffNames
    | MythicalAnimalBuffNames
    | ValkyryBuffNames
    ;

/**
* <h3>Объединение данных значений бафов.</h3>
*/
export type BuffValue =
    | SuitNames
    | true
    ;

/**
 * <h3>Виды бафов у игрока.</h3>
 */
export interface PlayerBuffs {
    readonly countBettermentAmount?: true;
    readonly countBidWinnerAmount?: true;
    readonly countDistinctionAmount?: true;
    readonly countPickedCardClassRankAmount?: true;
    readonly countPickedHeroAmount?: true;
    readonly dagdaDiscardOnlyOneCards?: true;
    readonly discardCardEndGame?: true;
    readonly endTier?: true;
    readonly everyTurn?: true;
    readonly explorerDistinctionGetSixCards?: true;
    readonly hasOneNotCountHero?: true;
    readonly getMjollnirProfit?: true;
    readonly goCamp?: true;
    readonly goCampOneTime?: true;
    readonly moveThrud?: SuitNames;
    readonly noHero?: true;
    readonly playerHasActiveGiantGymir?: true;
    readonly playerHasActiveGiantHrungnir?: true;
    readonly playerHasActiveGiantSkymir?: true;
    readonly playerHasActiveGiantSurt?: true;
    readonly playerHasActiveGiantThrivaldi?: true;
    readonly playerHasActiveGodFreyja?: true;
    readonly playerHasActiveGodFrigg?: true;
    readonly playerHasActiveGodLoki?: true;
    readonly playerHasActiveGodOdin?: true;
    readonly playerHasActiveGodThor?: true;
    readonly ratatoskFinalScoring?: true;
    readonly suitIdForMjollnir?: SuitNames;
    readonly suitIdForOlrun?: SuitNames | true;
    readonly upgradeCoin?: true;
    readonly upgradeNextCoin?: true;
}
// Buff End

// Distinction Start
/**
 * <h3>Знак отличия по фракции дворфов и его награды.</h3>
 */
interface Distinction {
    readonly awarding: Action<DistinctionAwardingFunctionNames>;
    readonly description: DistinctionDescriptionNames;
}

/**
 * <h3>Данные всех преимуществ по знакам отличия всех фракций дворфов.</h3>
 */
export type Distinctions = CanBeUndef<CanBeNull<PlayerID>>;

// TODO Check it because we have splice from this array in code! Add to all DwarfDeckCard?
/**
 * <h3>Массив всех карт для выбора преимущества по знаку отличия фракции разведчиков.</h3>
 */
export type ExplorerDistinctionCards =
    | readonly [
        DwarfDeckCard,
    ]
    | readonly [
        DwarfDeckCard,
        DwarfDeckCard,
        DwarfDeckCard,
    ]
    | readonly [
        DwarfDeckCard,
        DwarfDeckCard,
        DwarfDeckCard,
        DwarfDeckCard,
        DwarfDeckCard,
        DwarfDeckCard,
    ]
    ;

export type ExplorerDistinctionCardsLength =
    | 1
    | 3
    | 6
    ;

export type ExplorerDistinctionCardId =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    ;

export type PlayerRanksForDistinctionsArray =
    | readonly [
        number,
    ]
    | readonly [
        number,
        number,
    ]
    | readonly [
        number,
        number,
        number,
    ]
    | readonly [
        number,
        number,
        number,
        number,
    ]
    | readonly [
        number,
        number,
        number,
        number,
        number,
    ]
    ;

// TODO Rework to PlayOrder?
export type MaxCurrentSuitDistinctionPlayersArray = PlayOrder;

/**
* <h3>Данные для количества и максимального значения шевронов для получения преимущества по знаку отличия фракции дворфов.</h3>
*/
export type PlayerRanksAndMaxRanksForDistinctionsArray = readonly [
    PlayerRanksForDistinctionsArray,
    number,
];

export type DistinctionsPlayersOrderArray =
    | []
    | [
        PlayerID
    ]
    | [
        PlayerID,
        PlayerID,
    ]
    | [
        PlayerID,
        PlayerID,
        PlayerID,
    ]
    | [
        PlayerID,
        PlayerID,
        PlayerID,
        PlayerID,
    ]
    | [
        PlayerID,
        PlayerID,
        PlayerID,
        PlayerID,
        PlayerID,
    ]
    ;
// Distinction End

// Stack Start
/**
 * <h3>Интерфейс для данных стека у карт.</h3>
 */
export interface StackData {
    readonly activateGiantAbilityOrPickCard: (
        giantName: GiantNames,
        card: DwarfCard,
    ) => Stack;
    readonly activateGodAbilityOrNot: (
        godName: GodNames,
        card?: DwarfDeckCard,
    ) => Stack;
    readonly addCoinToPouch: () => Stack;
    readonly brisingamensEndGameAction: () => Stack;
    readonly chooseStrategyLevelForSoloModeAndvari: () => Stack;
    readonly chooseStrategyVariantLevelForSoloModeAndvari: () => Stack;
    readonly chooseSuitOlrun: () => Stack;
    readonly discardCardFromBoardBonfur: () => Stack;
    readonly discardCardFromBoardCrovaxTheDoppelganger: () => Stack;
    readonly discardCardFromBoardDagda: (
        pickedSuit?: SuitNames,
    ) => Stack;
    readonly discardSuitCard: (
        playerID: PlayerID,
    ) => Stack;
    readonly discardSuitCardHofud: () => Stack;
    readonly discardTavernCard: () => Stack;
    readonly enlistmentMercenaries: () => Stack;
    readonly getDifficultyLevelForSoloMode: () => Stack;
    readonly getDistinctions: () => Stack;
    readonly getHeroesForSoloMode: () => Stack;
    readonly getMjollnirProfit: () => Stack;
    // TODO Make types for priority numbers!
    readonly getMythologyCardSkymir: (
        priority?: 3,
    ) => Stack;
    readonly pickCampCardHolda: () => Stack;
    readonly pickCard: () => Stack;
    readonly pickCardSoloBot: () => Stack;
    readonly pickCardSoloBotAndvari: () => Stack;
    readonly pickConcreteCoinToUpgrade: (
        coinValue: UpgradableCoinValue,
        value: UpgradableCoinValue,
    ) => Stack;
    readonly pickDiscardCardAndumia: () => Stack;
    readonly pickDiscardCardBrisingamens: (
        priority?: 3,
    ) => Stack;
    readonly pickDistinctionCard: () => Stack;
    readonly pickDistinctionCardSoloBot: () => Stack;
    readonly pickDistinctionCardSoloBotAndvari: () => Stack;
    readonly placeMultiSuitsCards: (
        name: MultiSuitCardNames,
        pickedSuit?: SuitNames,
        priority?: 3,
    ) => Stack;
    readonly placeThrudHero: () => Stack;
    readonly placeThrudHeroSoloBot: () => Stack;
    readonly placeThrudHeroSoloBotAndvari: () => Stack;
    readonly placeTradingCoinsUline: () => Stack;
    readonly placeYludHero: () => Stack;
    readonly placeYludHeroSoloBot: () => Stack;
    readonly placeYludHeroSoloBotAndvari: () => Stack;
    readonly pickHero: (
        priority: OneOrTwo,
    ) => Stack;
    readonly pickHeroSoloBot: (
        priority: OneOrTwo,
    ) => Stack;
    readonly pickHeroSoloBotAndvari: (
        priority: OneOrTwo,
    ) => Stack;
    readonly placeEnlistmentMercenaries: (
        card: MercenaryCard,
    ) => Stack;
    readonly startAddPlusTwoValueToAllCoinsUline: (
        coinId: PlayerCoinId,
    ) => Stack;
    readonly startChooseCoinValueForVidofnirVedrfolnirUpgrade: (
        valueArray: VidofnirVedrfolnirUpgradeValue,
        coinId?: PlayerPouchCoinId,
        priority?: 3,
    ) => Stack;
    readonly startOrPassEnlistmentMercenaries: () => Stack;
    readonly upgradeCoin: (
        value: BasicUpgradeCoinValue,
    ) => Stack;
    readonly upgradeCoinSoloBot: (
        value: BasicUpgradeCoinValue,
    ) => Stack;
    readonly upgradeCoinSoloBotAndvari: (
        value: BasicUpgradeCoinValue,
    ) => Stack;
    readonly upgradeCoinVidofnirVedrfolnir: (
        value: UpgradableCoinValue,
        coinId?: PlayerPouchCoinId,
        priority?: 3,
    ) => Stack;
    readonly upgradeCoinWarriorDistinction: () => Stack;
    readonly upgradeCoinWarriorDistinctionSoloBot: () => Stack;
    readonly upgradeCoinWarriorDistinctionSoloBotAndvari: () => Stack;
}

/**
 * <h3>Интерфейс для стека действия.</h3>
 */
export interface Stack {
    readonly giantName?: GiantNames;
    readonly godName?: GodNames;
    readonly card?: CanBeUndef<StackCards>;
    readonly coinId?: CanBeUndef<PlayerCoinId>;
    readonly coinValue?: UpgradableCoinValue;
    readonly configName?: ConfigNames;
    readonly drawName?: DrawNames;
    readonly name?: StackNames;
    readonly pickedSuit?: CanBeUndef<SuitNames>;
    readonly playerID?: PlayerID;
    priority?: CanBeUndef<StackPriority>;
    readonly stageName?: ActiveStageNames;
    readonly suit?: SuitNames;
    readonly value?: UpgradableCoinValue;
    readonly valueArray?: VidofnirVedrfolnirUpgradeValue;
}

export type PlayerStack = Omit<Stack, `priority`> & RequiredBy<Stack, `priority`>;

/**
 * <h3>Типы данных для значений '1' или '2' приоритетов для стека.</h3>
 */
export type OneOrTwo =
    | 1
    | 2
    ;

type StackPriority =
    | 0
    | OneOrTwo
    | 3
    ;

/**
 * Объединение данных карт, которые могут передаваться в значения в стеке.
 */
export type StackCards =
    | MercenaryCard
    | DwarfDeckCard;

// TODO Rework to + Enlistment mercenaries names - string
/**
 * <h3>Объединение данных названий, которые могут передаваться в значения в стеке.</h3>
 */
export type StackNames =
    | HeroNames
    | MultiSuitCardNames
    | string
    ;

/**
 * <h3>Объединение данных всех карт со стеком.</h3>
 */
export type CardsHasStack =
    | HeroCard
    | ArtefactCard
    | RoyalOfferingCard
    | MythicalAnimalCard
    | ValkyryCard
    ;

/**
 * <h3>Объединение данных всех карт для валидаторов добавления в стек.</h3>
 */
export type CardsHasStackValidators =
    | HeroCard
    | ArtefactCard
    ;
// Stack End

// Priority Start
// TODO Add Priorities = ExchangeablePriorities | UnexchangeablePriorities & their values types!?
export type PriorityData = [
    Priority,
    Priority,
    Priority,
    Priority,
    Priority,
    Priority,
    Priority,
];

export type PrioritiesForPlayerNumbers =
    | [
        {
            isExchangeable: false,
            value: -1,
        },
        {
            isExchangeable: false,
            value: 0,
        },
    ]
    | [
        {
            isExchangeable: true,
            value: 4,
        },
        {
            isExchangeable: true,
            value: 5,
        },
    ]
    | [
        {
            isExchangeable: true,
            value: 3,
        },
        {
            isExchangeable: true,
            value: 4,
        },
        {
            isExchangeable: true,
            value: 5,
        },
    ]
    | [
        {
            isExchangeable: true,
            value: 2,
        },
        {
            isExchangeable: true,
            value: 3,
        },
        {
            isExchangeable: true,
            value: 4,
        },
        {
            isExchangeable: true,
            value: 5,
        },
    ]
    | [
        {
            isExchangeable: true,
            value: 1,
        },
        {
            isExchangeable: true,
            value: 2,
        },
        {
            isExchangeable: true,
            value: 3,
        },
        {
            isExchangeable: true,
            value: 4,
        },
        {
            isExchangeable: true,
            value: 5,
        },
    ]
    ;

export type RandomPriorityIndex =
    | 0
    | 1
    | 2
    | 3
    | 4
    ;

/**
 * <h3>Кристалл.</h3>
 */
export interface Priority {
    readonly isExchangeable: boolean;
    readonly value: AllPriorityValue;
}

/**
 * <h3>Создание кристалла.</h3>
 */
export type CreatePriorityFromData = PartialBy<Priority, `isExchangeable`>;

/**
 * <h3>Типы данных для конфига всех кристаллов.</h3>
 */
export type PrioritiesConfig = readonly [
    readonly Priority[],
    readonly Priority[],
    readonly Priority[],
    readonly Priority[],
    readonly Priority[],
];

type BasicPriorityValue =
    | 1
    | 2
    | 3
    | 4
    | 5
    ;

type NonExchangeablePriorityValue = 6;

type SoloBotPlayerPriorityValue =
    | -1
    | 0
    ;

type HumanPlayerPriorityValue =
    | BasicPriorityValue
    | NonExchangeablePriorityValue
    ;

export type AllPriorityValue =
    | SoloBotPlayerPriorityValue
    | HumanPlayerPriorityValue
    ;

/**
* <h3>Типы данных для количества кристаллов приоритета в игре.</h3>
*/
export type PrioritiesAmount =
    | 0
    | 1
    | 2
    | 3
    | 4
    ;
// Priority End

// Coin Start
// VidofnirVedrfolnir Coin Start
/**
 * <h3>Типы данных для базовых значений обмена монеты по артефакту 'Vidofnir Vedrfolnir'.</h3>
 */
export type BasicVidofnirVedrfolnirUpgradeValue =
    | 2
    | RoyalOfferingCardValue
    ;

/**
 * <h3>Типы данных для значений обмена монеты по артефакту 'Vidofnir Vedrfolnir' для стека.</h3>
 */
export type VidofnirVedrfolnirUpgradeValue =
    | [
        BasicVidofnirVedrfolnirUpgradeValue,
    ]
    | [
        BasicVidofnirVedrfolnirUpgradeValue,
        Exclude<BasicVidofnirVedrfolnirUpgradeValue, 5>,
    ]
    ;

export type VidofnirVedrfolnirCoinsValue =
    | 1
    | 2
    ;
// VidofnirVedrfolnir Coin End
// TODO Is All of this needed in `Coin` category?
// TODO Check and make normal numbers types AND FIX IT HERE!!!
/**
 * <h3>Типы данных для 0 | 1.</h3>
 */
export type ZeroOrOne =
    | 0
    | 1
    ;

type AllCoinNumberValues =
    | MarketCoinNumberValues
    | PlayerCoinNumberValues
    ;

export type MarketCoinNumberValues =
    | 0
    | 1
    | 2
    | 3
    ;

export type PlayerCoinNumberValues =
    | 1
    | 2
    | 3
    | 4
    | 5
    ;

export type CanBeZeroPlayerCoinNumberValues =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    ;

/**
 * <h3>Интерфейс для числовых индексов и числовых значений.</h3>
 */
export type CoinNumberValues<T extends AllCoinNumberValues> = {
    [value in AllCoinsValue]?: T;
};

export type MarketCoinsAmount =
    | 1
    | 2
    | 3
    ;

/**
 * <h3>Интерфейс опций для создания монет.</h3>
 */
export interface BuildRoyalCoinsOptions {
    readonly count: RoyalCoin[];
    readonly players: NumPlayers;
}

export type RoyalCoinsUniqueArray = [
    RoyalCoin,
    RoyalCoin,
    RoyalCoin,
    RoyalCoin,
    RoyalCoin,
    RoyalCoin,
    RoyalCoin,
    RoyalCoin,
    RoyalCoin,
    RoyalCoin,
    RoyalCoin,
    RoyalCoin,
    RoyalCoin,
    RoyalCoin,
    RoyalCoin,
    RoyalCoin,
    RoyalCoin,
    RoyalCoin,
    RoyalCoin,
    RoyalCoin,
    RoyalCoin,
];

interface CommonCoinData {
    isOpened: boolean;
}

export interface RoyalCoin extends CommonCoinData {
    readonly type: CoinRusNames.Royal;
    readonly value: RoyalCoinValue;
}

export interface InitialNotTriggerTradingCoin extends CommonCoinData {
    readonly type: CoinRusNames.InitialNotTriggerTrading;
    readonly value: InitialNotTriggerTradingCoinValue;
}

export interface InitialTriggerTradingCoin extends CommonCoinData {
    readonly type: CoinRusNames.InitialTriggerTrading;
    readonly value: InitialTriggerTradingCoinValue;
}

export interface SpecialTriggerTradingCoin extends CommonCoinData {
    readonly type: CoinRusNames.SpecialTriggerTrading;
    readonly value: SpecialTriggerTradingCoinValue;
}

export type AllInitialCoins = [
    InitialTriggerTradingCoin,
    InitialNotTriggerTradingCoin,
    InitialNotTriggerTradingCoin,
    InitialNotTriggerTradingCoin,
    InitialNotTriggerTradingCoin,
];

/**
 * <h3>Тип для создания монеты.</h3>
 */
export type CreateInitialNotTradingCoinFromData = PartialBy<Omit<InitialNotTriggerTradingCoin, `isOpened`>
    & ReadonlyBy<InitialNotTriggerTradingCoin, `isOpened`>,
    | `type`
    | `isOpened`
>;

/**
 * <h3>Создания базовой монеты, активирующей обмен монет.</h3>
 */
export type CreateInitialTradingCoinFromData = PartialBy<Omit<InitialTriggerTradingCoin, `isOpened`>
    & ReadonlyBy<InitialTriggerTradingCoin, `isOpened`>,
    | `type`
    | `isOpened`
>;

/**
 * <h3>Создание королевской монеты.</h3>
 */
export type CreateRoyalCoinFromData = PartialBy<Omit<RoyalCoin, `isOpened`> & ReadonlyBy<RoyalCoin, `isOpened`>,
    | `type`
    | `isOpened`
>;

/**
 * <h3>Создание королевской монеты.</h3>
 */
export type CreateSpecialTriggerTradingCoinFromData = PartialBy<Omit<SpecialTriggerTradingCoin, `isOpened`>
    & ReadonlyBy<SpecialTriggerTradingCoin, `isOpened`>,
    | `type`
    | `isOpened`
>;

export type AllInitialTradingCoinConfig = [
    InitialTradingCoinConfig,
    InitialTradingCoinConfig,
    InitialTradingCoinConfig,
    InitialTradingCoinConfig,
    InitialTradingCoinConfig,
];

/**
* <h3>Тип для конфига базовых монет.</h3>
*/
export type InitialTradingCoinConfig =
    | Pick<InitialTriggerTradingCoin, `value`>
    | Pick<InitialNotTriggerTradingCoin, `value`>;

export type InitialCoin =
    | InitialTriggerTradingCoin
    | InitialNotTriggerTradingCoin
    ;

export type TriggerTradingCoin =
    | InitialTriggerTradingCoin
    | SpecialTriggerTradingCoin
    ;

export type UpgradableCoin =
    | InitialNotTriggerTradingCoin
    | RoyalCoin
    ;

export type AllCoins =
    | TriggerTradingCoin
    | UpgradableCoin
    ;

export type AllCoinsValue =
    | InitialCoinValue
    | RoyalCoinValue
    ;

export type UpgradableCoinValue = Exclude<AllCoinsValue, 0>;

export type CoinCanBeUpgradedByValue =
    | 1
    | UpgradableCoinValue
    ;

type SpecialTriggerTradingCoinValue = 3;

export type InitialTriggerTradingCoinValue = 0;

export type InitialNotTriggerTradingCoinValue =
    | 2
    | 3
    | 4
    | 5
    ;

export type InitialCoinValue =
    | InitialTriggerTradingCoinValue
    | InitialNotTriggerTradingCoinValue
    ;

export type RoyalCoinValue =
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25
    ;

export type UpgradingCoinsArrayLength = UpgradingCoinsArray[`length`];

export type UpgradingCoinsArray =
    | readonly [
        UpgradableCoin,
    ]
    | readonly [
        UpgradableCoin,
        UpgradableCoin,
    ]
    | readonly [
        UpgradableCoin,
        UpgradableCoin,
        UpgradableCoin,
    ]
    | readonly [
        UpgradableCoin,
        UpgradableCoin,
        UpgradableCoin,
        UpgradableCoin,
    ]
    ;

export type TradingCoinsValue =
    | readonly [
        UpgradableCoinValue,
    ]
    | readonly [
        UpgradableCoinValue,
        UpgradableCoinValue,
    ]
    ;

export type TradingCoinsArrayLength =
    | 1
    | 2
    ;

export type BasicUpgradeCoinValue =
    | RoyalOfferingCardValue
    | 7
    ;

export type CoinUpgradeBuffValue =
    | 0
    | 2
    ;

export type BettermentMinMax =
    | -46
    | -45
    | -44
    | -43
    | -42
    | -41
    | -40
    | -39
    | -38
    | -37
    | -36
    | -35
    | -34
    | -33
    | -32
    | -31
    | -30
    | -29
    | -28
    | -27
    | -26
    | -25
    | -24
    | -23
    | -22
    | -21
    | -20
    | -19
    | -18
    | -17
    | -16
    | -15
    | -14
    | -13
    | -12
    | -11
    | -10
    | -9
    | -8
    | -7
    | -6
    | -5
    | -4
    | -3
    | -2
    | -1
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    ;

export type CoinUpgradePossibleMaxValue =
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25
    | 26
    | 27
    | 28
    | 29
    | 30
    | 31
    | 32
    | 33
    | 34
    | 35
    | 36
    | 37
    | 38
    | 39
    | 40
    | 41
    | 42
    | 43
    | 44
    | 45
    | 46
    | 47
    | 48
    | 49
    | 50
    | 51
    ;

export type TradingCoins =
    | readonly [
        UpgradableCoin,
    ]
    | readonly [
        UpgradableCoin,
        UpgradableCoin,
    ]
    ;

/**
 * <h3>Типы данных для конфигов монет.</h3>
 */
export type CoinConfig =
    | RoyalCoinConfig
    | InitialTradingCoinConfig
    ;

export type AllRoyalCoinConfig = readonly [
    RoyalCoinConfig,
    RoyalCoinConfig,
    RoyalCoinConfig,
    RoyalCoinConfig,
    RoyalCoinConfig,
    RoyalCoinConfig,
    RoyalCoinConfig,
    RoyalCoinConfig,
    RoyalCoinConfig,
    RoyalCoinConfig,
    RoyalCoinConfig,
    RoyalCoinConfig,
    RoyalCoinConfig,
    RoyalCoinConfig,
    RoyalCoinConfig,
    RoyalCoinConfig,
    RoyalCoinConfig,
    RoyalCoinConfig,
    RoyalCoinConfig,
    RoyalCoinConfig,
    RoyalCoinConfig,
];

/**
 * <h3>Конфиг создания королевских монет.</h3>
 */
export interface RoyalCoinConfig {
    readonly count: () => NumberPlayersValues;
    value: RoyalCoinValue;
}
// Coin End

// Player Coins Start
export type PlayerTavernCoinId =
    | 0
    | 1
    | 2
    ;

export type PlayerPouchCoinId =
    | 3
    | 4
    ;

export type PlayerCoinId =
    | PlayerTavernCoinId
    | PlayerPouchCoinId
    ;

export type CurrentPlayerCoinsScore =
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25
    | 26
    | 27
    | 28
    | 29
    | 30
    | 31
    | 32
    | 33
    | 34
    | 35
    | 36
    | 37
    | 38
    | 39
    | 40
    | 41
    | 42
    | 43
    | 44
    | 45
    | 46
    | 47
    | 48
    | 49
    | 50
    | 51
    | 52
    | 53
    | 54
    | 55
    | 56
    | 57
    | 58
    | 59
    | 60
    | 61
    | 62
    | 63
    | 64
    | 65
    | 66
    | 67
    | 68
    | 69
    | 70
    | 71
    | 72
    | 73
    | 74
    | 75
    | 76
    | 77
    | 78
    | 79
    | 80
    | 81
    | 82
    | 83
    | 84
    | 85
    | 86
    | 87
    | 88
    | 89
    | 90
    | 91
    | 92
    | 93
    | 94
    | 95
    | 96
    | 97
    ;

type CurrentPlayerMaxCoinValue = RoyalCoinValue;

export type PlayerHandCoins =
    | PublicPlayerHandCoins
    | PrivatePlayerHandCoins
    ;

export type PlayerBoardCoins =
    | PublicPlayerBoardCoins
    | PrivatePlayerBoardCoins
    ;

/**
 * <h3>Типы данных для монет на столе или в руке.</h3>
 */
export type Coin = CanBeNull<AllCoins>;

/**
 * <h3>Типы данных для закрытых монет.</h3>
 */
type ClosedCoin = {
    readonly value: undefined;
};

// PublicPlayer Coins Start
export type PlayerCoinsNumber =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    ;

export type CoinsOnPouchNumber =
    | 0
    | 1
    | 2
    ;

export type PublicPlayerBoardCoins = [
    PublicPlayerCoin,
    PublicPlayerCoin,
    PublicPlayerCoin,
    PublicPlayerCoin,
    PublicPlayerCoin,
];

export type PublicPlayerHandCoins = [
    PublicPlayerCoin,
    PublicPlayerCoin,
    PublicPlayerCoin,
    PublicPlayerCoin,
    PublicPlayerCoin,
];

export type PublicPlayerCoins =
    | PublicPlayerHandCoins
    | PublicPlayerBoardCoins
    ;

/**
 * <h3>Типы данных для публичных монет.</h3>
 */
export type PublicPlayerCoin =
    | Coin
    | ClosedCoin
    ;
// PublicPlayer Coins End

// PrivatePlayer Coins Start
export type PrivatePlayerBoardCoins = [
    Coin,
    Coin,
    Coin,
    Coin,
    Coin,
];

export type PrivatePlayerHandCoins = [
    Coin,
    Coin,
    Coin,
    Coin,
    Coin,
];
// PrivatePlayer Coins End
// Player Coins End

// Players Start
/**
 * <h3>Интерфейс для объекта; хранящего скрытые (secret) данные всех игроков.</h3>
 */
export type Players = Partial<Record<PlayerID, PrivatePlayer>>;

/**
 * <h3>Интерфейс для объекта; хранящего открытые данные всех игроков.</h3>
 */
export type PublicPlayers = Partial<Record<PlayerID, PublicPlayer>>;

export type PlayerIndex =
    | 0
    | 1
    | 2
    | 3
    | 4
    ;

// PublicPlayer Start
/**
 * <h3>Интерфейс для публичных данных игрока.</h3>
 */
export interface PublicPlayer {
    readonly boardCoins: PublicPlayerBoardCoins;
    readonly buffs: PlayerBuffs[];
    readonly campCards: CampCreatureCommandZoneCard[];
    readonly cards: SuitProperty<PlayerBoardCard[]>;
    currentCoinsScore: CurrentPlayerCoinsScore;
    currentMaxCoinValue: CurrentPlayerMaxCoinValue;
    readonly giantTokenSuits: SuitProperty<CanBeNull<boolean>>;
    readonly handCoins: PublicPlayerHandCoins;
    readonly heroes: HeroCard[];
    readonly mythologicalCreatureCards: MythologicalCreatureCommandZoneCard[];
    readonly nickname: string;
    priority: Priority;
    selectedCoin: CanBeNull<PlayerCoinId>;
    stack: PlayerStack[];
}

/**
 * <h3>Тип для создания публичных данных игрока.</h3>
 */
export type CreatePublicPlayerFromData = PartialBy<Omit<PublicPlayer,
    | `pickedCard`
    | `priority`
    | `selectedCoin`
    | `stack`
>
    & ReadonlyBy<PublicPlayer,
        | `priority`
        | `selectedCoin`
        | `stack`
    >,
    | `currentCoinsScore`
    | `currentMaxCoinValue`
    | `heroes`
    | `campCards`
    | `mythologicalCreatureCards`
    | `stack`
    | `buffs`
    | `selectedCoin`
>;
// PublicPlayer End

// PrivatePlayer Start
/**
 * <h3>Интерфейс для приватных данных игрока.</h3>
 */
export interface PrivatePlayer {
    readonly boardCoins: PrivatePlayerBoardCoins;
    handCoins: PrivatePlayerHandCoins;
}
// PrivatePlayer End
// Players Num Start
type PlayersAmount =
    | RoyalOfferingCardPlayersAmount
    | DwarfPlayersAmount
    ;

/**
 * <h3>Интерфейс для индексов эпох и числовых значений.</h3>
 */
export type NumberTierValues<T extends PlayersAmount> = {
    readonly [index in TierNames]: T;
};

/**
 * <h3>Интерфейс для индексов по количеству игроков и числовых значений.</h3>
 */
export type NumberPlayersValues = Readonly<Record<NumPlayers, MarketCoinsAmount>>;

/**
 * <h3>Типы данных для количества всех игроков.</h3>
 */
export type NumPlayers =
    | 2
    | 3
    | 4
    | 5
    ;

/**
 * <h3>Типы данных для количества всех игроков.</h3>
 */
export type NumPlayersWithBot =
    | 1
    | 2
    | 3
    | 4
    | 5
    ;
// Players Num End
// Players End

// Action Start
/**
 * <h3>Интерфейс для действия.</h3>
 */
export interface Action<TName extends ActionNames, TParams extends ActionParams = undefined> {
    readonly name: TName;
    readonly params?: TParams;
}

/**
 * <h3>Тип для названий действий.</h3>
 */
type ActionNames =
    | GiantScoringFunctionNames
    | MythicalAnimalScoringFunctionNames
    | ValkyryScoringFunctionNames
    | ArtefactScoringFunctionNames
    | HeroScoringFunctionNames
    | AutoActionFunctionNames
    | SuitScoringFunctionNames
    | DistinctionAwardingFunctionNames
    ;

/**
* <h3>Тип для аргументов действий.</h3>
*/
type ActionParams = CanBeUndef<ValkyryScoringArgs
    | HeroScoringArgsCanBeOptional
    | AutoActionArgs
    | MythologicalCreatureScoringArgsCanBeOptional
    | ArtefactScoringArgsCanBeOptional
>;

/**
 * <h3>Интерфейс для автоматических действий с параметрами.</h3>
 */
export interface AutoActionFunction {
    (
        context: Context,
        playerID: PlayerID,
        ...params: AutoActionArgs
    ): void;
}

/**
 * <h3>Типы данных для аргументов автоматических действий.</h3>
 */
export type AutoActionArgs = readonly [
    | OneOrTwo
    | UpgradableCoinValue
];

/**
 * <h3>Интерфейс для действий без параметров.</h3>
 */
export interface ActionFunctionWithoutParams {
    (
        context: Context,
        playerID: PlayerID,
    ): void;
}

/**
 * <h3>Типы данных для всех автоматических действий.</h3>
 */
export type AutoActionFunctions =
    | ActionFunctionWithoutParams
    | AutoActionFunction
    ;
// Action End

// Scoring Start
export type BasicArtefactScoring =
    | 0
    | 24
    | 28
    ;

export type BasicGiantScoring = 0;

export type BasicHeroScoring =
    | 0
    | 1
    | 4
    | 7
    | 8
    | 9
    | 10
    | 12
    | 13
    | 17
    | 25
    ;

export type BasicMythicalAnimalScoring = 0;

export type DwergBrothersScoring =
    | 0
    | 13
    | 40
    | 81
    | 108
    | 135
    ;

export type DwergBrothersScoringArray = readonly [
    0,
    13,
    40,
    81,
    108,
    135,
];

// TODO Rework common ScoringFunction interfaces!?
/**
 * <h3>Интерфейс для функций подсчёта очков по фракциям дворфов.</h3>
 */
export interface SuitScoringFunction {
    (
        ...params: SuitScoringArgs
    ): number;
}

/**
 * <h3>Интерфейс для функций подсчёта очков по артефактам.</h3>
 */
export interface ArtefactScoringFunction {
    (
        { G, ctx, ...rest }: Context,
        playerID: PlayerID,
        isFinal?: boolean,
        value?: ArtefactScoringArgsCanBeOptional,
    ): number;
}

/**
 * <h3>Интерфейс для функций подсчёта очков по героям.</h3>
 */
export interface HeroScoringFunction {
    (
        { G, ctx, ...rest }: Context,
        playerID: PlayerID,
        value?: HeroScoringArgsCanBeOptional,
    ): number;
}

/**
 * <h3>Интерфейс для функций подсчёта очков по мифическим животным.</h3>
 */
export interface MythicalAnimalScoringFunction {
    (
        { G, ctx, ...rest }: Context,
        playerID: PlayerID,
        value?: MythicalAnimalScoringArgsCanBeOptional,
    ): number;
}

/**
 * <h3>Интерфейс для функций подсчёта очков по гигантам.</h3>
 */
export interface GiantScoringFunction {
    (
        { G, ctx, ...rest }: Context,
        playerID: PlayerID,
        value?: GiantScoringArgsCanBeOptional,
    ): number;
}

/**
 * <h3>Интерфейс для функций подсчёта очков по валькириям.</h3>
 */
export interface ValkyryScoringFunction {
    (
        ...params: ValkyryScoringArgs
    ): ValkyryScoring;
}

export type MinerDistinctionsScoring =
    | 0
    | 3
    ;

export type ValkyryScoring =
    | 0
    | 3
    | 4
    | 6
    | 8
    | 10
    | 16
    ;

/**
 * <h3>Интерфейс для функций получения преимущества по фракциям дворфов.</h3>
 */
export interface DistinctionAwardingFunction {
    (
        {
            G,
            ctx,
            ...rest
        }: Context,
        playerID: PlayerID,
    ):
        | MinerDistinctionsScoring
        | RoyalCoinValue
        ;
}

/**
 * <h3>Типы данных для аргументов функций подсчёта очков.</h3>
 */
export type ValkyryScoringArgs = readonly [
    StrengthTokenNotch,
];

/**
 * <h3>Типы данных для аргументов функций подсчёта очков героев, которые могут отсутствовать.</h3>
 */
export type HeroScoringArgsCanBeOptional = BasicHeroScoring;

/**
 * <h3>Типы данных для аргументов функций подсчёта очков артефактов, которые могут отсутствовать.</h3>
 */
export type ArtefactScoringArgsCanBeOptional = BasicArtefactScoring;

/**
 * <h3>Типы данных для аргументов функций подсчёта очков гигантов, которые могут отсутствовать.</h3>
 */
export type GiantScoringArgsCanBeOptional = BasicGiantScoring;

/**
 * <h3>Типы данных для аргументов функций подсчёта очков мифических животных, которые могут отсутствовать.</h3>
 */
export type MythicalAnimalScoringArgsCanBeOptional = BasicMythicalAnimalScoring;

/**
 * <h3>Типы данных для аргументов функций подсчёта очков мифологических существ, которые могут отсутствовать.</h3>
 */
type MythologicalCreatureScoringArgsCanBeOptional =
    | GiantScoringArgsCanBeOptional
    | MythicalAnimalScoringArgsCanBeOptional
    ;

/**
 * <h3>Типы данных для аргументов функций подсчёта очков по фракциям.</h3>
 */
export type SuitScoringArgs = readonly [
    PlayerBoardCard[],
    CanBeUndef<number>?,
    boolean?,
];

export type PossibleReturnMaxCoinValue =
    | 0
    | RoyalCoinValue
    ;
// Scoring End

// Error Start
/**
 * <h3>Типы данных для аргументов ошибок.</h3>
 */
export type ErrorArgs = readonly (
    | string
    | number
)[];
// Error End

// Log Start
/**
 * <h3>Интерфейс для логирования данных.</h3>
 */
export interface LogData {
    // TODO Move to Log enums
    readonly text: string;
    readonly type: LogNames;
}
// Lod End

// CSS Styles Start
export type HandBorderedCoinCssClasses =
    | CoinCssClassNames.BorderedCoin
    | CoinCssClassNames.BorderedCoinPicked
    ;

export type SuitCssClasses =
    | `${SuitCssBGColorClassNames}`
    | `${SuitCssBGColorClassNames} ${CardWithoutSuitAndWithActionCssTDClassNames.CursorPointer}`
    ;

// TODO Move all css classes to enums!
export type DistinctionCardCssTDClasses =
    | `bg-green-500`
    | `bg-green-500 ${CardWithoutSuitAndWithActionCssTDClassNames.CursorPointer}`
    ;

export type CoinCssTDClasses =
    | `bg-yellow-300`
    | `bg-yellow-300 ${CardWithoutSuitAndWithActionCssTDClassNames.CursorPointer}`
    ;

export type CoinCssSpanClasses =
    | ``
    | `bg-market-coin`
    | `bg-coin`
    | `bg-coin ${CoinCssClassNames}`
    ;

type CardWithSuitAndActionCssTDClasses =
    | `${SuitCssBGColorClassNames}`
    | `${SuitCssBGColorClassNames} ${CardWithoutSuitAndWithActionCssTDClassNames.CursorPointer}`
    ;

export type EmptyCardCssTDClasses =
    | ``
    | `${CardWithoutSuitAndWithActionCssTDClassNames.CursorPointer}`
    | `${SuitCssBGColorClassNames} ${CardWithoutSuitAndWithActionCssTDClassNames.CursorPointer}`
    | `${SuitCssBGColorClassNames}`;

export type CardCssTDClasses =
    | ``
    | `${CardWithSuitAndActionCssTDClasses}`
    | `bg-gray-600`
    | `bg-yellow-200`
    | `${CardWithoutSuitAndWithActionCssTDClassNames.CursorPointer}`
    | `bg-gray-600 ${CardWithoutSuitAndWithActionCssTDClassNames.CursorPointer}`
    | `bg-yellow-200 ${CardWithoutSuitAndWithActionCssTDClassNames.CursorPointer}`
    ;

export type CardCssSpanClasses =
    | ``
    | `${HeroCardCssSpanClassNames}`
    | `bg-camp`
    | `bg-card`
    | `bg-royal-offering`
    | `bg-mythological-creature-inactive`
    | `bg-mythological-creature`
    ;
// CSS Style End

//Card Styles Start
/**
 * <h3>Интерфейс для отрисовки бэкграунда в стилях.</h3>
 */
export interface Background {
    readonly background: string;
}

/**
 * <h3>Интерфейс для всех стилей.</h3>
 */
export interface Styles {
    readonly Camp: () => Background;
    readonly CampBack: (
        tier: TierNames,
    ) => Background;
    readonly CampCard: (
        cardPath: PathCardInfo[`path`],
    ) => Background;
    readonly Card: (
        suit: SuitNames,
        name: CardNamesForStyles,
        points: AllDrawLikeCardPoints,
    ) => Background;
    readonly CardBack: (
        tier: TierNames,
    ) => Background;
    readonly Coin: (
        value: AllCoinsValue,
        isInitial: boolean,
    ) => Background;
    readonly CoinBack: () => Background;
    readonly Distinction: (
        distinction: SuitNames,
    ) => Background;
    readonly DistinctionsBack: () => Background;
    readonly Exchange: () => Background;
    readonly Hero: (
        heroName: HeroNames,
    ) => Background;
    readonly HeroBack: () => Background;
    readonly MythologicalCreature: (
        name: MythologicalCreatureName,
    ) => Background;
    readonly Priorities: (
        priority: Priority[`value`],
    ) => Background;
    readonly Priority: () => Background;
    readonly RoyalOffering: (
        name: RoyalOfferingCard[`name`],
    ) => Background;
    readonly Suit: (
        suit: SuitNames,
    ) => Background;
    readonly Tavern: (
        tavernId: TavernsArrayIndex,
    ) => Background;
}

// TODO Add Dwarf names to enum!
/**
 * <h3>Тип для названий карт для стилизации обычных карт на поле игрока.</h3>
 */
export type CardNamesForStyles =
    | SpecialCardNames
    | MultiSuitCardNames
    | string
    ;
// Card Styles End

// Draw Board Start
type ProfitValidatorNames =
    | CommonMoveValidatorNames
    | SubMoveValidatorNames
    | TavernsResolutionMoveValidatorNames
    | ChooseDifficultySoloModeAndvariMoveValidatorNames
    | ChooseDifficultySoloModeMoveValidatorNames
    | TroopEvaluationMoveValidatorNames
    | EnlistmentMercenariesMoveValidatorNames
    ;

export type ProfitFunction<T extends ProfitValidatorNames> = (
    {
        G,
        ctx,
        ...rest
    }: Context,
    validatorName: CanBeNull<T>,
    data?: BoardProps,
    boardCells?: JSX.Element[],
) =>
    | CanBeVoid<MoveArguments<
        T extends EnlistmentMercenariesMoveValidatorNames
        ? null
        : T extends ChooseDifficultySoloModeMoveValidatorNames
        ? AllHeroesForDifficultySoloModePossibleCardId[] | SoloGameDifficultyLevelArg[]
        : T extends TroopEvaluationMoveValidatorNames
        ? ExplorerDistinctionCardId[]
        : T extends CommonMoveValidatorNames
        ? BasicVidofnirVedrfolnirUpgradeValue[]
        : T extends ChooseDifficultySoloModeAndvariMoveValidatorNames
        ? SoloGameAndvariStrategyVariantLevel[] | SoloGameAndvariStrategyNames[]
        : T extends TavernsResolutionMoveValidatorNames
        ? MythologicalCreatureDeckForSkymirCardId[]
        : T extends ActivateGodAbilityOrNotSubMoveValidatorNames
        ? GodNames[]
        : T extends ActivateGiantAbilityOrPickCardSubMoveValidatorNames
        ? DwarfCard
        : never
    >>
    ;

export type AllCardPoints =
    | AllDrawLikeCardPoints
    | HeroCardPoints
    | ArtefactCardPoints
    | MercenaryCardPoints
    | GodCardPoints
    | MythicalAnimalCardPoints
    ;

// TODO Can rework "| string"?
/**
 * <h3>Типы данных для названий кнопок.</h3>
 */
export type ButtonName =
    | ButtonNames
    | string
    ;

/**
 * <h3>Типы данных для отрисовки количества карт в таверне.</h3>
 */
export type DrawTavernCardSize =
    | 3
    | 4
    | 5
    ;

/**
 * <h3>Интерфейс для параметров отрисовки игрового поля.</h3>
 */
export interface DrawBoardOptions {
    readonly boardCols: number;
    readonly boardRows: number;
    readonly lastBoardCol: number;
}

export type DrawCoinIdParam =
    | PlayerCoinId
    | IndexOf<RoyalCoinsUniqueArray>
    ;

export type DrawCoinAdditionalParam =
    | MarketCoinNumberValues
    | PlayerCoinId
    ;

/**
* <h3>Типы данных для отрисовки профита.</h3>
*/
export type DrawProfitOption = CanBeNull<ConfigNames>;
// Draw Board End

// Expansion Start
/**
 * <h3>Типы данных для дополнений к игре.</h3>
 */
export type Expansions = Readonly<Record<Keyof<typeof GameNames>, Expansion>>;

/**
 * <h3>Интерфейс для статуса дополнения игры.</h3>
 */
interface Expansion {
    readonly active: boolean;
}
// Expansion End

// Solo Game Start
/**
 * <h3>Типы данных для значений уровня сложности соло режима.</h3>
 */
export type SoloGameDifficultyLevel =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    ;

/**
 * <h3>Типы данных для значений аргументов уровня сложности соло режима.</h3>
 */
export type SoloGameDifficultyLevelArg = Exclude<SoloGameDifficultyLevel, 6>;

/**
 * <h3>Типы данных для вариантов значений уровня сложности стратегий соло бота Андвари для соло режима.</h3>
 */
export type SoloGameAndvariStrategyVariantLevel =
    | 0
    | 1
    | 2
    ;

/**
* <h3>Интерфейс для стратегий соло бота Андвари.</h3>
*/
export interface StrategyForSoloBotAndvari {
    readonly general: {
        0: CanBeNull<SuitNames>;
        1?: CanBeNull<SuitNames>;
        2?: CanBeNull<SuitNames>;
    },
    readonly reserve: {
        1?: CanBeNull<SuitNames>;
        2?: CanBeNull<SuitNames>;
        3: CanBeNull<SuitNames>;
        4: CanBeNull<SuitNames>;
    };
}
// Solo Bot End

// Tavern Start
/**
 * <h3>Интерфейс для конфига конкретной таверны.</h3>
 */
export interface TavernInConfig {
    readonly name: TavernNames;
}

/**
 * <h3>Типы данных для конфига всех таверн.</h3>
 */
export type TavernsConfig = readonly [
    TavernInConfig,
    TavernInConfig,
    TavernInConfig,
];

export type TavernsNum = TavernsConfig[`length`];

/**
 * <h3>Типы данных для всех таверн.</h3>
 */
export type TavernsArray = [
    TavernWithoutExpansionArray,
    TavernWithPossibleExpansionArray,
    TavernWithoutExpansionArray,
];

export type TavernsArrayIndex = IndexOf<TavernsArray>;

export type TavernPossibleCardId =
    | 0
    | 1
    | 2
    | 3
    | 4
    ;

/**
 * <h3>Типы данных для карт таверн.</h3>
 */
export type TavernCard = CanBeNull<TavernCardWithPossibleExpansion>;

type TavernWithPossibleExpansionArray =
    | [
        TavernCard,
        TavernCard,
        TavernCard,
    ]
    | [
        TavernCard,
        TavernCard,
        TavernCard,
        TavernCard,
    ]
    | [
        TavernCard,
        TavernCard,
        TavernCard,
        TavernCard,
        TavernCard,
    ]
    ;

export type TavernWithoutExpansionArray =
    | [
        CanBeNull<TavernCardWithoutExpansion>,
        CanBeNull<TavernCardWithoutExpansion>,
        CanBeNull<TavernCardWithoutExpansion>,
    ]
    | [
        CanBeNull<TavernCardWithoutExpansion>,
        CanBeNull<TavernCardWithoutExpansion>,
        CanBeNull<TavernCardWithoutExpansion>,
        CanBeNull<TavernCardWithoutExpansion>,
    ]
    | [
        CanBeNull<TavernCardWithoutExpansion>,
        CanBeNull<TavernCardWithoutExpansion>,
        CanBeNull<TavernCardWithoutExpansion>,
        CanBeNull<TavernCardWithoutExpansion>,
        CanBeNull<TavernCardWithoutExpansion>,
    ]
    ;

export type TavernAllCardsArray =
    | [
        TavernCard,
        TavernCard,
        TavernCard,
    ]
    | [
        TavernCard,
        TavernCard,
        TavernCard,
        TavernCard,
    ]
    | [
        TavernCard,
        TavernCard,
        TavernCard,
        TavernCard,
        TavernCard,
    ]
    ;

/**
 * <h3>Типы данных для карт, которые должны быть в таверне.</h3>
 */
export type TavernCardWithPossibleExpansion =
    | TavernCardWithoutExpansion
    | MythologicalCreatureCard
    ;

/**
 * <h3>Типы данных для карт, которые должны быть в таверне.</h3>
 */
type TavernCardWithoutExpansion = DwarfDeckCard;

type RefillDeckCard =
    | TavernCardWithoutExpansion
    | TavernCardWithPossibleExpansion
    ;

export type RefillDeckCardsWithExpansionArray =
    | [
        MythologicalCreatureCard,
        MythologicalCreatureCard,
        MythologicalCreatureCard,
    ]
    | [
        MythologicalCreatureCard,
        MythologicalCreatureCard,
        MythologicalCreatureCard,
        MythologicalCreatureCard,
    ]
    | [
        MythologicalCreatureCard,
        MythologicalCreatureCard,
        MythologicalCreatureCard,
        MythologicalCreatureCard,
        MythologicalCreatureCard,
    ]
    ;

export type RefillDeckCardsWithoutExpansionArray =
    | [
        TavernCardWithoutExpansion,
        TavernCardWithoutExpansion,
        TavernCardWithoutExpansion
    ]
    | [
        TavernCardWithoutExpansion,
        TavernCardWithoutExpansion,
        TavernCardWithoutExpansion,
        TavernCardWithoutExpansion,
    ]
    | [
        TavernCardWithoutExpansion,
        TavernCardWithoutExpansion,
        TavernCardWithoutExpansion,
        TavernCardWithoutExpansion,
        TavernCardWithoutExpansion,
    ]
    ;

export type RefillDeckCardsArray =
    | [
        RefillDeckCard,
        RefillDeckCard,
        RefillDeckCard,
    ]
    | [
        RefillDeckCard,
        RefillDeckCard,
        RefillDeckCard,
        RefillDeckCard,
    ]
    | [
        RefillDeckCard,
        RefillDeckCard,
        RefillDeckCard,
        RefillDeckCard,
        RefillDeckCard,
    ]
    ;

export type RemovedCardsFromTavernArray =
    | [
        TavernCard,
        TavernCard,
        TavernCard,
    ]
    | [
        TavernCard,
        TavernCard,
        TavernCard,
        TavernCard,
    ]
    | [
        TavernCard,
        TavernCard,
        TavernCard,
        TavernCard,
        TavernCard,
    ]
    ;
// Tavern End

// Discard Start
/**
 * <h3>Типы данных для карт колоды сброса.</h3>
 */
export type DiscardDeckCard =
    | DwarfDeckCard
    | DwarfPlayerCard
    ;

/**
 * <h3>Типы данных для карт колоды сброса.</h3>
 */
export type DiscardMythologicalCreatureCard =
    | MythologicalCreatureCard
    | MythicalAnimalPlayerCard
    ;

/**
 * <h3>Типы данных для сброса карт лагеря.</h3>
 */
export type DiscardCampCard =
    | CampDeckCard
    | MercenaryPlayerCard
    | ArtefactPlayerCard
    ;

/**
* <h3>Типы данных для всех карт сброса.</h3>
*/
export type AllDiscardCard =
    | DwarfCard
    | PlayerBoardCard
    | RoyalOfferingCard
    | ArtefactCard
    | MercenaryCard
    | MythologicalCreatureCard
    ;

type DiscardCardAmount = 2;

/**
 * <h3>Интерфейс для карты сброса для валидатора выбора карт.</h3>
 */
interface DiscardCard {
    readonly amount?: DiscardCardAmount;
    readonly suit: CanBeNull<SuitNames>;
}
// Discard End

// MyGameState Start
/**
 * <h3>Интерфейс для игровых пользовательских данных G.</h3>
 */
export interface MyGameState {
    readonly averageCards: SuitProperty<DwarfCard>;
    readonly botData: AIBotData;
    readonly camp: CampCardArray;
    readonly campDecksLength: SecretCampDecksLength;
    readonly campNum: CampNum;
    campPicked: boolean;
    currentTavern: TavernsArrayIndex;
    readonly debug: boolean;
    readonly decksLength: SecretDwarfDecksLength;
    readonly discardCampCardsDeck: DiscardCampCard[];
    readonly discardCardsDeck: DiscardDeckCard[];
    readonly discardMultiCards: MultiSuitPlayerCard[];
    readonly discardMythologicalCreaturesCards: DiscardMythologicalCreatureCard[];
    readonly discardSpecialCards: SpecialPlayerCard[];
    readonly distinctions: SuitProperty<Distinctions>;
    drawProfit: DrawProfitOption;
    readonly drawSize: DrawTavernCardSize;
    exchangeOrder: CanBeNull<Readonly<ExchangeOrderArray>>;
    readonly expansions: Expansions;
    explorerDistinctionCardId: CanBeNull<ExplorerDistinctionCardId>,
    explorerDistinctionCards: CanBeNull<ExplorerDistinctionCards>;
    readonly heroes: HeroCard[];
    // TODO Can refactor to HeroesForSoloGameArray!?
    readonly heroesForSoloBot: CanBeNull<HeroCard[]>;
    heroesForSoloGameDifficultyLevel: CanBeNull<HeroesForSoloGameDifficultyLevelArray>;
    heroesForSoloGameForStrategyBotAndvari: CanBeNull<HeroesForSoloGameForStrategyBotAndvariArray>;
    heroesInitialForSoloGameForBotAndvari: CanBeNull<HeroesInitialForSoloGameForBotAndvariArray>;
    readonly log: boolean;
    readonly logData: LogData[];
    readonly mode: GameModeNames;
    readonly multiCardsDeck: readonly MultiSuitCard[];
    mustDiscardTavernCardJarnglofi: CanBeNull<boolean>;
    mythologicalCreatureDeckForSkymir: CanBeNull<MythologicalCreatureCardsForGiantSkymirArray>;
    mythologicalCreatureDeckLength: SecretMythologicalCreatureDeck[`length`];
    mythologicalCreatureNotInGameDeckLength: SecretMythologicalCreatureNotInGameDeck[`length`];
    odroerirTheMythicCauldron: boolean;
    readonly odroerirTheMythicCauldronCoins: RoyalCoin[];
    readonly players: Players;
    readonly publicPlayers: PublicPlayers;
    publicPlayersOrder: PublicPlayersOrderArray;
    round: Round;
    readonly royalCoins: RoyalCoin[];
    readonly royalCoinsUnique: RoyalCoinsUniqueArray;
    readonly secret: SecretMyGameStateData;
    soloGameAndvariStrategyLevel: CanBeNull<SoloGameAndvariStrategyNames>;
    soloGameAndvariStrategyVariantLevel: CanBeNull<SoloGameAndvariStrategyVariantLevel>;
    soloGameDifficultyLevel: CanBeNull<SoloGameDifficultyLevel>;
    readonly specialCardsDeck: readonly SpecialCard[];
    strategyForSoloBotAndvari: CanBeNull<StrategyForSoloBotAndvari>;
    readonly suitsNum: SuitsNum;
    tavernCardDiscarded2Players: boolean;
    readonly taverns: TavernsArray;
    readonly tavernsNum: TavernsNum;
    tierToEnd: TierToEnd;
    totalScore: CanBeNull<TotalScoreArray>;
    winner: CanBeNull<WinnerArray>;
}

export type PublicPlayersOrderArray =
    | PlayOrder
    | DistinctionsPlayersOrderArray
    ;

// TODO Can add 0 | 1 and all x|x|x as Enum!?
/**
 * <h3>Типы данных для эпох до завершения игры.</h3>
 */
export type TierToEnd =
    | 0
    | 1
    | 2
    ;

export type Round =
    | -1
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    ;

export type SuitsNum = 5;

export type CampNum = 5;

export type TotalScoreArray =
    | [
        number,
        number,
    ]
    | [
        number,
        number,
        number,
    ]
    | [
        number,
        number,
        number,
        number,
    ]
    | [
        number,
        number,
        number,
        number,
        number,
    ]
    ;

export type MaxPlyersWithTotalScore = TotalScoreArray[`length`];

export type WinnersNum =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    ;


export type WinnerArray =
    | Permutation<PlayerID>
    | Permutation<Exclude<PlayerID, `0`>>
    | Permutation<Exclude<PlayerID, `1`>>
    | Permutation<Exclude<PlayerID, `2`>>
    | Permutation<Exclude<PlayerID, `3`>>
    | Permutation<Exclude<PlayerID, `4`>>
    | Permutation<Exclude<PlayerID,
        | `0`
        | `1`
    >>
    | Permutation<Exclude<PlayerID,
        | `0`
        | `2`
    >>
    | Permutation<Exclude<PlayerID,
        | `0`
        | `3`
    >>
    | Permutation<Exclude<PlayerID,
        | `0`
        | `4`
    >>
    | Permutation<Exclude<PlayerID,
        | `1`
        | `2`
    >>
    | Permutation<Exclude<PlayerID,
        | `1`
        | `3`
    >>
    | Permutation<Exclude<PlayerID,
        | `1`
        | `4`
    >>
    | Permutation<Exclude<PlayerID,
        | `2`
        | `3`
    >>
    | Permutation<Exclude<PlayerID,
        | `2`
        | `4`
    >>
    | Permutation<Exclude<PlayerID,
        | `3`
        | `4`
    >>
    | Permutation<Exclude<PlayerID,
        | `0`
        | `1`
        | `2`
    >>
    | Permutation<Exclude<PlayerID,
        | `0`
        | `1`
        | `3`
    >>
    | Permutation<Exclude<PlayerID,
        | `0`
        | `1`
        | `4`
    >>
    | Permutation<Exclude<PlayerID,
        | `0`
        | `2`
        | `3`
    >>
    | Permutation<Exclude<PlayerID,
        | `0`
        | `2`
        | `4`
    >>
    | Permutation<Exclude<PlayerID,
        | `0`
        | `3`
        | `4`
    >>
    | Permutation<Exclude<PlayerID,
        | `1`
        | `2`
        | `3`
    >>
    | Permutation<Exclude<PlayerID,
        | `1`
        | `2`
        | `4`
    >>
    | Permutation<Exclude<PlayerID,
        | `1`
        | `3`
        | `4`
    >>
    | Permutation<Exclude<PlayerID,
        | `2`
        | `3`
        | `4`
    >>
    | Permutation<Exclude<PlayerID,
        | `0`
        | `1`
        | `2`
        | `3`
    >>
    | Permutation<Exclude<PlayerID,
        | `0`
        | `1`
        | `2`
        | `4`
    >>
    | Permutation<Exclude<PlayerID,
        | `0`
        | `1`
        | `3`
        | `4`
    >>
    | Permutation<Exclude<PlayerID,
        | `0`
        | `2`
        | `3`
        | `4`
    >>
    | Permutation<Exclude<PlayerID,
        | `1`
        | `2`
        | `3`
        | `4`
    >>
    ;

export type ExchangeOrderArray =
    | Permutation<PlayerID>
    | Permutation<Exclude<PlayerID, `0`>>
    | Permutation<Exclude<PlayerID, `1`>>
    | Permutation<Exclude<PlayerID, `2`>>
    | Permutation<Exclude<PlayerID, `3`>>
    | Permutation<Exclude<PlayerID, `4`>>
    | Permutation<Exclude<PlayerID,
        | `0`
        | `1`
    >>
    | Permutation<Exclude<PlayerID,
        | `0`
        | `2`
    >>
    | Permutation<Exclude<PlayerID,
        | `0`
        | `3`
    >>
    | Permutation<Exclude<PlayerID,
        | `0`
        | `4`
    >>
    | Permutation<Exclude<PlayerID,
        | `1`
        | `2`
    >>
    | Permutation<Exclude<PlayerID,
        | `1`
        | `3`
    >>
    | Permutation<Exclude<PlayerID,
        | `1`
        | `4`
    >>
    | Permutation<Exclude<PlayerID,
        | `2`
        | `3`
    >>
    | Permutation<Exclude<PlayerID,
        | `2`
        | `4`
    >>
    | Permutation<Exclude<PlayerID,
        | `3`
        | `4`
    >>
    | Permutation<Exclude<PlayerID,
        | `0`
        | `1`
        | `2`
    >>
    | Permutation<Exclude<PlayerID,
        | `0`
        | `1`
        | `3`
    >>
    | Permutation<Exclude<PlayerID,
        | `0`
        | `1`
        | `4`
    >>
    | Permutation<Exclude<PlayerID,
        | `0`
        | `2`
        | `3`
    >>
    | Permutation<Exclude<PlayerID,
        | `0`
        | `2`
        | `4`
    >>
    | Permutation<Exclude<PlayerID,
        | `0`
        | `3`
        | `4`
    >>
    | Permutation<Exclude<PlayerID,
        | `1`
        | `2`
        | `3`
    >>
    | Permutation<Exclude<PlayerID,
        | `1`
        | `2`
        | `4`
    >>
    | Permutation<Exclude<PlayerID,
        | `1`
        | `3`
        | `4`
    >>
    | Permutation<Exclude<PlayerID,
        | `2`
        | `3`
        | `4`
    >>
    ;
// MyGameState End

// Resolve Start
export type ResolvedPlayersOrderArray =
    | Permutation<PlayerID>
    | Permutation<Exclude<PlayerID, `0`>>
    | Permutation<Exclude<PlayerID, `1`>>
    | Permutation<Exclude<PlayerID, `2`>>
    | Permutation<Exclude<PlayerID, `3`>>
    | Permutation<Exclude<PlayerID, `4`>>
    | Permutation<Exclude<PlayerID,
        | `0`
        | `4`
    >>
    | Permutation<Exclude<PlayerID,
        | `1`
        | `4`
    >>
    | Permutation<Exclude<PlayerID,
        | `2`
        | `4`
    >>
    | Permutation<Exclude<PlayerID,
        | `3`
        | `4`
    >>
    | Permutation<Exclude<PlayerID,
        | `1`
        | `3`
        | `4`
    >>
    | Permutation<Exclude<PlayerID,
        | `2`
        | `3`
        | `4`
    >>
    | Permutation<Exclude<PlayerID,
        | `0`
        | `2`
        | `3`
        | `4`
    >>
    | Permutation<Exclude<PlayerID,
        | `1`
        | `2`
        | `3`
        | `4`
    >>
    ;

/**
 * <h3>Интерфейс для распределения монет на столе.</h3>
 */
export interface ResolveBoardCoins {
    readonly exchangeOrder: ExchangeOrderArray;
    readonly playersOrder: ResolvedPlayersOrderArray;
}
// Resolve End

// Validator Condition Start
/**
 * <h3>Типы данных для конфига валидаторов карт.</h3>
 */
export type ValidatorsConfig = Readonly<Partial<Record<Keyof<typeof PickCardValidatorNames>, true>>>;

/**
 * <h3>Типы данных для ключей перечислений названий валидаторов выбора карт.</h3>
 */
export type PickCardValidatorNamesKeyof = Keyof<typeof PickCardValidatorNames>;

/**
 * <h3>Типы данных для ключей перечислений названий валидаторов выбора карт героев.</h3>
 */
export type PickHeroCardValidatorNamesKeyof = Keyof<typeof PickHeroCardValidatorNames>;

/**
 * <h3>Интерфейс для конфига валидаторов выбора карт.</h3>
 */
export interface PickValidatorsConfig {
    readonly conditions?: Conditions;
    readonly discardCard?: DiscardCard;
}

export type ConditionCount = 5;

/**
 * <h3>Интерфейс для условия карты героя.</h3>
 */
export interface Condition {
    readonly count: ConditionCount;
    readonly suit: SuitNames;
}

/**
 * <h3>Интерфейс для условий карты героя.</h3>
 */
export interface Conditions {
    readonly suitCountMin: Condition;
}
// Validator Condition End
type SubMoveValidatorNames =
    | ActivateGiantAbilityOrPickCardSubMoveValidatorNames
    | ActivateGodAbilityOrNotSubMoveValidatorNames
    ;

export type GetValidatorStageNames =
    | ActiveStageNames
    | FakeSubStageNames
    ;

type FakeSubStageNames =
    | ActivateGiantAbilityOrPickCardSubStageNames
    | ActivateGodAbilityOrNotSubStageNames
    ;

/**
 * Тип для всех активных стадий игры.
 */
export type ActiveStageNames =
    | ChooseDifficultySoloModeStageNames
    | EnlistmentMercenariesStageNames
    | TroopEvaluationStageNames
    | TavernsResolutionStageNames
    | AllCommonWithBotsStageNames
    | StageWithSubStageNames
    ;

type AllCommonWithBotsStageNames =
    | CommonStageNames
    | SoloBotCommonStageNames
    | SoloBotCommonCoinUpgradeStageNames
    | SoloBotAndvariCommonStageNames
    ;

/**
* Тип для всех стадий с суб стадиями игры.
*/
type StageWithSubStageNames = TavernsResolutionWithSubStageNames;

/**
* Тип для всех стадий без суб стадий игры.
*/
type StageWithoutSubStageNames =
    | DefaultStageNames
    | ActiveStageNames
    ;

/**
* Тип для всех стадий игры.
*/
export type StageNames =
    | StageWithoutSubStageNames
    | StageWithSubStageNames
    ;

/**
* Тип для всех дефолтных стадий игры.
*/
type DefaultStageNames =
    | BidsDefaultStageNames
    | BidUlineDefaultStageNames
    | ChooseDifficultySoloModeAndvariDefaultStageNames
    | ChooseDifficultySoloModeDefaultStageNames
    | BrisingamensEndGameDefaultStageNames
    | GetMjollnirProfitDefaultStageNames
    | EnlistmentMercenariesDefaultStageNames
    | PlaceYludDefaultStageNames
    | TroopEvaluationDefaultStageNames
    | TavernsResolutionDefaultStageNames
    ;

/**
* Тип для всех стадий игры 'ChooseDifficultySoloMode'.
*/
export type ChooseDifficultySoloModeAllStageNames =
    | ChooseDifficultySoloModeDefaultStageNames
    | ChooseDifficultySoloModeStageNames
    ;

/**
* Тип для всех стадий игры 'EnlistmentMercenaries'.
*/
export type EnlistmentMercenariesAllStageNames =
    | EnlistmentMercenariesDefaultStageNames
    | EnlistmentMercenariesStageNames
    ;

/**
* Тип для всех стадий игры 'TroopEvaluation'.
*/
export type TroopEvaluationAllStageNames =
    | TroopEvaluationStageNames
    | TroopEvaluationDefaultStageNames
    ;

/**
* Тип для всех стадий игры 'TavernsResolution'.
*/
export type TavernsResolutionAllStageNames =
    | TavernsResolutionStageNames
    | TavernsResolutionDefaultStageNames
    | TavernsResolutionWithSubStageNames
    ;

// TODO Can we make it more common!?
/**
 * <h3>Интерфейс для возможных валидаторов у мувов.</h3>
 */
export type MoveBy = {
    readonly [key in PhaseNames | `default`]:
    key extends `default`
    ? null
    : key extends PhaseNames.Bids
    ? MoveByOptions<BidsDefaultStageNames, BidsMoveValidatorNames>
    : key extends PhaseNames.BidUline
    ? MoveByOptions<BidUlineDefaultStageNames, BidUlineMoveValidatorNames>
    : key extends PhaseNames.BrisingamensEndGame
    ? MoveByOptions<BrisingamensEndGameDefaultStageNames, BrisingamensEndGameMoveValidatorNames>
    : key extends PhaseNames.ChooseDifficultySoloModeAndvari
    ? MoveByOptions<ChooseDifficultySoloModeAndvariDefaultStageNames,
        ChooseDifficultySoloModeAndvariMoveValidatorNames>
    : key extends PhaseNames.ChooseDifficultySoloMode
    ? MoveByOptions<ChooseDifficultySoloModeAllStageNames, ChooseDifficultySoloModeMoveValidatorNames>
    & MoveByOptions<SoloBotCommonCoinUpgradeStageNames, SoloBotCommonCoinUpgradeMoveValidatorNames>
    : key extends PhaseNames.EnlistmentMercenaries
    ? MoveByOptions<EnlistmentMercenariesAllStageNames, EnlistmentMercenariesMoveValidatorNames>
    & MoveByOptions<CommonStageNames, CommonMoveValidatorNames>
    : key extends PhaseNames.GetMjollnirProfit
    ? MoveByOptions<GetMjollnirProfitDefaultStageNames, GetMjollnirProfitMoveValidatorNames>
    : key extends PhaseNames.PlaceYlud
    ? MoveByOptions<PlaceYludDefaultStageNames, PlaceYludMoveValidatorNames>
    & MoveByOptions<CommonStageNames, CommonMoveValidatorNames>
    & MoveByOptions<SoloBotCommonStageNames, SoloBotCommonMoveValidatorNames>
    & MoveByOptions<SoloBotCommonCoinUpgradeStageNames, SoloBotCommonCoinUpgradeMoveValidatorNames>
    & MoveByOptions<SoloBotAndvariCommonStageNames, SoloBotAndvariCommonMoveValidatorNames>
    : key extends PhaseNames.TavernsResolution
    ? MoveByOptions<TavernsResolutionAllStageNames, TavernsResolutionMoveValidatorNames>
    & MoveByOptions<CommonStageNames, CommonMoveValidatorNames>
    & MoveByOptions<SoloBotCommonStageNames, SoloBotCommonMoveValidatorNames>
    & MoveByOptions<SoloBotCommonCoinUpgradeStageNames, SoloBotCommonCoinUpgradeMoveValidatorNames>
    & MoveByOptions<SoloBotAndvariCommonStageNames, SoloBotAndvariCommonMoveValidatorNames>
    : key extends PhaseNames.TroopEvaluation
    ? MoveByOptions<TroopEvaluationAllStageNames, TroopEvaluationMoveValidatorNames>
    & MoveByOptions<CommonStageNames, CommonMoveValidatorNames>
    & MoveByOptions<SoloBotCommonStageNames, SoloBotCommonMoveValidatorNames>
    & MoveByOptions<SoloBotCommonCoinUpgradeStageNames, SoloBotCommonCoinUpgradeMoveValidatorNames>
    & MoveByOptions<SoloBotAndvariCommonStageNames, SoloBotAndvariCommonMoveValidatorNames>
    : never;
};

export type MoveByForValidator =
    | MoveBy[PhaseNames.Bids][BidsDefaultStageNames]
    | MoveBy[PhaseNames.BidUline][BidUlineDefaultStageNames]
    | MoveBy[PhaseNames.BrisingamensEndGame][BrisingamensEndGameDefaultStageNames]
    | MoveBy[PhaseNames.ChooseDifficultySoloModeAndvari][ChooseDifficultySoloModeAndvariDefaultStageNames]
    | MoveBy[PhaseNames.ChooseDifficultySoloMode][
    | ChooseDifficultySoloModeAllStageNames
    | SoloBotCommonCoinUpgradeStageNames
    ]
    | MoveBy[PhaseNames.EnlistmentMercenaries][
    | EnlistmentMercenariesAllStageNames
    | CommonStageNames
    ]
    | MoveBy[PhaseNames.GetMjollnirProfit][GetMjollnirProfitDefaultStageNames]
    | MoveBy[PhaseNames.PlaceYlud][
    | PlaceYludDefaultStageNames
    | AllCommonWithBotsStageNames
    ]
    | MoveBy[PhaseNames.TavernsResolution][
    | TavernsResolutionAllStageNames
    | AllCommonWithBotsStageNames
    ]
    | MoveBy[PhaseNames.TroopEvaluation][
    | TroopEvaluationAllStageNames
    | AllCommonWithBotsStageNames
    ]
    ;

// TODO Can we make it more common!?
/**
 * <h3>Интерфейс для возможных валидаторов у мува.</h3>
 */
export type MoveByOptions<CurrentStageNames extends StageNames,
    CurrentValidatorNames extends MoveValidatorNames> = {
        readonly [key in CurrentStageNames]: `${key}MoveValidator` extends Keyof<MoveValidators>
        ? {
            readonly [k in key as `${k}Move` extends `${MoveNames}`
            ? `${k}Move` : never]: `${k}MoveValidator` extends Keyof<MoveValidators>
            ? `${k}MoveValidator` extends `${CurrentValidatorNames}`
            ? MoveValidators[`${k}MoveValidator`] : never : never;
        } : key extends StageWithSubStageNames
        ? key extends TavernsResolutionWithSubStageNames.ActivateGiantAbilityOrPickCard
        ? MoveBySubOptions<ActivateGiantAbilityOrPickCardSubStageNames,
            ActivateGiantAbilityOrPickCardSubMoveValidatorNames>
        : key extends TavernsResolutionWithSubStageNames.ActivateGodAbilityOrNot
        ? MoveBySubOptions<ActivateGodAbilityOrNotSubStageNames, ActivateGodAbilityOrNotSubMoveValidatorNames>
        : never : never;
    };

/**
* <h3>Интерфейс для возможных суб валидаторов у мува.</h3>
*/
export type MoveBySubOptions<CurrentSubStageNames extends FakeSubStageNames,
    CurrentSubValidatorNames extends SubMoveValidatorNames> = {
        readonly [key in CurrentSubStageNames as `${key}Move` extends `${MoveNames}`
        ? `${key}Move` : never]: `${key}MoveValidator` extends Keyof<MoveValidators>
        ? `${key}MoveValidator` extends `${CurrentSubValidatorNames}`
        ? MoveValidators[`${key}MoveValidator`] : never : never;
    };

/**
* <h3>Типы данных для всех названий мувов.</h3>
*/
export type MoveNames =
    | ButtonMoveNames
    | CardMoveNames
    | EmptyCardMoveNames
    | CoinMoveNames
    | SuitMoveNames
    | AutoBotsMoveNames
    | DistinctionCardMoveNames
    ;

/**
 * <h3>Интерфейс для возможных мувов у ботов.</h3>
 */
export interface Moves {
    readonly args: Args;
    readonly move: MoveNames;
}

/**
 * <h3>Интерфейс для аргументов монет у мува.</h3>
 */
export interface MoveCoinsArguments {
    readonly coinId: PlayerCoinId;
    readonly type: CoinNames;
}

/**
 * <h3>Интерфейс для выбранного аргумента мувов с фракциями для ботов.</h3>
 */
export interface MoveSuitCardCurrentId extends CardId {
    readonly suit: SuitNames;
}

/**
 * <h3>Интерфейс для аргументов карт и id игрока у мува.</h3>
 */
export interface MoveCardsArguments {
    readonly cards: number[];
}

export type MoveValidatorNames =
    | BidUlineMoveValidatorNames
    | ChooseDifficultySoloModeMoveValidatorNames
    | ChooseDifficultySoloModeAndvariMoveValidatorNames
    | BidsMoveValidatorNames
    | TavernsResolutionMoveValidatorNames
    | EnlistmentMercenariesMoveValidatorNames
    | PlaceYludMoveValidatorNames
    | TroopEvaluationMoveValidatorNames
    | BrisingamensEndGameMoveValidatorNames
    | GetMjollnirProfitMoveValidatorNames
    | CommonMoveValidatorNames
    | SoloBotCommonMoveValidatorNames
    | SoloBotAndvariCommonMoveValidatorNames
    | SoloBotCommonCoinUpgradeMoveValidatorNames
    | SubMoveValidatorNames
    ;

/**
 * <h3>Интерфейс для валидатора мувов.</h3>
 */
export interface MoveValidator<GetRange extends MoveArguments = MoveArguments> {
    readonly getRange: (
        {
            G,
            ctx,
            ...rest
        }: Context,
        playerID: PlayerID,
    ) => GetRange;
    readonly getValue: (
        {
            G,
            ctx,
            ...rest
        }: Context,
        moveRangeData: GetRange,
        playerID: PlayerID,
    ) => MoveValidatorValue<GetRange>;
    readonly moveName: MoveNames;
    readonly validate: (
        {
            G,
            ctx,
            ...rest
        }: Context,
        playerID: PlayerID,
        id: MoveValidatorValue<MoveArguments<GetRange>>,
    ) => boolean;
}

/**
 * <h3>Интерфейс для объекта валидаторов мувов.</h3>
 */
export interface MoveValidators {
    readonly ActivateGodAbilityMoveValidator: MoveValidator<GodNames[]>;
    readonly ChooseCoinValueForHrungnirUpgradeMoveValidator: MoveValidator<MoveCoinsArguments[]>;
    readonly ChooseSuitOlrunMoveValidator: MoveValidator<SuitNames[]>;
    readonly ClickBoardCoinMoveValidator: MoveValidator<PlayerCoinId[]>;
    readonly ClickCampCardMoveValidator: MoveValidator<CampCardArrayIndex[]>;
    readonly ClickCardMoveValidator: MoveValidator<TavernPossibleCardId[]>;
    readonly ClickCardNotGiantAbilityMoveValidator: MoveValidator<DwarfCard>;
    readonly ClickCardToPickDistinctionMoveValidator: MoveValidator<ExplorerDistinctionCardId[]>;
    readonly ClickDistinctionCardMoveValidator: MoveValidator<SuitNames[]>;
    readonly ClickGiantAbilityNotCardMoveValidator: MoveValidator<DwarfCard>;
    readonly ClickHandCoinMoveValidator: MoveValidator<PlayerCoinId[]>;
    readonly ClickHandCoinUlineMoveValidator: MoveValidator<PlayerCoinId[]>;
    readonly ClickHandTradingCoinUlineMoveValidator: MoveValidator<PlayerCoinId[]>;
    readonly DiscardCardFromPlayerBoardMoveValidator: MoveValidator<Partial<SuitProperty<number[]>>>;
    readonly DiscardCard2PlayersMoveValidator: MoveValidator<TavernPossibleCardId[]>;
    // TODO Can be 0 - max mercenaries count!?
    readonly GetEnlistmentMercenariesMoveValidator: MoveValidator<number[]>;
    readonly GetMjollnirProfitMoveValidator: MoveValidator<SuitNames[]>;
    readonly GetMythologyCardMoveValidator: MoveValidator<MythologicalCreatureDeckForSkymirCardId[]>;
    readonly NotActivateGodAbilityMoveValidator: MoveValidator<GodNames[]>;
    readonly PassEnlistmentMercenariesMoveValidator: MoveValidator<null>;
    readonly PlaceEnlistmentMercenariesMoveValidator: MoveValidator<SuitNames[]>;
    readonly PlaceYludHeroMoveValidator: MoveValidator<SuitNames[]>;
    readonly StartEnlistmentMercenariesMoveValidator: MoveValidator<null>;
    // Bots
    readonly BotsPlaceAllCoinsMoveValidator: MoveValidator<PlayerCoinId[][]>;
    // Solo Bot
    readonly SoloBotClickCardMoveValidator: MoveValidator<TavernPossibleCardId[]>;
    readonly SoloBotClickCardToPickDistinctionMoveValidator: MoveValidator<ExplorerDistinctionCardId[]>;
    readonly SoloBotClickCoinToUpgradeMoveValidator: MoveValidator<MoveCoinsArguments[]>;
    readonly SoloBotClickHeroCardMoveValidator: MoveValidator<AllHeroesForSoloBotPossibleCardId[]>;
    readonly SoloBotPlaceAllCoinsMoveValidator: MoveValidator<PlayerCoinId[][]>;
    readonly SoloBotPlaceThrudHeroMoveValidator: MoveValidator<SuitNames[]>;
    readonly SoloBotPlaceYludHeroMoveValidator: MoveValidator<SuitNames[]>;
    // Solo Mode
    readonly ChooseDifficultyLevelForSoloModeMoveValidator: MoveValidator<SoloGameDifficultyLevelArg[]>;
    readonly ChooseHeroForDifficultySoloModeMoveValidator:
    MoveValidator<AllHeroesForDifficultySoloModePossibleCardId[]>;
    // Solo Mode Andvari
    readonly ChooseStrategyForSoloModeAndvariMoveValidator: MoveValidator<SoloGameAndvariStrategyNames[]>;
    readonly ChooseStrategyVariantForSoloModeAndvariMoveValidator:
    MoveValidator<SoloGameAndvariStrategyVariantLevel[]>;
    readonly SoloBotAndvariClickCardMoveValidator: MoveValidator<TavernPossibleCardId[]>;
    readonly SoloBotAndvariClickCardToPickDistinctionMoveValidator: MoveValidator<ExplorerDistinctionCardId[]>;
    readonly SoloBotAndvariClickCoinToUpgradeMoveValidator: MoveValidator<MoveCoinsArguments[]>;
    readonly SoloBotAndvariClickHeroCardMoveValidator: MoveValidator<AllHeroesForSoloBotAndvariPossibleCardId[]>;
    readonly SoloBotAndvariPlaceAllCoinsMoveValidator: MoveValidator<PlayerCoinId[][]>;
    readonly SoloBotAndvariPlaceThrudHeroMoveValidator: MoveValidator<SuitNames[]>;
    readonly SoloBotAndvariPlaceYludHeroMoveValidator: MoveValidator<SuitNames[]>;
    // start
    readonly AddCoinToPouchMoveValidator: MoveValidator<PlayerCoinId[]>;
    readonly ChooseCoinValueForVidofnirVedrfolnirUpgradeMoveValidator:
    MoveValidator<BasicVidofnirVedrfolnirUpgradeValue[]>;
    readonly ClickCampCardHoldaMoveValidator: MoveValidator<CampCardArrayIndex[]>;
    readonly ClickCoinToUpgradeMoveValidator: MoveValidator<MoveCoinsArguments[]>;
    readonly ClickHeroCardMoveValidator: MoveValidator<AllHeroesForPlayerOrSoloBotAddToPlayerBoardPossibleCardId[]>;
    readonly DiscardSuitCardFromPlayerBoardMoveValidator: MoveValidator<MoveCardsArguments>;
    readonly DiscardTopCardFromSuitMoveValidator: MoveValidator<Partial<SuitProperty<number[]>>>;
    readonly PickConcreteCoinToUpgradeMoveValidator: MoveValidator<MoveCoinsArguments[]>;
    readonly PickDiscardCardMoveValidator: MoveValidator<number[]>;
    readonly PlaceMultiSuitCardMoveValidator: MoveValidator<SuitNames[]>;
    readonly PlaceThrudHeroMoveValidator: MoveValidator<SuitNames[]>;
    // TODO Rework to generic MoveCoinsArguments<PlayerPouchCoinId>?
    readonly UpgradeCoinVidofnirVedrfolnirMoveValidator: MoveValidator<MoveCoinsArguments[]>;
    // end
}

/**
* <h3>Типы данных для аргументов id карты и id игрока у мува.</h3>
*/
export type MoveCardId = CardId;

/**
 * <h3>Типы данных для аргументов мува.</h3>
 */
export type MoveArguments<T extends MoveArgumentsArgs = MoveArgumentsArgs> =
    T extends null
    ? null
    : T extends Partial<SuitProperty<readonly number[]>>
    ? Partial<SuitProperty<number[]>>
    : T extends MoveCardsArguments
    ? MoveCardsArguments
    : T extends readonly MoveCoinsArguments[]
    ? MoveCoinsArguments[]
    : T extends readonly SuitNames[]
    ? SuitNames[]
    : T extends readonly GodNames[]
    ? GodNames[]
    : T extends readonly SoloGameAndvariStrategyNames[]
    ? SoloGameAndvariStrategyNames[]
    : T extends readonly SoloGameDifficultyLevelArg[]
    ? SoloGameDifficultyLevelArg[]
    : T extends readonly SoloGameAndvariStrategyVariantLevel[]
    ? SoloGameAndvariStrategyVariantLevel[]
    : T extends readonly PlayerCoinId[][]
    ? PlayerCoinId[][]
    : T extends readonly number[]
    ? number[]
    : T extends readonly TavernPossibleCardId[]
    ? TavernPossibleCardId[]
    : T extends readonly BasicVidofnirVedrfolnirUpgradeValue[]
    ? BasicVidofnirVedrfolnirUpgradeValue[]
    : T extends readonly AllHeroesForSoloBotPossibleCardId[]
    ? AllHeroesForSoloBotPossibleCardId[]
    : T extends readonly AllHeroesForPlayerOrSoloBotAddToPlayerBoardPossibleCardId[]
    ? AllHeroesForPlayerOrSoloBotAddToPlayerBoardPossibleCardId[]
    : T extends readonly AllHeroesForDifficultySoloModePossibleCardId[]
    ? AllHeroesForDifficultySoloModePossibleCardId[]
    : T extends readonly ExplorerDistinctionCardId[]
    ? ExplorerDistinctionCardId[]
    : T extends readonly PlayerCoinId[]
    ? PlayerCoinId[]
    : T extends readonly MythologicalCreatureDeckForSkymirCardId[]
    ? MythologicalCreatureDeckForSkymirCardId[]
    : T extends readonly CampCardArrayIndex[]
    ? CampCardArrayIndex[]
    : T extends DwarfCard
    ? DwarfCard
    : never;

// TODO Move it to MoveValidator section
/**
* <h3>Типы данных для значений для мувов.</h3>
*/
export type MoveValidatorValue<GetRange extends MoveArguments = MoveArguments> =
    GetRange extends null
    ? null
    : GetRange extends Partial<SuitProperty<readonly number[]>>
    ? MoveSuitCardCurrentId
    : GetRange extends MoveCardsArguments
    ? MoveCardId
    : GetRange extends readonly MoveCoinsArguments[]
    ? MoveCoinsArguments
    : GetRange extends readonly SuitNames[]
    ? SuitNames
    : GetRange extends readonly GodNames[]
    ? GodNames
    : GetRange extends readonly SoloGameAndvariStrategyNames[]
    ? SoloGameAndvariStrategyNames
    : GetRange extends readonly PlayerCoinId[][]
    ? PlayerCoinId[]
    : GetRange extends readonly PlayerCoinId[]
    ? PlayerCoinId
    : GetRange extends readonly SoloGameDifficultyLevelArg[]
    ? SoloGameDifficultyLevelArg
    : GetRange extends readonly SoloGameAndvariStrategyVariantLevel[]
    ? SoloGameAndvariStrategyVariantLevel
    : GetRange extends readonly BasicVidofnirVedrfolnirUpgradeValue[]
    ? BasicVidofnirVedrfolnirUpgradeValue
    : GetRange extends readonly ExplorerDistinctionCardId[]
    ? ExplorerDistinctionCardId
    : GetRange extends readonly AllHeroesForSoloBotPossibleCardId[]
    ? AllHeroesForSoloBotPossibleCardId
    : GetRange extends readonly AllHeroesForPlayerOrSoloBotAddToPlayerBoardPossibleCardId[]
    ? AllHeroesForPlayerOrSoloBotAddToPlayerBoardPossibleCardId
    : GetRange extends readonly AllHeroesForDifficultySoloModePossibleCardId[]
    ? AllHeroesForDifficultySoloModePossibleCardId
    : GetRange extends readonly MythologicalCreatureDeckForSkymirCardId[]
    ? MythologicalCreatureDeckForSkymirCardId
    : GetRange extends readonly CampCardArrayIndex[]
    ? CampCardArrayIndex
    : GetRange extends readonly number[]
    ? number
    : GetRange extends DwarfCard
    ? DwarfCard
    : never;

export type ButtonMoveArgs =
    | readonly [null]
    | readonly [GodNames]
    | readonly [SoloGameDifficultyLevelArg]
    | readonly [SoloGameAndvariStrategyVariantLevel]
    | readonly [SoloGameAndvariStrategyNames]
    ;

export type DistinctionCardMoveArgs =
    | readonly [SuitNames]
    ;

export type SuitMoveArgs =
    | readonly [SuitNames]
    ;

export type CardMoveArgs =
    | readonly [AllHeroesForDifficultySoloModePossibleCardId]
    | readonly [CampCardArrayIndex]
    // TODO Can i refactor number to type?
    | readonly [number]
    | readonly [AllHeroesForPlayerOrSoloBotAddToPlayerBoardPossibleCardId]
    | readonly [DwarfCard]
    | readonly [GodNames]
    | readonly [MythologicalCreatureDeckForSkymirCardId]
    | readonly [TavernPossibleCardId]
    | readonly [AllHeroesForSoloBotPossibleCardId]
    | readonly [AllHeroesForSoloBotAndvariPossibleCardId]
    | readonly [ExplorerDistinctionCardId]
    // TODO Can i refactor number to type?
    | readonly [SuitNames, number]
    ;

export type EmptyCardMoveArgs =
    | readonly [SuitNames]
    ;

export type CoinMoveArgs =
    | readonly [PlayerCoinId]
    | readonly [PlayerCoinId, CoinNames]
    | readonly [PlayerPouchCoinId, CoinNames]
    ;

type AutoBotsMoveArgs =
    | readonly [PlayerCoinId[]]
    ;

/**
 * <h3>Типы данных для остаточных аргументов функций/мувов.</h3>
 */
export type Args =
    | AutoBotsMoveArgs
    | ButtonMoveArgs
    | DistinctionCardMoveArgs
    | SuitMoveArgs
    | CardMoveArgs
    | EmptyCardMoveArgs
    | CoinMoveArgs
    ;

/**
* <h3>Типы данных для типов аргументов мува.</h3>
*/
type MoveArgumentsArgs = CanBeNull<
    | MoveCardsArguments
    | DwarfCard
    | Partial<SuitProperty<readonly number[]>>
    | readonly PlayerCoinId[][]
    | readonly PlayerCoinId[]
    | readonly BasicVidofnirVedrfolnirUpgradeValue[]
    | readonly TavernPossibleCardId[]
    | readonly CampCardArrayIndex[]
    | readonly SoloGameDifficultyLevelArg[]
    | readonly SoloGameAndvariStrategyVariantLevel[]
    | readonly ExplorerDistinctionCardId[]
    | readonly AllHeroesForDifficultySoloModePossibleCardId[]
    | readonly AllHeroesForSoloBotPossibleCardId[]
    | readonly MoveCoinsArguments[]
    | readonly GodNames[]
    | readonly SuitNames[]
    | readonly SoloGameAndvariStrategyNames[]
    | readonly MythologicalCreatureDeckForSkymirCardId[]
    | readonly AllHeroesForPlayerOrSoloBotAddToPlayerBoardPossibleCardId[]
    | readonly number[]
>;

export type MoveValidatorGetRangeStringArray =
    | SuitNames[]
    | GodNames[]
    | SoloGameAndvariStrategyNames[]
    ;

// players 2 | 3 = 35 | 39 players 4 = 52 players 5 = 65   +20 (55 | 59 | 72 | 85)
// players 2 | 3 = 35 | 39 players 4 = 52 players 5 = 65   +2 (37 | 41 | 54 | 67)
export type PlayoutDepth =
    | 37
    | 55
    | 41
    | 59
    | 54
    | 72
    | 67
    | 85
    ;

// My Utilities Start
/**
 * <h3>Типы данных для ключей любого объекта.</h3>
 */
export type Keyof<T> = keyof T;

/**
 * <h3>Тип для того, чтобы сделать дополнительный union тип undefined.</h3>
 */
export type CanBeUndef<T> =
    | T
    | undefined
    ;

/**
 * <h3>Тип для того, чтобы сделать дополнительный union тип void.</h3>
 */
export type CanBeVoid<T> =
    | T
    | void
    ;

/**
 * <h3>Тип для того, чтобы сделать дополнительный union тип null.</h3>
 */
export type CanBeNull<T> =
    | T
    | null
    ;

/**
 * <h3>Получение значений типов у пары [ключ, значение] при вызове Object.entries.</h3>
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ObjectEntry<T extends {}> =
    T extends object ?
    { [K in Keyof<T>]: [K, Required<T>[K]] }[Keyof<T>] extends infer E ?
    E extends [infer K extends string | number, infer V] ?
    [`${K}`, V] :
    never :
    never :
    never;

type TupleEntry<T extends readonly unknown[], I extends unknown[] = [], R = never> =
    T extends readonly [infer Head, ...infer Tail] ?
    TupleEntry<Tail, [...I, unknown], R | [`${I['length']}`, Head]> :
    R;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type Entry<T extends {}> =
    T extends readonly [unknown, ...unknown[]] ?
    TupleEntry<T> :
    T extends ReadonlyArray<infer U> ?
    [`${number}`, U] :
    ObjectEntry<T>;

type FilterUndefinedAndNullObject<T extends CanBeUndef<CanBeNull<object>>> =
    T extends undefined | null ? never : T;

/**
 * <h3>Тип для того, чтобы сделать некоторые поля объекта опциональными.</h3>
 */
type PartialBy<T extends object, K extends Keyof<T>> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * <h3>Тип для того, чтобы сделать некоторые поля объекта только для чтения.</h3>
 */
type ReadonlyBy<T extends object, K extends Keyof<T>> = Omit<T, K> & Readonly<Pick<T, K>>;

type RequiredBy<T extends object, K extends Keyof<T>> = Omit<T, K> & Required<Pick<T, K>>;

/**
 * <h3>Тип для того, чтобы чтобы получать индексы кортежей.</h3>
 */
export type IndexOf<T extends readonly unknown[], S extends number[] = []> =
    T[`length`] extends S[`length`] ? S[number] : IndexOf<T, [S[`length`], ...S]>;

type Permutation<T, C = T> = [T] extends [never]
    ? []
    : C extends infer U
    ? [U, ...Permutation<Exclude<T, U>>]
    : [];
// My Utilities End

// My Implementations Start
/**
 * <h3>Тип для `INVALID_MOVE`.</h3>
 */
export type InvalidMove = InvalidMoveNames.INVALID_MOVE;

export type GameSetupData = DefaultPluginAPIs
    & {
        ctx: Ctx;
    };

export type Context = DefaultPluginAPIs
    & {
        G: MyGameState;
        ctx: Ctx;
    }
    ;

export interface Game<SetupData = unknown> {
    name?: `Nidavellir`;
    minPlayers?: 2;
    maxPlayers?: 5;
    deltaState?: boolean;
    disableUndo?: boolean;
    seed?:
    | string
    | number
    ;
    setup?: (
        context: GameSetupData,
        setupData?: SetupData,
    ) => MyGameState;
    validateSetupData?: (
        setupData: CanBeUndef<SetupData>,
        numPlayers: NumPlayers,
    ) => CanBeUndef<string>;
    moves?: MoveMap;
    phases?: PhaseMap;
    turn?: TurnConfig;
    events?: {
        endGame?: boolean;
        endPhase?: boolean;
        endTurn?: boolean;
        setPhase?: boolean;
        endStage?: boolean;
        setStage?: boolean;
        pass?: boolean;
        setActivePlayers?: boolean;
    };
    endIf?: (
        context: Context,
    ) => unknown;
    onEnd?: (
        context: Context,
    ) => CanBeVoid<void>;
    playerView?: (
        context: {
            G: MyGameState,
            ctx: Ctx,
            playerID: CanBeNull<PlayerID>,
        },
    ) => unknown;
    plugins?: Plugin<unknown, unknown, MyGameState>[];
    ai?: {
        enumerate: (
            G: MyGameState,
            ctx: Ctx,
            playerID: PlayerID,
        ) => AiEnumerate;
    };
    processMove?: (
        state: State,
        action: ActionPayload.MakeMove,
    ) =>
        | State
        | InvalidMove
    ;
    flow?: ReturnType<typeof Flow>;
}

type PhaseMap = {
    [phase in Keyof<MoveBy> as phase extends `default` ? never : phase]: PhaseConfig<phase>;
};

interface PhaseConfig<phase extends CanBeNull<Keyof<MoveBy>> = null> {
    start?: boolean;
    next?:
    | ((context: Context) => CanBeVoid<PhaseNames>)
    | PhaseNames
    ;
    onBegin?: (
        context: Context,
    ) => CanBeVoid<MyGameState>;
    onEnd?: (
        context: Context,
    ) => CanBeVoid<MyGameState>;
    endIf?: (
        context: Context,
    ) => CanBeVoid<
        | boolean
        | {
            next: PhaseNames;
        }>,
    moves?: MoveMap<phase, Extract<Keyof<MoveBy[phase extends null ? `default` : phase]>, `${DefaultStageNames}`>>;
    turn?: TurnConfig<phase>;
    wrapped?: {
        endIf?: (
            state: State,
        ) => CanBeVoid<
            | boolean
            | {
                next: PhaseNames;
            }>,
        onBegin?: (
            state: State,
        ) => CanBeVoid<MyGameState>;
        onEnd?: (
            state: State,
        ) => CanBeVoid<MyGameState>;
        next?: (
            state: State,
        ) => CanBeVoid<PhaseNames>;
    },
}

type MoveMap<phase extends CanBeNull<Keyof<MoveBy>> = null,
    stage extends Keyof<MoveBy[phase extends null ? `default` : phase]> =
    Keyof<MoveBy[phase extends null ? `default` : phase]>> = {
        [moveName in Keyof<MoveBy[phase extends null ? `default` : phase][stage]>]:
        moveName extends `${MoveNames}` ? Move<GetMoveArgument<moveName>> : never;
    };

export type MoveContext = Context & {
    playerID: PlayerID;
};

export type MoveFn<T extends Args> =
    (
        context: MoveContext,
        ...args: T
    ) => CanBeVoid<
        | MyGameState
        | InvalidMove
    >;

type Move<T extends Args> =
    | MoveFn<T>
    | LongFormMove<T>
    ;

export type GetMoveArgument<MoveName extends `${MoveNames}`> =
    MoveName extends `${CardMoveNames.ChooseHeroForDifficultySoloModeMove}`
    ? [AllHeroesForDifficultySoloModePossibleCardId]
    : MoveName extends `${ButtonMoveNames.ChooseDifficultyLevelForSoloModeMove}`
    ? [SoloGameDifficultyLevelArg]
    : MoveName extends `${ButtonMoveNames.ChooseStrategyVariantForSoloModeAndvariMove}`
    ? [SoloGameAndvariStrategyVariantLevel]
    : MoveName extends `${ButtonMoveNames.ChooseStrategyForSoloModeAndvariMove}`
    ? [SoloGameAndvariStrategyNames]
    : MoveName extends
    | `${CoinMoveNames.ClickHandCoinMove}`
    | `${CoinMoveNames.ClickBoardCoinMove}`
    | `${CoinMoveNames.ClickHandCoinUlineMove}`
    | `${CoinMoveNames.AddCoinToPouchMove}`
    | `${CoinMoveNames.ChooseCoinValueForHrungnirUpgradeMove}`
    | `${CoinMoveNames.ClickHandTradingCoinUlineMove}`
    ? [PlayerCoinId]
    : MoveName extends
    | `${AutoBotsMoveNames.BotsPlaceAllCoinsMove}`
    | `${AutoBotsMoveNames.SoloBotPlaceAllCoinsMove}`
    | `${AutoBotsMoveNames.SoloBotAndvariPlaceAllCoinsMove}`
    ? [PlayerCoinId[]]
    : MoveName extends `${ButtonMoveNames.ChooseCoinValueForVidofnirVedrfolnirUpgradeMove}`
    ? [BasicVidofnirVedrfolnirUpgradeValue]
    : MoveName extends
    | `${CardMoveNames.DiscardTopCardFromSuitMove}`
    | `${CardMoveNames.DiscardCardFromPlayerBoardMove}`
    ? [SuitNames, number]
    : MoveName extends
    | `${CardMoveNames.ClickCampCardHoldaMove}`
    | `${CardMoveNames.ClickCampCardMove}`
    ? [CampCardArrayIndex]
    : MoveName extends
    | `${CardMoveNames.DiscardSuitCardFromPlayerBoardMove}`
    | `${CardMoveNames.PickDiscardCardMove}`
    | `${CardMoveNames.GetEnlistmentMercenariesMove}`
    ? [number]
    : MoveName extends `${CardMoveNames.ClickHeroCardMove}`
    ? [AllHeroesForPlayerOrSoloBotAddToPlayerBoardPossibleCardId]
    : MoveName extends
    | `${EmptyCardMoveNames.PlaceMultiSuitCardMove}`
    | `${EmptyCardMoveNames.PlaceThrudHeroMove}`
    | `${EmptyCardMoveNames.PlaceEnlistmentMercenariesMove}`
    | `${EmptyCardMoveNames.PlaceYludHeroMove}`
    | `${EmptyCardMoveNames.SoloBotPlaceYludHeroMove}`
    | `${EmptyCardMoveNames.SoloBotAndvariPlaceYludHeroMove}`
    | `${SuitMoveNames.GetMjollnirProfitMove}`
    | `${DistinctionCardMoveNames.ClickDistinctionCardMove}`
    | `${SuitMoveNames.ChooseSuitOlrunMove}`
    | `${EmptyCardMoveNames.SoloBotPlaceThrudHeroMove}`
    | `${EmptyCardMoveNames.SoloBotAndvariPlaceThrudHeroMove}`
    ? [SuitNames]
    : MoveName extends
    | `${CoinMoveNames.ClickCoinToUpgradeMove}`
    | `${CoinMoveNames.PickConcreteCoinToUpgradeMove}`
    | `${CoinMoveNames.SoloBotClickCoinToUpgradeMove}`
    | `${CoinMoveNames.SoloBotAndvariClickCoinToUpgradeMove}`
    ? [PlayerCoinId, CoinNames]
    : MoveName extends `${CoinMoveNames.UpgradeCoinVidofnirVedrfolnirMove}`
    ? [PlayerPouchCoinId, CoinNames]
    : MoveName extends
    | `${CardMoveNames.ClickCardNotGiantAbilityMove}`
    | `${CardMoveNames.ClickGiantAbilityNotCardMove}`
    ? [DwarfCard]
    : MoveName extends
    | `${CardMoveNames.ActivateGodAbilityMove}`
    | `${ButtonMoveNames.NotActivateGodAbilityMove}`
    ? [GodNames]
    : MoveName extends `${CardMoveNames.GetMythologyCardMove}`
    ? [MythologicalCreatureDeckForSkymirCardId]
    : MoveName extends `${CardMoveNames.SoloBotClickHeroCardMove}`
    ? [AllHeroesForSoloBotPossibleCardId]
    : MoveName extends `${CardMoveNames.SoloBotAndvariClickHeroCardMove}`
    ? [AllHeroesForSoloBotAndvariPossibleCardId]
    : MoveName extends
    | `${CardMoveNames.DiscardCard2PlayersMove}`
    | `${CardMoveNames.ClickCardMove}`
    | `${CardMoveNames.SoloBotClickCardMove}`
    | `${CardMoveNames.SoloBotAndvariClickCardMove}`
    ? [TavernPossibleCardId]
    : MoveName extends
    | `${ButtonMoveNames.StartEnlistmentMercenariesMove}`
    | `${ButtonMoveNames.PassEnlistmentMercenariesMove}`
    ? [null]
    : MoveName extends
    | `${CardMoveNames.ClickCardToPickDistinctionMove}`
    | `${CardMoveNames.SoloBotClickCardToPickDistinctionMove}`
    | `${CardMoveNames.SoloBotAndvariClickCardToPickDistinctionMove}`
    ? [ExplorerDistinctionCardId]
    : never
    ;

interface LongFormMove<T extends Args> {
    move: MoveFn<T>;
    redact?:
    | boolean
    | ((context: {
        G: MyGameState;
        ctx: Ctx;
    }) => boolean);
    noLimit?: boolean;
    client?: boolean;
    undoable?:
    | boolean
    | ((context: {
        G: MyGameState;
        ctx: Ctx;
    }) => boolean);
    ignoreStaleStateID?: boolean;
}

export type ActivePlayersArgValue = Partial<Record<PlayerID, StageArg>>;

export type ActivePlayersArg =
    | PublicPlayersOrderArray
    | {
        currentPlayer?: StageArg;
        others?: StageArg;
        all?: StageArg;
        // TODO FIX ME!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // value?: ActivePlayersArgValue;
        minMoves?: number;
        maxMoves?: number;
        /** @deprecated Use `minMoves` and `maxMoves` instead. */
        moveLimit?: number;
        revert?: boolean;
        next?: ActivePlayersArg;
    };

export interface TurnOrderConfig {
    first: (context: Context) => PlayOrderPos;
    next: (context: Context) => CanBeUndef<PlayOrderPos>;
    playOrder?: (context: Context) => PublicPlayersOrderArray;
}

interface TurnConfig<phase extends CanBeNull<Keyof<MoveBy>> = null> {
    activePlayers?: ActivePlayersArg;
    minMoves?: number;
    maxMoves?: number;
    /** @deprecated Use`minMoves` and `maxMoves` instead. */
    moveLimit?: number;
    onBegin?: (
        context: Context,
    ) => CanBeVoid<MyGameState>;
    onEnd?: (
        context: Context,
    ) => CanBeVoid<MyGameState>;
    endIf?: (
        context: Context,
    ) => CanBeVoid<
        | boolean
        | {
            next: PlayerID;
        }>,
    onMove?: (
        context: Context,
    ) => CanBeVoid<MyGameState>;
    stages?: StageMap<phase>;
    order?: TurnOrderConfig;
    wrapped?: {
        endIf?: (
            state: State,
        ) => CanBeVoid<
            | boolean
            | {
                next: PlayerID;
            }>;
        onBegin?: (
            state: State,
        ) => CanBeVoid<MyGameState>;
        onEnd?: (
            state: State,
        ) => CanBeVoid<MyGameState>;
        onMove?: (
            state:
                State
                & {
                    playerID: PlayerID;
                }) => CanBeVoid<MyGameState>;
    };
}

type StageMap<phase extends CanBeNull<Keyof<MoveBy>>> = {
    [key in Keyof<MoveBy[phase extends null ? `default` : phase]> as
    key extends `${DefaultStageNames}` ? never : key]: StageConfig<key, phase>;
};

interface StageConfig<stage extends Keyof<MoveBy[phase extends null ? `default` : phase]>,
    phase extends CanBeNull<Keyof<MoveBy>> = null> {
    moves?: MoveMap<phase, stage>;
    next?: PhaseNames;
}

export type PlayOrderPos = 0 | 1 | 2 | 3 | 4;

type PlayOrder =
    | []
    | Permutation<PlayerID>
    | Permutation<Exclude<PlayerID, `0`>>
    | Permutation<Exclude<PlayerID, `1`>>
    | Permutation<Exclude<PlayerID, `2`>>
    | Permutation<Exclude<PlayerID, `3`>>
    | Permutation<Exclude<PlayerID, `4`>>
    | Permutation<Exclude<PlayerID,
        | `0`
        | `1`
    >>
    | Permutation<Exclude<PlayerID,
        | `0`
        | `2`
    >>
    | Permutation<Exclude<PlayerID,
        | `0`
        | `3`
    >>
    | Permutation<Exclude<PlayerID,
        | `0`
        | `4`
    >>
    | Permutation<Exclude<PlayerID,
        | `1`
        | `2`
    >>
    | Permutation<Exclude<PlayerID,
        | `1`
        | `3`
    >>
    | Permutation<Exclude<PlayerID,
        | `1`
        | `4`
    >>
    | Permutation<Exclude<PlayerID,
        | `2`
        | `3`
    >>
    | Permutation<Exclude<PlayerID,
        | `2`
        | `4`
    >>
    | Permutation<Exclude<PlayerID,
        | `3`
        | `4`
    >>
    | Permutation<Exclude<PlayerID,
        | `0`
        | `1`
        | `2`
    >>
    | Permutation<Exclude<PlayerID,
        | `0`
        | `1`
        | `3`
    >>
    | Permutation<Exclude<PlayerID,
        | `0`
        | `1`
        | `4`
    >>
    | Permutation<Exclude<PlayerID,
        | `0`
        | `2`
        | `3`
    >>
    | Permutation<Exclude<PlayerID,
        | `0`
        | `2`
        | `4`
    >>
    | Permutation<Exclude<PlayerID,
        | `0`
        | `3`
        | `4`
    >>
    | Permutation<Exclude<PlayerID,
        | `1`
        | `2`
        | `3`
    >>
    | Permutation<Exclude<PlayerID,
        | `1`
        | `2`
        | `4`
    >>
    | Permutation<Exclude<PlayerID,
        | `1`
        | `3`
        | `4`
    >>
    | Permutation<Exclude<PlayerID,
        | `2`
        | `3`
        | `4`
    >>
    | Permutation<Exclude<PlayerID,
        | `0`
        | `1`
        | `2`
        | `3`
    >>
    | Permutation<Exclude<PlayerID,
        | `0`
        | `1`
        | `2`
        | `4`
    >>
    | Permutation<Exclude<PlayerID,
        | `0`
        | `1`
        | `3`
        | `4`
    >>
    | Permutation<Exclude<PlayerID,
        | `0`
        | `2`
        | `3`
        | `4`
    >>
    | Permutation<Exclude<PlayerID,
        | `1`
        | `2`
        | `3`
        | `4`
    >>
    ;

export interface Ctx {
    numPlayers: NumPlayers;
    playOrder: PublicPlayersOrderArray;
    playOrderPos: PlayOrderPos;
    activePlayers: CanBeNull<ActivePlayers>;
    currentPlayer: PlayerID;
    numMoves?: number;
    gameover?: boolean;
    // TODO We know amount of turns for num players and expansions, add type!
    turn: number;
    phase: PhaseNames;
    _activePlayersMinMoves?: Record<PlayerID, number>;
    _activePlayersMaxMoves?: Record<PlayerID, number>;
    _activePlayersNumMoves?: Record<PlayerID, number>;
    _prevActivePlayers?: {
        activePlayers: CanBeNull<ActivePlayers>;
        _activePlayersMinMoves?: Record<PlayerID, number>;
        _activePlayersMaxMoves?: Record<PlayerID, number>;
        _activePlayersNumMoves?: Record<PlayerID, number>;
    }[],
    _nextActivePlayers?: ActivePlayersArg;
    _random?: {
        seed:
        | string
        | number
        ;
    };
}

type ActivePlayers = Partial<Record<PlayerID, ActiveStageNames>>;

export type PlayerID =
    | `0`
    | `1`
    | `2`
    | `3`
    | `4`
    ;

export type StageArg =
    | ActiveStageNames
    | {
        stage?: ActiveStageNames;
        /** @deprecated Use `minMoves` and `maxMoves` instead. */
        moveLimit?: number;
        minMoves?: number;
        maxMoves?: number;
    };
// My Implementations End
