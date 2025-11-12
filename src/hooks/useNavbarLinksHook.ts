import { UserPlus, Users, ChartPie } from "lucide-react";
import React from "react";
import { CORE_ROLES } from "../utils/constants/roles.constants";

const useNavbarLinksHook = () => {
  // const { accountName } = useParams();
  const { ADMIN, USER } = CORE_ROLES
  const navbarLinks = [
    {
      title: "דשבורד",
      href: "dashboard",
      icon: React.createElement(ChartPie, { size: 20 }),
      // icon: <ChartPie size={20} />,
      role: [ADMIN, USER],
    },
    // {
    //   title: "דוחות",
    //   href: "reports",
    //   icon: <FileChartLine size={20} />,
    //   role: [ADMIN],
    // },
    {
      title: "ניהול משתמשים",
      href: "users-management",
      // icon: <Users size={20} />,
      icon: React.createElement(Users, { size: 20 }),
      role: [ADMIN],
    },
    {
      title: `בקשות משתמשים`,
      href: "user-requests",
      // icon: <UserPlus size={20} />,
      icon: React.createElement(UserPlus, { size: 20 }),
      role: [ADMIN],
    },
  ];

  return navbarLinks;
};

export default useNavbarLinksHook;
