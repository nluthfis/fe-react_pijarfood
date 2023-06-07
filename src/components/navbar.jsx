import React from "react";
import { Link } from "react-router-dom";

import "../styles/Navbar.css";

function Navbar() {
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
                {localStorage.getItem("auth") ? (
                  <>
                    <Link
                      className="nav-item nav-link"
                      onClick={() => {
                        localStorage.clear();
                        window.location.href = "/login";
                      }}
                    >
                      Logout
                    </Link>
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
