import React, { useEffect, useState } from 'react';
import './Layout.css';
import NodeContainer from '../NodeContainer/NodeContainer';
import BlockchainContainer from '../BlockchainContainer/BlockchainContainer';
import InformationBar from '../InformationBar/InformationBar';
import Modal from '../../components/UI/Modal/Modal';

function Layout() {
    const [target, setTarget] = useState(0);
    const [inProgress, setInProgress] = useState(false);
    const [winnerNode, setWinnerNode] = useState({
        id: null,
        BTC: null
    });
    const [highestBTC, setHighestBTC] = useState({
        id: null,
        BTC: null
    })
    const [nonce, setNonce] = useState(0);
    const [nodes, setNodes] = useState([
        {id: 0, BTC: 0},
        {id: 1, BTC: 0},
        {id: 2, BTC: 0},
        {id: 3, BTC: 0},
    ])
    const [modalActive, setModalActive] = useState(false);
    const [blocks, setBlocks] = useState([])

    useEffect(() => {
        if (inProgress) {
            refreshTarget()
        } 
    }, [inProgress])

    function refreshTarget() {
        let temp = Math.floor(Math.random() * 10);
        //setInProgress(true);
        setTarget(temp);
    }

    function getHighestBTC() {
        let highest = {id: -1, BTC: -1};
        nodes.forEach(node => {
            if (node.BTC > highest.BCT) {
                highest = node;
            }
        })
        //setHighestBTC(highest);
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
            <h4>Blockchain Simulator</h4>
            <BlockchainContainer winnerNode={winnerNode} blocks={blocks}/>
            <div className="MidContainer">
                <InformationBar target={target} 
                                winnerNode={winnerNode.id}
                                nonce={nonce}
                                highest={getHighestBTC()}/>
                <NodeContainer address={target} 
                        inProgress={inProgress} 
                        setInProgress={setInProgress}
                        winnerNode={winnerNode}
                        setWinnerNode={setWinnerNode}
                        nonce={nonce}
                        setNonce={setNonce}
                        nodes={nodes}
                        setNodes={setNodes}
                        setHighestBTC={setHighestBTC}
                        setModalActive={setModalActive}
                        blocks={blocks}
                        setBlocks={setBlocks}/>
            </div>
            
            <div className="StartButtonContainer">
                <button className="StartButton" onClick={() => setInProgress(true)}>Start</button>
                <button className="StopButton" onClick={() => setInProgress(false)}>Stop</button>
            </div>
            <button onClick={() => toggleModal()}>1</button>
            <br/>
            <br/>
        </div>
    )
}

export default Layout;