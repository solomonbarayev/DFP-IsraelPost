import { createBrowserRouter, 
  // Navigate
 } from "react-router-dom";
import HomePage from "../pages/HomePage";
import FormPage from "../pages/FormPage";
import NotFound from "../pages/NotFound";
import Dashboard from "../pages/DashboardPage";
import LoginLayout from "../layouts/LoginLayout";
import FormsLayout from "../layouts/FormsLayout";

import LoginPage from "../pages/LoginPage";
import ProtectedRoutes from "./ProtectedRoutes";
import MainLayout from "../layouts/MainLayout";
import FormSuccessPage from "@/pages/FormSuccessPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    element: <LoginLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
  {
    path: "/forms",
    element: <FormsLayout />,
    children: [
      {
        path: ":formId",
        element: <FormPage />,
      },
      {
        path: ":formId/success",
        element: <FormSuccessPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
