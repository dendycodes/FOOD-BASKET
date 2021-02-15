import React, { Component } from "react";
import "./navbar.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import {
  Link,
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import Updateuser from "../Admin/Modal/user-info-update";
import axios from "axios";
class Navbar extends Component {
  state = {};
  logout() {
    localStorage.clear();
    window.location.pathname = "/";
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid w-100">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item" id={this.props.list1}>
                <label
                  id={this.props.link1}
                  className="nav-link active"
                  aria-current="page"
                >
                  {this.props.first}
                </label>
              </li>
              <li className="nav-item" id={this.props.list2}>
                <label
                  className="nav-link"
                  id={this.props.link2}
                  href={"#signup"}
                >
                  {this.props.second}
                </label>
              </li>
              <li className="nav-item dropdown">
                <label
                  className="nav-link dropdown-toggle"
                  href={"#com"}
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {this.props.loged}
                </label>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <Link className="logout" to={"/"}>
                    <li onClick={this.logout}>
                      <label className="dropdown-item">
                        {this.props.logout}
                      </label>
                    </li>
                  </Link>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
