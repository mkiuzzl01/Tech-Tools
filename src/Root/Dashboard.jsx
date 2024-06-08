import { Link, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Menu from "../components/Shared/Menu/Menu";

const Dashboard = () => {
  const { logOut } = useAuth();
  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="max-w-screen-xl m-auto">
      <div className="flex justify-between">
        {/* This is NavLink part  */}
        <div className="w-1/4 flex flex-col justify-between bg-gray-400 min-h-screen">
          <div className="">
            <div className="menu">
              <ul className="ul">
                <Menu link="/Dashboard" RouteName="My Profile"></Menu>
                <Menu
                  link="/Dashboard/AddProduct"
                  RouteName="Add Product"
                ></Menu>
                <Menu
                  link="/Dashboard/MyProducts"
                  RouteName="My Profile"
                ></Menu>
              </ul>
            </div>
            <div className="divider">OR</div>
            <div className="menu">
              <ul>
                <Menu link="/" RouteName="Home"></Menu>
                <Menu link="/Products" RouteName="Products"></Menu>
              </ul>
            </div>
          </div>
          <div>
            <div className="menu">
              <ul>
                <li>
                  <button onClick={handleLogOut} className="btn btn-sm">
                    LogOut
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* this is content part */}
        <div className="flex-1 lg:m-5">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
