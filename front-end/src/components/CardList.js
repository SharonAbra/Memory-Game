import CardBody from './CardBody';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CardList = (props) => {
    const {colors} = props;
    let randomColors = colors.sort((a, b) => 0.5 - Math.random());
    let topRow = randomColors.slice(0, 5);
    let middleRow = randomColors.slice(5, 10);
    let bottomRow = randomColors.slice(10);
    return (
      <>
        <Container fluid>
          <Row>
            {
              
              topRow.map((item)=>{
                console.log(randomColors)
                console.log(topRow);
                return <Col><CardBody color = {item.color_name}/></Col>
              })
            }
          </Row>
          <Row>
            {
              
              middleRow.map((item)=>{
                console.log(middleRow)
                return <Col><CardBody color = {item.color_name}/></Col>
              })
            }
          </Row>
          <Row>
            {
              
              bottomRow.map((item)=>{
                console.log(bottomRow)
                return <Col><CardBody color = {item.color_name}/></Col>
              })
            }
          </Row>
        </Container>
      </>
    )
  }
  export default CardList;
