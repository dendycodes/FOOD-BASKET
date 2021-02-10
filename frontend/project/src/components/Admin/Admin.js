import React, { Component } from "react";
import Navbar from "../navbar/navbar.js";
import Orderadmin from "./orderadministration.js";
import User from "./user.js";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import axios from "axios";
import Modalorder from "./Modal/neworder";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Loading from "./loading";

import "./user.js";

import "./admin.css";

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      orders: [],
      comments: [],
    };
  }

  Orders() {
    let config = {
      headers: {
        Authorization: localStorage.getItem("FBIdToken"),
      },
    };

    axios
      .get(
        "https://europe-west1-foodorderproject-fe50a.cloudfunctions.net/api/getOrders",
        config
      )

      .then((res) => {
        console.log(res.data);
        this.setState({
          orders: res.data,
        });
      })

      .catch((err) => console.log(err));
  }

  Comments() {
    let config = {
      headers: {
        Authorization: localStorage.getItem("FBIdToken"),
      },
    };

    axios
      .get(
        "https://europe-west1-foodorderproject-fe50a.cloudfunctions.net/api/getComments",
        config
      )

      .then((res) => {
        console.log(res.data);
        this.setState({
          comments: res.data,
        });
      })

      .catch((err) => console.log(err));
  }

  componentDidMount() {
    let config = {
      headers: {
        Authorization: localStorage.getItem("FBIdToken"),
      },
    };

    axios
      .get(
        "https://europe-west1-foodorderproject-fe50a.cloudfunctions.net/api/users",
        config
      )

      .then((res) => {
        console.log(res.data);
        this.setState({
          users: res.data,
        });
      })

      .catch((err) => console.log(err));

    this.Orders();
    this.Comments();
  }

  render() {
    console.log(localStorage);
    const date = new Date();
    var visibility = false;
    let orders = this.state.orders ? (
      this.state.orders.map((ord) => {
        console.log(
          ord.requestedTime + " " + Math.floor(new Date(date.getTime()) / 1000)
        );
        if (Math.floor(new Date(date.getTime() / 1000)) >= ord.requestedTime) {
          visibility = true;
        }
        return (
          <Orderadmin
            orderid={ord.id}
            key={ord.id}
            orderName={ord.orderName}
            hour={new Date(ord.requestedTime * 1000).getHours()}
            minutes={new Date(ord.requestedTime * 1000).getMinutes()}
            visibility={visibility}
            created={ord.username}
          />
        );
      })
    ) : (
      <Loading />
    );

    let users = this.state.users ? (
      this.state.users.map((user) => {
        return (
          <User
            userid={user.userId}
            key={user.userId}
            username={user.username}
            email={user.email}
            img={user.imageUrl}
          />
        );
      })
    ) : (
      <Loading />
    );

    return (
      <div className="admin">
        <Navbar
          className="adminnav"
          first="Administration"
          loged={localStorage.getItem("UserEmail")}
          settings="Account settings"
          logout="Logout"
        />
        <div className="adminpage">
          <div className="accordion w-100 accr" id="accordionExample">
            <div className="accordion-item" id="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  id="btn2"
                  className=" btn "
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="false"
                  aria-controls="collapseOne"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-people-fill m-1"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    <path
                      fillRule="evenodd"
                      d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
                    />
                    <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                  </svg>
                  Users
                </button>
                <button
                  id="btn2"
                  className=" btn  "
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-list-nested m-1"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 11.5A.5.5 0 0 1 5 11h10a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 1 3h10a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5z"
                    />
                  </svg>
                  Orders
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show "
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body" id="accordion-body">
                  {users}
                </div>
              </div>

              <div
                id="collapseTwo"
                className="accordion-collapse collapse "
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body" id="accordion-body">
                  {orders}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
