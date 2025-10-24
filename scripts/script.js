import { getRandomNumber } from "./utilities.js";

let displayArea = null;

let pointsOfInterest = {
    start: {
        x: null,
        y: null
    },
    finish: {
        x: null,
        y: null
    },
    goundTiles: [],
    wallTiles: []
}

let currentSelection = null;

function renderGrid(rows, columns, type = "ground") {
    displayArea.innerHTML = "";

    for (let i = 0; i < rows; i++) {
        const row = document.createElement('div');
        row.classList.add('tile-row');
        row.style.display = "flex";

        for (let j = 0; j < columns; j++) {
            const tile = document.createElement('div');
            tile.classList.add('tile', `tile-${type}`);
            tile.dataset.row = i;
            tile.dataset.col = j;
            row.appendChild(tile);
            pointsOfInterest.goundTiles.push({ x: j, y: i });
        }

        displayArea.appendChild(row);
    }
}

function insertStart(positionX = null, positionY = null) {
    const position = insertTile('start', positionX, positionY);
    pointsOfInterest.goundTiles = pointsOfInterest.goundTiles.filter(tile => !(tile.x === position.x && tile.y === position.y));
}

function insertFinish(positionX = null, positionY = null) {
    const position = insertTile('finish', positionX, positionY);
    pointsOfInterest.goundTiles = pointsOfInterest.goundTiles.filter(tile => !(tile.x === position.x && tile.y === position.y));
}

function insertTile(kind, positionX = null, positionY = null) {
    if (!displayArea) return;

    const numRows = displayArea.children.length;

    let rowIndex;
    let colIndex;

    if (positionX !== null && positionY !== null) {
        rowIndex = Number(positionY);
        colIndex = Number(positionX);
    } else {
        rowIndex = getRandomNumber(0, numRows - 1);
        const row = displayArea.children[rowIndex];
        const numCols = row.children.length;
        colIndex = getRandomNumber(0, numCols - 1);
    }

    const tile = displayArea.children[rowIndex].children[colIndex];

    const prev = displayArea.querySelector(`.tile-${kind}`);
    if (prev) {
        prev.classList.remove(`tile-${kind}`);
        delete prev.dataset[kind];
    }

    tile.classList.add(`tile-${kind}`);
    tile.dataset[kind] = "true";

    pointsOfInterest[kind].x = colIndex;
    pointsOfInterest[kind].y = rowIndex;

    console.log(`${kind.charAt(0).toUpperCase() + kind.slice(1)} placed at`, { row: rowIndex, col: colIndex });

    return { x: colIndex, y: rowIndex };
}


document.addEventListener('DOMContentLoaded', () => {
    displayArea = document.getElementById('displayArea');
    renderGrid(10, 10);
    insertStart();
    insertFinish();
    console.log(pointsOfInterest);
});