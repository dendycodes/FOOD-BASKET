import React, { Component } from "react";
import Navbar from "../navbar/navbar.js";
import Orderadmin from "./orderadministration.js";
import User from "./user.js";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import Updateuser from "./Modal/user-info-update.js";
import "./user.js";

import "./admin.css";
class Admin extends Component {
  constructor() {
    super();
    this.state = {
      users: [
        {
          id: "7WwKLvTGBRXPvsIgghFHdil",
          username: "Nikolay",
          email: "nik@abv.bg",
        },
        {
          id: "7WwKLvTGBRXPvsIhnjHdil",
          username: "Deniz",
          email: "deniz.memduev@hotmail.com",
        },
        {
          id: "7WwKLvTGBRXPverIFHgxcgxdil",
          username: "Nikola",
          email: "nikola@abv.bg",
        },
        {
          id: "7WwKLvTGBRXPvsIretFHgxgdil",
          username: "Kamen",
          email: "kamen@abv.bg",
        },
      ],

      orders: [
        {
          orderid: "syqzIw8ofnsd3Y9SbABBdS",
          orderName: "Поръчка от Хепи",
          username: "new",
          hour: "14",
          minute: "35",
        },

        {
          orderid: "syqzIw8ofn3Y9SggdbABBdS",
          orderName: "Поръчка от Billa",
          username: "gabriela",
          hour: "11",
          minute: "35",
        },

        {
          orderid: "syqzIw8ofn3Y9SfdfbABBdS",
          orderName: "Поръчка от McDonalds",
          username: "deniz",
          hour: "15",
          minute: "35",
        },

        {
          orderid: "syqzIw8ofn3Y9SbssfdtrtABBdS",
          orderName: "Поръчка от Kaufland",
          username: "ivan",
          hour: "13",
          minute: "35",
        },
      ],
    };
  }
  /*
  componentDidMount() {
    fetch("/users")
      .then((res) => res.json())
      .then((users) =>
        this.setState({ users }, () => console.log("Users fatched..", users))
      );
  }
*/
  render() {
    return (
      <div className="admin">
        <Navbar
          className="adminnav"
          first="Administration"
          loged="USER"
          settings="Account settings"
          logout="Logout"
        />
        <div className="adminpage">
          <div className="accordion w-100 accr" id="accordionExample">
            <div className="accordion-item" id="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  id="btn2"
                  className=" btn "
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="false"
                  aria-controls="collapseOne"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-people-fill m-1"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    <path
                      fillRule="evenodd"
                      d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
                    />
                    <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                  </svg>
                  Users
                </button>
                <button
                  id="btn2"
                  className=" btn  "
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-list-nested m-1"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 11.5A.5.5 0 0 1 5 11h10a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 1 3h10a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5z"
                    />
                  </svg>
                  Orders
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body" id="accordion-body">
                  {this.state.users.map((user) => (
                    <User
                      key={user.id}
                      username={user.username}
                      email={user.email}
                    />
                  ))}
                </div>
              </div>

              <div
                id="collapseTwo"
                className="accordion-collapse collapse "
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body" id="accordion-body">
                  {this.state.orders.map((order) => (
                    <Orderadmin
                      key={order.orderid}
                      orderName={order.orderName}
                      hour={order.hour}
                      minutes={order.minute}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Updateuser />
      </div>
    );
  }
}

export default Admin;
