// AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import jsonwebtoken from 'jsonwebtoken'

const AuthContext = createContext();

export const AuthChecker = ({ children, checkAuth }) => {
  const navigate = useNavigate();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem("token") ? localStorage.getItem("token") : "";

      if (token) {
        try {
          const authenticated = await checkAuth(token);

          if (authenticated) {
            setIsAuthenticated(true);
            if (["/login", "/register"].includes(location.pathname)) {
              navigate("/books");
            }
          } else {
            // Redirect to login if authentication fails
            navigate("/login");
            toast.error("Vui lòng đăng nhập");
          }
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
  }, [navigate, checkAuth, location]);

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
