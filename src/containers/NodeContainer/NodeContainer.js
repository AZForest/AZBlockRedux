import React, {useEffect, useState, useLayoutEffect, useRef } from "react";
import './NodeContainer.css';
import Node from '../../components/Node/Node';

function NodeContainer({address, inProgress, setInProgress, winnerNode, setWinnerNode, nonce, setNonce, nodes, setNodes, blocks, setBlocks, transactions, setTransactions}) {
    
    const [barProgress, setBarProgress] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
    const [guesses, setGuesses] = useState([0, 0, 0, 0]);
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
          //isMounted.current = true;
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
            generateGuess()
        ]
        setGuesses(array);
    }

    const checkGuesses = () => {
        let correctGuessIndex = -1;
        for (let i = 0; i < guesses.length; i++) {
            //console.log("Guess: "  + guesses[i] + ". Target: " + address)
            if (guesses[i] == address) correctGuessIndex = i;
        }
        if (correctGuessIndex > -1) {
            setInProgress(false);
            setWinnerNode({
                id: correctGuessIndex,
                BTC: winnerNode.BTC + 5
            })
            let currNodes = [...nodes];
            let winner = currNodes[correctGuessIndex];
            currNodes[correctGuessIndex] = {
                id: winner.id,
                BTC: winner.BTC + 5
            }
            setNodes(currNodes);

            let topTransactions = transactions.slice(0, 5);
            
            
            let newBlock = {
                address: address,
                winnerIndex: correctGuessIndex,
                nonce: nonce,
                transactions: topTransactions
            }
            let currBlocks = [...blocks, newBlock];
            //console.log(currBlocks);
            setBuilding(true);
            setTimeout(() => {
                setTransactions(transactions.slice(5));
                setBlocks(currBlocks);
                setBuilding(false);
                setInProgress(true);
            }, 3000)

            /*setModalActive(true);
            setTimeout(() => {
                setModalActive(false)
            }, 5000);*/
        }
    }

    return (
        <div className="NodeContainer">
            <Node id={0} progress={barProgress} inProgress={inProgress} buildProgress={buildBarProgress} guess={guesses[0]} mining={inProgress} didWin={0 == winnerNode.id} balance={nodes[0].BTC}/>
            <Node id={1} progress={barProgress} inProgress={inProgress} buildProgress={buildBarProgress} guess={guesses[1]} mining={inProgress} didWin={1 == winnerNode.id} balance={nodes[1].BTC}/>
            <Node id={2} progress={barProgress} inProgress={inProgress} buildProgress={buildBarProgress} guess={guesses[2]} mining={inProgress} didWin={2 == winnerNode.id} balance={nodes[2].BTC}/>
            <Node id={3} progress={barProgress} inProgress={inProgress} buildProgress={buildBarProgress} guess={guesses[3]} mining={inProgress} didWin={3 == winnerNode.id} balance={nodes[3].BTC}/>
        </div>
    )
}

export default NodeContainer;