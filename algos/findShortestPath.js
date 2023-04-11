/**
 * Find the shortest path between two points using BFS algorithm
 */
export const findShortestPath = async (canvas, obj1, obj2) => {
    let grid = structuredClone(canvas.get2dGrid())
    let queue = [{ node: [obj1.getPos().x, obj1.getPos().y], path: [] }]
    let shortestPath = []

    const legalMovement = (x, y) => {
        if (x >= 0 &&
            y >= 0 &&
            x < grid.length &&
            y < grid[0].length &&
            (grid[x][y] === 0 || grid[x][y] === 'player' || grid[x][y] === 'object')
        ) {
            grid[x][y] = 1 // mark as visited
            return true
        }
        return false
    }

    while (queue.length) {
        let dequeue = queue.shift(); // v

        const path = [...dequeue.path]
        path.push(dequeue.node)

        let [x, y] = dequeue.node;

        if (x === obj2.getPos().x && y === obj2.getPos().y) {
            shortestPath = dequeue.path
            break; // Found shortest path
        }

        if (legalMovement(x, y - 1, grid)) queue.push({ node: [x, y - 1], path: [...path] }); // top
        if (legalMovement(x + 1, y, grid)) queue.push({ node: [x + 1, y], path: [...path] }); // right
        if (legalMovement(x - 1, y, grid)) queue.push({ node: [x - 1, y], path: [...path] }); // left
        if (legalMovement(x, y + 1, grid)) queue.push({ node: [x, y + 1], path: [...path] }); // bottom
    }

    // if (!shortestPath.length) return console.log("NOT POSSIBLE :(")
    for (let i = 0; i < shortestPath.length; i++) {
        // await sleep(50)
        canvas.drawLineWithPos(shortestPath[i][0], shortestPath[i][1], 'black')
    }
}