import { connect } from 'react-redux';
import { handleVsComp, handleSolo, handleMultiPlayer } from '../redux/actions';
import {Link} from 'react-router-dom';

const ModeChoice = ({handleVsComp, handleSolo, handleMultiPlayer}) => {
    return (
    <div className="ModeChoice"> 
        <h1>How would you like to play?</h1>
        <div className="start first"><Link to="/category-choice" className="startButton" onClick={handleSolo}>Play solo</Link></div>
        <div className="start"><Link to="/category-choice" className="startButton" onClick={handleVsComp}>Play vs computer</Link></div>
        <div className="start"><Link to="/game/animals" className="startButton"onClick = {handleMultiPlayer}>Play with friends</Link></div>
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