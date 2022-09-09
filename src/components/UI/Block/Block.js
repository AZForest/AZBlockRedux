import React, {useState} from 'react';
import './Block.css';

function Block({index, info}) {

    const [activeInfo, setActiveInfo] = useState(false);

    return (
        <>
            <div className="Block" onClick={() => setActiveInfo(!activeInfo)}>

            </div>
            {activeInfo ? 
            <div className="BlockBg">
                <div className="BlockInfo">
                    <p>Block #{index}</p>
                    <p>Address: {info.address}</p>
                    <p>Winning Miner: {info.winnerIndex + 1}</p>
                    <p>Nonce: {info.nonce}</p>
                    <p>Transations: </p>
                    {info.transactions.map(t => {
                        return <p>{t.transactionId}</p>
                    })}
                </div>
            </div> : ""}
        </>
        
    )
}

export default Block;