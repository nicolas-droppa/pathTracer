import { stopTimer } from "../timer.js";
import { setInfoMessage } from "../infoMessage.js";
import { disableButtons, sleep } from "../utilities.js";

let visited = new Set();
let isRunning = false;
let stack = [];
let groundTilesSet = new Set();
let cameFrom = new Map();

function idOf(coordOrObj) {
    if (Array.isArray(coordOrObj)) return `${coordOrObj[0]},${coordOrObj[1]}`;
    if (coordOrObj && typeof coordOrObj.x === 'number' && typeof coordOrObj.y === 'number') return `${coordOrObj.x},${coordOrObj.y}`;
    return String(coordOrObj);
}

function groundTilesToSet(groundTilesArray, endNode) {
    groundTilesSet.clear();
    if (!Array.isArray(groundTilesArray)) return;
    for (const tile of groundTilesArray) {
        groundTilesSet.add(idOf(tile));
    }

    groundTilesSet.add(idOf(endNode));
}

function initializeDFS(startNode, groundTilesArray, endNode) {
    stack.push(startNode);
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
        const [row, col] = id.split(",");
        const tile = document.querySelector(`.tile[data-row="${col}"][data-col="${row}"]`);
        if (tile && id !== startId && id !== endId) tile.classList.add("path-tile");
        await sleep(100);
    }

    return path;
}

export async function DFS(startNode, endNode, groundTiles) {
    if (!isRunning) {
        isRunning = true;
        initializeDFS(startNode, groundTiles, endNode);
    }

    while (stack.length > 0) {
        const current = stack.pop();
        const currentId = idOf(current);
        if (visited.has(currentId)) continue;
        visited.add(currentId);

        const [row, col] = currentId.split(",");
        const tile = document.querySelector(`.tile[data-row="${col}"][data-col="${row}"]`);

        const startId = idOf(startNode);
        const endId = idOf(endNode);
        if (tile && currentId !== startId && currentId !== endId) {
            tile.classList.add('visited-tile');
            await sleep(30);
        }

        if (current[0] == endNode[0] && current[1] == endNode[1]) {
            stopTimer();
            isRunning = false;
            await constructPath(cameFrom, startNode, endNode);
            return true;
        }

        const neighbors = [
            [current[0] + 1, current[1]],
            [current[0], current[1] + 1],
            [current[0] - 1, current[1]],
            [current[0], current[1] - 1]
        ];

        for (const neighbor of neighbors) {
            const neighborId = idOf(neighbor);
            if (groundTilesSet.has(neighborId) && !visited.has(neighborId)) {
                cameFrom.set(neighborId, currentId);
                stack.push(neighbor);
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

export async function resetDFS() {
    visited.clear();
    isRunning = false;
    stack = [];
    groundTilesSet.clear();
    cameFrom.clear();

    await sleep(500);
    let tiles = document.querySelectorAll('.tile.visited-tile');
    tiles.forEach(tile => tile.classList.remove('visited-tile'));
    tiles = document.querySelectorAll('.tile.path-tile');
    tiles.forEach(tile => tile.classList.remove('path-tile'));
}
