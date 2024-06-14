import "bootstrap/dist/css/bootstrap.css";
import { Dropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutApi } from "../../services/UserService";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

import "./Header.scss"

function Header() {
  const { logout, user } = useContext(UserContext);

  const [hideHeader, setHideHeader] = useState(false);

  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  let timeoutId;

  // useEffect(() => {
  //   if (window.location.pathname === "/login") {
  //     setHideHeader(true);
  //   }
  // }, []);

  const handleLogout = () => {
    logoutApi(localStorage.getItem("token"));
    logout();
    navigate("/login");
    toast.success("Log out successfully!"); //move to constant
  };

  const handleDropdownOpen = (dropdown) => {
    clearTimeout(timeoutId);
    if (dropdown === "choices") {
      // avoid using string, use number instead, if keep using string, have to move to constant
      setIsDropdownOpen(true);
    } else if (dropdown === "setting") {
      setIsSettingOpen(true);
    }
  };

  const handleDropdownClose = (dropdown) => {
    timeoutId = setTimeout(() => {
      if (dropdown === "choices") {
        setIsDropdownOpen(false);
      } else if (dropdown === "setting") {
        setIsSettingOpen(false);
      }
    }, 200); // Đặt thời gian trễ 200ms // ,move 200 to
  };

  const handleClearTimeout = () => {
    clearTimeout(timeoutId);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink to="/" className="navbar-brand">
          Enclave English Exam
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item>
              {user && !user.auth && (
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              )}
            </Nav.Item>
            <Nav.Link href="#link">Link</Nav.Link>

            {user && user.auth /* {!hideHeader && ( */ && (
              <NavDropdown
                title="Your choices"
                id="basic-nav-dropdown"
                show={isDropdownOpen}
                onMouseEnter={() => handleDropdownOpen("choices")}
                onMouseLeave={() => handleDropdownClose("choices")}
                onMouseMove={handleClearTimeout}
              >
                <NavLink
                  onClick={() => setIsDropdownOpen(false)}
                  to="/user/study"
                  className="dropdown-item"
                >
                  Your study
                </NavLink>

                <NavLink
                  onClick={() => setIsDropdownOpen(false)}
                  to="/user/practice"
                  className="dropdown-item"
                >
                  Your Practice
                </NavLink>

                <NavDropdown.Item href="#action/3.3">
                  Something123
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>

          {user && user.auth /* {!hideHeader && ( */ && (
            <Nav>
              {user && user.username && (
                <span className="nav-link">Welcome {user.username} </span>
              )}
              <NavDropdown
                title="Setting"
                id="basic-nav-dropdown"
                show={isSettingOpen}
                onMouseEnter={() => handleDropdownOpen("setting")}
                onMouseLeave={() => handleDropdownClose("setting")}
                onMouseMove={handleClearTimeout}
              >
                <Dropdown.Item
                  onClick={() => handleLogout()}
                  className="dropdown-item"
                >
                  Log out
                </Dropdown.Item>
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
