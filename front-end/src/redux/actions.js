import { FETCHCARDS, HANDLECARDCLICK, CHECKMATCH, CHECKFINISH,
         HANDLERESTART, SETCATEGORY, COMPUTERMOVE, USERNAME, 
         COUNTER, ENABLE, DISABLE, FLIPBACK, YOURTURN 
        } from './Constants';

export const fetchCards = (category) => (dispatch) => {
    // fetch(`https://memory-game-g.herokuapp.com/${category}`)
    fetch(`http://localhost:4000/${category}`)
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

  export const computerMove = ({i, id}) => {
    return {
      type: COMPUTERMOVE,
      payload: [i, id]
    }
  }

  export const handleUser = (username) => {
    return {
      type: USERNAME,
      payload: username
    }
  }

  export const handleCounter = () => {
    return {
      type: COUNTER,
    }
  }

  export const handleEnable = () => {
    return {
      type: ENABLE,
    }
  }

  export const handleDisable = () => {
    return {
      type: DISABLE,
    }
  }

  export const flipBack = () => {
    return {
      type: FLIPBACK,
    }
  }

  export const handleYourTurn = () => {
    return {
      type: YOURTURN,
    }
  }