import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Socket from '../modules/Socket';

export default function ModeChoice () {
    const categoryList = useSelector(state => state.categoryList);
    const firstPlayerCategory = categoryList[Math.floor(Math.random()*categoryList.length)];

    function handleSoloClick() {
        sessionStorage.setItem("gameMode", "Playing Solo")
    };

    function handleVsCompClick() {
        sessionStorage.setItem("gameMode", "Playing vs Computer")
    };

    function handleMultiPlayerClick() {
        sessionStorage.setItem("gameMode", "Playing with Friends")
        Socket.emit('first_player_category', (firstPlayerCategory))
    };

    return (
        <div className="ModeChoice"> 
            <h1 className="choose">How would you like to play?</h1>
            <Link to="/category-choice" className="start" onClick={handleSoloClick}><div className="startButton">Play solo</div></Link>
            <Link to="/category-choice" className="start" onClick={handleVsCompClick}><div className="startButton">Play vs computer</div></Link>
            <Link to='/game/animals' className="start"onClick = {handleMultiPlayerClick}><div className="startButton">Play with friends</div></Link>
            {/* <Link to={`/game/${firstPlayerCategory}`} className="start"onClick = {handleMultiPlayerClick}><div className="startButton">Play with friends</div></Link> */}
        </div>
    );
}