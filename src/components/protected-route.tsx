import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { user } = useAuth();
  if (!user || !user.isAuthenticated) {
    return Navigate({ to: "/404", replace: true });
  }

  if (!allowedRoles.includes(user.role)) {
    return Navigate({ to: "/404", replace: true });
  }

  return children;
};

export default ProtectedRoute;
