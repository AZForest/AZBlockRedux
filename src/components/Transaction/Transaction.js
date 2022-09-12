import React from 'react';
import NodeContainer from '../../containers/NodeContainer/NodeContainer';
import './Transaction.css';
import colors from '../../utility/GlobalVars'

function Transaction({ info, index, inProgress }) {
    const selected = {
        backgroundColor: colors.primary,
        //boxShadow: "0 0 20px rgb(37,139,209)"
    }
    const notSelected = {
        backgroundColor: "#002b36",
        border: "none"
    }
    return (
        <div className="Transaction" style={index < 10 && !inProgress ? selected : notSelected}>
            <p>Transaction ID: {info.transactionId}</p>
            <p>Receive Address: {info.receiveAddress}</p>
            <p>Send Address: {info.sendAddress}</p>
            <p>BTC Amount: {info.btcAmount}</p>
            <p>Fee: {info.transactionFee}</p>
        </div>
    )
}

export default Transaction;