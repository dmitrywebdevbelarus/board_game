import { suitsConfig } from "../data/SuitData";
import { ThrowMyError } from "../Error";
import { AssertGeneralStrategyForSoloBotAndvariId, AssertReserveStrategyForSoloBotAndvariId } from "../is_helpers/AssertionTypeHelpers";
import { TotalRank } from "../score_helpers/ScoreHelpers";
import { CardRusNames, ErrorNames, SoloGameAndvariStrategyNames, SuitNames } from "../typescript/enums";
import type { CanBeNull, CanBeUndef, Context, DwarfDeckCard, MoveArguments, PlayerBoardCard, PlayerID, PublicPlayer, TavernWithoutExpansionArray } from "../typescript/interfaces";

// TODO Can i rework all moveArguments: MoveArgumentsType<number[]>?
/**
 * <h3>Проверяет возможность получения нового героя при выборе карты из таверны соло ботом Андвари.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При необходимости выбора карты из таверны соло ботом Андвари.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @returns Фракция дворфов для выбора карты, чтобы получить нового героя.
 */
const CheckSoloBotAndvariCanPickHero = (
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
        heroesLength: number = soloBotPublicPlayer.heroes.length -
            ((G.soloGameAndvariStrategyLevel === SoloGameAndvariStrategyNames.NoHeroEasyStrategy
                || G.soloGameAndvariStrategyLevel === SoloGameAndvariStrategyNames.NoHeroHardStrategy) ? 0 : 5),
        playerCardsCount: number[] = playerCards.map((item: PlayerBoardCard[]): number =>
            item.reduce(TotalRank, 0)),
        minLength: number = Math.min(...playerCardsCount),
        minLengthCount: number =
            playerCardsCount.filter((length: number): boolean => length === minLength).length,
        isCanPickHero: boolean = minLength === heroesLength && minLengthCount === 1;
    if (isCanPickHero) {
        const suitIndex: number = playerCardsCount.indexOf(minLength);
        if (suitIndex === -1) {
            throw new Error(`В массиве фракций отсутствует фракция с минимальным количеством карт '${minLength}' для выкладки карты соло ботом Андвари.`);
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
 * <h3>Проверяет возможность получения нового героя при выборе карты из таверны соло ботом Андвари.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При необходимости выбора карты из таверны соло ботом Андвари.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param moveArguments Аргументы действия соло бота Андвари.
 * @returns Id карты из таверны, при выборе которой можно получить нового героя.
 */
export const CheckSoloBotAndvariMustTakeCardToPickHero = (
    { G, ...rest }: Context,
    playerID: PlayerID,
    moveArguments: MoveArguments<number[]>,
): CanBeUndef<number> => {
    const suit: CanBeUndef<SuitNames> = CheckSoloBotAndvariCanPickHero(
        { G, ...rest },
        playerID,
    ),
        availableMoveArguments: MoveArguments<number[]> = [];
    if (suit !== undefined) {
        const currentTavern: TavernWithoutExpansionArray =
            G.taverns[G.currentTavern] as TavernWithoutExpansionArray;
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
            }
        }
    }
    if (availableMoveArguments.length === 1) {
        return availableMoveArguments[0];
    } else if (availableMoveArguments.length > 1) {
        return CheckSoloBotAndvariMustTakeCardWithHighestValue(
            { G, ...rest },
            availableMoveArguments,
        );
    }
    return undefined;
};

/**
 * <h3>Проверяет наибольшее значение для получения карты при выборе карты из таверны соло ботом Andvari.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При необходимости выбора карты из таверны соло ботом Andvari.</li>
 * </ol>
 *
 * @param context
 * @param moveArguments Аргументы действия соло бота Andvari.
 * @returns Id карты из таверны, при выборе которой можно получить карту с наибольшим значением.
 */
const CheckSoloBotAndvariMustTakeCardWithHighestValue = (
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
            return SoloBotAndvariMustTakeRandomCard(moveArguments);
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
 * <h3>Проверяет возможность получения карты по указанной стратегии при выборе карты из таверны соло ботом Андвари.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При необходимости выбора карты из таверны соло ботом Андвари.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param moveArguments Аргументы действия соло бота Андвари.
 * @param suit Название фракции дворфов.
 * @returns Id карты из таверны, при выборе которой можно получить карту по указанной стратегии соло бота Андвари.
 */
const CheckSoloBotAndvariMustTakeCardFromCurrentStrategy = (
    { G, ...rest }: Context,
    playerID: PlayerID,
    moveArguments: MoveArguments<number[]>,
    suit: SuitNames,
): MoveArguments<number[]> => {
    // TODO Move same code here and for reserve strategy to one helper function
    // TODO Check playerID === PlayerIdForSoloGameNames.SoloBotPlayerId?
    const soloBotPublicPlayer: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
    if (soloBotPublicPlayer === undefined) {
        return ThrowMyError(
            { G, ...rest },
            ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
            playerID,
        );
    }
    const currentTavern: TavernWithoutExpansionArray = G.taverns[G.currentTavern] as TavernWithoutExpansionArray,
        strategyArguments: MoveArguments<number[]> = [];
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
        if (suit === tavernCard.playerSuit) {
            strategyArguments.push(moveArgument);
        }
    }
    return strategyArguments;

};

/**
 * <h3>Проверяет возможность получения карты по главной стратегии при выборе карты из таверны соло ботом Андвари.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При необходимости выбора карты из таверны соло ботом Андвари.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param moveArguments Аргументы действия соло бота Андвари.
 * @returns Id карты из таверны, при выборе которой можно получить карту по главной стратегии соло бота Андвари.
 */
export const CheckSoloBotAndvariMustTakeCardFromGeneralStrategy = (
    { G, ...rest }: Context,
    playerID: PlayerID,
    moveArguments: MoveArguments<number[]>,
): CanBeUndef<number> => {
    if (G.soloGameAndvariStrategyVariantLevel === null) {
        throw new Error(`Не задан вариант уровня сложности для стратегий соло бота Андвари в соло игре.`);
    }
    for (let i = 0; i < G.soloGameAndvariStrategyVariantLevel; i++) {
        AssertGeneralStrategyForSoloBotAndvariId(i);
        if (G.strategyForSoloBotAndvari === null) {
            throw new Error(`В объекте стратегий для соло бота Андвари не может не быть фракций.`);
        }
        const suit: CanBeUndef<CanBeNull<SuitNames>> = G.strategyForSoloBotAndvari.general[i];
        if (suit === undefined) {
            throw new Error(`В объекте главных стратегий соло бота Андвари отсутствует фракция с id '${i}'.`);
        }
        if (suit === null) {
            throw new Error(`В объекте главных стратегий соло бота Андвари не задана фракция с id '${i}'.`);
        }
        const strategyArguments: MoveArguments<number[]> = CheckSoloBotAndvariMustTakeCardFromCurrentStrategy(
            { G, ...rest },
            playerID,
            moveArguments,
            suit,
        );
        if (strategyArguments.length === 1) {
            return strategyArguments[0];
        } else if (strategyArguments.length > 1) {
            return CheckSoloBotAndvariMustTakeCardWithHighestValue({ G, ...rest },
                strategyArguments);
        }
    }
    return undefined;
};

/**
 * <h3>Проверяет возможность получения карты по резервной стратегии при выборе карты из таверны соло ботом Андвари.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При необходимости выбора карты из таверны соло ботом Андвари.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param moveArguments Аргументы действия соло бота Андвари.
 * @returns Id карты из таверны, при выборе которой можно получить карту по резервной стратегии соло бота Андвари.
 */
export const SoloBotMustTakeCardFromReserveStrategy = (
    { G, ...rest }: Context,
    playerID: PlayerID,
    moveArguments: MoveArguments<number[]>,
): number => {
    if (G.soloGameAndvariStrategyVariantLevel === null) {
        throw new Error(`Не задан вариант уровня сложности для стратегий соло бота Андвари в соло игре.`);
    }
    for (let i = G.soloGameAndvariStrategyVariantLevel + 1; i < 5; i++) {
        AssertReserveStrategyForSoloBotAndvariId(i);
        if (G.strategyForSoloBotAndvari === null) {
            throw new Error(`В объекте стратегий для соло бота Андвари не может не быть фракций.`);
        }
        const suit: CanBeUndef<CanBeNull<SuitNames>> = G.strategyForSoloBotAndvari.reserve[i];
        if (suit === undefined) {
            throw new Error(`В объекте резервных стратегий соло бота Андвари отсутствует фракция с id '${i}'.`);
        }
        if (suit === null) {
            throw new Error(`В объекте резервных стратегий соло бота Андвари не задана фракция с id '${i}'.`);
        }
        const strategyArguments: MoveArguments<number[]> = CheckSoloBotAndvariMustTakeCardFromCurrentStrategy(
            { G, ...rest },
            playerID,
            moveArguments,
            suit,
        );
        if (strategyArguments.length === 1) {
            const moveArgument: CanBeUndef<number> = strategyArguments[0];
            if (moveArgument === undefined) {
                throw new Error(`В массиве резервных стратегий с id '${i}' отсутствует необходимое значение.`);
            }
            return moveArgument;
        } else if (strategyArguments.length > 1) {
            return CheckSoloBotAndvariMustTakeCardWithHighestValue(
                { G, ...rest },
                strategyArguments,
            );
        }
    }
    throw new Error(`В массиве резервных стратегий отсутствует необходимое значение.`);
};

/**
 * <h3>Проверяет получение карты Королевской награды при выборе карты из таверны соло ботом Андвари.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При необходимости выбора карты из таверны соло ботом Андвари.</li>
 * </ol>
 *
 * @param context
 * @param moveArguments Аргументы действия соло бота Андвари.
 * @returns Id карты Королевской награды из таверны.
 */
export const CheckSoloBotAndvariMustTakeRoyalOfferingCard = (
    { G, ...rest }: Context,
    moveArguments: MoveArguments<number[]>,
): CanBeUndef<number> => {
    // TODO Move code here and for solo bot royal to one helper function
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
            return moveArgument;
        }
    }
    return undefined;
};

/**
 * <h3>Проверяет получение случайной карты при выборе карты из таверны соло ботом Андвари.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При необходимости выбора карты из таверны соло ботом Андвари.</li>
 * </ol>
 *
 * @param moveArguments Аргументы действия соло бота Андвари.
 * @returns Id случайной карты из таверны.
 */
const SoloBotAndvariMustTakeRandomCard = (
    moveArguments: MoveArguments<number[]>,
): number => {
    // TODO Move code here and for solo bot and for move validators to one helper function
    const moveArgument: CanBeUndef<number> = moveArguments[Math.floor(Math.random() * moveArguments.length)];
    if (moveArgument === undefined) {
        throw new Error(`Отсутствует необходимый аргумент мува для бота.`);
    }
    return moveArgument;
};
