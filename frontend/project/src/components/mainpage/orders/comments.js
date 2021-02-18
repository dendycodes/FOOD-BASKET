import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./comments.css";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import { Link } from "react-router-dom";
import { DialogActions, DialogTitle } from "@material-ui/core";
import EditComments from "./editComments";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Loading from "../../Admin/loading";

class Comment extends Component {
  state = {
    comments: null,
    open: false,
    newComment: "",
    errors: {},
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  deleteComment = () => {
    let url = window.location.href;
    let index = url.lastIndexOf("/");
    let commentID = url.substring(index + 1);
    console.log(commentID);
    const commentIdUrl = `https://europe-west1-foodorderproject-fe50a.cloudfunctions.net/api/comment/${commentID}`;

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

  componentDidMount() {
    const commentUrl = `https://europe-west1-foodorderproject-fe50a.cloudfunctions.net/api/orders/${this.props.id}`;

    axios
      .get(commentUrl)
      .then((res) => {
        this.setState({
          comments: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (this.state.comments !== null) {
      return (
        <>
          {this.state.comments.orderData.comments.map((c) => {
            return (
              <div className="comments-container" key={c.id}>
                <img className="cmtPic" src={c.userImage} alt="Profile" />
                <div className="data-container">
                  <div className="username-date-container">
                    <p className="username">{c.username}</p>
                    <div className="date-container">
                      {new Date(
                        c.createdAt._seconds * 1000
                      ).toLocaleTimeString()}
                    </div>
                  </div>

                  <p className="comment-container">{c.comment}</p>
                  <div className="container">
                    <Link to={`/${c.id}`}>
                      <Tooltip title="Delete comment">
                        <IconButton
                          aria-label="delete"
                          color="primary"
                          tip="Delete Order"
                          onClick={this.handleOpen}
                          id="delBtn"
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
                          Are you sure you want to delete this comment?
                        </DialogTitle>

                        {this.state.errors.error === "Unauthorized" ? (
                          <p className="orderErrDel">
                            You don't have access to this comment
                          </p>
                        ) : (
                          <p className="orderErrDel">
                            {" "}
                            {this.state.errors.error}
                          </p>
                        )}

                        <DialogActions className="dialogBtn">
                          <Button
                            onClick={this.handleClose}
                            color="primary"
                            className="dialogBtn"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={this.deleteComment}
                            color="secondary"
                            className="dialogBtn"
                          >
                            Delete
                          </Button>
                        </DialogActions>
                      </Dialog>
                      {/* Edit Comment */}
                      <EditComments data={c} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      );
    } else return <Loading />;
  }
}

export default Comment;
