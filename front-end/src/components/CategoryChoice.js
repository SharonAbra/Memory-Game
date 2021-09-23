import {Link} from 'react-router-dom';

export default function CategoryChoice() {
    return (
        <div className="CategoryChoice"> 
            <h1>Please choose your category:</h1>
            <Link to="/game/animals" className="startButton"><div className="startCategory">Animals</div></Link>
        </div>
    )
}
