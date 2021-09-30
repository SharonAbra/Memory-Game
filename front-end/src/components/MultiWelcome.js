import React,{ useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import {handleUser} from '../redux/actions.js';

export default function MultiWelcome() {

  const history = useHistory();
  const { register } = useForm();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const gameMode = sessionStorage.getItem("gameMode");

  // show this dialog only in multiplayer mode
  useEffect(() => {
      if (gameMode === "Playing with Friends") {
      setShow(true);
      }
  }, [])
  
  // when 'x' or 'cancel' are clicked, cancel and go back to home page
  const handleClose = () => {
      setShow(false);
      history.push("/");
  }

  // upon submission, username is updated in the store, to be sent to the server by the chat component
  const handleForm = (e) => {
      e.preventDefault();
      dispatch(handleUser(e.target.username.value));
      setShow(false);
  }
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className = "center"
      >
        <Modal.Header closeButton className="modalBody modalText">
          <Modal.Title><h1>Welcome!</h1></Modal.Title>
        </Modal.Header>
        <p className="portrait">It is recommended to rotate your device.</p>
        <Modal.Body className="modalBody modalText landscape">
          What's your name?
          <form 
              onSubmit = {(e) => handleForm(e)}>
              <input type="text" name="username" autoComplete="off" register={register} required></input><br></br>
              <input type="submit" value="Let's Go!" className="btn btn-primary go"></input>
          </form>
        </Modal.Body>
        <Modal.Footer className="modalBody">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
