import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { getUserData } from "@/api/auth";
import useAuthorization from "@/hooks/userAuthorization";
import parseJwt from "@/utlis/jwt";

export default function AccountSidebarMobile() {
  const { pathname } = useLocation();
  const isAuthorized = useAuthorization();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    };

    fetchUserData();
  }, []);

  if (isAuthorized === null || loading) return <div>Loading...</div>;
  if (!isAuthorized) return <Navigate to="/login" replace />;
  if (!userData) return <div>Loading user data...</div>;

  return (
    <div
      className="offcanvas offcanvas-start"
      tabIndex="-1"
      id="mbAccount"
      aria-labelledby="mbAccountLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="mbAccountLabel">My Account</h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>

      <div className="offcanvas-body p-3 d-flex flex-column gap-4">
        <div className="account-avatar text-center">
          <div className="image mb-3">
            <img
              alt="User Avatar"
              src={userData.profilePhoto || "/images/avatar/user-default.jpg"}
              width={100}
              height={100}
              className="rounded-circle"
            />
          </div>
          <h6 className="mb-1">{userData.firstName}</h6>
          <div className="text-muted small">{userData.email}</div>
        </div>

        <ul className="list-unstyled mt-4">
          <li className="mb-2">
            <Link
              to="/my-account"
              className={`d-block py-2 px-3 rounded ${pathname === "/my-account" ? "bg-primary text-white" : "text-dark"}`}
            >
              Account Details
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/my-orders"
              className={`d-block py-2 px-3 rounded ${pathname === "/my-orders" ? "bg-primary text-white" : "text-dark"}`}
            >
              Your Orders
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/my-address"
              className={`d-block py-2 px-3 rounded ${pathname === "/my-address" ? "bg-primary text-white" : "text-dark"}`}
            >
              My Address
            </Link>
          </li>
          <li className="mt-3">
            <Link
              to="/login"
              className="d-block py-2 px-3 rounded text-danger"
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
