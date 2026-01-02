import { ThrowMyError } from "../Error";
import { CreateHeroPlayerCard } from "../Hero";
import { AddDataToLog } from "../Logging";
import { CardRusNames, ErrorNames, GameModeNames, LogNames, PlayerIdForSoloGameNames, ValkyryBuffNames } from "../typescript/enums";
import { AddBuffToPlayer } from "./BuffHelpers";
import { CheckValkyryRequirement } from "./MythologicalCreatureHelpers";
/**
 * <h3>Добавляет героя в массив карт игрока.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при добавлении героя.</li>
 * </ol>
 *
 * @param context
 * @param hero Герой.
 * @returns
 */
const CreateHeroPlayerCardIfAvailableFromHeroCardData = (hero) => {
    if (hero.playerSuit !== null && hero.rank !== null) {
        return CreateHeroPlayerCard({
            description: hero.description,
            name: hero.name,
            points: hero.points,
            rank: hero.rank,
            suit: hero.playerSuit,
            type: CardRusNames.HeroPlayerCard,
        });
    }
    return hero;
};
/**
 * <h3>Добавляет карту героя в массив карт героев игрока или соло бота.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>Происходит при добавлении карты героя игрока.</li>
 * <li>Происходит при добавлении карты героя соло бота.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param hero Карта героя.
 * @returns
 */
const AddHeroCardToPlayerHeroCards = ({ G, ctx, ...rest }, playerID, hero) => {
    const player = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError({ G, ctx, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
    }
    if (!hero.active) {
        throw new Error(`Не удалось добавить героя '${hero.name}' из-за того, что он был уже выбран ${(G.mode === GameModeNames.Solo || G.mode === GameModeNames.SoloAndvari) && ctx.currentPlayer === PlayerIdForSoloGameNames.SoloBotPlayerId ? `соло ботом` : `каким-то игроком`}.`);
    }
    hero.active = false;
    player.heroes.push(hero);
    if (G.expansions.Idavoll.active) {
        // TODO Add Odin ability not trigger this!!!!!!
        CheckValkyryRequirement({ G, ctx, ...rest }, playerID, ValkyryBuffNames.CountPickedHeroAmount);
    }
    AddDataToLog({ G, ctx, ...rest }, LogNames.Public, `${(G.mode === GameModeNames.Solo || G.mode === GameModeNames.SoloAndvari) && ctx.currentPlayer === PlayerIdForSoloGameNames.SoloBotPlayerId ? `Соло бот` : `Игрок '${player.nickname}'`} выбрал героя '${hero.name}'.`);
};
/**
 * <h3>Действия, связанные с добавлением карты героя в массив карт игрока.</li>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе карты героя, добавляющейся в массив карт игрока.</li>
 * </ol>
 *
 * @param context
 * @param playerID ID требуемого игрока.
 * @param hero Карта героя.
 * @returns Карта героя | карта героя на пол игрока.
 */
export const AddHeroToPlayerCards = ({ ...rest }, playerID, hero) => {
    AddHeroCardToPlayerHeroCards({ ...rest }, playerID, hero);
    AddBuffToPlayer({ ...rest }, playerID, hero.buff);
    return CreateHeroPlayerCardIfAvailableFromHeroCardData(hero);
};
/**
 * <h3>Действия, связанные с добавлением героев в массив карт соло бота.</li>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе конкретных героев, добавляющихся в массив карт соло бота.</li>
 * </ol>
 *
 * @param context
 * @param hero Карта героя.
 * @returns
 */
export const AddHeroForDifficultyToSoloBotCards = ({ G, ...rest }, hero) => {
    // TODO Do i need here playerID?
    const soloBotPublicPlayer = G.publicPlayers[PlayerIdForSoloGameNames.SoloBotPlayerId], player = G.publicPlayers[PlayerIdForSoloGameNames.HumanPlayerId];
    if (player === undefined) {
        return ThrowMyError({ G, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, PlayerIdForSoloGameNames.HumanPlayerId);
    }
    if (soloBotPublicPlayer === undefined) {
        return ThrowMyError({ G, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, PlayerIdForSoloGameNames.SoloBotPlayerId);
    }
    if (!hero.active) {
        throw new Error(`Не удалось добавить героя '${hero.name}' из-за того, что он был уже выбран каким-то игроком.`);
    }
    hero.active = false;
    soloBotPublicPlayer.heroes.push(hero);
    AddDataToLog({ G, ...rest }, LogNames.Public, `Игрок '${player.nickname}' выбрал героя '${hero.name}' для соло бота.`);
};
//# sourceMappingURL=HeroCardHelpers.js.map