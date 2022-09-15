import { createStore } from 'redux';
import * as actionTypes from './actions';

const initialNodes = new Array(9).fill(null).map((n, i) => {
    return {
        id: i,
        BTC: 0,
        previousHash: null,
        hash: null
    }
})

const initialState = { 
    target: -1, 
    inProgress: false,
    winnerNode: {
        id: null,
        BTC: null,
        previousHash: null,
        hash: null
    },
    highestFundsIndex: -1,
    nonce: 0,
    nodes: initialNodes,
    blocks: [],
    transactions: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_TARGET: {
            return {
                ...state,
                target: action.newTarget
            }
        }
        case actionTypes.SET_IN_PROGRESS: {
            return {
                ...state,
                inProgress: action.newProgress
            }
        }
        case actionTypes.SET_WINNER_NODE: {
            return {
                ...state,
                winnerNode: action.newWinner
            }
        }
        case actionTypes.SET_HIGHEST_FUNDS_INDEX: {
            return {
                ...state,
                highestFundsIndex: action.newIndex
            }
        }
        case actionTypes.SET_NONCE: {
            return {
                ...state,
                nonce: action.newNonce
            }
        }
        case actionTypes.SET_NODES: {
            return {
                ...state,
                nodes: action.newNodes
            }
        }
        case actionTypes.SET_BLOCKS: {
            return {
                ...state,
                blocks: action.newBlocks
            }
        }
        case actionTypes.SET_TRANSACTIONS: {
            return {
                ...state,
                transactions: action.newTransactions
            }
        }
        default:
            return state;
    }
}

const store = createStore(reducer);

export default store;