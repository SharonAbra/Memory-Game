// import React, { useEffect, useState } from "react";
// import { useDispatch } from 'react-redux';
// import { useParams } from 'react-router';
// import { setCategory } from '../redux/actions.js'
// import Header from './Header';
// import MemoryGrid from "./MemoryGrid";
// import Finish from './Finish';
// import socket from "../modules/Socket.js";

// export default function Game ()  {
//   const dispatch = useDispatch();
//   const gameMode = sessionStorage.getItem("gameMode");
//   const { urlCategory } = useParams();
//   const [ gridCategory, setGridCategory ] = useState('');
//   const [ firstPlayer, setFirstPlayer ] = useState(false);
//   const [ chosenCategory, setChosenCategory ] = useState('')

//     useEffect(() => {
//     socket.on('first_player_category', (firstPlayerCategory) => {
//       setChosenCategory(firstPlayerCategory);
//     })
//   }, [])

//   useEffect(() => {
//     socket.on("user turn", (number) => {
//       if (number === 0) {
//         setFirstPlayer(true);
//       }
//     })
//   }, [])

//   useEffect(() => {
//     if (gameMode === "Playing with Friends") {
//         if (firstPlayer === true) {
//           setGridCategory(urlCategory);
//         } else {
//             setGridCategory(chosenCategory);
//         }
//     } else {
//         setGridCategory(urlCategory);
//     }
//   }, [firstPlayer])

//   useEffect(() => {
//     if (gridCategory !== '') {
//       dispatch(setCategory(gridCategory));
//     }
//   }, [gridCategory])
   
//   return (
//     <div>
//       <Header/>
//       <MemoryGrid category={gridCategory}/>
//       <Finish/>
//     </div>
//       )
//     }


import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setCategory } from '../redux/actions.js'
import { useParams } from 'react-router';
import Header from './Header';
import MemoryGrid from "./MemoryGrid";
import Finish from './Finish';

export default function Game ()  {
  const { urlCategory } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCategory(urlCategory));
  }, [])

          return (
        <> 
          <div>
            <Header/>
            <MemoryGrid category={urlCategory}/>
            <Finish/>
            </div>
        </>
      )
    }