import { suitsConfig } from "../data/SuitData";
import { ThrowMyError } from "../Error";
import { TotalRank } from "../score_helpers/ScoreHelpers";
import { CardRusNames, ErrorNames, PickHeroCardValidatorNames } from "../typescript/enums";
/**
 * <h3>Действия, связанные с возможностью сброса карт с планшета игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе конкретных героев, дающих возможность сброса карт с планшета игрока.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param id Id героя.
 * @returns Можно ли пикнуть конкретного героя.
 */
export const IsCanPickHeroWithDiscardCardsFromPlayerBoardValidator = ({ G, ...rest }, playerID, id) => {
    const hero = G.heroes[id];
    if (hero === undefined) {
        throw new Error(`Не существует карта героя с id '${id}'.`);
    }
    const validators = hero.pickValidators, cardsToDiscard = [];
    if (validators?.discardCard !== undefined) {
        let suit;
        for (suit in suitsConfig) {
            if (validators.discardCard.suit !== suit) {
                const player = G.publicPlayers[playerID];
                if (player === undefined) {
                    return ThrowMyError({ G, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
                }
                const last = player.cards[suit].length - 1;
                if (last >= 0) {
                    const card = player.cards[suit][last];
                    if (card === undefined) {
                        throw new Error(`В массиве карт фракции '${suit}' отсутствует последняя карта с id '${last}'.`);
                    }
                    if (card.type !== CardRusNames.HeroPlayerCard) {
                        cardsToDiscard.push(card);
                    }
                }
            }
        }
        return cardsToDiscard.length >= (validators.discardCard.amount ?? 1);
    }
    return false;
};
/**
 * <h3>Действия, связанные с выбором героев по определённым условиям.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе конкретных героев, получаемых по определённым условиям.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param id Id героя.
 * @returns Можно ли пикнуть конкретного героя.
 */
export const IsCanPickHeroWithConditionsValidator = ({ G, ...rest }, playerID, id) => {
    const hero = G.heroes[id];
    if (hero === undefined) {
        throw new Error(`Не существует карта героя с id '${id}'.`);
    }
    const conditions = hero.pickValidators?.conditions;
    if (conditions === undefined) {
        throw new Error(`У карты ${CardRusNames.HeroCard} с id '${id}' отсутствует у валидатора свойство '${PickHeroCardValidatorNames.conditions}'.`);
    }
    let condition;
    for (condition in conditions) {
        if (condition === `suitCountMin`) {
            let ranks = 0, conditionRanks = null, key;
            for (key in conditions[condition]) {
                if (key === `suit`) {
                    const player = G.publicPlayers[playerID];
                    if (player === undefined) {
                        return ThrowMyError({ G, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
                    }
                    ranks = player.cards[conditions[condition][key]].reduce(TotalRank, 0);
                }
                else if (key === `count`) {
                    conditionRanks = conditions[condition][key];
                }
            }
            if (conditionRanks === null) {
                throw new Error(`Отсутствует обязательный параметр значения 'count'.`);
            }
            return ranks >= conditionRanks;
        }
    }
    return false;
};
//# sourceMappingURL=IsCanPickCurrentHeroValidator.js.map