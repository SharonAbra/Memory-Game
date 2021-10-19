import { Navbar, Nav, Container } from 'react-bootstrap';

export default function NavBar() {
  console.log('navbar');
    return (
      <>
   <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href='/'>HOME</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href='/mode-choice'>Change game mode</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
      </>
  );
}