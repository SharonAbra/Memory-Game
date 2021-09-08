import Header from './Header';
import MemoryGrid from "./MemoryGrid";
import Finish from './Finish';
import { useParams } from 'react-router';

const Game = (props) => {
  const { category } = useParams();
          return (
        <> 

            <Header/>
            <MemoryGrid category={category}/>
            <Finish/>
        </>
      )
    }
    export default Game;