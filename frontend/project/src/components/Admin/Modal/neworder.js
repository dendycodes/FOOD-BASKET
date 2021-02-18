import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import axios from "axios";
import "../admin.css";
class Modalorder extends Component {
  constructor() {
    super();
    this.state = {
      comment: "",
      errors: {},
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    let url = window.location.href;
    let index = url.lastIndexOf("/");
    let a = url.substring(index + 1);
    const commentUrl = `https://europe-west1-foodorderproject-fe50a.cloudfunctions.net/api/orders/${a}/comment`;

    console.log(commentUrl);
    var commentData = {
      comment: this.state.comment,
    };

    const ops = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("FBIdToken"),
      },
      data: JSON.stringify(commentData),
      url: commentUrl,
    };

    axios(ops)
      .then((res) => {
        this.props.refresh();
      })
      .catch((err) => {
        this.setState({
          errors: err.response.data,
        });
      });

    document.getElementById("message-text").value = "";
  };

  render() {
    const { comment, errors } = this.state;
    // console.log("BTN " + document.querySelectorAll(".myBtn")[1].classList);

    return (
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Your order
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={this.submitHandler}>
                <div className="mb-3"></div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Type your order here:
                  </label>
                  <textarea
                    className="form-control"
                    id="message-text"
                    name="comment"
                    value={comment}
                    onChange={this.changeHandler}
                  />

                  <div className="ordErr">{errors.Comment}</div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.submitHandler}
                data-bs-dismiss="modal"
              >
                Add your comment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modalorder;
