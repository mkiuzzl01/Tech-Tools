import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../components/Pages/Home/Home";
import Products from "../components/Pages/Products/Products";
import Login from "../components/Pages/Login/Login";
import Registration from "../components/Pages/Registration/Registration";
import Dashboard from "../Root/Dashboard";
import AddProducts from "../components/Dashboard/AddProducts/AddProducts";
import MyProducts from "../components/Dashboard/MyProducts/MyProducts";
import PrivateRoutes from "./PrivateRoutes";
import Not_Found_Page from "../components/Pages/Not_Found_Page/Not_Found_Page";
import Profile from "../components/Dashboard/Profile/Profile";
import Product_Details from "../components/Pages/Product_Details/Product_Details";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement:<Not_Found_Page></Not_Found_Page>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/Products",
        element: <Products></Products>,
      },
      {
        path: "/Products_Details/:id",
        element: <Product_Details></Product_Details>,
      },
    ],
  },
  //User Dashboard Related Route
  {
    path: "/Dashboard",
    element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
    children: [
      {
        index:true,
        element: <Profile></Profile>,
      },
      {
        path: "AddProduct",
        element: <AddProducts></AddProducts>,
      },
      {
        path: "MyProducts",
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
