import React,{useState} from 'react';
import 'tachyons';

const CardBody = (props) => {
    const { color } = props;
    const [isTurned, setIsTurned] = useState(false);

  const turnToFront = (e) => {
    setIsTurned(true);
    const element = e.target;
    // console.log(element.className.includes('front'))
    if (element.className.includes('card')) {
      if(element.className.includes('back')) {
        element.style.transform = "rotateY(0deg)";
      }
      else {
        element.style.transform = "rotateY(180deg)";
      }
    }


  }

    return (
      <>
            <div
            className='tc grow bg-light-green br3 pa3 ma2 dib bw2 shadow-5 card'
            onClick = {isTurned ? undefined : (e) => turnToFront(e)}
            >
              <div className="front">
                <h1>{color}</h1>
              </div>
              <div className="back"></div>
            </div>
      </>
    )
  }
  export default CardBody;
