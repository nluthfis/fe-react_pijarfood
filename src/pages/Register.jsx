import React, { useState } from "react";
import "../styles/auth.css";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.fullName]: e.target.value });
    setFormData({ ...formData, [e.target.email]: e.target.value });
    setFormData({ ...formData, [e.target.password]: e.target.value });
    setFormData({ ...formData, [e.target.phoneNumber]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://clean-ruby-cuttlefish.cyclic.app/profile",
        formData
      );
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div className="row g-0">
        <div className="col-md-6 col-xs-10 left vh-100 d-flex justify-content-center align-items-center">
          <img src="/img/logo.png" alt="img-logo" />
        </div>
        <div className="col-md-5 col-xs-10 right d-flex flex-column justify-content-center">
          <h1 className="text-center">Let's Get Started !</h1>
          <p className="text-center text-secondary">
            Create new account to access all features
          </p>
          <div className="row justify-content-center">
            <div className="col col-7">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label for="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Name"
                  />
                </div>
                <div className="mb-3">
                  <label for="email" className="form-label">
                    Email Address*
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="mb-3">
                  <label for="phoneNumber" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="08xxxxxxxxxx"
                  />
                </div>
                <div className="mb-3">
                  <label for="password" className="form-label">
                    Create New Password
                  </label>
                  <input
                    type="password"
                    className="form-control form-control-sm"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create new password"
                  />
                </div>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="termsConditions"
                    name="termsConditions"
                  />
                  <label className="form-check-label">
                    I agree to terms [&] conditions
                  </label>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-warning">
                    Sign Up
                  </button>
                </div>
                <p className="text-end">
                  <a
                    href="./forgot-password.html"
                    className="text-decoration-none text-black"
                  >
                    Forgot Password?
                  </a>
                </p>
              </form>
            </div>
          </div>
          <p className="text-center">
            Already have account?
            <Link
              to="/login"
              className="text-decoration-none"
              style={{ color: "#efc81a" }}
            >
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Register;
