import { Routes, Route } from "react-router-dom";
import HomePage from "../components/Home/HomePage";
import Login from "../components/General/Login";
import App from "../App";
import PrivateRoutes from "./PrivateRoutes";
import UserRoutes from "./UserRoutes";


const AppRoutes = () => {
  console.log(<PrivateRoutes path="user/*" element={<UserRoutes />} />);
  console.log(<Route />);
  console.log(<Routes />)
    return (

    <>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<Login />} />
        {/* private routes (user routes) */}
        
        <PrivateRoutes path="user/*" element={<UserRoutes />} />
      </Route>
      
    </Routes>
    {/* <PrivateRoutes path="user/*" element={<UserRoutes />} />  it works when I move this line out of here*/ } 
    </>
  );
};

export default AppRoutes;
