import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import Socket from '../modules/Socket';

export default function ModeChoice () {

    // store the game mode choice in session storage
    function handleSoloClick() {
        sessionStorage.setItem("gameMode", "Playing Solo")
    };

    function handleVsCompClick() {
        sessionStorage.setItem("gameMode", "Playing vs Computer")
    };

    function handleMultiPlayerClick() {
        sessionStorage.setItem("gameMode", "Playing with Friends")
    };

    return (
        <div className="ModeChoice"> 
            <h1 className="choose">How would you like to play?</h1>
            <Link to="/category-choice" className="start" onClick={handleSoloClick}><div className="startButton">Play solo</div></Link>
            <Link to="/category-choice" className="start" onClick={handleVsCompClick}><div className="startButton">Play vs computer</div></Link>
            {/* the category for multiplayer mode is animals */}
            <Link to='/game/animals' className="start"onClick = {handleMultiPlayerClick}><div className="startButton">Play with friends</div></Link>
        </div>
    );
}