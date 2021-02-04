import React, { Component } from "react";
import "./main.css";
import List from "./orders/list.js";
import axios from "axios";
class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderName: "",
      time: "",
      requestedTime: "",
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();

    const orderUrl =
      "https://europe-west1-foodorderproject-fe50a.cloudfunctions.net/api/orders";
    var orderData = {};
    orderData = {
      orderName: this.state.orderName,
      requestedTime: this.state.requestedTime,
    };
    const ops = {
      method: "POST",
      headers: { "content-type": "application/json" },
      data: JSON.stringify(orderData),
      url: orderUrl,
    };
    axios(ops)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { orderName, time } = this.state;
    const date = new Date();
    date.setHours(time.substring(0, 2));
    date.setMinutes(time.substring(3));
    this.state.requestedTime = Math.floor(new Date(date.getTime()) / 1000);

    return (
      <div id="ordr">
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                id="btn"
                className=" btn btn-dark w-100 "
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne"
              >
                Make new group order
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
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <form onSubmit={this.submitHandler}>
                  <input
                    id="groupname"
                    name="orderName"
                    value={orderName}
                    type="text"
                    className="form-control m-1"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    placeholder="Group name"
                    onChange={this.changeHandler}
                    required
                  ></input>

                  <input
                    name="time"
                    value={time}
                    placeholder="Select time "
                    required
                    className="form-control m-1 w-100"
                    type="time"
                    id="example-time-input"
                    min="09:00"
                    max="18:00"
                    onChange={this.changeHandler}
                  />

                  <button type="submit" className="btn btn-danger w-100 m-1">
                    Create group
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-patch-check-fill m-1"
                      viewBox="0 0 16 16"
                    >
                      <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <List />
      </div>
    );
  }
}

export default Orders;
