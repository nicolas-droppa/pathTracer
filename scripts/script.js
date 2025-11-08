import { createButtonImageFromSquares, disableButtons, enableButtons, getRandomNumber, sleep } from "./utilities.js";
import { startTimer, stopTimer, resetTimer } from "./timer.js";
import { setSpeedMultiplier, getSpeedMultiplier } from "./speedMultiplier.js";
import { BFS, resetBFS } from "./algorithms/bfs.js";
import { DFS, resetDFS } from "./algorithms/dfs.js";
import { AStar, resetAStar } from "./algorithms/astar.js";
import { setInfoMessage } from "./infoMessage.js";

let displayArea = null;

let _simulationPaused = false;
let _simulationResetting = false;
let _simulationRunning = false;

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

    if (_simulationRunning) return;

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

    // console.log(`${kind} placed at`, { x: colIndex, y: rowIndex });
    return { x: colIndex, y: rowIndex };
}

document.addEventListener('DOMContentLoaded', () => {
    displayArea = document.getElementById('displayArea');
    createButtonImageFromSquares(document.getElementById('squareButtonImage'), 'square');
    createButtonImageFromSquares(document.getElementById('triangleButtonImage'), 'triangle');
    createButtonImageFromSquares(document.getElementById('circleButtonImage'), 'circle');
    renderGrid(20, 20);
    insertStart();
    insertFinish();
    // console.log(pointsOfInterest);

    for (const [id, type] of Object.entries(buttonMap)) {
        const button = document.getElementById(id);

        button.addEventListener('click', () => {
            if (currentSelection === type) {
                currentSelection = null;
                button.classList.remove("active-bg-color");
                button.firstElementChild.classList.remove("active-text-color");
                // console.log(`Deselected ${type} tile`);
            } else {
                Object.keys(buttonMap).forEach(key => {
                    const btn = document.getElementById(key);
                    btn.classList.remove("active-bg-color");
                    btn.firstElementChild.classList.remove("active-text-color");
                });

                currentSelection = type;
                button.classList.add("active-bg-color");
                button.firstElementChild.classList.add("active-text-color");
                // console.log(`Selected ${type} tile for placement`);
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
        // console.log('Algorithm selected:', currentAlgorithm);
    }

    const defaultAlgoBtn = document.querySelector('.algorithm-selection-area button[data-algo="bfs"]') || algorithmButtons[0];
    setAlgorithmButton(defaultAlgoBtn);

    algorithmButtons.forEach(btn => {
        btn.addEventListener('click', () => setAlgorithmButton(btn));
    });

    let isMouseDown = false;
    let lastPaintedTile = null;

    // Prevent default drag behavior
    displayArea.addEventListener('dragstart', (event) => {
        event.preventDefault();
    });

    // Handle click placement
    displayArea.addEventListener('click', (event) => {
        event.preventDefault();
        const target = event.target;
        if (!target.classList.contains('tile') || !currentSelection) return;
        
        const rowIndex = Number(target.dataset.row);
        const colIndex = Number(target.dataset.col);
        
        if (currentSelection === 'start') insertStart(colIndex, rowIndex);
        else if (currentSelection === 'finish') insertFinish(colIndex, rowIndex);
        else insertTile(currentSelection, colIndex, rowIndex);
    });

    displayArea.addEventListener('mousedown', (event) => {
        event.preventDefault();
        if (event.button !== 0) return; // only handle left click
        const target = event.target;
        if (!target.classList.contains('tile') || !currentSelection) return;
        
        isMouseDown = true;
        lastPaintedTile = target;

        const rowIndex = Number(target.dataset.row);
        const colIndex = Number(target.dataset.col);
        
        if (currentSelection === 'start') insertStart(colIndex, rowIndex);
        else if (currentSelection === 'finish') insertFinish(colIndex, rowIndex);
        else insertTile(currentSelection, colIndex, rowIndex);
    });

    // Handle continuous painting
    displayArea.addEventListener('mousemove', (event) => {
        event.preventDefault();
        if (!isMouseDown || !currentSelection) return;
        const target = event.target;
        if (!target.classList.contains('tile')) return;
        
        if (target === lastPaintedTile) return;
        lastPaintedTile = target;

        const rowIndex = Number(target.dataset.row);
        const colIndex = Number(target.dataset.col);

        if (currentSelection === 'start' || currentSelection === 'finish') return;
        insertTile(currentSelection, colIndex, rowIndex);
    });

    document.addEventListener('mouseup', (event) => {
        event.preventDefault();
        isMouseDown = false;
        lastPaintedTile = null;
    });

    document.addEventListener('mouseleave', (event) => {
        event.preventDefault();
        isMouseDown = false;
        lastPaintedTile = null;
    });

    // let debugButton = document.getElementById('debug');
    // debugButton.addEventListener('click', () => {
    //     console.log('Points of Interest:', pointsOfInterest);
    // });

    let startSimulationButton = document.getElementById('startSimulationButton');
    startSimulationButton.addEventListener('click', async () => {
        // console.log('Starting simulation...');
        _simulationPaused = false;
        _simulationRunning = true;
        setInfoMessage('Simulation started');
        disableButtons([selectGroundButton, selectWallButton, selectStartButton, selectFinishButton, ...algorithmButtons, squareButton, triangleButton, circleButton]);
        startSimulationButton.classList.add('hidden');
        pauseSimulationButton.classList.remove('hidden');
        startTimer();

        // Run selected algorithm
        if (currentAlgorithm === 'bfs') {
            while (true) {
                if (_simulationPaused) break;

                if (_simulationResetting) {
                    await resetBFS();
                    break;
                }

                if (BFS(Object.values(pointsOfInterest.start), Object.values(pointsOfInterest.finish), pointsOfInterest.goundTiles)){
                    _simulationRunning = false;
                    break;
                }

                await sleep(50);
            }
        } else if (currentAlgorithm === 'dfs') {
            await DFS(Object.values(pointsOfInterest.start), Object.values(pointsOfInterest.finish), pointsOfInterest.goundTiles);
            _simulationRunning = false;
        } else if (currentAlgorithm === 'astar' || currentAlgorithm === 'a*' || currentAlgorithm === 'a-star') {
            await AStar(Object.values(pointsOfInterest.start), Object.values(pointsOfInterest.finish), pointsOfInterest.goundTiles);
            _simulationRunning = false;
        } else {
            // fallback to bfs
            while (true) {
                if (_simulationPaused) break;

                if (_simulationResetting) {
                    await resetBFS();
                    break;
                }

                if (BFS(Object.values(pointsOfInterest.start), Object.values(pointsOfInterest.finish), pointsOfInterest.goundTiles)){
                    _simulationRunning = false;
                    break;
                }

                await sleep(50);
            }
        }
    });

    let pauseSimulationButton = document.getElementById('pauseSimulationButton');
    pauseSimulationButton.addEventListener('click', () => {
        stopTimer();
        _simulationPaused = true;
        // console.log('Pausing simulation...');
        setInfoMessage('Simulation paused');
        pauseSimulationButton.classList.add('hidden');
        startSimulationButton.classList.remove('hidden');
    });

    let resetSimulationButton = document.getElementById('resetSimulationButton');
    resetSimulationButton.addEventListener('click', async () => {
        stopTimer();
        _simulationResetting = true;
        _simulationRunning = false;
        // console.log('Resseting simulation...');
        setInfoMessage('Simulation reset');
        // reset all algorithm states to be safe
        await Promise.all([resetBFS(), resetDFS(), resetAStar()]);
        await sleep(200);
        setInfoMessage('Simulation not started');
        enableButtons([selectGroundButton, selectWallButton, selectStartButton, selectFinishButton, ...algorithmButtons, startSimulationButton, pauseSimulationButton, squareButton, triangleButton, circleButton]);
        pauseSimulationButton.classList.add('hidden');
        startSimulationButton.classList.remove('hidden');
        resetTimer();
        _simulationResetting = false;
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
            // console.log('Speed set to', v);
        });
    });

    const shapeButtons = Array.from(document.querySelectorAll('.shape-button'));

    function clearSimulationState() {
        if (displayArea) {
            const tiles = displayArea.querySelectorAll('.tile-visited, .tile-path');
            tiles.forEach(t => {
                t.classList.remove('tile-visited');
                t.classList.remove('tile-path');
            });
        }

        pointsOfInterest.goundTiles = [];
        pointsOfInterest.wallTiles = [];
        pointsOfInterest.start = { x: null, y: null };
        pointsOfInterest.finish = { x: null, y: null };

        stopTimer();
        resetTimer();

        const pauseBtn = document.getElementById('pauseSimulationButton');
        const startBtn = document.getElementById('startSimulationButton');
        if (pauseBtn) pauseBtn.classList.add('hidden');
        if (startBtn) startBtn.classList.remove('hidden');

        const msg = document.getElementById('message');
        if (msg) msg.textContent = 'Simulation not started';
    }

    function renderShapeGrid(shape, rows = 20, columns = 20) {
        if (!displayArea) return;
        displayArea.innerHTML = "";
        pointsOfInterest.goundTiles = [];
        pointsOfInterest.wallTiles = [];
        pointsOfInterest.start = { x: null, y: null };
        pointsOfInterest.finish = { x: null, y: null };

        const centerRow = (rows - 1) / 2;
        const centerCol = (columns - 1) / 2;
        const outerRadius = Math.min(rows, columns) / 2.5;
        const innerRadius = outerRadius / 2.5;

        for (let i = 0; i < rows; i++) {
            const row = document.createElement('div');
            row.classList.add('tile-row');
            row.style.display = "flex";

            for (let j = 0; j < columns; j++) {
                const tile = document.createElement('div');
                tile.classList.add('tile', 'tile-ground');
                tile.dataset.row = i;
                tile.dataset.col = j;

                let visible = true;

                switch (shape) {
                    case "circle":
                        const dist = Math.sqrt((i - centerRow) ** 2 + (j - centerCol) ** 2);
                        if (dist > outerRadius || dist < innerRadius) visible = false;
                        break;

                        case "triangle":
                        if (j < columns - 1 - i) visible = false;
                        break;

                    default:
                        visible = true;
                        break;
                }

                if (!visible) {
                    tile.classList.add('tile-hidden');
                    tile.style.visibility = "hidden";
                } else
                    pointsOfInterest.goundTiles.push({ x: j, y: i });

                row.appendChild(tile);
            }

            displayArea.appendChild(row);
        }

        if (pointsOfInterest.goundTiles.length >= 2) {
            const total = pointsOfInterest.goundTiles.length;

            // choose two distinct random indices among visible ground tiles
            const pickTwoDistinct = (n) => {
                const a = Math.floor(Math.random() * n);
                let b = Math.floor(Math.random() * n);
                if (n > 1) {
                    while (b === a) b = Math.floor(Math.random() * n);
                }
                return [a, b];
            };

            const [startIndex, finishIndex] = pickTwoDistinct(total);
            const startTile = pointsOfInterest.goundTiles[startIndex];
            const finishTile = pointsOfInterest.goundTiles[finishIndex];

            insertStart(startTile.x, startTile.y);
            insertFinish(finishTile.x, finishTile.y);
        }
    }

    shapeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            shapeButtons.forEach(b => {
                b.classList.remove("active-bg-color");
                b.firstElementChild.classList.remove("active-text-color");
            });
            btn.classList.add("active-bg-color");
            btn.firstElementChild.classList.add("active-text-color");

            const shape = btn.id.replace('Button', '').toLowerCase();
            // console.log('Shape selected:', shape);

            clearSimulationState();

            renderShapeGrid(shape);
        });
    });
});