const Ship = (name, length) => {
    let orientation = 'horizontal';

    const getOrientation = () => orientation;
    const changeOrientation = () => {
        direction == 'horizontal' ?
            (direction = 'vertical') :
            (direction = 'horizontal');
    };

    const hitPoints = Array(length).fill(null);

    function hit(position) {
        hitPoints[position] = 'hit';
    };

    const getHitPoints = () => hitPoints;

    const isSunk = () => {
        hitPoints.every(r => r === "hit");
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