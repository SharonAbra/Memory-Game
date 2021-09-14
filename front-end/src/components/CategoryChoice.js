import {Link} from 'react-router-dom';
import { handleVsComp } from '../redux/actions';

const CategoryChoice = () => {
    return (
    <div className="CategoryChoice"> 
    <h3>Please choose your category:</h3>
        <div className="choose">
            <Link to="/colors">Colors</Link>
            <Link to="/animals">Animals</Link>
        </div>
    </div>
    )
}

export default CategoryChoice;