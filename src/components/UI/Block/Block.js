import React, {useState} from 'react';
import './Block.css';
import colors from '../../../utility/GlobalVars'

function Block({index, info}) {

    const [activeInfo, setActiveInfo] = useState(false);

    const backgroundColor = {
        backgroundColor: colors.primary
    }

    //onClick={activeInfo ? () => setActiveInfo(false) : ""}
    return (
        <>
            <div className="Block" onClick={() => setActiveInfo(!activeInfo)} style={backgroundColor}>
                <div id="BlockWinner">{info.winnerIndex + 1}</div>
            </div>
            {activeInfo ? 
            <div className="BlockBg" >
                <div className="BlockInfo">

                    <div id="block-x" onClick={() => setActiveInfo(false)}>x</div>
                    <h2>Block #{index + 1}</h2>
                    <div className="BlockTable">
                        <p>Address: {info.address}</p>
                        <p>Previous Address: {info.prevAddress}</p>
                        <p>Winning Miner: {info.winnerIndex + 1}</p>
                        <p>Nonce: {info.nonce}</p>
                    </div>
                    <h4 id="block-transactions">Transactions</h4>
                    <div className="Transactions-Div">
                        {info.transactions.map((t, index) => {
                        return (
                            <div className="Transactions-Row">
                                <p>({index}):</p>
                                <p>Transaction-id: {t.transactionId}</p>
                                <p>Receive-Address: {t.receiveAddress}</p>
                                <p>Send-Address: {t.receiveAddress}</p>
                                <p>Btc-Amount: {t.btcAmount}</p>
                            </div>
                            )
                        })}
                    </div>
                </div>
            </div> : ""}
        </>
        
    )
}

export default Block;