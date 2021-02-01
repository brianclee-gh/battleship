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

    const winner = '';

    const isGameOver = () => {
        //check if either player or computer gameBoards are all sunk

        if ( player1Board.allShipsSunk() || computerBoard.allShipsSunk() ) {
            gameActive = false;
            return true;
        }

        return false;
    };

    const initialize = () => {
        renderGrids();
        gameView.renderShipSelector(player1.getRoster());
        addBoardListeners();
        placement.placementActive();
    };

    const renderGrids = () => {
        const playerGrid = document.querySelector('.player-grid');
        const computerGrid = document.querySelector('.computer-grid');
        gameView.renderGrid(playerGrid, player1Board);
        gameView.renderGrid(computerGrid, computerBoard);
    }

    const addBoardListeners = () => {
        const startBtn = document.getElementById('startBtn');
        startBtn.addEventListener('click', startGame);

        const autoplaceBtn = document.getElementById('autoplaceBtn');
        autoplaceBtn.addEventListener('click', playerAutoplace);
    }

    const playerAutoplace = () => {
        player1Board.autoPlaceRoster(player1.getRoster());
        console.log(player1Board);
        const playerGrid = document.querySelector('.player-grid');
        gameView.renderGrid(playerGrid, player1Board);
        placement.hidePlacement();
    }

    const startGame = () => {
        const computerGrid = document.querySelector('.computer-grid');

        computerBoard.autoPlaceRoster(computer.getRoster());
        gameView.renderGrid(computerGrid, computerBoard);
        computerGrid.addEventListener('click', handleGridClick);
    }

    const handleGridClick = (e) => {
        const targetCell = e.target;

        if (targetCell.classList.contains('grid-cell')) {
            const y = parseInt(targetCell.dataset.y);
            const x = parseInt(targetCell.dataset.x);

            const boardCell = computerBoard.getBoard()[y][x]

            if (boardCell !== 'hit' || boardCell !== 'miss') {
                computerBoard.receiveAttack(y, x);
                // computer take shot
                renderGrids();
            }

            console.log(computerBoard.allShipsSunk())

            if (player1Board.allShipsSunk() || computerBoard.allShipsSunk()) {
                let winner = '';
                if (player1Board.allShipsSunk()) {
                    winner = 'computer';
                } else {
                    winner = 'player'
                }
                gameView.renderWinner(winner);

            }

            //remove gamelisteners 
            //play again button?



        }
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