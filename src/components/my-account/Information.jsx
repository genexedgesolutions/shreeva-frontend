import React, { useState } from "react";

export default function Information({ userData }) {
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [newPasswordType, setNewPasswordType] = useState("password");

  // State for password fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Error and success messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Simulating stored password (This should come from backend)
  const storedPassword = "userOldPassword"; // Replace with actual user password from backend

  // Toggle password visibility
  const togglePassword = () => {
    setPasswordType((prev) => (prev === "password" ? "text" : "password"));
  };
  const toggleNewPassword = () => {
    setNewPasswordType((prev) => (prev === "password" ? "text" : "password"));
  };
  const toggleConfirmPassword = () => {
    setConfirmPasswordType((prev) =>
      prev === "password" ? "text" : "password"
    );
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (currentPassword !== storedPassword) {
      setError("Current password is incorrect.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }

    // Simulate password update success
    setSuccess("Password updated successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="my-account-content">
      <div className="account-details">
        <form onSubmit={handleSubmit} className="form-account-details">
          <div className="account-info">
            <h5 className="title">Account Information</h5>
            <div className="cols mb_20">
              <fieldset>
                <input
                  type="text"
                  placeholder="First Name*"
                  defaultValue={userData?.firstName || ""}
                  required
                />
              </fieldset>
              <fieldset>
                <input
                  type="text"
                  placeholder="Last Name*"
                  defaultValue={userData?.lastName || ""}
                  required
                />
              </fieldset>
            </div>
            <div className="cols mb_20">
              <fieldset>
                <input
                  type="email"
                  placeholder="Email*"
                  defaultValue={userData?.email || ""}
                  required
                />
              </fieldset>
              <fieldset>
                <input
                  type="text"
                  placeholder="Phone*"
                  defaultValue={userData?.phone || ""}
                  required
                />
              </fieldset>
            </div>
            <div className="tf-select">
              <select id="country" name="address[country]" defaultValue="India">
                <option value="India">India</option>
              </select>
            </div>
          </div>

          <div className="account-password">
            <h5 className="title">Change Password</h5>

            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <fieldset className="position-relative password-item mb_20">
              <input
                className="input-password"
                type={passwordType}
                placeholder="Current Password*"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <span className="toggle-password" onClick={togglePassword}>
                <i
                  className={`icon-eye-${
                    passwordType === "text" ? "show" : "hide"
                  }-line`}
                />
              </span>
            </fieldset>

            <fieldset className="position-relative password-item mb_20">
              <input
                className="input-password"
                type={newPasswordType}
                placeholder="New Password*"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <span className="toggle-password" onClick={toggleNewPassword}>
                <i
                  className={`icon-eye-${
                    newPasswordType === "text" ? "show" : "hide"
                  }-line`}
                />
              </span>
            </fieldset>

            <fieldset className="position-relative password-item">
              <input
                className="input-password"
                type={confirmPasswordType}
                placeholder="Confirm Password*"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span className="toggle-password" onClick={toggleConfirmPassword}>
                <i
                  className={`icon-eye-${
                    confirmPasswordType === "text" ? "show" : "hide"
                  }-line`}
                />
              </span>
            </fieldset>
          </div>

          <div className="button-submit">
            <button className="tf-btn btn-fill" type="submit">
              <span className="text text-button">Update Account</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
