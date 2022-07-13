import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoutes = () => {
  const token = localStorage.getItem("userID");
  const location = useLocation();
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export { PrivateRoutes };
