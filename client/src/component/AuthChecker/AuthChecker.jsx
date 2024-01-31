// AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthChecker = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem("token")
        ? localStorage.getItem("token")
        : "";

      if (token) {
        try {
          setIsAuthenticated(true);
          if (["/login", "/register"].includes(location.pathname)) {
            navigate("/books");
          }
        } catch {
          throw new Error("Token not found");
        } finally {
          setIsAuthChecked(true); // Kiểm tra xác thực đã hoàn tất
        }
      } else {
        if (!["/login", "/books"].includes(location.pathname)) {
          toast.error("Vui lòng đăng nhập");
          navigate("/login");
        }
        setIsAuthChecked(true); // Kiểm tra xác thực đã hoàn tất
      }
    };

    checkAuthentication();
  }, [navigate]);

  if (!isAuthChecked) {
    // Bạn có thể chọn hiển thị một biểu tượng loading hoặc giao diện khác trong khi kiểm tra xác thực đang được thực hiện.
    return null;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
