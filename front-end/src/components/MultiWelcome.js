import { Modal, Button } from 'react-bootstrap';
import React,{ useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import {handleUser} from '../redux/actions.js';

export default function MultiWelcome() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const gameMode = localStorage.getItem("gameMode");

    useEffect(() => {
        if (gameMode === "Playing with Friends") {
        setShow(true);
        }
    }, [])
    
    const handleClose = () => {
        setShow(false);
        history.push("/");
    }
  
    const handleForm = (e) => {
        e.preventDefault();
        console.log(e.target.username.value)
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
          <Modal.Body className="modalBody modalText">
            What's your name?
            <form 
                onSubmit = {(e) => handleForm(e)}>
                <input type="text" name="username"></input><br></br>
                <input type="submit" value="Let's Go!" className="btn btn-primary"></input>
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
