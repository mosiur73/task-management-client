import {
    createBrowserRouter,
    } from "react-router-dom"
import MainLayout from "../MainLayout/MainLayout";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home";
import TaskManagement from "../Pages/TaskManagement/TaskManagement";
import PrivateRoute from "../Pages/PrivateRoute/PrivateRoute";
import Dashboard from "../DashBoard/Dashboard";
import DashHome from "../DashBoard/DashHome";
import Todo from "../DashBoard/Todo/Todo";
import Progress from "../DashBoard/Progress/Progress";
import Done from "../DashBoard/Done/Done";
import ManageTask from "../DashBoard/ManageTask/ManageTask";



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
        },
         
      ]
    },
    {
      path:"dashboard",
      element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children:[
        {
          path:"tasks",
          element:<TaskManagement></TaskManagement>
        },
        {
          path:"dashboardHome",
          element:<DashHome></DashHome>
        },{
          path:"todo",
          element:<Todo></Todo>
        },
        {
          path:"progress",
          element:<Progress></Progress>
        },
        {
          path:"done",
          element:<Done></Done>
        },
        {
          path:"manageTask",
          element:<ManageTask></ManageTask>
        }
      ]
    }
   
  ]);