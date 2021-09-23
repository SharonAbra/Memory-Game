import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {handleMulti} from '../redux/actions.js'

export default function ModeChoice () {

    const dispatch = useDispatch();

    function handleSoloClick() {
        localStorage.setItem("gameMode", "Playing Solo")
    };

    function handleVsCompClick() {
        localStorage.setItem("gameMode", "Playing vs Computer")
    };

    function handleMultiPlayerClick() {
        localStorage.setItem("gameMode", "Playing with Friends")
        dispatch(handleMulti());
    };

    return (
    <div className="ModeChoice"> 
        <h1>How would you like to play?</h1>
        <Link to="/category-choice" className="start" onClick={handleSoloClick}><div className="startButton">Play solo</div></Link>
        <Link to="/category-choice" className="start" onClick={handleVsCompClick}><div className="startButton">Play vs computer</div></Link>
        <Link to="/game/animals" className="start"onClick = {handleMultiPlayerClick}><div className="startButton">Play with friends</div></Link>
    </div>
    );
}