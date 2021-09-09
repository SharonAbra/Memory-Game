const CardBody = (props) => {
  const { card, isTurned, isInactive, id, i, handleCardClick } = props;
  
    const handleClick = () => {
      handleCardClick(i, id);
    }
    return (
      <> 
            <div
            id = {id}
            className = {`cardBody ${isTurned ? "is-turned" : ""} ${isInactive ? "is-inactive" : ""}`}
            onClick={handleClick}
            >
              <div 
              className="card-face front">
                <h1>{card}</h1>
              </div>
              <div className="card-face back"> <h3>{id}</h3>
              </div>
            </div>
      </>
    )
  }
  export default CardBody;