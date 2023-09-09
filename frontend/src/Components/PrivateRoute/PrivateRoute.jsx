import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const PrivateRoute = () => {
  const location = useLocation();
  const { user } = useAuth();

  if (!user) return <Navigate to={`/login?redirect=${location.pathname}`} />;

  return <Outlet />;
};

export default PrivateRoute;
