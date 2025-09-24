import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "@/api/auth";
export default function Login() {
  const [passwordType, setPasswordType] = useState("password");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const togglePassword = () => {
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };
  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Login Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await loginUser(formData); // Call login API
      localStorage.setItem("authToken", response.token); // Store token
      navigate("/my-account"); // Redirect user to dashboard
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="login-wrap">
          <div className="left">
            <div className="heading">
              <h4>Login</h4>
            </div>
            {error && <p className="error-message">{error}</p>}{" "}
            {/* Show error message */}
            <form
              onSubmit={handleSubmit}
              className="form-login form-has-password"
            >
              <div className="wrap">
                <fieldset>
                  <input
                    type="email"
                    placeholder="Username or email address*"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </fieldset>
                <fieldset className="position-relative password-item">
                  <input
                    className="input-password"
                    type={passwordType}
                    placeholder="Password*"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                  />
                  <span
                    className={`toggle-password ${
                      passwordType !== "text" ? "unshow" : ""
                    }`}
                    onClick={togglePassword}
                  >
                    <i
                      className={`icon-eye-${
                        passwordType !== "text" ? "hide" : "show"
                      }-line`}
                    />
                  </span>
                </fieldset>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="tf-cart-checkbox">
                    <input
                      type="checkbox"
                      id="login-form_agree"
                      name="agree_checkbox"
                    />
                    <label htmlFor="login-form_agree"> Remember me </label>
                  </div>
                  <Link
                    to="/forget-password"
                    className="text-button forget-password link"
                  >
                    Forgot Your Password?
                  </Link>
                </div>
              </div>
              <div className="button-submit">
                <button className="tf-btn btn-fill" type="submit">
                  <span className="text text-button">Login</span>
                </button>
              </div>
            </form>
          </div>
          <div className="right">
            <h4 className="mb_8">New Customer</h4>
            <p>
              Join us today and unlock a world of exclusive benefits, offers,
              and personalized experiences.
            </p>
            <Link to="/register" className="tf-btn btn-fill">
              <span className="text text-button">Register</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
