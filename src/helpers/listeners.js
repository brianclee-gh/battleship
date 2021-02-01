function listeners() {
    const tds = document.querySelectorAll("#table-player td");

    for (let i = 0; i < tds.length; i++) {
        tds[i].addEventListener('mouseenter', (e) => {
            resetBoxes();
            highlightShip(e.target.id, 5)
        })
        tds[i].addEventListener('click', (e) => {
            resetBoxes();
            placeShip(e.target.id, 5)
        })
    }

}

function resetBoxes() {
    const tds = document.querySelectorAll("#table-player td");
    tds.forEach(td => {
        td.classList.remove('red')
    })
}

function highlightShip(id, length) {

    if (id[1] > 10 - length) {
        console.log('too high')
        return
    }

    const shipIDs = [];
    let idInt = parseInt(id)

    for (let i = idInt; i < idInt + length; i++) {
        if (i < 10) {
            shipIDs.push("0" + i.toString())
        } else {
            shipIDs.push(i.toString())
        }
        
    }

    shipIDs.forEach(number => {
        document.getElementById(number).classList.add('red')
    })
}

function placeShip(id, length) {

    if (id[1] > 10 - length) {
        console.log('too high')
        return
    }

    const shipIDs = [];
    let idInt = parseInt(id)

    for (let i = idInt; i < idInt + length; i++) {
        if (i < 10) {
            shipIDs.push("0" + i.toString())
        } else {
            shipIDs.push(i.toString())
        }

    }

    shipIDs.forEach(number => {
        document.getElementById(number).classList.add('blue')
    })
}

function handleShipTooLong(id, length) {

}

export default listeners;