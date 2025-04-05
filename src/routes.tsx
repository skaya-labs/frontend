import React from "react";
import {  useRoutes } from "react-router-dom";
import HomePage from "./pages/HomePage/Homepage.tsx";



const Router: React.FC = () => {

  const routes = useRoutes([
    {
      path: "",
      children: [
        {
          path: "/",
          element: <HomePage/>,
        },
        {
          path: "*", element: <HomePage/> 
        }
      ],
    },
  ]);
  return routes;
};

export default Router;