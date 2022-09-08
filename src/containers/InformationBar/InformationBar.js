import React from 'react';
import './InformationBar.css';

function InformationBar({target, winnerNode, nonce}) {
    return (
        <div className="InformationBar">
            <p>Last Round Winner: {winnerNode + 1}</p>
            <h3>Current Target: <span>{target}</span></h3>
            <p>Highest Funds: X</p>
            <p>Nonce: {nonce}</p>
        </div>
    )
}

export default InformationBar;