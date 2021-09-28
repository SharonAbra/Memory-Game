import {Link} from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function CategoryChoice() {
    const categoryList = useSelector(state => state.categoryList);
    
    return (
        <div className="categories">
            <Container>
                <h1 className="choose">Please choose your category:</h1>
                <Row>
                    {
                    categoryList.map((item, i) => {
                        return (
                        <Col xs={4} key={i}>
                            <Link to={`/game/${item}`} className="link">
                                <div className="startCategory">
                                    {item.charAt(0).toUpperCase()+item.slice(1)}
                                </div>
                            </Link>
                        </Col>
                        )
                    })
                    }
                        <Col xs={4}></Col>

                        <Col xs={4}>
                            <Link to={`/game/${categoryList[Math.floor(Math.random()*categoryList.length)]}`} className="link">
                                <div className="startCategory">Random</div>
                            </Link>
                        </Col>
                </Row>
            </Container>
        </div>
    )
}
