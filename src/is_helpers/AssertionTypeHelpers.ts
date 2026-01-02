import { ArtefactNames, CardRusNames, GiantRusNames, SuitRusNames, TierNames } from "../typescript/enums";
import type { AICardCharacteristics, AICardCharacteristicsArray, AllBasicHeroesPossibleCardId, AllCoinsValue, AllDwarfPlayersAmountId, AllDwarfPointsValuesArraysLength, AllHeroesForDifficultySoloModePossibleCardId, AllHeroesForPlayerOrSoloBotAddToPlayerBoardPossibleCardId, AllHeroesForPlayerSoloModeAndvariPossibleCardId, AllHeroesForPlayerSoloModePossibleCardId, AllHeroesForSoloBotAndvariPossibleCardId, AllHeroesForSoloBotPossibleCardId, AllHeroesPossibleCardId, AllInitialCoins, AllInitialTradingCoinConfig, AllPriorityValue, AllRoyalCoinConfig, BasicVidofnirVedrfolnirUpgradeValue, BettermentMinMax, CampCard, CampCardArray, CampCardArrayIndex, CanBeNegativeDwarfCardPoints, CanBeNull, CanBeUndef, Coin, CoinUpgradePossibleMaxValue, CoinsOnPouchNumber, Ctx, CurrentPlayerCoinsScore, DistinctionsPlayersOrderArray, DwarfDeckCard, DwarfPointsValues, DwergBrothersScoringArray, ExchangeOrderArray, ExplorerDistinctionCardId, ExplorerDistinctionCards, GeneralStrategyForSoloBotAndvariId, HeroCard, HeroesForSoloGameArray, HeroesForSoloGameDifficultyLevelArray, HeroesForSoloGameForStrategyBotAndvariArray, HeroesInitialForSoloGameForBotAndvariArray, IndexOf, InitialCoin, MarketCoinNumberValues, MaxCurrentSuitDistinctionPlayersArray, MaxPlyersWithTotalScore, MercenariesConfigArray, MinerDistinctionsScoring, MythologicalCreatureCard, MythologicalCreatureCardsForGiantSkymirArray, MythologicalCreatureDeckForSkymirCardId, OneOrTwo, PlayerCoinId, PlayerCoinNumberValues, PlayerCoinsNumber, PlayerID, PlayerIndex, PlayerPouchCoinId, PlayerRanksForDistinctionsArray, PlayerStack, PlayerTavernCoinId, PlayoutDepth, PrioritiesAmount, PrioritiesForPlayerNumbers, Priority, PrivatePlayerBoardCoins, PrivatePlayerHandCoins, PublicPlayerBoardCoins, PublicPlayerCoin, PublicPlayerHandCoins, PublicPlayersOrderArray, RandomPriorityIndex, RefillDeckCardsWithExpansionArray, RefillDeckCardsWithoutExpansionArray, RemovedCardsFromTavernArray, ReserveStrategyForSoloBotAndvariId, ResolvedPlayersOrderArray, RoyalCoin, RoyalCoinValue, RoyalCoinsUniqueArray, RoyalOfferingsConfig, SecretAllCampDecks, SecretAllDwarfDecksArray, SecretAllDwarfDecksArrayIndex, SoloGameAndvariStrategyVariantLevel, SoloGameDifficultyLevelArg, Stack, StrengthTokenNotchLongMax, StrengthTokenNotchShortMax, TavernAllCardsArray, TavernCard, TavernPossibleCardId, TavernsArrayIndex, TavernsHeuristicArray, TotalScoreArray, TradingCoins, TradingCoinsValue, UpgradableCoin, UpgradableCoinValue, UpgradingCoinsArray, VidofnirVedrfolnirCoinsValue, WinnerArray, WinnersNum, ZeroOrOne } from "../typescript/interfaces";

// TODO Add/Fix asserts with PlayOrder & PublicPlayOrder
export function AssertPlayoutDepth(
    ctx: Ctx,
    number: number,
): asserts number is PlayoutDepth {
    if (!(
        (ctx.numPlayers === 2 && (number === 37 || number === 55))
        || (ctx.numPlayers === 3 && (number === 41 || number === 59))
        || (ctx.numPlayers === 4 && (number === 54 || number === 72))
        || (ctx.numPlayers === 5 && (number === 67 || number === 85))
    )) {
        throw new Error(`No value '${number}' of PlayoutDepth.`);
    }
}

export function AssertPrioritiesForPlayerNumbers(
    ctx: Ctx,
    prioritiesArray: Priority[],
): asserts prioritiesArray is PrioritiesForPlayerNumbers {
    if (!(
        (ctx.numPlayers === 2 && prioritiesArray.length === 2)
        || (ctx.numPlayers === 3 && prioritiesArray.length === 3)
        || (ctx.numPlayers === 4 && prioritiesArray.length === 4)
        || (ctx.numPlayers === 5 && prioritiesArray.length === 5)
    )) {
        throw new Error(`No value '${prioritiesArray}' of PrioritiesForPlayerNumbers.`);
    }
}

export function AssertRandomPriorityIndex(
    ctx: Ctx,
    number: number,
): asserts number is RandomPriorityIndex {
    if (!(
        // TODO Fix it fo solo!
        (ctx.numPlayers === 2 && (number === 0 || number === 2))
        || (ctx.numPlayers === 3 && (number === 2 || number === 3))
        || (ctx.numPlayers === 4 && (number === 2 || number === 3 || number === 4))
        || (ctx.numPlayers === 5 && (number === 2 || number === 3 || number === 4 || number === 5))
    )) {
        throw new Error(`No value '${number}' of RandomPriorityIndexType.`);
    }
}

export function AssertPlayerId(
    ctx: Ctx,
    playerID: string,
): asserts playerID is PlayerID {
    if (!(
        (ctx.numPlayers === 2 && (playerID === `0` || playerID === `1`))
        || (ctx.numPlayers === 3 && (playerID === `0` || playerID === `1` || playerID === `2`))
        || (ctx.numPlayers === 4 && (playerID === `0` || playerID === `1` || playerID === `2` || playerID === `3`))
        || (ctx.numPlayers === 5
            && (playerID === `0` || playerID === `1` || playerID === `2` || playerID === `3` || playerID === `4`))
    )) {
        throw new Error(`No value '${playerID}' of PlayerID.`);
    }
}

export function AssertPlayerIndex(
    ctx: Ctx,
    number: number,
): asserts number is PlayerIndex {
    if (!(
        (ctx.numPlayers === 2 && (number === 0 || number === 1))
        || (ctx.numPlayers === 3 && (number === 0 || number === 1 || number === 2))
        || (ctx.numPlayers === 4 && (number === 0 || number === 1 || number === 2 || number === 3))
        || (ctx.numPlayers === 5 && (number === 0 || number === 1 || number === 2 || number === 3 || number === 4))
    )) {
        throw new Error(`No value '${number}' of PlayerIndexType.`);
    }
}

export function AssertZeroOrOne(
    number: number,
): asserts number is ZeroOrOne {
    if (!(number === 0 || number === 1)) {
        throw new Error(`No value '${number}' of ZeroOrOneType.`);
    }
}

export function AssertOneOrTwo(
    number: number,
): asserts number is OneOrTwo {
    if (!(number === 1 || number === 2)) {
        throw new Error(`No value '${number}' of OneOrTwoType.`);
    }
}

export function AssertSoloGameAndvariStrategyVariantLevel(
    number: number,
): asserts number is SoloGameAndvariStrategyVariantLevel {
    if (!(number >= 0 || number <= 2)) {
        throw new Error(`No value '${number}' of SoloGameAndvariStrategyVariantLevelType.`);
    }
}

export function AssertAllHeroesForPlayerOrSoloBotAddToPlayerBoardPossibleCardId(
    number: number,
): asserts number is AllHeroesForPlayerOrSoloBotAddToPlayerBoardPossibleCardId {
    if (!(number >= 0 || number <= 27)) {
        throw new Error(`No value '${number}' of AllHeroesForPlayerOrSoloBotAddToPlayerBoardPossibleCardIdType.`);
    }
}

export function AssertSoloGameDifficultyLevelArg(
    number: number,
): asserts number is SoloGameDifficultyLevelArg {
    if (!(number >= 0 || number <= 5)) {
        throw new Error(`No value '${number}' of SoloGameDifficultyLevelArgType.`);
    }
}

export function AssertMinerDistinctionsScoring(
    number: number,
): asserts number is MinerDistinctionsScoring {
    if (!(number === 0 || number === 3)) {
        throw new Error(`No value '${number}' of MinerDistinctionsScoringType.`);
    }
}

export function AssertBasicVidofnirVedrfolnirUpgradeValue(
    number: number,
): asserts number is BasicVidofnirVedrfolnirUpgradeValue {
    if (!(number === 2 || number === 3 || number === 5)) {
        throw new Error(`No value '${number}' of BasicVidofnirVedrfolnirUpgradeValueType.`);
    }
}

export function AssertBettermentMinMax(
    number: number,
): asserts number is BettermentMinMax {
    if (!(number >= -46 && number <= 20)) {
        throw new Error(`No value '${number}' of BettermentMinMaxType.`);
    }
}

export function AssertCanBeNegativeDwarfCardPoints(
    number: number,
): asserts number is CanBeNegativeDwarfCardPoints {
    if (!(number >= -12 && number <= 12)) {
        throw new Error(`No value '${number}' of CanBeNegativeDwarfCardPointsType.`);
    }
}

export function AssertDwarfPointsArrayValues(
    number: number,
): asserts number is DwarfPointsValues {
    if (!(number >= 0 && number <= 12)) {
        throw new Error(`No value '${number}' of DwarfPointsArrayValuesType.`);
    }
}

export function AssertCoinUpgradePossibleMaxValue(
    number: number,
): asserts number is CoinUpgradePossibleMaxValue {
    if (!(number >= 5 && number <= 51)) {
        throw new Error(`No value '${number}' of CoinUpgradePossibleMaxValue.`);
    }
}

export function AssertMythologicalCreatureDeckForSkymirCardId(
    number: number,
): asserts number is MythologicalCreatureDeckForSkymirCardId {
    if (!(number >= 0 && number <= 4)) {
        throw new Error(`No value '${number}' of MythologicalCreatureDeckForSkymirCardIdType.`);
    }
}

export function AssertAllHeroesPossibleCardId(
    heroId: number,
): asserts heroId is AllHeroesPossibleCardId {
    if (!(heroId >= 0 && heroId <= 27)) {
        throw new Error(`No value '${heroId}' of AllHeroesPossibleCardIdType.`);
    }
}

export function AssertAllBasicHeroesPossibleCardId(
    heroId: number,
): asserts heroId is AllBasicHeroesPossibleCardId {
    if (!(heroId >= 0 && heroId <= 21)) {
        throw new Error(`No value '${heroId}' of AllBasicHeroesPossibleCardIdType.`);
    }
}

export function AssertAllHeroesForPlayerSoloModePossibleCardId(
    heroId: number,
): asserts heroId is AllHeroesForPlayerSoloModePossibleCardId {
    if (!(heroId >= 0 && heroId <= 9)) {
        throw new Error(`No value '${heroId}' of AllHeroesForPlayerSoloModePossibleCardIdType.`);
    }
}

export function AssertAllHeroesForPlayerSoloModeAndvariPossibleCardId(
    heroId: number,
): asserts heroId is AllHeroesForPlayerSoloModeAndvariPossibleCardId {
    if (!(heroId >= 0 && heroId <= 10)) {
        throw new Error(`No value '${heroId}' of AllHeroesForPlayerSoloModeAndvariPossibleCardIdType.`);
    }
}

export function AssertAllHeroesForSoloBotPossibleCardId(
    heroId: number,
): asserts heroId is AllHeroesForSoloBotPossibleCardId {
    if (!(heroId >= 0 && heroId <= 4)) {
        throw new Error(`No value '${heroId}' of AllHeroesForSoloBotPossibleCardIdType.`);
    }
}

export function AssertAllHeroesForSoloBotAndvariPossibleCardId(
    heroId: number,
): asserts heroId is AllHeroesForSoloBotAndvariPossibleCardId {
    if (!(heroId >= 0 && heroId <= 4)) {
        throw new Error(`No value '${heroId}' of AllHeroesForSoloBotAndvariPossibleCardIdType.`);
    }
}

export function AssertAllHeroesForDifficultySoloModePossibleCardId(
    heroId: number,
): asserts heroId is AllHeroesForDifficultySoloModePossibleCardId {
    if (!(heroId >= 0 && heroId <= 5)) {
        throw new Error(`No value '${heroId}' of AllHeroesForDifficultySoloModePossibleCardIdType.`);
    }
}

// TODO Must be 0 | (0 | 1 | 2) | (0 | 1 | 2 | 3 | 4 | 5) by array length! Add G to params and check G.explorerDistinctionCards.length!?
export function AssertExplorerDistinctionCardId(
    number: number,
): asserts number is ExplorerDistinctionCardId {
    if (!(number >= 0 && number <= 5)) {
        throw new Error(`No value '${number}' of ExplorerDistinctionCardIdType.`);
    }
}

export function AssertMarketCoinNumberValues(
    number: number,
): asserts number is MarketCoinNumberValues {
    if (!(number >= 0 && number <= 3)) {
        throw new Error(`No value '${number}' of MarketCoinNumberValuesType.`);
    }
}

export function AssertPlayerCoinNumberValues(
    number: number,
): asserts number is PlayerCoinNumberValues {
    if (!(number >= 1 && number <= 5)) {
        throw new Error(`No value '${number}' of PlayerCoinNumberValuesType.`);
    }
}

export function AssertTavernCardId(
    number: number,
): asserts number is TavernPossibleCardId {
    if (!(number >= 0 && number <= 4)) {
        throw new Error(`No value '${number}' of TavernCardIdType.`);
    }
}

export function AssertPlayerTavernCoinId(
    number: number,
): asserts number is PlayerTavernCoinId {
    if (!(number >= 0 && number <= 2)) {
        throw new Error(`No value '${number}' of PlayerTavernCoinIdType.`);
    }
}

export function AssertGeneralStrategyForSoloBotAndvariId(
    number: number,
): asserts number is GeneralStrategyForSoloBotAndvariId {
    if (!(number >= 0 && number <= 2)) {
        throw new Error(`No value '${number}' of GeneralStrategyForSoloBotAndvariIdType.`);
    }
}

export function AssertReserveStrategyForSoloBotAndvariId(
    number: number,
): asserts number is ReserveStrategyForSoloBotAndvariId {
    if (!(number >= 1 && number <= 4)) {
        throw new Error(`No value '${number}' of ReserveStrategyForSoloBotAndvariId.`);
    }
}

export function AssertPlayerCoinsNumber(
    number: number,
): asserts number is PlayerCoinsNumber {
    if (!(number >= 0 && number <= 5)) {
        throw new Error(`No value '${number}' of PlayerCoinsNumber.`);
    }
}

export function AssertCurrentPlayerCoinsScore(
    number: number,
): asserts number is CurrentPlayerCoinsScore {
    if (!(number >= 14 && number <= 97)) {
        throw new Error(`No value '${number}' of CurrentPlayerCoinsScoreType.`);
    }
}

export function AssertVidofnirVedrfolnirCoinsValue(
    number: number,
): asserts number is VidofnirVedrfolnirCoinsValue {
    if (!(number >= 1 && number <= 2)) {
        throw new Error(`У игрока должно быть ровно 1-2 монеты в кошеле для обмена для действия артефакта '${ArtefactNames.VidofnirVedrfolnir}', а не '${number}' монет(ы).`);
    }
}

export function AssertMaxPlyersWithTotalScore(
    number: number,
): asserts number is MaxPlyersWithTotalScore {
    if (!(number >= 2 && number <= 5)) {
        throw new Error(`No value '${number}' of MaxPlyersWithTotalScoreType.`);
    }
}

export function AssertWinnersNum(
    number: number,
): asserts number is WinnersNum {
    if (!(number >= 0 && number <= 5)) {
        throw new Error(`No value '${number}' of WinnersNumType.`);
    }
}

export function AssertCoinsOnPouchNumber(
    number: number,
): asserts number is CoinsOnPouchNumber {
    if (!(number >= 0 && number <= 2)) {
        throw new Error(`No value '${number}' of CoinsOnPouchNumber.`);
    }
}

export function AssertStrengthTokenNotchShortMax(
    number: number,
): asserts number is StrengthTokenNotchShortMax {
    if (!(number >= 0 && number <= 3)) {
        throw new Error(`No value '${number}' of StrengthTokenNotchShortMaxType.`);
    }
}

export function AssertAllDwarfPlayersAmountId(
    number: number,
): asserts number is AllDwarfPlayersAmountId {
    if (!(number >= 0 && number <= 8)) {
        throw new Error(`No value '${number}' of AllDwarfPlayersAmountIdType.`);
    }
}

export function AssertStrengthTokenNotchLongMax(
    number: number,
): asserts number is StrengthTokenNotchLongMax {
    if (!(number >= 0 && number <= 4)) {
        throw new Error(`No value '${number}' of StrengthTokenNotchLongMaxType.`);
    }
}

export function AssertPrioritiesAmount(
    number: number,
): asserts number is PrioritiesAmount {
    if (!(number >= 0 && number <= 4)) {
        throw new Error(`No value '${number}' of PrioritiesAmountType.`);
    }
}

export function AssertRoyalCoinValue(
    number: number,
): asserts number is RoyalCoinValue {
    if (!(number >= 5 && number <= 25)) {
        throw new Error(`No value '${number}' of RoyalCoinValueType.`);
    }
}

export function AssertAllPriorityValue(
    number: number,
): asserts number is AllPriorityValue {
    if (!(number >= -1 && number <= 6)) {
        throw new Error(`No value '${number}' of AllPriorityValueType.`);
    }
}

export function AssertAllCoinsValue(
    number: number,
): asserts number is AllCoinsValue {
    if (!(number >= 0 && number !== 1 && number <= 25)) {
        throw new Error(`No value '${number}' of AllCoinsValueType.`);
    }
}

export function AssertUpgradableCoinValue(
    number: number,
): asserts number is UpgradableCoinValue {
    if (!(number >= 2 && number <= 25)) {
        throw new Error(`No value '${number}' of UpgradableCoinValueType.`);
    }
}

export function AssertPlayerCoinId(
    number: number,
): asserts number is PlayerCoinId {
    if (!(number >= 0 && number <= 4)) {
        throw new Error(`No value '${number}' of PlayerCoinIdType.`);
    }
}

export function AssertPlayerPouchCoinId(
    number: number,
): asserts number is PlayerPouchCoinId {
    if (!(number >= 3 && number <= 4)) {
        throw new Error(`No value '${number}' of PlayerPouchCoinIdType.`);
    }
}

export function AssertAllNumberValuesArraysLength(
    number: number,
): asserts number is AllDwarfPointsValuesArraysLength {
    if (!(number >= 0 && number <= 8)) {
        throw new Error(`No value '${number}' of AllNumberValuesArraysLengthType.`);
    }
}

export function AssertSecretAllDwarfDecksArrayIndex(
    number: number,
): asserts number is SecretAllDwarfDecksArrayIndex {
    if (!(number >= 0 && number <= 1)) {
        throw new Error(`No index '${number}' of SecretAllDwarfDecksArrayIndex.`);
    }
}

export function AssertHeroesForSoloGameForStrategyBotAndvariIndex(
    number: number,
): asserts number is IndexOf<HeroesForSoloGameForStrategyBotAndvariArray> {
    if (!(number >= 0 && number <= 4)) {
        throw new Error(`No index '${number}' of HeroesForSoloGameForStrategyBotAndvariArray.`);
    }
}

export function AssertDwergBrothersScoringArrayIndex(
    number: number,
): asserts number is IndexOf<DwergBrothersScoringArray> {
    if (!(number >= 0 && number <= 4)) {
        throw new Error(`No index '${number}' of DwergBrothersScoringArray.`);
    }
}

export function AssertSecretAllDwarfDecksIndex(
    number: number,
): asserts number is IndexOf<SecretAllDwarfDecksArray> {
    if (!(number >= 0 && number <= 1)) {
        throw new Error(`No index '${number}' of SecretAllDwarfDecks.`);
    }
}

export function AssertSecretAllCampDecksIndex(
    number: number,
): asserts number is IndexOf<SecretAllCampDecks> {
    if (!(number >= 0 && number <= 1)) {
        throw new Error(`No index '${number}' of SecretAllCampDecks.`);
    }
}

export function AssertCampIndex(
    number: number,
): asserts number is CampCardArrayIndex {
    if (!(number >= 0 && number <= 4)) {
        throw new Error(`No index '${number}' of CampCardArray.`);
    }
}

export function AssertTavernIndex(
    number: number,
): asserts number is TavernsArrayIndex {
    if (!(number >= 0 && number <= 2)) {
        throw new Error(`No index '${number}' of TavernsType.`);
    }
}

export function AssertTavernsHeuristicArrayIndex(
    number: number,
): asserts number is IndexOf<TavernsHeuristicArray> {
    if (!(number >= 0 && number <= 2)) {
        throw new Error(`No index '${number}' of TavernsHeuristicArray.`);
    }
}

export function AssertMercenariesConfigIndex(
    number: number,
): asserts number is IndexOf<MercenariesConfigArray> {
    if (!(number >= 0 && number <= 5)) {
        throw new Error(`No index '${number}' of MercenariesConfigType.`);
    }
}

export function AssertRoyalOfferingsConfigIndex(
    number: number,
): asserts number is IndexOf<RoyalOfferingsConfig> {
    if (!(number >= 0 && number <= 1)) {
        throw new Error(`No index '${number}' of RoyalOfferingsConfig.`);
    }
}

export function AssertTierIndex(
    number: number,
): asserts number is TierNames {
    if (!(number >= 0 && number <= 1)) {
        throw new Error(`No '${number}' in TierType.`);
    }
}

export function AssertAllInitialTradingCoinConfigIndex(
    number: number,
): asserts number is IndexOf<AllInitialTradingCoinConfig> {
    if (!(number >= 0 && number <= 4)) {
        throw new Error(`No '${number}' in AllInitialTradingCoinConfig.`);
    }
}

export function AssertAllRoyalCoinConfigIndex(
    number: number,
): asserts number is IndexOf<AllRoyalCoinConfig> {
    if (!(number >= 0 && number <= 20)) {
        throw new Error(`No '${number}' in AllRoyalCoinConfig.`);
    }
}

export function AssertRoyalCoinsUniqueArrayIndex(
    number: number,
): asserts number is IndexOf<RoyalCoinsUniqueArray> {
    if (!(number >= 0 && number <= 20)) {
        throw new Error(`No '${number}' in RoyalCoinsUniqueArray.`);
    }
}

export function AssertAICardCharacteristicsArrayIndex(
    number: number,
): asserts number is IndexOf<AICardCharacteristicsArray> {
    if (!(number >= 0 && number <= 2)) {
        throw new Error(`No '${number}' in AICardCharacteristicsArray.`);
    }
}

export function AssertTop1And2ScoreNumber(
    top1And2ScoreNumber: CanBeUndef<number>,
): asserts top1And2ScoreNumber is number {
    if (!(top1And2ScoreNumber === undefined)) {
        throw new Error(`Топ 1 и 2 значения очков должны быть числовыми значениями.`);
    }
}

export function AssertTavernAllCardsArray(
    tavernAllCardsArray: TavernCard[],
): asserts tavernAllCardsArray is TavernAllCardsArray {
    if (!(tavernAllCardsArray.length > 2 && tavernAllCardsArray.length < 6)) {
        throw new Error(`В массиве всех карт в любой таверне должно быть более 2 и менее 6 карт.`);
    }
}
export function AssertHeroesForSoloGameDifficultyLevelArray(
    heroesForSoloGameDifficultyLevelArray: readonly HeroCard[],
): asserts heroesForSoloGameDifficultyLevelArray is HeroesForSoloGameDifficultyLevelArray {
    if (!(heroesForSoloGameDifficultyLevelArray.length >= 0 && heroesForSoloGameDifficultyLevelArray.length < 7)) {
        throw new Error(`В массиве карт героев для выбора сложности в соло игре должно быть от 0 и менее 7 карт.`);
    }
}

export function AssertRefillDeckCardsWithExpansionArray(
    refillDeckCardsWithExpansionArray: MythologicalCreatureCard[],
): asserts refillDeckCardsWithExpansionArray is RefillDeckCardsWithExpansionArray {
    if (!(refillDeckCardsWithExpansionArray.length > 2 && refillDeckCardsWithExpansionArray.length < 6)) {
        throw new Error(`В массиве всех карт для заполнения в таверне с дополнением должно быть более 2 и менее 6 карт.`);
    }
}

export function AssertRemovedCardsFromTavernArray(
    removedCardsFromTavernArray: TavernCard[],
): asserts removedCardsFromTavernArray is RemovedCardsFromTavernArray {
    if (!(removedCardsFromTavernArray.length > 2 && removedCardsFromTavernArray.length < 6)) {
        throw new Error(`В массиве всех карт для удаления из таверны с дополнением должно быть более 2 и менее 6 карт.`);
    }
}

export function AssertRefillDeckCardsWithoutExpansionArray(
    refillDeckCardsWithoutExpansionArray: DwarfDeckCard[],
): asserts refillDeckCardsWithoutExpansionArray is RefillDeckCardsWithoutExpansionArray {
    if (!(refillDeckCardsWithoutExpansionArray.length > 2 && refillDeckCardsWithoutExpansionArray.length < 6)) {
        throw new Error(`В массиве всех карт для заполнения в таверне без дополнения должно быть более 2 и менее 6 карт.`);
    }
}

export function AssertMaxCurrentSuitDistinctionPlayersArray(
    maxCurrentSuitDistinctionPlayersArray: PlayerID[],
): asserts maxCurrentSuitDistinctionPlayersArray is MaxCurrentSuitDistinctionPlayersArray {
    if (!(maxCurrentSuitDistinctionPlayersArray.length >= 0 && maxCurrentSuitDistinctionPlayersArray.length <= 5)) {
        throw new Error(`В массиве индексов игроков с максимальным количеством шевронов для преимущества по фракции должно быть не меньше 0 и менее 6 значений.`);
    }
}

export function AssertExchangeOrderArray(
    exchangeOrderArray: PlayerID[],
): asserts exchangeOrderArray is ExchangeOrderArray {
    if (!(exchangeOrderArray.length >= 2 && exchangeOrderArray.length <= 5)) {
        throw new Error(`В массиве изменения порядка хода игроков игроков должно быть от 2 до 5 значений.`);
    }
}

export function AssertResolvedPlayersOrderArray(
    resolvedPlayersOrderArray: PlayerID[],
): asserts resolvedPlayersOrderArray is ResolvedPlayersOrderArray {
    if (!(resolvedPlayersOrderArray.length >= 1 && resolvedPlayersOrderArray.length <= 5)) {
        throw new Error(`В массиве нового порядка хода игроков должно быть от 1 до 5 значений.`);
    }
}

export function AssertPublicPlayersOrderArray(
    publicPlayersOrderArray: PlayerID[],
): asserts publicPlayersOrderArray is PublicPlayersOrderArray {
    if (!(publicPlayersOrderArray.length >= 0 && publicPlayersOrderArray.length <= 5)) {
        throw new Error(`В массиве порядка хода игроков по преимуществам по фракции должно быть от 0 до 5 значений.`);
    }
}

export function AssertDistinctionsPlayersOrderArray(
    distinctionsPlayersOrderArray: PlayerID[],
): asserts distinctionsPlayersOrderArray is DistinctionsPlayersOrderArray {
    if (!(distinctionsPlayersOrderArray.length >= 0 && distinctionsPlayersOrderArray.length <= 5)) {
        throw new Error(`В массиве порядка хода игроков по преимуществам по фракции должно быть от 0 до 5 значений.`);
    }
}

export function AssertPlayerRanksForDistinctionsArray(
    playerRanksForDistinctionsArray: readonly number[],
): asserts playerRanksForDistinctionsArray is PlayerRanksForDistinctionsArray {
    if (!(playerRanksForDistinctionsArray.length > 0 && playerRanksForDistinctionsArray.length < 6)) {
        throw new Error(`В массиве количества шевронов игроков для преимущества по фракции должно быть более 0 и менее 6 значений.`);
    }
}

export function AssertTotalScoreArray(
    totalScoreArray: number[],
): asserts totalScoreArray is TotalScoreArray {
    if (!(totalScoreArray.length > 1 && totalScoreArray.length < 6)) {
        throw new Error(`В массиве итоговых очков игроков должно быть более 1 и менее 6 итоговых результатов.`);
    }
}

export function AssertWinnerArray(
    winnerArray: PlayerID[],
): asserts winnerArray is WinnerArray {
    if (!(winnerArray.length >= 1 && winnerArray.length <= 5)) {
        throw new Error(`В массиве победителей игры должно быть от 1 до 5 игроков.`);
    }
}

export function AssertUpgradingCoinsArray(
    upgradingCoinsArray: readonly UpgradableCoin[],
): asserts upgradingCoinsArray is UpgradingCoinsArray {
    if (!(upgradingCoinsArray.length > 0 && upgradingCoinsArray.length < 5)) {
        throw new Error(`В массиве монет для обмена должно быть более 0 и менее 5 монет.`);
    }
}

export function AssertAICardCharacteristicsArray(
    aiCardCharacteristicsArray: readonly AICardCharacteristics[],
): asserts aiCardCharacteristicsArray is AICardCharacteristicsArray {
    if (!(aiCardCharacteristicsArray.length === 3)) {
        throw new Error(`В массиве эвристик таверн должно быть ровно 3 характеристики.`);
    }
}

export function AssertTavernsHeuristicArray(
    tavernsHeuristicArray: number[],
): asserts tavernsHeuristicArray is TavernsHeuristicArray {
    if (!(tavernsHeuristicArray.length === 3)) {
        throw new Error(`В массиве эвристик таверн должно быть ровно 3 эвристики.`);
    }
}

export function AssertHandCoins(
    handCoins: PublicPlayerCoin[],
): asserts handCoins is PublicPlayerHandCoins {
    if (!(handCoins.length === 5)) {
        throw new Error(`В массиве монет игрока в руке должно быть ровно 5 монет.`);
    }
}

export function AssertPrivateBoardCoins(
    boardCoins: Coin[],
): asserts boardCoins is PrivatePlayerBoardCoins {
    if (!(boardCoins.length === 5)) {
        throw new Error(`В массиве монет приватного игрока на столе должно быть ровно 5 монет.`);
    }
}

export function AssertPrivateHandCoins(
    handCoins: Coin[],
): asserts handCoins is PrivatePlayerHandCoins {
    if (!(handCoins.length === 5)) {
        throw new Error(`В массиве монет приватного игрока в руке должно быть ровно 5 монет.`);
    }
}

export function AssertRoyalCoinsUnique(
    uniqueRoyalCoins: RoyalCoin[],
): asserts uniqueRoyalCoins is RoyalCoinsUniqueArray {
    if (!(uniqueRoyalCoins.length === 21)) {
        throw new Error(`В массиве уникальных монет на рынке должно быть ровно 21 монета.`);
    }
}

export function AssertBoardCoins(
    boardCoins: PublicPlayerCoin[],
): asserts boardCoins is PublicPlayerBoardCoins {
    if (!(boardCoins.length === 5)) {
        throw new Error(`В массиве монет игрока на столе должно быть ровно 5 монет.`);
    }
}

export function AssertInitialCoins(
    initialCoins: readonly InitialCoin[],
): asserts initialCoins is AllInitialCoins {
    // TODO Add check 1 InitialTriggerTradingCoin & 4 InitialNotTriggerTradingCoin type&isOpened!?
    if (!(initialCoins.length === 5 && initialCoins[0]?.value === 0 && initialCoins[1]?.value === 2
        && initialCoins[2]?.value === 3 && initialCoins[3]?.value === 4 && initialCoins[4]?.value === 5)) {
        throw new Error(`В массиве базовых монет должно быть ровно 5 монет со значениями 0 (обменная), 2, 3, 4, 5 (базовые).`);
    }
}

export function AssertFullMythologicalCreatureCardsForGiantSkymir(
    mythologyCreatureCardsSkymir: MythologicalCreatureCard[],
): asserts mythologyCreatureCardsSkymir is MythologicalCreatureCardsForGiantSkymirArray {
    if (!(mythologyCreatureCardsSkymir.length === 5)) {
        throw new Error(`В массиве карт мифических существ для карты '${CardRusNames.GiantCard}' '${GiantRusNames.Skymir}' должно быть ровно 5 слотов для карт.`);
    }
}

export function AssertTradingCoins(
    tradingCoins: readonly UpgradableCoin[],
): asserts tradingCoins is TradingCoins {
    if (!(tradingCoins.length === 1 || tradingCoins.length === 2)) {
        throw new Error(`В массиве монет для обмена должно быть ровно 1 | 2 монет(а/ы).`);
    }
}

export function AssertTradingCoinsValues(
    tradingCoinsValues: readonly number[],
): asserts tradingCoinsValues is TradingCoinsValue {
    if (!(tradingCoinsValues.length === 1 || tradingCoinsValues.length === 2)) {
        throw new Error(`В массиве значений монет для обмена должно быть ровно 1 | 2 монет(а/ы).`);
    }
}

export function AssertExplorerDistinctionCards(
    explorerDistinctionCards: readonly DwarfDeckCard[],
): asserts explorerDistinctionCards is ExplorerDistinctionCards {
    if (!(explorerDistinctionCards.length === 1 || explorerDistinctionCards.length === 3
        || explorerDistinctionCards.length === 6)) {
        throw new Error(`В массиве карт для получения преимущества по фракции '${SuitRusNames.explorer}' должно быть ровно 1 | 3 | 6 карт(а/ы).`);
    }
}

export function AssertCamp(
    camp: CanBeNull<CampCard>[],
): asserts camp is CampCardArray {
    if (!(camp.length === 5)) {
        throw new Error(`В массиве лагеря должно быть ровно 5 слотов для карт.`);
    }
}

export function AssertHeroesForSoloBot(
    heroesForSoloBot: readonly HeroCard[],
): asserts heroesForSoloBot is HeroesForSoloGameArray {
    if (!(heroesForSoloBot.length === 5)) {
        throw new Error(`В массиве карт героев для соло бота должно быть ровно 5 карт.`);
    }
}

export function AssertHeroesInitialForSoloGameForBotAndvari(
    heroesInitialForSoloGameForBotAndvari: readonly HeroCard[],
): asserts heroesInitialForSoloGameForBotAndvari is HeroesInitialForSoloGameForBotAndvariArray {
    if (!(heroesInitialForSoloGameForBotAndvari.length === 10)) {
        throw new Error(`В массиве карт героев для соло бота Андвари должно быть ровно 5 карт.`);
    }
}

export function AssertHeroesForSoloGameForStrategyBotAndvari(
    heroesForSoloGameForStrategyBotAndvari: readonly HeroCard[],
): asserts heroesForSoloGameForStrategyBotAndvari is HeroesForSoloGameForStrategyBotAndvariArray {
    if (!(heroesForSoloGameForStrategyBotAndvari.length === 5)) {
        throw new Error(`В массиве карт героев для стратегии соло бота Андвари должно быть ровно 5 карт.`);
    }
}

export function AssertPlayerStack(
    stack:
        | Stack
        | PlayerStack
    ,
): asserts stack is PlayerStack {
    if (!(`priority` in stack)) {
        throw new Error(`В стеке действий игрока должно быть поле 'priority'.`);
    }
}
