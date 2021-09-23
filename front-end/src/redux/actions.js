import { FETCHCARDS, HANDLECARDCLICK, CHECKMATCH, CHECKFINISH, HANDLERESTART, SETCATEGORY, COMPUTERMOVE, TOGGLEDISABLE, MULTI, USERNAME } from './Constants';

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
  
  export const toggleDisable = () => {
    return {
      type: TOGGLEDISABLE,
    }
  }

  export const handleMulti = () => {
    return {
      type: MULTI,
    }
  }

  export const handleUser = (username) => {
    return {
      type: USERNAME,
      payload: username
    }
  }