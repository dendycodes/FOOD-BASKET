import React, { Component } from "react";

class Loading extends Component {
  state = {};
  render() {
    return (
      <div className="loading">
        <div className="spinner-border text-danger m-2 " role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    );
  }
}

export default Loading;
