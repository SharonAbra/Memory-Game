import React,{useState} from 'react';
import 'tachyons';

const CardBody = (props) => {
    const { color } = props;
    const [isTurned, setIsTurned] = useState(false);

  const turnToFront = (e) => {
    setIsTurned(true);
    // const element = e.target;
    // if (element.className.includes('card')) {
    //   if(element.style.transform === "rotateY(180deg)") {
    //     element.style.transform = "rotateY(0deg)";
    //   }
    //   else {
    //     element.style.transform = "rotateY(180deg)";
    //   }
    // }
  }

    return (
      <>
            <div
            className="cardBody"
            onClick = {isTurned ? undefined : (e) => turnToFront(e)}
            >
              <div className="front">
                <h1>{color}</h1>
              </div>
              <div className="back">
              </div>
            </div>
      </>
    )
  }
  export default CardBody;
