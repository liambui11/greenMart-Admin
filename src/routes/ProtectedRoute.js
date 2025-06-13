import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import useCheckRole from "../components/CheckRole";
function ProtectedRoute({ model, action = "view" }) {
  const isAuthenticated = useSelector(
    (state) => state.staffAuth.isAuthenticated
  );

  
  const hasPermission = useCheckRole(model, action);
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate to="/dashboard/signin" state={{ from: location }} replace />
    );
  }

  if (!hasPermission) {
    return <Navigate to="/dashboard/unauthorized" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
