import { handleRestart } from '../redux/actions.js'
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

export default function Finish() {
  const history = useHistory();
  const dispatch = useDispatch();
  const finish = useSelector(state => state.finish)
  const moves = useSelector(state => state.moves)
  const userMatches = useSelector(state => state.userMatches)
  const computerMatches = useSelector(state => state.computerMatches)
  const [ textOne, setTextOne ] = useState('');
  const [ textTwo, setTextTwo ] = useState('');
  const gameMode = localStorage.getItem("gameMode");

  useEffect(() => {
    if (gameMode === "Playing Solo") {
      setTextOne(`Well done! You matched them all in ${moves} moves!`)
      setTextTwo('');
    } else if ((gameMode === "Playing vs Computer")) {
      setTextOne(`Your matches: ${userMatches}`);
      setTextTwo(`Computer matches: ${computerMatches}`);
    } else {
      setTextOne(`Your matches: ${userMatches}`);
        setTextTwo('');
      }
  }, [finish])
        
  function handleClose () {
    history.push("/");
  }

  function handleHome () {
    history.push("/");
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
          <Modal.Header closeButton>
            <Modal.Title>Game Over!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>{textOne}</div>
            <div>{textTwo}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => dispatch(handleRestart())}>
              Restart
            </Button>
            <Button variant="primary" onClick={handleHome}>
              Home
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
