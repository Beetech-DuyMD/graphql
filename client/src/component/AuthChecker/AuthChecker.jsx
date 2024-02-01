import { useQuery } from "@apollo/client";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { userByToken } from "../../graphql-client/queries";

export const AuthContext = createContext({
  user: null,
});

export const AuthChecker = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [user, setUser] = useState();

  const token = localStorage.getItem("token") || "";
  // if(token) {
  const { loading, error, data } = useQuery(userByToken, {
    variables: { token: token },
    skip: !token,
    onCompleted : () => {
      console.log(data);
    }
  });
  
  useEffect(() => {
    try {
      if (!data) {
        if (!["/books","/register"].includes(location.pathname)) {
          navigate("/login");
        }
        // navigate("/books");
      }
      else if(token && ["/login","/register"].includes(location.pathname)){
        console.log(345345345);
          navigate("/books");
      }
    } catch (error) {
      console.error("Error decoding token:", error.message);
      // Invalid token, remove it and redirect to login
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [data]);

  if (loading) return "Đang load";
  if (error) {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
