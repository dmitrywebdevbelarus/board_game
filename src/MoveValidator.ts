import { CompareCardsInTavern, EvaluateTavernCard } from "./bot_logic/BotCardLogic";
import { CheckHeuristicsForCoinsPlacement } from "./bot_logic/BotConfig";
import { CheckSoloBotAndvariMustTakeCardFromGeneralStrategy, CheckSoloBotAndvariMustTakeCardToPickHero, CheckSoloBotAndvariMustTakeRoyalOfferingCard, SoloBotMustTakeCardFromReserveStrategy } from "./bot_logic/SoloBotAndvariCardLogic";
import { CheckSoloBotCanPickHero, CheckSoloBotMustTakeCardToPickHero, CheckSoloBotMustTakeCardWithSuitsLeastPresentOnPlayerBoard, CheckSoloBotMustTakeRoyalOfferingCard, CheckSuitsLeastPresentOnSoloBotBoard, SoloBotMustTakeRandomCard } from "./bot_logic/SoloBotCardLogic";
import { ThrowMyError } from "./Error";
import { CheckPlayerHasBuff } from "./helpers/BuffHelpers";
import { HasLowestPriority } from "./helpers/PriorityHelpers";
import { CheckMinCoinIndexForSoloBotAndvari, CheckMinCoinVisibleIndexForSoloBot, CheckMinCoinVisibleValueForSoloBot, CheckMinCoinVisibleValueForSoloBotAndvari } from "./helpers/SoloBotHelpers";
import { AssertAllHeroesForDifficultySoloModePossibleCardId, AssertAllHeroesForPlayerOrSoloBotAddToPlayerBoardPossibleCardId, AssertAllHeroesForSoloBotAndvariPossibleCardId, AssertAllHeroesForSoloBotPossibleCardId, AssertBasicVidofnirVedrfolnirUpgradeValue, AssertCampIndex, AssertExplorerDistinctionCardId, AssertMythologicalCreatureDeckForSkymirCardId, AssertPlayerCoinId, AssertSoloGameDifficultyLevelArg, AssertTavernCardId, AssertTavernsHeuristicArray, AssertTavernsHeuristicArrayIndex } from "./is_helpers/AssertionTypeHelpers";
import { IsMercenaryCampCard } from "./is_helpers/IsCampTypeHelpers";
import { IsCoin, IsTriggerTradingCoin } from "./is_helpers/IsCoinTypeHelpers";
import { IsCanPickHeroWithConditionsValidator, IsCanPickHeroWithDiscardCardsFromPlayerBoardValidator } from "./move_validators/IsCanPickCurrentHeroValidator";
import { TotalRank } from "./score_helpers/ScoreHelpers";
import { ActivateGiantAbilityOrPickCardSubMoveValidatorNames, ActivateGodAbilityOrNotSubMoveValidatorNames, ArtefactBuffNames, AutoBotsMoveNames, BidsDefaultStageNames, BidsMoveValidatorNames, BidUlineDefaultStageNames, BidUlineMoveValidatorNames, BrisingamensEndGameDefaultStageNames, BrisingamensEndGameMoveValidatorNames, ButtonMoveNames, CardMoveNames, ChooseDifficultySoloModeAndvariDefaultStageNames, ChooseDifficultySoloModeAndvariMoveValidatorNames, ChooseDifficultySoloModeMoveValidatorNames, CoinMoveNames, CoinNames, CommonMoveValidatorNames, DistinctionCardMoveNames, EmptyCardMoveNames, EnlistmentMercenariesMoveValidatorNames, ErrorNames, GameModeNames, GetMjollnirProfitDefaultStageNames, GetMjollnirProfitMoveValidatorNames, GodNames, PhaseNames, PickHeroCardValidatorNames, PlaceYludDefaultStageNames, PlaceYludMoveValidatorNames, PlayerIdForSoloGameNames, SoloBotAndvariCommonMoveValidatorNames, SoloBotCommonCoinUpgradeMoveValidatorNames, SoloBotCommonMoveValidatorNames, SoloGameAndvariStrategyNames, SuitMoveNames, SuitNames, TavernsResolutionMoveValidatorNames, TroopEvaluationMoveValidatorNames } from "./typescript/enums";
import type { AllCoinsValue, AllHeroesForDifficultySoloModePossibleCardId, AllHeroesForPlayerOrSoloBotAddToPlayerBoardPossibleCardId, AllHeroesForSoloBotAndvariPossibleCardId, AllHeroesForSoloBotPossibleCardId, BasicVidofnirVedrfolnirUpgradeValue, CampCardArrayIndex, CanBeNull, CanBeUndef, ChooseDifficultySoloModeAllStageNames, CompareCards, Context, DwarfCard, EnlistmentMercenariesAllStageNames, ExplorerDistinctionCardId, HeroCard, Keyof, MoveArguments, MoveBy, MoveByForValidator, MoveCardId, MoveCardsArguments, MoveCoinsArguments, MoveContext, MoveNames, MoveSuitCardCurrentId, MoveValidator, MoveValidatorGetRangeStringArray, MoveValidators, MoveValidatorValue, MythologicalCreatureDeckForSkymirCardId, PickHeroCardValidatorNamesKeyof, PickValidatorsConfig, PlayerBoardCard, PlayerBoardCoins, PlayerCoinId, PlayerHandCoins, PlayerID, PrivatePlayer, PublicPlayer, PublicPlayerBoardCoins, PublicPlayerCoin, PublicPlayerCoins, SoloGameAndvariStrategyVariantLevel, SoloGameDifficultyLevelArg, StageNames, SuitProperty, TavernAllCardsArray, TavernCard, TavernCardWithPossibleExpansion, TavernPossibleCardId, TavernsHeuristicArray, TavernsResolutionAllStageNames, TroopEvaluationAllStageNames, ZeroOrOne } from "./typescript/interfaces";
import { DrawCamp, DrawDiscardedCards, DrawDistinctions, DrawHeroes, DrawHeroesForSoloBotUI, DrawTaverns } from "./ui/GameBoardUI";
import { DrawPlayersBoards, DrawPlayersBoardsCoins, DrawPlayersHandsCoins } from "./ui/PlayerUI";
import { ActivateGiantAbilityOrPickCardProfit, ActivateGodAbilityOrNotProfit, ChooseCoinValueForVidofnirVedrfolnirUpgradeProfit, ChooseDifficultyLevelForSoloModeProfit, ChooseGetMythologyCardForSkymirProfit, ChooseStrategyForSoloModeAndvariProfit, ChooseStrategyVariantForSoloModeAndvariProfit, ExplorerDistinctionProfit, PickHeroesForSoloModeProfit, StartOrPassEnlistmentMercenariesProfit } from "./ui/ProfitUI";

/**
 * <h3>ДОБАВИТЬ ОПИСАНИЕ.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>ДОБАВИТЬ ПРИМЕНЕНИЯ.</li>
 * </oL>
 *
 * @TODO Саше: сделать описание функции и параметров.
 * @param context
 * @param playerID ID требуемого игрока.
 * @param coinData Данные монеты.
 * @returns Валидация обмена монет.
 */
export const CoinUpgradeValidation = (
    { G, ...rest }: Context,
    playerID: PlayerID,
    coinData: MoveCoinsArguments,
): boolean => {
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
    let handCoins: PlayerHandCoins,
        boardCoins: PlayerBoardCoins;
    if (G.mode === GameModeNames.Multiplayer) {
        handCoins = privatePlayer.handCoins;
        boardCoins = privatePlayer.boardCoins;
    } else {
        handCoins = player.handCoins;
        boardCoins = player.boardCoins;
    }
    const handCoin: PublicPlayerCoin = handCoins[coinData.coinId],
        boardCoin: PublicPlayerCoin = boardCoins[coinData.coinId];
    let _exhaustiveCheck: never;
    switch (coinData.type) {
        case CoinNames.Hand:
            if (handCoin === null) {
                throw new Error(`Выбранная для улучшения монета игрока с id '${playerID}' в руке с id '${coinData.coinId}' не может отсутствовать там.`);
            }
            if (!IsCoin(handCoin)) {
                throw new Error(`Монета с id '${coinData.coinId}' в руке текущего игрока с id '${playerID}' не может быть закрытой для него.`);
            }
            if (!IsTriggerTradingCoin(handCoin)) {
                return true;
            }
            break;
        case CoinNames.Board:
            if (boardCoin === null) {
                throw new Error(`Выбранная для улучшения монета игрока с id '${playerID}' на столе с id '${coinData.coinId}' не может отсутствовать там.`);
            }
            if (!IsCoin(boardCoin)) {
                throw new Error(`Монета с id '${coinData.coinId}' на столе текущего игрока с id '${playerID}' не может быть закрытой для него.`);
            }
            if (!IsTriggerTradingCoin(boardCoin)) {
                return true;
            }
            break;
        default:
            _exhaustiveCheck = coinData.type;
            throw new Error(`Не существует такого типа монеты.`);
            return _exhaustiveCheck;
    }
    return false;
};

/**
 * <h3>ДОБАВИТЬ ОПИСАНИЕ.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>ДОБАВИТЬ ПРИМЕНЕНИЯ.</li>
 * </oL>
 *
 * @TODO Саше: сделать описание функции и параметров.
 * @param context
 * @param stage Стадия.
 * @param type Тип мува.
 * @param id Данные для валидации.
 * @returns Валидный ли мув.
 */
export const IsValidMove = (
    { ctx, playerID, ...rest }: MoveContext,
    stage: StageNames,
    type: MoveNames,
    id: MoveValidatorValue,
): boolean => {
    const validator: MoveValidator = GetValidator(
        ctx.phase,
        stage,
        type,
    );
    let isValid = false;
    if (validator !== null) {
        if (typeof id === `number`) {
            // TODO Can i fix AS?
            isValid =
                ValidateByArrayValues(
                    id,
                    validator.getRange(
                        { ctx, ...rest },
                        playerID,
                    ) as number[],
                );
        } else if (typeof id === `string`) {
            isValid =
                ValidateByArrayValues(
                    id,
                    validator.getRange({ ctx, ...rest },
                        playerID,
                    ) as MoveValidatorGetRangeStringArray,
                );
        } else if (typeof id === `object` && !Array.isArray(id) && id !== null) {
            if (`coinId` in id) {
                isValid = ValidateByObjectCoinIdTypeIsInitialValues(
                    id,
                    validator.getRange(
                        { ctx, ...rest },
                        playerID,
                    ) as MoveCoinsArguments[],
                );
            } else if (`rank` in id) {
                isValid = ValidateObjectEqualValues(
                    id,
                    validator.getRange(
                        { ctx, ...rest },
                        playerID,
                    ) as DwarfCard,
                );
            } else if (`suit` in id) {
                isValid = ValidateByObjectSuitCardIdValues(
                    id,
                    validator.getRange(
                        { ctx, ...rest },
                        playerID,
                    ) as Partial<SuitProperty<number[]>>,
                );

            } else if (`cardId` in id) {
                isValid = ValidateByObjectCardIdValues(
                    id,
                    validator.getRange(
                        { ctx, ...rest },
                        playerID,
                    ) as MoveCardsArguments,
                );
            }
            // TODO Add validation logic for Array.isArray(id) -> PlayerCoinIdType[]!?
        } else if (Array.isArray(id) || id === null) {
            isValid = true;
        } else {
            throw new Error(`Нет такого типа значений у аргументов мува.`);
        }
        if (isValid) {
            isValid = validator.validate(
                { ctx, ...rest },
                playerID,
                id,
            );
        }
    }
    return isValid;
};

/**
 * <h3>ДОБАВИТЬ ОПИСАНИЕ.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>ДОБАВИТЬ ПРИМЕНЕНИЯ.</li>
 * </oL>
 *
 * @TODO Саше: сделать описание функции и параметров.
 * @param phase Фаза игры.
 * @param stage Стадия игры.
 * @param type Тип мува.
 * @returns Валидатор.
 */
export const GetValidator = (
    phase: PhaseNames,
    stage: StageNames,
    type: MoveNames,
): MoveValidator => {
    let moveByForValidator: MoveByForValidator,
        validator: MoveValidator,
        _exhaustiveCheck: never;
    switch (phase) {
        case PhaseNames.ChooseDifficultySoloMode:
            // TODO Can i delete AS in all places here?
            moveByForValidator = moveBy[phase][stage as ChooseDifficultySoloModeAllStageNames];
            // TODO Can i delete AS in all places here?
            validator = moveByForValidator[type as Keyof<typeof moveByForValidator>];
            break;
        case PhaseNames.ChooseDifficultySoloModeAndvari:
            moveByForValidator = moveBy[phase][stage as ChooseDifficultySoloModeAndvariDefaultStageNames];
            validator = moveByForValidator[type as Keyof<typeof moveByForValidator>];
            break;
        case PhaseNames.Bids:
            moveByForValidator = moveBy[phase][stage as BidsDefaultStageNames];
            validator = moveByForValidator[type as Keyof<typeof moveByForValidator>];
            break;
        case PhaseNames.BidUline:
            moveByForValidator = moveBy[phase][stage as BidUlineDefaultStageNames];
            // TODO Can i delete AS in all places here?
            validator = moveByForValidator[type as Keyof<typeof moveByForValidator>] as MoveValidator;
            break;
        case PhaseNames.TavernsResolution:
            moveByForValidator = moveBy[phase][stage as TavernsResolutionAllStageNames];
            validator = moveByForValidator[type as Keyof<typeof moveByForValidator>];
            break;
        case PhaseNames.EnlistmentMercenaries:
            moveByForValidator = moveBy[phase][stage as EnlistmentMercenariesAllStageNames];
            validator = moveByForValidator[type as Keyof<typeof moveByForValidator>];
            break;
        case PhaseNames.PlaceYlud:
            moveByForValidator = moveBy[phase][stage as PlaceYludDefaultStageNames];
            validator = moveByForValidator[type as Keyof<typeof moveByForValidator>];
            break;
        case PhaseNames.TroopEvaluation:
            moveByForValidator = moveBy[phase][stage as TroopEvaluationAllStageNames];
            validator = moveByForValidator[type as Keyof<typeof moveByForValidator>];
            break;
        case PhaseNames.BrisingamensEndGame:
            moveByForValidator = moveBy[phase][stage as BrisingamensEndGameDefaultStageNames];
            validator = moveByForValidator[type as Keyof<typeof moveByForValidator>] as MoveValidator;
            break;
        case PhaseNames.GetMjollnirProfit:
            moveByForValidator = moveBy[phase][stage as GetMjollnirProfitDefaultStageNames];
            validator = moveByForValidator[type as Keyof<typeof moveByForValidator>] as MoveValidator;
            break;
        default:
            _exhaustiveCheck = phase;
            throw new Error(`Нет валидатора для такой фазы.`);
            return _exhaustiveCheck;
    }
    return validator;
};

// TODO Return type number can be other TYPE!
// TODO MOVE ALL SAME VALIDATING LOGIC FROM GET RANGE/GET VALUE TO VALIDATE! And not same in another functions too to reduce logic here!
/**
 * <h3>ДОБАВИТЬ ОПИСАНИЕ.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>ДОБАВИТЬ ПРИМЕНЕНИЯ.</li>
 * </oL>
 * @TODO Саше: сделать описание функции и параметров.
 */
export const moveValidators: MoveValidators = {
    // TODO Fix it!
    ActivateGodAbilityMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): GodNames[] => ActivateGodAbilityOrNotProfit(
            { ...rest },
            ActivateGodAbilityOrNotSubMoveValidatorNames.ActivateGodAbilityMoveValidator,
        ) as GodNames[],
        getValue: (
            { ...rest }: Context,
            currentMoveArguments: GodNames[],
        ): GodNames => {
            const moveArgument: CanBeUndef<GodNames> =
                currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            return moveArgument;
        },
        moveName: CardMoveNames.ActivateGodAbilityMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
        ): boolean => playerID === ctx.currentPlayer,
    },
    NotActivateGodAbilityMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): GodNames[] => ActivateGodAbilityOrNotProfit(
            { ...rest },
            ActivateGodAbilityOrNotSubMoveValidatorNames.NotActivateGodAbilityMoveValidator,
        ) as GodNames[],
        getValue: (
            { ...rest }: Context,
            currentMoveArguments: GodNames[],
        ): GodNames => {
            const moveArgument: CanBeUndef<GodNames> =
                currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            return moveArgument;
        },
        moveName: ButtonMoveNames.NotActivateGodAbilityMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
        ): boolean => playerID === ctx.currentPlayer,
    },
    ClickCardNotGiantAbilityMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): DwarfCard => ActivateGiantAbilityOrPickCardProfit(
            { ...rest },
            ActivateGiantAbilityOrPickCardSubMoveValidatorNames.ClickCardNotGiantAbilityMoveValidator,
        ) as DwarfCard,
        getValue: (
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            { ...rest }: Context,
            currentMoveArguments: DwarfCard,
        ): DwarfCard => currentMoveArguments,
        moveName: CardMoveNames.ClickCardNotGiantAbilityMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
        ): boolean => playerID === ctx.currentPlayer,
    },
    ClickGiantAbilityNotCardMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): DwarfCard => ActivateGiantAbilityOrPickCardProfit(
            { ...rest },
            ActivateGiantAbilityOrPickCardSubMoveValidatorNames.ClickGiantAbilityNotCardMoveValidator,
        ) as DwarfCard,
        getValue: (
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            { ...rest }: Context,
            currentMoveArguments: DwarfCard,
        ): DwarfCard => currentMoveArguments,
        moveName: CardMoveNames.ClickGiantAbilityNotCardMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
        ): boolean => playerID === ctx.currentPlayer,
    },
    ChooseCoinValueForHrungnirUpgradeMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): MoveCoinsArguments[] =>
            DrawPlayersBoardsCoins(
                { ...rest },
                TavernsResolutionMoveValidatorNames.ChooseCoinValueForHrungnirUpgradeMoveValidator,
            ) as MoveCoinsArguments[],
        getValue: (
            { ...rest }: Context,
            currentMoveArguments: MoveCoinsArguments[],
        ): MoveCoinsArguments => {
            const moveArgument: CanBeUndef<MoveCoinsArguments> =
                currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            return moveArgument;
        },
        moveName: CoinMoveNames.ChooseCoinValueForHrungnirUpgradeMove,
        validate: (
            { ctx, ...rest }: Context,
            playerID: PlayerID,
            id: MoveCoinsArguments,
        ): boolean =>
            playerID === ctx.currentPlayer
            && CoinUpgradeValidation(
                { ctx, ...rest },
                playerID,
                id,
            )
        ,
    },
    ChooseSuitOlrunMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): SuitNames[] =>
            DrawPlayersBoards(
                { ...rest },
                TavernsResolutionMoveValidatorNames.ChooseSuitOlrunMoveValidator,
            ) as SuitNames[],
        getValue: (
            { ...rest }: Context,
            currentMoveArguments: SuitNames[],
        ): SuitNames => {
            const moveArgument: CanBeUndef<SuitNames> =
                currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            return moveArgument;
        },
        moveName: SuitMoveNames.ChooseSuitOlrunMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
        ): boolean => playerID === ctx.currentPlayer,
    },
    GetMythologyCardMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): MythologicalCreatureDeckForSkymirCardId[] =>
            ChooseGetMythologyCardForSkymirProfit(
                { ...rest },
                TavernsResolutionMoveValidatorNames.GetMythologyCardMoveValidator,
            ) as MythologicalCreatureDeckForSkymirCardId[],
        getValue: (
            { ...rest }: Context,
            currentMoveArguments: MythologicalCreatureDeckForSkymirCardId[],
        ): MythologicalCreatureDeckForSkymirCardId => {
            const moveArgument: CanBeUndef<number> =
                currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            AssertMythologicalCreatureDeckForSkymirCardId(moveArgument);
            return moveArgument;
        },
        moveName: CardMoveNames.GetMythologyCardMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
        ): boolean => playerID === ctx.currentPlayer,
    },
    ClickBoardCoinMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): PlayerCoinId[] =>
            DrawPlayersBoardsCoins(
                { ...rest },
                BidsMoveValidatorNames.ClickBoardCoinMoveValidator,
            ) as PlayerCoinId[],
        getValue: (
            { ...rest }: Context,
            currentMoveArguments: PlayerCoinId[],
        ): PlayerCoinId => {
            const moveArgument: CanBeUndef<number> =
                currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            AssertPlayerCoinId(moveArgument);
            return moveArgument;
        },
        moveName: CoinMoveNames.ClickBoardCoinMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
        ): boolean => playerID === ctx.currentPlayer,
    },
    ClickCampCardMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): CampCardArrayIndex[] =>
            DrawCamp(
                { ...rest },
                TavernsResolutionMoveValidatorNames.ClickCampCardMoveValidator,
            ) as CampCardArrayIndex[],
        getValue: (
            { ...rest }: Context,
            currentMoveArguments: CampCardArrayIndex[],
        ): CampCardArrayIndex => {
            const moveArgument: CanBeUndef<number> =
                currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            AssertCampIndex(moveArgument);
            return moveArgument;
        },
        moveName: CardMoveNames.ClickCampCardMove,
        validate: (
            { G, ctx, ...rest }: Context,
            playerID: PlayerID,
        ): boolean => {
            if (playerID === undefined) {
                return ThrowMyError(
                    { G, ctx, ...rest },
                    ErrorNames.PlayerIDIsNotDefined,
                );
            }
            const player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
            if (player === undefined) {
                return ThrowMyError(
                    { G, ctx, ...rest },
                    ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
                    playerID,
                );
            }
            return playerID === ctx.currentPlayer && G.expansions.Thingvellir.active
                && (ctx.currentPlayer === G.publicPlayersOrder[0] || (!G.campPicked
                    && CheckPlayerHasBuff(
                        { G, ctx, ...rest },
                        playerID,
                        ArtefactBuffNames.GoCamp,
                    )));
        },
    },
    ClickCardMoveValidator: {
        getRange: (
            { ...rest }: Context
        ): TavernPossibleCardId[] =>
            DrawTaverns(
                { ...rest },
                TavernsResolutionMoveValidatorNames.ClickCardMoveValidator,
            ) as TavernPossibleCardId[],
        getValue: (
            { G, ...rest }: Context,
            currentMoveArguments: TavernPossibleCardId[],
        ): TavernPossibleCardId => {
            // TODO Get MythologicalCreature cards for AI bots...
            const uniqueArr: TavernCardWithPossibleExpansion[] = [],
                currentTavern: TavernAllCardsArray = G.taverns[G.currentTavern];
            let flag = true;
            for (let i = 0; i < currentMoveArguments.length; i++) {
                const moveArgument: CanBeUndef<number> = currentMoveArguments[i];
                if (moveArgument === undefined) {
                    throw new Error(`В массиве аргументов мува отсутствует аргумент с id '${i}'.`);
                }
                AssertTavernCardId(moveArgument);
                const tavernCard: CanBeUndef<TavernCard> = currentTavern[moveArgument];
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
                if (currentTavern.some((card: TavernCard): boolean => {
                    if (card === null) {
                        return ThrowMyError(
                            { G, ...rest },
                            ErrorNames.CurrentTavernCardWithCurrentIdIsNull,
                            moveArgument,
                        );
                    }
                    const res: CompareCards = CompareCardsInTavern(tavernCard, card);
                    if (typeof res === `number`) {
                        return res < 0;
                    } else {
                        return false;
                    }
                })) {
                    continue;
                }
                const isCurrentCardWorse: boolean = EvaluateTavernCard(
                    { G, ...rest },
                    tavernCard,
                    moveArgument,
                    currentTavern,
                ) < 0,
                    isExistCardNotWorse: boolean = currentTavern.some((card: TavernCard): boolean =>
                        EvaluateTavernCard(
                            { G, ...rest },
                            card,
                            moveArgument,
                            currentTavern,
                        ) >= 0);
                if (isCurrentCardWorse && isExistCardNotWorse) {
                    continue;
                }
                for (let j = 0; j < uniqueArr.length; j++) {
                    const uniqueCard: CanBeUndef<TavernCardWithPossibleExpansion> = uniqueArr[j];
                    if (uniqueCard === undefined) {
                        throw new Error(`В массиве уникальных карт отсутствует карта с id '${j}'.`);
                    }
                    if (CompareCardsInTavern(tavernCard, uniqueCard) === 0) {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    // TODO Error to return moveArgument after 1st push!?
                    uniqueArr.push(tavernCard);
                    return moveArgument;
                }
                flag = true;
            }
            // TODO If all cards equal after all CompareTavernCards return currentMoveArguments[0] by default!?
            throw new Error(`Отсутствует вариант выбора карты из таверны для ботов.`);
        },
        moveName: CardMoveNames.ClickCardMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
        ): boolean => playerID === ctx.currentPlayer,
    },
    ClickCardToPickDistinctionMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): ExplorerDistinctionCardId[] =>
            ExplorerDistinctionProfit(
                { ...rest },
                TroopEvaluationMoveValidatorNames.ClickCardToPickDistinctionMoveValidator,
            ) as ExplorerDistinctionCardId[],
        getValue: (
            { ...rest }: Context,
            currentMoveArguments: ExplorerDistinctionCardId[],
        ):
            ExplorerDistinctionCardId => {
            const moveArgument: CanBeUndef<number> =
                currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            AssertExplorerDistinctionCardId(moveArgument);
            return moveArgument;
        },
        moveName: CardMoveNames.ClickCardToPickDistinctionMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
        ): boolean => playerID === ctx.currentPlayer,
    },
    ClickDistinctionCardMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): SuitNames[] => DrawDistinctions(
            { ...rest },
            TroopEvaluationMoveValidatorNames.ClickDistinctionCardMoveValidator,
        ) as SuitNames[],
        getValue: (
            { ...rest }: Context,
            currentMoveArguments: SuitNames[],
        ): SuitNames => {
            const moveArgument: CanBeUndef<SuitNames> =
                currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            return moveArgument;
        },
        moveName: DistinctionCardMoveNames.ClickDistinctionCardMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
        ): boolean => playerID === ctx.currentPlayer,
    },
    ClickHandCoinMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): PlayerCoinId[] =>
            DrawPlayersHandsCoins(
                { ...rest },
                BidsMoveValidatorNames.ClickHandCoinMoveValidator,
            ) as PlayerCoinId[],
        getValue: (
            { ...rest }: Context,
            currentMoveArguments: PlayerCoinId[],
        ): PlayerCoinId => {
            const moveArgument: CanBeUndef<number> =
                currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            AssertPlayerCoinId(moveArgument);
            return moveArgument;
        },
        moveName: CoinMoveNames.ClickHandCoinMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
        ): boolean => playerID === ctx.currentPlayer,
    },
    ClickHandCoinUlineMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): PlayerCoinId[] =>
            DrawPlayersHandsCoins(
                { ...rest },
                BidUlineMoveValidatorNames.ClickHandCoinUlineMoveValidator,
            ) as PlayerCoinId[],
        getValue: (
            { ...rest }: Context,
            currentMoveArguments: PlayerCoinId[],
        ): PlayerCoinId => {
            const moveArgument: CanBeUndef<number> =
                currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            AssertPlayerCoinId(moveArgument);
            return moveArgument;
        },
        moveName: CoinMoveNames.ClickHandCoinUlineMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
        ): boolean => playerID === ctx.currentPlayer,
    },
    ClickHandTradingCoinUlineMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): PlayerCoinId[] => DrawPlayersHandsCoins(
            { ...rest },
            TavernsResolutionMoveValidatorNames.ClickHandTradingCoinUlineMoveValidator,
        ) as PlayerCoinId[],
        getValue: (
            { ...rest }: Context,
            currentMoveArguments: MoveArguments<PlayerCoinId[]>,
        ): PlayerCoinId => {
            const moveArgument: CanBeUndef<number> =
                currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            AssertPlayerCoinId(moveArgument);
            return moveArgument;
        },
        moveName: CoinMoveNames.ClickHandTradingCoinUlineMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
        ): boolean => playerID === ctx.currentPlayer,
    },
    DiscardCardFromPlayerBoardMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): Partial<SuitProperty<number[]>> => DrawPlayersBoards(
            { ...rest },
            BrisingamensEndGameMoveValidatorNames.DiscardCardFromPlayerBoardMoveValidator,
        ) as Partial<SuitProperty<number[]>>,
        getValue: (
            { ...rest }: Context,
            currentMoveArguments: Partial<SuitProperty<number[]>>,
        ): MoveSuitCardCurrentId => {
            const suitNames: SuitNames[] = [];
            let suit: SuitNames;
            for (suit in currentMoveArguments) {
                suitNames.push(suit);
            }
            const suitName: CanBeUndef<SuitNames> = suitNames[Math.floor(Math.random() * suitNames.length)];
            if (suitName === undefined) {
                throw new Error(`Отсутствует выбранная случайно фракция '${suitName}' для сброса карты.`);
            }
            const moveArgumentForSuit: CanBeUndef<number[]> = currentMoveArguments[suitName];
            if (moveArgumentForSuit === undefined) {
                throw new Error(`Отсутствует обязательный параметр с аргументом '${suitName}'.`);
            }
            const moveArgument: CanBeUndef<number> =
                moveArgumentForSuit[Math.floor(Math.random() * moveArgumentForSuit.length)];
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            return {
                suit: suitName,
                cardId: moveArgument,
            };
        },
        moveName: CardMoveNames.DiscardCardFromPlayerBoardMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
        ): boolean => playerID === ctx.currentPlayer,
    },
    DiscardCard2PlayersMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): TavernPossibleCardId[] => DrawTaverns(
            { ...rest },
            TavernsResolutionMoveValidatorNames.DiscardCard2PlayersMoveValidator,
        ) as TavernPossibleCardId[],
        getValue: (
            { ...rest }: Context,
            currentMoveArguments: MoveArguments<TavernPossibleCardId[]>,
        ): TavernPossibleCardId => {
            const moveArgument: CanBeUndef<number> =
                currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            AssertTavernCardId(moveArgument);
            return moveArgument;
        },
        moveName: CardMoveNames.DiscardCard2PlayersMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
        ): boolean => playerID === ctx.currentPlayer,
    },
    GetEnlistmentMercenariesMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): number[] => DrawPlayersBoards(
            { ...rest },
            EnlistmentMercenariesMoveValidatorNames.GetEnlistmentMercenariesMoveValidator,
        ) as number[],
        getValue: (
            { ...rest }: Context,
            currentMoveArguments: number[],
        ): number => {
            const moveArgument: CanBeUndef<number> =
                currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            return moveArgument;
        },
        moveName: CardMoveNames.GetEnlistmentMercenariesMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
        ): boolean => playerID === ctx.currentPlayer,
    },
    GetMjollnirProfitMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): SuitNames[] => DrawPlayersBoards(
            { ...rest },
            GetMjollnirProfitMoveValidatorNames.GetMjollnirProfitMoveValidator,
        ) as SuitNames[],
        getValue: (
            { G, ...rest }: Context,
            currentMoveArguments: SuitNames[],
            playerID: PlayerID,
        ): SuitNames => {
            if (playerID === undefined) {
                return ThrowMyError(
                    { G, ...rest },
                    ErrorNames.PlayerIDIsNotDefined,
                );
            }
            const totalSuitsRanks: number[] = [],
                player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
            if (player === undefined) {
                return ThrowMyError(
                    { G, ...rest },
                    ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
                    playerID,
                );
            }
            for (let j = 0; j < currentMoveArguments.length; j++) {
                const moveArgumentI: CanBeUndef<SuitNames> = currentMoveArguments[j];
                if (moveArgumentI === undefined) {
                    throw new Error(`В массиве аргументов мува отсутствует аргумент с id '${j}'.`);
                }
                totalSuitsRanks.push(player.cards[moveArgumentI]
                    .reduce(TotalRank, 0) * 2);
            }
            const index: number = totalSuitsRanks.indexOf(Math.max(...totalSuitsRanks));
            if (index === -1) {
                return ThrowMyError(
                    { G, ...rest },
                    ErrorNames.MustBeSuitWithMaxRanksValue,
                );
            }
            const moveArgument: CanBeUndef<SuitNames> = currentMoveArguments[index];
            if (moveArgument === undefined) {
                throw new Error(`В массиве аргументов мува отсутствует аргумент с id '${index}'.`);
            }
            return moveArgument;
        },
        moveName: SuitMoveNames.GetMjollnirProfitMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
        ): boolean => playerID === ctx.currentPlayer,
    },
    PassEnlistmentMercenariesMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): null => StartOrPassEnlistmentMercenariesProfit(
            { ...rest },
            EnlistmentMercenariesMoveValidatorNames.StartEnlistmentMercenariesMoveValidator,
        ) as null,
        getValue: (
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            { ...rest }: Context,
            currentMoveArguments: null,
        ): null => currentMoveArguments,
        moveName: ButtonMoveNames.PassEnlistmentMercenariesMove,
        validate: (
            { G, ctx, ...rest }: Context,
            playerID: PlayerID,
        ): boolean => {
            if (playerID === undefined) {
                return ThrowMyError(
                    { G, ctx, ...rest },
                    ErrorNames.PlayerIDIsNotDefined,
                );
            }
            const player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
            if (player === undefined) {
                return ThrowMyError(
                    { G, ctx, ...rest },
                    ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
                    playerID,
                );
            }
            return playerID === ctx.currentPlayer && ctx.playOrderPos === 0
                && ctx.currentPlayer === ctx.playOrder[ctx.playOrder.length - 1]
                && player.campCards.filter(IsMercenaryCampCard).length > 0;
        },
    },
    PlaceEnlistmentMercenariesMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): SuitNames[] => DrawPlayersBoards(
            { ...rest },
            EnlistmentMercenariesMoveValidatorNames.PlaceEnlistmentMercenariesMoveValidator,
        ) as SuitNames[],
        getValue: (
            { ...rest }: Context,
            currentMoveArguments: SuitNames[],
        ): SuitNames => {
            const moveArgument: CanBeUndef<SuitNames> =
                currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            return moveArgument;
        },
        moveName: EmptyCardMoveNames.PlaceEnlistmentMercenariesMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
        ): boolean => playerID === ctx.currentPlayer,
    },
    PlaceYludHeroMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): SuitNames[] => DrawPlayersBoards(
            { ...rest },
            PlaceYludMoveValidatorNames.PlaceYludHeroMoveValidator,
        ) as SuitNames[],
        getValue: (
            { ...rest }: Context,
            currentMoveArguments: SuitNames[],
        ): SuitNames => {
            const moveArgument: CanBeUndef<SuitNames> =
                currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            return moveArgument;
        },
        moveName: EmptyCardMoveNames.PlaceYludHeroMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
        ): boolean => playerID === ctx.currentPlayer,
    },
    StartEnlistmentMercenariesMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): null => StartOrPassEnlistmentMercenariesProfit(
            { ...rest },
            EnlistmentMercenariesMoveValidatorNames.StartEnlistmentMercenariesMoveValidator,
        ) as null,
        getValue: (
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            { ...rest }: Context,
            currentMoveArguments: null,
        ): null => currentMoveArguments,
        moveName: ButtonMoveNames.StartEnlistmentMercenariesMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
        ): boolean => playerID === ctx.currentPlayer,
    },
    // Bots
    BotsPlaceAllCoinsMoveValidator: {
        // TODO Move to Get from validator BidsMoveValidatorNames.BotsPlaceAllCoinsMoveValidator!?
        getRange: (
            { G }: Context,
        ): PlayerCoinId[][] => G.botData.allCoinsOrder,
        getValue: (
            { G, ...rest }: Context,
            currentMoveArguments: PlayerCoinId[][],
            playerID: PlayerID,
        ): PlayerCoinId[] => {
            if (playerID === undefined) {
                return ThrowMyError(
                    { G, ...rest },
                    ErrorNames.PlayerIDIsNotDefined,
                );
            }
            const hasLowestPriority: boolean = HasLowestPriority(
                { G, ...rest },
                playerID,
            );
            let resultsForCoins: TavernsHeuristicArray = CheckHeuristicsForCoinsPlacement({ G, ...rest });
            if (hasLowestPriority) {
                const results: number[] = resultsForCoins.map((num: number, index: number): number =>
                    index === 0 ? num - 20 : num);
                AssertTavernsHeuristicArray(results);
                resultsForCoins = results;
            }
            const minResultForCoins: number = Math.min(...resultsForCoins),
                maxResultForCoins: number = Math.max(...resultsForCoins),
                tradingProfit: ZeroOrOne = G.secret.decks[1].length > 9 ? 1 : 0;
            // TODO Move it to type!?
            let [positionForMinCoin, positionForMaxCoin]: [PlayerCoinId | -1, PlayerCoinId | -1] = [-1, -1];
            if (minResultForCoins <= 0) {
                const minCoinPosition: number = resultsForCoins.indexOf(minResultForCoins);
                AssertTavernsHeuristicArrayIndex(minCoinPosition);
                positionForMinCoin = minCoinPosition;
            }
            if (maxResultForCoins >= 0) {
                const maxCoinPosition: number = resultsForCoins.indexOf(maxResultForCoins);
                AssertTavernsHeuristicArrayIndex(maxCoinPosition);
                positionForMaxCoin = maxCoinPosition;
            }
            // TODO Check it bot can't play in multiplayer now...
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
            let handCoins: PlayerHandCoins;
            if (G.mode === GameModeNames.Multiplayer) {
                handCoins = privatePlayer.handCoins;
            } else {
                handCoins = player.handCoins;
            }
            for (let i = 0; i < currentMoveArguments.length; i++) {
                const allCoinsOrderI: CanBeUndef<PlayerCoinId[]> = currentMoveArguments[i];
                if (allCoinsOrderI === undefined) {
                    throw new Error(`В массиве выкладки монет отсутствует выкладка '${i}'.`);
                }
                const hasTrading: boolean = allCoinsOrderI.some((coinId: number): boolean => {
                    AssertPlayerCoinId(coinId);
                    const handCoin: PublicPlayerCoin = handCoins[coinId];
                    if (handCoin !== null && !IsCoin(handCoin)) {
                        throw new Error(`В массиве монет игрока с id '${playerID}' в руке не может быть закрыта монета с id '${coinId}'.`);
                    }
                    if (IsCoin(handCoin) && handCoin.isOpened) {
                        throw new Error(`В массиве монет игрока с id '${playerID}' в руке не может быть ранее открыта монета с id '${coinId}'.`);
                    }
                    return IsTriggerTradingCoin(handCoin);
                });
                // TODO How tradingProfit can be < 0?
                if (tradingProfit < 0) {
                    if (hasTrading) {
                        continue;
                    }
                    return allCoinsOrderI;
                } else if (tradingProfit > 0) {
                    const isEveryCoinsInHands: boolean =
                        handCoins.every((coin: PublicPlayerCoin, index: number): boolean => {
                            if (coin !== null && !IsCoin(coin)) {
                                throw new Error(`В массиве монет игрока с id '${playerID}' в руке не может быть закрыта монета с id '${index}'.`);
                            }
                            if (IsCoin(coin) && coin.isOpened) {
                                throw new Error(`В массиве монет игрока с id '${playerID}' в руке не может быть ранее открыта монета с id '${index}'.`);
                            }
                            return IsCoin(coin);
                        });
                    if (!hasTrading && isEveryCoinsInHands) {
                        continue;
                    }
                    const hasPositionForMaxCoin: boolean = positionForMaxCoin !== -1,
                        hasPositionForMinCoin: boolean = positionForMinCoin !== -1,
                        coinsOrderPositionForMaxCoin: CanBeUndef<number> = allCoinsOrderI[positionForMaxCoin],
                        coinsOrderPositionForMinCoin: CanBeUndef<number> = allCoinsOrderI[positionForMinCoin];
                    if (coinsOrderPositionForMaxCoin !== undefined && coinsOrderPositionForMinCoin !== undefined) {
                        AssertPlayerCoinId(coinsOrderPositionForMaxCoin);
                        AssertPlayerCoinId(coinsOrderPositionForMinCoin);
                        const maxCoin: PublicPlayerCoin = handCoins[coinsOrderPositionForMaxCoin],
                            minCoin: PublicPlayerCoin = handCoins[coinsOrderPositionForMinCoin];
                        if (maxCoin === null) {
                            throw new Error(`В массиве выкладки монет игрока с id '${playerID}' не может не быть максимальной монеты с id '${coinsOrderPositionForMaxCoin}'.`);
                        }
                        if (minCoin === null) {
                            throw new Error(`В массиве выкладки монет игрока с id '${playerID}' не может не быть минимальной монеты с id '${coinsOrderPositionForMinCoin}'.`);
                        }
                        if (!IsCoin(maxCoin)) {
                            throw new Error(`В массиве выкладки монет игрока с id '${playerID}' не может быть закрыта максимальная монета с id '${coinsOrderPositionForMaxCoin}'.`);
                        }
                        if (!IsCoin(minCoin)) {
                            throw new Error(`В массиве выкладки монет игрока с id '${playerID}' не может быть закрыта минимальная монета с id '${coinsOrderPositionForMinCoin}'.`);
                        }
                        if (IsCoin(maxCoin) && maxCoin.isOpened) {
                            throw new Error(`В массиве монет игрока с id '${playerID}' в руке не может быть ранее открыта максимальная монета с id '${coinsOrderPositionForMaxCoin}'.`);
                        }
                        if (IsCoin(minCoin) && minCoin.isOpened) {
                            throw new Error(`В массиве монет игрока с id '${playerID}' в руке не может быть ранее открыта максимальная монета с id '${coinsOrderPositionForMinCoin}'.`);
                        }
                        let isTopCoinsOnPosition = false,
                            isMinCoinsOnPosition = false;
                        if (hasPositionForMaxCoin) {
                            isTopCoinsOnPosition = allCoinsOrderI.filter((coinIndex: number): boolean => {
                                AssertPlayerCoinId(coinIndex);
                                const handCoin: PublicPlayerCoin = handCoins[coinIndex];
                                if (handCoin !== null && !IsCoin(handCoin)) {
                                    throw new Error(`В массиве монет игрока с id '${playerID}' в руке не может быть закрыта монета с id '${coinIndex}'.`);
                                }
                                if (IsCoin(handCoin) && handCoin.isOpened) {
                                    throw new Error(`В массиве монет игрока с id '${playerID}' в руке не может быть ранее открыта монета с id '${coinIndex}'.`);
                                }
                                return IsCoin(handCoin) && handCoin.value > maxCoin.value;
                            }).length <= 1;
                        }
                        if (hasPositionForMinCoin) {
                            isMinCoinsOnPosition =
                                handCoins.filter((coin: PublicPlayerCoin, index: number): boolean => {
                                    if (coin !== null && !IsCoin(coin)) {
                                        throw new Error(`В массиве монет игрока с id '${playerID}' в руке не может быть закрыта монета с id '${index}'.`);
                                    }
                                    if (IsCoin(coin) && coin.isOpened) {
                                        throw new Error(`В массиве монет игрока с id '${playerID}' в руке не может быть ранее открыта монета с id '${index}'.`);
                                    }
                                    return IsCoin(coin) && coin.value < minCoin.value;
                                }).length <= 1;
                        }
                        if (isTopCoinsOnPosition && isMinCoinsOnPosition) {
                            return allCoinsOrderI;
                            //console.log(`#` + i.toString().padStart(2) + `: ` + allCoinsOrder[i].map(item => handCoins[item].value));
                        }
                    }
                } else {
                    // TODO Why if trading profit === 0 we not checked min max coins positions!?
                    return allCoinsOrderI;
                }
            }
            throw new Error(`Отсутствует вариант выкладки монет для ботов.`);
        },
        moveName: AutoBotsMoveNames.BotsPlaceAllCoinsMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
        ): boolean => playerID === ctx.currentPlayer,
    },
    // Solo Bot
    SoloBotPlaceAllCoinsMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): PlayerCoinId[][] => DrawPlayersHandsCoins(
            { ...rest },
            BidsMoveValidatorNames.SoloBotPlaceAllCoinsMoveValidator,
        ) as PlayerCoinId[][],
        getValue: (
            { ...rest }: Context,
            currentMoveArguments: PlayerCoinId[][],
        ): PlayerCoinId[] => {
            const moveArgument: CanBeUndef<PlayerCoinId[]> = currentMoveArguments[0];
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            return moveArgument;
        },
        moveName: AutoBotsMoveNames.SoloBotPlaceAllCoinsMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
        ): boolean =>
            playerID === ctx.currentPlayer && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId,
    },
    SoloBotClickCardMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): TavernPossibleCardId[] => DrawTaverns(
            { ...rest },
            TavernsResolutionMoveValidatorNames.SoloBotClickCardMoveValidator,
        ) as TavernPossibleCardId[],
        getValue: (
            { ...rest }: Context,
            currentMoveArguments: TavernPossibleCardId[],
            playerID: PlayerID,
        ): TavernPossibleCardId => {
            // TODO If last round of tier 0 => get card not given distinction to other player and get for you if can't take hero or least present! If last round of the game => get most valuable points if can't pick hero anymore (can't check least present)!
            let moveArgument: CanBeUndef<number> = CheckSoloBotMustTakeCardToPickHero(
                { ...rest },
                playerID,
                currentMoveArguments,
            );
            if (moveArgument === undefined) {
                moveArgument = CheckSoloBotMustTakeCardWithSuitsLeastPresentOnPlayerBoard(
                    { ...rest },
                    playerID,
                    currentMoveArguments,
                );
            }
            if (moveArgument === undefined) {
                moveArgument = CheckSoloBotMustTakeRoyalOfferingCard(
                    { ...rest },
                    currentMoveArguments,
                );
            }
            if (moveArgument === undefined) {
                moveArgument = SoloBotMustTakeRandomCard(
                    { ...rest },
                    currentMoveArguments,
                );
            }
            AssertTavernCardId(moveArgument);
            return moveArgument;
        },
        moveName: CardMoveNames.SoloBotClickCardMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
        ): boolean => playerID === ctx.currentPlayer && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId,
    },
    SoloBotClickHeroCardMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): AllHeroesForSoloBotPossibleCardId[] => DrawHeroesForSoloBotUI(
            { ...rest },
            SoloBotCommonMoveValidatorNames.SoloBotClickHeroCardMoveValidator,
        ) as AllHeroesForSoloBotPossibleCardId[],
        getValue: (
            { ...rest }: Context,
            currentMoveArguments: AllHeroesForSoloBotPossibleCardId[],
        ): AllHeroesForSoloBotPossibleCardId => {
            const moveArgument: CanBeUndef<number> =
                currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            AssertAllHeroesForSoloBotPossibleCardId(moveArgument);
            return moveArgument;
        },
        moveName: CardMoveNames.SoloBotClickHeroCardMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
        ): boolean => playerID === ctx.currentPlayer && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId,
    },
    SoloBotClickCardToPickDistinctionMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): ExplorerDistinctionCardId[] => ExplorerDistinctionProfit(
            { ...rest },
            TroopEvaluationMoveValidatorNames.SoloBotClickCardToPickDistinctionMoveValidator,
        ) as ExplorerDistinctionCardId[],
        getValue: (
            { ...rest }: Context,
            currentMoveArguments: ExplorerDistinctionCardId[],
        ): ExplorerDistinctionCardId => {
            const moveArgument: CanBeUndef<number> =
                currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            AssertExplorerDistinctionCardId(moveArgument);
            return moveArgument;
        },
        moveName: CardMoveNames.SoloBotClickCardToPickDistinctionMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
        ): boolean => playerID === ctx.currentPlayer && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId,
    },
    SoloBotPlaceThrudHeroMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): SuitNames[] => DrawPlayersBoards(
            { ...rest },
            SoloBotCommonMoveValidatorNames.SoloBotPlaceThrudHeroMoveValidator,
        ) as SuitNames[],
        getValue: (
            { ...rest }: Context,
            currentMoveArguments: SuitNames[],
            playerID: PlayerID,
        ): SuitNames => {
            // TODO Move same logic for SuitTypes & number to functions and use it in getValue
            // TODO Same logic for Ylud placement and move in one func!?
            let moveArgument: CanBeUndef<SuitNames>;
            const suit: CanBeUndef<SuitNames> = CheckSoloBotCanPickHero(
                { ...rest }, playerID);
            if (suit === undefined) {
                const [suits]: [SuitNames[], number] = CheckSuitsLeastPresentOnSoloBotBoard(
                    { ...rest },
                    playerID,
                );
                if (suits.length === 0) {
                    // TODO Move Thrud/Ylud in most left suit from `suits`
                    throw new Error(`Не может не быть фракций с минимальным количеством карт.`);
                } else if (suits.length === 1) {
                    const leastPresentSuit: CanBeUndef<SuitNames> = suits[0];
                    if (leastPresentSuit === undefined) {
                        throw new Error(`В массиве возможных аргументов мува для соло бота отсутствует нужное значение наименее представленной фракции.`);
                    }
                    moveArgument = currentMoveArguments[currentMoveArguments.indexOf(leastPresentSuit)];
                } else {
                    // TODO Move Thrud/Ylud in most left suit from least present `suits`!
                }
            } else {
                moveArgument = suit;
            }
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            return moveArgument;
        },
        moveName: EmptyCardMoveNames.SoloBotPlaceThrudHeroMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
        ): boolean => playerID === ctx.currentPlayer && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId,
    },
    SoloBotPlaceYludHeroMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): SuitNames[] => DrawPlayersBoards(
            { ...rest },
            PlaceYludMoveValidatorNames.SoloBotPlaceYludHeroMoveValidator,
        ) as SuitNames[],
        getValue: (
            { ...rest }: Context,
            currentMoveArguments: SuitNames[],
        ): SuitNames => {
            // TODO Same logic from Thrud placement and move in one func!?
            const moveArgument: CanBeUndef<SuitNames> =
                currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            return moveArgument;
        },
        moveName: EmptyCardMoveNames.SoloBotPlaceYludHeroMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
        ): boolean => playerID === ctx.currentPlayer && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId,
    },
    SoloBotClickCoinToUpgradeMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): MoveCoinsArguments[] => (DrawPlayersBoardsCoins(
            { ...rest },
            SoloBotCommonCoinUpgradeMoveValidatorNames.SoloBotClickCoinToUpgradeMoveValidator,
        ) as MoveCoinsArguments[]).concat(DrawPlayersHandsCoins(
            { ...rest },
            SoloBotCommonCoinUpgradeMoveValidatorNames.SoloBotClickCoinToUpgradeMoveValidator,
        ) as MoveCoinsArguments[]),
        getValue: (
            { G, ctx, ...rest }: Context,
            currentMoveArguments: MoveCoinsArguments[],
            playerID: PlayerID,
        ): MoveCoinsArguments => {
            if (playerID === undefined) {
                return ThrowMyError(
                    { G, ctx, ...rest },
                    ErrorNames.PlayerIDIsNotDefined,
                );
            }
            const player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
            if (player === undefined) {
                return ThrowMyError(
                    { G, ctx, ...rest },
                    ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
                    playerID,
                );
            }
            let type: CoinNames,
                coins: PublicPlayerCoins;
            if (ctx.phase === PhaseNames.ChooseDifficultySoloMode) {
                type = CoinNames.Hand;
                coins = player.handCoins;

            } else {
                type = CoinNames.Board;
                coins = player.boardCoins;
            }
            const minValue: AllCoinsValue = CheckMinCoinVisibleValueForSoloBot(
                { G, ctx, ...rest },
                playerID,
                currentMoveArguments,
                type,
            );
            if (minValue === 0) {
                throw new Error(`В массиве монет соло бота с id '${playerID}' ${type === CoinNames.Board ? `в руке` : `на столе`} не может быть минимальная монета для улучшения с значением '${minValue}'.`);
            }
            const coinId: PlayerCoinId = CheckMinCoinVisibleIndexForSoloBot(
                { G, ctx, ...rest },
                coins,
                minValue,
            ),
                moveArgument: CanBeUndef<MoveCoinsArguments> = currentMoveArguments[coinId];
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { G, ctx, ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            return moveArgument;
        },
        moveName: CoinMoveNames.SoloBotClickCoinToUpgradeMove,
        validate: (
            { ctx, ...rest }: Context,
            playerID: PlayerID,
            id: MoveCoinsArguments,
        ): boolean => playerID === ctx.currentPlayer && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId
            && CoinUpgradeValidation(
                { ctx, ...rest },
                playerID,
                id,
            ),
    },
    // Solo Mode
    ChooseDifficultyLevelForSoloModeMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): SoloGameDifficultyLevelArg[] => ChooseDifficultyLevelForSoloModeProfit(
            { ...rest },
            ChooseDifficultySoloModeMoveValidatorNames.ChooseDifficultyLevelForSoloModeMoveValidator,
        ) as SoloGameDifficultyLevelArg[],
        getValue: (
            { ...rest }: Context,
            currentMoveArguments: SoloGameDifficultyLevelArg[],
        ): SoloGameDifficultyLevelArg => {
            const moveArgument: CanBeUndef<number> =
                currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            AssertSoloGameDifficultyLevelArg(moveArgument);
            return moveArgument;
        },
        moveName: ButtonMoveNames.ChooseDifficultyLevelForSoloModeMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
        ): boolean => playerID === ctx.currentPlayer && playerID === PlayerIdForSoloGameNames.HumanPlayerId,
    },
    ChooseHeroForDifficultySoloModeMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): AllHeroesForDifficultySoloModePossibleCardId[] =>
            PickHeroesForSoloModeProfit(
                { ...rest },
                ChooseDifficultySoloModeMoveValidatorNames.ChooseHeroForDifficultySoloModeMoveValidator,
            ) as AllHeroesForDifficultySoloModePossibleCardId[],
        getValue: (
            { ...rest }: Context,
            currentMoveArguments: AllHeroesForDifficultySoloModePossibleCardId[],
        ): AllHeroesForDifficultySoloModePossibleCardId => {
            const moveArgument: CanBeUndef<number> =
                currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            AssertAllHeroesForDifficultySoloModePossibleCardId(moveArgument);
            return moveArgument;
        },
        moveName: CardMoveNames.ChooseHeroForDifficultySoloModeMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
        ): boolean => playerID === ctx.currentPlayer && playerID === PlayerIdForSoloGameNames.HumanPlayerId,
    },
    // Solo Mode Andvari
    ChooseStrategyVariantForSoloModeAndvariMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): SoloGameAndvariStrategyVariantLevel[] => ChooseStrategyVariantForSoloModeAndvariProfit(
            { ...rest },
            ChooseDifficultySoloModeAndvariMoveValidatorNames.ChooseStrategyVariantForSoloModeAndvariMoveValidator,
        ) as SoloGameAndvariStrategyVariantLevel[],
        getValue: (
            { ...rest }: Context,
            currentMoveArguments: SoloGameAndvariStrategyVariantLevel[],
        ): SoloGameAndvariStrategyVariantLevel => {
            const moveArgument: CanBeUndef<SoloGameAndvariStrategyVariantLevel> =
                currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)] as
                SoloGameAndvariStrategyVariantLevel;
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            return moveArgument;
        },
        moveName: ButtonMoveNames.ChooseStrategyVariantForSoloModeAndvariMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
        ): boolean => playerID === ctx.currentPlayer && playerID === PlayerIdForSoloGameNames.HumanPlayerId,
    },
    ChooseStrategyForSoloModeAndvariMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): SoloGameAndvariStrategyNames[] => ChooseStrategyForSoloModeAndvariProfit(
            { ...rest },
            ChooseDifficultySoloModeAndvariMoveValidatorNames.ChooseStrategyForSoloModeAndvariMoveValidator,
        ) as SoloGameAndvariStrategyNames[],
        getValue: (
            { ...rest }: Context,
            currentMoveArguments: SoloGameAndvariStrategyNames[],
        ): SoloGameAndvariStrategyNames => {
            const moveArgument: CanBeUndef<SoloGameAndvariStrategyNames> =
                currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)] as
                SoloGameAndvariStrategyNames;
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            return moveArgument;
        },
        moveName: ButtonMoveNames.ChooseStrategyForSoloModeAndvariMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
        ): boolean => playerID === ctx.currentPlayer && playerID === PlayerIdForSoloGameNames.HumanPlayerId,
    },
    SoloBotAndvariPlaceAllCoinsMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): PlayerCoinId[][] => DrawPlayersHandsCoins(
            { ...rest },
            BidsMoveValidatorNames.SoloBotAndvariPlaceAllCoinsMoveValidator,
        ) as PlayerCoinId[][],
        getValue: (
            { ...rest }: Context,
            currentMoveArguments: PlayerCoinId[][],
        ): PlayerCoinId[] => {
            const moveArgument: CanBeUndef<PlayerCoinId[]> = currentMoveArguments[0];
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            return moveArgument;
        },
        moveName: AutoBotsMoveNames.SoloBotAndvariPlaceAllCoinsMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
        ): boolean => playerID === ctx.currentPlayer && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId,
    },
    SoloBotAndvariClickCardMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): TavernPossibleCardId[] => DrawTaverns(
            { ...rest },
            TavernsResolutionMoveValidatorNames.SoloBotAndvariClickCardMoveValidator,
        ) as TavernPossibleCardId[],
        getValue: (
            { ...rest }: Context,
            currentMoveArguments: TavernPossibleCardId[],
            playerID: PlayerID,
        ): TavernPossibleCardId => {
            let moveArgument: CanBeUndef<number> = CheckSoloBotAndvariMustTakeCardFromGeneralStrategy(
                { ...rest },
                playerID,
                currentMoveArguments,
            );
            if (moveArgument === undefined) {
                moveArgument = CheckSoloBotAndvariMustTakeCardToPickHero(
                    { ...rest },
                    playerID,
                    currentMoveArguments,
                );
            }
            if (moveArgument === undefined) {
                moveArgument = CheckSoloBotAndvariMustTakeRoyalOfferingCard(
                    { ...rest },
                    currentMoveArguments,
                );
            }
            if (moveArgument === undefined) {
                moveArgument = SoloBotMustTakeCardFromReserveStrategy(
                    { ...rest },
                    playerID,
                    currentMoveArguments,
                );
            }
            AssertTavernCardId(moveArgument);
            return moveArgument;
        },
        moveName: CardMoveNames.SoloBotAndvariClickCardMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
        ): boolean => playerID === ctx.currentPlayer && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId,
    },
    SoloBotAndvariClickHeroCardMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): AllHeroesForSoloBotAndvariPossibleCardId[] => DrawHeroes(
            { ...rest },
            SoloBotAndvariCommonMoveValidatorNames.SoloBotAndvariClickHeroCardMoveValidator,
        ) as AllHeroesForSoloBotAndvariPossibleCardId[],
        getValue: (
            { G, ...rest }: Context,
            currentMoveArguments: AllHeroesForSoloBotAndvariPossibleCardId[],
        ): AllHeroesForSoloBotAndvariPossibleCardId => {
            let moveArgument: CanBeUndef<number>;
            const dwergBrotherIndex: number = G.heroes.findIndex((hero: HeroCard): boolean =>
                hero.active && hero.name.startsWith(`Dwerg`));
            if (dwergBrotherIndex !== -1) {
                moveArgument = dwergBrotherIndex;
            } else {
                moveArgument = currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            }
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { G, ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            AssertAllHeroesForSoloBotAndvariPossibleCardId(moveArgument);
            return moveArgument;
        },
        moveName: CardMoveNames.SoloBotAndvariClickHeroCardMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
        ): boolean => playerID === ctx.currentPlayer && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId,
    },
    SoloBotAndvariClickCardToPickDistinctionMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): ExplorerDistinctionCardId[] => ExplorerDistinctionProfit(
            { ...rest },
            TroopEvaluationMoveValidatorNames.SoloBotAndvariClickCardToPickDistinctionMoveValidator,
        ) as ExplorerDistinctionCardId[],
        getValue: (
            { ...rest }: Context,
            currentMoveArguments: ExplorerDistinctionCardId[],
        ): ExplorerDistinctionCardId => {
            const moveArgument: CanBeUndef<number> =
                currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            AssertExplorerDistinctionCardId(moveArgument);
            return moveArgument;
        },
        moveName: CardMoveNames.SoloBotAndvariClickCardToPickDistinctionMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
            id: number,
        ): boolean => playerID === ctx.currentPlayer && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId && id === 0,
    },
    SoloBotAndvariPlaceThrudHeroMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): SuitNames[] => DrawPlayersBoards(
            { ...rest },
            SoloBotAndvariCommonMoveValidatorNames.SoloBotAndvariPlaceThrudHeroMoveValidator,
        ) as SuitNames[],
        getValue: (
            { G, ...rest }: Context,
            currentMoveArguments: SuitNames[],
        ): SuitNames => {
            // TODO Move same logic for SuitTypes & number to functions and use it in getValue
            // TODO Move same logic for Ylud placement in one func!
            if (G.strategyForSoloBotAndvari === null) {
                throw new Error(`В объекте стратегий для соло бота Андвари не может не быть фракций.`);
            }
            const strategySuitIndex: number =
                currentMoveArguments.findIndex((suit: SuitNames): boolean => {
                    if (G.strategyForSoloBotAndvari === null) {
                        throw new Error(`В объекте стратегий для соло бота Андвари не может не быть фракций.`);
                    }
                    return suit === G.strategyForSoloBotAndvari.general[0];
                });
            if (strategySuitIndex === -1) {
                throw new Error(`В массиве возможных аргументов мува для соло бота отсутствует нужное значение главной стратегии фракции '${G.strategyForSoloBotAndvari.general[0]}'.`);
            }
            const moveArgument: CanBeUndef<SuitNames> = currentMoveArguments[strategySuitIndex];
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { G, ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            return moveArgument;
        },
        moveName: EmptyCardMoveNames.SoloBotAndvariPlaceThrudHeroMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
        ): boolean => playerID === ctx.currentPlayer && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId,
    },
    SoloBotAndvariPlaceYludHeroMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): SuitNames[] => DrawPlayersBoards(
            { ...rest },
            PlaceYludMoveValidatorNames.SoloBotAndvariPlaceYludHeroMoveValidator,
        ) as SuitNames[],
        getValue: (
            { G, ...rest }: Context,
            currentMoveArguments: SuitNames[],
        ): SuitNames => {
            // TODO Move same logic for Thrud placement in one func!
            if (G.strategyForSoloBotAndvari === null) {
                throw new Error(`В объекте стратегий для соло бота Андвари не может не быть фракций.`);
            }
            const strategySuitIndex: number =
                currentMoveArguments.findIndex((suit: SuitNames): boolean => {
                    if (G.strategyForSoloBotAndvari === null) {
                        throw new Error(`В объекте стратегий для соло бота Андвари не может не быть фракций.`);
                    }
                    return suit === G.strategyForSoloBotAndvari.general[0];
                });
            if (strategySuitIndex === -1) {
                throw new Error(`В массиве возможных аргументов мува для соло бота отсутствует нужное значение главной стратегии фракции '${G.strategyForSoloBotAndvari.general[0]}'.`);
            }
            const moveArgument: CanBeUndef<SuitNames> = currentMoveArguments[strategySuitIndex];
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { G, ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            return moveArgument;
        },
        moveName: EmptyCardMoveNames.SoloBotAndvariPlaceYludHeroMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
        ): boolean => playerID === ctx.currentPlayer && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId,
    },
    SoloBotAndvariClickCoinToUpgradeMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): MoveCoinsArguments[] => DrawPlayersBoardsCoins(
            { ...rest },
            SoloBotAndvariCommonMoveValidatorNames.SoloBotAndvariClickCoinToUpgradeMoveValidator,
        ) as MoveCoinsArguments[],
        getValue: (
            { G, ...rest }: Context,
            currentMoveArguments: MoveCoinsArguments[],
            playerID: PlayerID,
        ): MoveCoinsArguments => {
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
            const coins: PublicPlayerBoardCoins = player.boardCoins,
                minValue: AllCoinsValue = CheckMinCoinVisibleValueForSoloBotAndvari(
                    { G, ...rest },
                    playerID,
                    currentMoveArguments,
                );
            if (minValue === 0) {
                throw new Error(`В массиве монет соло бота Андвари с id '${playerID}' не может быть минимальная монета для улучшения с значением '${minValue}'.`);
            }
            const coinId: PlayerCoinId = CheckMinCoinIndexForSoloBotAndvari(
                { G, ...rest },
                coins,
                minValue,
            ),
                moveArgument: CanBeUndef<MoveCoinsArguments> = currentMoveArguments[coinId];
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { G, ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            return moveArgument;
        },
        moveName: CoinMoveNames.SoloBotAndvariClickCoinToUpgradeMove,
        validate: (
            { ctx, ...rest }: Context,
            playerID: PlayerID,
            id: MoveCoinsArguments,
        ): boolean => playerID === ctx.currentPlayer && playerID === PlayerIdForSoloGameNames.SoloBotPlayerId
            && CoinUpgradeValidation(
                { ctx, ...rest },
                playerID,
                id,
            ),
    },
    // start
    AddCoinToPouchMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): PlayerCoinId[] => DrawPlayersHandsCoins(
            { ...rest },
            CommonMoveValidatorNames.AddCoinToPouchMoveValidator,
        ) as PlayerCoinId[],
        getValue: (
            { ...rest }: Context,
            currentMoveArguments: PlayerCoinId[],
        ): PlayerCoinId => {
            const moveArgument: CanBeUndef<number> =
                currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            AssertPlayerCoinId(moveArgument);
            return moveArgument;
        },
        moveName: CoinMoveNames.AddCoinToPouchMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
        ): boolean => playerID === ctx.currentPlayer,
    },
    ChooseCoinValueForVidofnirVedrfolnirUpgradeMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): BasicVidofnirVedrfolnirUpgradeValue[] => ChooseCoinValueForVidofnirVedrfolnirUpgradeProfit(
            { ...rest },
            CommonMoveValidatorNames.ChooseCoinValueForVidofnirVedrfolnirUpgradeMoveValidator,
        ) as BasicVidofnirVedrfolnirUpgradeValue[],
        getValue: (
            { ...rest }: Context,
            currentMoveArguments: BasicVidofnirVedrfolnirUpgradeValue[],
        ): BasicVidofnirVedrfolnirUpgradeValue => {
            const moveArgument: CanBeUndef<number> =
                currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            AssertBasicVidofnirVedrfolnirUpgradeValue(moveArgument);
            return moveArgument;
        },
        moveName: ButtonMoveNames.ChooseCoinValueForVidofnirVedrfolnirUpgradeMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
        ): boolean => playerID === ctx.currentPlayer,
    },
    ClickCampCardHoldaMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): CampCardArrayIndex[] => DrawCamp(
            { ...rest },
            CommonMoveValidatorNames.ClickCampCardHoldaMoveValidator,
        ) as CampCardArrayIndex[],
        getValue: (
            { ...rest }: Context,
            currentMoveArguments: CampCardArrayIndex[],
        ): CampCardArrayIndex => {
            const moveArgument: CanBeUndef<number> =
                currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            AssertCampIndex(moveArgument);
            return moveArgument;
        },
        moveName: CardMoveNames.ClickCampCardHoldaMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID
        ): boolean => playerID === ctx.currentPlayer,
    },
    // TODO Is it need for solo bot and andvari!?
    PickConcreteCoinToUpgradeMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): MoveCoinsArguments[] => (DrawPlayersBoardsCoins(
            { ...rest },
            CommonMoveValidatorNames.PickConcreteCoinToUpgradeMoveValidator,
        ) as MoveCoinsArguments[]).concat(DrawPlayersHandsCoins(
            { ...rest },
            CommonMoveValidatorNames.PickConcreteCoinToUpgradeMoveValidator,
        ) as MoveCoinsArguments[]),
        getValue: (
            { ...rest }: Context,
            currentMoveArguments: MoveCoinsArguments[],
        ): MoveCoinsArguments => {
            const moveArgument: CanBeUndef<MoveCoinsArguments> =
                currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            return moveArgument;
        },
        moveName: CoinMoveNames.PickConcreteCoinToUpgradeMove,
        validate: (
            { ctx, ...rest }: Context,
            playerID: PlayerID,
            id: MoveCoinsArguments,
        ): boolean => playerID === ctx.currentPlayer && CoinUpgradeValidation(
            { ctx, ...rest },
            playerID,
            id,
        ),
    },
    ClickCoinToUpgradeMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): MoveCoinsArguments[] => (DrawPlayersBoardsCoins(
            { ...rest },
            CommonMoveValidatorNames.ClickCoinToUpgradeMoveValidator,
        ) as MoveCoinsArguments[]).concat(DrawPlayersHandsCoins(
            { ...rest },
            CommonMoveValidatorNames.ClickCoinToUpgradeMoveValidator,
        ) as MoveCoinsArguments[]),
        getValue: (
            { ...rest }: Context,
            currentMoveArguments: MoveCoinsArguments[],
        ): MoveCoinsArguments => {
            const moveArgument: CanBeUndef<MoveCoinsArguments> =
                currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            return moveArgument;
        },
        moveName: CoinMoveNames.ClickCoinToUpgradeMove,
        validate: (
            { ctx, ...rest }: Context,
            playerID: PlayerID,
            id: MoveCoinsArguments,
        ): boolean => playerID === ctx.currentPlayer && CoinUpgradeValidation(
            { ctx, ...rest },
            playerID,
            id,
        ),
    },
    ClickHeroCardMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): AllHeroesForPlayerOrSoloBotAddToPlayerBoardPossibleCardId[] => DrawHeroes(
            { ...rest },
            CommonMoveValidatorNames.ClickHeroCardMoveValidator,
        ) as AllHeroesForPlayerOrSoloBotAddToPlayerBoardPossibleCardId[],
        getValue: (
            { ...rest }: Context,
            currentMoveArguments: AllHeroesForPlayerOrSoloBotAddToPlayerBoardPossibleCardId[],
        ): AllHeroesForPlayerOrSoloBotAddToPlayerBoardPossibleCardId => {
            const moveArgument: CanBeUndef<number> =
                currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            AssertAllHeroesForPlayerOrSoloBotAddToPlayerBoardPossibleCardId(moveArgument);
            return moveArgument;
        },
        moveName: CardMoveNames.ClickHeroCardMove,
        validate: (
            { G, ctx, ...rest }: Context,
            playerID: PlayerID,
            id: number,
        ): boolean => {
            let isValid = false;
            const hero: CanBeUndef<HeroCard> = G.heroes[id];
            if (hero === undefined) {
                throw new Error(`В массиве карт героев отсутствует герой с id '${id}'.`);
            }
            const validators: CanBeUndef<PickValidatorsConfig> = hero.pickValidators;
            if (validators !== undefined) {
                let validator: PickHeroCardValidatorNamesKeyof,
                    _exhaustiveCheck: never;
                for (validator in validators) {
                    if (validator === PickHeroCardValidatorNames.conditions) {
                        isValid = IsCanPickHeroWithConditionsValidator(
                            { G, ctx, ...rest },
                            playerID,
                            id,
                        );
                    } else if (validator === PickHeroCardValidatorNames.discardCard) {
                        isValid = IsCanPickHeroWithDiscardCardsFromPlayerBoardValidator(
                            { G, ctx, ...rest },
                            playerID,
                            id,
                        );
                    } else {
                        _exhaustiveCheck = validator;
                        throw new Error(`Отсутствует валидатор для выбора карты героя.`);
                        return _exhaustiveCheck;
                    }
                }
            } else {
                isValid = true;
            }
            return playerID === ctx.currentPlayer && isValid;
        },
    },
    DiscardTopCardFromSuitMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): Partial<SuitProperty<number[]>> => DrawPlayersBoards(
            { ...rest },
            CommonMoveValidatorNames.DiscardTopCardFromSuitMoveValidator,
        ) as Partial<SuitProperty<number[]>>,
        getValue: (
            { ...rest }: Context,
            currentMoveArguments: Partial<SuitProperty<number[]>>,
        ): MoveSuitCardCurrentId => {
            const suitNamesArray: SuitNames[] = [];
            let suit: SuitNames;
            for (suit in currentMoveArguments) {
                suitNamesArray.push(suit);
            }
            const suitName: CanBeUndef<SuitNames> =
                suitNamesArray[Math.floor(Math.random() * suitNamesArray.length)];
            if (suitName === undefined) {
                throw new Error(`Отсутствует выбранная случайно фракция для сброса карты.`);
            }
            const moveArgumentForSuit: CanBeUndef<number[]> = currentMoveArguments[suitName];
            if (moveArgumentForSuit === undefined) {
                throw new Error(`Отсутствует обязательный параметр с аргументом '${suitName}'.`);
            }
            const moveArgument: CanBeUndef<number> =
                moveArgumentForSuit[Math.floor(Math.random() * moveArgumentForSuit.length)];
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            return {
                suit: suitName,
                cardId: moveArgument,
            };
        },
        moveName: CardMoveNames.DiscardTopCardFromSuitMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
        ): boolean => playerID === ctx.currentPlayer,
    },
    DiscardSuitCardFromPlayerBoardMoveValidator: {
        getRange: (
            { ...rest }: Context,
            playerID: PlayerID,
        ): MoveCardsArguments => DrawPlayersBoards(
            { ...rest },
            CommonMoveValidatorNames.DiscardSuitCardFromPlayerBoardMoveValidator,
            playerID,
        ) as MoveCardsArguments,
        getValue: (
            { G, ...rest }: Context,
            currentMoveArguments: MoveCardsArguments,
            playerID: PlayerID,
        ): MoveCardId => {
            if (playerID === undefined) {
                return ThrowMyError(
                    { G, ...rest },
                    ErrorNames.PlayerIDIsNotDefined,
                );
            }
            // TODO Check playerID here!!!
            const player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
            if (player === undefined) {
                return ThrowMyError(
                    { G, ...rest },
                    ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
                    playerID,
                );
            }
            const cardFirst: CanBeUndef<PlayerBoardCard> = player.cards[SuitNames.warrior][0];
            if (cardFirst === undefined) {
                throw new Error(`В массиве карт игрока во фракции '${SuitNames.warrior}' отсутствует первая карта.`);
            }
            let minCardIndex = 0,
                minCardValue: CanBeNull<number> = cardFirst.points;
            currentMoveArguments.cards.forEach((value: number, index: number): void => {
                const card: CanBeUndef<PlayerBoardCard> = player.cards[SuitNames.warrior][value];
                if (card === undefined) {
                    throw new Error(`В массиве карт игрока во фракции '${SuitNames.warrior}' отсутствует карта ${value}.`);
                }
                const cardPoints: CanBeNull<number> = card.points;
                if (cardPoints === null || minCardValue === null) {
                    throw new Error(`Фракция должна иметь параметр 'points'.`);
                }
                if (cardPoints < minCardValue) {
                    minCardIndex = index;
                    minCardValue = cardPoints;
                }
            });
            const cardIndex: CanBeUndef<number> = currentMoveArguments.cards[minCardIndex];
            if (cardIndex === undefined) {
                throw new Error(`В массиве аргументов для 'cardId' отсутствует значение с id '${minCardIndex}'.`);
            }
            return {
                cardId: cardIndex,
            };
        },
        moveName: CardMoveNames.DiscardSuitCardFromPlayerBoardMove,
        // TODO validate Not bot playerID === ctx.currentPlayer & for Bot playerID exists in playersNum and card not hero?
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
        ): boolean => playerID === ctx.currentPlayer,
    },
    PickDiscardCardMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): number[] => DrawDiscardedCards(
            { ...rest },
            CommonMoveValidatorNames.PickDiscardCardMoveValidator,
        ) as number[],
        getValue: (
            { ...rest }: Context,
            currentMoveArguments: number[],
        ): number => {
            const moveArgument: CanBeUndef<number> =
                currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            return moveArgument;
        },
        moveName: CardMoveNames.PickDiscardCardMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
        ): boolean => playerID === ctx.currentPlayer,
    },
    PlaceMultiSuitCardMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): SuitNames[] => DrawPlayersBoards(
            { ...rest },
            CommonMoveValidatorNames.PlaceMultiSuitCardMoveValidator,
        ) as SuitNames[],
        getValue: (
            { ...rest }: Context,
            currentMoveArguments: SuitNames[],
        ): SuitNames => {
            const moveArgument: CanBeUndef<SuitNames> =
                currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            return moveArgument;
        },
        moveName: EmptyCardMoveNames.PlaceMultiSuitCardMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
        ): boolean => playerID === ctx.currentPlayer,
    },
    PlaceThrudHeroMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): SuitNames[] => DrawPlayersBoards(
            { ...rest },
            CommonMoveValidatorNames.PlaceThrudHeroMoveValidator,
        ) as SuitNames[],
        getValue: (
            { ...rest }: Context,
            currentMoveArguments: SuitNames[],
        ): SuitNames => {
            // TODO Move same logic for SuitTypes & number to functions and use it in getValue
            // TODO Same logic for Ylud placement!
            const moveArgument: CanBeUndef<SuitNames> =
                currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            return moveArgument;
        },
        moveName: EmptyCardMoveNames.PlaceThrudHeroMove,
        validate: (
            { ctx }: Context,
            playerID: PlayerID,
        ): boolean => playerID === ctx.currentPlayer,
    },
    UpgradeCoinVidofnirVedrfolnirMoveValidator: {
        getRange: (
            { ...rest }: Context,
        ): MoveCoinsArguments[] => DrawPlayersBoardsCoins(
            { ...rest },
            CommonMoveValidatorNames.UpgradeCoinVidofnirVedrfolnirMoveValidator,
        ) as MoveCoinsArguments[],
        getValue: (
            { ...rest }: Context,
            currentMoveArguments: MoveCoinsArguments[],
        ): MoveCoinsArguments => {
            const moveArgument: CanBeUndef<MoveCoinsArguments> =
                currentMoveArguments[Math.floor(Math.random() * currentMoveArguments.length)];
            if (moveArgument === undefined) {
                return ThrowMyError(
                    { ...rest },
                    ErrorNames.CurrentMoveArgumentIsUndefined,
                );
            }
            return moveArgument;
        },
        moveName: CoinMoveNames.UpgradeCoinVidofnirVedrfolnirMove,
        validate: (
            { G, ctx, ...rest }: Context,
            playerID: PlayerID,
            id: MoveCoinsArguments,
        ): boolean => {
            if (playerID === undefined) {
                return ThrowMyError(
                    { G, ctx, ...rest },
                    ErrorNames.PlayerIDIsNotDefined,
                );
            }
            const player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
            if (player === undefined) {
                return ThrowMyError(
                    { G, ctx, ...rest },
                    ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
                    playerID,
                );
            }
            return playerID === ctx.currentPlayer && player.stack[0]?.coinId !== id.coinId && CoinUpgradeValidation(
                { G, ctx, ...rest },
                playerID,
                id,
            );
        },
    },
    // end
};

/**
 * <h3>ДОБАВИТЬ ОПИСАНИЕ.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>ДОБАВИТЬ ПРИМЕНЕНИЯ.</li>
 * </oL>
 * @TODO Саше: сделать описание функции и параметров.
 */
export const moveBy: MoveBy = {
    default: null,
    ChooseDifficultySoloMode: {
        ChooseDifficultyLevelForSoloMode: {
            ChooseDifficultyLevelForSoloModeMove: moveValidators.ChooseDifficultyLevelForSoloModeMoveValidator,
        },
        ChooseHeroForDifficultySoloMode: {
            ChooseHeroForDifficultySoloModeMove: moveValidators.ChooseHeroForDifficultySoloModeMoveValidator,
        },
        // Solo Bot
        SoloBotClickCoinToUpgrade: {
            SoloBotClickCoinToUpgradeMove: moveValidators.SoloBotClickCoinToUpgradeMoveValidator,
        },
    },
    ChooseDifficultySoloModeAndvari: {
        ChooseStrategyVariantForSoloModeAndvari: {
            ChooseStrategyVariantForSoloModeAndvariMove:
                moveValidators.ChooseStrategyVariantForSoloModeAndvariMoveValidator,
        },
        ChooseStrategyForSoloModeAndvari: {
            ChooseStrategyForSoloModeAndvariMove: moveValidators.ChooseStrategyForSoloModeAndvariMoveValidator,
        },
    },
    Bids: {
        ClickHandCoin: {
            ClickHandCoinMove: moveValidators.ClickHandCoinMoveValidator,
        },
        ClickBoardCoin: {
            ClickBoardCoinMove: moveValidators.ClickBoardCoinMoveValidator,
        },
        // Bots
        BotsPlaceAllCoins: {
            BotsPlaceAllCoinsMove: moveValidators.BotsPlaceAllCoinsMoveValidator,
        },
        // Solo Bot
        SoloBotPlaceAllCoins: {
            SoloBotPlaceAllCoinsMove: moveValidators.SoloBotPlaceAllCoinsMoveValidator,
        },
        // Solo Bot Andvari
        SoloBotAndvariPlaceAllCoins: {
            SoloBotAndvariPlaceAllCoinsMove: moveValidators.SoloBotAndvariPlaceAllCoinsMoveValidator,
        },
    },
    BidUline: {
        ClickHandCoinUline: {
            ClickHandCoinUlineMove: moveValidators.ClickHandCoinUlineMoveValidator,
        },
    },
    TavernsResolution: {
        ClickCard: {
            ClickCardMove: moveValidators.ClickCardMoveValidator,
        },
        ClickCampCard: {
            ClickCampCardMove: moveValidators.ClickCampCardMoveValidator,
        },
        // TODO Check/Fix
        // start
        AddCoinToPouch: {
            AddCoinToPouchMove: moveValidators.AddCoinToPouchMoveValidator,
        },
        ChooseCoinValueForVidofnirVedrfolnirUpgrade: {
            ChooseCoinValueForVidofnirVedrfolnirUpgradeMove:
                moveValidators.ChooseCoinValueForVidofnirVedrfolnirUpgradeMoveValidator,
        },
        DiscardTopCardFromSuit: {
            DiscardTopCardFromSuitMove: moveValidators.DiscardTopCardFromSuitMoveValidator,
        },
        DiscardSuitCardFromPlayerBoard: {
            DiscardSuitCardFromPlayerBoardMove: moveValidators.DiscardSuitCardFromPlayerBoardMoveValidator,
        },
        ClickCampCardHolda: {
            ClickCampCardHoldaMove: moveValidators.ClickCampCardHoldaMoveValidator,
        },
        PickConcreteCoinToUpgrade: {
            PickConcreteCoinToUpgradeMove: moveValidators.PickConcreteCoinToUpgradeMoveValidator,
        },
        PickDiscardCard: {
            PickDiscardCardMove: moveValidators.PickDiscardCardMoveValidator,
        },
        ClickHeroCard: {
            ClickHeroCardMove: moveValidators.ClickHeroCardMoveValidator,
        },
        PlaceMultiSuitCard: {
            PlaceMultiSuitCardMove: moveValidators.PlaceMultiSuitCardMoveValidator,
        },
        PlaceThrudHero: {
            PlaceThrudHeroMove: moveValidators.PlaceThrudHeroMoveValidator,
        },
        ClickCoinToUpgrade: {
            ClickCoinToUpgradeMove: moveValidators.ClickCoinToUpgradeMoveValidator,
        },
        UpgradeCoinVidofnirVedrfolnir: {
            UpgradeCoinVidofnirVedrfolnirMove: moveValidators.UpgradeCoinVidofnirVedrfolnirMoveValidator,
        },
        // end
        ActivateGiantAbilityOrPickCard: {
            ClickCardNotGiantAbilityMove: moveValidators.ClickCardNotGiantAbilityMoveValidator,
            ClickGiantAbilityNotCardMove: moveValidators.ClickGiantAbilityNotCardMoveValidator,
        },
        ActivateGodAbilityOrNot: {
            ActivateGodAbilityMove: moveValidators.ActivateGodAbilityMoveValidator,
            NotActivateGodAbilityMove: moveValidators.NotActivateGodAbilityMoveValidator,
        },
        ChooseCoinValueForHrungnirUpgrade: {
            ChooseCoinValueForHrungnirUpgradeMove: moveValidators.ChooseCoinValueForHrungnirUpgradeMoveValidator,
        },
        ChooseSuitOlrun: {
            ChooseSuitOlrunMove: moveValidators.ChooseSuitOlrunMoveValidator,
        },
        DiscardCard2Players: {
            DiscardCard2PlayersMove: moveValidators.DiscardCard2PlayersMoveValidator,
        },
        GetMythologyCard: {
            GetMythologyCardMove: moveValidators.GetMythologyCardMoveValidator,
        },
        ClickHandTradingCoinUline: {
            ClickHandTradingCoinUlineMove: moveValidators.ClickHandTradingCoinUlineMoveValidator,
        },
        // Solo Bot
        SoloBotClickCard: {
            SoloBotClickCardMove: moveValidators.SoloBotClickCardMoveValidator,
        },
        // Common Solo Bot Start
        SoloBotClickHeroCard: {
            SoloBotClickHeroCardMove: moveValidators.SoloBotClickHeroCardMoveValidator,
        },
        SoloBotPlaceThrudHero: {
            SoloBotPlaceThrudHeroMove: moveValidators.SoloBotPlaceThrudHeroMoveValidator,
        },
        SoloBotClickCoinToUpgrade: {
            SoloBotClickCoinToUpgradeMove: moveValidators.SoloBotClickCoinToUpgradeMoveValidator,
        },
        // Common Solo Bot End
        // Solo Bot Andvari
        SoloBotAndvariClickCard: {
            SoloBotAndvariClickCardMove: moveValidators.SoloBotAndvariClickCardMoveValidator,
        },
        // Common Solo Bot Andvari Start
        SoloBotAndvariClickHeroCard: {
            SoloBotAndvariClickHeroCardMove: moveValidators.SoloBotAndvariClickHeroCardMoveValidator,
        },
        SoloBotAndvariPlaceThrudHero: {
            SoloBotAndvariPlaceThrudHeroMove: moveValidators.SoloBotAndvariPlaceThrudHeroMoveValidator,
        },
        SoloBotAndvariClickCoinToUpgrade: {
            SoloBotAndvariClickCoinToUpgradeMove: moveValidators.SoloBotAndvariClickCoinToUpgradeMoveValidator,
        },
        // Common Solo Bot Andvari End
    },
    EnlistmentMercenaries: {
        StartEnlistmentMercenaries: {
            StartEnlistmentMercenariesMove: moveValidators.StartEnlistmentMercenariesMoveValidator,
        },
        PassEnlistmentMercenaries: {
            PassEnlistmentMercenariesMove: moveValidators.PassEnlistmentMercenariesMoveValidator,
        },
        GetEnlistmentMercenaries: {
            GetEnlistmentMercenariesMove: moveValidators.GetEnlistmentMercenariesMoveValidator,
        },
        PlaceEnlistmentMercenaries: {
            PlaceEnlistmentMercenariesMove: moveValidators.PlaceEnlistmentMercenariesMoveValidator,
        },
        // start
        AddCoinToPouch: {
            AddCoinToPouchMove: moveValidators.AddCoinToPouchMoveValidator,
        },
        ChooseCoinValueForVidofnirVedrfolnirUpgrade: {
            ChooseCoinValueForVidofnirVedrfolnirUpgradeMove:
                moveValidators.ChooseCoinValueForVidofnirVedrfolnirUpgradeMoveValidator,
        },
        DiscardTopCardFromSuit: {
            DiscardTopCardFromSuitMove: moveValidators.DiscardTopCardFromSuitMoveValidator,
        },
        DiscardSuitCardFromPlayerBoard: {
            DiscardSuitCardFromPlayerBoardMove: moveValidators.DiscardSuitCardFromPlayerBoardMoveValidator,
        },
        ClickCampCardHolda: {
            ClickCampCardHoldaMove: moveValidators.ClickCampCardHoldaMoveValidator,
        },
        PickConcreteCoinToUpgrade: {
            PickConcreteCoinToUpgradeMove: moveValidators.PickConcreteCoinToUpgradeMoveValidator,
        },
        PickDiscardCard: {
            PickDiscardCardMove: moveValidators.PickDiscardCardMoveValidator,
        },
        ClickHeroCard: {
            ClickHeroCardMove: moveValidators.ClickHeroCardMoveValidator,
        },
        PlaceMultiSuitCard: {
            PlaceMultiSuitCardMove: moveValidators.PlaceMultiSuitCardMoveValidator,
        },
        PlaceThrudHero: {
            PlaceThrudHeroMove: moveValidators.PlaceThrudHeroMoveValidator,
        },
        ClickCoinToUpgrade: {
            ClickCoinToUpgradeMove: moveValidators.ClickCoinToUpgradeMoveValidator,
        },
        UpgradeCoinVidofnirVedrfolnir: {
            UpgradeCoinVidofnirVedrfolnirMove: moveValidators.UpgradeCoinVidofnirVedrfolnirMoveValidator,
        },
        // end
    },
    PlaceYlud: {
        PlaceYludHero: {
            PlaceYludHeroMove: moveValidators.PlaceYludHeroMoveValidator,
        },
        // start
        AddCoinToPouch: {
            AddCoinToPouchMove: moveValidators.AddCoinToPouchMoveValidator,
        },
        ChooseCoinValueForVidofnirVedrfolnirUpgrade: {
            ChooseCoinValueForVidofnirVedrfolnirUpgradeMove:
                moveValidators.ChooseCoinValueForVidofnirVedrfolnirUpgradeMoveValidator,
        },
        DiscardTopCardFromSuit: {
            DiscardTopCardFromSuitMove: moveValidators.DiscardTopCardFromSuitMoveValidator,
        },
        DiscardSuitCardFromPlayerBoard: {
            DiscardSuitCardFromPlayerBoardMove: moveValidators.DiscardSuitCardFromPlayerBoardMoveValidator,
        },
        ClickCampCardHolda: {
            ClickCampCardHoldaMove: moveValidators.ClickCampCardHoldaMoveValidator,
        },
        PickConcreteCoinToUpgrade: {
            PickConcreteCoinToUpgradeMove: moveValidators.PickConcreteCoinToUpgradeMoveValidator,
        },
        PickDiscardCard: {
            PickDiscardCardMove: moveValidators.PickDiscardCardMoveValidator,
        },
        ClickHeroCard: {
            ClickHeroCardMove: moveValidators.ClickHeroCardMoveValidator,
        },
        PlaceMultiSuitCard: {
            PlaceMultiSuitCardMove: moveValidators.PlaceMultiSuitCardMoveValidator,
        },
        PlaceThrudHero: {
            PlaceThrudHeroMove: moveValidators.PlaceThrudHeroMoveValidator,
        },
        ClickCoinToUpgrade: {
            ClickCoinToUpgradeMove: moveValidators.ClickCoinToUpgradeMoveValidator,
        },
        UpgradeCoinVidofnirVedrfolnir: {
            UpgradeCoinVidofnirVedrfolnirMove: moveValidators.UpgradeCoinVidofnirVedrfolnirMoveValidator,
        },
        // end
        // Solo Bot
        SoloBotPlaceYludHero: {
            SoloBotPlaceYludHeroMove: moveValidators.SoloBotPlaceYludHeroMoveValidator,
        },
        // Common Solo Bot Start
        SoloBotClickHeroCard: {
            SoloBotClickHeroCardMove: moveValidators.SoloBotClickHeroCardMoveValidator,
        },
        SoloBotPlaceThrudHero: {
            SoloBotPlaceThrudHeroMove: moveValidators.SoloBotPlaceThrudHeroMoveValidator,
        },
        SoloBotClickCoinToUpgrade: {
            SoloBotClickCoinToUpgradeMove: moveValidators.SoloBotClickCoinToUpgradeMoveValidator,
        },
        // Common Solo Bot End
        // Solo Bot Andvari
        SoloBotAndvariPlaceYludHero: {
            SoloBotAndvariPlaceYludHeroMove: moveValidators.SoloBotAndvariPlaceYludHeroMoveValidator,
        },
        // Common Solo Bot Andvari Start
        SoloBotAndvariClickHeroCard: {
            SoloBotAndvariClickHeroCardMove: moveValidators.SoloBotAndvariClickHeroCardMoveValidator,
        },
        SoloBotAndvariPlaceThrudHero: {
            SoloBotAndvariPlaceThrudHeroMove: moveValidators.SoloBotAndvariPlaceThrudHeroMoveValidator,
        },
        SoloBotAndvariClickCoinToUpgrade: {
            SoloBotAndvariClickCoinToUpgradeMove: moveValidators.SoloBotAndvariClickCoinToUpgradeMoveValidator,
        },
        // Common Solo Bot Andvari End
    },
    TroopEvaluation: {
        ClickDistinctionCard: {
            ClickDistinctionCardMove: moveValidators.ClickDistinctionCardMoveValidator,
        },
        // start
        AddCoinToPouch: {
            AddCoinToPouchMove: moveValidators.AddCoinToPouchMoveValidator,
        },
        ChooseCoinValueForVidofnirVedrfolnirUpgrade: {
            ChooseCoinValueForVidofnirVedrfolnirUpgradeMove:
                moveValidators.ChooseCoinValueForVidofnirVedrfolnirUpgradeMoveValidator,
        },
        DiscardTopCardFromSuit: {
            DiscardTopCardFromSuitMove: moveValidators.DiscardTopCardFromSuitMoveValidator,
        },
        DiscardSuitCardFromPlayerBoard: {
            DiscardSuitCardFromPlayerBoardMove: moveValidators.DiscardSuitCardFromPlayerBoardMoveValidator,
        },
        ClickCampCardHolda: {
            ClickCampCardHoldaMove: moveValidators.ClickCampCardHoldaMoveValidator,
        },
        PickConcreteCoinToUpgrade: {
            PickConcreteCoinToUpgradeMove: moveValidators.PickConcreteCoinToUpgradeMoveValidator,
        },
        PickDiscardCard: {
            PickDiscardCardMove: moveValidators.PickDiscardCardMoveValidator,
        },
        ClickHeroCard: {
            ClickHeroCardMove: moveValidators.ClickHeroCardMoveValidator,
        },
        PlaceMultiSuitCard: {
            PlaceMultiSuitCardMove: moveValidators.PlaceMultiSuitCardMoveValidator,
        },
        PlaceThrudHero: {
            PlaceThrudHeroMove: moveValidators.PlaceThrudHeroMoveValidator,
        },
        ClickCoinToUpgrade: {
            ClickCoinToUpgradeMove: moveValidators.ClickCoinToUpgradeMoveValidator,
        },
        UpgradeCoinVidofnirVedrfolnir: {
            UpgradeCoinVidofnirVedrfolnirMove: moveValidators.UpgradeCoinVidofnirVedrfolnirMoveValidator,
        },
        // end
        ClickCardToPickDistinction: {
            ClickCardToPickDistinctionMove: moveValidators.ClickCardToPickDistinctionMoveValidator,
        },
        // Solo Bot
        SoloBotClickCardToPickDistinction: {
            SoloBotClickCardToPickDistinctionMove: moveValidators.SoloBotClickCardToPickDistinctionMoveValidator,
        },
        // Common Solo Bot Start
        SoloBotClickHeroCard: {
            SoloBotClickHeroCardMove: moveValidators.SoloBotClickHeroCardMoveValidator,
        },
        SoloBotPlaceThrudHero: {
            SoloBotPlaceThrudHeroMove: moveValidators.SoloBotPlaceThrudHeroMoveValidator,
        },
        SoloBotClickCoinToUpgrade: {
            SoloBotClickCoinToUpgradeMove: moveValidators.SoloBotClickCoinToUpgradeMoveValidator,
        },
        // Common Solo Bot End
        // Solo Bot Andvari
        SoloBotAndvariClickCardToPickDistinction: {
            SoloBotAndvariClickCardToPickDistinctionMove:
                moveValidators.SoloBotAndvariClickCardToPickDistinctionMoveValidator,
        },
        // Common Solo Bot Andvari Start
        SoloBotAndvariClickHeroCard: {
            SoloBotAndvariClickHeroCardMove: moveValidators.SoloBotAndvariClickHeroCardMoveValidator,
        },
        SoloBotAndvariPlaceThrudHero: {
            SoloBotAndvariPlaceThrudHeroMove: moveValidators.SoloBotAndvariPlaceThrudHeroMoveValidator,
        },
        SoloBotAndvariClickCoinToUpgrade: {
            SoloBotAndvariClickCoinToUpgradeMove: moveValidators.SoloBotAndvariClickCoinToUpgradeMoveValidator,
        },
        // Common Solo Bot Andvari End
    },
    BrisingamensEndGame: {
        DiscardCardFromPlayerBoard: {
            DiscardCardFromPlayerBoardMove: moveValidators.DiscardCardFromPlayerBoardMoveValidator,
        },
    },
    GetMjollnirProfit: {
        GetMjollnirProfit: {
            GetMjollnirProfitMove: moveValidators.GetMjollnirProfitMoveValidator,
        },
    },
};

// TODO Move to function generic type with extends number & SuitNames
/**
 * <h3>ДОБАВИТЬ ОПИСАНИЕ.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>ДОБАВИТЬ ПРИМЕНЕНИЯ.</li>
 * </oL>
 *
 * @TODO Саше: сделать описание функции и параметров.
 * @param value Значение для валидации.
 * @param values Массив значений, допустимых для прохождения валидации.
 * @returns Валидация значений мувов.
 */
const ValidateByArrayValues = <T extends string | number>(
    value: T,
    values: T[],
): boolean => values.includes(value);

/**
 * <h3>ДОБАВИТЬ ОПИСАНИЕ.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>ДОБАВИТЬ ПРИМЕНЕНИЯ.</li>
 * </oL>
 *
 * @TODO Саше: сделать описание функции и параметров.
 * @param value
 * @param values
 * @returns Валидация монет.
 */
const ValidateByObjectCoinIdTypeIsInitialValues = (
    value: MoveCoinsArguments,
    values: MoveCoinsArguments[],
): boolean => values.findIndex((coin: MoveCoinsArguments): boolean =>
    value.coinId === coin.coinId && value.type === coin.type) !== -1;

/**
 * <h3>ДОБАВИТЬ ОПИСАНИЕ.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>ДОБАВИТЬ ПРИМЕНЕНИЯ.</li>
 * </oL>
 *
 * @TODO Саше: сделать описание функции и параметров.
 * @param value
 * @param values
 * @returns Валидация карт.
 */
const ValidateByObjectSuitCardIdValues = (
    value: MoveSuitCardCurrentId,
    values: Partial<SuitProperty<number[]>>,
): boolean => {
    const objectSuitCardIdValues: CanBeUndef<number[]> = values[value.suit];
    return objectSuitCardIdValues !== undefined && objectSuitCardIdValues.includes(value.cardId);
};

/**
 * <h3>ДОБАВИТЬ ОПИСАНИЕ.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>ДОБАВИТЬ ПРИМЕНЕНИЯ.</li>
 * </oL>
 *
 * @TODO Саше: сделать описание функции и параметров.
 * @param value
 * @param values
 * @returns Валидация карт.
 */
const ValidateByObjectCardIdValues = (
    value: MoveCardId,
    values: MoveCardsArguments,
): boolean => values.cards.includes(value.cardId);

/**
* <h3>ДОБАВИТЬ ОПИСАНИЕ.</h3>
* <p>Применения:</p>
* <ol>
* <li>ДОБАВИТЬ ПРИМЕНЕНИЯ.</li>
* </oL>
*
* @TODO Саше: сделать описание функции и параметров.
* @param value
* @param values
* @returns Валидация карт.
*/
const ValidateObjectEqualValues = (
    value: DwarfCard,
    values: DwarfCard,
): boolean => {
    const props1: Keyof<DwarfCard>[] = Object.getOwnPropertyNames(value) as Keyof<DwarfCard>[],
        props2: Keyof<DwarfCard>[] = Object.getOwnPropertyNames(values) as Keyof<DwarfCard>[];
    if (props1.length !== props2.length) {
        return false;
    }
    for (let i = 0; i < props1.length; i++) {
        const prop: CanBeUndef<Keyof<DwarfCard>> = props1[i];
        if (prop === undefined) {
            throw new Error(`Не существует такого 'prop'.`);
        }
        if (value[prop] !== values[prop]) {
            return false;
        }
    }
    return true;
};
