import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./list.css";
import Modalorder from "../../Admin/Modal/neworder.js";

class Neworder extends Component {
  render() {
    return (
      <div className="ordr">
        <div className="hdr">
          <h6>Group name: "{this.props.group}"</h6>
          <button
            id="addbutton"
            className="btn btn-danger "
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            data-bs-whatever="@mdo"
          >
            Add your comment
          </button>
        </div>
        <hr />
        <h6> {this.props.user}</h6>
        <Modalorder />
      </div>
    );
  }
}

export default Neworder;
