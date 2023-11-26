import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthData } from "../App";
import { Auth } from "../pages/Auth";
import { AdminPage } from "../pages/AdminPage";
import { EmployeePage } from '../pages/EmployeePage';
import { ErrorPageNotFound } from '../pages/ErrorPageNotFound';
import { Layout } from "../components/Layout";

const routerData = [
  {
    path: "/auth",
    name: "Auth",
    element: <Auth />,
    isPrivate: false,
  },
  {
    path: "/employee-page",
    name: "EmployeePage",
    element: <EmployeePage />,
    isPrivate: true,
    role: 'employee'
  },
  {
    path: "/admin-page",
    name: "AdminPage",
    element: <AdminPage />,
    isPrivate: true,
    role: 'administrator'
  },
];

export const Router = () => {
  const { render, user, getCurentUser } = AuthData();
  const [routs, setRoutes] = useState([]);

  const authGuard = async () => {
    const userData = await getCurentUser();
    const userState = userData ? userData : user
    const rou = routerData?.filter((item) => {
      if (userState.name !== '' && item.isPrivate) {
        if (userState?.role === item?.role) {
          return {
            path: item.path,
            element: item.element,
          }
        }
      } else if (userState.name === '' && !item.isPrivate) {
        return {
          path: item.path,
          element: item.element,
        };
      }
    })
    setRoutes(userData?.name ? [
      {
        path: "/",
        element: <Layout />,
        children: [
          ...rou
        ]
      }
    ] : rou);
  };

  useEffect(() => {
    authGuard();
  }, [render]);

  const router = createBrowserRouter([
    ...routs,
    {
      path: "*",
      element: <ErrorPageNotFound />
    },
  ]);

  return <RouterProvider router={router} />;
};
