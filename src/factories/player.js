import shipList from '../data/shipList2';
import Ship from './ship';

const Player = (name) => {

    const takeShot = (y, x, otherBoard) => {
        otherBoard.receiveAttack(y, x);
    }

    const makeRoster = (list) => {
        const roster = {};

        list.forEach(boat => {
            roster[boat.name] = Ship(boat.name, boat.length)
        })

        return roster;
    }

    const resetRoster = () => {
        shipRoster = makeRoster(shipList)
    }

    let shipRoster = makeRoster(shipList);

    const getName = () => name;
    const getRoster = () => shipRoster;

    return {
        getName,
        getRoster,
        takeShot,
        resetRoster,
    }

}

export default Player;