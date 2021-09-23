import { FETCHCARDS, HANDLECARDCLICK, CHECKMATCH, CHECKFINISH, HANDLERESTART, SETCATEGORY, COMPUTERMOVE, TOGGLEDISABLE, USERNAME} from './Constants';

const initialState = {
    cards: [],
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
    username: ''
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
                     compTurn:false,
                     moves:0,
                    computerMatches:0,
                    userMatches:0
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

            if (localStorage.getItem("gameMode") === "Playing vs Computer") {
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
                // actions to be taken in the case of a single player
                if (cardOneId === cardTwoId) {
                    return {
                        ...state,
                        matchingCards: [ ...state.matchingCards, cardOne, cardTwo],
                        turnedCards:[],
                        turnedCardsId:[],
                        disable:false,
                    }
                } else {
                    return { ...state, turnedCards: [], disable:false}
                }
            }
        // case CHECKMATCH:
        //     const [ cardOne, cardTwo ] = state.turnedCards;
        //     const [ cardOneId, cardTwoId ] = state.turnedCardsId;
        //     if (state.compTurn === false) {
        //         if (cardOneId === cardTwoId) {
        //             return { 
        //                 ...state, 
        //                 matchingCards: [ ...state.matchingCards, cardOne, cardTwo],
        //                 turnedCards:[],
        //                 turnedCardsId:[],
        //                 disable:true,
        //                 userMatches: state.userMatches+1,
        //                 compTurn:true 
        //             }
        //         } else {
        //             return { ...state, turnedCards: [], disable:true, compTurn:true}
        //         }
        //     } else {
        //         if (cardOneId === cardTwoId) {
        //             return {
        //                 ...state,
        //                 matchingCards: [ ...state.matchingCards, cardOne, cardTwo],
        //                 turnedCards:[],
        //                 turnedCardsId:[],
        //                 computerMatches: state.computerMatches+1,
        //                 disable:false,
        //                 compTurn:false
        //             }
        //         } else {
        //             return { ...state, turnedCards: [], disable:false, compTurn:false}
        //         }
        //     }
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
        case TOGGLEDISABLE:
            if (state.disable === true) {
                return {...state, disable: false}
            } else {
                return {...state, disable: true}
            }
        case USERNAME:
            return {...state, username: action.payload}
        default:
            return {...state}
    }
}

export default reducer;