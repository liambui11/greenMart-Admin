import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const isAuthenticated = useSelector((state) => state.staffAuth.isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/dashboard/signin" />;
}

export default PrivateRoute;
