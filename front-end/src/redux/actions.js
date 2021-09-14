import { FETCHCARDS, HANDLECARDCLICK, CHECKMATCH, CHECKFINISH, HANDLERESTART, SETCATEGORY, VSCOMP, COMPUTERMOVE } from './Constants';

export const fetchCards = (category) => (dispatch) => {
    fetch(`https://memory-game-g.herokuapp.com/${category}`)
    .then(res => res.json())
    .then(data => {
        dispatch({type:FETCHCARDS, payload:data})
    })
    .catch(e => {
      console.log(e);
    })
  }
 
export const setCategory = (choice) => {
    return {
        type: SETCATEGORY,
        payload: choice,
    }
}

  export const handleCardClick = (i, id) => {
    return {
      type: HANDLECARDCLICK,
      payload: [i, id]
    }
  }
  
  export const checkMatch = () => {
    return {
      type: CHECKMATCH,
    }
  }

  export const checkFinish = () => {
    return {
      type: CHECKFINISH,
    }
  }
  
  export const handleRestart = () => {
    return {
      type: HANDLERESTART,
    }
  }

  export const handleVsComp = () => {
    return {
      type: VSCOMP,
    }
  }

  export const computerMove = ({i, id}) => {
    return {
      type: COMPUTERMOVE,
      payload: [i, id]
    }
  }
  