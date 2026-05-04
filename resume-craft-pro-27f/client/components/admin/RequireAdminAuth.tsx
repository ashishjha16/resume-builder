import { Navigate } from "react-router-dom";
import { getAdminSession } from "@/lib/storage";

interface RequireAdminAuthProps {
  children: JSX.Element;
}

export function RequireAdminAuth({ children }: RequireAdminAuthProps) {
  const isAdminLoggedIn = getAdminSession();

  if (!isAdminLoggedIn) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}
