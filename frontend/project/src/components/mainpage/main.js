import React, { Component } from "react";
import Navbar from "../navbar/navbar.js";

import Orders from "./orederpage.js";

import "./main.css";

class Main extends Component {
  state = {};
  render() {
    return (
      <div className="main">
        <Navbar
          id="mainnav"
          first="Today's Orders"
          loged="USER"
          settings="Settings"
          logout="Logout"
          list1="home"
          list2="orders"
          link1="lnk1"
          link2="lnk2"
        />

        <Orders />
      </div>
    );
  }
}

export default Main;
