import { AssertAICardCharacteristicsArray, AssertAICardCharacteristicsArrayIndex, AssertOneOrTwo, AssertPlayerCoinId, AssertTavernAllCardsArray, AssertTavernCardId, AssertTavernsHeuristicArray, AssertTavernsHeuristicArrayIndex } from "../is_helpers/AssertionTypeHelpers";
import type { AICardCharacteristics, AIHeuristic, CanBeUndef, Context, NumPlayers, PlayerCoinId, TavernAllCardsArray, TavernCard, TavernsArray, TavernsHeuristicArray, TavernsHeuristicArrayIndex, TavernsNum } from "../typescript/interfaces";
import { CompareCardsInTavern, EvaluateTavernCard } from "./BotCardLogic";

// TODO Check all number types here!
/**
 * <h3>ДОБАВИТЬ ОПИСАНИЕ.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>ДОБАВИТЬ ПРИМЕНЕНИЯ.</li>
 * </oL>
 *
 * @TODO Саше: сделать описание функции и параметров.
 * @param context
 * @returns Результат эвристики.
 */
export const CheckHeuristicsForCoinsPlacement = (
    { G, ...rest }: Context,
): TavernsHeuristicArray => {
    const taverns: TavernsArray = G.taverns,
        // TODO If tavernsHeuristicArray & result === same logic!?
        // TODO -100 | 0 === number in current only 1 heuristic
        tavernsHeuristicArray: number[] = taverns.map((tavern: TavernAllCardsArray): number =>
            absoluteHeuristicsForTradingCoin.reduce((acc: number, item: AIHeuristic):
                number => acc + (item.heuristic(tavern) ? item.weight : 0), 0));
    AssertTavernsHeuristicArray(tavernsHeuristicArray);
    const result: number[] =
        Array(taverns.length).fill(0).map((value: number, index: number):
            number => {
            AssertTavernsHeuristicArrayIndex(index);
            const num: number = tavernsHeuristicArray[index];
            return value + num;
        });
    AssertTavernsHeuristicArray(result);
    // TODO Add types
    const tempNumbers: number[][] = taverns.map((tavern: TavernAllCardsArray): number[] =>
        tavern.map((card: TavernCard, index: number, tavern: TavernCard[]): number => {
            AssertTavernCardId(index);
            AssertTavernAllCardsArray(tavern);
            return EvaluateTavernCard({ G, ...rest }, card, index, tavern);
        })),
        tempChars: AICardCharacteristics[] = tempNumbers.map((element: number[]): AICardCharacteristics =>
            GetCharacteristics(element))/*,
        averageCards: ICard[] = G.averageCards*/;
    AssertAICardCharacteristicsArray(tempChars);
    let maxIndex: TavernsHeuristicArrayIndex = 0,
        minIndex: number = tempChars.length - 1;
    AssertTavernsHeuristicArrayIndex(minIndex);
    for (let i = 1; i < tavernsHeuristicArray.length; i++) {
        AssertTavernsHeuristicArrayIndex(i);
        const maxCard: AICardCharacteristics = tempChars[maxIndex],
            tempCard1: AICardCharacteristics = tempChars[i];
        if (CompareCharacteristics(maxCard, tempCard1) < 0) {
            maxIndex = i;
        }
        const minCard: AICardCharacteristics = tempChars[minIndex],
            tempCard2Num = tempChars.length - 1 - i;
        AssertAICardCharacteristicsArrayIndex(tempCard2Num);
        const tempCard2: AICardCharacteristics = tempChars[tempCard2Num];
        if (CompareCharacteristics(minCard, tempCard2) > 0) {
            minIndex = tempChars.length - 1 - i;
            AssertTavernsHeuristicArrayIndex(minIndex);
        }
    }
    result[maxIndex] += 10;
    result[minIndex] -= 10;
    return result;
};

/**
 * <h3>ДОБАВИТЬ ОПИСАНИЕ.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>ДОБАВИТЬ ПРИМЕНЕНИЯ.</li>
 * </oL>
 *
 * @TODO Саше: сделать описание функции и параметров.
 * @param stat1
 * @param stat2
 * @returns Результат сравнения двух эвристик.
 */
const CompareCharacteristics = (
    stat1: AICardCharacteristics,
    stat2: AICardCharacteristics,
): number => {
    const eps = 0.0001,
        tempVariation: number = stat1.variation - stat2.variation;
    if (Math.abs(tempVariation) < eps) {
        return stat1.mean - stat2.mean;
    }
    return tempVariation;
};

/**
 * <h3>Получает все комбинации взятия карт из всех таверн.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При формировании данных для ботов.</li>
 * </oL>
 *
 * @param tavernsNum Количество таверн.
 * @param playersNum Количество игроков.
 * @returns Перечень всех комбинаций взятия карт.
 */
export const GetAllPicks = (
    tavernsNum: TavernsNum,
    playersNum: NumPlayers,
): PlayerCoinId[][] => {
    const temp: PlayerCoinId[][] = [],
        cartesian = (...arrays: PlayerCoinId[][]): PlayerCoinId[][] =>
            arrays.reduce((accSets: PlayerCoinId[][], set: PlayerCoinId[]): PlayerCoinId[][] =>
                // TODO It's only validation or can be!?
                // if (a.length === 1) {
                //     a = a.flat();
                // }
                accSets.flatMap((accSet: PlayerCoinId[]): PlayerCoinId[][] =>
                    set.map((value: PlayerCoinId): PlayerCoinId[] =>
                        [...accSet, value])), [[]]);
    for (let i = 0; i < tavernsNum; i++) {
        temp[i] = Array(playersNum).fill(undefined)
            .map((item: undefined, index: number): PlayerCoinId => {
                AssertPlayerCoinId(index);
                return index;
            });
    }
    return cartesian(...temp);
};

//may be to add different kinds of variation (1-order, 2-order, 4-order, ..., infinity-order)
/**
 * <h3>ДОБАВИТЬ ОПИСАНИЕ.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>ДОБАВИТЬ ПРИМЕНЕНИЯ.</li>
 * </oL>
 *
 * @TODO Саше: сделать описание функции и параметров.
 * @param array
 * @returns Характеристики карты для ботов.
 */
const GetCharacteristics = (
    array: number[],
): AICardCharacteristics => {
    const mean: number = array.reduce((acc: number, item: number): number =>
        acc + item / array.length, 0),
        variation: number = array.reduce((acc: number, item: number): number =>
            acc + ((item - mean) ** 2) / array.length, 0);
    return {
        mean,
        variation,
    };
};

//absolute heuristics
/**
 * <h3>ДОБАВИТЬ ОПИСАНИЕ.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>ДОБАВИТЬ ПРИМЕНЕНИЯ.</li>
 * </oL>
 * @TODO Саше: сделать описание функции и параметров.
 */
const isAllCardsEqual: AIHeuristic = {
    // TODO Add errors for undefined
    heuristic: (cards: TavernCard[]): boolean => cards.every((card: TavernCard): boolean =>
        (cards[0] !== undefined && CompareCardsInTavern(card, cards[0]) === 0)),
    weight: -100,
};

//relative heuristics
/**
 * <h3>ДОБАВИТЬ ОПИСАНИЕ.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>ДОБАВИТЬ ПРИМЕНЕНИЯ.</li>
 * </oL>
 * @TODO Саше: сделать описание функции и параметров.
 */
// const isAllAverage: IHeuristic<number[]> = {
//     heuristic: (array: number[]): boolean => array.every((item: number): boolean => item === 0),
//     weight: 20,
// };

/**
 * <h3>ДОБАВИТЬ ОПИСАНИЕ.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>ДОБАВИТЬ ПРИМЕНЕНИЯ.</li>
 * </oL>
 * @TODO Саше: сделать описание функции и параметров.
 */
// const isAllWorse: IHeuristic<number[]> = {
//     heuristic: (array: number[]): boolean => array.every((item: number): boolean => item === -1),
//     weight: 40,
// };

/**
 * <h3>ДОБАВИТЬ ОПИСАНИЕ.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>ДОБАВИТЬ ПРИМЕНЕНИЯ.</li>
 * </oL>
 * @TODO Саше: сделать описание функции и параметров.
 */
// const isOnlyOneWorse: IHeuristic<number[]> = {
//     heuristic: (array: number[]): boolean =>
//         (array.filter((item: number): boolean => item === -1).length === 1),
//     weight: -100,
// };

/**
 * <h3>ДОБАВИТЬ ОПИСАНИЕ.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>ДОБАВИТЬ ПРИМЕНЕНИЯ.</li>
 * </oL>
 * @TODO Саше: сделать описание функции и параметров.
 */
// const isOnlyWorseOrBetter: IHeuristic<number[]> = {
//     heuristic: (array: number[]): boolean => array.every((item: number): boolean => item !== 0),
//     weight: -50,
// };

/**
 * <h3>ДОБАВИТЬ ОПИСАНИЕ.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>ДОБАВИТЬ ПРИМЕНЕНИЯ.</li>
 * </oL>
 *
 * @TODO Саше: сделать описание функции и параметров.
 * @param set
 * @param k
 * @returns Все комбинации расположения монет.
 */
export const k_combinations = (
    set: PlayerCoinId[],
    k: 1 | 2 | 3,
): PlayerCoinId[][] => {
    const combs: PlayerCoinId[][] = [];
    let head: PlayerCoinId[],
        tailCombs: PlayerCoinId[][];
    if (k > set.length || k <= 0) {
        return [];
    }
    if (k === set.length) {
        return [set];
    }
    if (k === 1) {
        for (let i = 0; i < set.length; i++) {
            const num1: CanBeUndef<PlayerCoinId> = set[i];
            if (num1 === undefined) {
                throw new Error(`Отсутствует значение с id '${i}'.`);
            }
            combs.push([num1]);
        }
        return combs;
    }
    for (let i = 0; i < set.length - k + 1; i++) {
        // head is a list that includes only our current element.
        head = set.slice(i, i + 1);
        const newK: number = k - 1;
        AssertOneOrTwo(newK);
        // We take smaller combinations from the subsequent elements
        tailCombs = k_combinations(set.slice(i + 1), newK);
        // For each (k-1)-combination we join it with the current and store it to the set of k-combinations.
        for (let j = 0; j < tailCombs.length; j++) {
            const num2: CanBeUndef<PlayerCoinId[]> = tailCombs[j];
            if (num2 === undefined) {
                throw new Error(`Отсутствует значение с id '${i}'.`);
            }
            combs.push(head.concat(num2));
        }
    }
    return combs;
};

/**
 * <h3>ДОБАВИТЬ ОПИСАНИЕ.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>ДОБАВИТЬ ПРИМЕНЕНИЯ.</li>
 * </oL>
 *
 * @TODO Саше: сделать описание функции и параметров.
 * @param permutation
 * @returns Результат перестановки.
 */
export const Permute = (
    permutation: PlayerCoinId[],
): PlayerCoinId[][] => {
    const length: number = permutation.length,
        result: PlayerCoinId[][] = [permutation.slice()],
        c: number[] = new Array(length).fill(0);
    let i = 1,
        k: number,
        p: PlayerCoinId;
    while (i < length) {
        let num: CanBeUndef<number> = c[i];
        if (num === undefined) {
            throw new Error(`Отсутствует значение 'num' с id '${i}'.`);
        }
        if (num < i) {
            k = i % 2 && num;
            const permI: CanBeUndef<PlayerCoinId> = permutation[i];
            if (permI === undefined) {
                throw new Error(`Отсутствует значение 'permI' с id '${i}'.`);
            }
            p = permI;
            const permK: CanBeUndef<PlayerCoinId> = permutation[k];
            if (permK === undefined) {
                throw new Error(`Отсутствует значение 'permK' с id '${i}'.`);
            }
            permutation[i] = permK;
            permutation[k] = p;
            // TODO It was ++c[i]; - is it ok replacement?
            ++num;
            i = 1;
            result.push(permutation.slice());
        } else {
            // TODO It was c[i] = 0; - is it ok replacement?
            num = 0;
            ++i;
        }
    }
    return result;
};

/**
 * <h3>ДОБАВИТЬ ОПИСАНИЕ.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>ДОБАВИТЬ ПРИМЕНЕНИЯ.</li>
 * </oL>
 * @TODO Саше: сделать описание функции и параметров.
 */
const absoluteHeuristicsForTradingCoin: AIHeuristic[] = [isAllCardsEqual];

/**
 * <h3>ДОБАВИТЬ ОПИСАНИЕ.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>ДОБАВИТЬ ПРИМЕНЕНИЯ.</li>
 * </oL>
 * @TODO Саше: сделать описание функции и параметров.
 */
// const relativeHeuristicsForTradingCoin: (((array: number[]) => boolean) | IHeuristic<number[]>)[] =
// [isAllWorse, isAllAverage, isAllBetter, isOnlyOneWorse, isOnlyWorseOrBetter];
// console.log(relativeHeuristicsForTradingCoin ?? "");
