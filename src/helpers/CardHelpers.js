import { AllStackData } from "../data/StackData";
import { suitsConfig } from "../data/SuitData";
import { StartAutoAction } from "../dispatchers/AutoActionDispatcher";
import { ThrowMyError } from "../Error";
import { AddDataToLog } from "../Logging";
import { CardRusNames, ErrorNames, GameModeNames, GiantBuffNames, GiantNames, GodNames, HeroNames, LogNames, MythicalAnimalBuffNames, PhaseNames, PlayerIdForSoloGameNames, SuitNames, ValkyryBuffNames } from "../typescript/enums";
import { CheckPlayerHasBuff } from "./BuffHelpers";
import { AddCampCardToCards } from "./CampCardHelpers";
import { DiscardCurrentCard } from "./DiscardCardHelpers";
import { AddDwarfToPlayerCards } from "./DwarfCardHelpers";
import { CheckIsStartUseGodAbility } from "./GodAbilityHelpers";
import { CheckAndMoveThrudAction } from "./HeroActionHelpers";
import { AddHeroToPlayerCards } from "./HeroCardHelpers";
import { AddMultiSuitCardToPlayerCards } from "./MultiSuitCardHelpers";
import { AddMythicalAnimalToPlayerCards } from "./MythologicalCreatureCardHelpers";
import { CheckIfRecruitedCardEqualSuitIdForOlrun, CheckValkyryRequirement } from "./MythologicalCreatureHelpers";
import { AddSpecialCardToPlayerCards } from "./SpecialCardHelpers";
import { AddActionsToStack } from "./StackHelpers";
/**
 * <h3>Добавляет взятую карту в массив карт игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при взятии карты из текущей таверны.</li>
 * <li>Происходит при взятии карты из карт преимущества по разведчикам в конце 1 эпохи.</li>
 * <li>Происходит при взятии карты из сброса при активации героя.</li>
 * <li>Происходит при взятии карты из сброса при активации карты лагеря.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param card Карта.
 * @returns
 */
export const AddCardToPlayerBoardCards = ({ G, ...rest }, playerID, card) => {
    const player = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError({ G, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
    }
    let _exhaustiveCheck;
    if (G.expansions.Idavoll.active) {
        // TODO Add Enum PlayerBoardCardTypeRusNames
        // TODO Fix it both time!
        switch (card.type) {
            case CardRusNames.DwarfPlayerCard:
            case CardRusNames.MercenaryPlayerCard:
            case CardRusNames.MythicalAnimalPlayerCard:
            case CardRusNames.SpecialPlayerCard:
            case CardRusNames.ArtefactPlayerCard:
                if (G.expansions.Idavoll.active) {
                    // TODO Can rework it!?
                    if (!(card.name === HeroNames.Thrud || HeroNames.Ylud)) {
                        if (CheckIfRecruitedCardEqualSuitIdForOlrun({ G, ...rest }, playerID, card.suit)) {
                            CheckValkyryRequirement({ G, ...rest }, playerID, ValkyryBuffNames.CountPickedCardClassRankAmount);
                        }
                    }
                }
                break;
            default:
                break;
        }
    }
    switch (card.type) {
        case CardRusNames.DwarfPlayerCard:
        case CardRusNames.HeroPlayerCard:
        case CardRusNames.MercenaryPlayerCard:
        case CardRusNames.MythicalAnimalPlayerCard:
        case CardRusNames.SpecialPlayerCard:
        case CardRusNames.MultiSuitPlayerCard:
        case CardRusNames.ArtefactPlayerCard:
            player.cards[card.suit].push(card);
            AddDataToLog({ G, ...rest }, LogNames.Public, `Игрок '${player.nickname}' выбрал карту '${card.type}' '${card.name}' во фракцию '${suitsConfig[card.suit].suitName}'.`);
            break;
        default:
            _exhaustiveCheck = card;
            throw new Error(`Карта имеющая принадлежность к фракции должна быть добавлена на стол игрока.`);
            return _exhaustiveCheck;
    }
    if (card.name !== HeroNames.Thrud) {
        CheckAndMoveThrudAction({ G, ...rest }, playerID, card);
    }
};
/**
 * <h3>Добавляет взятую карту Idavoll в командную зону карт Idavoll игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при взятии карты из текущей таверны.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param card Карта.
 * @returns
 */
const AddMythologicalCreatureCardToPlayerCommandZone = ({ G, ...rest }, playerID, card) => {
    const player = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError({ G, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
    }
    let _exhaustiveCheck;
    switch (card.type) {
        case CardRusNames.GodCard:
            card.isActivated = false;
            break;
        case CardRusNames.GiantCard:
            card.isActivated = false;
            player.giantTokenSuits[card.placedSuit] = true;
            break;
        case CardRusNames.ValkyryCard:
            card.strengthTokenNotch = 0;
            break;
        default:
            _exhaustiveCheck = card;
            throw new Error(`Добавленная в командную зону для карт мифических существ карта не может быть с недопустимым типом.`);
            return _exhaustiveCheck;
    }
    player.mythologicalCreatureCards.push(card);
    AddDataToLog({ G, ...rest }, LogNames.Public, `Игрок '${player.nickname}' выбрал карту '${card.type}' '${card.name}' в командную зону карт Idavoll.`);
};
// TODO Rework func description!!!
/**
 * <h3>Добавляет взятую карту в массив карт игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при взятии карты из текущей таверны.</li>
 * <li>Происходит при взятии карты из карт преимущества по разведчикам в конце 1 эпохи.</li>
 * <li>Происходит при взятии карты из сброса при активации героя.</li>
 * <li>Происходит при взятии карты из сброса при активации карты лагеря.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param pickedCard Выбранная карта дворфа/мифического существа или улучшения монет.
 * @returns Добавлена ли карта на поле игрока.
 */
export const AddAnyCardToPlayerActions = ({ G, ctx, ...rest }, playerID, pickedCard) => {
    var _a, _b;
    const player = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError({ G, ctx, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
    }
    let finalPickedCard = pickedCard, startGiant = false, _exhaustiveCheck;
    switch (pickedCard.type) {
        case CardRusNames.SpecialCard:
            finalPickedCard = AddSpecialCardToPlayerCards(pickedCard);
            break;
        case CardRusNames.MultiSuitCard:
            finalPickedCard = AddMultiSuitCardToPlayerCards(pickedCard);
            break;
        case CardRusNames.ArtefactCard:
        case CardRusNames.MercenaryCard:
            finalPickedCard = AddCampCardToCards({ G, ctx, ...rest }, playerID, pickedCard);
            break;
        case CardRusNames.HeroCard:
            finalPickedCard = AddHeroToPlayerCards({ G, ctx, ...rest }, playerID, pickedCard);
            break;
        case CardRusNames.DwarfCard:
            if (G.expansions.Idavoll.active) {
                if (ctx.phase === PhaseNames.TavernsResolution && ctx.activePlayers === null) {
                    switch (pickedCard.playerSuit) {
                        case SuitNames.blacksmith:
                            if (CheckPlayerHasBuff({ G, ctx, ...rest }, playerID, GiantBuffNames.PlayerHasActiveGiantThrivaldi)) {
                                AddActionsToStack({ G, ctx, ...rest }, playerID, [AllStackData.activateGiantAbilityOrPickCard(GiantNames.Thrivaldi, pickedCard)]);
                                startGiant = true;
                            }
                            break;
                        case SuitNames.explorer:
                            if (CheckPlayerHasBuff({ G, ctx, ...rest }, playerID, GiantBuffNames.PlayerHasActiveGiantGymir)) {
                                AddActionsToStack({ G, ctx, ...rest }, playerID, [AllStackData.activateGiantAbilityOrPickCard(GiantNames.Gymir, pickedCard)]);
                                startGiant = true;
                            }
                            break;
                        case SuitNames.hunter:
                            if (CheckPlayerHasBuff({ G, ctx, ...rest }, playerID, GiantBuffNames.PlayerHasActiveGiantSkymir)) {
                                AddActionsToStack({ G, ctx, ...rest }, playerID, [AllStackData.activateGiantAbilityOrPickCard(GiantNames.Skymir, pickedCard)]);
                                startGiant = true;
                            }
                            break;
                        case SuitNames.miner:
                            if (CheckPlayerHasBuff({ G, ctx, ...rest }, playerID, GiantBuffNames.PlayerHasActiveGiantHrungnir)) {
                                AddActionsToStack({ G, ctx, ...rest }, playerID, [AllStackData.activateGiantAbilityOrPickCard(GiantNames.Hrungnir, pickedCard)]);
                                startGiant = true;
                            }
                            break;
                        case SuitNames.warrior:
                            if (CheckPlayerHasBuff({ G, ctx, ...rest }, playerID, GiantBuffNames.PlayerHasActiveGiantSurt)) {
                                AddActionsToStack({ G, ctx, ...rest }, playerID, [AllStackData.activateGiantAbilityOrPickCard(GiantNames.Surt, pickedCard)]);
                                startGiant = true;
                            }
                            break;
                        default:
                            _exhaustiveCheck = pickedCard;
                            throw new Error(`Карта имеющая принадлежность к фракции должна быть добавлена на стол игрока.`);
                            return _exhaustiveCheck;
                    }
                }
            }
            // TODO Check if i have Giant and not captured dwarf activate Capturing Or Dwarf Picking
            if (!startGiant) {
                if (!(G.expansions.Idavoll.active
                    && CheckIsStartUseGodAbility({ G, ctx, ...rest }, ctx.currentPlayer, GodNames.Frigg))) {
                    finalPickedCard = AddDwarfToPlayerCards(pickedCard);
                }
            }
            break;
        case CardRusNames.MythicalAnimalCard:
            finalPickedCard = AddMythicalAnimalToPlayerCards(pickedCard);
            break;
        case CardRusNames.RoyalOfferingCard:
            if (!(G.expansions.Idavoll.active && ctx.phase === PhaseNames.TavernsResolution
                && ctx.activePlayers === null
                && CheckIsStartUseGodAbility({ G, ctx, ...rest }, ctx.currentPlayer, GodNames.Frigg))) {
                // TODO Move all Log from pickedCard to bottom of the func and to playerCards!
                AddDataToLog({ G, ctx, ...rest }, LogNames.Public, `Игрок '${player.nickname}' выбрал карту '${pickedCard.type}' '${pickedCard.name}'.`);
                DiscardCurrentCard({ G, ctx, ...rest }, pickedCard);
                AddDataToLog({ G, ctx, ...rest }, LogNames.Game, `Карта '${pickedCard.type}' '${pickedCard.name}' убрана в сброс после применения её эффекта.`);
            }
            break;
        case CardRusNames.GodCard:
        case CardRusNames.GiantCard:
        case CardRusNames.ValkyryCard:
            if (G.expansions.Idavoll.active) {
                AddMythologicalCreatureCardToPlayerCommandZone({ G, ctx, ...rest }, playerID, pickedCard);
            }
            break;
        default:
            _exhaustiveCheck = pickedCard;
            throw new Error(`Добавленная на поле игрока карта не может быть с недопустимым типом.`);
            return _exhaustiveCheck;
    }
    if (`suit` in finalPickedCard) {
        AddCardToPlayerBoardCards({ G, ctx, ...rest }, playerID, finalPickedCard);
    }
    if (`stack` in pickedCard && pickedCard.stack !== undefined) {
        if (G.mode === GameModeNames.Solo && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId) {
            AddActionsToStack({ G, ctx, ...rest }, playerID, (_a = pickedCard.stack.soloBot) !== null && _a !== void 0 ? _a : pickedCard.stack.player, pickedCard);
        }
        else if (G.mode === GameModeNames.SoloAndvari && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId) {
            AddActionsToStack({ G, ctx, ...rest }, playerID, (_b = pickedCard.stack.soloBotAndvari) !== null && _b !== void 0 ? _b : pickedCard.stack.player, pickedCard);
        }
        else {
            if (!(G.expansions.Idavoll.active && (pickedCard.name === HeroNames.Bonfur
                || pickedCard.name === HeroNames.CrovaxTheDoppelganger
                || (pickedCard.name === HeroNames.Dagda && CheckPlayerHasBuff({ G, ctx, ...rest }, playerID, MythicalAnimalBuffNames.DagdaDiscardOnlyOneCards))) && CheckIsStartUseGodAbility({ G, ctx, ...rest }, ctx.currentPlayer, GodNames.Thor))) {
                // TODO Check if Thor & Durathor add for Dagda can not discard both cards at all!?
                AddActionsToStack({ G, ctx, ...rest }, playerID, pickedCard.stack.player, pickedCard);
            }
        }
    }
    // TODO Move check to function somehow?!
    if (`actions` in pickedCard && pickedCard.actions !== undefined) {
        StartAutoAction({ G, ctx, ...rest }, playerID, pickedCard.actions);
    }
};
//# sourceMappingURL=CardHelpers.js.map