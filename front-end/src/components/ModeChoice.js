import { connect } from 'react-redux';
import { handleVsComp } from '../redux/actions';
import {Link} from 'react-router-dom';

const ModeChoice = ({handleVsComp}) => {
    return (
    <div className="ModeChoice"> 
        <h3>How would you like to play?</h3>
        <div className="start"><Link to="/category-choice" className="startButton">Play solo</Link></div>
        <div className="start"><Link to="/category-choice" className="startButton" onClick={handleVsComp} >Play vs computer</Link></div>
        <div className="start"><Link to="/" className="startButton">Play vs friends</Link></div>
    </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {handleVsComp: () => dispatch(handleVsComp())}
  }

export default connect(null, mapDispatchToProps)(ModeChoice);