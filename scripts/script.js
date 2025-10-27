import { getRandomNumber } from "./utilities.js";
import { startTimer, stopTimer, resetTimer } from "./timer.js";
import { setSpeedMultiplier, getSpeedMultiplier } from "./speedMultiplier.js";
import { BFS } from "./algorithms/bfs.js";

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

const tileMap = {
    ground: 'tile-ground',
    wall: 'tile-wall',
    start: 'tile-start',
    finish: 'tile-finish'
};

const buttonMap = {
    selectGroundButton: 'ground',
    selectWallButton: 'wall',
    selectStartButton: 'start',
    selectFinishButton: 'finish'
};

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
    const position = insertTile('start', positionX, positionY, true);
    pointsOfInterest.goundTiles = pointsOfInterest.goundTiles.filter(tile => !(tile.x === position.x && tile.y === position.y));
}

function insertFinish(positionX = null, positionY = null) {
    const position = insertTile('finish', positionX, positionY, true);
    pointsOfInterest.goundTiles = pointsOfInterest.goundTiles.filter(tile => !(tile.x === position.x && tile.y === position.y));
}

function insertTile(kind, positionX = null, positionY = null, isSingle = true) {
    if (!displayArea) return;

    const numRows = displayArea.children.length;

    let rowIndex = positionY !== null ? Number(positionY) : getRandomNumber(0, numRows - 1);
    let row = displayArea.children[rowIndex];
    let numCols = row.children.length;
    let colIndex = positionX !== null ? Number(positionX) : getRandomNumber(0, numCols - 1);

    const tile = row.children[colIndex];

    if (tile.classList.contains(`tile-${kind}`)) return { x: colIndex, y: rowIndex };

    for (const type of Object.keys(tileMap)) {
        tile.classList.remove(`tile-${type}`);
    }

    tile.classList.add(`tile-${kind}`);

    if (kind === 'start' || kind === 'finish') {
        let oldStartPosition = pointsOfInterest[kind];

        if (oldStartPosition.x !== null && oldStartPosition.y !== null) {
            const oldRow = displayArea.children[oldStartPosition.y];
            const oldTile = oldRow.children[oldStartPosition.x];
            oldTile.classList.remove(`tile-${kind}`);
            oldTile.classList.add('tile-ground');
            pointsOfInterest.goundTiles.push({ x: oldStartPosition.x, y: oldStartPosition.y });
        }

        pointsOfInterest[kind].x = colIndex;
        pointsOfInterest[kind].y = rowIndex;

        // remove from groundTiles, wallTiles and start/finish if it was there
        pointsOfInterest.wallTiles = pointsOfInterest.wallTiles.filter(t => !(t.x === colIndex && t.y === rowIndex));
        pointsOfInterest.goundTiles = pointsOfInterest.goundTiles.filter(t => !(t.x === colIndex && t.y === rowIndex));
        if (kind === 'start' && pointsOfInterest.finish.x === colIndex && pointsOfInterest.finish.y === rowIndex) pointsOfInterest.finish = { x: null, y: null };
        if (kind === 'finish' && pointsOfInterest.start.x === colIndex && pointsOfInterest.start.y === rowIndex) pointsOfInterest.start = { x: null, y: null };
    }

    if (kind === 'ground') {
        const existsInGround = pointsOfInterest.goundTiles.some(t => t.x === colIndex && t.y === rowIndex);  // is tile in groundTiles?
        if (!existsInGround) {
            pointsOfInterest.goundTiles.push({ x: colIndex, y: rowIndex }); // add to groundTiles
        }

        // remove from wallTiles, start and finish if it was there
        pointsOfInterest.wallTiles = pointsOfInterest.wallTiles.filter(t => !(t.x === colIndex && t.y === rowIndex));
        if (pointsOfInterest.start.x === colIndex && pointsOfInterest.start.y === rowIndex) {
            pointsOfInterest.start = { x: null, y: null };
        }
        if (pointsOfInterest.finish.x === colIndex && pointsOfInterest.finish.y === rowIndex) {
            pointsOfInterest.finish = { x: null, y: null };
        }
    }

    if (kind === 'wall') {
        const existsInWall = pointsOfInterest.wallTiles.some(t => t.x === colIndex && t.y === rowIndex); // is tile in wallTiles?
        if (!existsInWall) {
            pointsOfInterest.wallTiles.push({ x: colIndex, y: rowIndex }); // add to wallTiles
        }

        // remove from groundTiles, start and finish if it was there
        pointsOfInterest.goundTiles = pointsOfInterest.goundTiles.filter(t => !(t.x === colIndex && t.y === rowIndex));
        if (pointsOfInterest.start.x === colIndex && pointsOfInterest.start.y === rowIndex) {
            pointsOfInterest.start = { x: null, y: null };
        }
        if (pointsOfInterest.finish.x === colIndex && pointsOfInterest.finish.y === rowIndex) {
            pointsOfInterest.finish = { x: null, y: null };
        }
    }

    console.log(`${kind} placed at`, { x: colIndex, y: rowIndex });
    return { x: colIndex, y: rowIndex };
}

document.addEventListener('DOMContentLoaded', () => {
    displayArea = document.getElementById('displayArea');
    renderGrid(10, 10);
    insertStart();
    insertFinish();
    console.log(pointsOfInterest);

    for (const [id, type] of Object.entries(buttonMap)) {
        const button = document.getElementById(id);

        button.addEventListener('click', () => {
            if (currentSelection === type) {
                currentSelection = null;
                button.classList.remove("active-bg-color");
                button.firstElementChild.classList.remove("active-text-color");
                console.log(`Deselected ${type} tile`);
            } else {
                Object.keys(buttonMap).forEach(key => {
                    const btn = document.getElementById(key);
                    btn.classList.remove("active-bg-color");
                    btn.firstElementChild.classList.remove("active-text-color");
                });

                currentSelection = type;
                button.classList.add("active-bg-color");
                button.firstElementChild.classList.add("active-text-color");
                console.log(`Selected ${type} tile for placement`);
            }
        });
    }

    const algorithmButtons = Array.from(document.querySelectorAll('.algorithm-selection-area button'));
    let currentAlgorithm = null;

    function setAlgorithmButton(btn) {
        if (!btn) return;
        algorithmButtons.forEach(b => {
            b.classList.remove("algorithm-active-button");
        });
        btn.classList.add("algorithm-active-button");
        currentAlgorithm = btn.dataset.algo || btn.id || btn.textContent.trim();
        console.log('Algorithm selected:', currentAlgorithm);
    }

    const defaultAlgoBtn = document.querySelector('.algorithm-selection-area button[data-algo="bfs"]') || algorithmButtons[0];
    setAlgorithmButton(defaultAlgoBtn);

    algorithmButtons.forEach(btn => {
        btn.addEventListener('click', () => setAlgorithmButton(btn));
    });

    for (const [type, className] of Object.entries(tileMap)) {
        displayArea.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('tile') && currentSelection === type) {
                const rowIndex = Number(target.dataset.row);
                const colIndex = Number(target.dataset.col);
                if (type === 'start') insertStart(colIndex, rowIndex);
                else if (type === 'finish') insertFinish(colIndex, rowIndex);
                else insertTile(type, colIndex, rowIndex);
            }
        });
    }

    let debugButton = document.getElementById('debug');
    debugButton.addEventListener('click', () => {
        console.log('Points of Interest:', pointsOfInterest);
    });

    let startSimulationButton = document.getElementById('startSimulationButton');
    startSimulationButton.addEventListener('click', async () => {
        console.log('Starting simulation...');
        startSimulationButton.classList.add('hidden');
        pauseSimulationButton.classList.remove('hidden');
        startTimer();
        while (true) {
            if (BFS(Object.values(pointsOfInterest.start), Object.values(pointsOfInterest.finish), pointsOfInterest.goundTiles)) break;
            const baseDelay = 50;
            const multiplier = getSpeedMultiplier();
            const delay = Math.max(0, Math.floor(baseDelay / (multiplier || 1)));
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    });

    let pauseSimulationButton = document.getElementById('pauseSimulationButton');
    pauseSimulationButton.addEventListener('click', () => {
        console.log('Pausing simulation...');
        pauseSimulationButton.classList.add('hidden');
        startSimulationButton.classList.remove('hidden');
        stopTimer();
    });

    let stopSimulationButton = document.getElementById('stopSimulationButton');
    stopSimulationButton.addEventListener('click', () => {
        console.log('Stopping simulation...');
        pauseSimulationButton.classList.add('hidden');
        startSimulationButton.classList.remove('hidden');
        stopTimer();
        resetTimer();
    });

    const speedButtons = Array.from(document.querySelectorAll('.speed-button'));

    function updateSpeedButtonsUI(selectedSpeed) {
        speedButtons.forEach(btn => {
            const s = Number(btn.dataset.speed) || 1;
            if (s <= selectedSpeed) btn.classList.add('selected');
            else btn.classList.remove('selected');
        });
    }

    updateSpeedButtonsUI(getSpeedMultiplier());

    speedButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const v = Number(btn.dataset.speed) || 1;
            setSpeedMultiplier(v);
            updateSpeedButtonsUI(v);
            console.log('Speed set to', v);
        });
    });
});