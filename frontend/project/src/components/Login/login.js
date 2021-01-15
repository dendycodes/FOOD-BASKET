import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import $ from "jquery";
import LForm from "./login-form";
import SForm from "./sign-upform";
import Navbar from "../navbar/navbar.js";
import "./login.css";
class Login extends Component {
  state = {};
  render() {
    return (
      <div className="login">
        <Navbar
          first="Login"
          second="Registration"
          loged="Contacts"
          settings="Help"
          list1="first"
          list2="second"
          link1="link1"
          link2="link2"
        />
        <LForm />
        <SForm />
      </div>
    );
  }
}
$(document).ready(function () {
  $("#tosignup").click(function () {
    $("#loginform").css({ display: "none" });
    $("#signupform").css({ display: "flex" });
    $("#link2").addClass("active");
    $("#link1").removeClass("active");
  });

  $("#second").click(function () {
    $("#loginform").css({ display: "none" });
    $("#signupform").css({ display: "flex" });
    $("#link2").addClass("active");
    $("#link1").removeClass("active");
  });

  $("#tologin").click(function () {
    $("#signupform").css({ display: "none" });
    $("#loginform").css({ display: "flex" });
    $("#link1").addClass("active");
    $("#link2").removeClass("active");
  });

  $("#first").click(function () {
    $("#signupform").css({ display: "none" });
    $("#loginform").css({ display: "flex" });
    $("#link1").addClass("active");
    $("#link2").removeClass("active");
  });
});

export default Login;
