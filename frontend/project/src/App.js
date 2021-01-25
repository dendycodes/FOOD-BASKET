import React from "react";
import "./App.css";
import Header from "./components/header/header.js";
import Login from "./components/Login/login.js";
import Main from "./components/mainpage/main.js";
import Admin from "./components/Admin/Admin.js";
function App() {
  var token = localStorage.getItem("token");
  const userInfo = localStorage.getItem("userInfo");
  var adminInfo = localStorage.getItem("adminInfo");

  token = "admin";
  if (adminInfo /*Chechking for session*/) {
    return (
      <div className="App">
        <Header />
        <Admin />
      </div>
    );
  }

  if (token /*Chechking for session*/) {
    return (
      <div className="App">
        <Header />
        <Main user={userInfo} />
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <Login />
    </div>
  );
}

export default App;
