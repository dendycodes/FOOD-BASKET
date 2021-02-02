import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./login.css";
import $ from "jquery";
import axios from "axios";
class SForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: {},
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    const loginUrl =
      "https://europe-west1-foodorderproject-fe50a.cloudfunctions.net/api/signup";
    var newUserData = {};
    newUserData = {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username,
      confirmPassword: this.state.confirmPassword,
    };
    const ops = {
      method: "POST",
      headers: { "content-type": "application/json" },
      data: JSON.stringify(newUserData),
      url: loginUrl,
    };
    axios(ops)
      .then((res) => {
        localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);
        console.log("post response: " + res.username);
      })
      .catch((err) => {
        this.setState({
          errors: err.response.data,
        });
      });
  };

  render() {
    const { username, email, password, confirmPassword, errors } = this.state;
    return (
      <form className="form" id="signupform" onSubmit={this.submitHandler}>
        <h4>Creating new account</h4>
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
            required
            type="text"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="addon-wrapping"
            name="username"
            value={username}
            onChange={this.changeHandler}
          />
        </div>
        <p>{errors.username}</p>
        <div className="input-group flex-nowrap m-2">
          <span className="input-group-text" id="addon-wrapping">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-envelope-fill"
              viewBox="0 0 16 16"
            >
              <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z" />
            </svg>
          </span>

          <input
            required
            type="email"
            className="form-control"
            placeholder="Email"
            aria-label="Email"
            aria-describedby="addon-wrapping"
            name="email"
            value={email}
            onChange={this.changeHandler}
          />
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
            required
            type="password"
            className="form-control"
            placeholder="Password"
            aria-label="Password"
            aria-describedby="addon-wrapping"
            name="password"
            value={password}
            onChange={this.changeHandler}
          />
        </div>
        <p>{errors.password}</p>
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
            required
            type="password"
            className="form-control"
            placeholder="Confirm the password"
            aria-label=" Confirm the password "
            aria-describedby="addon-wrapping"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.changeHandler}
          />
        </div>
        <p>{errors.confirmPassword}</p>
        <button type="submit" className="btn btn-secondary w-25 m-2">
          Sign up
        </button>
        <p>{errors.error}</p>
        <label id="tologin" className="link-secondary">
          Already have an account?
        </label>
        <label id="message"></label>
      </form>
    );
  }
}

export default SForm;
