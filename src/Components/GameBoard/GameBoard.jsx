import React, { useState, useEffect } from 'react';

import Node from '../Node/Node';
import './GameBoard.css';

// These variables hold the dimensions of grid for when it's constructed
const cols = 25;
const rows = 10;

// Create variables that define where start point and end point are located
const NODE_START_ROW = 0;
const NODE_START_COL = 0;
const NODE_END_ROW = rows - 1;
const NODE_END_COL = cols - 1;

const GameBoard = () => {
    // Create grid constants and give a default empty value
    const [Grid, setGrid] = useState([]);

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

        setGrid(grid)
    };

    // Iterate through all (x,y) positions and create a "spot" at each (x,y) location
    const createSpot = (grid) => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                grid[i][j] = new Spot(i, j);

            }
        }
    }

    // Spot Constructor where "i" is treated as the column and "j" is treated as the row
    function Spot(i, j) {
        this.x = i;
        this.y = j;
        // Specify the two properties for starting point and end point so "spot" knows when it's start or end when created
        this.isStart = this.x === NODE_START_ROW && this.y === NODE_START_COL;
        this.isEnd = this.x === NODE_END_ROW && this.y === NODE_END_COL;
        // These variables will come into play when implementing the A* algorithm
        this.g = 0;
        this.f = 0;
        this.h = 0;
    }

    // Uses previously created grid to construct grid with nodes placed in respective (x,y) coordinates
    const gridwithNode = (
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

    return (
        <div className='gameboard'>
            <h1>
                GameBoard
            </h1>
            {gridwithNode}
        </div>
    );
}

export default GameBoard;