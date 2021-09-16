import {Link} from 'react-router-dom';

const CategoryChoice = () => {
    return (
    <div className="CategoryChoice"> 
    <h1>Please choose your category:</h1>
        <div>
        <div className="startCategory first"><Link to="/game/animals" className="startButton">Animals</Link></div>
        </div>
    </div>
    )
}

export default CategoryChoice;