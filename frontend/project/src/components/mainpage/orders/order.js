import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./list.css";
import Modalorder from "../../Admin/Modal/neworder";
import { Link, BrowserRouter as Router } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import { DialogActions, DialogTitle } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Comment from "./comments";
import axios from "axios";
import EditOrders from "./editOrders";
import Tooltip from "@material-ui/core/Tooltip";
class Neworder extends Component {
  state = {
    comments: null,
    open: false,
    errors: {},
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  deleteOrder = () => {
    let url = window.location.href;
    let index = url.lastIndexOf("/");
    let orderId = url.substring(index + 1);
    console.log(orderId);
    const commentIdUrl = `https://europe-west1-foodorderproject-fe50a.cloudfunctions.net/api/order/${orderId}`;

    const ops = {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `${localStorage.getItem("FBIdToken")}`,
      },

      url: commentIdUrl,
    };

    axios(ops)
      .then((res) => {
        console.log(res.data);
        window.location.reload("localhost:3000");
      })
      .catch((err) => {
        if (err.response)
          this.setState({
            errors: err.response.data,
          });
      });
  };
  render() {
    const {
      ord: { orderName, requestedTime, id, username },
    } = this.props;

    let hour = new Date(requestedTime * 1000).getHours();
    let minutes = new Date(requestedTime * 1000).getMinutes().toString();
    if (minutes.length === 1) {
      minutes = `0${minutes}`;
    }

    return (
      <div className="ordr">
        <div className="hdr">
          <div className="group-name-and-time-container">
            <div className="fitting-container">
              <h6 className="group-name">
                Group name: {orderName} &nbsp;|&nbsp;
              </h6>
              <h6 className="time">
                Time: {hour}:{minutes}&nbsp;|&nbsp;
              </h6>
              <h6 className="order-created-by-user">
                created by:&nbsp;<span>{username}</span>
              </h6>
            </div>

            <Link to={`/${id}`}>
              <Tooltip title="Delete order">
                <IconButton
                  aria-label="delete"
                  color="primary"
                  tip="Delete Order"
                  onClick={this.handleOpen}
                  id="delBtnOrd"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Dialog
                open={this.state.open}
                onClose={this.state.handleClose}
                fullWidth
                maxWidth="sm"
              >
                <DialogTitle>
                  Are you sure you want to delete this order?
                </DialogTitle>
                <p className="orderErrDel">
                  {this.state.errors.error === "Unauthorized"
                    ? "You don't have access to this order"
                    : this.state.errors.error}
                </p>
                <DialogActions className="dialogBtn">
                  <Button
                    onClick={this.handleClose}
                    color="primary"
                    className="dialogBtn"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={this.deleteOrder}
                    color="secondary"
                    className="dialogBtn"
                  >
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>

              <EditOrders orderName={orderName} requestedTime={requestedTime} />
            </Link>

            <Router>
              <Link to={`/${id}`}>
                <button
                  id="addbutton"
                  className="btn btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  data-bs-whatever="@mdo"
                >
                  New order
                </button>
              </Link>
            </Router>
          </div>
        </div>
        <hr />
        <Comment id={id} />
        <h6> {this.props.user} </h6>

        <Modalorder id={id} />
      </div>
    );
  }
}

export default Neworder;
