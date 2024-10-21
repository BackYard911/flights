import { Navigate } from "react-router-dom";
import Toolbar from "../Toolbar/Toolbar";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const isLoggedIn = localStorage.getItem("token");
  if (!isLoggedIn) {
    console.log("crying");
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Toolbar />
      {children}
    </>
  );
}
