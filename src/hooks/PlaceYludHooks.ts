import { AllStackData } from "../data/StackData";
import { ThrowMyError } from "../Error";
import { DrawCurrentProfit } from "../helpers/ActionHelpers";
import { CheckPlayerHasBuff } from "../helpers/BuffHelpers";
import { RemoveCardFromPlayerBoardSuitCards } from "../helpers/DiscardCardHelpers";
import { EndTurnActions, RemoveThrudFromPlayerBoardAfterGameEnd, StartOrEndActions } from "../helpers/GameHooksHelpers";
import { AddActionsToStack } from "../helpers/StackHelpers";
import { AssertPlayerId } from "../is_helpers/AssertionTypeHelpers";
import { ErrorNames, GameModeNames, HeroBuffNames, HeroNames, PlayerIdForSoloGameNames, SuitNames } from "../typescript/enums";
import type { CanBeNull, CanBeUndef, CanBeVoid, Context, HeroCard, PlayerBoardCard, PublicPlayer } from "../typescript/interfaces";

/**
 * <h3>Проверяет необходимость завершения фазы 'Ставки'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При каждом действии с монеткой в фазе 'Ставки'.</li>
 * </ol>
 *
 * @param context
 * @returns Необходимость завершения текущей фазы.
 */
export const CheckEndPlaceYludPhase = (
    { G, ctx, ...rest }: Context,
): CanBeVoid<true> => {
    if (G.publicPlayersOrder.length) {
        if (G.mode === GameModeNames.Solo && G.tierToEnd === 0) {
            // TODO Check it!
            return true;
        }
        const player: CanBeUndef<PublicPlayer> = G.publicPlayers[ctx.currentPlayer];
        if (player === undefined) {
            return ThrowMyError(
                { G, ctx, ...rest },
                ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
                ctx.currentPlayer,
            );
        }
        if (!player.stack.length) {
            const yludIndex: number =
                Object.values(G.publicPlayers).findIndex((player: PublicPlayer, index: number):
                    boolean => {
                    const playerID: string = String(index);
                    AssertPlayerId(ctx, playerID);
                    return CheckPlayerHasBuff(
                        { G, ctx, ...rest },
                        playerID,
                        HeroBuffNames.EndTier,
                    );
                });
            if (G.tierToEnd !== 0 && yludIndex === -1) {
                throw new Error(`У игрока отсутствует обязательная карта героя '${HeroNames.Ylud}'.`);
            }
            let nextPhase = true;
            if (yludIndex !== -1) {
                const playerID: string = String(yludIndex);
                AssertPlayerId(ctx, playerID);
                const yludPlayer: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
                if (yludPlayer === undefined) {
                    return ThrowMyError(
                        { G, ctx, ...rest },
                        ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
                        yludIndex,
                    );
                }
                const index: number = Object.values(yludPlayer.cards).flat()
                    .findIndex((card: PlayerBoardCard): boolean => card.name === HeroNames.Ylud);
                if (index === -1) {
                    nextPhase = false;
                }
            }
            if (nextPhase) {
                return true;
            }
        }
    }
};

/**
 * <h3>Проверяет порядок хода при начале фазы 'Поместить Труд'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При начале фазы 'Поместить Труд'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export const CheckPlaceYludOrder = (
    { G, ctx, ...rest }: Context,
): void => {
    G.publicPlayersOrder = [];
    const yludIndex: number =
        Object.values(G.publicPlayers).findIndex((player: PublicPlayer, index: number): boolean => {
            const playerID: string = String(index);
            AssertPlayerId(ctx, playerID);
            return CheckPlayerHasBuff(
                { G, ctx, ...rest },
                playerID,
                HeroBuffNames.EndTier,
            );
        });
    if (yludIndex === -1) {
        throw new Error(`У игрока отсутствует обязательный баф '${HeroBuffNames.EndTier}'.`);
    }
    const playerID: string = String(yludIndex);
    AssertPlayerId(ctx, playerID);
    const player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError(
            { G, ctx, ...rest },
            ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
            yludIndex,
        );
    }
    const yludHeroCard: CanBeUndef<HeroCard> =
        player.heroes.find((hero: HeroCard): boolean => hero.name === HeroNames.Ylud);
    if (yludHeroCard === undefined) {
        throw new Error(`В массиве карт игрока с id '${yludIndex}' отсутствует карта героя '${HeroNames.Ylud}'.`);
    }
    if (G.tierToEnd === 0) {
        const cards: PlayerBoardCard[] = Object.values(player.cards).flat(),
            index: number =
                cards.findIndex((card: PlayerBoardCard): boolean => card.name === HeroNames.Ylud);
        if (index !== -1) {
            const yludCard: CanBeUndef<PlayerBoardCard> = cards[index];
            if (yludCard === undefined) {
                throw new Error(`В массиве карт игрока с id '${yludIndex}' отсутствует карта героя '${HeroNames.Ylud}' с id '${index}'.`);
            }
            const suit: CanBeNull<SuitNames> = yludCard.suit;
            if (suit !== null) {
                const yludCardIndex: number =
                    player.cards[suit].findIndex((card: PlayerBoardCard): boolean =>
                        card.name === HeroNames.Ylud);
                const playerID: string = String(yludIndex);
                AssertPlayerId(ctx, playerID);
                RemoveCardFromPlayerBoardSuitCards(
                    { G, ctx, ...rest },
                    playerID,
                    suit,
                    yludCardIndex,
                );
            }
        }
    }
    const yludPlayerId = String(yludIndex);
    AssertPlayerId(ctx, yludPlayerId);
    G.publicPlayersOrder = [yludPlayerId];
};

/**
 * <h3>Проверяет необходимость завершения хода в фазе 'Поместить Труд'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При каждом действии в фазе 'Поместить Труд'.</li>
 * </ol>
 *
 * @param context
 * @returns Необходимость завершения текущего хода.
 */
export const CheckEndPlaceYludTurn = (
    { ...rest }: Context,
): CanBeVoid<true> => EndTurnActions({ ...rest });

/**
 * <h3>Действия при завершении фазы 'Поместить Труд'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При завершении фазы 'Поместить Труд'.</li>
 * </ol>
 *
 * @param context
 */
export const EndPlaceYludActions = (
    { G, ...rest }: Context,
): void => {
    if (G.tierToEnd === 0) {
        RemoveThrudFromPlayerBoardAfterGameEnd({ G, ...rest });
    }
    G.publicPlayersOrder = [];
};

/**
 * <h3>Действия при завершении мува в фазе 'Поместить Труд'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При завершении мува в фазе 'Поместить Труд'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export const OnPlaceYludMove = (
    { ...rest }: Context,
): void => StartOrEndActions({ ...rest });

/**
 * <h3>Действия при начале хода в фазе 'Поместить Труд'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При начале хода в фазе 'Поместить Труд'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export const OnPlaceYludTurnBegin = (
    { G, ctx, ...rest }: Context,
): void => {
    if (G.mode === GameModeNames.Solo && ctx.currentPlayer === PlayerIdForSoloGameNames.SoloBotPlayerId) {
        AddActionsToStack(
            { G, ctx, ...rest },
            ctx.currentPlayer,
            [AllStackData.placeYludHeroSoloBot()],
        );
    } else if (G.mode === GameModeNames.SoloAndvari && ctx.currentPlayer === PlayerIdForSoloGameNames.SoloBotPlayerId) {
        AddActionsToStack(
            { G, ctx, ...rest },
            ctx.currentPlayer,
            [AllStackData.placeYludHeroSoloBotAndvari()],
        );
    } else {
        AddActionsToStack(
            { G, ctx, ...rest },
            ctx.currentPlayer,
            [AllStackData.placeYludHero()],
        );
    }
    DrawCurrentProfit({ G, ctx, ...rest });
};
