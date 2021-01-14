import React, { Component } from "react";
import "./navbar.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
class Navbar extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item" id="first">
                <label
                  id="link1"
                  className="nav-link active"
                  aria-current="page"
                >
                  {this.props.first}
                </label>
              </li>
              <li className="nav-item" id="second">
                <label className="nav-link" id="link2" href={"#signup"}>
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
                  <li>
                    <label className="dropdown-item" href={"#com"}>
                      {this.props.settings}
                    </label>
                  </li>
                  <li>
                    <label className="dropdown-item" href={"#com"}>
                      {this.props.logout}
                    </label>
                  </li>
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
