import { connect } from 'react-redux';
import { handleRestart } from '../redux/actions.js'
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import {Link} from 'react-router-dom';


function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const Finish = ({finish, moves, handleRestart}) => {
  return (
    <div>
      <Dialog
        open={finish}
        disableBackdropClick
        disableEscapeKeyDown
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Well Done!
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You've matched them all in {moves} moves!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRestart} className="restartButton">RESTART</Button>
          <Link to="/" className="btn myHomeButton">HOME</Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}

  const mapStateToProps = (state) => {
    return {finish:state.finish, moves:state.moves}
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      handleRestart: () => dispatch(handleRestart())
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Finish);