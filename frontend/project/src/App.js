import React from "react";
import "./App.css";
import Header from "./components/header/header.js";
import Login from "./components/Login/login.js";
import Main from "./components/mainpage/main.js";
import Admin from "./components/Admin/Admin.js";
import { BrowserRouter as Router } from "react-router-dom";
function App() {
  const token = localStorage.getItem("FBIdToken");
  // = localStorage.getItem("token");
  const userInfo = localStorage.getItem("userInfo");
  var adminInfo = localStorage.getItem("adminInfo");
  adminInfo = "ds";
  if (adminInfo /*Chechking for session*/) {
    return (
      <Router>
        <div className="App">
          <Header />
          <Admin />
        </div>
      </Router>
    );
  }

  if (token /*Chechking for session*/) {
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
