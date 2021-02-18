import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./comments.css";
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

class EditComment extends Component {
  state = {
    open: false,
    newComment: this.props.data.comment,
    errors: {},
  };

  componentDidMount() {
    this.setState({
      comment: this.props.comment ? this.props.comment : "",
    });
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
  editComment = () => {
    let url = window.location.href;
    let index = url.lastIndexOf("/");
    let commentID = url.substring(index + 1);

    const commentIdUrl = `https://europe-west1-foodorderproject-fe50a.cloudfunctions.net/api/comment/${commentID}`;
    console.log(commentIdUrl);

    let comment = {
      comment: this.state.newComment,
    };

    const ops = {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `${localStorage.getItem("FBIdToken")}`,
      },
      data: JSON.stringify(comment),
      url: commentIdUrl,
    };

    axios(ops)
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        if (err.response) this.setState({ errors: err.response.data });
      });
  };

  render() {
    const {
      data: { comment },
    } = this.props;
    return (
      <div className="editComment">
        <Tooltip title="Edit comment">
          <IconButton
            aria-label="edit"
            color="primary"
            tip="Edit Comment"
            onClick={this.handleOpen}
            id="editBtn"
          >
            <EditIcon fontSize="small" color="action" />
          </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.state.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit your comment</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="newComment"
                type="text"
                label="comment"
                placeholder="Write your comment here"
                value={this.state.newComment}
                onChange={this.changeHandler}
                fullWidth
              />
            </form>

            {this.state.errors.error === "Unauthorized" ? (
              <p className="orderErr">You don't have access to this comment</p>
            ) : (
              <div className="orderErrDel">{this.state.errors.error}</div>
            )}
            <p className="orderErr">{this.state.errors.Comment}</p>
          </DialogContent>

          <DialogActions className="dialogBtn">
            <Button
              onClick={this.handleClose}
              color="primary"
              className="dialogBtn"
            >
              Cancel
            </Button>
            <Button
              onClick={this.editComment}
              color="primary"
              className="dialogBtn"
            >
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default EditComment;
