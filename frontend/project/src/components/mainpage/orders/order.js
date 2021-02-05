import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./list.css";
import Modalorder from "../../Admin/Modal/neworder";
import { Link, BrowserRouter as Router } from "react-router-dom";

import Comment from "./comments";

class Neworder extends Component {
  render() {
    const {
      ord: { orderName, /* counter  username ,createdAt,*/ requestedTime, id },
    } = this.props;
    console.log(this.props.match);

    let hour = new Date(requestedTime * 1000).getHours();
    let minutes = new Date(requestedTime * 1000).getMinutes().toString();
    if (minutes.length === 1) {
      minutes = `0${minutes}`;
    }

    return (
      <div className="ordr">
        <div className="hdr">
          <div className="group-name-and-time-container">
            <h6 className="group-name">
              Group name: {orderName} &nbsp; | &nbsp;
            </h6>
            <h6 className="time">
              Time: {hour}:{minutes}
            </h6>
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
