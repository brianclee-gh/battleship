import Player from './player';
import Gameboard from './gameboard';
import gameView from '../views/gameView';
import Placement from '../helpers/placement';

const Game = () => {

    let gameActive = true;

    const player1 = Player('Brian')
    const computer = Player("Computer");

    const player1Board = Gameboard();
    const computerBoard = Gameboard();

    const placement = Placement(player1, player1Board);

    const startGame = document.getElementById('startBtn')

    startGame.addEventListener('click', e => { console.log('ready to start!') })

    const isGameOver = () => {
        //check if either player or computer gameBoards are all sunk

        if ( player1Board.allShipsSunk() || computerBoard.allShipsSunk() ) {
            gameActive = false;
            return true;
        }

        return false;
    };

    const initialize = () => {
        renderPlayerBoard();
        gameView.renderShipSelector(player1.getRoster());
        addBoardListeners();
        placement.placementActive();
    };

    const renderPlayerBoard = () => {
        const playerGrid = document.querySelector('.player-grid');
        const computerGrid = document.querySelector('.computer-grid');
        gameView.renderGrid(playerGrid, player1Board);
        gameView.renderGrid(computerGrid, computerBoard);
    }

    const addBoardListeners = () => {
        // const playerGrid = document.querySelector('.player-grid');
        // playerGrid.addEventListener('click', handleGridClick);

        const computerGrid = document.querySelector('.computer-grid');
        computerGrid.addEventListener('click', handleGridClick);
    }

    const handleGridClick = (e) => {
        const targetCell = e.target;

        if (targetCell.classList.contains('grid-cell')) {
            const y = targetCell.dataset.y;
            const x = targetCell.dataset.x;

            console.log([y, x])
        }
    }
    

    const updateDisplay = () => {
        const message = document.getElementById('message')
    }

    const resetGame = () => {
        player1.resetRoster();
        computer.resetRoster();
        player1Board.resetBoard();
        computerBoard.resetBoard();
    }

    return {
        initialize,
        resetGame,
    }
}

export default Game;