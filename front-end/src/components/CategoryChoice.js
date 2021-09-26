import {Link} from 'react-router-dom';

export default function CategoryChoice() {
    return (
        <div className="CategoryChoice"> 
            <h1>Please choose your category:</h1>
            <Link to="/game/animals" className="startButton"><div className="startCategory">Animals</div></Link>
            <Link to="/game/clothes" className="startButton"><div className="startCategory">Clothes</div></Link>
            <Link to="/game/kitchen" className="startButton"><div className="startCategory">Kitchen</div></Link>
            <Link to="/game/music" className="startButton"><div className="startCategory">Music</div></Link>
            <Link to="/game/home" className="startButton"><div className="startCategory">Home</div></Link>
            <Link to="/game/jobs" className="startButton"><div className="startCategory">Jobs</div></Link>
        </div>
    )
}
