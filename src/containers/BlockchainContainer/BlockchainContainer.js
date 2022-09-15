import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './BlockchainContainer.css';
import Block from '../../components/UI/Block/Block';
import colors from '../../utility/GlobalVars';

function BlockchainContainer() {

    const winnerNode = useSelector(state => state.winnerNode);
    const blocks = useSelector(state => state.blocks);
    //const [blocksArray, setBlocksArray] = useState(blocks);
    const [borderActive, setBorderActive] = useState(false);

    useEffect(() => {
        if (winnerNode.id != null) {
            setBorderActive(true);
            setTimeout(() => {
                setBorderActive(false);
            }, 3000)
        }
    }, [winnerNode])

    /*useEffect(() => {
        setBlocksArray(blocks);
    },[blocks])*/

    const rotatingBorder = {
        border: "2px dashed " + colors.primary
    }

    const backgroundColor = {
        color: colors.primary
    }

    return (
        <>
            <br/>
            <div className="BlockchainContainer" style={borderActive ? rotatingBorder : {border: "none"}}>
                {blocks.map((block, index) => {
                    return (
                    <div className="block-row" key={index} >
                        <Block key={index} index={index} info={block}/>
                        <p className="arrow" style={backgroundColor}>-</p>
                    </div>
                    )
                })}
            </div>
        </>
    )
}

export default BlockchainContainer;