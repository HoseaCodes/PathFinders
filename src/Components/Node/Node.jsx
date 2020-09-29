import React from 'react'

import './Node.css'

const Node = ({ isStart, isEnd, row, col }) => {
    // Pass state to node so it knows if it is a start point or an end point and give the node the respective class
    const classes = isStart ? 'node-start' : isEnd ? 'node-end' : '';
    return (
        <div className={`node ${classes}`} id={`node-${row}-${col}`}></div>
    )
}

export default Node;