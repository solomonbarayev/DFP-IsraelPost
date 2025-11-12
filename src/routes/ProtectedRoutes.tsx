import { useSelector, useDispatch } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
// import { clearCredentials } from "../../redux/slices/user.slice";
// import { useEffect } from "react";
import { CORE_ROLES } from "../utils/constants/roles.constants";
import { useAppDispatch } from "../store/hooks";

const ProtectedRoutes = () => {
  // const { userData } = useSelector((state) => state?.user);
  const userData = null;
  const dispatch = useAppDispatch();

  // Clear credentials if user has invalid role to prevent infinite loops
  // useEffect(() => {
  //   if (userData
  //     // && userData.role !== CORE_ROLES.ADMIN && userData.role !== CORE_ROLES.USER
  //     ) {
  //     dispatch(clearCredentials());
  //   }
  // }, [userData, dispatch]);

  // Check if user exists and has valid role (ADMIN or USER)
  // if (userData && (userData.role === CORE_ROLES.ADMIN || userData.role === CORE_ROLES.USER)) {
    return <Outlet />;
  // }

  // If no user data or invalid role, redirect to login
  return <Navigate to="login" replace />;
};

export default ProtectedRoutes;
