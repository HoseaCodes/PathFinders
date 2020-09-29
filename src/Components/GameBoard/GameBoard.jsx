import React, { useState, useEffect } from 'react';
import './GameBoard.css';
import Node from '../Node/Node';

const cols = 25;
const rows = 10;

const NODE_START_ROW = 0;
const NODE_START_COL = 0;
const NODE_END_ROW = rows - 1;
const NODE_END_COL = cols - 1;

const GameBoard = () => {
    const [Grid, setGrid] = useState([]);

    useEffect(() => {
        initalizedGrid();
    }, []);

    const initalizedGrid = () => {
        const grid = new Array(rows);

        for (let i = 0; i < rows; i++) {
            grid[i] = new Array(cols);
        }
        createSpot(grid);

        setGrid(grid)
    };

    const createSpot = (grid) => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                grid[i][j] = new Spot(i, j);

            }
        }
    }

    function Spot(i, j) {
        this.x = i;
        this.y = j;
        this.isStart = this.x === NODE_START_ROW && this.y === NODE_START_COL;
        this.isEND = this.x === NODE_START_ROW && this.y === NODE_START_COL;
        this.g = 0;
        this.f = 0;
        this.h = 0;
    }
    const gridwithNode = (
        <div>
            {Grid.map((row, rowIndex) => {
                return (
                    <div key={rowIndex} className='rowWrapper'>
                        {row.map((col, colIndex) => {
                            const { isStart, isEnd } = col;

                            return (
                                <Node key={colIndex} isStart={isStart} isEnd={isEnd} row={rowIndex} col={colIndex} />
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