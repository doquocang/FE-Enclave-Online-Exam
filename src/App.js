import logo from "./logo.svg";
import "./styles/App.scss";
import "./styles/Footer.scss";

import Header from "./components/General/Header";
import Login from "./components/General/Login";
import Footer from "./components/General/Footer";

import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import { refreshTokenApi } from "./services/UserService";
import React, { useEffect } from "react";
import { useState } from "react";
import { UserContext } from "./context/UserContext";
import { useContext } from "react";

import { Container } from "react-bootstrap";

function App() {
  const { user, loginContext } = useContext(UserContext);

  console.log("user: ", user);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      loginContext(
        localStorage.getItem("username"),
        localStorage.getItem("token")
      );

      let minute = 60 * 1000;
      const refreshTokenInterval = setInterval(async () => {
        let res = await refreshTokenApi(localStorage.getItem("token"));
        let newToken = res.result.token;
        localStorage.setItem("token", newToken);
        console.log(localStorage.getItem("token"));
      }, minute * 50);
      // Xóa lịch trình khi component unmount
      return () => clearInterval(refreshTokenInterval);
    }
  }, []);

  return (
    <>
      <div className="app-container">
        {/* HEADER */}
        <div className="header-container">
          <Header />
        </div>
        {/* MAIN */}
        <Container>
          <div className="main-container">
            <div className="sideNav-container"></div>
            <div className="app-content">
              <Outlet />
            </div>
          </div>
        </Container>
        {/* FOOTER */}
        <div className="footer-container">
          <Footer />
        </div>
      </div>
      {/* ALERT */}
      <ToastContainer />
    </>
  );
}

export default App;
