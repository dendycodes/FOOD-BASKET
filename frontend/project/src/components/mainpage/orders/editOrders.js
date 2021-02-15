import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./list.css";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

class EditOrders extends Component {
  state = {
    open: false,
    newOrder: this.props.orderName,
    time: "",
    requestedTime: this.props.requestedTime,
    errors: {},
  };

  componentDidMount() {
    this.setState({
      order: this.props.orderName ? this.props.orderName : "",
    });
  }
  handleOpen = () => {
    this.setState({ open: true });
    this.setState({
      order: this.props.orderName ? this.props.orderName : "",
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  editOrder = () => {
    let url = window.location.href;
    let index = url.lastIndexOf("/");
    let orderId = url.substring(index + 1);

    const orderIdUrl = `https://europe-west1-foodorderproject-fe50a.cloudfunctions.net/api/order/${orderId}`;

    let order = {};
    if (new Date(this.state.requestedTime * 1000).getHours() === 0) {
      order = {
        orderName: this.state.newOrder,
        requestedTime: this.props.requestedTime,
      };
    } else {
      order = {
        orderName: this.state.newOrder,
        requestedTime: this.state.requestedTime,
      };
    }

    const ops = {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `${localStorage.getItem("FBIdToken")}`,
      },
      data: JSON.stringify(order),
      url: orderIdUrl,
    };

    axios(ops)
      .then((res) => {
        window.location.reload("localhost:3000");
      })
      .catch((err) => {
        if (err.response) this.setState({ errors: err.response.data });
      });
  };

  render() {
    let { time } = this.state;
    let date = new Date();
    date.setHours(time.substring(0, 2));
    date.setMinutes(time.substring(3));
    this.state.requestedTime = Math.floor(date / 1000);
    return (
      <>
        <Tooltip title="Edit Order">
          <IconButton
            aria-label="edit"
            color="primary"
            tip="Edit Order"
            onClick={this.handleOpen}
            id="editOrderBtn"
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.state.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit your Order</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="newOrder"
                type="text"
                label="order"
                placeholder="Write your order here"
                value={this.state.newOrder}
                onChange={this.changeHandler}
                fullWidth
              />

              <span className="chooseTime"> Choose time : </span>
              <TextField
                name="time"
                value={time}
                type="time"
                className="form-control m-1 w-100"
                id="editedTimeInput"
                onChange={this.changeHandler}
                required
              />
            </form>
            <div className="orderErrDel">
              {this.state.errors.error === "Unauthorized"
                ? "You don't have access to this order"
                : ""}
            </div>
          </DialogContent>
          <DialogActions className="dialogBtn">
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.editOrder} color="primary">
              Save changes
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default EditOrders;
