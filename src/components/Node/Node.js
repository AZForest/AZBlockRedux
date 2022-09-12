import React from "react";
import './Node.css';
import ComputerImage from "../../assets/images/computerImage1.png";
import ProgressBar from '../../components/UI/ProgressBar/ProgressBar';
import colors from '../../utility/GlobalVars';

function Node({id, progress, buildProgress, inProgress, guess, mining, didWin, balance}) { 
    const winBox = {
        backgroundColor: colors.primary,
        boxShadow: "0px 0px 20px " + colors.primary
    }
    return (
        <div className="Node" style={didWin && !inProgress ? winBox : {border: "none"}}>
            <div className="GuessContainer">
                <div className="sub-GuessContainer">
                    <h3>Node {id + 1} {didWin && !inProgress ? "Wins!" : ""}</h3>
                    <div id="Guess">Guess: <span>{guess}</span></div>
                    <div style={{fontWeight: "700", fontSize: "12px"}}>Total BTC: {balance}</div>
                </div>
                
                <div className="ComputerImageContainer">
                    <img src={ComputerImage} height={75} width={75}/>
                </div>
                
            </div>  
            {didWin && !inProgress ? <p id="AddingNewBlock">Adding new Block ...</p> : <p id="Mining">Mining...</p>}
            {didWin && !inProgress ? 
            <ProgressBar progress={buildProgress} bgColor={colors.primary} fillColor={"gainsboro"} textColor={colors.primary}/> : 
            <ProgressBar progress={progress} bgColor={"gainsboro"} fillColor={colors.primary} textColor={"gainsboro"}/>}
        </div>
    )
}

export default Node;