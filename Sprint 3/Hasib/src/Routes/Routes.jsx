import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import RentalSystem from "../Pages/RentalSystem/RentalSystem";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import Payment from "../Pages/More/Payment/Payment";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
  
 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: "/",
          element: <Home></Home>,
        },
        {
          path: "RentalSystem",
          element: <RentalSystem></RentalSystem>,
          loader: () =>  fetch("http://localhost:5000/destinations"),
        },
        {
          path: 'login',
          element: <Login></Login>,
        },
        {
          path: 'register',
          element: <Register></Register>,
        }, 
        {
          path: 'Payment',
          element: <PrivateRoute><Payment></Payment></PrivateRoute>,
        },
               
      ]
    },
  ]);