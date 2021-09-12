import { FETCHCARDS, HANDLECARDCLICK, CHECKMATCH, CHECKFINISH, HANDLERESTART, SETCATEGORY, VSCOMP } from './Constants';

export const fetchCards = (category) => (dispatch) => {
    fetch(`https://memory-game-g.herokuapp.com/${category}`)
    .then(res => res.json())
    .then(data => {
        data = data.concat(data)
        data.sort((a, b) => 0.5 - Math.random())
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
