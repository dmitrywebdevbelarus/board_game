import { ThrowMyError } from "../Error";
import { IsValkyryCard } from "../is_helpers/IsMythologicalCreatureTypeHelpers";
import { CardRusNames, CommonBuffNames, ErrorNames, SuitNames, ValkyryBuffNames, ValkyryNames } from "../typescript/enums";
import type { BuffValue, CanBeUndef, Context, MythologicalCreatureCommandZoneCard, PlayerID, PublicPlayer } from "../typescript/interfaces";
import { CheckPlayerHasBuff, GetBuffValue } from "./BuffHelpers";

/**
 * <h3>Проверяет выполнение условия свойства валькирии Olrun.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при каждом действии, которое может выполнить условие свойства валькирии Olrun.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @returns Может ли быть выполнено свойство валькирии Olrun.
 */
export const CheckIfRecruitedCardEqualSuitIdForOlrun = (
    { G, ...rest }: Context,
    playerID: PlayerID,
    suit: SuitNames,
): boolean => {
    const player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError(
            { G, ...rest },
            ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
            playerID,
        );
    }
    const chosenSuit: BuffValue = GetBuffValue(
        { G, ...rest },
        playerID,
        CommonBuffNames.SuitIdForOlrun,
    );
    if (chosenSuit === true) {
        throw new Error(`У бафа с названием '${CommonBuffNames.SuitIdForOlrun}' не может не быть выбрана фракция.`);
    }
    if (suit === chosenSuit) {
        return true;
    }
    return false;
};

/**
 * <h3>Проверяет выполнение условия свойства валькирии.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при каждом действии, которое может выполнить условие свойства валькирии.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param buffName Баф.
 * @returns
 */
export const CheckValkyryRequirement = (
    { G, ...rest }: Context,
    playerID: PlayerID,
    buffName: ValkyryBuffNames,
): void => {
    // TODO Check only if not maximum count!
    const player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError(
            { G, ...rest },
            ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
            playerID,
        );
    }
    if (CheckPlayerHasBuff(
        { G, ...rest },
        playerID,
        buffName,
    )) {
        let valkyryName: ValkyryNames,
            _exhaustiveCheck: never;
        switch (buffName) {
            case ValkyryBuffNames.CountBidWinnerAmount:
                valkyryName = ValkyryNames.Brynhildr;
                break;
            case ValkyryBuffNames.CountDistinctionAmount:
                valkyryName = ValkyryNames.Hildr;
                break;
            case ValkyryBuffNames.CountPickedCardClassRankAmount:
                valkyryName = ValkyryNames.Olrun;
                break;
            case ValkyryBuffNames.CountPickedHeroAmount:
                valkyryName = ValkyryNames.Sigrdrifa;
                break;
            case ValkyryBuffNames.CountBettermentAmount:
                valkyryName = ValkyryNames.Svafa;
                break;
            default:
                _exhaustiveCheck = buffName;
                throw new Error(`Нет такого бафа '${buffName}' у мифических существ типа '${CardRusNames.ValkyryCard}}'.`);
                return _exhaustiveCheck;
        }
        const valkyryCard: CanBeUndef<MythologicalCreatureCommandZoneCard> =
            player.mythologicalCreatureCards.find((card: MythologicalCreatureCommandZoneCard):
                boolean => card.name === valkyryName);
        if (valkyryCard === undefined) {
            throw new Error(`В массиве карт мифических существ игрока с id '${playerID}' не удалось найти карту типа '${CardRusNames.ValkyryCard}' с названием '${valkyryName}'.`);
        }
        if (!IsValkyryCard(valkyryCard)) {
            throw new Error(`У игрока '${player.nickname}' не может присутствовать карта с типом '${valkyryCard.type}' с названием '${valkyryName}'.`);
        }
        if (valkyryCard.strengthTokenNotch === null) {
            throw new Error(`В массиве карт мифических существ игрока с id '${playerID}' у карты типа '${CardRusNames.ValkyryCard}' с названием '${valkyryCard.name}' не может не быть выставлен токен силы.`);
        }
        valkyryCard.strengthTokenNotch++;
    }
};
