import React, { Component } from "react";
import Modalorder from "./Modal/neworder";
import axios from "axios";
import AlertDialog from "./Modal/CommentDELETE";
class Comment extends Component {
  deleteComment = (id) => {
    let config = {
      headers: {
        Authorization: localStorage.getItem("FBIdToken"),
      },
    };
    const url = `https://europe-west1-foodorderproject-fe50a.cloudfunctions.net/api/comment/${id}`;
    axios
      .delete(url, config)
      .then(this.props.refresh())
      .catch((err) => console.log(err));
  };

  state = {};
  render() {
    return (
      <div className="list-group w-100 p-1 ">
        <div className="list-group-item list-group-item-action flex-column align-items-start ">
          <div id="box" className="d-flex  justify-content-between  p-2">
            <label id="h6" className="mb-1">
              {" "}
              <img
                className="small-pic"
                src={this.props.userImage}
                onClick={this.props.refresh}
                alt="userphoto"
              ></img>{" "}
              {this.props.username}
            </label>
            <div className={"time"}>
              <i> {this.props.hour}</i>
            </div>
          </div>

          <div id="box2">
            <textarea
              disabled
              className="ds m-1"
              value={this.props.value}
            ></textarea>
            <AlertDialog
              open={false}
              refresh={this.props.refresh}
              disabled={this.props.visibility}
              title={"Delete"}
              text={"Are you sure you want to delete this comment?"}
              deletefunc={this.deleteComment}
              funcprop={this.props.commentId}
            />
          </div>
        </div>
        <Modalorder refresh={this.props.refresh} />
      </div>
    );
  }
}

export default Comment;
