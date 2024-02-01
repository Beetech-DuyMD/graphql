import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext({
  user: null,
});

export const AuthChecker = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem("token") || "";

      try {
        if (token) {
          console.log(12323);
          const decodedToken = jwtDecode(token);
          
          if (decodedToken.exp * 1000 < Date.now()) {
            // Token has expired
            console.log(546546546);
            localStorage.removeItem("token");
            setIsAuthenticated(false);
            navigate("/login");
          } else {
            setIsAuthenticated(true);
            setUser(decodedToken);
          }
        } else {
          setIsAuthenticated(false);
          if (!["/login", "/books", "/register"].includes(location.pathname)) {
            toast.error("Vui lòng đăng nhập");
            navigate("/login");
          }
        }
      } catch (error) {
        console.error("Error decoding token:", error.message);
        // Invalid token, remove it and redirect to login
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/login");
      }
    };

    checkAuthentication();
  }, [navigate]);

  if (
    !isAuthenticated &&
    !["/login", "/books", "/register"].includes(location.pathname)
  ) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
