import { stopTimer } from "../timer.js";
import { setInfoMessage } from "../infoMessage.js";
import { disableButtons, sleep } from "../utilities.js";

let visited = new Set();
let isRunning = false;
let openSet = new Set();
let groundTilesSet = new Set();
let cameFrom = new Map();
let gScore = new Map();
let fScore = new Map();
let cancelled = false;

function idOf(coordOrObj) {
    if (Array.isArray(coordOrObj)) return `${coordOrObj[0]},${coordOrObj[1]}`;
    if (coordOrObj && typeof coordOrObj.x === 'number' && typeof coordOrObj.y === 'number') return `${coordOrObj.x},${coordOrObj.y}`;
    return String(coordOrObj);
}

function manhattan(a, b) {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

function groundTilesToSet(groundTilesArray, endNode) {
    groundTilesSet.clear();
    if (!Array.isArray(groundTilesArray)) return;
    for (const tile of groundTilesArray) {
        groundTilesSet.add(idOf(tile));
    }

    groundTilesSet.add(idOf(endNode));
}

function initializeAStar(startNode, groundTilesArray, endNode) {
    cancelled = false;
    openSet.clear();
    cameFrom.clear();
    gScore.clear();
    fScore.clear();

    const startId = idOf(startNode);
    openSet.add(startId);
    gScore.set(startId, 0);
    fScore.set(startId, manhattan(startNode, endNode));
    groundTilesToSet(groundTilesArray, endNode);
}

async function constructPath(cameFromMap, startNode, endNode) {
    setInfoMessage('Path found!');
    disableButtons([
        document.getElementById('startSimulationButton'),
        document.getElementById('pauseSimulationButton')
    ]);
    const startId = idOf(startNode);
    const endId = idOf(endNode);

    const path = [];
    let current = endId;

    while (current && current !== startId) {
        path.push(current);
        current = cameFromMap.get(current);
    }

    path.push(startId);
    path.reverse();

    for (const id of path) {
        if (cancelled) break;
        const [row, col] = id.split(",");
        const tile = document.querySelector(`.tile[data-row="${col}"][data-col="${row}"]`);
        if (tile && id !== startId && id !== endId) tile.classList.add("path-tile");
        await sleep(100);
    }

    return path;
}

export async function AStar(startNode, endNode, groundTiles) {
    if (!isRunning) {
        isRunning = true;
        initializeAStar(startNode, groundTiles, endNode);
    }

    const startId = idOf(startNode);
    const endId = idOf(endNode);

    while (openSet.size > 0) {
        let currentId = null;
        let currentF = Infinity;
        for (const id of openSet) {
            const f = fScore.get(id) ?? Infinity;
            if (f < currentF) {
                currentF = f;
                currentId = id;
            }
        }

        if (currentId === null) break;

        const [cx, cy] = currentId.split(',').map(Number);
        const current = [cx, cy];

        if (currentId === endId) {
            stopTimer();
            isRunning = false;
            await constructPath(cameFrom, startNode, endNode);
            return true;
        }

        openSet.delete(currentId);
        visited.add(currentId);

        const tile = document.querySelector(`.tile[data-row="${cy}"][data-col="${cx}"]`);
        if (tile && currentId !== startId && currentId !== endId) {
            tile.classList.add('visited-tile');
            await sleep(30);
        }

        const neighbors = [
            [current[0] + 1, current[1]],
            [current[0], current[1] + 1],
            [current[0] - 1, current[1]],
            [current[0], current[1] - 1]
        ];

        for (const neighbor of neighbors) {
            const neighborId = idOf(neighbor);
            if (!groundTilesSet.has(neighborId)) continue;
            if (visited.has(neighborId)) continue;

            const tentativeG = (gScore.get(currentId) ?? Infinity) + 1;
            if (tentativeG < (gScore.get(neighborId) ?? Infinity)) {
                cameFrom.set(neighborId, currentId);
                gScore.set(neighborId, tentativeG);
                fScore.set(neighborId, tentativeG + manhattan(neighbor, endNode));
                openSet.add(neighborId);
            }
        }
    }

    setInfoMessage('No path found!');
    stopTimer();
    disableButtons([
        document.getElementById('startSimulationButton'),
        document.getElementById('pauseSimulationButton')
    ]);
    isRunning = false;
    return true;
}

export async function resetAStar() {
    visited.clear();
    isRunning = false;
    cancelled = true;
    openSet.clear();
    groundTilesSet.clear();
    cameFrom.clear();
    gScore.clear();
    fScore.clear();

    await sleep(500);
    let tiles = document.querySelectorAll('.tile.visited-tile');
    tiles.forEach(tile => tile.classList.remove('visited-tile'));
    tiles = document.querySelectorAll('.tile.path-tile');
    tiles.forEach(tile => tile.classList.remove('path-tile'));
}
