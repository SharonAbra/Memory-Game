import React,{useState,useEffect} from 'react';
import CardList from './CardList';


const MemoryGrid = ( {category} ) => {
  console.log(category)
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/${category}`)
    .then (res => res.json())
    .then (data => {
    // double the array in order to have identical pairs
    data = data.concat(data)
    // shuffle the array
    setCards(data.sort((a, b) => 0.5 - Math.random()));
    })
    .catch(e => {
      console.log(e);
    })
  }, []);

    return (
      <div className = "grid">
          <CardList cards={cards}/>
      </div>
    );
}

export default MemoryGrid;