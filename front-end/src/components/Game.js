import Header from './Header';
import MemoryGrid from "./MemoryGrid";
import Finish from './Finish';
import { useParams } from 'react-router';

const Game = () => {
  const { category } = useParams();
          return (
        <> 

            <Header category={category}/>
            <MemoryGrid category={category}/>
        </>
      )
    }
    export default Game;