import { useState, useEffect } from "react";
import parseJwt from "@/utlis/jwt";

export default function useAuthorization() {
  const [isAuthorized, setIsAuthorized] = useState(null); // Initially null to avoid false redirects

  useEffect(() => {
    const checkAuthorization = () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setIsAuthorized(false);
          return;
        }

        const decodedToken = parseJwt(token);
        const currentTime = Math.floor(Date.now() / 1000);

        // Check if token is expired
        if (decodedToken.exp && decodedToken.exp < currentTime) {
          localStorage.removeItem("authToken"); // Remove expired token
          setIsAuthorized(false);
          return;
        }

        setIsAuthorized(true);
      } catch (error) {
        console.error("Error parsing JWT token:", error);
        setIsAuthorized(false);
      }
    };

    checkAuthorization();
  }, []);

  return isAuthorized; // Returns null initially, avoiding premature redirects
}
