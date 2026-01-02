import { AssertFullMythologicalCreatureCardsForGiantSkymir } from "../is_helpers/AssertionTypeHelpers";
import { GiantRusNames } from "../typescript/enums";
import type { ActionFunctionWithoutParams, CanBeUndef, Context, MythologicalCreatureCard } from "../typescript/interfaces";

/**
 * <h3>Действия, связанные с добавлением карт Мифических существ для выбора Skymir.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При активации способности Гиганта Skymir.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export const AddMythologyCreatureCardsSkymirAction: ActionFunctionWithoutParams = (
    {
        G,
    }: Context,
): void => {
    if (G.mythologicalCreatureDeckForSkymir === null) {
        throw new Error(`Массив всех карт мифических существ для '${GiantRusNames.Skymir}' не может не быть заполнен картами.`);
    }
    const mythologyCreatureCardsSkymir: MythologicalCreatureCard[] = [];
    for (let j = 0; j < 5; j++) {
        const mythologyCreatureCard: CanBeUndef<MythologicalCreatureCard> =
            G.secret.mythologicalCreatureNotInGameDeck.splice(0, 1)[0];
        if (mythologyCreatureCard === undefined) {
            throw new Error(`В массиве карт Мифических существ не в игре отсутствует карта с id '${j}'.`);
        }
        mythologyCreatureCardsSkymir.push(mythologyCreatureCard);
    }
    AssertFullMythologicalCreatureCardsForGiantSkymir(mythologyCreatureCardsSkymir);
    G.mythologicalCreatureDeckForSkymir = mythologyCreatureCardsSkymir;
};
