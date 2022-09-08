import React from 'react';
import './ProgressBar.css';

function ProgressBar({progress}) {
    const ParentDiv = {
        height: '20px',
        width: '300px',
        backgroundColor: 'whitesmoke',
        borderRadius: 40,
        margin: '10px auto'
      }

    const ChildDiv = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: "#6610f2",
        borderRadius: 40,
        textAlign: 'right'
    }

    const progresstext = {
        padding: 10,
        color: 'white',
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