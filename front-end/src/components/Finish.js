import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';
import { handleRestart } from '../redux/actions.js'

export default function Finish() {

  const history = useHistory();
  const dispatch = useDispatch();
  const finish = useSelector(state => state.finish);
  const moves = useSelector(state => state.moves);
  const userMatches = useSelector(state => state.userMatches);
  const computerMatches = useSelector(state => state.computerMatches);
  const matchesInMulti = useSelector(state => state.matchesInMulti);
  const [ textOne, setTextOne ] = useState('');
  const [ textTwo, setTextTwo ] = useState('');
  const gameMode = sessionStorage.getItem("gameMode");

  useEffect(() => {
    // set the text of the modal according to chosen game mode
    if (gameMode === "Playing Solo") {
      setTextOne(`Well done! You matched them all in ${moves} moves!`)
      setTextTwo('');
    } else if ((gameMode === "Playing vs Computer")) {
      setTextOne(`Your matches: ${userMatches}`);
      setTextTwo(`Computer matches: ${computerMatches}`);
    } else {
      setTextOne(`Your matches: ${matchesInMulti}`);
        setTextTwo('');
      }
  }, [finish])
        
  function handleClose () {
    history.push("/");
    dispatch(handleRestart());
  }

  function handleHome () {
    history.push("/");
    dispatch(handleRestart());
  }

  return (
    <>
      <Modal
        show={finish}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className = "center"
      >
        <Modal.Header closeButton className="modalBody">
          <Modal.Title><h1 className="modalText">Game Over!</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBody modalText">
          <div>{textOne}</div>
          <div>{textTwo}</div>
        </Modal.Body>
        <Modal.Footer className="modalBody">
          <Button variant="primary" onClick={() => dispatch(handleRestart())}>Restart</Button>
          <Button variant="secondary" onClick={handleHome}>Home</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
