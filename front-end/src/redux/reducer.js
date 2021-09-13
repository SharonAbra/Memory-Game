import { FETCHCARDS, HANDLECARDCLICK, CHECKMATCH, CHECKFINISH, HANDLERESTART, SETCATEGORY, VSCOMP } from './Constants';

const initialState = {
    cards: [],
    category: '',
    turnedCards: [],
    turnedCardsId: [],
    matchingCards: [],
    disable: false,
    finish: false,
    moves: 0,
    vsComp: false
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
                        turnedCardsId: [action.payload[1]]
                    }
            }
        case CHECKMATCH:
            const [ cardOne, cardTwo ] = state.turnedCards;
            const [ cardOneId, cardTwoId ] = state.turnedCardsId;
            if (cardOneId === cardTwoId) {
                return { ...state, matchingCards: [ ...state.matchingCards, cardOne, cardTwo], turnedCards:[], turnedCardsId: [], disable:false }
            } else {
                return { ...state, turnedCards: [], disable:false}
            }
        case CHECKFINISH:
            if (state.matchingCards.length === state.cards.length * 2) {
                return { ...state, finish:true}
            }
        case VSCOMP:
            return { ...state, vsComp:true}
        default:
            return {...state}
    }
}

export default reducer;