import React, { useState, useEffect } from 'react';
import './BlockchainContainer.css';
import Block from '../../components/UI/Block/Block';

function BlockchainContainer({winnerNode, blocks}) {
    const [currentWinner, setCurrentWinner] = useState(winnerNode);
    const [blocksArray, setBlocksArray] = useState(blocks);

    useEffect(() => {
        console.log(blocksArray);
        setBlocksArray(blocks);
    },[blocks])

    

    return (
        <div className="BlockchainContainer">
            {blocksArray.map(block => {
                return (
                <div className="block-row">
                    <Block />
                    <p className="arrow">-{'>'}</p>
                </div>
                )
            })}
        </div>
    )
}

export default BlockchainContainer;