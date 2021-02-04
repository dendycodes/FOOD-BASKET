import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import axios from "axios";
class Modalorder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
    };
  }
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();

    let config = {
      headers: {
        Authorization: localStorage.getItem("FBIdToken"),
      },
    };

    axios.post(
      "https://europe-west1-foodorderproject-fe50a.cloudfunctions.net/api" +
        this.props.location.pathname +
        "/comment",
      config
    );
  };

  render() {
    const { comment } = this.state;
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
              <form>
                <div className="mb-3"></div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Type your order here:
                  </label>
                  <textarea
                    name="comment"
                    value={comment}
                    onChange={this.changeHandler}
                    className="form-control"
                    id="message-text"
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-success">
                Add your order
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modalorder;
