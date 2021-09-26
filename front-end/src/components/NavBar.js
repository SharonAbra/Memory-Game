import { Navbar, Nav, Container } from 'react-bootstrap';

export default function NavBar() {
  const gameMode = sessionStorage.getItem("gameMode");
    return (
      <>
   <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href='/'>HOME</Navbar.Brand>
      {/* <Navbar.Text>Current Game Mode: {gameMode}</Navbar.Text> */}
      {/* {sessionStorage.getItem("gameMode") === null ? '' : `Current Game Mode: ${gameMode}`} */}
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