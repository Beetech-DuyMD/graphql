import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginForm from "../component/auth/loginForm";
import RegisterForm from "../component/auth/RegisterForm";
import Auth from "../component/auth";
import Books from "../component/books";

export default createBrowserRouter([
    {
      element: <Auth />,
      children: [
        {
          element: <LoginForm />,
          path: "/login",
        },
        {
          element: <RegisterForm />,
          path: "/register",
        },
      ],
    },
    {
      element: <Books />,
      path: "/books",
    },
  ]);
