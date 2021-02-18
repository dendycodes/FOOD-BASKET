import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import "../admin.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

class AlertDialog extends Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  delete = () => {
    this.handleClose();
    this.props.deletefunc(this.props.funcprop);
    this.props.refresh();
  };

  render() {
    return (
      <div>
        <Tooltip title="Delete comment">
          <IconButton
            style={{ outline: "none" }}
            aria-label="delete"
            disabled={this.props.disabled}
          >
            <DeleteIcon color={this.props.btn} onClick={this.handleClickOpen} />
          </IconButton>
        </Tooltip>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.props.text}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <buton className="btn btn-secondary" onClick={this.handleClose}>
              Cancel
            </buton>
            <buton className="btn btn-danger" onClick={this.delete}>
              Delete
            </buton>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default AlertDialog;
