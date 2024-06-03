import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../components/Pages/Home/Home";
import Products from "../components/Pages/Products/Products";
import Login from "../components/Pages/Login/Login";
import Registration from "../components/Pages/Registration/Registration";

const router = createBrowserRouter([{
    path:'/',
    element:<Root></Root>,
    children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/Products',
            element:<Products></Products>
        }
    ]   
},
//Authentication Related Route
{
    path:'/Login',
    element:<Login></Login>
},
{
    path:'/Registration',
    element:<Registration></Registration>
},
])
export default router;