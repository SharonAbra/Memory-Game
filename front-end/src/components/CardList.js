import CardBody from './CardBody';

const CardList = (props) => {
    const {colors} = props;
    let randomColors = colors.sort((a, b) => 0.5 - Math.random());
    return (
      <>
      {
        randomColors.map((item,i)=>{
          return <CardBody color = {item.color_name}/>
        })
      }
      </>
    )
  }
  export default CardList;