import React from "react";

// @function  UserContext
const UserContext = React.createContext({ username: "", auth: false });

// @function  UserProvider
// Create function to provide UserContext
const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState({ username: "", auth: false });

  const loginContext = (username, token) => {
    setUser((user) => ({
      username: username,
      auth: true,
    }));
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser((user) => ({
      username: "",
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, loginContext, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
