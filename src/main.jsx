import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { ToastProvider } from "./context/ToastContext";

const RootComponent = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay (Replace with actual API call)
    setTimeout(() => {
      setIsLoading(false);
      // Hide the preloader when React is ready
      const preloader = document.getElementById("preloader");
      if (preloader) {
        preloader.style.display = "none";
      }
    }, 1000); // Adjust timing as needed
  }, []);

  return (
    <BrowserRouter>
      <ToastProvider>
        {isLoading ? null : <App setIsLoading={setIsLoading} />}
      </ToastProvider>
    </BrowserRouter>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RootComponent />
  </StrictMode>
);
