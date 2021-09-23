import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setCategory } from '../redux/actions.js'
import { useParams } from 'react-router';
import Header from './Header';
import MemoryGrid from "./MemoryGrid";
import Finish from './Finish';

export default function Game ()  {
  const { category } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCategory(category));
  }, [])

          return (
        <> 
          <div>
            <Header/>
            <MemoryGrid category={category}/>
            <Finish/>
            </div>
        </>
      )
    }
