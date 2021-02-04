import React, { Component } from "react";
import Neworder from "./order.js";
import "./list.css";
class List extends Component {
  constructor() {
    super();
    this.state = {
      orders: [],
    };
  }

  componentDidMount() {
    fetch("/orders")
      .then((res) => res.json())
      .then((orders) =>
        this.setState({ orders }, () => console.log("Orders fatched..", orders))
      );
  }

  render() {
    return (
      <div className="order">
        <button id="btn" className=" btn btn-dark w-100 " type="button">
          Today's orders
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-justify-left m-1"
            viewBox="0 0 16 16"
          >
            <path d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
          </svg>
        </button>

        {this.state.orders.map((order) => (
          <Neworder
            group={order.name}
            user={order.user}
            comment={order.comment}
          />
        ))}

        <Neworder />
        <Neworder />
        <Neworder />
        <Neworder />
      </div>
    );
  }
}

export default List;