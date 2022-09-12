import React, { useEffect, useState } from 'react';
import './Layout.css';
import NodeContainer from '../NodeContainer/NodeContainer';
import BlockchainContainer from '../BlockchainContainer/BlockchainContainer';
import InformationBar from '../InformationBar/InformationBar';
import MempoolContainer from '../MempoolContainer/MempoolContainer';
import Modal from '../../components/UI/Modal/Modal';

function Layout() {
    const [target, setTarget] = useState(0);
    const [inProgress, setInProgress] = useState(false);
    const [winnerNode, setWinnerNode] = useState({
        id: null,
        BTC: null,
        previousHash: null
    });
    //const [winnerNode, setWinnerNode] = useState(null);
    const [highestFunds, setHighestFunds] = useState({
        id: 0,
        BTC: 0
    })
    const [nonce, setNonce] = useState(0);
    const [nodes, setNodes] = useState([
        {id: 0, BTC: 0},
        {id: 1, BTC: 0},
        {id: 2, BTC: 0},
        {id: 3, BTC: 0},
        {id: 4, BTC: 0},
        {id: 5, BTC: 0},
        {id: 6, BTC: 0},
        {id: 7, BTC: 0},
        {id: 8, BTC: 0},
    ])
    const [modalActive, setModalActive] = useState(false);
    const [blocks, setBlocks] = useState([])
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        if (inProgress) {
            refreshTarget()
        } 
    }, [inProgress])

    useEffect(() => {
        setHighestFunds(getHighestBTC());
        setTimeout(() => {
            setNonce(0);
        }, 3000)
    }, [nodes])

    function refreshTarget() {
        let temp = Math.floor(Math.random() * 20);
        setTarget(temp);
    }

    function getHighestBTC() {
        let highest = {id: 0, BTC: 0};
        let val = -1;
        nodes.forEach(node => {
            if (node.BTC > highest.BTC) {
                highest = node;
            }
        })
        return highest;
    }

    function toggleModal() {
        setModalActive(true)
        setTimeout(() => {
            setModalActive(false)
        }, 7000)
    }

    return (
        <div className="Layout">
            {modalActive ? <Modal 
                            winnerNode={winnerNode}
                            target={target}
                            nonce={nonce}/> : ""}
            <h4 id="title">Blockchain Simulator</h4>
            <BlockchainContainer winnerNode={winnerNode} blocks={blocks}/>
            <div className="MidContainer">
                <InformationBar target={target} 
                                winnerNode={winnerNode.id}
                                nonce={nonce}
                                highest={highestFunds}/>
                <NodeContainer address={target} 
                        inProgress={inProgress} 
                        setInProgress={setInProgress}
                        winnerNode={winnerNode}
                        setWinnerNode={setWinnerNode}
                        nonce={nonce}
                        setNonce={setNonce}
                        nodes={nodes}
                        setNodes={setNodes}
                        setModalActive={setModalActive}
                        blocks={blocks}
                        setBlocks={setBlocks}
                        transactions={transactions}
                        setTransactions={setTransactions}/>
            </div>
            
            <div className="StartButtonContainer">
                <button className="StartButton" onClick={() => setInProgress(true)}>Start</button>
                <button className="StopButton" onClick={() => setInProgress(false)}>Stop</button>
            </div>
            <MempoolContainer inProgress={inProgress} transactions={transactions} setTransactions={setTransactions}/>
            <button onClick={() => toggleModal()}>1</button>
            <br/>
            <br/>
        </div>
    )
}

export default Layout;