import {
    createBrowserRouter,
    } from "react-router-dom"
import MainLayout from "../MainLayout/MainLayout";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home";
import TaskManagement from "../Pages/TaskManagement/TaskManagement";
import PrivateRoute from "../Pages/PrivateRoute/PrivateRoute";



  export const router = createBrowserRouter([
    {
      path: "/",
      element:<MainLayout></MainLayout>,
      children:[

        {
            path:"/",
            element:<Home></Home>
        },
        {
           path:"tasks",
           element:<PrivateRoute><TaskManagement></TaskManagement></PrivateRoute>
        },

        {
            path:"/login",
            element:<Login></Login>
        }
      ]
    },
  ]);