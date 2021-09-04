import CardBody from './CardBody';

const CardList = (props) => {
    const {colors} = props;
    return (
      <>
      {
        colors.map((item,i)=>{
          return <CardBody color = {item.color_name}/>
        })
      }
      </>
    )
  }
  export default CardList;