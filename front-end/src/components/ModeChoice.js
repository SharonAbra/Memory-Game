import { connect } from 'react-redux';
import { handleVsComp, handleSolo, handleMultiPlayer } from '../redux/actions';
import {Link} from 'react-router-dom';

const ModeChoice = ({handleVsComp, handleSolo, handleMultiPlayer}) => {

    function handleSoloClick() {
        // handleSolo();
        localStorage.setItem("gameMode", "Playing Solo")
        // localStorage.setItem("solo", true)
    }

    function handleVsCompClick() {
        // handleVsComp();
        localStorage.setItem("gameMode", "Playing vs Computer")
        // localStorage.setItem("vsComp", true)
    }

    function handleMultiPlayerClick() {
        // handleMultiPlayer();
        localStorage.setItem("gameMode", "Playing with Friends")
        // localStorage.setItem("multi", true)
    }

    return (
    <div className="ModeChoice"> 
        <h1>How would you like to play?</h1>
        <div className="start first"><Link to="/category-choice" className="startButton" onClick={handleSoloClick}>Play solo</Link></div>
        <div className="start"><Link to="/category-choice" className="startButton" onClick={handleVsCompClick}>Play vs computer</Link></div>
        <div className="start"><Link to="/game/animals" className="startButton"onClick = {handleMultiPlayerClick}>Play with friends</Link></div>
    </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleSolo: () => dispatch(handleSolo()),
        handleVsComp: () => dispatch(handleVsComp()),
        handleMultiPlayer: () => dispatch(handleMultiPlayer())
    }
  }

export default connect(null, mapDispatchToProps)(ModeChoice);