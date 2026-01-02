import { ThrowMyError } from "../Error";
import { GetOdroerirTheMythicCauldronCoinsValues } from "../helpers/CampCardHelpers";
import { IsMercenaryPlayerCampCard } from "../is_helpers/IsCampTypeHelpers";
import { IsCoin } from "../is_helpers/IsCoinTypeHelpers";
import { CommonBuffNames, ErrorNames, SuitNames } from "../typescript/enums";
import type { ArtefactScoringFunction, BasicArtefactScoring, CanBeUndef, Context, PlayerBuffs, PlayerID, PublicPlayer, PublicPlayerCoin } from "../typescript/interfaces";
import { GetSuitValueWithMaxRanksValue, TotalRank } from "./ScoreHelpers";

/**
 * <h3>Получение победных очков по артефактам, не имеющим специфических вариантов подсчёта очков.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце игры, когда получаются победные очки по артефактам, не имеющим специфических вариантов подсчёта очков.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param isFinal Является ли финальным подсчётом очков.
 * @param value Значение очков артефакта.
 * @returns Количество очков по конкретному артефакту.
 */
export const ArtefactScoring: ArtefactScoringFunction = (
    { ...rest }: Context,
    playerID: PlayerID,
    isFinal,
    value?: BasicArtefactScoring,
): BasicArtefactScoring => {
    if (value === undefined) {
        return ThrowMyError(
            { ...rest },
            ErrorNames.FunctionParamIsUndefined,
            `value`,
        );
    }
    return value;
};

/**
 * <h3>Получение победных очков по артефакту Draupnir.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце игры, когда получаются победные очки по артефакту Draupnir.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param isFinal Является ли финальным подсчётом очков.
 * @returns Количество очков по конкретному артефакту.
 */
export const DraupnirScoring: ArtefactScoringFunction = (
    { G, ...rest }: Context,
    playerID: PlayerID,
    isFinal = false,
): number => {
    const player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError(
            { G, ...rest },
            ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
            playerID,
        );
    }
    if (isFinal) {
        return player.boardCoins.filter((coin: PublicPlayerCoin, index: number): boolean => {
            if (coin !== null && (!IsCoin(coin) || !coin.isOpened)) {
                throw new Error(`В массиве монет игрока '${player.nickname}' на столе не может быть закрыта монета с id '${index}'.`);
            }
            return IsCoin(coin) && coin.value >= 15;
        }).length * 6;
    }
    // TODO Fix: Add all hand/board coins for bots and players: public and how to count private!?
    return player.boardCoins.filter((coin: PublicPlayerCoin, index: number): boolean => {
        if (coin !== null && (!IsCoin(coin) || !coin.isOpened)) {
            throw new Error(`В массиве монет игрока '${player.nickname}' на столе не может быть закрыта монета с id '${index}'.`);
        }
        return IsCoin(coin) && coin.value >= 15;
    }).length * 6;
};

/**
 * <h3>Получение победных очков по артефакту Hrafnsmerki.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце игры, когда получаются победные очки по артефакту Hrafnsmerki.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @returns Количество очков по конкретному артефакту.
 */
export const HrafnsmerkiScoring: ArtefactScoringFunction = (
    { G, ...rest }: Context,
    playerID: PlayerID,
): number => {
    const player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
    let score = 0,
        suit: SuitNames;
    if (player === undefined) {
        return ThrowMyError(
            { G, ...rest },
            ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
            playerID,
        );
    }
    for (suit in player.cards) {
        score += player.cards[suit].filter(IsMercenaryPlayerCampCard).length * 5;
    }
    return score;
};

/**
 * <h3>Получение победных очков по артефакту Mjollnir.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце игры, когда получаются победные очки по артефакту Mjollnir.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param isFinal Является ли финальным подсчётом очков.
 * @returns Количество очков по конкретному артефакту.
 */
export const MjollnirScoring: ArtefactScoringFunction = (
    { G, ...rest }: Context,
    playerID: PlayerID,
    isFinal = false,
): number => {
    const player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError(
            { G, ...rest },
            ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
            playerID,
        );
    }
    let suit: CanBeUndef<SuitNames>;
    if (isFinal) {
        suit = player.buffs.find((buff: PlayerBuffs): boolean =>
            buff.suitIdForMjollnir !== undefined)?.suitIdForMjollnir;
        if (suit === undefined) {
            throw new Error(`У игрока отсутствует обязательный баф '${CommonBuffNames.SuitIdForMjollnir}'.`);
        }
    } else {
        suit = GetSuitValueWithMaxRanksValue(
            { G, ...rest },
            playerID,
        );
    }
    return player.cards[suit].reduce(TotalRank, 0) * 2;
};

/**
 * <h3>Получение победных очков по артефакту Odroerir The Mythic Cauldron.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце игры, когда получаются победные очки по артефакту Odroerir The Mythic Cauldron.</li>
 * </ol>
 *
 * @param context
 * @returns Количество очков по конкретному артефакту.
 */
export const OdroerirTheMythicCauldronScoring: ArtefactScoringFunction = (
    { ...rest }: Context,
): number => GetOdroerirTheMythicCauldronCoinsValues({ ...rest });

/**
 * <h3>Получение победных очков по артефакту Svalinn.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце игры, когда получаются победные очки по артефакту Svalinn.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @returns Количество очков по конкретному артефакту.
 */
export const SvalinnScoring: ArtefactScoringFunction = (
    { G, ...rest }: Context,
    playerID: PlayerID,
): number => {
    const player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError(
            { G, ...rest },
            ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
            playerID,
        );
    }
    return player.heroes.length * 5;
};
