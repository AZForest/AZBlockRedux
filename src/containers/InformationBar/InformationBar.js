import React, { useEffect, useState } from 'react';
import './InformationBar.css';

function InformationBar({target, winnerNode, nonce, highest}) {

    const [highestFund, setHighestFund] = useState(highest);

    useEffect(() => {
        console.log(highestFund);
        setHighestFund(highest);
    }, [highest])

    return (
        <div className="InformationBar">
            <p>Last Round Winner: Miner {winnerNode + 1}</p>
            <h3>Current Target: <span>{target}</span></h3>
            <p>Highest Funds: {highestFund.id === 0 ? 
                              <p> N/A </p> : <p>Miner {highestFund.id + 1} ({highestFund.BTC}) BTC</p>}</p>
            <p>Nonce: {nonce}</p>
        </div>
    )
}

export default InformationBar;