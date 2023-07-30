import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAuth } from "../reducers/auth";
import "../styles/auth.css";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      navigate("/profile");
    }
  }, []);

  const handeLogin = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
        email: email,
        password: password,
      })
      .then((result) => {
        Swal.fire({
          title: "Login Success",
          text: "Login Success",
          icon: "success",
        }).then(() => {
          localStorage.setItem("auth", "true");
          localStorage.setItem("token", result?.data?.token);
          dispatch(addAuth(result.data));
          navigate("/profile");
        });
      })
      .catch((error) => {
        let errorMessage = "Something went wrong";
        if (error.response && error.response.status === 401) {
          errorMessage = "Invalid email or password";
        } else if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          errorMessage = error.response.data.message;
        }
        Swal.fire({
          title: "Login Failed",
          text: errorMessage,
          icon: "error",
        });
      });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="row g-0">
        <div className="col-6 left vh-100 d-flex justify-content-center align-items-center">
          <img className="logo" src="/img/logo.png" alt="img-logo" />
        </div>
        <div className="col-md-5 col-xs-10 right d-flex flex-column justify-content-center">
          <div className="container">
            <h1 className="text-center mt-3">Welcome</h1>
            <p className="text-center text-secondary">
              Log in into your existing account
            </p>
            <div className="row justify-content-center">
              <div className="col col-7">
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                  }}
                >
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      E-mail
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="E-mail"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <div className="row">
                      <div className="col">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control"
                          id="password"
                          name="password"
                          placeholder="Password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="col-auto">
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
                    <button
                      type="submit"
                      className="btn btn-warning"
                      onClick={handeLogin}
                    >
                      Log in
                    </button>
                  </div>
                  <p className="text-end fs-6 fw-medium mt-3">
                    <a
                      href="/ForgotPassword"
                      className="text-decoration-none text-black text-body-secondary"
                    >
                      Forgot Password?
                    </a>
                  </p>
                </form>
              </div>
            </div>
            <p className="text-center">
              Don't have an account?
              <Link
                to="/register"
                className="text-decoration-none"
                style={{ color: " #efc81a", fontWeight: "bold" }}
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
