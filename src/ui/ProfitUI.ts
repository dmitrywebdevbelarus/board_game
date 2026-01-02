import { JSX } from "react";
import { ThrowMyError } from "../Error";
import { AssertAllHeroesForDifficultySoloModePossibleCardId, AssertExplorerDistinctionCardId, AssertMythologicalCreatureDeckForSkymirCardId, AssertSoloGameAndvariStrategyVariantLevel, AssertSoloGameDifficultyLevelArg } from "../is_helpers/AssertionTypeHelpers";
import { IsDwarfCard } from "../is_helpers/IsDwarfTypeHelpers";
import { BoardProps } from "../typescript/Client";
import { ActivateGiantAbilityOrPickCardSubMoveValidatorNames, ActivateGodAbilityOrNotSubMoveValidatorNames, ButtonMoveNames, ButtonNames, CardMoveNames, CardRusNames, ChooseDifficultySoloModeAndvariMoveValidatorNames, ChooseDifficultySoloModeMoveValidatorNames, ChooseDifficultySoloModeStageNames, CommonMoveValidatorNames, EnlistmentMercenariesMoveValidatorNames, ErrorNames, GiantNames, GodNames, PlayerIdForSoloGameNames, SoloGameAndvariStrategyNames, SuitNames, SuitRusNames, TavernsResolutionMoveValidatorNames, TavernsResolutionStageNames, TroopEvaluationMoveValidatorNames, TroopEvaluationStageNames } from "../typescript/enums";
import type { ActiveStageNames, AllHeroesForDifficultySoloModePossibleCardId, BasicVidofnirVedrfolnirUpgradeValue, CanBeNull, CanBeUndef, CanBeVoid, Context, DwarfCard, DwarfDeckCard, ExplorerDistinctionCardId, HeroCard, MoveArguments, MythologicalCreatureCard, MythologicalCreatureCommandZoneCard, MythologicalCreatureDeckForSkymirCardId, PlayerStack, ProfitFunction, PublicPlayer, SoloGameAndvariStrategyVariantLevel, SoloGameDifficultyLevelArg, StackCards, VidofnirVedrfolnirUpgradeValue } from "../typescript/interfaces";
import { DrawButton, DrawCard } from "./ElementsUI";

/**
 * <h3>Отрисовка для выбора карты Дворфа или активации способности Гиганта.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка игрового поля.</li>
 * </ol>
 *
 * @param context
 * @param validatorName Название валидатора.
 * @param data Глобальные параметры.
 * @param boardCells Ячейки для отрисовки.
 * @returns Поле для выбора карты Дворфа или активации способности Гиганта.
 */
export const ActivateGiantAbilityOrPickCardProfit:
    ProfitFunction<ActivateGiantAbilityOrPickCardSubMoveValidatorNames> = (
        { G, ctx, ...rest }: Context,
        validatorName: CanBeNull<ActivateGiantAbilityOrPickCardSubMoveValidatorNames>,
        data?: BoardProps,
        boardCells?: JSX.Element[],
    ): CanBeVoid<MoveArguments<DwarfCard>> => {
        let moveMainArgs: CanBeUndef<MoveArguments<DwarfCard>>;
        const player: CanBeUndef<PublicPlayer> = G.publicPlayers[ctx.currentPlayer];
        if (player === undefined) {
            return ThrowMyError(
                { G, ctx, ...rest },
                ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
                ctx.currentPlayer,
            );
        }
        const stack: CanBeUndef<PlayerStack> = player.stack[0];
        if (stack === undefined) {
            return ThrowMyError(
                { G, ctx, ...rest },
                ErrorNames.FirstStackActionForPlayerWithCurrentIdIsUndefined,
                ctx.currentPlayer,
            );
        }
        const card: CanBeUndef<StackCards> = stack.card;
        if (card === undefined) {
            throw new Error(`В стеке игрока отсутствует 'card'.`);
        }
        if (!IsDwarfCard(card)) {
            throw new Error(`В стеке игрока 'card' должен быть с типом '${CardRusNames.DwarfCard}'.`);
        }
        for (let j = 0; j < 2; j++) {
            if (j === 0) {
                if (data !== undefined && boardCells !== undefined) {
                    DrawCard(
                        { G, ctx, ...rest },
                        data,
                        boardCells,
                        card,
                        j,
                        card.playerSuit,
                        player,
                        CardMoveNames.ClickCardNotGiantAbilityMove,
                        [card],
                    );
                } else if (validatorName ===
                    ActivateGiantAbilityOrPickCardSubMoveValidatorNames.ClickCardNotGiantAbilityMoveValidator) {
                    moveMainArgs = card;
                } else {
                    return ThrowMyError(
                        { G, ctx, ...rest },
                        ErrorNames.NoAddedValidator,
                    );
                }
            } else if (G.publicPlayersOrder.length > 1) {
                const giantName: CanBeUndef<GiantNames> = stack.giantName;
                if (giantName === undefined) {
                    throw new Error(`В стеке игрока отсутствует 'giantName'.`);
                }
                const giant: CanBeUndef<MythologicalCreatureCommandZoneCard> =
                    player.mythologicalCreatureCards.find((card: MythologicalCreatureCommandZoneCard):
                        boolean => card.name === giantName);
                if (giant === undefined) {
                    throw new Error(`В массиве карт мифических существ игрока с id '${ctx.currentPlayer}' в командной зоне отсутствует карта '${CardRusNames.GiantCard}' с названием '${giantName}'.`);
                }
                if (data !== undefined && boardCells !== undefined) {
                    DrawCard(
                        { G, ctx, ...rest },
                        data,
                        boardCells,
                        giant,
                        j,
                        null,
                        player,
                        CardMoveNames.ClickGiantAbilityNotCardMove,
                        [card],
                    );
                } else if (validatorName ===
                    ActivateGiantAbilityOrPickCardSubMoveValidatorNames.ClickGiantAbilityNotCardMoveValidator) {
                    moveMainArgs = card;
                } else {
                    return ThrowMyError(
                        { G, ctx, ...rest },
                        ErrorNames.NoAddedValidator,
                    );
                }
            }
        }
        if (validatorName !== null) {
            if (moveMainArgs === undefined) {
                return ThrowMyError(
                    { G, ctx, ...rest },
                    ErrorNames.NoSuchMove,
                );
            }
            return moveMainArgs;
        }
    };

/**
 * <h3>Отрисовка для выбора активировать или нет способности Бога.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка игрового поля.</li>
 * </ol>
 *
 * @param context
 * @param validatorName Название валидатора.
 * @param data Глобальные параметры.
 * @param boardCells Ячейки для отрисовки.
 * @returns Поле для выбора активировать или нет способности Бога.
 */
export const ActivateGodAbilityOrNotProfit: ProfitFunction<ActivateGodAbilityOrNotSubMoveValidatorNames> = (
    { G, ctx, ...rest }: Context,
    validatorName: CanBeNull<ActivateGodAbilityOrNotSubMoveValidatorNames>,
    data?: BoardProps,
    boardCells?: JSX.Element[],
): CanBeVoid<MoveArguments<GodNames[]>> => {
    const player: CanBeUndef<PublicPlayer> = G.publicPlayers[ctx.currentPlayer],
        moveMainArgs: MoveArguments<GodNames[]> = [];
    if (player === undefined) {
        return ThrowMyError(
            { G, ctx, ...rest },
            ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
            ctx.currentPlayer,
        );
    }
    const stack: CanBeUndef<PlayerStack> = player.stack[0];
    if (stack === undefined) {
        return ThrowMyError(
            { G, ctx, ...rest },
            ErrorNames.FirstStackActionForPlayerWithCurrentIdIsUndefined,
            ctx.currentPlayer,
        );
    }
    const godName: CanBeUndef<GodNames> = stack.godName;
    if (godName === undefined) {
        throw new Error(`В стеке игрока отсутствует 'godName'.`);
    }
    const god: CanBeUndef<MythologicalCreatureCommandZoneCard> =
        player.mythologicalCreatureCards.find((card: MythologicalCreatureCommandZoneCard):
            boolean => card.name === godName);
    if (god === undefined) {
        throw new Error(`В массиве карт мифических существ игрока с id '${ctx.currentPlayer}' в командной зоне отсутствует карта '${CardRusNames.GodCard}' с названием '${godName}'.`);
    }
    for (let j = 0; j < 2; j++) {
        if (j === 0) {
            if (data !== undefined && boardCells !== undefined) {
                DrawCard(
                    { G, ctx, ...rest },
                    data,
                    boardCells,
                    god,
                    j,
                    null,
                    player,
                    CardMoveNames.ActivateGodAbilityMove,
                    [godName],
                );
            } else if (validatorName === ActivateGodAbilityOrNotSubMoveValidatorNames.ActivateGodAbilityMoveValidator) {
                moveMainArgs.push(godName);
            } else {
                return ThrowMyError(
                    { G, ctx, ...rest },
                    ErrorNames.NoAddedValidator,
                );
            }
        } else {
            if (data !== undefined && boardCells !== undefined) {
                DrawButton(
                    { G, ctx, ...rest },
                    data,
                    boardCells,
                    ButtonNames.NotActivateGodAbility,
                    player,
                    ButtonMoveNames.NotActivateGodAbilityMove,
                    [godName],
                );
            } else if (validatorName ===
                ActivateGodAbilityOrNotSubMoveValidatorNames.NotActivateGodAbilityMoveValidator) {
                moveMainArgs.push(godName);
            } else {
                return ThrowMyError(
                    { G, ctx, ...rest },
                    ErrorNames.NoAddedValidator,
                );
            }
        }
    }
    if (validatorName !== null) {
        if (moveMainArgs === undefined) {
            return ThrowMyError(
                { G, ctx, ...rest },
                ErrorNames.NoSuchMove,
            );
        }
        return moveMainArgs;
    }
};

/**
 * <h3>Отрисовка для выбора карты Мифического существа при выборе Skymir.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка игрового поля.</li>
 * </ol>
 *
 * @param context
 * @param validatorName Название валидатора.
 * @param data Глобальные параметры.
 * @param boardCells Ячейки для отрисовки.
 * @returns Поле для выбора карты Мифического существа при выборе Skymir.
 */
export const ChooseGetMythologyCardForSkymirProfit: ProfitFunction<TavernsResolutionMoveValidatorNames> = (
    { G, ctx, ...rest }: Context,
    validatorName: CanBeNull<TavernsResolutionMoveValidatorNames>,
    data?: BoardProps,
    boardCells?: JSX.Element[],
): CanBeVoid<MoveArguments<MythologicalCreatureDeckForSkymirCardId[]>> => {
    const moveMainArgs: MoveArguments<MythologicalCreatureDeckForSkymirCardId[]> = [];
    for (let i = 0; i < 1; i++) {
        if (G.mythologicalCreatureDeckForSkymir === null) {
            throw new Error(`Массив всех карт мифических существ для Skymir не может не быть заполнен картами.`);
        }
        for (let j = 0; j < G.mythologicalCreatureDeckForSkymir.length; j++) {
            AssertMythologicalCreatureDeckForSkymirCardId(j);
            const mythologicalCreature: CanBeUndef<MythologicalCreatureCard> =
                G.mythologicalCreatureDeckForSkymir[j];
            if (mythologicalCreature === undefined) {
                throw new Error(`В массиве карт мифических существ для Skymir отсутствует мифическое существо с id '${j}'.`);
            }
            if (ctx.activePlayers?.[ctx.currentPlayer]
                === TavernsResolutionStageNames.GetMythologyCard) {
                const player: CanBeUndef<PublicPlayer> = G.publicPlayers[ctx.currentPlayer];
                if (player === undefined) {
                    return ThrowMyError(
                        { G, ctx, ...rest },
                        ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
                        ctx.currentPlayer,
                    );
                }
                if (data !== undefined && boardCells !== undefined) {
                    DrawCard(
                        { G, ctx, ...rest },
                        data,
                        boardCells,
                        mythologicalCreature,
                        j,
                        null,
                        player,
                        CardMoveNames.GetMythologyCardMove,
                        [j],
                    );
                } else if (validatorName === TavernsResolutionMoveValidatorNames.GetMythologyCardMoveValidator) {
                    moveMainArgs.push(j);
                } else {
                    return ThrowMyError(
                        { G, ctx, ...rest },
                        ErrorNames.NoAddedValidator,
                    );
                }
            }
        }
    }
    if (validatorName !== null) {
        return moveMainArgs;
    }
};

/**
 * <h3>Отрисовка для выбора уровня сложности стратегий соло бота Андвари соло игры.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка игрового поля.</li>
 * </ol>
 *
 * @param context
 * @param validatorName Название валидатора.
 * @param data Глобальные параметры.
 * @param boardCells Ячейки для отрисовки.
 * @returns Поле для выбора уровня сложности стратегий соло бота Андвари соло игры.
 */
export const ChooseStrategyForSoloModeAndvariProfit:
    ProfitFunction<ChooseDifficultySoloModeAndvariMoveValidatorNames> = (
        { G, ctx, ...rest }: Context,
        validatorName: CanBeNull<ChooseDifficultySoloModeAndvariMoveValidatorNames>,
        data?: BoardProps,
        boardCells?: JSX.Element[],
    ): CanBeVoid<MoveArguments<SoloGameAndvariStrategyNames[]>> => {
        const moveMainArgs: MoveArguments<SoloGameAndvariStrategyNames[]> = [],
            player: CanBeUndef<PublicPlayer> = G.publicPlayers[ctx.currentPlayer];
        if (player === undefined) {
            return ThrowMyError({ G, ctx, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
                ctx.currentPlayer);
        }
        for (let j = 0; j < 4; j++) {
            if (j === 0) {
                if (data !== undefined && boardCells !== undefined) {
                    DrawButton(
                        { G, ctx, ...rest },
                        data,
                        boardCells,
                        ButtonNames.NoHeroEasyStrategy,
                        player,
                        ButtonMoveNames.ChooseStrategyForSoloModeAndvariMove,
                        [SoloGameAndvariStrategyNames.NoHeroEasyStrategy],
                    );
                } else if (validatorName ===
                    ChooseDifficultySoloModeAndvariMoveValidatorNames.ChooseStrategyForSoloModeAndvariMoveValidator) {
                    moveMainArgs.push(SoloGameAndvariStrategyNames.NoHeroEasyStrategy);
                } else {
                    return ThrowMyError(
                        { G, ctx, ...rest },
                        ErrorNames.NoAddedValidator,
                    );
                }
            } else if (j === 1) {
                if (data !== undefined && boardCells !== undefined) {
                    DrawButton(
                        { G, ctx, ...rest },
                        data,
                        boardCells,
                        ButtonNames.NoHeroHardStrategy,
                        player,
                        ButtonMoveNames.ChooseStrategyForSoloModeAndvariMove,
                        [SoloGameAndvariStrategyNames.NoHeroHardStrategy],
                    );
                } else if (validatorName ===
                    ChooseDifficultySoloModeAndvariMoveValidatorNames.ChooseStrategyForSoloModeAndvariMoveValidator) {
                    moveMainArgs.push(SoloGameAndvariStrategyNames.NoHeroHardStrategy);
                } else {
                    return ThrowMyError(
                        { G, ctx, ...rest },
                        ErrorNames.NoAddedValidator,
                    );
                }
            } else if (j === 2) {
                if (data !== undefined && boardCells !== undefined) {
                    DrawButton(
                        { G, ctx, ...rest },
                        data,
                        boardCells,
                        ButtonNames.WithHeroEasyStrategy,
                        player,
                        ButtonMoveNames.ChooseStrategyForSoloModeAndvariMove,
                        [SoloGameAndvariStrategyNames.WithHeroEasyStrategy],
                    );
                } else if (validatorName ===
                    ChooseDifficultySoloModeAndvariMoveValidatorNames.ChooseStrategyForSoloModeAndvariMoveValidator) {
                    moveMainArgs.push(SoloGameAndvariStrategyNames.WithHeroEasyStrategy);
                } else {
                    return ThrowMyError(
                        { G, ctx, ...rest },
                        ErrorNames.NoAddedValidator,
                    );
                }
            } else if (j === 3) {
                if (data !== undefined && boardCells !== undefined) {
                    DrawButton(
                        { G, ctx, ...rest },
                        data,
                        boardCells,
                        ButtonNames.WithHeroHardStrategy,
                        player,
                        ButtonMoveNames.ChooseStrategyForSoloModeAndvariMove,
                        [SoloGameAndvariStrategyNames.WithHeroHardStrategy],
                    );
                } else if (validatorName ===
                    ChooseDifficultySoloModeAndvariMoveValidatorNames.ChooseStrategyForSoloModeAndvariMoveValidator) {
                    moveMainArgs.push(SoloGameAndvariStrategyNames.WithHeroHardStrategy);
                } else {
                    return ThrowMyError(
                        { G, ctx, ...rest },
                        ErrorNames.NoAddedValidator,
                    );
                }
            }
        }
        if (validatorName !== null) {
            return moveMainArgs;
        }
    };

/**
 * <h3>Отрисовка для выбора варианта уровня сложности стратегий соло бота Андвари соло игры.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка игрового поля.</li>
 * </ol>
 *
 * @param context
 * @param validatorName Название валидатора.
 * @param data Глобальные параметры.
 * @param boardCells Ячейки для отрисовки.
 * @returns Поле для выбора варианта уровня сложности стратегий соло бота Андвари соло игры.
 */
export const ChooseStrategyVariantForSoloModeAndvariProfit:
    ProfitFunction<ChooseDifficultySoloModeAndvariMoveValidatorNames> = (
        { G, ctx, ...rest }: Context,
        validatorName: CanBeNull<ChooseDifficultySoloModeAndvariMoveValidatorNames>,
        data?: BoardProps,
        boardCells?: JSX.Element[],
    ): CanBeVoid<MoveArguments<SoloGameAndvariStrategyVariantLevel[]>> => {
        const moveMainArgs: MoveArguments<SoloGameAndvariStrategyVariantLevel[]> = [],
            player: CanBeUndef<PublicPlayer> = G.publicPlayers[ctx.currentPlayer];
        if (player === undefined) {
            return ThrowMyError(
                { G, ctx, ...rest },
                ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
                ctx.currentPlayer,
            );
        }
        for (let j = 0; j < 3; j++) {
            const level: number = j + 1;
            AssertSoloGameAndvariStrategyVariantLevel(level);
            if (data !== undefined && boardCells !== undefined) {
                DrawButton(
                    { G, ctx, ...rest },
                    data,
                    boardCells,
                    String(level),
                    player,
                    ButtonMoveNames.ChooseStrategyVariantForSoloModeAndvariMove,
                    [level],
                );
            } else if (validatorName ===
                ChooseDifficultySoloModeAndvariMoveValidatorNames.ChooseStrategyVariantForSoloModeAndvariMoveValidator) {
                moveMainArgs.push(level);
            } else {
                return ThrowMyError(
                    { G, ctx, ...rest },
                    ErrorNames.NoAddedValidator,
                );
            }
        }
        if (validatorName !== null) {
            return moveMainArgs;
        }
    };

/**
 * <h3>Отрисовка для выбора уровня сложности соло игры.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка игрового поля.</li>
 * </ol>
 *
 * @param context
 * @param validatorName Название валидатора.
 * @param data Глобальные параметры.
 * @param boardCells Ячейки для отрисовки.
 * @returns Поле для выбора уровня сложности соло игры.
 */
export const ChooseDifficultyLevelForSoloModeProfit: ProfitFunction<ChooseDifficultySoloModeMoveValidatorNames> = (
    { G, ctx, ...rest }: Context,
    validatorName: CanBeNull<ChooseDifficultySoloModeMoveValidatorNames>,
    data?: BoardProps,
    boardCells?: JSX.Element[],
): CanBeVoid<MoveArguments<SoloGameDifficultyLevelArg[]>> => {
    const moveMainArgs: MoveArguments<SoloGameDifficultyLevelArg[]> = [],
        player: CanBeUndef<PublicPlayer> = G.publicPlayers[ctx.currentPlayer];
    if (player === undefined) {
        return ThrowMyError(
            { G, ctx, ...rest },
            ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
            ctx.currentPlayer,
        );
    }
    for (let i = 0; i < 1; i++) {
        for (let j = 0; j < 6; j++) {
            const level: number = j + 1;
            AssertSoloGameDifficultyLevelArg(level);
            if (data !== undefined && boardCells !== undefined) {
                DrawButton(
                    { G, ctx, ...rest },
                    data,
                    boardCells,
                    String(level),
                    player,
                    ButtonMoveNames.ChooseDifficultyLevelForSoloModeMove,
                    [level],
                );
            } else if (validatorName ===
                ChooseDifficultySoloModeMoveValidatorNames.ChooseDifficultyLevelForSoloModeMoveValidator) {
                moveMainArgs.push(level);
            } else {
                return ThrowMyError(
                    { G, ctx, ...rest },
                    ErrorNames.NoAddedValidator,
                );
            }
        }
    }
    if (validatorName !== null) {
        return moveMainArgs;
    }
};

/**
 * <h3>Отрисовка поля для выбора значения улучшения монеты по артефакту 'Vidofnir Vedrfolnir'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка игрового поля.</li>
 * </ol>
 *
 * @param context
 * @param validatorName Название валидатора.
 * @param data Глобальные параметры.
 * @param boardCells Ячейки для отрисовки.
 * @returns Игровое поле для отрисовки выбора значения улучшения монеты по артефакту 'Vidofnir Vedrfolnir'.
 */
export const ChooseCoinValueForVidofnirVedrfolnirUpgradeProfit: ProfitFunction<CommonMoveValidatorNames> = (
    { G, ctx, ...rest }: Context,
    validatorName: CanBeNull<CommonMoveValidatorNames>,
    data?: BoardProps,
    boardCells?: JSX.Element[],
): CanBeVoid<MoveArguments<BasicVidofnirVedrfolnirUpgradeValue[]>> => {
    const moveMainArgs: MoveArguments<BasicVidofnirVedrfolnirUpgradeValue[]> = [],
        player: CanBeUndef<PublicPlayer> = G.publicPlayers[ctx.currentPlayer];
    if (player === undefined) {
        return ThrowMyError(
            { G, ctx, ...rest },
            ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
            ctx.currentPlayer,
        );
    }
    const stack: CanBeUndef<PlayerStack> = player.stack[0];
    if (stack === undefined) {
        return ThrowMyError(
            { G, ctx, ...rest },
            ErrorNames.FirstStackActionForPlayerWithCurrentIdIsUndefined,
            ctx.currentPlayer,
        );
    }
    const values: CanBeUndef<VidofnirVedrfolnirUpgradeValue> = stack.valueArray;
    if (values === undefined) {
        throw new Error(`У конфига действия игрока с id '${ctx.currentPlayer}' отсутствует обязательный параметр 'valueArray'.`);
    }
    for (let j = 0; j < values.length; j++) {
        const value: CanBeUndef<BasicVidofnirVedrfolnirUpgradeValue> = values[j];
        if (value === undefined) {
            throw new Error(`У конфига действия игрока с id '${ctx.currentPlayer}' в параметре 'valueArray' отсутствует значение параметра  id '${j}'.`);
        }
        if (data !== undefined && boardCells !== undefined) {
            DrawButton(
                { G, ctx, ...rest },
                data,
                boardCells,
                String(value),
                player,
                ButtonMoveNames.ChooseCoinValueForVidofnirVedrfolnirUpgradeMove,
                [value],
            );
        } else if (validatorName ===
            CommonMoveValidatorNames.ChooseCoinValueForVidofnirVedrfolnirUpgradeMoveValidator) {
            moveMainArgs.push(value);
        } else {
            return ThrowMyError(
                { G, ctx, ...rest },
                ErrorNames.NoAddedValidator,
            );
        }
    }
    if (validatorName !== null) {
        return moveMainArgs;
    }
};

/**
 * <h3>Отрисовка поля для получения профита по фракции разведчиков.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка игрового поля.</li>
 * </ol>
 *
 * @param context
 * @param validatorName Название валидатора.
 * @param data Глобальные параметры.
 * @param boardCells Ячейки для отрисовки.
 * @returns Игровое поле для отрисовки получения профита по фракции разведчиков.
 */
export const ExplorerDistinctionProfit: ProfitFunction<TroopEvaluationMoveValidatorNames> = (
    { G, ctx, ...rest }: Context,
    validatorName: CanBeNull<TroopEvaluationMoveValidatorNames>,
    data?: BoardProps,
    boardCells?: JSX.Element[],
): CanBeVoid<MoveArguments<ExplorerDistinctionCardId[]>> => {
    if (G.explorerDistinctionCards === null) {
        throw new Error(`В массиве карт для получения преимущества по фракции '${SuitRusNames.explorer}' не может не быть карт.`);
    }
    const moveMainArgs: MoveArguments<ExplorerDistinctionCardId[]> = [];
    for (let j = 0; j < G.explorerDistinctionCards.length; j++) {
        AssertExplorerDistinctionCardId(j);
        const card: CanBeUndef<DwarfDeckCard> = G.explorerDistinctionCards[j];
        if (card === undefined) {
            throw new Error(`В массиве карт '2' эпохи отсутствует карта с id '${j}'.`);
        }
        let suit: CanBeNull<SuitNames> = null;
        if (card.type === CardRusNames.DwarfCard) {
            suit = card.playerSuit;
        }
        const player: CanBeUndef<PublicPlayer> = G.publicPlayers[ctx.currentPlayer];
        if (player === undefined) {
            return ThrowMyError({ G, ctx, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
                ctx.currentPlayer);
        }
        if (data !== undefined && boardCells !== undefined) {
            const stage: CanBeUndef<ActiveStageNames> = ctx.activePlayers?.[ctx.currentPlayer];
            let moveName: CardMoveNames;
            switch (stage) {
                case TroopEvaluationStageNames.ClickCardToPickDistinction:
                    moveName = CardMoveNames.ClickCardToPickDistinctionMove;
                    break;
                case TroopEvaluationStageNames.SoloBotClickCardToPickDistinction:
                    moveName = CardMoveNames.SoloBotClickCardToPickDistinctionMove;
                    break;
                case TroopEvaluationStageNames.SoloBotAndvariClickCardToPickDistinction:
                    moveName = CardMoveNames.SoloBotAndvariClickCardToPickDistinctionMove;
                    break;
                default:
                    return ThrowMyError(
                        { G, ctx, ...rest },
                        ErrorNames.NoSuchMove,
                    );
            }
            DrawCard(
                { G, ctx, ...rest },
                data,
                boardCells,
                card,
                j,
                suit,
                player,
                moveName,
                [j],
            );
        } else if (validatorName === TroopEvaluationMoveValidatorNames.ClickCardToPickDistinctionMoveValidator
            || TroopEvaluationMoveValidatorNames.SoloBotClickCardToPickDistinctionMoveValidator
            || TroopEvaluationMoveValidatorNames.SoloBotAndvariClickCardToPickDistinctionMoveValidator) {
            moveMainArgs.push(j);
        } else {
            return ThrowMyError(
                { G, ctx, ...rest },
                ErrorNames.NoAddedValidator,
            );
        }
    }
    if (validatorName !== null) {
        return moveMainArgs;
    }
};

/**
 * <h3>Отрисовка всех героев для выбора сложности соло игры.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка игрового поля.</li>
 * </ol>
 *
 * @param context
 * @param validatorName Название валидатора.
 * @param data Глобальные параметры.
 * @param boardCells Ячейки для отрисовки.
 * @returns Поле героев для выбора сложности соло игры.
 */
export const PickHeroesForSoloModeProfit: ProfitFunction<ChooseDifficultySoloModeMoveValidatorNames> = (
    { G, ctx, ...rest }: Context,
    validatorName: CanBeNull<ChooseDifficultySoloModeMoveValidatorNames>,
    data?: BoardProps,
    boardCells?: JSX.Element[],
): CanBeVoid<MoveArguments<AllHeroesForDifficultySoloModePossibleCardId[]>> => {
    const moveMainArgs: MoveArguments<AllHeroesForDifficultySoloModePossibleCardId[]> = [];
    for (let i = 0; i < 1; i++) {
        if (G.heroesForSoloGameDifficultyLevel === null) {
            throw new Error(`Уровень сложности для соло игры не может быть ранее выбран.`);
        }
        for (let j = 0; j < G.heroesForSoloGameDifficultyLevel.length; j++) {
            AssertAllHeroesForDifficultySoloModePossibleCardId(j);
            const hero: CanBeUndef<HeroCard> = G.heroesForSoloGameDifficultyLevel[j];
            if (hero === undefined) {
                throw new Error(`В массиве карт героев для выбора сложности соло игры отсутствует герой с id '${j}'.`);
            }
            if (hero.active && ctx.currentPlayer === PlayerIdForSoloGameNames.HumanPlayerId
                && ctx.activePlayers?.[ctx.currentPlayer]
                === ChooseDifficultySoloModeStageNames.ChooseHeroForDifficultySoloMode) {
                const player: CanBeUndef<PublicPlayer> = G.publicPlayers[ctx.currentPlayer];
                if (player === undefined) {
                    return ThrowMyError(
                        { G, ctx, ...rest },
                        ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
                        ctx.currentPlayer,
                    );
                }
                if (data !== undefined && boardCells !== undefined) {
                    DrawCard(
                        { G, ctx, ...rest },
                        data,
                        boardCells,
                        hero,
                        j,
                        null,
                        player,
                        CardMoveNames.ChooseHeroForDifficultySoloModeMove,
                        [j],
                    );
                } else if (validatorName ===
                    ChooseDifficultySoloModeMoveValidatorNames.ChooseHeroForDifficultySoloModeMoveValidator) {
                    if (hero.active) {
                        moveMainArgs.push(j);
                    }
                } else {
                    return ThrowMyError(
                        { G, ctx, ...rest },
                        ErrorNames.NoAddedValidator,
                    );
                }
            }
        }
    }
    if (validatorName !== null) {
        return moveMainArgs;
    }
};

/**
 * <h3>Отрисовка поля для старта фазы 'enlistmentMercenaries'.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Отрисовка игрового поля.</li>
 * </ol>
 *
 * @param context
 * @param validatorName Название валидатора.
 * @param data Глобальные параметры.
 * @param boardCells Ячейки для отрисовки.
 * @returns Игровое поле для отрисовки старта фазы 'enlistmentMercenaries'.
 */
export const StartOrPassEnlistmentMercenariesProfit: ProfitFunction<EnlistmentMercenariesMoveValidatorNames> = (
    { G, ctx, ...rest }: Context,
    validatorName: CanBeNull<EnlistmentMercenariesMoveValidatorNames>,
    data?: BoardProps,
    boardCells?: JSX.Element[],
): CanBeVoid<MoveArguments<null>> => {
    let moveMainArgs: CanBeUndef<MoveArguments<null>>;
    const player: CanBeUndef<PublicPlayer> = G.publicPlayers[ctx.currentPlayer];
    if (player === undefined) {
        return ThrowMyError(
            { G, ctx, ...rest },
            ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
            ctx.currentPlayer,
        );
    }
    for (let j = 0; j < 2; j++) {
        if (j === 0) {
            if (data !== undefined && boardCells !== undefined) {
                DrawButton(
                    { G, ctx, ...rest },
                    data,
                    boardCells,
                    ButtonNames.Start,
                    player,
                    ButtonMoveNames.StartEnlistmentMercenariesMove,
                    [null],
                );
            } else if (validatorName ===
                EnlistmentMercenariesMoveValidatorNames.StartEnlistmentMercenariesMoveValidator) {
                moveMainArgs = null;
            } else {
                return ThrowMyError(
                    { G, ctx, ...rest },
                    ErrorNames.NoAddedValidator,
                );
            }
        } else if (G.publicPlayersOrder.length > 1) {
            if (data !== undefined && boardCells !== undefined) {
                DrawButton(
                    { G, ctx, ...rest },
                    data,
                    boardCells,
                    ButtonNames.Pass,
                    player,
                    ButtonMoveNames.PassEnlistmentMercenariesMove,
                    [null],
                );
            } else if (validatorName ===
                EnlistmentMercenariesMoveValidatorNames.PassEnlistmentMercenariesMoveValidator) {
                moveMainArgs = null;
            } else {
                return ThrowMyError(
                    { G, ctx, ...rest },
                    ErrorNames.NoAddedValidator,
                );
            }
        }
    }
    if (validatorName !== null) {
        return moveMainArgs;
    }
};
