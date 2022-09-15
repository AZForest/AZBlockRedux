import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './InformationBar.css';
import colors from '../../utility/GlobalVars';

function InformationBar() {

    const target = useSelector(state => state.target);
    const winnerNode = useSelector(state => state.winnerNode);
    const nonce = useSelector(state => state.nonce);
    const nodes = useSelector(state => state.nodes);
    const highestFundsIndex = useSelector(state => state.highestFundsIndex);

    const backgroundColor = {
        backgroundColor: colors.primary
    }

    /*const tester = () => {
        console.log(highestFundsIndex);
        console.log(nodes);
    }*/

    return (
        <div className="InformationBar">
            {/*<p>{tester()}</p>*/}
            <p>Last Round Winner: Miner {winnerNode.id !== null ? winnerNode.id + 1 : "X"}</p>
            <h3 style={backgroundColor}>Current Target: <span>{target}</span></h3>
            <p>Highest Funds: {highestFundsIndex === -1 ? 
                              <p> N/A </p> : <p>Miner {highestFundsIndex + 1} ({nodes[highestFundsIndex].BTC}) BTC</p>}</p>
            <p>Nonce: {nonce}</p>
        </div>
    )
}

export default InformationBar;