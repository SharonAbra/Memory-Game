import { FETCHCARDS, HANDLECARDCLICK, CHECKMATCH, CHECKFINISH, HANDLERESTART, SETCATEGORY, VSCOMP, COMPUTERMOVE } from './Constants';

const initialState = {
    // state for game mode: solo
    cards: [],
    category: '',
    turnedCards: [],
    turnedCardsId: [],
    matchingCards: [],
    disable: false,
    finish: false,
    moves: 0,

    // state for game mode: vs computer
    vsComp: true,
    compTurn: false,
    computerMoves: 0
}

const reducer = (state=initialState,action={}) => {
    switch(action.type) {
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
            }
        case VSCOMP:
            return { ...state, vsComp:true}
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
        default:
            return {...state}
    }
}

export default reducer;