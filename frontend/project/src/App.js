import React from "react";
import "./App.css";
import Header from "./components/header/header.js";

import Login from "./components/Login/login.js";
import Main from "./components/mainpage/main.js";
function App() {
  return (
    <div className="App">
      <Header />
      <Login />
      <Main />
    </div>
  );
}

export default App;
