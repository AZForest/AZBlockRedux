import React from "react";
import './Node.css';
import ComputerImage from "../../assets/images/computerImage1.png";
import ProgressBar from '../../components/UI/ProgressBar/ProgressBar';

function Node({id, progress, buildProgress, inProgress, guess, mining, didWin, balance}) { 
    const winBox = {
        backgroundColor: "#6610f2",
        boxShadow: "0px 0px 20px #6610f2"
    }
    return (
        <div className="Node" style={didWin && !inProgress ? winBox : {border: "none"}}>
            <h3>Node {id + 1} {didWin && !inProgress ? "Wins!" : ""}</h3>
            <div className="GuessContainer">
                <div className="sub-GuessContainer">
                    <div id="Guess">Guess: <span>{guess}</span></div>
                    <div style={{fontWeight: "700"}}>Total BTC: {balance}</div>
                </div>
                
                <div className="ComputerImageContainer">
                    <img src={ComputerImage} height={150} width={150}/>
                </div>
                
            </div>  
            {didWin && !inProgress ? <p id="AddingNewBlock">Adding new Block ...</p> : <p id="Mining">Mining...</p>}
            {didWin && !inProgress ? 
            <ProgressBar progress={buildProgress} bgColor={"#6610f2"} fillColor={"white"} textColor={"#6610f2"}/> : 
            <ProgressBar progress={progress} bgColor={"whitesmoke"} fillColor={"#6610f2"} textColor={"white"}/>}
        </div>
    )
}

export default Node;