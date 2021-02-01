import gameView from '../views/gameView';

const Placement = (player, gameboard) => {

    let currentShip = {};

    const placementActive = () => {

        const shipSelector = document.getElementById('ship-selector');
        shipSelector.addEventListener('click', (e) => {

            if (e.target.dataset.ship) {

                const fleet = player.getRoster();
                const ship = fleet[e.target.dataset.ship];

                currentShip = ship;

            }
        });

        placementHighlight();
        playerShipPlacement();
    };

    const placementHighlight = () => {
        const playerGrid = document.querySelector('.player-grid');
        playerGrid.addEventListener('mouseover', (e) => {
            if (currentShip.length > 0 && e.target.classList.contains('grid-cell')) {

            }
        });
    }

    const playerShipPlacement = () => {
        const playerGrid = document.querySelector('.player-grid');
        playerGrid.addEventListener('click', (e) => {
            const targetCell = e.target;

            if (Object.keys(currentShip).length === 0 && currentShip.constructor === Object) {
                return
            }

            if (targetCell.classList.contains('grid-cell')) {
                const y = parseInt(targetCell.dataset.y);
                const x = parseInt(targetCell.dataset.x);

                const validShip = gameboard.placeShip(y, x, currentShip);

                if (validShip) {
                    currentShip = {};
                    gameView.renderGrid(playerGrid, gameboard);
                }

            };

            if (gameboard.allShipsPlaced()) {
                hidePlacement();
            }

        });

    };

    const hidePlacement = () => {
        const shipSelector = document.getElementById('ship-selector');
        const startBtn = document.getElementById('startBtn');
        const autoplaceBtn = document.getElementById('autoplaceBtn')

        shipSelector.classList.toggle('hidden');
        startBtn.classList.toggle('hidden');
        autoplaceBtn.classList.toggle('hidden');
    }


    return {
        placementActive,
        hidePlacement,
    }

}


export default Placement;