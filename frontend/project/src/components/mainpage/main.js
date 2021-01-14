import React, { Component } from "react";
import Navbar from "../navbar/navbar.js";
import $ from "jquery";
import "./main.css";
class Main extends Component {
  state = {};
  render() {
    return (
      <div className="main">
        <Navbar
          first="Home"
          second="Today's Orders"
          loged="USER"
          settings="Settings"
          logout="Logout"
        />
      </div>
    );
  }
}
$(document).ready(function () {
  $("#tosignup").click(function () {
    $("#link2").addClass("active");
    $("#link1").removeClass("active");
  });

  $("#second").click(function () {
    $("#link2").addClass("active");
    $("#link1").removeClass("active");
  });

  $("#tologin").click(function () {
    $("#link1").addClass("active");
    $("#link2").removeClass("active");
  });

  $("#first").click(function () {
    $("#link1").addClass("active");
    $("#link2").removeClass("active");
  });
});
export default Main;
