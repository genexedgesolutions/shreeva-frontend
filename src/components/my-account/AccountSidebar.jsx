import { getUserData } from "@/api/auth";
import useAuthorization from "@/hooks/userAuthorization";
import parseJwt from "@/utlis/jwt";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";

export default function AccountSidebar() {
  const { pathname } = useLocation();
  const isAuthorized = useAuthorization();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const decodedToken = parseJwt(token);
          if (decodedToken && decodedToken._id) {
            const user = await getUserData(token);
            setUserData(user?.user || null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      setLoading(false); // Ensure this state is updated correctly
    };

    fetchUserData();
  }, []); // Ensure token isn't in dependency array (prevents infinite loops)

  // Handle authentication before returning UI
  if (isAuthorized === null || loading) {
    return <div>Loading...</div>; // Ensures hooks are rendered in the same order
  }
  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  if (!userData) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="wrap-sidebar-account">
      <div className="sidebar-account">
        <div className="account-avatar">
          <div className="image">
            <img
              alt=""
              src={userData.profilePhoto||"/images/avatar/user-default.jpg"}
              width={281}
              height={280}
            />
          </div>
          <h6 className="mb_4">{userData.firstName}</h6>
          <div className="body-text-1">{userData.email}</div>
        </div>
        <ul className="my-account-nav">
          <li>
            <Link
              to="/my-account"
              className={`my-account-nav-item ${
                pathname === "/my-account" ? "active" : ""
              }`}
            >
              Account Details
            </Link>
          </li>
          <li>
            <Link
              to="/my-orders"
              className={`my-account-nav-item ${
                pathname === "/my-orders" ? "active" : ""
              }`}
            >
              Your Orders
            </Link>
          </li>
          <li>
            <Link
              to="/my-address"
              className={`my-account-nav-item ${
                pathname === "/my-address" ? "active" : ""
              }`}
            >
              My Address
            </Link>
          </li>
          <li>
            <Link
               onClick={() => {
                localStorage.removeItem("authToken");
                window.location.href = "/login";
              }}
              className={`my-account-nav-item ${
                pathname === "/login" ? "active" : ""
              }`}
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
