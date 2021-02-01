import Gameboard from './gameboard';
import shipList from '../data/shipList';
import Ship from './ship';

function player(name) {

    const playerBoard = Gameboard();
    let grid = playerBoard.grid;
    let playerShips = shipList;
    const currentShip = {};
    let orientation = 'horizontal';

    function placeShips() {

        // testBoard();
        placeBoardSelectors();
        placeShipListeners();
        orientationListener();
        
    };


    function orientationListener() {
        const orientationBtn = document.getElementById('orientationBtn')
        orientationBtn.addEventListener('click', e => {
            orientation = (orientation == 'horizontal' || orientation == 'Horizontal') ? 'vertical' : 'horizontal';
            orientationBtn.innerHTML = orientation[0].toUpperCase() + orientation.slice(1).toLowerCase();
        })
    }

    function placeBoardSelectors(shipName) {
        const tds = document.querySelectorAll("#table-player td");

        for (let i = 0; i < tds.length; i++) {
            tds[i].addEventListener('mouseenter', (e) => {
                resetBoxes('red');
                highlightShip(currentShip.name, e.target.id) //currentShip is an object
            })

            tds[i].addEventListener('click', (e) => {
                if (currentShip.name == "" || Object.keys(currentShip).length === 0) {
                    console.log('select a ship')
                    return
                }

                placeShip(currentShip.name, e.target.id)
                resetShip('red');
            })
        }
    }

    function allShipsPlaced() {
        return playerShips.every(obj => obj.coordinates.length > 0)
    }

    function placeShipListeners() {
        const shipSelectors = document.getElementById("ship-selector");
        const listElements = shipSelectors.querySelectorAll('li');

        for (let i = 0; i < listElements.length; i++) {

            listElements[i].addEventListener('click', e => {
                unBold(listElements)
                e.target.classList.add('bold')
                changeSelector(e.target.id)
            });
        }

    }

    function changeSelector(ship) {
        currentShip.name = ship;
    }

    function unBold(list) {
        for (let i = 0; i < list.length; i++) {
            list[i].classList.remove('bold')
        }
    }

    function resetShip() {
        const shipSelectors = document.getElementById("ship-selector");
        const listElements = shipSelectors.querySelectorAll('li');

        unBold(listElements);
        currentShip.name = "";
    }

    function resetBoxes(attribute) {
        const tds = document.querySelectorAll("#table-player td");
        tds.forEach(td => {
            td.classList.remove(attribute)
        })
    }

    function findLength(shipName) {

        for (let i = 0; i < shipList.length; i++) {
            if (shipList[i].name == shipName) {
                return shipList[i].length;
            }
        }
    }

    function recordCoordinates(shipName, id) {

        const length = findLength(shipName);
        const idInt = parseInt(id)
        const shipIDs = horizontalCoords(idInt, length);

        for (let i = 0; i < playerShips.length; i++) {
            if (playerShips[i].name == shipName) {
                playerShips[i].coordinates = shipIDs;
            }
        }

        return;
    }

    function horizontalCoords(idInt, length) {
        const shipIDs = [];

        for (let i = idInt; i < idInt + length; i++) {
            if (i < 10) {
                shipIDs.push("0" + i.toString())
            } else {
                shipIDs.push(i.toString())
            }

        }

        return shipIDs;
    }

    function verticalCoords(idInt, length) {
        const shipIDs = [];
        const vertLength = idInt + (length * 10)

        for (let i = idInt; i < vertLength; i += 10) {
            if (i < 10) {
                shipIDs.push("0" + i.toString())
            } else {
                shipIDs.push(i.toString())
            }
        }

        return shipIDs;
    }

    function validCoordinates(id, length) {
        if (orientation == 'horizontal' && (id[1] > 10 - length) ) {
            return false
        } else if (orientation == 'vertical' && (id[0] > 10 - length)) {
            return false
        }

        return true
    }

    function highlightShip(shipName, id) {

        const length = findLength(shipName);

        if (currentShip == {}) return;
        if (!validCoordinates(id, length)) return;

        const idInt = parseInt(id)
        const shipIDs = (orientation == 'horizontal') ? horizontalCoords(idInt, length) : verticalCoords(idInt, length);

        shipIDs.forEach(number => {
            document.getElementById(number).classList.add('red')
        })
    }

    function validPlacement(shipIDs) {

        for (let i = 0; i < playerShips.length; i++) {
            if (playerShips[i].coordinates.some(r => shipIDs.indexOf(r) >= 0)) {
                console.log('reject')
                return false
            }
        }

        return true

    }

    function placeShip(shipName, id) {

        resetBoxes(shipName.split(' ').join(''))

        const length = findLength(shipName);

        if (id[1] > 10 - length) {
            console.log('too high')
            return
        }

        const idInt = parseInt(id)
        const shipIDs = (orientation == 'horizontal') 
            ? horizontalCoords(idInt, length) 
            : verticalCoords(idInt, length);

        if (!validPlacement(shipIDs)) return

        recordCoordinates(currentShip.name, id)

        shipIDs.forEach(number => {
            document.getElementById(number).classList.add(shipName.split(' ').join(''))
        })

        hideShipName(shipName)

    }

    function hideShipName(shipName) {
        const selectedShip = document.getElementById(shipName)
        selectedShip.classList.add('placed')
    }


    function takeTurn(enemy) {
        const enemyBoard = enemy.grid;
    }

    return {
        playerBoard,
        name,
        grid,
        placeShips,
        takeTurn,
        allShipsPlaced,
    }
}

export default player