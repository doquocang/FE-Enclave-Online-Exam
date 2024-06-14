import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import UserRoutes from "./UserRoutes";

const PrivateRoutes = ({ element, ...rest }) => {
  const { user } = useContext(UserContext);
  return user && user.auth ? <UserRoutes /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
