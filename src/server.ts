import { Origins, Server } from 'boardgame.io/server';
import { BoardGame } from './Game';
import { Game } from 'boardgame.io';
import { MyGameState } from './typescript/interfaces';
// import { Server } from './typescript/Server';

/**
 * <h3>Сервер игры.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При использовании мультиплеера.</li>
 * </ol>
 */
const server = Server({
    games: [BoardGame as unknown as Game<MyGameState, Record<string, unknown>, unknown>],
    origins: [Origins.LOCALHOST],
});

server.run(8000);
