import React,{useState,useEffect} from 'react';
import CardList from './CardList';
import './style.css';

const MemoryGrid = () => {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000')
    .then (res => res.json())
    .then (data => {
    // double the array in order to have identical pairs
    data = data.concat(data)
    // shuffle the array
    setColors(data.sort((a, b) => 0.5 - Math.random()));
    })
    .catch(e => {
      console.log(e);
    })
  }, []);

    return (
      <div className = "grid">
          <CardList colors={colors}/>
      </div>
    );
}

export default MemoryGrid;