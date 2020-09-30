import React from 'react'

import './Node.css'

const Node = ({ isStart, isEnd, row, col }) => {
    // Pass state to node so it knows if it is a start point or an end point and give the node the respective class
    const classInit = isStart ? 'nodeStart' : isEnd ? 'nodeEnd' : '';
    return (
        <div className={`node ${classInit}`} id={`nodeC${col}R${row}`}></div>
    )
}

export default Node;