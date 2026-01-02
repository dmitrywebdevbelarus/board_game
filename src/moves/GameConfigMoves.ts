import { ThrowMyError } from "../Error";
import { IsValidMove } from "../MoveValidator";
import { AllStackData } from "../data/StackData";
import { AddHeroForDifficultyToSoloBotCards } from "../helpers/HeroCardHelpers";
import { AddActionsToStack } from "../helpers/StackHelpers";
import { AssertAllHeroesForDifficultySoloModePossibleCardId, AssertSoloGameAndvariStrategyVariantLevel, AssertSoloGameDifficultyLevelArg } from "../is_helpers/AssertionTypeHelpers";
import { ButtonMoveNames, CardMoveNames, ChooseDifficultySoloModeAndvariDefaultStageNames, ChooseDifficultySoloModeDefaultStageNames, ChooseDifficultySoloModeStageNames, ErrorNames, InvalidMoveNames, SoloGameAndvariStrategyNames } from "../typescript/enums";
import type { AllHeroesForDifficultySoloModePossibleCardId, CanBeUndef, CanBeVoid, GetMoveArgument, HeroCard, InvalidMove, MoveContext, MoveFn, PublicPlayer, SoloGameAndvariStrategyVariantLevel, SoloGameDifficultyLevelArg } from "../typescript/interfaces";

// TODO level: SoloGameAndvariStrategyNames => string and asserts it value if no other strings can be valid in moves!?
/**
 * <h3>Выбор уровня сложности в режиме соло игры.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Когда игрок выбирает уровень сложности в режиме соло игры.</li>
 * </ol>
 *
 * @param context
 * @param level Уровень сложности в режиме соло игры.
 * @returns
 */
export const ChooseStrategyForSoloModeAndvariMove:
    MoveFn<GetMoveArgument<ButtonMoveNames.ChooseStrategyForSoloModeAndvariMove>> = (
        { G, playerID, ...rest }: MoveContext,
        level: SoloGameAndvariStrategyNames,
    ): CanBeVoid<InvalidMove> => {
        const isValidMove: boolean = IsValidMove(
            { G, playerID, ...rest },
            ChooseDifficultySoloModeAndvariDefaultStageNames.ChooseStrategyForSoloModeAndvari,
            ButtonMoveNames.ChooseStrategyForSoloModeAndvariMove,
            level,
        );
        if (!isValidMove) {
            return InvalidMoveNames.INVALID_MOVE;
        }
        G.soloGameAndvariStrategyLevel = level;
    };

// TODO level: SoloGameAndvariStrategyVariantLevelType => string and asserts it value if no other strings can be valid in moves!?
/**
 * <h3>Выбор варианта уровня сложности в режиме соло игры.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Когда игрок выбирает вариант уровня сложности в режиме соло игры.</li>
 * </ol>
 *
 * @param context
 * @param level Вариант уровня сложности в режиме соло игры.
 * @returns
 */
export const ChooseStrategyVariantForSoloModeAndvariMove:
    MoveFn<GetMoveArgument<ButtonMoveNames.ChooseStrategyVariantForSoloModeAndvariMove>> = (
        { G, playerID, ...rest }: MoveContext,
        level: SoloGameAndvariStrategyVariantLevel,
    ): CanBeVoid<InvalidMove> => {
        AssertSoloGameAndvariStrategyVariantLevel(level);
        const isValidMove: boolean = IsValidMove(
            { G, playerID, ...rest },
            ChooseDifficultySoloModeAndvariDefaultStageNames.ChooseStrategyVariantForSoloModeAndvari,
            ButtonMoveNames.ChooseStrategyVariantForSoloModeAndvariMove,
            level,
        );
        if (!isValidMove) {
            return InvalidMoveNames.INVALID_MOVE;
        }
        G.soloGameAndvariStrategyVariantLevel = level;
        AddActionsToStack(
            { G, ...rest },
            playerID,
            [AllStackData.chooseStrategyLevelForSoloModeAndvari()],
        );
    };

// TODO level: SoloGameDifficultyLevelArgType => string and asserts it value if no other strings can be valid in moves!?
/**
 * <h3>Выбор уровня сложности в режиме соло игры.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Когда игрок выбирает уровень сложности в режиме соло игры.</li>
 * </ol>
 *
 * @param context
 * @param level Уровень сложности в режиме соло игры.
 * @returns
 */
export const ChooseDifficultyLevelForSoloModeMove:
    MoveFn<GetMoveArgument<ButtonMoveNames.ChooseDifficultyLevelForSoloModeMove>> = (
        { G, playerID, ...rest }: MoveContext,
        level: SoloGameDifficultyLevelArg,
    ): CanBeVoid<InvalidMove> => {
        AssertSoloGameDifficultyLevelArg(level);
        const isValidMove: boolean = IsValidMove(
            { G, playerID, ...rest },
            ChooseDifficultySoloModeDefaultStageNames.ChooseDifficultyLevelForSoloMode,
            ButtonMoveNames.ChooseDifficultyLevelForSoloModeMove,
            level,
        );
        if (!isValidMove) {
            return InvalidMoveNames.INVALID_MOVE;
        }
        G.soloGameDifficultyLevel = level;
        AddActionsToStack(
            { G, ...rest },
            playerID,
            [AllStackData.getHeroesForSoloMode()],
        );
    };

/**
 * <h3>Выбор героя для выбранного уровня сложности в режиме соло игры.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Когда игрок выбирает героя для выбранного уровня сложности в режиме соло игры.</li>
 * </ol>
 *
 * @param context
 * @param heroId Id героя.
 * @returns
 */
export const ChooseHeroForDifficultySoloModeMove:
    MoveFn<GetMoveArgument<CardMoveNames.ChooseHeroForDifficultySoloModeMove>> = (
        { G, playerID, ...rest }: MoveContext,
        heroId: AllHeroesForDifficultySoloModePossibleCardId,
    ): CanBeVoid<InvalidMove> => {
        AssertAllHeroesForDifficultySoloModePossibleCardId(heroId);
        const isValidMove: boolean = IsValidMove(
            { G, playerID, ...rest },
            ChooseDifficultySoloModeStageNames.ChooseHeroForDifficultySoloMode,
            CardMoveNames.ChooseHeroForDifficultySoloModeMove,
            heroId,
        );
        if (!isValidMove) {
            return InvalidMoveNames.INVALID_MOVE;
        }
        const player: CanBeUndef<PublicPlayer> = G.publicPlayers[playerID];
        if (player === undefined) {
            return ThrowMyError(
                { G, ...rest },
                ErrorNames.PublicPlayerWithCurrentIdIsUndefined,
                playerID,
            );
        }
        if (G.heroesForSoloGameDifficultyLevel === null) {
            throw new Error(`Уровень сложности для соло игры не может быть ранее выбран.`);
        }
        const hero: CanBeUndef<HeroCard> = G.heroesForSoloGameDifficultyLevel.splice(heroId, 1)[0];
        if (hero === undefined) {
            throw new Error(`Не существует выбранная карта героя с id '${heroId}'.`);
        }
        AddHeroForDifficultyToSoloBotCards(
            { G, ...rest },
            hero,
        );
        if (G.soloGameDifficultyLevel === null || G.soloGameDifficultyLevel === 0) {
            throw new Error(`Не может не быть возможности выбора героя для выбранного уровня сложности в режиме соло игры.`);
        }
        G.soloGameDifficultyLevel--;
        if (G.soloGameDifficultyLevel) {
            AddActionsToStack(
                { G, ...rest },
                playerID,
                [AllStackData.getHeroesForSoloMode()],
            );
        }
    };
