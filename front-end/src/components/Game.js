import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { setCategory } from '../redux/actions.js'
import Header from './Header';
import MemoryGrid from "./MemoryGrid";
import Finish from './Finish';

export default function Game () {

  const { urlCategory } = useParams();
  const dispatch = useDispatch();

  // get the category from the url and set it in the store
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