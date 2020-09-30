import React, { useState, useEffect } from 'react';
import './Tile.css'


const Tile = ({ row, col }) => {
    const [tileNeighbor, setTileNeighbor] = useState([]);

    useEffect(() => {

    })

    const clickTile = () => {
        console.log('Clicked!')
    }

    return (
        <div className={`node`} id={`node-${row}-${col}`} onClick={clickTile}></div>
    );
}

export default Tile;