import { Routes, Route } from "react-router-dom";
import HomePage from "../components/Home/HomePage";
import Login from "../components/Login/Login";
import App from "../App";
import PrivateRoutes from "./PrivateRoutes";
import UserRoutes from "./UserRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="user/*" element={<PrivateRoutes />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
