import { AllStackData } from "../data/StackData";
import { ThrowMyError } from "../Error";
import { ErrorNames, GameModeNames, HeroBuffNames, HeroNames, PlayerIdForSoloGameNames } from "../typescript/enums";
import type { CanBeUndef, Context, PlayerBoardCard, PlayerID, PublicPlayer } from "../typescript/interfaces";
import { CheckPlayerHasBuff, GetBuffValue } from "./BuffHelpers";
import { RemoveCardFromPlayerBoardSuitCards } from "./DiscardCardHelpers";
import { AddActionsToStack } from "./StackHelpers";

/**
 * <h3>Проверяет нужно ли перемещать героя Труд.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При любых действия, когда выкладывается карта на поле игрока.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param card Карта.
 * @returns Нужно ли перемещать героя Труд.
 */
const CheckAndMoveThrud = (
    { G, ...rest }: Context,
    playerID: PlayerID,
    card: PlayerBoardCard,
): boolean => {
    if (card.suit !== null) {
        if (playerID === undefined) {
            return ThrowMyError(
                { G, ...rest },
                ErrorNames.PlayerIDIsNotDefined,
            );
        }
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
            HeroBuffNames.MoveThrud,
        ) && GetBuffValue(
            { G, ...rest },
            playerID,
            HeroBuffNames.MoveThrud,
        ) === card.suit) {
            const index: number = player.cards[card.suit].findIndex((card: PlayerBoardCard): boolean =>
                card.name === HeroNames.Thrud);
            if (index !== -1) {
                const thrudCard: CanBeUndef<PlayerBoardCard> = player.cards[card.suit][index];
                if (thrudCard === undefined) {
                    throw new Error(`В массиве карт игрока с id '${playerID}' во фракции '${card.suit}' с id '${index}' отсутствует карта героя '${HeroNames.Thrud}' для перемещения на новое место.`);
                }
                RemoveCardFromPlayerBoardSuitCards(
                    { G, ...rest },
                    playerID,
                    card.suit,
                    index,
                );
            }
            return index !== -1;
        }
    }
    return false;
};

/**
 * <h3>Действия, связанные с проверкой перемещения героя Труд или выбора героя.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При добавлении карт, героев или карт лагеря, помещающихся на карту героя Труд на игровом поле игрока.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param card Карта, помещающаяся на карту героя Труд.
 * @returns
 */

export const CheckAndMoveThrudAction = (
    { G, ctx, ...rest }: Context,
    playerID: PlayerID,
    card: PlayerBoardCard,
): void => {
    const isMoveThrud: boolean = CheckAndMoveThrud(
        { G, ctx, ...rest },
        playerID,
        card,
    );
    if (isMoveThrud) {
        if (G.mode === GameModeNames.Solo && ctx.currentPlayer === PlayerIdForSoloGameNames.SoloBotPlayerId) {
            AddActionsToStack(
                { G, ctx, ...rest },
                playerID,
                [AllStackData.placeThrudHeroSoloBot()],
            );
        } else if (G.mode === GameModeNames.SoloAndvari
            && ctx.currentPlayer === PlayerIdForSoloGameNames.SoloBotPlayerId) {
            AddActionsToStack(
                { G, ctx, ...rest },
                playerID,
                [AllStackData.placeThrudHeroSoloBotAndvari()],
            );
        } else {
            AddActionsToStack(
                { G, ctx, ...rest },
                playerID,
                [AllStackData.placeThrudHero()],
            );
        }
    }
};
