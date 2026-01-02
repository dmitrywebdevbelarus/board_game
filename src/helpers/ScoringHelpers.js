import { artefactsConfig } from "../data/CampData";
import { heroesConfig } from "../data/HeroData";
import { giantConfig, godConfig, mythicalAnimalConfig, valkyryConfig } from "../data/MythologicalCreatureData";
import { suitsConfig } from "../data/SuitData";
import { StartArtefactScoring } from "../dispatchers/ArtefactScoringDispatcher";
import { StartDistinctionAwarding } from "../dispatchers/DistinctionAwardingDispatcher";
import { StartGiantScoring } from "../dispatchers/GiantScoringDispatcher";
import { StartHeroScoring } from "../dispatchers/HeroScoringDispatcher";
import { StartMythicalAnimalScoring } from "../dispatchers/MythicalAnimalDispatcher";
import { StartSuitScoring } from "../dispatchers/SuitScoringDispatcher";
import { StartValkyryScoring } from "../dispatchers/ValkyryScoringDispatcherHelpers";
import { ThrowMyError } from "../Error";
import { AssertCurrentPlayerCoinsScore, AssertDwergBrothersScoringArrayIndex, AssertMinerDistinctionsScoring, AssertPlayerCoinId, AssertRoyalCoinValue } from "../is_helpers/AssertionTypeHelpers";
import { IsCoin } from "../is_helpers/IsCoinTypeHelpers";
import { IsMythicalAnimalPlayerCard } from "../is_helpers/IsMythologicalCreatureTypeHelpers";
import { AddDataToLog } from "../Logging";
import { CheckCurrentSuitDistinctionPlayers } from "../TroopEvaluation";
import { CardRusNames, ErrorNames, GameModeNames, LogNames, MythicalAnimalBuffNames, PlayerIdForSoloGameNames, SuitNames, SuitRusNames } from "../typescript/enums";
import { CheckPlayerHasBuff } from "./BuffHelpers";
import { GetMinerDistinctionsScore } from "./DistinctionAwardingHelpers";
export const CurrentAllSuitsScoring = ({ ...rest }, playerID) => {
    let totalScore = 0, suit;
    for (suit in suitsConfig) {
        totalScore += GetCurrentSuitTotalScore({ ...rest }, playerID, suit);
    }
    return totalScore;
};
export const CurrentPotentialMinerDistinctionsScoring = ({ ...rest }, playerID) => GetMinerDistinctionsScore({ ...rest }, playerID);
export const CurrentPotentialWarriorDistinctionsScoring = ({ G, ...rest }, playerID) => {
    // TODO Have same logic as FinalWarriorDistinctionsScoring
    const player = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError({ G, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
    }
    let totalScore = 0;
    const warriorDistinctions = CheckCurrentSuitDistinctionPlayers({ G, ...rest }, SuitNames.warrior);
    if (warriorDistinctions.some((maxWarriorDistinctionPlayerID) => playerID === maxWarriorDistinctionPlayerID)) {
        totalScore += player.currentMaxCoinValue;
    }
    return totalScore;
};
export const CurrentOrFinalAllHeroesScoring = ({ G, ...rest }, playerID, isFinal = false) => {
    const player = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError({ G, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
    }
    let totalScore = 0, heroesScore = 0, dwergBrothersNum = 0;
    const dwerg_brothers_scoring = [
        0,
        13,
        40,
        81,
        108,
        135,
    ];
    for (let i = 0; i < player.heroes.length; i++) {
        const hero = player.heroes[i];
        if (hero === undefined) {
            throw new Error(`Не существует карта героя с id '${i}'.`);
        }
        const heroData = heroesConfig[hero.name];
        if (((G.mode === GameModeNames.Basic || G.mode === GameModeNames.Multiplayer
            || G.mode === GameModeNames.SoloAndvari) || G.mode === GameModeNames.Solo
            && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId)
            && hero.name.startsWith(`Dwerg`)) {
            dwergBrothersNum += StartHeroScoring({ G, ...rest }, playerID, heroData.scoringRule);
        }
        else {
            const currentHeroScore = StartHeroScoring({ G, ...rest }, playerID, heroData.scoringRule);
            heroesScore += currentHeroScore;
            if (isFinal) {
                AddDataToLog({ G, ...rest }, LogNames.Private, `Очки за карту '${CardRusNames.HeroCard}' '${hero.name}' ${(G.mode === GameModeNames.Solo || G.mode === GameModeNames.SoloAndvari) && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId ? `соло бота` : `игрока '${player.nickname}'`}': '${currentHeroScore}';`);
            }
        }
    }
    AssertDwergBrothersScoringArrayIndex(dwergBrothersNum);
    if (((G.mode === GameModeNames.Basic || G.mode === GameModeNames.Multiplayer
        || G.mode === GameModeNames.SoloAndvari) || (G.mode === GameModeNames.Solo &&
        playerID === PlayerIdForSoloGameNames.SoloBotPlayerId)) && dwergBrothersNum) {
        const dwerg_brother_value = dwerg_brothers_scoring[dwergBrothersNum];
        heroesScore += dwerg_brother_value;
        if (isFinal) {
            AddDataToLog({ G, ...rest }, LogNames.Private, `Очки за героев братьев Двергов (${dwergBrothersNum} шт.) ${G.mode === GameModeNames.Solo ? `соло бота` : `игрока '${player.nickname}'`}: '${dwerg_brothers_scoring[dwergBrothersNum]}';`);
        }
    }
    totalScore += heroesScore;
    if (isFinal) {
        AddDataToLog({ G, ...rest }, LogNames.Public, `Очки за карты типа '${CardRusNames.HeroCard}' ${(G.mode === GameModeNames.Solo || G.mode === GameModeNames.SoloAndvari) && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId ? `соло бота` : `игрока '${player.nickname}'`}: ;${heroesScore};'`);
    }
    return totalScore;
};
export const CurrentOrFinalAllMythologicalCreaturesScoring = ({ G, ...rest }, playerID, isFinal = false) => {
    const player = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError({ G, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
    }
    let totalScore = 0, godsScore = 0, giantsScore = 0, valkyriesScore = 0, mythicalAnimalScore = 0;
    for (let i = 0; i < player.mythologicalCreatureCards.length; i++) {
        const mythologicalCreatureCard = player.mythologicalCreatureCards[i];
        if (mythologicalCreatureCard === undefined) {
            throw new Error(`В массиве карт мифических существ игрока с id '${playerID}' в командной зоне отсутствует карта с id '${i}'.`);
        }
        let godCard, giantCard, valkyryCard, currentGiantScore, currentValkyryScore, _exhaustiveCheck;
        switch (mythologicalCreatureCard.type) {
            case CardRusNames.GodCard:
                godCard = godConfig[mythologicalCreatureCard.name];
                godsScore += godCard.points;
                if (isFinal) {
                    AddDataToLog({ G, ...rest }, LogNames.Private, `Очки за карту '${CardRusNames.GodCard}' '${mythologicalCreatureCard.name}' игрока '${player.nickname}': '${godCard.points}';`);
                }
                break;
            case CardRusNames.GiantCard:
                giantCard = giantConfig[mythologicalCreatureCard.name];
                currentGiantScore = StartGiantScoring({ G, ...rest }, playerID, giantCard.scoringRule);
                giantsScore += currentGiantScore;
                if (isFinal) {
                    AddDataToLog({ G, ...rest }, LogNames.Private, `Очки за карту '${CardRusNames.GiantCard}' '${mythologicalCreatureCard.name}' игрока '${player.nickname}': '${currentGiantScore}';`);
                }
                break;
            case CardRusNames.ValkyryCard:
                valkyryCard = valkyryConfig[mythologicalCreatureCard.name];
                if (mythologicalCreatureCard.strengthTokenNotch === null) {
                    throw new Error(`В массиве карт мифических существ игрока с id '${playerID}' у карты типа '${CardRusNames.ValkyryCard}' с названием '${mythologicalCreatureCard.name}' не может не быть выставлен токен силы.`);
                }
                currentValkyryScore = StartValkyryScoring(valkyryCard.scoringRule, [mythologicalCreatureCard.strengthTokenNotch]);
                valkyriesScore += currentValkyryScore;
                if (isFinal) {
                    AddDataToLog({ G, ...rest }, LogNames.Private, `Очки за карту типа '${CardRusNames.ValkyryCard}' '${mythologicalCreatureCard.name}' игрока '${player.nickname}': '${currentValkyryScore}';`);
                }
                break;
            default:
                _exhaustiveCheck = mythologicalCreatureCard;
                throw new Error(`В массиве карт мифических существ игрока карта не может быть с недопустимым типом.`);
                return _exhaustiveCheck;
        }
    }
    const cards = Object.values(player.cards).flat().filter(IsMythicalAnimalPlayerCard);
    for (let m = 0; m < cards.length; m++) {
        const playerMythicalAnimalCard = cards[m];
        if (playerMythicalAnimalCard === undefined) {
            throw new Error(`В массиве карт мифических существ игрока с id '${playerID}' отсутствует карта с id '${m}'.`);
        }
        const mythicalAnimalCard = mythicalAnimalConfig[playerMythicalAnimalCard.name], currentMythicalAnimalScore = StartMythicalAnimalScoring({ G, ...rest }, playerID, mythicalAnimalCard.scoringRule);
        mythicalAnimalScore += currentMythicalAnimalScore;
        if (isFinal) {
            AddDataToLog({ G, ...rest }, LogNames.Private, `Очки за карту типа '${CardRusNames.MythicalAnimalCard}' '${playerMythicalAnimalCard.name}' игрока '${player.nickname}': '${currentMythicalAnimalScore}';`);
        }
    }
    totalScore += godsScore + giantsScore + valkyriesScore;
    if (isFinal) {
        AddDataToLog({ G, ...rest }, LogNames.Public, `Очки за карты типа '${CardRusNames.GodCard}' игрока '${player.nickname}': '${godsScore}';`);
        AddDataToLog({ G, ...rest }, LogNames.Public, `Очки за карты типа '${CardRusNames.GiantCard}' игрока '${player.nickname}': '${giantsScore}';`);
        AddDataToLog({ G, ...rest }, LogNames.Public, `Очки за карты типа '${CardRusNames.ValkyryCard}' игрока '${player.nickname}': '${valkyriesScore}';`);
        AddDataToLog({ G, ...rest }, LogNames.Public, `Очки за карты типа '${CardRusNames.MythicalAnimalCard}' игрока '${player.nickname}': '${mythicalAnimalScore}';`);
    }
    return totalScore;
};
export const CurrentOrFinalAllArtefactScoring = ({ G, ...rest }, playerID, isFinal = false) => {
    const player = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError({ G, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
    }
    let totalScore = 0, artifactsScore = 0;
    for (let i = 0; i < player.campCards.length; i++) {
        const campCard = player.campCards[i];
        if (campCard === undefined) {
            throw new Error(`В массиве карт лагеря игрока отсутствует карта с id '${i}'.`);
        }
        let currentArtefactScore = 0, _exhaustiveCheck;
        switch (campCard.type) {
            case CardRusNames.ArtefactCard:
                currentArtefactScore = StartArtefactScoring({ G, ...rest }, playerID, artefactsConfig[campCard.name].scoringRule, isFinal);
                if (currentArtefactScore) {
                    artifactsScore += currentArtefactScore;
                    if (isFinal) {
                        AddDataToLog({ G, ...rest }, LogNames.Private, `Очки за карту '${CardRusNames.ArtefactCard}' '${campCard.name}' игрока '${player.nickname}': '${currentArtefactScore}';`);
                    }
                }
                break;
            case CardRusNames.MercenaryCard:
                // TODO How potentially score not final mercenary card in command zone...!?
                if (isFinal) {
                    throw new Error(`В командной зоне карт лагеря игрока не может в конце игры быть карта c типом '${CardRusNames.MercenaryCard}' с id '${i}'.`);
                }
                break;
            default:
                _exhaustiveCheck = campCard;
                throw new Error(`В командной зоне карт лагеря игрока не может быть карта запрещённого типа с id '${i}'.`);
                return _exhaustiveCheck;
        }
    }
    totalScore += artifactsScore;
    if (isFinal) {
        AddDataToLog({ G, ...rest }, LogNames.Public, `Очки за карты типа '${CardRusNames.ArtefactCard}' игрока '${player.nickname}': '${artifactsScore}';`);
    }
    return totalScore;
};
export const FinalAllSuitsScoring = ({ G, ...rest }, playerID) => {
    const player = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError({ G, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
    }
    let totalScore = 0, suitScore = 0, suit;
    for (suit in suitsConfig) {
        suitScore += GetCurrentSuitTotalScore({ G, ...rest }, playerID, suit);
        AddDataToLog({ G, ...rest }, LogNames.Public, `Очки за карты '${CardRusNames.DwarfCard}' фракции '${SuitRusNames[suit]}' ${(G.mode === GameModeNames.Solo || G.mode === GameModeNames.SoloAndvari) && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId ? `соло бота` : `игрока '${player.nickname}'`}: ${suitScore}`);
        totalScore += suitScore;
    }
    AddDataToLog({ G, ...rest }, LogNames.Public, `Очки за все карты '${CardRusNames.DwarfCard}' ${(G.mode === GameModeNames.Solo || G.mode === GameModeNames.SoloAndvari) && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId ? `соло бота` : `игрока '${player.nickname}'`}: ${totalScore}`);
    return totalScore;
};
export const FinalAllBoardCoinsScoring = ({ G, ...rest }, playerID) => {
    const player = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError({ G, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
    }
    let totalScore = 0;
    for (let i = 0; i < player.boardCoins.length; i++) {
        AssertPlayerCoinId(i);
        const boardCoin = player.boardCoins[i];
        if (boardCoin !== null && !IsCoin(boardCoin)) {
            throw new Error(`В массиве монет ${(G.mode === GameModeNames.Solo || G.mode === GameModeNames.SoloAndvari) && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId ? `соло бота` : `игрока '${player.nickname}'`} с id '${playerID}' на столе не может не быть монеты с id '${i}'.`);
        }
        if (IsCoin(boardCoin) && !boardCoin.isOpened) {
            throw new Error(`В массиве монет ${(G.mode === GameModeNames.Solo || G.mode === GameModeNames.SoloAndvari) && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId ? `соло бота` : `игрока '${player.nickname}'`} с id '${playerID}' на столе должна быть ранее открыта монета с id '${i}' в конце игры.`);
        }
        if (IsCoin(boardCoin)) {
            totalScore += boardCoin.value;
        }
    }
    AssertCurrentPlayerCoinsScore(totalScore);
    AddDataToLog({ G, ...rest }, LogNames.Public, `Очки за все монеты ${(G.mode === GameModeNames.Solo || G.mode === GameModeNames.SoloAndvari) && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId ? `соло бота` : `игрока '${player.nickname}'`}: '${totalScore}';`);
    return totalScore;
};
export const FinalMinerDistinctionsScoring = ({ G, ...rest }, playerID) => {
    const player = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError({ G, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
    }
    const totalScore = StartDistinctionAwarding({ G, ...rest }, playerID, suitsConfig[SuitNames.miner].distinction.awarding);
    if (totalScore) {
        AddDataToLog({ G, ...rest }, LogNames.Public, `Очки за кристалл преимущества по фракции '${SuitRusNames.miner}' ${(G.mode === GameModeNames.Solo || G.mode === GameModeNames.SoloAndvari) && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId ? `соло бота` : `игрока '${player.nickname}'`}: '${totalScore}';`);
    }
    AssertMinerDistinctionsScoring(totalScore);
    return totalScore;
};
export const FinalWarriorDistinctionsScoring = ({ G, ...rest }, playerID) => {
    // TODO Have same logic as CurrentPotentialWarriorDistinctionsScoring
    const player = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError({ G, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
    }
    let totalScore = 0;
    const warriorDistinctions = CheckCurrentSuitDistinctionPlayers({ G, ...rest }, SuitNames.warrior, true);
    if (warriorDistinctions.some((maxWarriorDistinctionPlayerID) => playerID === maxWarriorDistinctionPlayerID)) {
        totalScore += StartDistinctionAwarding({ G, ...rest }, playerID, suitsConfig[SuitNames.warrior].distinction.awarding);
        if (totalScore) {
            AddDataToLog({ G, ...rest }, LogNames.Public, `Очки за преимущество по фракции '${SuitRusNames.warrior}' ${(G.mode === GameModeNames.Solo || G.mode === GameModeNames.SoloAndvari) && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId ? `соло бота` : `игрока '${player.nickname}'`}: '${totalScore}';`);
        }
    }
    AssertRoyalCoinValue(totalScore);
    return totalScore;
};
const GetCurrentSuitTotalScore = ({ G, ...rest }, playerID, suit) => {
    const player = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError({ G, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
    }
    let additionalScoring = false;
    if (G.expansions.Idavoll.active) {
        additionalScoring = CheckPlayerHasBuff({ G, ...rest }, playerID, MythicalAnimalBuffNames.RatatoskFinalScoring);
    }
    return StartSuitScoring(suitsConfig[suit].scoringRule, [
        player.cards[suit],
        undefined,
        additionalScoring,
    ]);
};
//# sourceMappingURL=ScoringHelpers.js.map