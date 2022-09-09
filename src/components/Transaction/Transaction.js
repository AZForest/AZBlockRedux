import React from 'react';
import NodeContainer from '../../containers/NodeContainer/NodeContainer';
import './Transaction.css';

function Transaction({ info, index, inProgress }) {
    const selected = {
        backgroundColor: "#6610f2",
        borderShadow: "0 0 0 20px #6610f2"
    }
    const notSelected = {
        backgroundColor: "#002b36",
        border: "none"
    }
    return (
        <div className="Transaction" style={index < 5 && !inProgress ? selected : notSelected}>
            <p>Transaction ID: {info.transactionId}</p>
            <p>Receive Address: {info.receiveAddress}</p>
            <p>Send Address: {info.sendAddress}</p>
            <p>BTC Amount: {info.btcAmount}</p>
            <p>Fee: {info.transactionFee}</p>
        </div>
    )
}

export default Transaction;