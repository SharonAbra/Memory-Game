import { Navbar, Nav, Container } from 'react-bootstrap';
import { connect } from 'react-redux';

function NavBar({category}) {
  const gameMode = localStorage.getItem("gameMode");
    return (
      <>
   <Navbar expand="xxl" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href='/'>HOME</Navbar.Brand>
  <Navbar.Text>
        Current Game Mode: {gameMode}
      </Navbar.Text>
  {/* <Navbar.Text>
        Current Category: {category.charAt(0).toUpperCase()+category.slice(1)}
      </Navbar.Text> */}
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        {/* <Nav.Link href='/category-choice'>Categories</Nav.Link> */}
        <Nav.Link href='/mode-choice'>Change game mode</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
      </>
    );
  }

  const mapStateToProps = (state) => {
    return {gameMode: state.gameMode, category: state.category}
  }
  
  
  export default connect(mapStateToProps)(NavBar);