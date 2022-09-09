import React, { useState, useEffect } from 'react';
import './MempoolContainer.css';
import Transaction from '../../components/Transaction/Transaction';

const MempoolContainer = ({inProgress, transactions, setTransactions}) => {

    const [memory, setMemory] = useState(transactions);
    const [intervalId, setIntervalId] = useState(null);
    const [time, setTime] = useState(0);

    useEffect(()=> {
        setMemory(transactions)
    }, [transactions])

    useEffect(() => {
        if (inProgress) ticktock();
        else clearInterval(intervalId);
    }, [inProgress])

    useEffect(() => {
        //generateTransactions();
        //ticktock();
    }, [])

    useEffect(() => {
        const newTransaction = generateTransaction();
        setMemory([ ...memory, newTransaction]);
        setTransactions([ ...memory, newTransaction]);
    }, [time])

    function ticktock() {
        let i = 0
        let intId = setInterval(() => {
            setTime(i);
            i++;
        }, 1000)
        setIntervalId(intId);
    }

    function generateTransaction() {
        const newTrans = {
            transactionId: Math.floor(Math.random() * 1000),
            receiveAddress: Math.floor(Math.random() * 100000),
            sendAddress: Math.floor(Math.random() * 100000),
            btcAmount: Math.floor(Math.random()),
            transactionFee: Math.floor(Math.random() * 2)
        }
        return newTrans;
    }

    function generateTransactions() {
        console.log("Generating...")
        let newCount = 0;
        let transArray = [];
        let intId = setInterval(() => {
            let newTrans = generateTransaction();
            //console.log(newTrans);
            transArray.push(newTrans);
            //let updatedMemory = [ ...memory, newTrans ];
            console.log(memory);
            let arrayCopy = transArray;
            //newCount++;
            //console.log(newCount);
            //setCount(newCount)
        }, 1000)
        setMemory(transArray);

        setIntervalId(intId);
    }

    return (
        <div className="MempoolContainer">
            <h4>Transaction Memory Pool</h4>
            {memory.map((t, index) => {
                return <Transaction key={index} index={index} info={t} inProgress={inProgress} />
            })}
            <br />
        </div>
    )
}

export default MempoolContainer;