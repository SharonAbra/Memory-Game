import {Link} from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';

export default function CategoryChoice() {
    return (
        <div className="categoryContainer">
            <Container>
                <h1 className="choose">Please choose your category:</h1>
                <Row>
                    <Col xs={2}>
                        <Link to="/game/animals" className="startButton"><div className="startCategory">Animals</div></Link>
                    </Col>
                    <Col xs={2}>
                        <Link to="/game/clothes" className="startButton"><div className="startCategory">Clothes</div></Link>
                    </Col>
                    <Col xs={2}>
                        <Link to="/game/kitchen" className="startButton"><div className="startCategory">Kitchen</div></Link>
                    </Col>
                </Row>
                <Row>
                    <Col xs={2}>
                        <Link to="/game/music" className="startButton"><div className="startCategory">Music</div></Link>
                    </Col>
                    <Col xs={2}>
                        <Link to="/game/home" className="startButton"><div className="startCategory">Home</div></Link>
                    </Col>
                    <Col xs={2}>
                        <Link to="/game/jobs" className="startButton"><div className="startCategory">Jobs</div></Link>
                    </Col>
                </Row>
            </Container>
        </div>

        // <div className="categoryContainer">
        //     <h1 className="choose">Please choose your category:</h1>
        //     <div className="CategoryChoice"> 
        //         <Link to="/game/animals" className="startButton"><div className="startCategory">Animals</div></Link>
        //         <Link to="/game/clothes" className="startButton"><div className="startCategory">Clothes</div></Link>
        //         <Link to="/game/kitchen" className="startButton"><div className="startCategory">Kitchen</div></Link>
        //         <Link to="/game/music" className="startButton"><div className="startCategory">Music</div></Link>
        //         <Link to="/game/home" className="startButton"><div className="startCategory">Home</div></Link>
        //         <Link to="/game/jobs" className="startButton"><div className="startCategory">Jobs</div></Link>
        //     </div>
        // </div>
    )
}
