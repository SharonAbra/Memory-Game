import React,{useState,useEffect} from 'react';
import CardList from './CardList';
import './style.css';

const MemoryGrid = () => {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000')
    .then (res => res.json())
    .then (data => {
    setColors(data);
    })
    .catch(e => {
      console.log(e);
    })
  }, []);

    return (
      <div className="grid">
          <CardList colors={colors}/>
      </div>
    );
}

export default MemoryGrid;