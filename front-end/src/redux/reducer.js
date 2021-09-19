import { FETCHCARDS, HANDLECARDCLICK, CHECKMATCH, CHECKFINISH, HANDLERESTART, SETCATEGORY, VSCOMP, COMPUTERMOVE, SOLO, MULTI, TOGGLEDISABLE } from './Constants';

const initialState = {
    cards: [],
    category: '',
    turnedCards: [],
    turnedCardsId: [],
    matchingCards: [],
    disable: false,
    finish: false,
    moves: 0,
    // gameMode: localStorage.getItem("gameMode"),
    // solo: localStorage.getItem("solo"),
    // vsComp: localStorage.getItem("vsComp"),
    // multiPlayer: localStorage.getItem("multi"),
    compTurn: false,
    computerMoves: 0
}

const reducer = (state=initialState,action={}) => {
    switch(action.type) {
        // case SOLO:
        //     return { ...state, solo:true, gameMode: 'Playing Solo'}
        // case VSCOMP:
        //     return { ...state, vsComp:true, gameMode: 'Playing vs Computer'}
        // case MULTI:
        // return {...state, multiPlayer: true, gameMode: 'Playing with friends'}
        case FETCHCARDS:
            return {...state, cards:action.payload}
        case SETCATEGORY:
            return {...state, category:action.payload}
        case HANDLERESTART:
            return { ...state,
                     matchingCards:[],
                     turnedCards:[],
                     turnedCardsId:[],
                     finish:false,
                     moves:0 }
        case  HANDLECARDCLICK:
            if (state.turnedCards.length === 1) {
                return { ...state, 
                    disable:true, 
                    turnedCards: [...state.turnedCards, action.payload[0]],
                    turnedCardsId: [...state.turnedCardsId, action.payload[1]],
                    moves:state.moves+1
                }
            } else {
                return { ...state,
                        turnedCards: [action.payload[0]],
                        turnedCardsId: [action.payload[1]],
                    }
            }
        case CHECKMATCH:
            const [ cardOne, cardTwo ] = state.turnedCards;
            const [ cardOneId, cardTwoId ] = state.turnedCardsId;
            if (state.compTurn === false) {
                if (cardOneId === cardTwoId) {
                    return { ...state, matchingCards: [ ...state.matchingCards, cardOne, cardTwo], turnedCards:[], turnedCardsId:[], disable:false, compTurn:true }
                } else {
                    return { ...state, turnedCards: [], disable:false, compTurn:true}
                }
            } else {
                if (cardOneId === cardTwoId) {
                    return { ...state, matchingCards: [ ...state.matchingCards, cardOne, cardTwo], turnedCards:[], turnedCardsId:[], disable:false, compTurn:false }
                } else {
                    return { ...state, turnedCards: [], disable:false, compTurn:false}
                }
            }
        case CHECKFINISH:
            if (state.matchingCards.length === state.cards.length * 2) {
                return { ...state, finish:true}
            } else {
                return {...state}
            }
        case COMPUTERMOVE:
            if (state.turnedCards.length === 1) {
                return { ...state, 
                    turnedCards: [...state.turnedCards, action.payload[0]],
                    turnedCardsId: [...state.turnedCardsId, action.payload[1]],
                    computerMoves: state.computerMoves+1
                }
            } else {
                return { ...state,
                        disable:true, 
                        turnedCards: [action.payload[0]],
                        turnedCardsId: [action.payload[1]],
                    }
            }
        case TOGGLEDISABLE:
            if (state.disable === true) {
                return {...state, disable: false}
            } else {
                return {...state, disable: true}
            }
            
        default:
            return {...state}
    }
}

export default reducer;