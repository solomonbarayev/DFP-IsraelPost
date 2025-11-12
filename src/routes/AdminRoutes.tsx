import { useEffect } from "react";
// import { useSelector } from "react-redux";
import { useAppSelector } from "../store/hooks";
import { Outlet, Navigate } from "react-router-dom";

const AdminRoutes = () => {
  const { userData } = useAppSelector((state) => (state as any)?.user);
  const { ADMIN } = useAppSelector((state) => state.constants.USER_ROLES);


  useEffect(() => {
    userData?.role !== ADMIN && window.toast.error("כניסה למנהלים בלבד");
  }, [userData, ADMIN]);

  return userData?.role === ADMIN ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminRoutes;
