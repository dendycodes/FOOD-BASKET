import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./admin.css";

class User extends Component {
  state = {};
  render() {
    return (
      <div className="User">
        <img
          src="https://simpleicon.com/wp-content/uploads/user-5.png"
          alt="userphoto"
        ></img>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="16"
              fill="currentColor"
              className="bi bi-list-nested m-1"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4.5 11.5A.5.5 0 0 1 5 11h10a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 1 3h10a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5z"
              />
            </svg>
            View Orders
          </button>
          <button
            type="button"
            className="btn btn-secondary m-1"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal2"
            data-bs-whatever="@mdo"
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
            Update
          </button>
          <button type="button" className="btn btn-danger m-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
            Delete User
          </button>
        </div>
      </div>
    );
  }
}
export default User;
