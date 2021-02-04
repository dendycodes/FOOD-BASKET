import React, { Component } from "react";

class Loading extends Component {
  state = {};
  render() {
    return (
      <div className="loading">
        <div class="spinner-border text-danger m-2 " role="status">
          <span class="sr-only"></span>
        </div>
      </div>
    );
  }
}

export default Loading;
