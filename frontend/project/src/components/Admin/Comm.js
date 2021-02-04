import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./admin.css";

import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "./loading";

class Comm extends Component {
  state = {
    comments: null,
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
              <div className="list-group w-100 p-1 " key={c.id}>
                <div className="list-group-item list-group-item-action flex-column align-items-start ">
                  <div
                    id="box"
                    className="d-flex  justify-content-between  p-2"
                  >
                    <label id="h6" className="mb-1">
                      {" "}
                      <img
                        className="small-pic"
                        src={c.userImage}
                        alt="userphoto"
                      ></img>{" "}
                      {c.username}
                    </label>
                  </div>
                  <div id="box2">
                    <textarea
                      disabled
                      className="ds m-1"
                      value={c.comment}
                    ></textarea>
                    <button
                      id="edit"
                      type="button"
                      className="btn btn-secondary m-1 sze "
                      data-toggle="tooltip"
                      data-placement="right"
                      title="Update this order"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="25"
                        fill="currentColor"
                        className="bi bi-pencil-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                      </svg>{" "}
                    </button>
                    <button
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
          })}
        </>
      );
    } else return <Loading />;
  }
}

export default Comm;
