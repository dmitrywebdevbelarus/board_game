import { ThrowMyError } from "../Error";
import { GetMaxCoinValue } from "../helpers/CoinHelpers";
import { IsGiantCard } from "../is_helpers/IsMythologicalCreatureTypeHelpers";
import { CardRusNames, ErrorNames, GiantNames } from "../typescript/enums";
import type { BasicGiantScoring, CanBeNull, CanBeUndef, Context, DwarfCard, GiantScoringFunction, MythologicalCreatureCommandZoneCard, PlayerID, PossibleReturnMaxCoinValue, PublicPlayer } from "../typescript/interfaces";

/**
 * <h3>Получение победных очков по Гиганту, не имеющим специфических вариантов подсчёта очков.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце игры, когда получаются победные очки по Гиганту, не имеющему специфических вариантов подсчёта очков.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param value Значение.
 * @returns Количество очков по конкретному гиганту.
 */
export const GiantScoring: GiantScoringFunction = (
    { ...rest }: Context,
    playerID: PlayerID,
    value?: BasicGiantScoring,
): BasicGiantScoring => {
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
 * <h3>Получение победных очков по Гиганту Gymir.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце игры, когда получаются победные очки по Гиганту Gymir.</li>
 * </ol>
 *
 * @param context
 * @returns Количество очков по конкретному гиганту.
 */
export const GymirScoring: GiantScoringFunction = (
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
    const gymirCard: CanBeUndef<MythologicalCreatureCommandZoneCard> =
        player.mythologicalCreatureCards.find((card: MythologicalCreatureCommandZoneCard): boolean =>
            card.name === GiantNames.Gymir);
    if (gymirCard === undefined) {
        throw new Error(`У игрока '${player.nickname}' не может отсутствовать карта с типом '${CardRusNames.GiantCard}' с названием '${GiantNames.Gymir}'.`);
    }
    if (!IsGiantCard(gymirCard)) {
        throw new Error(`У игрока '${player.nickname}' не может присутствовать карта с типом '${gymirCard.type}' с названием '${GiantNames.Gymir}'.`);
    }
    const capturedGymirCard: CanBeNull<DwarfCard> = gymirCard.capturedCard;
    if (capturedGymirCard === null) {
        return 0;
    }
    if (capturedGymirCard.points === null) {
        throw new Error(`У карты '${capturedGymirCard.name}' не могут отсутствовать очки.`);
    }
    return capturedGymirCard.points * 3;
};

/**
 * <h3>Получение победных очков по Гиганту Surt.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>В конце игры, когда получаются победные очки по Гиганту Surt.</li>
 * </ol>
 *
 * @param context
 * @returns Количество очков по конкретному гиганту.
 */
export const SurtScoring: GiantScoringFunction = (
    { G, ...rest }: Context,
    playerID: PlayerID,
): PossibleReturnMaxCoinValue => {
    const player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError(
            { G, ...rest },
            ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
            playerID,
        );
    }
    const surtCard: CanBeUndef<MythologicalCreatureCommandZoneCard> =
        player.mythologicalCreatureCards.find((card: MythologicalCreatureCommandZoneCard): boolean =>
            card.name === GiantNames.Surt);
    if (surtCard === undefined) {
        throw new Error(`У игрока '${player.nickname}' не может отсутствовать карта с типом '${CardRusNames.GiantCard}' с названием '${GiantNames.Surt}'.`);
    }
    if (!IsGiantCard(surtCard)) {
        throw new Error(`У игрока '${player.nickname}' не может присутствовать карта с типом '${surtCard.type}' с названием '${GiantNames.Surt}'.`);
    }
    const capturedSurtCard: CanBeNull<DwarfCard> = surtCard.capturedCard;
    if (capturedSurtCard === null) {
        return 0;
    }
    return GetMaxCoinValue(
        { G, ...rest },
        playerID,
    );
};
