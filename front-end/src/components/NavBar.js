import { Navbar, Nav, Link, Container } from 'react-bootstrap';

function NavBar() {
    return (
      <>
        <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="/">Home</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="">Categories</Nav.Link>
      <Nav.Link href="">Game modes</Nav.Link>
      <Nav.Link href="">Levels</Nav.Link>
      <Nav.Link href="">Score Board</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
      </>
    );
  }
  
  export default NavBar;