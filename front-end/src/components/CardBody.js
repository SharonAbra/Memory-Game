const CardBody = (props) => {
  const { card, isTurned, isInactive, isDisabled, id, i, handleCardClick } = props;
  
    const handleClick = () => {
      handleCardClick(i, id);
      // dispatch(handleCardClick)
    }
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
  export default CardBody;