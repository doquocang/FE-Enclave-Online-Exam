import logo from "./logo.svg";
import "./styles/App.scss";
import "./styles/Footer.scss"

import Header from "./components/Header";
import Login from "./components/Login";
import Footer from "./components/Footer";

import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import { refreshTokenApi } from "./services/UserService";
import React, { useEffect } from "react";
import { useState } from "react";
import { UserContext } from "./context/UserContext";
import { useContext } from "react";

function App() {
  const { user } = useContext(UserContext);
  
  console.log("user: ", user);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      let minute = 60 * 1000;
      const refreshTokenInterval = setInterval(async () => {
        let res = await refreshTokenApi(localStorage.getItem("token"));
        let newToken = res.result.token;
        localStorage.setItem("token", newToken);
        // console.log(localStorage.getItem("token"));
      }, minute * 40);
      // Xóa lịch trình khi component unmount
      return () => clearInterval(refreshTokenInterval);
    }
  }, []);
  
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="main-container">
        <div className="sideNav-container"></div>
        <div className="app-content">
          <Outlet />
        </div>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
