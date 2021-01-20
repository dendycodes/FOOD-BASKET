import React from "react";
import "./App.css";
import Header from "./components/header/header.js";
import Login from "./components/Login/login.js";
import Main from "./components/mainpage/main.js";
function App() {
  const token = localStorage.getItem("token");

  if (token /*Chechking for session*/) {
    return (
      <div className="App">
        <Header />
        <Main />
      </div>
    );
  } else {
    return (
      <div className="App">
        <Header />
        <Login />
      </div>
    );
  }
}

export default App;
