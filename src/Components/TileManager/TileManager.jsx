import React, { useState, useEffect } from 'react';
import Tile from '../Tile/Tile';

import './TileManager.css'

const TileManager = () => {
    const [tileList, setTileList] = useState([[]]);
    const [hasLoaded, setLoad] = useState(false);

    useEffect(() => {
        const grid = new Array(13);
        let k = 0;
        for (let col = 0; col < 13; col++) {
            grid[col] = new Array(28);
            for (let row = 0; row < 28; row++) {
                grid[col][row] = k;
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