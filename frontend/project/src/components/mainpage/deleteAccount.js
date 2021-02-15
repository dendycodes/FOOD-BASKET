import React, { Component } from "react";
import "./main.css";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import { DialogActions, DialogTitle } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

class DeleteAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  deleteAccount = () => {
    const accountIdUrl = `https://europe-west1-foodorderproject-fe50a.cloudfunctions.net/api/user/${localStorage.getItem(
      "username"
    )}`;
    const ops = {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `${localStorage.getItem("FBIdToken")}`,
      },
      url: accountIdUrl,
    };

    axios(ops)
      .then((res) => {
        localStorage.clear();
        window.location.pathname = "/";
      })
      .catch((err) => {
        this.setState({
          errors: err.response.data,
        });
      });
  };

  render() {
    return (
      <>
        <div className="deleteAccountBtn">
          <Tooltip title="Delete account">
            <Button
              id="deleteAccountBtn-src"
              variant="contained"
              color="secondary"
              onClick={this.handleOpen}
              startIcon={<DeleteForeverIcon />}
            >
              Delete Account
            </Button>
          </Tooltip>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle>
              Are you sure you want to delete your account permanently?
            </DialogTitle>
            <DialogActions className="dialogBtn">
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.deleteAccount} color="secondary">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </>
    );
  }
}

export default DeleteAccount;
