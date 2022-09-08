import React from "react";
import './Node.css';
import ComputerImage from "../../assets/images/computerImage1.png";
import ProgressBar from '../../components/UI/ProgressBar/ProgressBar';

function Node({id, progress, guess, mining, didWin, balance}) { 
    const winBorder = {
        border: "5px solid #6610f2",
        boxShadow: "0px 0px 20px #6610f2"
    }
    return (
        <div className="Node" style={didWin ? winBorder : {border: "none"}}>
            <h3>Node {id + 1}</h3>
            <div className="GuessContainer">
                <div className="sub-GuessContainer">
                    <div id="Guess">Guess: <span>{guess}</span></div>
                    <div style={{fontWeight: "700"}}>Total BTC: {balance}</div>
                </div>
                
                <div className="ComputerImageContainer">
                    <img src={ComputerImage} height={180} width={180}/>
                </div>
                
            </div>  
            {mining ? <p id="Mining">Mining...</p> : ""}
            <ProgressBar progress={progress}/>
        </div>
    )
}

export default Node;