import { connect } from 'react-redux';
import { handleVsComp } from '../redux/actions';

const ModeChoice = ({handleVsComp}) => {
    return (
    <div className="ModeChoice"> 
        <h3>Please choose game mode:</h3>
        <button>Play solo</button>
        <button onClick={handleVsComp}>Play vs computer</button>
        <button>Play vs friends</button>
    </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {handleVsComp: () => dispatch(handleVsComp())}
  }

export default connect(null, mapDispatchToProps)(ModeChoice);