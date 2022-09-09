import React from 'react';
import './Modal.css';

function Modal({winnerNode, target, nonce}) {
    return (
        <div className="Modal">
            <div className="Modal-content">
                <p>Node {winnerNode.id + 1} wins. New Block Address: {target} </p>
                <p>Nonce of new block: {nonce}</p>
                <p>Node {winnerNode.id} cash: {winnerNode.BTC} BTC</p>
                <p>Continuing in 7secs...</p>
            </div>
        </div>
    )
}

export default Modal;