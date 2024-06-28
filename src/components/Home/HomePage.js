import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.scss";


const HomePage = (props) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);
  
  return(
    <div className="home-page">
      <div className="search-content-header">Learn to Code, English</div>
      <div className="search-content-footer"> We engineer our clients' successes!</div>
    </div>
  )
}

export default HomePage;