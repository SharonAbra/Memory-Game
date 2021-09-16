import { connect } from 'react-redux';
import { handleVsComp, handleSolo } from '../redux/actions';
import {Link} from 'react-router-dom';

const ModeChoice = ({handleVsComp, handleSolo}) => {
    return (
    <div className="ModeChoice"> 
        <h1>How would you like to play?</h1>
        <div className="start first"><Link to="/category-choice" className="startButton" onClick={handleSolo}>Play solo</Link></div>
        <div className="start"><Link to="/category-choice" className="startButton" onClick={handleVsComp}>Play vs computer</Link></div>
        <div className="start"><Link to="/multipalyer" className="startButton">Play vs friends</Link></div>
    </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {handleVsComp: () => dispatch(handleVsComp()),
            handleSolo: () => dispatch(handleSolo())
    }
  }

export default connect(null, mapDispatchToProps)(ModeChoice);