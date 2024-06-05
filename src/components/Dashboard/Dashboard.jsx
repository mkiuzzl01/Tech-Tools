import { Link, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
    const {logOut} = useAuth();
    const handleLogOut = async ()=>{
        try {
            await logOut();
        } catch (error) {
            console.log(error.message);
        }
    }
  return (
    <div className="max-w-screen-xl m-auto">
      <div className="flex justify-between">
        {/* This is NavLink part  */}
        <div className="w-1/4 flex flex-col justify-between bg-gray-400 min-h-screen">
          <div className="">
            <div className="menu">
              <ul className="ul">
                <li>
                  <Link to='/Dashboard'>My Profile</Link>
                </li>
              </ul>
              <li>
                <Link to='/Dashboard/AddProduct'>Add Product</Link>
              </li>
              <li>
                <Link to='/Dashboard/MyProducts'>My Product</Link>
              </li>
            </div>
            <div className="divider">OR</div>
            <div className="menu">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link>Products</Link>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div className="menu">
              <ul>
               <li>
               <button onClick={handleLogOut} className="btn btn-sm">LogOut</button>
               </li>
              </ul>
            </div>
          </div>
        </div>
        {/* this is content part */}
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
