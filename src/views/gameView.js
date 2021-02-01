

const gameView = (() => {

    const renderSquare = (y, x, currentStatus) => 
        `<div data-y='${y}' data-x='${x}' class="grid-cell grid-cell-${y}-${x} ${currentStatus}" ></div>`;

    const clearGrid = (parent) => {
        parent.textContent = '';
    }

    const renderGrid = (parent, gameboard) => {
        clearGrid(parent);
        const board = gameboard.getBoard();
        const length = board.length;
        let grid = '';

        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length; j++) {
                let currentCell = board[i][j];
                if (currentCell === null) {
                    currentCell = '';
                } else if (currentCell.ship) {
                    currentCell = currentCell.ship.name;
                } 

                grid += renderSquare(i, j, currentCell);
            }
        }
        parent.insertAdjacentHTML('afterbegin', grid)
    };

    const renderShipSelector = (shipList) => {

        const shipSelector = document.getElementById('ship-selector');

        for (const ship in shipList) {
            const container = document.createElement('div');
            container.classList.add('ship-selector', `${shipList[ship].name}-selector`);
            container.dataset.ship = `${shipList[ship].name}`;
            container.innerText = `${shipList[ship].name.split('_').join(' ').toUpperCase()}`
            // let divs = '';
            // for (let i = 0; i < shipList[ship].length; i++) {
            //     divs += `<div class=${shipList[ship].name} data-index='${i}'></div>`;
            // }
            // container.insertAdjacentHTML('afterbegin', divs)
            
            shipSelector.append(container);
            
        }


    };

    return {
        renderGrid,
        renderShipSelector,
    }

})();

export default gameView;