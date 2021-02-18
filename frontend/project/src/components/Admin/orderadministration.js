import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./admin.css";
import CommList from "./CommList";
import { Link } from "react-router-dom";
import axios from "axios";
import Deleteorder from "./Modal/OrderDELETE";

class Orderadmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: null,
    };
  }

  deleteOrder(orderid) {
    let config = {
      headers: {
        Authorization: localStorage.getItem("FBIdToken"),
      },
    };

    const url = `https://europe-west1-foodorderproject-fe50a.cloudfunctions.net/api/order/${orderid}`;

    axios
      .delete(url, config)

      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div onMouseOver={this.props.refreshorders} className="adminordr">
        <div className="hdr" id="adminhdr">
          <h6 id="titl">
            Order name: {this.props.orderName} &nbsp; | &nbsp; order by:{" "}
            {this.props.created}{" "}
          </h6>

          <Deleteorder
            visibility={this.props.visibility}
            title={"Delete"}
            text={"Are you sure you want to delete this order?"}
          />
          <Link to={`/orders/${this.props.orderid}`}>
            <button
              id="addbutton"
              className="btn btn-secondary  m-1"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              data-bs-whatever="@mdo"
              disabled={this.props.visibility}
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
        <CommList id={this.props.orderid} visibility={this.props.visibility} />
      </div>
    );
  }
}

export default Orderadmin;
