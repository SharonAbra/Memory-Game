import 'tachyons';
// where is this used??

const CardBody = (props) => {
    const { color, isTurned, isInactive, id, handleCardClick } = props;

    const handleClick = (e) => {
      isTurned = true;
      handleCardClick(e.target.id);
      console.log(isTurned)
    }
    return (
      <>
            <div
            id = {id}
            className = "cardBody"
            className = {isTurned ? "isTurned" : ""}
            // need to fix problem with class names
            onClick={handleClick}
            >
              <div 
              className="card-face front" 
              id = {id}>
                <h1>{color}</h1>
              </div>
              <div className="card-face back" id = {id}>
              </div>
            </div>
      </>
    )
  }
  export default CardBody;
