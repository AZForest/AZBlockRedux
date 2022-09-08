import React, {useEffect, useState} from "react";
import './NodeContainer.css';
import Node from '../../components/Node/Node';

function NodeContainer({address, inProgress, setInProgress, winnerNode, setWinnerNode, nonce, setNonce, nodes, setNodes}) {
    
    const [barProgress, setBarProgress] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
    const [guesses, setGuesses] = useState([0, 0, 0, 0]);

    useEffect(() => {
        if (inProgress) mine();
        else stopMining();
    }, [inProgress])

    useEffect(() => {
        console.log("checking");
        checkGuesses();
        setNonce(nonce + 1)
    }, guesses)

    const mine = () => {
        let i = 0
        let intId = setInterval(() => {
            //console.log("Mining");
            setBarProgress(i);
            i += 1;
            if (i > 100) {
                i = 10;
                generateGuesses();
            }
        }, 30) 
        
        setIntervalId(intId);
    }

    const stopMining = () => {
        clearInterval(intervalId);
    }

    const generateGuess = () => {
        return Math.floor(Math.random() * 20);
    }

    const generateGuesses = () => {
        let array = [
            generateGuess(),
            generateGuess(),
            generateGuess(),
            generateGuess()
        ]
        //console.log(array);
        setGuesses(array);
    }

    const checkGuesses = () => {
        let correctGuessIndex = -1;
        for (let i = 0; i < guesses.length; i++) {
            console.log("Guess: "  + guesses[i] + ". Target: " + address)
            if (guesses[i] == address) correctGuessIndex = i;
        }
        if (correctGuessIndex > -1) {
            setInProgress(false);
            setNonce(0);
            setWinnerNode({
                id: correctGuessIndex,
                BTC: winnerNode.BTC + 0.014
            })
            console.log(nodes);
            let currNodes = [...nodes];
            let winner = currNodes[correctGuessIndex];
            currNodes[correctGuessIndex] = {
                id: winner.id,
                BTC: winner.BTC + 5
            }
            setNodes(currNodes);
        }
    }

    return (
        <div className="NodeContainer">
            <Node id={0} progress={barProgress} guess={guesses[0]} mining={inProgress} didWin={0 == winnerNode.id} balance={nodes[0].BTC}/>
            <Node id={1} progress={barProgress} guess={guesses[1]} mining={inProgress} didWin={1 == winnerNode.id} balance={nodes[1].BTC}/>
            <Node id={2} progress={barProgress} guess={guesses[2]} mining={inProgress} didWin={2 == winnerNode.id} balance={nodes[2].BTC}/>
            <Node id={3} progress={barProgress} guess={guesses[3]} mining={inProgress} didWin={3 == winnerNode.id} balance={nodes[3].BTC}/>
        </div>
    )
}

export default NodeContainer;