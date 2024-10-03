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
import StatisticsPage from "../components/Dashboard/StatisticsPage/StatisticsPage";
import ManageUsers from "../components/Dashboard/ManageUsers/ManageUsers";
import ProductReviewQueue from "../components/Dashboard/ProductReviewQueue/ProductReviewQueue";
import ReportedContents from "../components/Dashboard/ReportedContents/ReportedContents";
import About from "../components/Pages/About/About";
import Contact from "../components/Section/Contact/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Not_Found_Page></Not_Found_Page>,
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
        path: "/About",
        element: <About></About>,
      },
      {
        path: "/Contact",
        element: <Contact></Contact>,
      },
      {
        path: "/Products_Details/:id",
        element: (
          <PrivateRoutes>
            <Product_Details></Product_Details>
          </PrivateRoutes>
        ),
      },
    ],
  },
  //User Dashboard Related Route
  {
    path: "/Dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard></Dashboard>
      </PrivateRoutes>
    ),
    children: [
      {
        index: true,
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
      {
        path: "ProductReviewQueue",
        element: <ProductReviewQueue></ProductReviewQueue>,
      },
      {
        path: "ReportedContents",
        element: <ReportedContents></ReportedContents>,
      },
      {
        path: "Statistics",
        element: <StatisticsPage></StatisticsPage>,
      },
      {
        path: "ManageUsers",
        element: <ManageUsers></ManageUsers>,
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
