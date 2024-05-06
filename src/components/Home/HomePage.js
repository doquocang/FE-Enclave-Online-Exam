import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = (props) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);
  
  return(
    <div>Home component</div>
  )
}

export default HomePage;