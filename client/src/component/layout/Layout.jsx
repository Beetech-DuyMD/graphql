import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { AuthChecker } from "../AuthChecker/AuthChecker";
import { useState } from "react";

export default function Layout() {
  const navigate = useNavigate();

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") ? localStorage.getItem("token") : "";
  });
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/login");
  };
  return (
    <div>
      <div>
        {token ? (
          <div className="px-4">
            <button onClick={logout}>Logout</button>
            <span className="ms-3">Tên đăng nhập</span>
          </div>
        ) : (
          <div>
            <NavLink to="/login">Đăng nhập</NavLink>
            <span className="ms-3">Đăng kí</span>
          </div>
        )}
      </div>

      {/* <AuthChecker> */}
        <Outlet />
      {/* </AuthChecker> */}
      <h1 className="bg-slate-800">FOOTER</h1>
    </div>
  );
}
