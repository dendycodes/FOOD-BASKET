import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./login.css";
import "../mainpage/main.js";
import axios from "axios";
import { Link } from "react-router-dom";
class LForm extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submitHandler = (e) => {
    e.preventDefault();
    console.log(this.state);

    const loginUrl =
      "https://europe-west1-foodorderproject-fe50a.cloudfunctions.net/api/login";
    var userData = {};
    userData = {
      email: this.state.email,
      password: this.state.password,
    };
    const ops = {
      method: "POST",
      headers: { "content-type": "application/json" },
      data: JSON.stringify(userData),
      url: loginUrl,
    };
    axios(ops)
      .then((res) => {
        localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);

        console.log("post response: " + res.data);
        console.log("post response: " + res.data.token);
        window.location.reload();
      })
      .catch((err) => {
        this.setState({
          errors: err.response.data,
        });
      });
  };

  render() {
    const { email, password, errors } = this.state;
    return (
      <form className="form" id="loginform" onSubmit={this.submitHandler}>
        <h4>Welcome, please login</h4>
        <div className="input-group flex-nowrap m-2">
          <span className="input-group-text" id="addon-wrapping">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-person-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
          </span>

          <input
            autoFocus
            type="email"
            className="form-control"
            placeholder="Email"
            aria-label="Email"
            aria-describedby="addon-wrapping"
            name="email"
            value={email}
            onChange={this.changeHandler}
          ></input>
        </div>
        <p>{errors.email}</p>
        <div className="input-group flex-nowrap m-2">
          <span className="input-group-text" id="addon-wrapping">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-key-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
            </svg>
          </span>

          <input
            type="password"
            className="form-control"
            placeholder="Password"
            aria-label="Password"
            aria-describedby="addon-wrapping"
            name="password"
            value={password}
            onChange={this.changeHandler}
          ></input>
        </div>
        <p>{errors.password}</p>

        <button
          type="submit"
          onSubmit={this.submitHandler}
          className="btn btn-secondary w-25 m-2"
        >
          Login
        </button>
        <p>
          {errors.error}
          {errors.general}
        </p>
        <Link to={"/signup"}>
          {" "}
          <label id="tosignup" className="link-secondary">
            Create new account
          </label>
        </Link>
      </form>
    );
  }
}

export default LForm;
