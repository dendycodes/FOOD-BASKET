import React, { Component } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import "../admin.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

class Deleteorder extends Component {
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
        <button
          disabled={this.props.visibility}
          id="addbutton"
          className="btn btn-danger m-1 "
          onClick={this.handleClickOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-x"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
          Delete Order
        </button>

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
export default Deleteorder;
