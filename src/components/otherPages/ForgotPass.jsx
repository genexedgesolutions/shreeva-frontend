import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { forgotPassword } from "@/api/auth";

export default function ForgotPass() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await forgotPassword({ email: email });
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="login-wrap">
          <div className="left">
            <div className="heading">
              <h4 className="mb_8">Reset your password</h4>
              <p>We will send you an email to reset your password</p>
            </div>
            <form onSubmit={handleSubmit} className="form-login">
              <div className="wrap">
                <fieldset>
                  <input
                    type="email"
                    placeholder="Enter your email address*"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </fieldset>
              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
              {message && <p style={{ color: "green" }}>{message}</p>}
              <div className="button-submit">
                <button className="tf-btn btn-fill" type="submit">
                  <span className="text text-button">Submit</span>
                </button>
              </div>
            </form>
          </div>
          <div className="right">
            <h4 className="mb_8">New Customer</h4>
            <p className="text">
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
