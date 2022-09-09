import React from 'react';
import './ProgressBar.css';

function ProgressBar({progress, bgColor, fillColor, textColor}) {
    const ParentDiv = {
        height: '20px',
        width: '300px',
        backgroundColor: bgColor,
        borderRadius: 40,
        margin: '10px auto'
      }

    const ChildDiv = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: fillColor,
        borderRadius: 40,
        textAlign: 'right'
    }

    const progresstext = {
        padding: 10,
        color: textColor,
        fontWeight: 900
      }

    return (
        <div style={ParentDiv}>
            <div style={ChildDiv}>
                <span style={progresstext}>{progress}%</span>
            </div>
        </div>
    )
}

export default ProgressBar;