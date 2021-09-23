import { Modal, Button } from 'react-bootstrap';
import React,{ useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import {handleUser} from '../redux/actions.js';

export default function MultiWelcome() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    // const multi = useSelector(state => state.multi);
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
          <Modal.Header closeButton>
            <Modal.Title>Welcome! Ready to play with your friends?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            What is your name?
            <form 
                onSubmit = {(e) => handleForm(e)}>
                <input type="text" name="username"></input>
                <input type="submit" value="Let's Go!" className=" btn-primary"></input>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
