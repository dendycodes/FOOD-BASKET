import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./admin.css";
import { Link } from "react-router-dom";

class Orderadmin extends Component {
  render() {
    return (
      <div className="adminordr">
        <div className="hdr" id="adminhdr">
          <h6 id="titl">Order name: {this.props.orderName} </h6>

          <button id="addbutton" className="btn btn-danger m-1 ">
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
            Delete Order
          </button>
          <Link to={`/${this.props.orderid}`}>
            <button
              id="addbutton"
              className="btn btn-secondary  m-1"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              data-bs-whatever="@mdo"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-plus"
                viewBox="0 0 16 16"
              >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
              New comment
            </button>
          </Link>

          <small id="time" className="text-muted">
            <p>
              Final hour: {this.props.hour}:{this.props.minutes}
            </p>
          </small>
        </div>
        <h6> {this.props.user}</h6>
        <div className="list-group w-100 p-1 ">
          <div className="list-group-item list-group-item-action flex-column align-items-start ">
            <div id="box" className="d-flex  justify-content-between  p-2">
              <label id="h6" className="mb-1">
                {" "}
                <img
                  className="small-pic"
                  src="https://simpleicon.com/wp-content/uploads/user-5.png"
                  alt="userphoto"
                ></img>{" "}
                {this.props.username}
              </label>
            </div>
            <div id="box2">
              <textarea
                disabled
                className="ds m-1"
                value={this.props.comment}
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
      </div>
    );
  }
}

export default Orderadmin;
