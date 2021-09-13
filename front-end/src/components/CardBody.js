import { connect } from 'react-redux';
import { handleCardClick } from '../redux/actions';

const CardBody = (props) => {
  const { card, isTurned, isInactive, isDisabled, id, i, handleCardClick } = props;
  
    const handleClick = () => {
      handleCardClick(i, id);
    }

    if (card.includes('png')) {
      return (
        <> 
              <div
              id = {id}
              className = {`cardBody ${isTurned ? "is-turned" : ""} ${isInactive ? "is-inactive" : ""} ${isDisabled ? "is-disabled" : ""}`}
              onClick={handleClick}
              >
                <div 
                className="card-face front">
                  <img src={card} width="60%"></img>
                </div>
                <div className="card-face back"> <h3>{id}</h3>
                </div>
              </div>
        </>
      )
    } else {
      return (
        <> 
              <div
              id = {id}
              className = {`cardBody ${isTurned ? "is-turned" : ""} ${isInactive ? "is-inactive" : ""} ${isDisabled ? "is-disabled" : ""}`}
              onClick={handleClick}
              >
                <div 
                className="card-face front">
                  <span>{card}</span>
                </div>
                <div className="card-face back"> <h3>{id}</h3>
                </div>
              </div>
        </>
      )
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      handleCardClick: (i, id) => dispatch(handleCardClick(i, id))
    }
  }

  export default connect(null, mapDispatchToProps)(CardBody);

  