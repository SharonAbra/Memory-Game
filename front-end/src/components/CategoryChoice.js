import {Link} from 'react-router-dom';

const CategoryChoice = () => {
    return (
    <div className="CategoryChoice"> 
    <h3>Please choose your category:</h3>
        <div>
        <div className="startCategory"><Link to="/game/animals" className="startButton">Animals</Link></div>
        </div>
    </div>
    )
}

export default CategoryChoice;