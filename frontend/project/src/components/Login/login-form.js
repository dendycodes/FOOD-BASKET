import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./login.css";
class LForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(this.state));
    fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify(this.state),
    });
  };

  render() {
    const { username, password } = this.state;
    return (
      <form id="loginform" onSubmit={this.submitHandler}>
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
            type="text"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="addon-wrapping"
            name="username"
            value={username}
            onChange={this.changeHandler}
          ></input>
        </div>
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
        <button
          type="submit"
          onSubmit={this.submitHandler}
          className="btn btn-secondary w-25 m-2"
        >
          Login
        </button>

        <label id="tosignup" className="link-secondary">
          Create new account
        </label>
      </form>
    );
  }
}

export default LForm;
