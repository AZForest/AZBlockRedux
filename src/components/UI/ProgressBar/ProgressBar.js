import React from 'react';
import './ProgressBar.css';

function ProgressBar({progress, bgColor, fillColor, textColor}) {
    const ParentDiv = {
        height: '15px',
        width: '250px',
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
        height: '100%',
        padding: 0,
        color: textColor,
        fontWeight: 700,
        fontSize: "12px",
        margin: 0

      }

    return (
        <div style={ParentDiv}>
            <div style={ChildDiv}>
                <span style={progresstext} className="progress-text">{progress}%</span>
            </div>
        </div>
    )
}

export default ProgressBar;