import { createBrowserRouter } from "react-router-dom";
import LoginForm from "../component/auth/loginForm";
import RegisterForm from "../component/auth/RegisterForm";
import Auth from "../component/auth";
import Books from "../component/books";
import { AuthChecker } from "../component/AuthChecker/AuthChecker";
import Layout from "../component/layout/Layout";
import Author from "../component/Author/Author";

export default createBrowserRouter([
  {
    element: (
      <AuthChecker>
        <Auth />
      </AuthChecker>
    ),
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
    element: (
      <AuthChecker>
        <Layout />
      </AuthChecker>
    ),
    children: [
      {
        element: <Books />,
        path: "/books",
      },
      {
        element: <Author />,
        path: "/authors",
      },
    ],
  },
]);
