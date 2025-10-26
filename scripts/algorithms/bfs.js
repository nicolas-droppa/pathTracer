let visited = new Set();
let isRunning = false;
let queue = [];
let lookUpCounter = 0;
let groundTilesSet = new Set();

function idOf(coordOrObj) {
    if (Array.isArray(coordOrObj)) return `${coordOrObj[0]},${coordOrObj[1]}`;
    if (coordOrObj && typeof coordOrObj.x === 'number' && typeof coordOrObj.y === 'number') return `${coordOrObj.x},${coordOrObj.y}`;
    return String(coordOrObj);
}

function groundTilesToSet(groundTilesArray) {
    groundTilesSet.clear();
    if (!Array.isArray(groundTilesArray)) return;
    for (const tile of groundTilesArray) {
        groundTilesSet.add(idOf(tile));
    }
    console.log(`Ground tiles set (count=${groundTilesSet.size})`);
}

function initializeBFS(startNode, groundTilesArray) {
    queue.push(startNode);
    groundTilesToSet(groundTilesArray);
    console.log(`Start node: ${JSON.stringify(startNode)}`);
}

export function BFS(startNode, endNode, groundTiles) {
    console.log(`Lookup iteration: ${lookUpCounter++}`);

    if (!isRunning) {
        isRunning = true;
        initializeBFS(startNode, groundTiles);
    }
 
    const current = queue[0];
    const currentId = idOf(current);
    visited.add(currentId);
    console.log(`Visiting node: ${currentId}`);

    let currentPositionX = current[0];
    let currentPositionY = current[1];

    if (currentPositionX === endNode[0] && currentPositionY === endNode[1]) {
        console.log("Reached the end node!");
        return true;
    }

    const neighborRight = [currentPositionX + 1, currentPositionY + 0];
    const neighborDown = [currentPositionX + 0, currentPositionY + 1];
    const neighborLeft = [currentPositionX - 1, currentPositionY + 0];
    const neighborUp = [currentPositionX - 0, currentPositionY - 1];

    console.log(`Neighbors: R:${JSON.stringify(neighborRight)} U:${JSON.stringify(neighborUp)} L:${JSON.stringify(neighborLeft)} D:${JSON.stringify(neighborDown)}`);
    
    const neighbors = [neighborRight, neighborDown, neighborLeft, neighborUp];

    for (const neighbor of neighbors) {
        const neighborId = idOf(neighbor);
        if (groundTilesSet.has(neighborId) && !visited.has(neighborId)) {
            queue.push(neighbor);
        }
    }
    
    queue.shift();

    console.log(`Queue length: ${queue.length}`);

    if (queue.length === 0) {
        console.log("BFS complete.");
        isRunning = false;
        return true;
    } else {
        return false;
    }
}