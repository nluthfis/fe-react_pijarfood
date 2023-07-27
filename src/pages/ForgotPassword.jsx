import React from "react";

function ForgotPassword() {
  return (
    <div>
      <div className="row g-0">
        <div className="col-6 left vh-100 d-flex justify-content-center align-items-center">
          <img className="logo" src="/img/logo.png" alt="img-logo" />
        </div>
        <div className="col-md-5 col-xs-10 right d-flex flex-column justify-content-center">
          <div className="container">
            <h1 className="text-center mt-3">Forgot Password?</h1>
            <p className="text-center text-secondary">
              We just need your registered e-mail address <br />
              to send your password resend
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
                    />
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-warning">
                      Send E-mail
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
