import { NavLink, Outlet } from "react-router-dom";
import { AuthChecker } from "../AuthChecker/AuthChecker";

function Auth() {
  return (
    <>
      <div className="flex justify-center">
        <NavLink to="/login" className="mx-4 bg-slate-500 p-3 rounded">
          Đăng Nhập
        </NavLink>
        <NavLink to="/register" className="mx-4 bg-slate-500 p-3 rounded">
          Đăng Kí
        </NavLink>
      </div>
      <Outlet />
    </>
  );
}

export default Auth;
