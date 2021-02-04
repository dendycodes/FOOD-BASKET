import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LForm from "./login-form";
import SForm from "./sign-upform";
import Navbar from "../navbar/navbar.js";
import "./login.css";
class Login extends Component {
  state = {};
  render() {
    return (
      <Router>
        <div className="login" id="lgn">
          <Navbar
            first="User Login"
            loged="Contacts"
            settings="Help"
            list1="first"
            list2="second"
            link1="link1"
            link2="link2"
          />
          <Switch>
            {" "}
            <Route path="/" exact component={LForm}></Route>
            <Route path="/signup" component={SForm}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Login;
