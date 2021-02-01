import shipList from '../data/shipList2';

function Gameboard() {

    let board = Array(10).fill(null).map(() => Array(10).fill(null));
    const getBoard = () => board;

    let placedShips = [];
    const allShipsPlaced = () => {
        return placedShips.length == shipList.length;
    } 

    const placeShip = (yInitial, xInitial, ship) => {
        const orientation = ship.getOrientation();
        const length = ship.length;
        const valid = isValidPlacement(yInitial, xInitial, length, orientation);

        if (valid) {
            for (let i = 0; i < length; i++) {
                const [y, x] = translateCoords(yInitial, xInitial, i, orientation);
                board[y][x] = { ship, index: i };
            }
            placedShips.push(ship);
            return valid;
        } else {
            return valid;
        }

    };

    const autoPlace = (ship) => {
        const [y, x] = randomCoordinates();
        const changeOrientation = Math.random() > 0.5;
        if (changeOrientation) ship.changeOrientation();

        const isValid = placeShip(y, x, ship);
        if (!isValid) autoPlace(ship);
    }

    const autoPlaceRoster = (roster) => {
        for (let ship in roster) {
            autoPlace(roster[ship]);
        }
    }

    const randomCoordinates = () => {
        const min = 0;
        const max = 9;

        const y = Math.floor(Math.random() * (max - min + 1)) + min
        const x = Math.floor(Math.random() * (max - min + 1)) + min

        return [y, x]
    }

    const translateCoords = (yInitial, xInitial, i, orientation) => {

        let x = xInitial + i;
        let y = yInitial;

        if (orientation == ('vertical')) {
            x = xInitial;
            y = yInitial + i;
        }

        return [y, x];
        
    };

    const isValidPlacement = (yInitial, xInitial, length, orientation) => {

        const coordinates = [];

        for (let i = 0; i < length; i++) {
            const [y, x] = translateCoords(yInitial, xInitial, i, orientation);
            if (y < 10 && x < 10) {
                coordinates.push(board[y][x]);
            } else {
                return false;
            }

        }

        // reject occupied 
        return coordinates.every((cell) => cell === null);
    };

    const receiveAttack = (y, x) => {
        const cell = board[y][x];
        
        if (cell === null) {
            board[y][x] = 'miss';
        } else if (board[y][x].ship) {
            board[y][x].ship.hit(board[y][x].index);
            board[y][x] = 'hit';
        }

        return board[y][x];
    }

    const allShipsSunk = () => { 
        return placedShips.every((ship) => ship.isSunk()) 
    };

    const resetBoard = () => {
        board = Array(10).fill(null).map(() => Array(10).fill(null));
        placedShips = [];
    };

    
    return {
        getBoard,
        placeShip,
        autoPlaceRoster,
        allShipsPlaced,
        receiveAttack,
        allShipsSunk,
        resetBoard,
    }
}

export default Gameboard;