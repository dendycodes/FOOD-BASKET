import React, { Component } from "react";
import Navbar from "../navbar/navbar.js";
import Welcome from "./welcome.js";
import Orders from "./orederpage.js";
import $ from "jquery";
import "./main.css";

class Main extends Component {
  state = {};
  render() {
    return (
      <div className="main">
        <Navbar
          id="mainnav"
          first="Home"
          second="Today's Orders"
          loged="USER"
          settings="Settings"
          logout="Logout"
          list1="home"
          list2="orders"
          link1="lnk1"
          link2="lnk2"
        />
        <Welcome />
        <Orders />
      </div>
    );
  }
}

$(document).ready(function () {
  $("#home").click(function () {
    $("#welcome").css({
      display: "block",
    });
    $("#ordr").css({
      display: "none",
    });
    $("#lnk1").addClass("active");
    $("#lnk2").removeClass("active");
  });

  $("#orders").click(function () {
    $("#ordr").css({
      display: "block",
    });

    $("#welcome").css({
      display: "none",
    });

    $("#lnk2").addClass("active");
    $("#lnk1").removeClass("active");
  });
});

export default Main;
