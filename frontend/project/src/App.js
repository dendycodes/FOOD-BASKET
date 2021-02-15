import React from "react";
import "./App.css";
import Header from "./components/header/header.js";
import Login from "./components/Login/login.js";
import Main from "./components/mainpage/main.js";
import Admin from "./components/Admin/Admin.js";
import { BrowserRouter as Router } from "react-router-dom";
import jwtDecode from "jwt-decode";
function App() {
  const token = localStorage.getItem("FBIdToken");
  const userInfo = localStorage.getItem("userInfo");
  var adminInfo = localStorage.getItem("adminInfo");
  const userEmail = localStorage.getItem("UserEmail");

  if (userEmail === "admin@email.com") {
    adminInfo = token;
  }

  const storedToken = localStorage.getItem("FBIdToken");

  if (storedToken) {
    let decodedData = jwtDecode(storedToken);
    let expirationDate = decodedData.exp;
    var current_time = Math.floor(Date.now() / 1000);

    if (expirationDate < current_time) {
      localStorage.removeItem("FBIdToken");
      window.location.pathname = "/";
    }
  }
  if (adminInfo) {
    return (
      <Router>
        <div className="App">
          <Header />
          <Admin />
        </div>
      </Router>
    );
  }

  if (token) {
    return (
      <Router>
        <div className="App">
          <Header />
          <Main user={userInfo} />
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <div className="App">
        <Header />
        <Login />
      </div>
    </Router>
  );
}

export default App;
