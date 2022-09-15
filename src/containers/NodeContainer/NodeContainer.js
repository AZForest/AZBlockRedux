import React, {useEffect, useState, useLayoutEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import './NodeContainer.css';
import Node from '../../components/Node/Node';
import * as actionTypes from '../../store/actions';

function NodeContainer() {
    
    const dispatch = useDispatch();
    const target = useSelector(state => state.target);

    const inProgress = useSelector(state => state.inProgress);
    const setInProgress = (val) => {
        dispatch({ type: actionTypes.SET_IN_PROGRESS, newProgress: val });
    }

    const winnerNode = useSelector(state => state.winnerNode);
    const setWinnerNode = (winner) => {
        dispatch({ type: actionTypes.SET_WINNER_NODE, newWinner: winner });
    }

    const nonce = useSelector(state => state.nonce);
    const setNonce = (value) => {
        dispatch({ type: actionTypes.SET_NONCE, newNonce: value })
    }

    const nodes = useSelector(state => state.nodes);
    const setNodes = (newN) => {
        dispatch({ type: actionTypes.SET_NODES, newNodes: newN });
    }

    const blocks = useSelector(state => state.blocks);
    const setBlocks = (newBlocks) => {
        dispatch({ type: actionTypes.SET_BLOCKS, newBlocks: newBlocks });
    }

    const transactions = useSelector(state => state.transactions);
    const setTransactions = (newT) => {
        dispatch({ type: actionTypes.SET_TRANSACTIONS, newTransactions: newT });
    }

    const initialGuesses = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    
    const [barProgress, setBarProgress] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
    const [guesses, setGuesses] = useState(initialGuesses);
    const [countMounted, setCountMounted] = useState(0);
    const [building, setBuilding] = useState(false)
    const [buildBarProgress, setBuildBarProgress] = useState(0);

    useEffect(() => {
        if (inProgress) mine();
        else stopMining();
    }, [inProgress])

    useEffect(() => {
        if (building) build();
        else setBuilding(false)
    }, [building])

    useEffect(() => {
        if (countMounted >= 1) {
          checkGuesses();
          setNonce(nonce + 1);
        } else {
          let newVal = countMounted + 1;
          setCountMounted(newVal);
        }
    }, [guesses]);

    const mine = () => {
        let i = 0
        let intId = setInterval(() => {
            setBarProgress(i);
            i += 1;
            if (i > 100) {
                i = 10;
                generateGuesses();
            }
        }, 30) 
        setIntervalId(intId);
    }

    const build = () => {
        let i = 0
        let intId = setInterval(() => {
            setBuildBarProgress(i);
            i += 1;
            if (i > 100) {
                i = 10;
            }
        }, 30)
        setTimeout(() => {
            clearInterval(intId);
        }, 3000) 
        
    }

    const stopMining = () => {
        clearInterval(intervalId);
    }

    const generateGuess = () => {
        return Math.floor(Math.random() * 10);
    }

    const generateGuesses = () => {
        let array = [
            generateGuess(),
            generateGuess(),
            generateGuess(),
            generateGuess(),
            generateGuess(),
            generateGuess(),
            generateGuess(),
            generateGuess(),
            generateGuess(),
        ]
        setGuesses(array);
    }

    const resetGuesses = () => {
        setGuesses(initialGuesses);
    }

    const computeHash = (prevHash, winIndex, transactions, timestamp) => {
        //previous hash, winningIndex, transactionIds, timestamp
        //index * sum(transactionIds) * timestamp
        console.log(transactions)
        let idSum = 0;
        transactions.forEach(t => {
            idSum += t.transactionId
        });
        //const idSum = transactions.reduce((a, b) => a.transactionId + b.transactionId);
        const product = (winIndex + 1) * idSum * timestamp;
        if (!prevHash) {
            console.log("Null the first time");
            return product.toString(16);
        }
        const prevHashToDecimal = parseInt(prevHash + "", 16);
        // (prevhash * product) * 0.33
        //console.log(prevHashToDecimal % 1000000000000000)
        const preHex = prevHashToDecimal * product;
        const newHash = preHex.toString(16);
        //return newHash;
        return product.toString(16);
    }

    const checkGuesses = () => {
        let correctGuessIndex = -1;
        for (let i = 0; i < guesses.length; i++) {
            //console.log("Guess: "  + guesses[i] + ". Target: " + address)
            if (guesses[i] == target) correctGuessIndex = i;
        }
        if (correctGuessIndex > -1) {
            setInProgress(false);

            let topTransactions = transactions.slice(0, 10);
            let timestamp = Date.now();
            const prevWinner = winnerNode;
            const newHash = computeHash(
                prevWinner.hash, correctGuessIndex, topTransactions, timestamp);
            
            //console.log(prevWinner.hash);
            console.log(newHash);
            let currNodes = [...nodes];
            let preWinner = currNodes[correctGuessIndex];
            let uWinner = {
                previousHash: prevWinner.hash,
                hash: newHash,
                id: preWinner.id,
                BTC: preWinner.BTC + 5
            }
            currNodes[correctGuessIndex] = uWinner;
            setNodes(currNodes);
            setWinnerNode(uWinner);
            /*let winner = currNodes[correctGuessIndex];
            currNodes[correctGuessIndex] = {
                previousHash: prevWinner.hash,
                hash: newHash,
                id: winner.id,
                BTC: winner.BTC + 5
            }
            setNodes(currNodes);

            setWinnerNode({
                previousHash: prevWinner.hash,
                hash: newHash,
                id: correctGuessIndex,
                BTC: winner.BTC + 5,
            })*/
            
            
            let newBlock = {
                prevAddress: prevWinner.hash,
                address: newHash,
                winnerIndex: correctGuessIndex,
                nonce: nonce,
                transactions: topTransactions
            }
            let currBlocks = [...blocks, newBlock];
            setBuilding(true);
            setTimeout(() => {
                setTransactions(transactions.slice(10));
                setBlocks(currBlocks);
                setBuilding(false);
                resetGuesses();
                setInProgress(true);
            }, 3000)
        }
    }

    return (
        <div className="NodeContainer">
            {nodes.map((n, index) => {
                return <Node key={index}
                        id={index} 
                        progress={barProgress} 
                        inProgress={inProgress} 
                        buildProgress={buildBarProgress} 
                        guess={guesses[index]} 
                        mining={inProgress} 
                        didWin={index == winnerNode.id}
                        balance={nodes[index].BTC}/>
            })}
        </div>
    )
}

export default NodeContainer;