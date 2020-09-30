import React, { useState, useEffect } from 'react';
import Tile from '../Tile/Tile';

import './TileManager.css'

const TileManager = () => {
    const [tileList, setTileList] = useState([[]]);
    const [hasLoaded, setLoad] = useState(false);
    useEffect(() => {
        const grid = new Array(20);
        let k = 0;
        for (let i = 0; i < 20; i++) {
            grid[i] = new Array(20);
            for (let j = 0; j < 20; j++) {
                grid[i][j] = k;
                k++;
            }
        }
        console.log('Rendering');
        setTileList(grid);
    }, []);

    useEffect(() => {
        if (tileList.length > 0) {
            console.log('Re-rendering ');
            setLoad(true);
        }
    }, [tileList]);


    return (
        <div>
            {hasLoaded ?
                (<div>
                    <div>Loaded</div>
                    <div className='tile-grid'>
                        {tileList.map((el, i) => (
                            <div className='tile-wrap'>
                                {tileList[i].map((el, j) => (
                                    <Tile key={el} row={i} col={j} />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>)
                : (<div>Loading</div>)
            }
        </div>
    );
}

export default TileManager;