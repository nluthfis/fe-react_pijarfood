import React, { useState } from "react";
import "../styles/auth.css";
import axios from "axios";
import Swal from "sweetalert2";

import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    let errorMessage = "";
    switch (name) {
      case "fullName":
        if (value.trim() === "") {
          errorMessage = "Name is required";
        }
        break;
      case "email":
        if (value.trim() === "") {
          errorMessage = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          errorMessage = "Invalid email address";
        }
        break;
      case "phoneNumber":
        if (value.trim() === "") {
          errorMessage = "Phone number is required";
        } else if (!/^\d{10}$/.test(value)) {
          errorMessage = "Invalid phone number";
        }
        break;
      case "password":
        if (value.trim() === "") {
          errorMessage = "Password is required";
        }
        break;
      default:
        break;
    }

    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.fullName.trim() === "") {
        Swal.fire({
          title: "Error",
          text: "Name is required",
          icon: "error",
        });
        return;
      }
      if (formData.email.trim() === "") {
        Swal.fire({
          title: "Error",
          text: "Email is required",
          icon: "error",
        });
        return;
      }
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        Swal.fire({
          title: "Error",
          text: "Invalid email address",
          icon: "error",
        });
        return;
      }
      if (formData.phoneNumber.trim() === "") {
        Swal.fire({
          title: "Error",
          text: "Phone number is required",
          icon: "error",
        });
        return;
      }
      if (formData.password.trim() === "") {
        Swal.fire({
          title: "Error",
          text: "Password is required",
          icon: "error",
        });
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/profile/register`,
        formData
      );
      Swal.fire({
        title: "Register Success",
        text: "Register Success",
        icon: "success",
      }).then(() => {
        navigate("/login");
      });
    } catch (error) {
      if (error.response.data.message === "Email already exists") {
        Swal.fire({
          title: "Error",
          text: "Email already exists",
          icon: "error",
        });
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <div className="row g-0">
        <div className="col-md-6 col-xs-10 left vh-100 d-flex justify-content-center align-items-center">
          <img src="/img/logo.png" alt="img-logo" />
        </div>
        <div className="col-md-5 col-xs-10 right d-flex flex-column justify-content-center">
          <h1 className="text-center mt-3">Let's Get Started!</h1>
          <p className="text-center text-secondary m-2">
            Create a new account to access all features
          </p>
          <div className="row justify-content-center">
            <div className="col col-9">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">
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
                  <label htmlFor="email" className="form-label">
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
                  <label htmlFor="phoneNumber" className="form-label">
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
                  <label htmlFor="password" className="form-label">
                    Create New Password
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control form-control-sm"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create new password"
                    />
                    <div className="col">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={handleTogglePassword}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-warning mt-3">
                    Create Account
                  </button>
                </div>
              </form>
            </div>
          </div>
          <p className="text-center mt-2">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-decoration-none"
              style={{ color: "#efc81a", fontWeight: "bold" }}
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
