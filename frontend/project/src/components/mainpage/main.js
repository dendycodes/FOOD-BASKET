import React, { Component } from "react";
import Navbar from "../navbar/navbar.js";
import { BrowserRouter as Router } from "react-router-dom";
import Orders from "./orederpage.js";
import axios from "axios";
import "./main.css";
import Loading from "../Admin/loading";

class Main extends Component {
  state = {
    users: null,
  };
  componentDidMount() {
    axios
      .get(
        "https://europe-west1-foodorderproject-fe50a.cloudfunctions.net/api/users"
      )
      .then((res) => {
        this.setState({
          users: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    this.state.users ? (
      this.state.users.map((user) => {
        if (user.email === localStorage.getItem("UserEmail")) {
          localStorage.setItem("imageUrl", user.imageUrl);
          localStorage.setItem("username", user.username);
          localStorage.setItem("createdAt", user.createdAt._seconds);
        }
        return;
      })
    ) : (
      <Loading />
    );

    return (
      <Router>
        <div className="main" id="mn">
          <Navbar
            id="mainnav"
            first="Today's Orders"
            loged={localStorage.getItem("UserEmail")}
            settings="Settings"
            logout="Logout"
            list1="home"
            list2="orders"
            link1="lnk1"
            link2="lnk2"
          />

          <Orders />
        </div>
      </Router>
    );
  }
}

export default Main;
