import React from 'react';
import './InformationBar.css';

function InformationBar({target, winnerNode, nonce, highest}) {
    return (
        <div className="InformationBar">
            <p>Last Round Winner: {winnerNode + 1}</p>
            <h3>Current Target: <span>{target}</span></h3>
            <p>Highest Funds: {highest.id === -1 ? 
                              <p> N/A </p> : <p>Node {highest.id} ({highest.BTC})</p>}</p>
            <p>Nonce: {nonce}</p>
        </div>
    )
}

export default InformationBar;