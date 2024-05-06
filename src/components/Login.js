import React, { useEffect, useState, useContext } from "react";
import { loginApi } from "../services/UserService";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../context/UserContext";

const Login = () => {
  const { loginContext } = useContext(UserContext);

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loadingAPI, setLoadingAPI] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      //move user to home page, if the token is exist already
      navigate("/");
    }
  }, []);

  //user press enter
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error("Password is required!!!");
      return;
    }
    setLoadingAPI(true);
    try {
      let res = await loginApi(username, password);
      console.log("check login: ", res);
      if (res && res.code === 1000) {
        loginContext(username, res.result.token);
        navigate("/");
        toast(res.message);
      } else if (res && res.code === 1006) {
        toast.error("Wrong username or password");
      } else {
        toast.error("Server connection error!");
      }
      setLoadingAPI(false);
    } catch (error) {
      toast.error("Something wrong!");
    }
  };

  return (
    <>
      <div className="login-container col-11 col-sm-4">
        <div className="title">Log in</div>
        <div className="text"></div>
        <input
          type="text"
          placeholder="Username..."
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          onKeyDown={handleKeyDown}
        />

        <div className="input-2">
          <input
            type={isShowPassword === true ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          <i
            className={
              isShowPassword === true
                ? "fa-solid fa-eye"
                : "fa-solid fa-eye-slash"
            }
            onClick={() => setIsShowPassword(!isShowPassword)}
          ></i>
        </div>
        <button
          className={!(username && password) ? "" : "active"}
          // disabled={!(username && password) || loadingAPI ? true : false}
          disabled={loadingAPI || !(username && password)}
          onClick={() => handleLogin()}
        >
          {loadingAPI && <i className="fa-solid fa-sync fa-spin"></i>}
          &nbsp;Login
        </button>
        <div className="request-account">
          <i className="fa-regular fa-user"></i> Request Account
        </div>
      </div>
    </>
  );
};

export default Login;
