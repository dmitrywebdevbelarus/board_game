import { enumerate, iterations, objectives, playoutDepth } from "./AI";
import { SetupGame } from "./GameSetup";
import { CheckBidUlineOrder, CheckEndBidUlinePhase, EndBidUlineActions } from "./hooks/BidUlineHooks";
import { CheckEndBidsPhase, CheckEndBidsTurn, EndBidsActions, PreparationPhaseActions } from "./hooks/BidsHooks";
import { CheckBrisingamensEndGameOrder, CheckEndBrisingamensEndGamePhase, EndBrisingamensEndGameActions, OnBrisingamensEndGameMove, OnBrisingamensEndGameTurnBegin, StartGetMjollnirProfitPhase } from "./hooks/BrisingamensEndGameHooks";
import { CheckChooseDifficultySoloModeOrder, CheckEndChooseDifficultySoloModePhase, CheckEndChooseDifficultySoloModeTurn, EndChooseDifficultySoloModeActions, OnChooseDifficultySoloModeMove, OnChooseDifficultySoloModeTurnBegin, StartChooseDifficultySoloModeAndvariOrBidsPhase } from "./hooks/ChooseDifficultySoloModeHooks";
import { CheckChooseStrategyForSoloModeAndvariOrder, CheckChooseStrategyForSoloModeAndvariPhase, CheckEndChooseStrategyForSoloModeAndvariTurn, EndChooseStrategyForSoloModeAndvariActions, OnChooseStrategyForSoloModeAndvariMove, OnChooseStrategyForSoloModeAndvariTurnBegin } from "./hooks/ChooseStrategyForSoloModeAndvariHooks";
import { CheckEndEnlistmentMercenariesPhase, CheckEndEnlistmentMercenariesTurn, EndEnlistmentMercenariesActions, OnEnlistmentMercenariesMove, OnEnlistmentMercenariesTurnBegin, PrepareMercenaryPhaseOrders } from "./hooks/EnlistmentMercenariesHooks";
import { CheckEndGame, ReturnEndGameData } from "./hooks/GameHooks";
import { CheckEndGetMjollnirProfitPhase, CheckGetMjollnirProfitOrder, OnGetMjollnirProfitMove, OnGetMjollnirProfitTurnBegin, StartEndGame } from "./hooks/GetMjollnirProfitHooks";
import { StartBidUlineOrTavernsResolutionPhase, StartEndGameLastActions, StartEndTierPhaseOrEndGameLastActions } from "./hooks/NextPhaseHooks";
import { CheckEndPlaceYludPhase, CheckEndPlaceYludTurn, CheckPlaceYludOrder, EndPlaceYludActions, OnPlaceYludMove, OnPlaceYludTurnBegin } from "./hooks/PlaceYludHooks";
import { CheckEndTavernsResolutionPhase, CheckEndTavernsResolutionTurn, EndTavernsResolutionActions, OnTavernsResolutionMove, OnTavernsResolutionTurnBegin, OnTavernsResolutionTurnEnd, ResolveCurrentTavernOrders, StartBidUlineOrTavernsResolutionOrEndTierPhaseOrEndGameLastActionsPhase } from "./hooks/TavernsResolutionHooks";
import { CheckAndResolveTroopEvaluationOrders, CheckEndTroopEvaluationPhase, CheckEndTroopEvaluationTurn, EndTroopEvaluationPhaseActions, OnTroopEvaluationMove, OnTroopEvaluationTurnBegin, OnTroopEvaluationTurnEnd } from "./hooks/TroopEvaluationHooks";
import { BotsPlaceAllCoinsMove } from "./moves/BotMoves";
import { AddCoinToPouchMove, ChooseCoinValueForVidofnirVedrfolnirUpgradeMove, ClickCampCardHoldaMove, ClickCampCardMove, DiscardSuitCardFromPlayerBoardMove, UpgradeCoinVidofnirVedrfolnirMove } from "./moves/CampMoves";
import { ClickBoardCoinMove, ClickCoinToUpgradeMove, ClickHandCoinMove, ClickHandCoinUlineMove, ClickHandTradingCoinUlineMove, PickConcreteCoinToUpgradeMove } from "./moves/CoinMoves";
import { ChooseDifficultyLevelForSoloModeMove, ChooseHeroForDifficultySoloModeMove, ChooseStrategyForSoloModeAndvariMove, ChooseStrategyVariantForSoloModeAndvariMove } from "./moves/GameConfigMoves";
import { ClickHeroCardMove, DiscardTopCardFromSuitMove, PlaceMultiSuitCardMove, PlaceThrudHeroMove, PlaceYludHeroMove } from "./moves/HeroMoves";
import { ClickCardMove, ClickCardToPickDistinctionMove, ClickDistinctionCardMove, DiscardCard2PlayersMove, DiscardCardFromPlayerBoardMove, GetEnlistmentMercenariesMove, GetMjollnirProfitMove, PassEnlistmentMercenariesMove, PickDiscardCardMove, PlaceEnlistmentMercenariesMove, StartEnlistmentMercenariesMove } from "./moves/Moves";
import { ActivateGodAbilityMove, ChooseCoinValueForHrungnirUpgradeMove, ChooseSuitOlrunMove, ClickCardNotGiantAbilityMove, ClickGiantAbilityNotCardMove, GetMythologyCardMove, NotActivateGodAbilityMove } from "./moves/MythologicalCreatureMoves";
import { SoloBotAndvariClickCardMove, SoloBotAndvariClickCardToPickDistinctionMove, SoloBotAndvariClickCoinToUpgradeMove, SoloBotAndvariClickHeroCardMove, SoloBotAndvariPlaceAllCoinsMove, SoloBotAndvariPlaceThrudHeroMove, SoloBotAndvariPlaceYludHeroMove } from "./moves/SoloBotAndvariMoves";
import { SoloBotClickCardMove, SoloBotClickCardToPickDistinctionMove, SoloBotClickCoinToUpgradeMove, SoloBotClickHeroCardMove, SoloBotPlaceAllCoinsMove, SoloBotPlaceThrudHeroMove, SoloBotPlaceYludHeroMove } from "./moves/SoloBotMoves";
import { PhaseNames } from "./typescript/enums";
import type { CanBeVoid, Context, Game, MyGameState, TurnOrderConfig } from "./typescript/interfaces";
import { PlayerView } from "./my_implementation/PlayerView";
import { TurnOrder } from "./my_implementation/TurnOrder";

// TODO Check all coins for solo (player===public, bot=private+sometimes public)
// TODO Add Log data fo Solo Bot fo all files!
// TODO Add logging
// TODO Add dock block
// TODO Add all logs errors and other text in ENUMS!
/**
 * <h3>Параметры порядка хода.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При определении хода в каждую фазу игры.</li>
 * </ol>
 */
const order: TurnOrderConfig = TurnOrder.CUSTOM_FROM(`publicPlayersOrder`);

/**
 * <h3>Параметры игры.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При инициализации игрового стола.</li>
 * </ol>
 */
export const BoardGame: Game = {
    name: `Nidavellir`,
    minPlayers: 2,
    maxPlayers: 5,
    setup: SetupGame,
    playerView: PlayerView.STRIP_SECRETS,
    phases: {
        ChooseDifficultySoloMode: {
            turn: {
                order,
                stages: {
                    ChooseHeroForDifficultySoloMode: {
                        moves: {
                            ChooseHeroForDifficultySoloModeMove,
                        },
                    },
                    SoloBotClickCoinToUpgrade: {
                        moves: {
                            SoloBotClickCoinToUpgradeMove,
                        },
                    },
                },
                onBegin: ({ ...rest }: Context): void => OnChooseDifficultySoloModeTurnBegin({ ...rest }),
                onMove: ({ ...rest }: Context): void => OnChooseDifficultySoloModeMove({ ...rest }),
                endIf: ({ ...rest }: Context): CanBeVoid<boolean> =>
                    CheckEndChooseDifficultySoloModeTurn({ ...rest }),
            },
            start: true,
            moves: {
                ChooseDifficultyLevelForSoloModeMove,
            },
            next: ({ ...rest }: Context): PhaseNames => StartChooseDifficultySoloModeAndvariOrBidsPhase({ ...rest }),
            onBegin: ({ ...rest }: Context): void => CheckChooseDifficultySoloModeOrder({ ...rest }),
            endIf: ({ ...rest }: Context): CanBeVoid<boolean> => CheckEndChooseDifficultySoloModePhase({ ...rest }),
            onEnd: ({ ...rest }: Context): void => EndChooseDifficultySoloModeActions({ ...rest }),
        },
        ChooseDifficultySoloModeAndvari: {
            turn: {
                order,
                onBegin: ({ ...rest }: Context): void => OnChooseStrategyForSoloModeAndvariTurnBegin({ ...rest }),
                onMove: ({ ...rest }: Context): void => OnChooseStrategyForSoloModeAndvariMove({ ...rest }),
                endIf: ({ ...rest }: Context): CanBeVoid<boolean> =>
                    CheckEndChooseStrategyForSoloModeAndvariTurn({ ...rest }),
            },
            moves: {
                ChooseStrategyVariantForSoloModeAndvariMove,
                ChooseStrategyForSoloModeAndvariMove,
            },
            next: PhaseNames.Bids,
            onBegin: ({ ...rest }: Context): void => CheckChooseStrategyForSoloModeAndvariOrder({ ...rest }),
            endIf: ({ ...rest }: Context): CanBeVoid<boolean> =>
                CheckChooseStrategyForSoloModeAndvariPhase({ ...rest }),
            onEnd: ({ ...rest }: Context): void => EndChooseStrategyForSoloModeAndvariActions({ ...rest }),
        },
        Bids: {
            turn: {
                order,
                endIf: ({ G, ctx, ...rest }: Context): CanBeVoid<true> => CheckEndBidsTurn({ G, ctx, ...rest }),
            },
            moves: {
                ClickHandCoinMove,
                ClickBoardCoinMove,
                BotsPlaceAllCoinsMove,
                SoloBotPlaceAllCoinsMove,
                SoloBotAndvariPlaceAllCoinsMove,
            },
            next: ({ ...rest }: Context): PhaseNames => StartBidUlineOrTavernsResolutionPhase({ ...rest }),
            onBegin: ({ ...rest }: Context): void => PreparationPhaseActions({ ...rest }),
            endIf: ({ ...rest }: Context): CanBeVoid<boolean> => CheckEndBidsPhase({ ...rest }),
            onEnd: ({ ...rest }: Context): void => EndBidsActions({ ...rest }),
        },
        BidUline: {
            turn: {
                order,
            },
            moves: {
                ClickHandCoinUlineMove,
            },
            next: PhaseNames.TavernsResolution,
            onBegin: ({ ...rest }: Context): void => CheckBidUlineOrder({ ...rest }),
            endIf: ({ ...rest }: Context): CanBeVoid<boolean> => CheckEndBidUlinePhase({ ...rest }),
            onEnd: ({ ...rest }: Context): void => EndBidUlineActions({ ...rest }),
        },
        TavernsResolution: {
            turn: {
                order,
                stages: {
                    // Start
                    AddCoinToPouch: {
                        moves: {
                            AddCoinToPouchMove,
                        },
                    },
                    ChooseCoinValueForVidofnirVedrfolnirUpgrade: {
                        moves: {
                            ChooseCoinValueForVidofnirVedrfolnirUpgradeMove,
                        },
                    },
                    DiscardTopCardFromSuit: {
                        moves: {
                            DiscardTopCardFromSuitMove,
                        },
                    },
                    DiscardSuitCardFromPlayerBoard: {
                        moves: {
                            DiscardSuitCardFromPlayerBoardMove,
                        },
                    },
                    ClickCampCardHolda: {
                        moves: {
                            ClickCampCardHoldaMove,
                        },
                    },
                    PickConcreteCoinToUpgrade: {
                        moves: {
                            PickConcreteCoinToUpgradeMove,
                        },
                    },
                    PickDiscardCard: {
                        moves: {
                            PickDiscardCardMove,
                        },
                    },
                    ClickHeroCard: {
                        moves: {
                            ClickHeroCardMove,
                        },
                    },
                    PlaceMultiSuitCard: {
                        moves: {
                            PlaceMultiSuitCardMove,
                        },
                    },
                    PlaceThrudHero: {
                        moves: {
                            PlaceThrudHeroMove,
                        },
                    },
                    ClickCoinToUpgrade: {
                        moves: {
                            ClickCoinToUpgradeMove,
                        },
                    },
                    UpgradeCoinVidofnirVedrfolnir: {
                        moves: {
                            UpgradeCoinVidofnirVedrfolnirMove,
                        },
                    },
                    // End
                    ActivateGiantAbilityOrPickCard: {
                        moves: {
                            ClickCardNotGiantAbilityMove,
                            ClickGiantAbilityNotCardMove,
                        },
                    },
                    ActivateGodAbilityOrNot: {
                        moves: {
                            ActivateGodAbilityMove,
                            NotActivateGodAbilityMove,
                        },
                    },
                    ChooseCoinValueForHrungnirUpgrade: {
                        moves: {
                            ChooseCoinValueForHrungnirUpgradeMove,
                        },
                    },
                    ChooseSuitOlrun: {
                        moves: {
                            ChooseSuitOlrunMove,
                        },
                    },
                    GetMythologyCard: {
                        moves: {
                            GetMythologyCardMove,
                        },
                    },
                    DiscardCard2Players: {
                        moves: {
                            DiscardCard2PlayersMove,
                        },
                    },
                    ClickHandTradingCoinUline: {
                        moves: {
                            ClickHandTradingCoinUlineMove,
                        },
                    },
                    // Common Solo Bot Start
                    SoloBotClickHeroCard: {
                        moves: {
                            SoloBotClickHeroCardMove,
                        },
                    },
                    SoloBotPlaceThrudHero: {
                        moves: {
                            SoloBotPlaceThrudHeroMove,
                        },
                    },
                    SoloBotClickCoinToUpgrade: {
                        moves: {
                            SoloBotClickCoinToUpgradeMove,
                        },
                    },
                    // Common Solo Bot End
                    // Common Solo Bot Andvari Start
                    SoloBotAndvariClickHeroCard: {
                        moves: {
                            SoloBotAndvariClickHeroCardMove,
                        },
                    },
                    SoloBotAndvariPlaceThrudHero: {
                        moves: {
                            SoloBotAndvariPlaceThrudHeroMove,
                        },
                    },
                    SoloBotAndvariClickCoinToUpgrade: {
                        moves: {
                            SoloBotAndvariClickCoinToUpgradeMove,
                        },
                    },
                    // Common Solo Bot Andvari End
                },
                onBegin: ({ ...rest }: Context): void => OnTavernsResolutionTurnBegin({ ...rest }),
                onMove: ({ ...rest }: Context): void => OnTavernsResolutionMove({ ...rest }),
                endIf: ({ ...rest }: Context): CanBeVoid<true> => CheckEndTavernsResolutionTurn({ ...rest }),
                onEnd: ({ ...rest }: Context): void => OnTavernsResolutionTurnEnd({ ...rest }),
            },
            moves: {
                ClickCardMove,
                ClickCampCardMove,
                SoloBotClickCardMove,
                SoloBotAndvariClickCardMove,
            },
            next: ({ ...rest }: Context): CanBeVoid<PhaseNames> =>
                StartBidUlineOrTavernsResolutionOrEndTierPhaseOrEndGameLastActionsPhase({ ...rest }),
            onBegin: ({ ...rest }: Context): void => ResolveCurrentTavernOrders({ ...rest }),
            endIf: ({ ...rest }: Context): CanBeVoid<true> => CheckEndTavernsResolutionPhase({ ...rest }),
            onEnd: ({ ...rest }: Context): void => EndTavernsResolutionActions({ ...rest }),
        },
        EnlistmentMercenaries: {
            turn: {
                order,
                stages: {
                    // Start
                    AddCoinToPouch: {
                        moves: {
                            AddCoinToPouchMove,
                        },
                    },
                    ChooseCoinValueForVidofnirVedrfolnirUpgrade: {
                        moves: {
                            ChooseCoinValueForVidofnirVedrfolnirUpgradeMove,
                        },
                    },
                    DiscardTopCardFromSuit: {
                        moves: {
                            DiscardTopCardFromSuitMove,
                        },
                    },
                    DiscardSuitCardFromPlayerBoard: {
                        moves: {
                            DiscardSuitCardFromPlayerBoardMove,
                        },
                    },
                    ClickCampCardHolda: {
                        moves: {
                            ClickCampCardHoldaMove,
                        },
                    },
                    PickConcreteCoinToUpgrade: {
                        moves: {
                            PickConcreteCoinToUpgradeMove,
                        },
                    },
                    PickDiscardCard: {
                        moves: {
                            PickDiscardCardMove,
                        },
                    },
                    ClickHeroCard: {
                        moves: {
                            ClickHeroCardMove,
                        },
                    },
                    PlaceMultiSuitCard: {
                        moves: {
                            PlaceMultiSuitCardMove,
                        },
                    },
                    PlaceThrudHero: {
                        moves: {
                            PlaceThrudHeroMove,
                        },
                    },
                    ClickCoinToUpgrade: {
                        moves: {
                            ClickCoinToUpgradeMove,
                        },
                    },
                    UpgradeCoinVidofnirVedrfolnir: {
                        moves: {
                            UpgradeCoinVidofnirVedrfolnirMove,
                        },
                    },
                    // End
                    PlaceEnlistmentMercenaries: {
                        moves: {
                            PlaceEnlistmentMercenariesMove,
                        },
                    },
                },
                onBegin: ({ ...rest }: Context): void => OnEnlistmentMercenariesTurnBegin({ ...rest }),
                onMove: ({ ...rest }: Context): void => OnEnlistmentMercenariesMove({ ...rest }),
                endIf: ({ ...rest }: Context): CanBeVoid<boolean> => CheckEndEnlistmentMercenariesTurn({ ...rest }),
            },
            moves: {
                StartEnlistmentMercenariesMove,
                PassEnlistmentMercenariesMove,
                GetEnlistmentMercenariesMove,
            },
            next: ({ ...rest }: Context): CanBeVoid<PhaseNames> =>
                StartEndTierPhaseOrEndGameLastActions({ ...rest }),
            onBegin: ({ ...rest }: Context): void => PrepareMercenaryPhaseOrders({ ...rest }),
            endIf: ({ ...rest }: Context): CanBeVoid<true> => CheckEndEnlistmentMercenariesPhase({ ...rest }),
            onEnd: ({ ...rest }: Context): void => EndEnlistmentMercenariesActions({ ...rest }),
        },
        PlaceYlud: {
            turn: {
                order,
                stages: {
                    // Start
                    AddCoinToPouch: {
                        moves: {
                            AddCoinToPouchMove,
                        },
                    },
                    ChooseCoinValueForVidofnirVedrfolnirUpgrade: {
                        moves: {
                            ChooseCoinValueForVidofnirVedrfolnirUpgradeMove,
                        },
                    },
                    DiscardTopCardFromSuit: {
                        moves: {
                            DiscardTopCardFromSuitMove,
                        },
                    },
                    DiscardSuitCardFromPlayerBoard: {
                        moves: {
                            DiscardSuitCardFromPlayerBoardMove,
                        },
                    },
                    ClickCampCardHolda: {
                        moves: {
                            ClickCampCardHoldaMove,
                        },
                    },
                    PickConcreteCoinToUpgrade: {
                        moves: {
                            PickConcreteCoinToUpgradeMove,
                        },
                    },
                    PickDiscardCard: {
                        moves: {
                            PickDiscardCardMove,
                        },
                    },
                    ClickHeroCard: {
                        moves: {
                            ClickHeroCardMove,
                        },
                    },
                    PlaceMultiSuitCard: {
                        moves: {
                            PlaceMultiSuitCardMove,
                        },
                    },
                    PlaceThrudHero: {
                        moves: {
                            PlaceThrudHeroMove,
                        },
                    },
                    ClickCoinToUpgrade: {
                        moves: {
                            ClickCoinToUpgradeMove,
                        },
                    },
                    UpgradeCoinVidofnirVedrfolnir: {
                        moves: {
                            UpgradeCoinVidofnirVedrfolnirMove,
                        },
                    },
                    // End
                    // Common Solo Bot Start
                    SoloBotClickHeroCard: {
                        moves: {
                            SoloBotClickHeroCardMove,
                        },
                    },
                    SoloBotPlaceThrudHero: {
                        moves: {
                            SoloBotPlaceThrudHeroMove,
                        },
                    },
                    SoloBotClickCoinToUpgrade: {
                        moves: {
                            SoloBotClickCoinToUpgradeMove,
                        },
                    },
                    // Common Solo Bot End
                    // Common Solo Bot Andvari Start
                    SoloBotAndvariClickHeroCard: {
                        moves: {
                            SoloBotAndvariClickHeroCardMove,
                        },
                    },
                    SoloBotAndvariPlaceThrudHero: {
                        moves: {
                            SoloBotAndvariPlaceThrudHeroMove,
                        },
                    },
                    SoloBotAndvariClickCoinToUpgrade: {
                        moves: {
                            SoloBotAndvariClickCoinToUpgradeMove,
                        },
                    },
                    // Common Solo Bot Andvari End
                },
                onBegin: ({ ...rest }: Context): void => OnPlaceYludTurnBegin({ ...rest }),
                onMove: ({ ...rest }: Context): void => OnPlaceYludMove({ ...rest }),
                endIf: ({ ...rest }: Context): CanBeVoid<true> => CheckEndPlaceYludTurn({ ...rest }),
            },
            moves: {
                PlaceYludHeroMove,
                SoloBotPlaceYludHeroMove,
                SoloBotAndvariPlaceYludHeroMove,
            },
            next: ({ ...rest }: Context): CanBeVoid<PhaseNames> => StartEndGameLastActions({ ...rest }),
            onBegin: ({ ...rest }: Context): void => CheckPlaceYludOrder({ ...rest }),
            endIf: ({ ...rest }: Context): CanBeVoid<true> => CheckEndPlaceYludPhase({ ...rest }),
            onEnd: ({ ...rest }: Context): void => EndPlaceYludActions({ ...rest }),
        },
        TroopEvaluation: {
            turn: {
                order,
                stages: {
                    // Start
                    AddCoinToPouch: {
                        moves: {
                            AddCoinToPouchMove,
                        },
                    },
                    ChooseCoinValueForVidofnirVedrfolnirUpgrade: {
                        moves: {
                            ChooseCoinValueForVidofnirVedrfolnirUpgradeMove,
                        },
                    },
                    DiscardTopCardFromSuit: {
                        moves: {
                            DiscardTopCardFromSuitMove,
                        },
                    },
                    DiscardSuitCardFromPlayerBoard: {
                        moves: {
                            DiscardSuitCardFromPlayerBoardMove,
                        },
                    },
                    ClickCampCardHolda: {
                        moves: {
                            ClickCampCardHoldaMove,
                        },
                    },
                    PickConcreteCoinToUpgrade: {
                        moves: {
                            PickConcreteCoinToUpgradeMove,
                        },
                    },
                    PickDiscardCard: {
                        moves: {
                            PickDiscardCardMove,
                        },
                    },
                    ClickHeroCard: {
                        moves: {
                            ClickHeroCardMove,
                        },
                    },
                    PlaceMultiSuitCard: {
                        moves: {
                            PlaceMultiSuitCardMove,
                        },
                    },
                    PlaceThrudHero: {
                        moves: {
                            PlaceThrudHeroMove,
                        },
                    },
                    ClickCoinToUpgrade: {
                        moves: {
                            ClickCoinToUpgradeMove,
                        },
                    },
                    UpgradeCoinVidofnirVedrfolnir: {
                        moves: {
                            UpgradeCoinVidofnirVedrfolnirMove,
                        },
                    },
                    // End
                    ClickCardToPickDistinction: {
                        moves: {
                            ClickCardToPickDistinctionMove,
                        },
                    },
                    // Solo Bot
                    SoloBotClickCardToPickDistinction: {
                        moves: {
                            SoloBotClickCardToPickDistinctionMove,
                        },
                    },
                    // Common Solo Bot Start
                    SoloBotClickHeroCard: {
                        moves: {
                            SoloBotClickHeroCardMove,
                        },
                    },
                    SoloBotPlaceThrudHero: {
                        moves: {
                            SoloBotPlaceThrudHeroMove,
                        },
                    },
                    SoloBotClickCoinToUpgrade: {
                        moves: {
                            SoloBotClickCoinToUpgradeMove,
                        },
                    },
                    // Common Solo Bot End
                    // Solo Bot Andvari
                    SoloBotAndvariClickCardToPickDistinction: {
                        moves: {
                            SoloBotAndvariClickCardToPickDistinctionMove,
                        },
                    },
                    // Common Solo Bot Andvari Start
                    SoloBotAndvariClickHeroCard: {
                        moves: {
                            SoloBotAndvariClickHeroCardMove,
                        },
                    },
                    SoloBotAndvariPlaceThrudHero: {
                        moves: {
                            SoloBotAndvariPlaceThrudHeroMove,
                        },
                    },
                    SoloBotAndvariClickCoinToUpgrade: {
                        moves: {
                            SoloBotAndvariClickCoinToUpgradeMove,
                        },
                    },
                    // Common Solo Bot Andvari End
                },
                onBegin: ({ ...rest }: Context): void => OnTroopEvaluationTurnBegin({ ...rest }),
                onMove: ({ ...rest }: Context): void => OnTroopEvaluationMove({ ...rest }),
                endIf: ({ ...rest }: Context): CanBeVoid<true> => CheckEndTroopEvaluationTurn({ ...rest }),
                onEnd: ({ ...rest }: Context): void => OnTroopEvaluationTurnEnd({ ...rest }),
            },
            next: PhaseNames.Bids,
            moves: {
                ClickDistinctionCardMove,
            },
            onBegin: ({ ...rest }: Context): void => CheckAndResolveTroopEvaluationOrders({ ...rest }),
            endIf: ({ ...rest }: Context): CanBeVoid<boolean> => CheckEndTroopEvaluationPhase({ ...rest }),
            onEnd: ({ ...rest }: Context): void => EndTroopEvaluationPhaseActions({ ...rest }),
        },
        BrisingamensEndGame: {
            turn: {
                order,
                minMoves: 1,
                maxMoves: 1,
                onBegin: ({ ...rest }: Context): void => OnBrisingamensEndGameTurnBegin({ ...rest }),
                onMove: ({ ...rest }: Context): void => OnBrisingamensEndGameMove({ ...rest }),
            },
            moves: {
                DiscardCardFromPlayerBoardMove,
            },
            next: ({ ...rest }: Context): CanBeVoid<PhaseNames> => StartGetMjollnirProfitPhase({ ...rest }),
            onBegin: ({ ...rest }: Context): void => CheckBrisingamensEndGameOrder({ ...rest }),
            endIf: ({ ...rest }: Context): CanBeVoid<true> => CheckEndBrisingamensEndGamePhase({ ...rest }),
            onEnd: ({ ...rest }: Context): void => EndBrisingamensEndGameActions({ ...rest }),
        },
        GetMjollnirProfit: {
            turn: {
                order,
                minMoves: 1,
                maxMoves: 1,
                onBegin: ({ ...rest }: Context): void => OnGetMjollnirProfitTurnBegin({ ...rest }),
                onMove: ({ ...rest }: Context): void => OnGetMjollnirProfitMove({ ...rest }),
            },
            moves: {
                GetMjollnirProfitMove,
            },
            onBegin: ({ ...rest }: Context): void => CheckGetMjollnirProfitOrder({ ...rest }),
            endIf: ({ ...rest }: Context): CanBeVoid<boolean> => CheckEndGetMjollnirProfitPhase({ ...rest }),
            onEnd: ({ ...rest }: Context): void => StartEndGame({ ...rest }),
        },
    },
    endIf: ({ ...rest }: Context): CanBeVoid<boolean> => CheckEndGame({ ...rest }),
    onEnd: ({ ...rest }: Context): CanBeVoid<MyGameState> => ReturnEndGameData({ ...rest }),
    ai: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        enumerate,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        iterations,
        objectives,
        playoutDepth,
    },
};
