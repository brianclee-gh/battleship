const Ship = (name, length) => {
    let orientation = 'horizontal';

    const getOrientation = () => orientation;
    const changeOrientation = () => {
        orientation == 'horizontal' ?
        (orientation = 'vertical') :
        (orientation = 'horizontal');
    };

    const hitPoints = Array(length).fill(null);

    function hit(position) {
        hitPoints[position] = 'hit';
    };

    const getHitPoints = () => hitPoints;

    const isSunk = () => {
        return hitPoints.every(r => r === "hit");
    }

    return {
        name,
        length,
        getOrientation,
        changeOrientation,
        getHitPoints,
        hit,
        isSunk,

    }
}


export default Ship;