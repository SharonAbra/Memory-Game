import { Navbar, Nav, Container } from 'react-bootstrap';

function NavBar() {
    return (
      <>
        {/* <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="/">Home</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="">Categories</Nav.Link>
      <Nav.Link href="">Game modes</Nav.Link>
      <Nav.Link href="">Levels</Nav.Link>
      <Nav.Link href="">Score Board</Nav.Link>
    </Nav>
    </Container>
  </Navbar> */}
  <Navbar bg="dark" variant="dark">
  <Container>
    <Navbar.Brand href='/'>HOME</Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse className="justify-content-end">
      <Navbar.Text>
        Game Mode:
      </Navbar.Text>
    </Navbar.Collapse>
  </Container>
</Navbar>
      </>
    );
  }
  
  export default NavBar;