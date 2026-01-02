import { ChangeIsOpenedCoinStatus } from "../Coin";
import { AllStackData } from "../data/StackData";
import { ThrowMyError } from "../Error";
import { AddAnyCardToPlayerActions } from "../helpers/CardHelpers";
import { UpgradeCoinActions } from "../helpers/CoinActionHelpers";
import { DiscardCurrentCard, RemoveCardFromPlayerBoardSuitCards, RemoveCardsFromCampAndAddIfNeeded } from "../helpers/DiscardCardHelpers";
import { AddActionsToStack } from "../helpers/StackHelpers";
import { AssertBasicVidofnirVedrfolnirUpgradeValue, AssertPlayerCoinId, AssertPlayerPouchCoinId } from "../is_helpers/AssertionTypeHelpers";
import { IsCoin } from "../is_helpers/IsCoinTypeHelpers";
import { AddDataToLog } from "../Logging";
import { ArtefactNames, CardRusNames, CoinNames, ErrorNames, GameModeNames, LogNames, SuitNames } from "../typescript/enums";
import type { BasicVidofnirVedrfolnirUpgradeValue, CampCard, CampCardArrayIndex, CanBeUndef, Context, PlayerBoardCard, PlayerCoinId, PlayerHandCoins, PlayerID, PlayerPouchCoinId, PlayerStack, PrivatePlayer, PublicPlayer, PublicPlayerCoin, UpgradableCoinValue } from "../typescript/interfaces";

/**
 * <h3>Действия, связанные с добавлением монет в кошель для обмена при наличии персонажа Улина для начала действия артефакта Vidofnir Vedrfolnir.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе карты артефакта Vidofnir Vedrfolnir и наличии героя Улина.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param coinId Id монеты.
 * @returns
 */
export const AddCoinToPouchAction = (
    { G, ...rest }: Context,
    playerID: PlayerID,
    coinId: PlayerCoinId,
): void => {
    const player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID],
        privatePlayer: CanBeUndef<PrivatePlayer> = G.players[playerID];
    if (player === undefined) {
        return ThrowMyError(
            { G, ...rest },
            ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
            playerID,
        );
    }
    if (privatePlayer === undefined) {
        return ThrowMyError(
            { G, ...rest },
            ErrorNames.PrivatePlayerWithCurrentIdIsUndefined,
            playerID,
        );
    }
    const tempId: number =
        player.boardCoins.findIndex((coin: PublicPlayerCoin, index: number): boolean =>
            index >= G.tavernsNum && coin === null);
    if (tempId === -1) {
        throw new Error(`В массиве монет игрока с id '${playerID}' на столе отсутствует место для добавления в кошель для действия карты '${CardRusNames.ArtefactCard}' '${ArtefactNames.VidofnirVedrfolnir}'.`);
    }
    AssertPlayerCoinId(tempId);
    let handCoins: PlayerHandCoins;
    if (G.mode === GameModeNames.Multiplayer) {
        handCoins = privatePlayer.handCoins;
    } else {
        handCoins = player.handCoins;
    }
    const handCoin: PublicPlayerCoin = handCoins[coinId];
    if (handCoin === null) {
        throw new Error(`В массиве монет игрока с id '${playerID}' в руке не может не быть монеты с id '${coinId}'.`);
    }
    if (!IsCoin(handCoin)) {
        throw new Error(`Монета с id '${coinId}' в руке текущего игрока с id '${playerID}' не может быть закрытой для него.`);
    }
    if (!handCoin.isOpened) {
        ChangeIsOpenedCoinStatus(handCoin, true);
    }
    if (G.mode === GameModeNames.Multiplayer) {
        player.handCoins[coinId] = null;
        privatePlayer.boardCoins[tempId] = handCoin;
    }
    player.boardCoins[tempId] = handCoin;
    handCoins[coinId] = null;
    AddDataToLog(
        { G, ...rest },
        LogNames.Game,
        `Игрок '${player.nickname}' положил монету ценностью '${handCoin.value}' в свой кошель.`,
    );
};

/**
 * <h3>Действия, связанные с выбором значения улучшения монеты при наличии персонажа Улина для начала действия артефакта Vidofnir Vedrfolnir.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе карты артефакта Vidofnir Vedrfolnir и наличии героя Улина.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param value Значение улучшения монеты.
 * @returns
 */
export const ChooseCoinValueForVidofnirVedrfolnirUpgradeAction = (
    { G, ...rest }: Context,
    playerID: PlayerID,
    value: BasicVidofnirVedrfolnirUpgradeValue,
): void => {
    const player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError(
            { G, ...rest },
            ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
            playerID,
        );
    }
    const stack: CanBeUndef<PlayerStack> = player.stack[0];
    if (stack === undefined) {
        return ThrowMyError(
            { G, ...rest },
            ErrorNames.FirstStackActionForPlayerWithCurrentIdIsUndefined,
            playerID,
        );
    }
    if (stack.coinId !== undefined) {
        AssertPlayerPouchCoinId(stack.coinId);
    }
    AddActionsToStack(
        { G, ...rest },
        playerID,
        [
            AllStackData.upgradeCoinVidofnirVedrfolnir(
                value,
                stack.coinId,
                stack.priority === 0 ? undefined : 3,
            ),
        ],
    );
};

/**
 * <h3>Действия, связанные с сбросом карты из конкретной фракции игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе карты для сброса по действию карты лагеря артефакта Hofud.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param cardId Id сбрасываемой карты.
 * @returns
 */
export const DiscardSuitCardAction = (
    { G, ...rest }: Context,
    playerID: PlayerID,
    cardId: number,
): void => {
    const player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError(
            { G, ...rest },
            ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
            playerID,
        );
    }
    const discardedCard: PlayerBoardCard = RemoveCardFromPlayerBoardSuitCards(
        { G, ...rest },
        playerID,
        SuitNames.warrior,
        cardId,
    );
    DiscardCurrentCard(
        { G, ...rest },
        discardedCard,
    );
    AddDataToLog(
        { G, ...rest },
        LogNames.Game,
        `Карта '${discardedCard.type}' '${discardedCard.name}' убрана в сброс из-за выбора карты '${CardRusNames.ArtefactCard}' '${ArtefactNames.Hofud}'.`,
    );
    player.stack = [];
};

/**
 * <h3>Действия, связанные с выбором карты лагеря.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе карты лагеря.</li>
 * <li>При выборе карты лагеря по действию персонажа Хольда.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param campCardId Id выбранной карты.
 * @returns
 */
export const PickCampCardAction = (
    { G, ...rest }: Context,
    playerID: PlayerID,
    campCardId: CampCardArrayIndex,
): void => {
    const campCard: CampCard = G.camp[campCardId];
    if (campCard === null) {
        throw new Error(`Не существует кликнутая карта лагеря с id '${campCardId}'.`);
    }
    RemoveCardsFromCampAndAddIfNeeded(
        { G, ...rest },
        campCardId,
        [null],
    );
    AddAnyCardToPlayerActions(
        { G, ...rest },
        playerID,
        campCard,
    );
};

/**
 * <h3>Действия, связанные с улучшением монеты способности артефакта Vidofnir Vedrfolnir.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При старте улучшения монеты карты лагеря артефакта Vidofnir Vedrfolnir.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param coinId Id монеты.
 * @param type Тип монеты.
 * @returns
 */
export const UpgradeCoinVidofnirVedrfolnirAction = (
    { G, ...rest }: Context,
    playerID: PlayerID,
    coinId: PlayerPouchCoinId,
    type: CoinNames,
): void => {
    const player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError(
            { G, ...rest },
            ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
            playerID,
        );
    }
    const stack: CanBeUndef<PlayerStack> = player.stack[0];
    if (stack === undefined) {
        return ThrowMyError(
            { G, ...rest },
            ErrorNames.FirstStackActionForPlayerWithCurrentIdIsUndefined,
            playerID,
        );
    }
    const value: UpgradableCoinValue = UpgradeCoinActions(
        { G, ...rest },
        playerID,
        coinId,
        type,
    );
    AssertBasicVidofnirVedrfolnirUpgradeValue(value);
    if (value !== 5 && stack.priority === 0) {
        AddActionsToStack(
            { G, ...rest },
            playerID,
            [
                AllStackData.startChooseCoinValueForVidofnirVedrfolnirUpgrade(
                    [value === 2 ? 3 : 2],
                    coinId,
                    3,
                )
            ],
        );
    }
};
