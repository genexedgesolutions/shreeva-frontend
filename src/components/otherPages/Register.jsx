import { Link } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "@/api/auth";

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: {
      houseNo: "",
      street: "",
      city: "",
      state: "",
      country: "India",
      pincode: "",
    },
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.address) {
      setFormData({
        ...formData,
        address: { ...formData.address, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const data = await registerUser(formData);
      if (data.success) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError("User already registered, please log in.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="login-wrap">
          <div className="left">
            <div className="heading">
              <h4>Register</h4>
            </div>
            {error && <p className="error text-danger">{error}</p>}
            {success && <p className="success">{success}</p>}
            <form onSubmit={handleSubmit} className="form-login">
              <div className="wrap">
                <fieldset>
                  <input
                    type="text"
                    placeholder="FirstName*"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </fieldset>
                <fieldset>
                  <input
                    type="text"
                    placeholder="LastName*"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </fieldset>
                <fieldset>
                  <input
                    type="email"
                    placeholder="Email Address*"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </fieldset>
                <fieldset>
                  <input
                    type="password"
                    placeholder="Password*"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </fieldset>
                <fieldset>
                  <input
                    type="password"
                    placeholder="Confirm Password*"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </fieldset>
                <fieldset>
                  <input
                    type="text"
                    placeholder="Phone Number*"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </fieldset>
                <fieldset>
                  <input
                    type="text"
                    placeholder="House No*"
                    name="houseNo"
                    value={formData.address.houseNo}
                    onChange={handleChange}
                    required
                  />
                </fieldset>
                <fieldset>
                  <input
                    type="text"
                    placeholder="Street*"
                    name="street"
                    value={formData.address.street}
                    onChange={handleChange}
                    required
                  />
                </fieldset>
                <fieldset>
                  <input
                    type="text"
                    placeholder="City*"
                    name="city"
                    value={formData.address.city}
                    onChange={handleChange}
                    required
                  />
                </fieldset>
                <fieldset className="tf-select">
                  <select
                    className=""
                    name="state"
                    value={formData.address.state}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select State*</option>
                    {indianStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </fieldset>
                <fieldset>
                  <input
                    type="text"
                    placeholder="Pincode*"
                    name="pincode"
                    value={formData.address.pincode}
                    onChange={handleChange}
                    required
                  />
                </fieldset>
                <div className="button-submit">
                  <button className="tf-btn btn-fill" type="submit">
                    <span className="text text-button">Register</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="right">
            <h4 className="mb_8">Already have an account?</h4>
            <p className="text-primary">
              Welcome back. Sign in to access your personalized experience!
            </p>
            <Link to="/login" className="tf-btn btn-fill">
              <span className="text text-button">Login</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
