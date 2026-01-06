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
const order = TurnOrder.CUSTOM_FROM(`publicPlayersOrder`);
/**
 * <h3>Параметры игры.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При инициализации игрового стола.</li>
 * </ol>
 */
export const BoardGame = {
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
                onBegin: ({ ...rest }) => OnChooseDifficultySoloModeTurnBegin({ ...rest }),
                onMove: ({ ...rest }) => OnChooseDifficultySoloModeMove({ ...rest }),
                endIf: ({ ...rest }) => CheckEndChooseDifficultySoloModeTurn({ ...rest }),
            },
            start: true,
            moves: {
                ChooseDifficultyLevelForSoloModeMove,
            },
            next: ({ ...rest }) => StartChooseDifficultySoloModeAndvariOrBidsPhase({ ...rest }),
            onBegin: ({ ...rest }) => CheckChooseDifficultySoloModeOrder({ ...rest }),
            endIf: ({ ...rest }) => CheckEndChooseDifficultySoloModePhase({ ...rest }),
            onEnd: ({ ...rest }) => EndChooseDifficultySoloModeActions({ ...rest }),
        },
        ChooseDifficultySoloModeAndvari: {
            turn: {
                order,
                onBegin: ({ ...rest }) => OnChooseStrategyForSoloModeAndvariTurnBegin({ ...rest }),
                onMove: ({ ...rest }) => OnChooseStrategyForSoloModeAndvariMove({ ...rest }),
                endIf: ({ ...rest }) => CheckEndChooseStrategyForSoloModeAndvariTurn({ ...rest }),
            },
            moves: {
                ChooseStrategyVariantForSoloModeAndvariMove,
                ChooseStrategyForSoloModeAndvariMove,
            },
            next: PhaseNames.Bids,
            onBegin: ({ ...rest }) => CheckChooseStrategyForSoloModeAndvariOrder({ ...rest }),
            endIf: ({ ...rest }) => CheckChooseStrategyForSoloModeAndvariPhase({ ...rest }),
            onEnd: ({ ...rest }) => EndChooseStrategyForSoloModeAndvariActions({ ...rest }),
        },
        Bids: {
            turn: {
                order,
                endIf: ({ G, ctx, ...rest }) => CheckEndBidsTurn({ G, ctx, ...rest }),
            },
            moves: {
                ClickHandCoinMove,
                ClickBoardCoinMove,
                BotsPlaceAllCoinsMove,
                SoloBotPlaceAllCoinsMove,
                SoloBotAndvariPlaceAllCoinsMove,
            },
            next: ({ ...rest }) => StartBidUlineOrTavernsResolutionPhase({ ...rest }),
            onBegin: ({ ...rest }) => PreparationPhaseActions({ ...rest }),
            endIf: ({ ...rest }) => CheckEndBidsPhase({ ...rest }),
            onEnd: ({ ...rest }) => EndBidsActions({ ...rest }),
        },
        BidUline: {
            turn: {
                order,
            },
            moves: {
                ClickHandCoinUlineMove,
            },
            next: PhaseNames.TavernsResolution,
            onBegin: ({ ...rest }) => CheckBidUlineOrder({ ...rest }),
            endIf: ({ ...rest }) => CheckEndBidUlinePhase({ ...rest }),
            onEnd: ({ ...rest }) => EndBidUlineActions({ ...rest }),
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
                onBegin: ({ ...rest }) => OnTavernsResolutionTurnBegin({ ...rest }),
                onMove: ({ ...rest }) => OnTavernsResolutionMove({ ...rest }),
                endIf: ({ ...rest }) => CheckEndTavernsResolutionTurn({ ...rest }),
                onEnd: ({ ...rest }) => OnTavernsResolutionTurnEnd({ ...rest }),
            },
            moves: {
                ClickCardMove,
                ClickCampCardMove,
                SoloBotClickCardMove,
                SoloBotAndvariClickCardMove,
            },
            next: ({ ...rest }) => StartBidUlineOrTavernsResolutionOrEndTierPhaseOrEndGameLastActionsPhase({ ...rest }),
            onBegin: ({ ...rest }) => ResolveCurrentTavernOrders({ ...rest }),
            endIf: ({ ...rest }) => CheckEndTavernsResolutionPhase({ ...rest }),
            onEnd: ({ ...rest }) => EndTavernsResolutionActions({ ...rest }),
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
                onBegin: ({ ...rest }) => OnEnlistmentMercenariesTurnBegin({ ...rest }),
                onMove: ({ ...rest }) => OnEnlistmentMercenariesMove({ ...rest }),
                endIf: ({ ...rest }) => CheckEndEnlistmentMercenariesTurn({ ...rest }),
            },
            moves: {
                StartEnlistmentMercenariesMove,
                PassEnlistmentMercenariesMove,
                GetEnlistmentMercenariesMove,
            },
            next: ({ ...rest }) => StartEndTierPhaseOrEndGameLastActions({ ...rest }),
            onBegin: ({ ...rest }) => PrepareMercenaryPhaseOrders({ ...rest }),
            endIf: ({ ...rest }) => CheckEndEnlistmentMercenariesPhase({ ...rest }),
            onEnd: ({ ...rest }) => EndEnlistmentMercenariesActions({ ...rest }),
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
                onBegin: ({ ...rest }) => OnPlaceYludTurnBegin({ ...rest }),
                onMove: ({ ...rest }) => OnPlaceYludMove({ ...rest }),
                endIf: ({ ...rest }) => CheckEndPlaceYludTurn({ ...rest }),
            },
            moves: {
                PlaceYludHeroMove,
                SoloBotPlaceYludHeroMove,
                SoloBotAndvariPlaceYludHeroMove,
            },
            next: ({ ...rest }) => StartEndGameLastActions({ ...rest }),
            onBegin: ({ ...rest }) => CheckPlaceYludOrder({ ...rest }),
            endIf: ({ ...rest }) => CheckEndPlaceYludPhase({ ...rest }),
            onEnd: ({ ...rest }) => EndPlaceYludActions({ ...rest }),
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
                onBegin: ({ ...rest }) => OnTroopEvaluationTurnBegin({ ...rest }),
                onMove: ({ ...rest }) => OnTroopEvaluationMove({ ...rest }),
                endIf: ({ ...rest }) => CheckEndTroopEvaluationTurn({ ...rest }),
                onEnd: ({ ...rest }) => OnTroopEvaluationTurnEnd({ ...rest }),
            },
            next: PhaseNames.Bids,
            moves: {
                ClickDistinctionCardMove,
            },
            onBegin: ({ ...rest }) => CheckAndResolveTroopEvaluationOrders({ ...rest }),
            endIf: ({ ...rest }) => CheckEndTroopEvaluationPhase({ ...rest }),
            onEnd: ({ ...rest }) => EndTroopEvaluationPhaseActions({ ...rest }),
        },
        BrisingamensEndGame: {
            turn: {
                order,
                minMoves: 1,
                maxMoves: 1,
                onBegin: ({ ...rest }) => OnBrisingamensEndGameTurnBegin({ ...rest }),
                onMove: ({ ...rest }) => OnBrisingamensEndGameMove({ ...rest }),
            },
            moves: {
                DiscardCardFromPlayerBoardMove,
            },
            next: ({ ...rest }) => StartGetMjollnirProfitPhase({ ...rest }),
            onBegin: ({ ...rest }) => CheckBrisingamensEndGameOrder({ ...rest }),
            endIf: ({ ...rest }) => CheckEndBrisingamensEndGamePhase({ ...rest }),
            onEnd: ({ ...rest }) => EndBrisingamensEndGameActions({ ...rest }),
        },
        GetMjollnirProfit: {
            turn: {
                order,
                minMoves: 1,
                maxMoves: 1,
                onBegin: ({ ...rest }) => OnGetMjollnirProfitTurnBegin({ ...rest }),
                onMove: ({ ...rest }) => OnGetMjollnirProfitMove({ ...rest }),
            },
            moves: {
                GetMjollnirProfitMove,
            },
            onBegin: ({ ...rest }) => CheckGetMjollnirProfitOrder({ ...rest }),
            endIf: ({ ...rest }) => CheckEndGetMjollnirProfitPhase({ ...rest }),
            onEnd: ({ ...rest }) => StartEndGame({ ...rest }),
        },
    },
    endIf: ({ ...rest }) => CheckEndGame({ ...rest }),
    onEnd: ({ ...rest }) => ReturnEndGameData({ ...rest }),
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
//# sourceMappingURL=Game.js.map