import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reducers/auth";

function Navbar() {
  const isAuthenticated = localStorage.getItem("auth");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    window.location.href = "/login";
  };

  return (
    <div>
      <div className="container align-item-center mt-4">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <div>
              <img
                className="logo-logo"
                src="/img/logo2.png"
                height="25px"
                alt="CoolBrand"
              />
            </div>

            <button
              type="button"
              className="navbar-toggler"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarCollapse">
              <div className="navbar-nav">
                <Link to="/" className="nav-item nav-link active">
                  Home
                </Link>
                <Link to="/addrecipe" className="nav-item nav-link">
                  Add Recipe
                </Link>
                <Link to="/profile" className="nav-item nav-link">
                  Profile
                </Link>
              </div>
              <div className="navbar-nav ms-auto">
                {isAuthenticated ? (
                  <>
                    <div className="navbar-nav">
                      <Link
                        to="/EditProfile"
                        className="nav-item nav-link active"
                      >
                        Edit Profile
                      </Link>
                      <Link
                        to="/"
                        className="nav-item nav-link active "
                        onClick={handleLogout}
                      >
                        Logout
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="nav-item nav-link">
                      Login
                    </Link>
                    <Link to="/register" className="nav-item nav-link">
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
