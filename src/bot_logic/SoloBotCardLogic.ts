import { suitsConfig } from "../data/SuitData";
import { ThrowMyError } from "../Error";
import { CheckPlayerHasBuff, GetBuffValue } from "../helpers/BuffHelpers";
import { TotalRank, TotalRankWithoutThrud } from "../score_helpers/ScoreHelpers";
import { CardRusNames, ErrorNames, HeroBuffNames, SuitNames } from "../typescript/enums";
import type { CanBeNull, CanBeUndef, Context, DwarfDeckCard, HeroCard, MoveArguments, PlayerBoardCard, PlayerID, PublicPlayer, TavernWithoutExpansionArray } from "../typescript/interfaces";

// TODO Can i rework all moveArguments: MoveArgumentsType<number[]>?
/**
 * <h3>Проверяет возможность получения нового героя при выборе карты конкретной фракции из таверны соло ботом.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При необходимости выбора карты из таверны соло ботом.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @returns Фракция дворфов для выбора карты, чтобы получить нового героя.
 */
export const CheckSoloBotCanPickHero = (
    { G, ...rest }: Context,
    playerID: PlayerID,
): CanBeUndef<SuitNames> => {
    const soloBotPublicPlayer: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
    if (soloBotPublicPlayer === undefined) {
        return ThrowMyError(
            { G, ...rest },
            ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
            playerID,
        );
    }
    const playerCards: PlayerBoardCard[][] = Object.values(soloBotPublicPlayer.cards),
        heroesLength: number = soloBotPublicPlayer.heroes.filter((hero: HeroCard): boolean =>
            hero.name.startsWith(`Dwerg`)).length,
        playerCardsCount: number[] = playerCards.map((item: PlayerBoardCard[]): number =>
            item.reduce(TotalRank, 0)),
        minLength: number = Math.min(...playerCardsCount),
        minLengthCount: number =
            playerCardsCount.filter((length: number): boolean => length === minLength).length,
        isCanPickHero: boolean = minLength === heroesLength && minLengthCount === 1;
    if (isCanPickHero) {
        const suitIndex: number = playerCardsCount.indexOf(minLength);
        if (suitIndex === -1) {
            throw new Error(`В массиве фракций отсутствует фракция с минимальным количеством карт '${minLength}' для выкладки карты соло ботом.`);
        }
        const suits: SuitNames[] = Object.keys(soloBotPublicPlayer.cards) as SuitNames[],
            suit: CanBeUndef<SuitNames> = suits[suitIndex];
        if (suit === undefined) {
            throw new Error(`В массиве фракций отсутствует фракция с id '${suitIndex}'.`);
        }
        return suitsConfig[suit].suit;
    }
    return undefined;
};

/**
 * <h3>Проверяет наименее представленные фракции в армии соло бота при выборе карты из таверны соло ботом.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При необходимости выбора карты из таверны соло ботом.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @returns Фракции дворфов с наименьшим количеством карт для выбора карты/минимальное количество карт в наименьших фракциях.
 */
export const CheckSuitsLeastPresentOnSoloBotBoard = (
    { G, ...rest }: Context,
    playerID: PlayerID,
): [
        // TODO Add type!!!
        SuitNames[],
        number,
    ] => {
    const soloBotPublicPlayer: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
    if (soloBotPublicPlayer === undefined) {
        return ThrowMyError(
            { G, ...rest },
            ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
            playerID,
        );
    }
    const playerCards: PlayerBoardCard[][] = Object.values(soloBotPublicPlayer.cards),
        playerCardsCount: number[] = playerCards.map((item: PlayerBoardCard[]): number =>
            item.reduce(TotalRankWithoutThrud, 0)),
        minLength: number = Math.min(...playerCardsCount),
        minLengthCount: number = minLength === 0 ? 0 :
            playerCardsCount.filter((length: number): boolean => length === minLength).length,
        availableSuitArguments: SuitNames[] = [];
    for (let i = 0; i < playerCardsCount.length; i++) {
        if (playerCardsCount[i] === minLength) {
            const suits: SuitNames[] = Object.keys(soloBotPublicPlayer.cards) as SuitNames[],
                suit: CanBeUndef<SuitNames> = suits[i];
            if (suit === undefined) {
                throw new Error(`В массиве фракций отсутствует фракция с id '${i}'.`);
            }
            const suitName: SuitNames = suitsConfig[suit].suit;
            availableSuitArguments.push(suitName);
        }
    }
    return [availableSuitArguments, minLengthCount];
};

/**
 * <h3>Проверяет возможность получения нового героя при выборе карты из таверны соло ботом.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При необходимости выбора карты из таверны соло ботом.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param moveArguments Аргументы действия соло бота.
 * @returns Id карты из таверны, при выборе которой можно получить нового героя.
 */
export const CheckSoloBotMustTakeCardToPickHero = (
    { G, ...rest }: Context,
    playerID: PlayerID,
    moveArguments: MoveArguments<number[]>,
): CanBeUndef<number> => {
    let thrudSuit: CanBeUndef<SuitNames>;
    if (CheckPlayerHasBuff(
        { G, ...rest },
        playerID,
        HeroBuffNames.MoveThrud,
    )) {
        thrudSuit = GetBuffValue(
            { G, ...rest },
            playerID,
            HeroBuffNames.MoveThrud,
        ) as SuitNames;
    }
    const suit: CanBeUndef<SuitNames> = CheckSoloBotCanPickHero(
        { G, ...rest },
        playerID,
    ),
        availableMoveArguments: MoveArguments<number[]> = [],
        availableThrudArguments: MoveArguments<number[]> = [];
    if (suit !== undefined) {
        const currentTavern: TavernWithoutExpansionArray = G.taverns[G.currentTavern] as TavernWithoutExpansionArray;
        for (let i = 0; i < moveArguments.length; i++) {
            const moveArgument: CanBeUndef<number> = moveArguments[i];
            if (moveArgument === undefined) {
                throw new Error(`В массиве аргументов мува отсутствует аргумент с id '${i}'.`);
            }
            const tavernCard: CanBeUndef<CanBeNull<DwarfDeckCard>> = currentTavern[moveArgument];
            if (tavernCard === undefined) {
                return ThrowMyError(
                    { G, ...rest },
                    ErrorNames.CurrentTavernCardWithCurrentIdIsUndefined,
                    moveArgument,
                );
            }
            if (tavernCard === null) {
                return ThrowMyError(
                    { G, ...rest },
                    ErrorNames.CurrentTavernCardWithCurrentIdIsNull,
                    moveArgument,
                );
            }
            if (tavernCard.type === CardRusNames.RoyalOfferingCard) {
                continue;
            }
            if (tavernCard.playerSuit === suit) {
                availableMoveArguments.push(moveArgument);
            } else if (tavernCard.playerSuit === thrudSuit) {
                availableThrudArguments.push(moveArgument);
            }
        }
    }
    if (availableMoveArguments.length === 1) {
        return availableMoveArguments[0];
    } else if (availableMoveArguments.length > 1) {
        return CheckSoloBotMustTakeCardWithHighestValue(
            { G, ...rest },
            availableMoveArguments,
        );
    } else if (availableMoveArguments.length === 0 && availableThrudArguments.length) {
        if (availableThrudArguments.length === 1) {
            const thrudMoveArgument: CanBeUndef<number> = availableThrudArguments[0];
            if (thrudMoveArgument === undefined) {
                throw new Error(`В массиве аргументов мува Труд отсутствует аргумент с id '0'.`);
            }
            return thrudMoveArgument;
        } else {
            return CheckSoloBotMustTakeCardWithHighestValue(
                { G, ...rest },
                availableThrudArguments,
            );
        }
    }
    return undefined;
};

/**
 * <h3>Проверяет наибольшее значение для получения карты при выборе карты из таверны соло ботом.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При необходимости выбора карты из таверны соло ботом.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param moveArguments Аргументы действия соло бота.
 * @returns Id карты из таверны, при выборе которой можно получить карту с наибольшим значением.
 */
export const CheckSoloBotMustTakeCardWithHighestValue = (
    { G, ...rest }: Context,
    moveArguments: MoveArguments<number[]>,
): number => {
    const currentTavern: TavernWithoutExpansionArray = G.taverns[G.currentTavern] as TavernWithoutExpansionArray;
    let maxValue = 0,
        index = 0;
    for (let i = 0; i < moveArguments.length; i++) {
        const moveArgument: CanBeUndef<number> = moveArguments[i];
        if (moveArgument === undefined) {
            throw new Error(`В массиве аргументов мува отсутствует аргумент с id '${i}'.`);
        }
        const tavernCard: CanBeUndef<CanBeNull<DwarfDeckCard>> = currentTavern[moveArgument];
        if (tavernCard === undefined) {
            return ThrowMyError(
                { G, ...rest },
                ErrorNames.CurrentTavernCardWithCurrentIdIsUndefined,
                moveArgument,
            );
        }
        if (tavernCard === null) {
            return ThrowMyError(
                { G, ...rest },
                ErrorNames.CurrentTavernCardWithCurrentIdIsNull,
                moveArgument,
            );
        }
        if (tavernCard.type === CardRusNames.RoyalOfferingCard) {
            return ThrowMyError(
                { G, ...rest },
                ErrorNames.CurrentTavernCardWithCurrentIdCanNotBeRoyalOfferingCard,
                moveArgument,
            );
        }
        if (tavernCard.points === null) {
            return SoloBotMustTakeRandomCard(
                { G, ...rest },
                moveArguments,
            );
        } else if (tavernCard.points !== null) {
            if (tavernCard.points > maxValue) {
                maxValue = tavernCard.points;
                index = i;
            }
        }
    }
    const finalMoveArgument: CanBeUndef<number> = moveArguments[index];
    if (finalMoveArgument === undefined) {
        return ThrowMyError(
            { G, ...rest },
            ErrorNames.CurrentTavernCardWithCurrentIdIsNull,
            index,
        );
    }
    return finalMoveArgument;
};

/**
 * <h3>Проверяет возможность получения карты наименее представленной в армии соло бота при выборе карты из таверны соло ботом.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При необходимости выбора карты из таверны соло ботом.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param moveArguments Аргументы действия соло бота.
 * @returns Id карты из таверны, при выборе которой можно получить карту с наибольшим значением.
 */
export const CheckSoloBotMustTakeCardWithSuitsLeastPresentOnPlayerBoard = (
    { G, ctx, ...rest }: Context,
    playerID: PlayerID,
    moveArguments: MoveArguments<number[]>,
): CanBeUndef<number> => {
    const [availableSuitArguments, minLengthCount]: [SuitNames[], number] = CheckSuitsLeastPresentOnSoloBotBoard(
        { G, ctx, ...rest },
        playerID,
    );
    if (availableSuitArguments.length !== minLengthCount) {
        throw new Error(`Недопустимое количество фракций с минимальным количеством карт.`);
    }
    if (!minLengthCount || minLengthCount !== ctx.numPlayers) {
        const currentTavern: TavernWithoutExpansionArray = G.taverns[G.currentTavern] as TavernWithoutExpansionArray,
            soloBotHasThrud: boolean = CheckPlayerHasBuff(
                { G, ctx, ...rest },
                playerID,
                HeroBuffNames.MoveThrud,
            );
        let thrudSuit: CanBeUndef<SuitNames>;
        if (soloBotHasThrud) {
            thrudSuit = GetBuffValue(
                { G, ctx, ...rest },
                playerID,
                HeroBuffNames.MoveThrud,
            ) as SuitNames;
        }
        const leastPresentArguments: MoveArguments<number[]> = [];
        let isNoPoints = false;
        for (let i = 0; i < moveArguments.length; i++) {
            const moveArgument: CanBeUndef<number> = moveArguments[i];
            if (moveArgument === undefined) {
                throw new Error(`В массиве аргументов мува отсутствует аргумент с id '${i}'.`);
            }
            const tavernCard: CanBeUndef<CanBeNull<DwarfDeckCard>> = currentTavern[moveArgument];
            if (tavernCard === undefined) {
                return ThrowMyError(
                    { G, ctx, ...rest },
                    ErrorNames.CurrentTavernCardWithCurrentIdIsUndefined,
                    moveArgument,
                );
            }
            if (tavernCard === null) {
                return ThrowMyError(
                    { G, ctx, ...rest },
                    ErrorNames.CurrentTavernCardWithCurrentIdIsNull,
                    moveArgument,
                );
            }
            if (tavernCard.type === CardRusNames.RoyalOfferingCard) {
                continue;
            }
            const cardSuit: SuitNames = thrudSuit && minLengthCount === 1 && thrudSuit === tavernCard.playerSuit
                ? thrudSuit : tavernCard.playerSuit;
            if (availableSuitArguments.includes(cardSuit) && cardSuit === tavernCard.playerSuit) {
                leastPresentArguments.push(moveArgument);
                if (tavernCard.points === null || tavernCard.playerSuit === SuitNames.miner) {
                    isNoPoints = true;
                }
            }
        }
        if (leastPresentArguments.length === 0) {
            return undefined;
        } else if (availableSuitArguments.length === 1 || !isNoPoints) {
            return CheckSoloBotMustTakeCardWithHighestValue(
                { G, ctx, ...rest },
                leastPresentArguments,
            );
        }
        return SoloBotMustTakeRandomCard(
            { G, ctx, ...rest },
            leastPresentArguments,
        );
    } else {
        return undefined;
    }
};

/**
 * <h3>Проверяет получение карты Королевской награды при выборе карты из таверны соло ботом.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При необходимости выбора карты из таверны соло ботом.</li>
 * </ol>
 *
 * @param context
 * @param moveArguments Аргументы действия соло бота.
 * @returns Id карты Королевской награды из таверны.
 */
export const CheckSoloBotMustTakeRoyalOfferingCard = (
    { G, ...rest }: Context,
    moveArguments: MoveArguments<number[]>,
): CanBeUndef<number> => {
    const currentTavern: TavernWithoutExpansionArray = G.taverns[G.currentTavern] as TavernWithoutExpansionArray;
    for (let i = 0; i < moveArguments.length; i++) {
        const moveArgument: CanBeUndef<number> = moveArguments[i];
        if (moveArgument === undefined) {
            throw new Error(`В массиве аргументов мува отсутствует аргумент с id '${i}'.`);
        }
        const tavernCard: CanBeUndef<CanBeNull<DwarfDeckCard>> = currentTavern[moveArgument];
        if (tavernCard === undefined) {
            return ThrowMyError(
                { G, ...rest },
                ErrorNames.CurrentTavernCardWithCurrentIdIsUndefined, moveArgument);
        }
        if (tavernCard === null) {
            return ThrowMyError({ G, ...rest },
                ErrorNames.CurrentTavernCardWithCurrentIdIsNull,
                moveArgument,
            );
        }
        if (tavernCard.type === CardRusNames.RoyalOfferingCard) {
            return moveArgument;
        }
    }
    return undefined;
};

/**
 * <h3>Проверяет получение случайной карты при выборе карты из таверны соло ботом.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При необходимости выбора карты из таверны соло ботом.</li>
 * </ol>
 *
 * @param context
 * @param moveArguments Аргументы действия соло бота.
 * @returns Id случайной карты из таверны.
 */
export const SoloBotMustTakeRandomCard = (
    { ...rest }: Context,
    moveArguments: MoveArguments<number[]>,
): number => {
    // TODO Delete random cards with same suit but less points from random!
    const moveArgument: CanBeUndef<number> = moveArguments[Math.floor(Math.random() * moveArguments.length)];
    if (moveArgument === undefined) {
        return ThrowMyError(
            { ...rest },
            ErrorNames.CurrentMoveArgumentIsUndefined,
        );
    }
    return moveArgument;
};
