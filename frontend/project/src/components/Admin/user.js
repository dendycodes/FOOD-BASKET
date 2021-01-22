import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./admin.css";
class User extends Component {
  state = {};
  render() {
    return (
      <div className="User">
        <img src="https://simpleicon.com/wp-content/uploads/user-5.png"></img>
        <div className="vl"></div>
        <div className="info">
          <h6>
            <b>Username: </b> &nbsp; {this.props.username}
          </h6>
          <h6>
            <b>Email:</b> &nbsp; {this.props.email}
          </h6>
        </div>
        <div className="actions">
          <button type="button" className="btn btn-secondary m-1">
            View Orders
          </button>
          <button type="button" className="btn btn-secondary m-1">
            Update
          </button>
          <button type="button" className="btn btn-danger m-1">
            Delete
          </button>
        </div>
      </div>
    );
  }
}
export default User;
