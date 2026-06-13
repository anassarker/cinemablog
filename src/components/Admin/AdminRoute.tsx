import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loader from "../UI/Loader";

const SECRET_ROUTE =
  import.meta.env.VITE_ADMIN_SECRET_ROUTE || "xpanel-9x7z";

interface Props {
  children: React.ReactNode;
}

const AdminRoute: React.FC<Props> = ({ children }) => {
  const { isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!isAdmin) {
    // Redirect to login, preserving where they were trying to go
    return (
      <Navigate
        to={`/${SECRET_ROUTE}`}
        state={{ from: location }}
        replace
      />
    );
  }

  return <>{children}</>;
};

export default AdminRoute;
