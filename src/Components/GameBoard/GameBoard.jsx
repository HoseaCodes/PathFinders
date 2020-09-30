import React, { useState, useEffect } from 'react';

import './GameBoard.css';
import Node from '../Node/Node';
import TileManager from '../TileManager/TileManager';
import PathFinder from '../../Utilities/PathFinder'


// These variables hold the dimensions of grid for when it's constructed
const cols = 25;
const rows = 15;

// Create variables that define where start point and end point are located
const nodeStartRow = 0;
const nodeStartCol = 0;
const nodeEndRow = rows - 1;
const nodeEndCol = cols - 1;

const GameBoard = () => {
    // Create grid constants and give a default empty value
    const [Grid, setGrid] = useState([]);
    const [Path, setPath] = useState([]);
    const [VisitedNodes, setVisitedNodes] = useState([]);

    // Initialize the grid before anything is rendered on the DOM
    useEffect(() => {
        initalizedGrid();
    }, []);

    // Create the grid internally utilizing the empty grid constants
    const initalizedGrid = () => {
        const grid = new Array(rows);

        // Iterate through all of the rows we have created and create an area of related columns
        for (let i = 0; i < rows; i++) {
            grid[i] = new Array(cols);
        }

        createSpot(grid);

        setGrid(grid);

        addNeighborsToGrid(grid);
        // Define start and end node and pass to the PathFinder algorithm
        const startNode = grid[nodeStartRow][nodeStartCol];
        const endNode = grid[nodeEndRow][nodeEndCol];
        let path = PathFinder(startNode, endNode);
        setPath(path.path);
        setVisitedNodes(path.visitedNodes)
    };

    // Iterate through all (x,y) positions and create a "spot" at each (x,y) location
    const createSpot = (grid) => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                grid[i][j] = new Spot(i, j);

            }
        }
    }

    // Add method to loop through spots in grid and add neighbors to them
    const addNeighborsToGrid = (grid) => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                grid[i][j].addNeighbors(grid);
            }
        }
    }

    // Spot Constructor where "i" is treated as the column and "j" is treated as the row
    function Spot(i, j) {
        this.x = i;
        this.y = j;
        // Specify the two properties for starting point and end point so "spot" knows when it's start or end when created
        this.isStart = this.x === nodeStartRow && this.y === nodeStartCol;
        this.isEnd = this.x === nodeEndRow && this.y === nodeEndCol;
        // These variables will come into play when implementing the A* algorithm
        this.g = 0;
        this.f = 0;
        this.h = 0;
        // add attributes that define neighboring spots and previous spot for pathfinder
        this.neighbors = [];
        this.previous = undefined;
        this.addNeighbors = function (grid) {
            let i = this.x;
            let j = this.y;
            // add columns to the left and right as neighbors w/o exceeding boundaries of grid
            if (i > 0) this.neighbors.push(grid[i - 1][j]);
            if (i < rows - 1) this.neighbors.push(grid[i + 1][j]);
            // add columns above and below as neighbors w/o exceeding boundaries of grid
            if (j > 0) this.neighbors.push(grid[i][j - 1]);
            if (j < cols - 1) this.neighbors.push(grid[i][j + 1])
        }
    }

    // Uses previously created grid to construct grid with nodes placed in respective (x,y) coordinates
    const gridWithNode = (
        <div>
            {Grid.map((row, rowIndex) => {
                return (
                    <div key={rowIndex} className='rowWrapper'>
                        {row.map((col, colIndex) => {
                            const { isStart, isEnd } = col;

                            return (
                                <Node
                                    key={colIndex}
                                    isStart={isStart}
                                    isEnd={isEnd}
                                    row={rowIndex}
                                    col={colIndex}
                                />
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );

    const visualizeShortestPath = (shortestPathNodes) => {
        for (let i = 0; i < shortestPathNodes.length; i++) {
            setTimeout(() => {
                const node = shortestPathNodes[i];
                document.getElementById(`node-${node.x}-${node.y}`).className = 'node node-shortest-path';
            }, 10 * i);
        }
    };
    const visualizePath = () => {
        for (let i = 0; i < VisitedNodes.length; i++) {
            if (i === VisitedNodes.length) {
                setTimeout(() => {
                    visualizeShortestPath(Path)
                }, 20 * i);
            } else {
                setTimeout(() => {
                    const node = VisitedNodes[i];
                    document.getElementById(`node-${node.x}-${node.y}`).className = 'node node-visited';
                }, 20 * i);
            }
        }
    };
    console.log(Path);

    return (
        <div className='gameboard'>
            <button onClick={visualizePath}>Visualize Path</button>
            <h1>
                GameBoard
            </h1>
            {/* {gridWithNode} */}
            <TileManager />
        </div>
    );
}

export default GameBoard;