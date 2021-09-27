import { FETCHCARDS, HANDLECARDCLICK, CHECKMATCH, CHECKFINISH,
         HANDLERESTART, SETCATEGORY, COMPUTERMOVE, USERNAME,
        COUNTER, ENABLE, DISABLE, FLIPBACK, YOURTURN
        } from './Constants';

const initialState = {
    cards: [],
    categoryList: ['animals', 'clothes', 'kitchen', 'music', 'home', 'jobs'],
    category: '',
    turnedCards: [],
    turnedCardsId: [],
    matchingCards: [],
    disable: false,
    finish: false,
    moves: 0,
    compTurn: false,
    computerMatches: 0,
    userMatches: 0,
    username: '',
    counter: 0,
    yourTurn: false,
    matchesInMulti: 0
}

const reducer = (state=initialState,action={}) => {
    switch(action.type) {
        case FETCHCARDS:
            return {...state, cards:action.payload}
        case SETCATEGORY:
            // console.log(action.payload);
            return {...state, category:action.payload}
        case HANDLERESTART:
            return { ...state,
                     matchingCards:[],
                     turnedCards:[],
                     turnedCardsId:[],
                     finish:false,
                     compTurn:false,
                     moves:0,
                    computerMatches:0,
                    userMatches:0, 
                    disable: false
                    }
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

            if (sessionStorage.getItem("gameMode") === "Playing vs Computer") {
                // adjust reducer to include computer moves
                if (state.compTurn === true) {
                // actions to be taken when it is the computer's turn
                    if (cardOneId === cardTwoId) {
                        return {
                            ...state,
                            matchingCards: [ ...state.matchingCards, cardOne, cardTwo],
                            turnedCards:[],
                            turnedCardsId:[],
                            computerMatches: state.computerMatches+1,
                            disable:false,
                            compTurn:false
                        }
                    } else {
                        return { ...state, turnedCards: [], disable:false, compTurn:false}
                    }
                } else {
                // actions to be taken when it is not the computer's turn
                    if (cardOneId === cardTwoId) {
                        return { 
                            ...state, 
                            matchingCards: [ ...state.matchingCards, cardOne, cardTwo],
                            turnedCards:[],
                            turnedCardsId:[],
                            disable:true,
                            userMatches: state.userMatches+1,
                            compTurn:true 
                        }
                    } else {
                        return { ...state, turnedCards: [], disable:true, compTurn:true}
                    }
                }
            } else {
                // actions to be taken in the other game modes
                if (cardOneId === cardTwoId) {
                    if (state.counter > 0) {
                        return {
                            ...state, 
                                matchesInMulti: state.matchesInMulti+1,
                                matchingCards: [ ...state.matchingCards, cardOne, cardTwo],
                                turnedCards:[],
                                turnedCardsId:[],
                                counter: 0
                            }
                    } else {
                        return {
                            ...state,
                            matchingCards: [ ...state.matchingCards, cardOne, cardTwo],
                            turnedCards:[],
                            turnedCardsId:[],
                            counter: 0,
                        }
                    }
                } else {
                    return { ...state,
                             turnedCards: [],
                             counter: 0}
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
                }
            } else {
                return { ...state,
                        disable:true, 
                        turnedCards: [action.payload[0]],
                        turnedCardsId: [action.payload[1]],
                    }
            }
        case DISABLE:
                return {...state, disable: true}
        case ENABLE:
            return {...state, disable: false}
        case USERNAME:
            return {...state, username: action.payload}
        case COUNTER:
            return {...state, counter: state.counter+1}
        case FLIPBACK:
            return {...state, turnedCards: [], turnedCardsId: []}
        case YOURTURN:
            if (state.yourTurn === false) {
                return {...state, yourTurn: true}
            } else {
                return {...state, yourTurn: false}
            }
            
        default:
            return {...state}
    }
}

export default reducer;