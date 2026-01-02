import { CreateSpecialTriggerTradingCoin } from "../Coin";
import { AllStackData } from "../data/StackData";
import { ThrowMyError } from "../Error";
import { AddDataToLog } from "../Logging";
import { CreatePriority } from "../Priority";
import { CoinNames, ErrorNames, GameModeNames, LogNames, PlayerIdForSoloGameNames, SpecialCardNames, SuitNames } from "../typescript/enums";
import { AddAnyCardToPlayerActions } from "./CardHelpers";
import { DiscardTradingCoin, GetMaxCoinValue } from "./CoinHelpers";
import { AddActionsToStack } from "./StackHelpers";
/**
 * <h3>Получение преимущества по фракции кузнецов.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце 1-й эпохи, когда получается преимущество по фракции кузнецов.</li>
 * <li>В конце игры, когда получается преимущество по фракции кузнецов.</li>
 * </ol>
 *
 * @param context
 * @returns Количество очков по преимуществу по конкретной фракции.
 */
export const BlacksmithDistinctionAwarding = ({ G, ...rest }, playerID) => {
    const player = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError({ G, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
    }
    if (G.tierToEnd !== 0) {
        const specialCard = G.specialCardsDeck.find((card) => card.name === SpecialCardNames.ChiefBlacksmith);
        if (specialCard === undefined) {
            throw new Error(`В игре отсутствует обязательная карта '${SpecialCardNames.ChiefBlacksmith}'.`);
        }
        AddAnyCardToPlayerActions({ G, ...rest }, playerID, specialCard);
        G.distinctions[SuitNames.blacksmith] = undefined;
        AddDataToLog({ G, ...rest }, LogNames.Game, `Игрок '${player.nickname}' получил по знаку отличия кузнецов карту '${specialCard.type}' '${SpecialCardNames.ChiefBlacksmith}' во фракцию '${SuitNames.blacksmith}'.`);
    }
    return 0;
};
/**
 * <h3>Получение преимущества по фракции разведчиков.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце 1-й эпохи, когда получается преимущество по фракции разведчиков.</li>
 * <li>В конце игры, когда получается преимущество по фракции разведчиков.</li>
 * </ol>
 *
 * @param context
 * @returns Количество очков по преимуществу по конкретной фракции.
 */
export const ExplorerDistinctionAwarding = ({ G, ctx, ...rest }, playerID) => {
    if (playerID === undefined) {
        return ThrowMyError({ G, ctx, ...rest }, ErrorNames.PlayerIDIsNotDefined);
    }
    const player = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError({ G, ctx, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
    }
    if (G.tierToEnd !== 0) {
        // TODO playerID?!
        if (G.mode === GameModeNames.Solo && ctx.currentPlayer === PlayerIdForSoloGameNames.SoloBotPlayerId) {
            AddActionsToStack({ G, ctx, ...rest }, playerID, [AllStackData.pickDistinctionCardSoloBot()]);
        }
        else if (G.mode === GameModeNames.SoloAndvari
            && ctx.currentPlayer === PlayerIdForSoloGameNames.SoloBotPlayerId) {
            AddActionsToStack({ G, ctx, ...rest }, playerID, [AllStackData.pickDistinctionCardSoloBotAndvari()]);
        }
        else {
            AddActionsToStack({ G, ctx, ...rest }, playerID, [AllStackData.pickDistinctionCard()]);
        }
        AddDataToLog({ G, ctx, ...rest }, LogNames.Game, `Игрок '${player.nickname}' получил по знаку отличия разведчиков возможность получить карту из колоды второй эпохи:`);
    }
    return 0;
};
/**
 * <h3>Получение преимущества по фракции охотников.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце 1-й эпохи, когда получается преимущество по фракции охотников.</li>
 * <li>В конце игры, когда получается преимущество по фракции охотников.</li>
 * </ol>
 *
 * @param context
 * @returns Количество очков по преимуществу по конкретной фракции.
 */
export const HunterDistinctionAwarding = ({ G, ...rest }, playerID) => {
    if (G.tierToEnd !== 0) {
        const player = G.publicPlayers[playerID], privatePlayer = G.players[playerID];
        if (player === undefined) {
            return ThrowMyError({ G, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
        }
        if (privatePlayer === undefined) {
            return ThrowMyError({ G, ...rest }, ErrorNames.PrivatePlayerWithCurrentIdIsUndefined, playerID);
        }
        const [type, tradingCoinIndex] = DiscardTradingCoin({ G, ...rest }, playerID), coin = CreateSpecialTriggerTradingCoin({
            isOpened: true,
            value: 3,
        });
        let _exhaustiveCheck;
        switch (type) {
            case CoinNames.Hand:
                if (G.mode === GameModeNames.Multiplayer) {
                    privatePlayer.handCoins[tradingCoinIndex] = coin;
                }
                player.handCoins[tradingCoinIndex] = coin;
                break;
            case CoinNames.Board:
                if (G.mode === GameModeNames.Multiplayer) {
                    privatePlayer.boardCoins[tradingCoinIndex] = coin;
                }
                player.boardCoins[tradingCoinIndex] = coin;
                break;
            default:
                _exhaustiveCheck = type;
                throw new Error(`Не существует такого типа монеты.`);
                return _exhaustiveCheck;
        }
        G.distinctions[SuitNames.hunter] = undefined;
        AddDataToLog({ G, ...rest }, LogNames.Game, `Игрок '${player.nickname}' обменял по знаку отличия охотников свою монету с номиналом '0' на особую монету с номиналом '3'.`);
    }
    return 0;
};
/**
 * <h3>Получение преимущества по фракции горняков.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце 1-й эпохи, когда получается преимущество по фракции горняков.</li>
 * <li>В конце игры, когда получается преимущество по фракции горняков.</li>
 * </ol>
 *
 * @param context
 * @returns Количество очков по преимуществу по конкретной фракции.
 */
export const MinerDistinctionAwarding = ({ G, ...rest }, playerID) => {
    const player = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError({ G, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
    }
    if (G.tierToEnd !== 0) {
        const currentPriorityValue = player.priority.value;
        player.priority = CreatePriority({
            isExchangeable: false,
            value: 6,
        });
        G.distinctions[SuitNames.miner] = undefined;
        AddDataToLog({ G, ...rest }, LogNames.Game, `Игрок '${player.nickname}' обменял по знаку отличия горняков свой кристалл '${currentPriorityValue}' на особый кристалл '6'.`);
    }
    return GetMinerDistinctionsScore({ G, ...rest }, playerID);
};
/**
 * <h3>Получение преимущества по фракции воинов.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце 1-й эпохи, когда получается преимущество по фракции воинов.</li>
 * <li>В конце игры, когда получается преимущество по фракции воинов.</li>
 * </ol>
 *
 * @param context
 * @returns Количество очков по преимуществу по конкретной фракции.
 */
export const WarriorDistinctionAwarding = ({ G, ctx, ...rest }, playerID) => {
    if (playerID === undefined) {
        return ThrowMyError({ G, ctx, ...rest }, ErrorNames.PlayerIDIsNotDefined);
    }
    const player = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError({ G, ctx, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
    }
    if (G.tierToEnd !== 0) {
        if (G.mode === GameModeNames.Solo && ctx.currentPlayer === PlayerIdForSoloGameNames.SoloBotPlayerId) {
            AddActionsToStack({ G, ctx, ...rest }, playerID, [AllStackData.upgradeCoinWarriorDistinctionSoloBot()]);
        }
        else if (G.mode === GameModeNames.SoloAndvari
            && ctx.currentPlayer === PlayerIdForSoloGameNames.SoloBotPlayerId) {
            AddActionsToStack({ G, ctx, ...rest }, playerID, [AllStackData.upgradeCoinWarriorDistinctionSoloBotAndvari()]);
        }
        else {
            AddActionsToStack({ G, ctx, ...rest }, playerID, [AllStackData.upgradeCoinWarriorDistinction()]);
        }
        AddDataToLog({ G, ctx, ...rest }, LogNames.Game, `Игрок '${player.nickname}' получил по знаку отличия воинов возможность улучшить одну из своих монет на '+5':`);
    }
    else {
        return GetMaxCoinValue({ G, ctx, ...rest }, playerID);
    }
    return 0;
};
export const GetMinerDistinctionsScore = ({ G, ...rest }, playerID) => {
    const player = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError({ G, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
    }
    if (player.priority.value === 6) {
        return 3;
    }
    return 0;
};
/**
 * <h3>Завершение получения преимущества по фракции воинов или разведчиков.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце 1-й эпохи, когда получается преимущество по фракции воинов или разведчиков.</li>
 * <li>В конце игры, когда получается преимущество по фракции воинов или разведчиков.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export const EndWarriorOrExplorerDistinctionIfCoinUpgraded = ({ G }) => {
    // TODO Move to distinction phase hook?
    if (Object.values(G.distinctions).length) {
        // TODO Rework in suit name distinctions and delete not by if but by current distinction suit
        const isDistinctionWarrior = G.distinctions[SuitNames.warrior] !== undefined;
        if (isDistinctionWarrior) {
            G.distinctions[SuitNames.warrior] = undefined;
        }
        else if (!isDistinctionWarrior && G.distinctions[SuitNames.explorer] !== undefined) {
            G.distinctions[SuitNames.explorer] = undefined;
        }
    }
};
//# sourceMappingURL=DistinctionAwardingHelpers.js.map