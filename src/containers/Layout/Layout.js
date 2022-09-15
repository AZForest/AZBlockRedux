import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Layout.css';
import NodeContainer from '../NodeContainer/NodeContainer';
import BlockchainContainer from '../BlockchainContainer/BlockchainContainer';
import InformationBar from '../InformationBar/InformationBar';
import MempoolContainer from '../MempoolContainer/MempoolContainer';
import * as actionTypes from '../../store/actions';


function Layout() {
    const dispatch = useDispatch();
    const inProgress = useSelector(state => state.inProgress);
    const setHighestFundsIndex = (index) => {
        dispatch({ type: actionTypes.SET_HIGHEST_FUNDS_INDEX, newIndex: index });
    }
    const nodes = useSelector(state => state.nodes);
    const setNonce = () => {
        dispatch({ type: actionTypes.SET_NONCE, newNonce: 0 });
    }
    //const [target, setTarget] = useState(-1);
    //const [inProgress, setInProgress] = useState(false);
    /*const [winnerNode, setWinnerNode] = useState({
        id: null,
        BTC: null,
        previousHash: null
    });*/
    /*const [highestFunds, setHighestFunds] = useState({
        id: 0,
        BTC: 0
    })*/
    //const [nonce, setNonce] = useState(0);
    /*const [nodes, setNodes] = useState([
        {id: 0, BTC: 0},
        {id: 1, BTC: 0},
        {id: 2, BTC: 0},
        {id: 3, BTC: 0},
        {id: 4, BTC: 0},
        {id: 5, BTC: 0},
        {id: 6, BTC: 0},
        {id: 7, BTC: 0},
        {id: 8, BTC: 0},
    ])*/
    //const [blocks, setBlocks] = useState([])
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        if (inProgress) {
            setTarget()
        } 
    }, [inProgress])

    useEffect(() => {
        setHighestFundsIndex(getHighestFundsIndex());
        setTimeout(() => {
            setNonce(0);
        }, 3000)
    }, [nodes])

    const setTarget = () => {
        let temp = Math.floor(Math.random() * 10);
        dispatch({ type: actionTypes.SET_TARGET, newTarget: temp })
    }

    const setInProgress = (value) => {
        dispatch({ type: actionTypes.SET_IN_PROGRESS, newProgress: value });
    }

    function getHighestFundsIndex() {
        let highest = 0;
        let highestIndex = -1;
        nodes.forEach((node, i) => {
            if (node.BTC > highest) {
                highest = node.BTC;
                highestIndex = i;
            }
        })
        return highest === 0 ? -1 : highestIndex;
    }

    return (
        <div className="Layout">
            <h4 id="title">Blockchain Simulator</h4>
            <BlockchainContainer />
            <div className="MidContainer">
                <InformationBar />
                <NodeContainer />
            </div>
            <div className="StartButtonContainer">
                <button className="StartButton" onClick={() => setInProgress(true)}>Start</button>
                <button className="StopButton" onClick={() => setInProgress(false)}>Stop</button>
            </div>
            <MempoolContainer />
            <br/>
            <br/>
        </div>
    )
}

export default Layout;