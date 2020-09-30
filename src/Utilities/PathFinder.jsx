function PathFinder(startNode, endNode) {
    // Contains nodes that we have to visit
    let openSet = [];
    // Contains the nodes that we have already visited
    let closedSet = [];
    // Contains the best path from startNode to endNode
    let path = [];

    openSet.push(startNode);
    // Loop through all elements in the openSet
    while (openSet.length > 0) {
        // Compares f-value of openSet nodes to one another and assign node with lowest f-value to leastIdx variable
        let leastIdx = 0;
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[leastIdx].f) {
                leastIdx = i;
            }
        }

        // Define variable to hold node with lowest f-value in openSet
        let current = openSet[leastIdx];

        // Once the endNode is found then construct the path's array of nodes by moving backwards
        if (current === endNode) {
            let temp = current;
            path.push(temp);
            while (temp.previous) {
                path.push(temp.previous);
                temp = temp.previous;
            }

            return path;
        }

        // Remove the current element from the openSet and place it in the closedSet
        openSet = openSet.filter(elem => elem !== current);
        closedSet.push(current);

        let neighbors = current.neighbors;
        // Look through the four neighbors of the current element
        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];
            // Ensure that the neighbor is not already part of the closedSet
            if (!closedSet.includes(neighbor)) {
                let tempG = current.g + 1;
                let newPath = false;
                // Update the g-value of neighbor if it's part of the openSet
                if (openSet.includes(neighbor)) {
                    if (tempG < neighbor.g) {
                        neighbor.g = tempG;
                        newPath = true;
                    }
                // Otherwise add the neighbor to the openSet
                } else {
                    neighbor.g = tempG;
                    newPath = true;
                    openSet.push(neighbor);
                }
                // If newPath is now true then update the neighbor's f-value 
                if (newPath) {
                    neighbor.h = heuristic(neighbor, endNode);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous = current;
                }
            }
        }
    }

    return {path, error: "No path found!"}
}

function heuristic(a, b) {
    let d = Math.abs(a.x - a.y) + Math.abs(b.x - b.y);
    return d;
}

export default PathFinder;