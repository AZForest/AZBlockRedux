import React, { useState } from 'react';
import './Layout.css';
import NodeContainer from '../NodeContainer/NodeContainer';
import BlockchainContainer from '../BlockchainContainer/BlockchainContainer';
import InformationBar from '../InformationBar/InformationBar';

function Layout() {
    const [target, setTarget] = useState(0);
    const [inProgress, setInProgress] = useState(false);
    const [winnerNode, setWinnerNode] = useState({
        id: null,
        BTC: null
    });
    const [nonce, setNonce] = useState(0);
    const [nodes, setNodes] = useState([
        {id: 0, BTC: 0},
        {id: 1, BTC: 0},
        {id: 2, BTC: 0},
        {id: 3, BTC: 0},
    ])

    function refreshTarget() {
        let temp = Math.floor(Math.random() * 20);
        setInProgress(true);
        setTarget(temp);
    }

    return (
        <div className="Layout">
            <h4>Blockchain Simulator</h4>
            <BlockchainContainer />
            <div className="MidContainer">
                <InformationBar target={target} 
                                winnerNode={winnerNode.id}
                                nonce={nonce}/>
                <NodeContainer address={target} 
                        inProgress={inProgress} 
                        setInProgress={setInProgress}
                        winnerNode={winnerNode}
                        setWinnerNode={setWinnerNode}
                        nonce={nonce}
                        setNonce={setNonce}
                        nodes={nodes}
                        setNodes={setNodes}/>
            </div>
            
            <div className="StartButtonContainer">
                <button className="StartButton" onClick={refreshTarget}>Start</button>
                <button className="StopButton" onClick={() => setInProgress(false)}>Stop</button>
            </div>
            <br/>
            <br/>
        </div>
    )
}

export default Layout;