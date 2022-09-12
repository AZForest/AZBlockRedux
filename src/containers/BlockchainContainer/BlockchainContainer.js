import React, { useState, useEffect } from 'react';
import './BlockchainContainer.css';
import Block from '../../components/UI/Block/Block';
import colors from '../../utility/GlobalVars';

function BlockchainContainer({winnerNode, blocks}) {
    const [currentWinner, setCurrentWinner] = useState(winnerNode);
    const [blocksArray, setBlocksArray] = useState(blocks);

    useEffect(() => {
        //console.log(blocksArray);
        setBlocksArray(blocks);
    },[blocks])

    const backgroundColor = {
        color: colors.primary
    }

    return (
        <>
            <br/>
            <div className="BlockchainContainer">
                {blocksArray.map((block, index) => {
                    return (
                    <div className="block-row" key={index} >
                        <Block key={index} index={index} info={block}/>
                        <p className="arrow" style={backgroundColor}>-{'>'}</p>
                    </div>
                    )
                })}
            </div>
        </>
    )
}

export default BlockchainContainer;