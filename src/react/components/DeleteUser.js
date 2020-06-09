import React from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { deleteUser } from "../../redux";

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTextChange = (event) => {
    setUsername(event.target.value);
  };

  const handleDelete = (event) => {
    if (username === props.children) {
      dispatch(deleteUser(username));
    }
    return (
      <Redirect to="/" />
    )
  };

  return (
    <div>
      <Button variant="filled" color="secondary" onClick={handleClickOpen}>
        Delete User
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Are you sure you want to delete your Kwitter profile? All your Kweets
          and likes will also be removed.
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To delete your profile, type {props.children}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label={props.children}
            fullWidth
            onChange={handleTextChange}
            value={username}
          />
        </DialogContent>
        <DialogActions>
          {username === props.children && (
            <Button onClick={handleDelete} color="primary">
              Delete {props.chilren} permanently!
            </Button>
          )}
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
