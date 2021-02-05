import React, { Component } from "react";

import axios from "axios";

class Comment extends Component {
  deleteComment(id) {
    let config = {
      headers: {
        Authorization: localStorage.getItem("FBIdToken"),
      },
    };
    const url = `https://europe-west1-foodorderproject-fe50a.cloudfunctions.net/api/comment/${id}`;
    axios
      .delete(url, config)

      .catch((err) => console.log(err));
  }

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
                alt="userphoto"
              ></img>{" "}
              {this.props.username}
            </label>
          </div>
          <div id="box2">
            <textarea
              disabled
              className="ds m-1"
              value={this.props.value}
            ></textarea>

            <button
              onClick={() => this.deleteComment(this.props.commentId)}
              type="button"
              className="btn btn-danger m-1 sze "
              data-toggle="tooltip"
              data-placement="right"
              title="Delete this order"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="27"
                fill="currentColor"
                className="bi bi-x"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Comment;
