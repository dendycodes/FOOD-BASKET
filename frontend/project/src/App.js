import React from "react";
import "./App.css";
import Header from "./components/header/header.js";
import Login from "./components/Login/login.js";
import Main from "./components/mainpage/main.js";
function App() {
  var token = localStorage.getItem("token");
  const userInfo = localStorage.getItem("userInfo");
  token = 2323;
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
