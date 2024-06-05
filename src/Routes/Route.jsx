import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../components/Pages/Home/Home";
import Products from "../components/Pages/Products/Products";
import Login from "../components/Pages/Login/Login";
import Registration from "../components/Pages/Registration/Registration";
import Dashboard from "../components/Dashboard/Dashboard";
import UserProfile from "../components/Dashboard/UserProfile/UserProfile";
import AddProducts from "../components/Dashboard/AddProducts/AddProducts";
import MyProducts from "../components/Dashboard/MyProducts/MyProducts";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/Products",
        element: <Products></Products>,
      },
    ],
  },
  //User Dashboard Related Route
  {
    path: "/Dashboard",
    element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
    children: [
      {
        path: "/Dashboard",
        element: <UserProfile></UserProfile>,
      },
      {
        path: "/Dashboard/AddProduct",
        element: <AddProducts></AddProducts>,
      },
      {
        path: "/Dashboard/MyProducts",
        element: <MyProducts></MyProducts>,
      },
    ],
  },

  //Authentication Related Route
  {
    path: "/Login",
    element: <Login></Login>,
  },
  {
    path: "/Registration",
    element: <Registration></Registration>,
  },
]);
export default router;
