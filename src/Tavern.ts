import { ThrowMyError } from "./Error";
import { GetCardsFromSecretDwarfDeck, GetMythologicalCreatureCardsFromSecretMythologicalCreatureDeck } from "./helpers/DecksHelpers";
import { DiscardCurrentCard, RemoveCardFromTavern } from "./helpers/DiscardCardHelpers";
import { AssertRemovedCardsFromTavernArray, AssertTavernCardId, AssertTavernIndex, AssertTierIndex } from "./is_helpers/AssertionTypeHelpers";
import { AddDataToLog } from "./Logging";
import { ErrorNames, GameModeNames, LogNames, TavernNames } from "./typescript/enums";
import type { Context, RefillDeckCardsArray, TavernAllCardsArray, TavernCard, TavernCardWithPossibleExpansion, TavernPossibleCardId, TavernsConfig } from "./typescript/interfaces";

/**
 * <h3>Проверяет не осталось ли карт в текущей таверне.</h1>
 * <p>Применения:</p>
 * <ol>
 * <li>При проверке необходимость завершения фазы 'Посещение таверн' (если не осталось карт в текущей таверне).</li>
 * <li>При финальных действиях после завершения фазы 'Посещение таверн' (чтобы убедиться, что не осталось карт в текущей таверне).</li>
 * <li>При каждом действии первого игрока в фазу 'Посещение таверн' при игре на двух игроков, если первым игроком выбрана карта из лагеря и нужно сбросить одну карту из таверны в стопку сброса (чтобы убедиться, что остались карты в текущей таверне).</li>
 * <li>При завершении хода последнего игрока в фазу 'Посещение таверн' при игре на двух игроков или в соло режиме, чтобы сбросить одну лишнюю карту из таверны в стопку сброса (чтобы убедиться, что остались карты в текущей таверне).</li>
 * </ol>
 *
 * @param context
 * @returns Нет ли карт в текущей таверне.
 */
export const CheckIfCurrentTavernEmpty = (
    { G }: Context,
): boolean => G.taverns[G.currentTavern].every((card: TavernCard): boolean => card === null);

/**
 * <h3>Сбрасывает одну лишнюю карту из таверны в стопку сброса при игре на двух игроков или в соло режиме.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При завершении хода последнего игрока в фазу 'Посещение таверн' при игре на двух игроков или в соло режиме, чтобы сбросить одну лишнюю карту из таверны в стопку сброса.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export const DiscardCardIfTavernHasCardFor2Players = (
    { G, ctx, ...rest }: Context,
): void => {
    if ((G.mode === GameModeNames.Basic || G.mode === GameModeNames.Multiplayer) && ctx.numPlayers !== 2) {
        return ThrowMyError({ G, ctx, ...rest }, ErrorNames.OnlyInSoloOrTwoPlayersGame);
    }
    AddDataToLog(
        { G, ctx, ...rest },
        LogNames.Game,
        `Лишняя карта из текущей таверны ${tavernsConfig[G.currentTavern].name} должна быть убрана в сброс при игре ${(G.mode === GameModeNames.Solo || G.mode === GameModeNames.SoloAndvari) ? `в соло режиме` : `на двух игроков в игре`}.`,
    );
    DiscardCardFromTavern({ G, ctx, ...rest });
};

/**
 * <h3>Автоматически сбрасывает одну лишнюю карту из таверны в стопку сброса.</h3>
 * <p>Применения: </p>
 * <ol>
 * <li>При игре на двух игроков или в соло режиме, когда сбрасывается одна лишняя карта из таверны в стопку сброса.</li>
 * <li>При сбросе одной лишней карты таверны в колоду сброса, если первый игрок выбрал карту из лагеря.</li>
 * <li>При сбросе одной лишней карты таверны в колоду сброса, если какой - то игрок выбрал в лагере артефакт Jarnglofi и если сброшенная обменная монета была выложена на месте одной из таверн.</li>
 * </ol>
 *
 * @param context
 * @returns Сброшена ли карта из таверны.
 */
export const DiscardCardFromTavern = (
    { G, ...rest }: Context,
): void => {
    const tavernCardId: number =
        G.taverns[G.currentTavern].findIndex((card: TavernCard): boolean => card !== null);
    if (tavernCardId === -1) {
        return ThrowMyError(
            { G, ...rest },
            ErrorNames.DoNotDiscardCardFromCurrentTavernIfNoCardInTavern,
            G.currentTavern,
        );
    }
    AssertTavernCardId(tavernCardId);
    DiscardConcreteCardFromTavern(
        { G, ...rest },
        tavernCardId,
    );
};

/**
 * <h3>Сбрасывает конкретную карту из таверны в стопку сброса.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При автоматическом сбросе конкретной лишней карты из таверны.</li>
 * <li>При сбросе конкретной карты из таверны после выбора первым игроком карты из лагеря при игре на двух игроков.</li>
 * </ol>
 *
 * @param context
 * @param tavernCardId Индекс сбрасываемой карты в таверне.
 * @returns Сброшена ли карта из таверны.
 */
export const DiscardConcreteCardFromTavern = (
    { G, ...rest }: Context,
    tavernCardId: TavernPossibleCardId,
): void => {
    const discardedCard: TavernCardWithPossibleExpansion = RemoveCardFromTavern(
        { G, ...rest },
        tavernCardId,
    );
    DiscardCurrentCard(
        { G, ...rest },
        discardedCard,
    );
    AddDataToLog(
        { G, ...rest },
        LogNames.Game,
        `Карта '${discardedCard.type}' '${discardedCard.name}' из таверны ${tavernsConfig[G.currentTavern].name} убрана в сброс.`,
    );
};

/**
 * <h3>Автоматически заполняет все таверны картами текущей эпохи.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при подготовке к фазе 'Ставки'.</li>
 * </ol>
 *
 * @param context
 * @returns
 */
export const RefillTaverns = (
    { G, ...rest }: Context,
): void => {
    for (let t = 0; t < G.tavernsNum; t++) {
        let refillDeck: RefillDeckCardsArray;
        if (G.expansions.Idavoll.active && G.tierToEnd === 2 && G.round < 3 && t === 1) {
            refillDeck = GetMythologicalCreatureCardsFromSecretMythologicalCreatureDeck({ G, ...rest });
        } else {
            const tier: number = G.secret.decks.length - G.tierToEnd;
            AssertTierIndex(tier);
            refillDeck = GetCardsFromSecretDwarfDeck(
                { G, ...rest },
                tier,
                0,
                G.drawSize,
            );
        }
        AssertTavernIndex(t);
        const tavern: TavernAllCardsArray = G.taverns[t],
            removedCardsFromTavern: TavernCard[] =
                tavern.splice(0, tavern.length, ...refillDeck);
        AssertRemovedCardsFromTavernArray(removedCardsFromTavern);
        AddDataToLog(
            { G, ...rest },
            LogNames.Game,
            `Таверна ${tavernsConfig[t].name} заполнена новыми картами.`,
        );
    }
    AddDataToLog(
        { G, ...rest },
        LogNames.Game,
        `Все таверны заполнены новыми картами.`,
    );
};

/**
 * <h3>Конфиг таверн.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При описании названия таверн в логах.</li>
 * <li>При описании названия таверн в уникальных ключах.</li>
 * </ol>
 */
export const tavernsConfig: TavernsConfig = [
    {
        name: TavernNames.LaughingGoblin,
    },
    {
        name: TavernNames.DancingDragon,
    },
    {
        name: TavernNames.ShiningHorse,
    },
];
