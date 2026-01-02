import { ArtefactBuffNames, ArtefactDescriptionNames, ArtefactNames, ArtefactScoringFunctionNames, AutoActionFunctionNames, SuitNames, TierNames } from "../typescript/enums";
import type { ArtefactCardData, ArtefactConfig, MercenariesConfigArray } from "../typescript/interfaces";
import { AllStackData } from "./StackData";

/**
 * <h3>Данные об артефакте.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Используется при обращении к данным артефакта.</li>
 * </ol>
 */
const Brisingamens: ArtefactCardData = {
    name: ArtefactNames.Brisingamens,
    description: ArtefactDescriptionNames.Brisingamens,
    tier: TierNames.Second,
    buff: {
        name: ArtefactBuffNames.DiscardCardEndGame,
    },
    validators: {
        pickDiscardCardToStack: true,
    },
    stack: {
        player: [
            AllStackData.pickDiscardCardBrisingamens(),
            AllStackData.pickDiscardCardBrisingamens(3),
        ],
    },
    scoringRule: {
        name: ArtefactScoringFunctionNames.BasicArtefactScoring,
        params: 0,
    },
};

/**
 * <h3>Данные об артефакте.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Используется при обращении к данным артефакта.</li>
 * </ol>
 */
const Draupnir: ArtefactCardData = {
    name: ArtefactNames.Draupnir,
    description: ArtefactDescriptionNames.Draupnir,
    tier: TierNames.First,
    scoringRule: {
        name: ArtefactScoringFunctionNames.DraupnirScoring,
    },
};

/**
 * <h3>Данные об артефакте.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Используется при обращении к данным артефакта.</li>
 * </ol>
 */
const FafnirBaleygr: ArtefactCardData = {
    name: ArtefactNames.FafnirBaleygr,
    description: ArtefactDescriptionNames.FafnirBaleygr,
    tier: TierNames.First,
    buff: {
        name: ArtefactBuffNames.GoCamp,
    },
    scoringRule: {
        name: ArtefactScoringFunctionNames.BasicArtefactScoring,
        params: 0,
    },
};

/**
 * <h3>Данные об артефакте.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Используется при обращении к данным артефакта.</li>
 * </ol>
 */
const Gjallarhorn: ArtefactCardData = {
    name: ArtefactNames.Gjallarhorn,
    description: ArtefactDescriptionNames.Gjallarhorn,
    tier: TierNames.Second,
    actions: {
        name: AutoActionFunctionNames.AddPickHeroAction,
        params: [2],
    },
    scoringRule: {
        name: ArtefactScoringFunctionNames.BasicArtefactScoring,
        params: 0,
    },
};

/**
 * <h3>Данные об артефакте.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Используется при обращении к данным артефакта.</li>
 * </ol>
 */
const Hofud: ArtefactCardData = {
    name: ArtefactNames.Hofud,
    description: ArtefactDescriptionNames.Hofud,
    tier: TierNames.Second,
    actions: {
        name: AutoActionFunctionNames.StartDiscardSuitCardAction,
    },
    stack: {
        player: [AllStackData.discardSuitCardHofud()],
    },
    scoringRule: {
        name: ArtefactScoringFunctionNames.BasicArtefactScoring,
        params: 0,
    },
};

/**
 * <h3>Данные об артефакте.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Используется при обращении к данным артефакта.</li>
 * </ol>
 */
const Hrafnsmerki: ArtefactCardData = {
    name: ArtefactNames.Hrafnsmerki,
    description: ArtefactDescriptionNames.Hrafnsmerki,
    tier: TierNames.Second,
    scoringRule: {
        name: ArtefactScoringFunctionNames.HrafnsmerkiScoring,
    },
};

/**
 * <h3>Данные об артефакте.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Используется при обращении к данным артефакта.</li>
 * </ol>
 */
const Jarnglofi: ArtefactCardData = {
    name: ArtefactNames.Jarnglofi,
    description: ArtefactDescriptionNames.Jarnglofi,
    tier: TierNames.Second,
    actions: {
        name: AutoActionFunctionNames.DiscardTradingCoinAction,
    },
    scoringRule: {
        name: ArtefactScoringFunctionNames.BasicArtefactScoring,
        params: 24,
    },
};

/**
 * <h3>Данные об артефакте.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Используется при обращении к данным артефакта.</li>
 * </ol>
 */
const Megingjord: ArtefactCardData = {
    name: ArtefactNames.Megingjord,
    description: ArtefactDescriptionNames.Megingjord,
    tier: TierNames.First,
    buff: {
        name: ArtefactBuffNames.NoHero,
    },
    scoringRule: {
        name: ArtefactScoringFunctionNames.BasicArtefactScoring,
        params: 28,
    },
};

/**
 * <h3>Данные об артефакте.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Используется при обращении к данным артефакта.</li>
 * </ol>
 */
const Mjollnir: ArtefactCardData = {
    name: ArtefactNames.Mjollnir,
    description: ArtefactDescriptionNames.Mjollnir,
    tier: TierNames.Second,
    buff: {
        name: ArtefactBuffNames.GetMjollnirProfit,
    },
    scoringRule: {
        name: ArtefactScoringFunctionNames.MjollnirScoring,
    },
};

/**
 * <h3>Данные об артефакте.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Используется при обращении к данным артефакта.</li>
 * </ol>
 */
const OdroerirTheMythicCauldron: ArtefactCardData = {
    name: ArtefactNames.OdroerirTheMythicCauldron,
    description: ArtefactDescriptionNames.OdroerirTheMythicCauldron,
    tier: TierNames.Second,
    actions: {
        name: AutoActionFunctionNames.FinishOdroerirTheMythicCauldronAction,
    },
    scoringRule: {
        name: ArtefactScoringFunctionNames.OdroerirTheMythicCauldronScoring,
    },
};

/**
 * <h3>Данные об артефакте.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Используется при обращении к данным артефакта.</li>
 * </ol>
 */
const Svalinn: ArtefactCardData = {
    name: ArtefactNames.Svalinn,
    description: ArtefactDescriptionNames.Svalinn,
    tier: TierNames.First,
    scoringRule: {
        name: ArtefactScoringFunctionNames.SvalinnScoring,
    },
};

/**
 * <h3>Данные об артефакте.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Используется при обращении к данным артефакта.</li>
 * </ol>
 */
const Vegvisir: ArtefactCardData = {
    name: ArtefactNames.Vegvisir,
    description: ArtefactDescriptionNames.Vegvisir,
    tier: TierNames.First,
    playerSuit: SuitNames.explorer,
    rank: 1,
    points: 13,
    scoringRule: {
        name: ArtefactScoringFunctionNames.BasicArtefactScoring,
        params: 0,
    },
};

/**
 * <h3>Данные об артефакте.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Используется при обращении к данным артефакта.</li>
 * </ol>
 */
const VidofnirVedrfolnir: ArtefactCardData = {
    name: ArtefactNames.VidofnirVedrfolnir,
    description: ArtefactDescriptionNames.VidofnirVedrfolnir,
    tier: TierNames.First,
    actions: {
        name: AutoActionFunctionNames.StartVidofnirVedrfolnirAction,
    },
    scoringRule: {
        name: ArtefactScoringFunctionNames.BasicArtefactScoring,
        params: 0,
    },
};

/**
 * <h3>Конфиг карт наёмников для лагеря.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при создании всех карт артефактов для лагеря при инициализации игры.</li>
 * </ol>
 */
export const mercenariesConfig: MercenariesConfigArray = [
    [
        {
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
        {
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
        {
            hunter: {
                suit: SuitNames.hunter,
                rank: 1,
                points: null,
            },
            explorer: {
                suit: SuitNames.explorer,
                rank: 1,
                points: 6,
            },
        },
        {
            hunter: {
                suit: SuitNames.hunter,
                rank: 1,
                points: null,
            },
            miner: {
                suit: SuitNames.miner,
                rank: 1,
                points: 1,
            },
        },
        {
            blacksmith: {
                suit: SuitNames.blacksmith,
                rank: 1,
                points: null,
            },
            miner: {
                suit: SuitNames.miner,
                rank: 1,
                points: 1,
            },
        },
        {
            warrior: {
                suit: SuitNames.warrior,
                rank: 1,
                points: 9,
            },
            explorer: {
                suit: SuitNames.explorer,
                rank: 1,
                points: 11,
            },
        },
    ],
    [
        {
            hunter: {
                suit: SuitNames.hunter,
                rank: 1,
                points: null,
            },
            blacksmith: {
                suit: SuitNames.blacksmith,
                rank: 1,
                points: null,
            },
        },
        {
            warrior: {
                suit: SuitNames.warrior,
                rank: 1,
                points: 6,
            },
            miner: {
                suit: SuitNames.miner,
                rank: 1,
                points: 1,
            },
        },
        {
            blacksmith: {
                suit: SuitNames.blacksmith,
                rank: 1,
                points: null,
            },
            explorer: {
                suit: SuitNames.explorer,
                rank: 1,
                points: 8,
            },
        },
        {
            warrior: {
                suit: SuitNames.warrior,
                rank: 1,
                points: 6,
            },
            hunter: {
                suit: SuitNames.hunter,
                rank: 1,
                points: null,
            },
        },
        {
            explorer: {
                suit: SuitNames.explorer,
                rank: 1,
                points: 8,
            },
            miner: {
                suit: SuitNames.miner,
                rank: 1,
                points: 1,
            },
        },
        {
            warrior: {
                suit: SuitNames.warrior,
                rank: 1,
                points: 9,
            },
            explorer: {
                suit: SuitNames.explorer,
                rank: 1,
                points: 11,
            },
        },
    ],
];

/**
 * <h3>Конфиг карт артефактов для лагеря.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при создании всех карт артефактов для лагеря при инициализации игры.</li>
 * </ol>
 */
export const artefactsConfig: ArtefactConfig = {
    Brisingamens,
    Draupnir,
    FafnirBaleygr,
    Gjallarhorn,
    Hofud,
    Hrafnsmerki,
    Jarnglofi,
    Megingjord,
    Mjollnir,
    OdroerirTheMythicCauldron,
    Svalinn,
    Vegvisir,
    VidofnirVedrfolnir,
};
