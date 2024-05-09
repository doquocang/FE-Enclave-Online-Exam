import React, { useContext } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoutes = ({ element, ...rest }) => {
  const { user } = useContext(UserContext);

  return user ? (
    <Routes>
      <Route {...rest} element={element} />
    </Routes>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoutes;
