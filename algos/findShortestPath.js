import { getRandomColor } from '../utils/utils.js'

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
        let deque = queue.shift(); // v

        const path = [...deque.path]
        path.push(deque.node)

        let [x, y] = deque.node;

        if (x === obj2.getPos().x && y === obj2.getPos().y) { 
            // Found shortest path
            shortestPath = deque.path
            break; 
        }

        if (legalMovement(x, y - 1, grid)) queue.push({ node: [x, y - 1], path: [...path] }); // top
        if (legalMovement(x + 1, y, grid)) queue.push({ node: [x + 1, y], path: [...path] }); // right
        if (legalMovement(x - 1, y, grid)) queue.push({ node: [x - 1, y], path: [...path] }); // left
        if (legalMovement(x, y + 1, grid)) queue.push({ node: [x, y + 1], path: [...path] }); // bottom
    }

    // if (!shortestPath.length) return console.log("NOT POSSIBLE :(")

    // Stop seeing player after certain amount of distance
    // if (shortestPath.length > 15) return;
    
    for (let i = 0; i < shortestPath.length; i++) {
        canvas.drawLineWithPos(shortestPath[i][0], shortestPath[i][1], getRandomColor())
    }
}