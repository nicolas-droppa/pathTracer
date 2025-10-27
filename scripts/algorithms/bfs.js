import { stopTimer } from "../timer.js";
import { setInfoMessage } from "../infoMessage.js";
import { disableButtons, sleep } from "../utilities.js";

let visited = new Set();
let isRunning = false;
let queue = [];
let lookUpCounter = 0;
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
    // console.log(`Ground tiles set (count=${groundTilesSet.size})`);
}

function initializeBFS(startNode, groundTilesArray, endNode) {
    queue.push(startNode);
    groundTilesToSet(groundTilesArray, endNode);
    // console.log(`Start node: ${JSON.stringify(startNode)}`);
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

    console.log("Shortest path:", path);

    for (const id of path) {
        const [row, col] = id.split(",");
        const tile = document.querySelector(`.tile[data-row="${col}"][data-col="${row}"]`);
        if (tile) tile.classList.add("path-tile");
        
        await sleep(100);
    }

    return path;
}

export function BFS(startNode, endNode, groundTiles) {
    console.log(`Lookup iteration: ${lookUpCounter++}`);

    if (!isRunning) {
        isRunning = true;
        initializeBFS(startNode, groundTiles, endNode);
    }
 
    const current = queue[0];
    const currentId = idOf(current);
    visited.add(currentId);
    // console.log(`Visiting node: ${currentId}`);

    const [row, col] = currentId.split(",");
    const tile = document.querySelector(`.tile[data-row="${col}"][data-col="${row}"]`);
    if (tile) tile.classList.add('visited-tile');

    let currentPositionX = current[0];
    let currentPositionY = current[1];
    
    // console.log(`Current position: X=${currentPositionX}, Y=${currentPositionY} | endNode: X=${endNode[0]}, Y=${endNode[1]}`);

    if (currentPositionX == endNode[0] && currentPositionY == endNode[1]) {
        stopTimer();
        console.log("Reached the end node!");
        isRunning = false;
        constructPath(cameFrom, startNode, endNode);
        return true;
    }

    const neighborRight = [currentPositionX + 1, currentPositionY + 0];
    const neighborDown = [currentPositionX + 0, currentPositionY + 1];
    const neighborLeft = [currentPositionX - 1, currentPositionY + 0];
    const neighborUp = [currentPositionX - 0, currentPositionY - 1];

    // console.log(`Neighbors: R:${JSON.stringify(neighborRight)} U:${JSON.stringify(neighborUp)} L:${JSON.stringify(neighborLeft)} D:${JSON.stringify(neighborDown)}`);
    
    const neighbors = [neighborRight, neighborDown, neighborLeft, neighborUp];

    for (const neighbor of neighbors) {
        const neighborId = idOf(neighbor);
        if (groundTilesSet.has(neighborId) && !visited.has(neighborId)) {
            visited.add(neighborId);
            cameFrom.set(neighborId, currentId);
            queue.push(neighbor);
        }
    }
    
    queue.shift();

    console.log(`Queue length: ${queue.length}`);

    if (queue.length === 0) {
        setInfoMessage('No path found!');
        // console.log("BFS complete.");
        isRunning = false;
        return true;
    } else {
        return false;
    }
}

export async function resetBFS() {
    visited.clear();
    isRunning = false;
    queue = [];
    lookUpCounter = 0;
    groundTilesSet.clear();
    cameFrom.clear();

    await sleep(500);
    let tiles = document.querySelectorAll('.tile.visited-tile');
    tiles.forEach(tile => tile.classList.remove('visited-tile'));
    tiles = document.querySelectorAll('.tile.path-tile');;
    tiles.forEach(tile => tile.classList.remove('path-tile'));
}