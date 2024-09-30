import PropTypes from "prop-types";
import useAuth from "../../../hooks/useAuth";
import Menu from "../../Shared/Menu/Menu";
import useUserVerification from "../../../hooks/useUserVerification";
import { BiLogOutCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

const SideBar = ({ isOpen }) => {
  const { logOut } = useAuth();
  const { role } = useUserVerification();
  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div
      className={`z-40  flex flex-col justify-between overflow-x-hidden text-white bg-[#2F4F4F] w-64  md:w-1/4 space-y-6 px-2 py-4 absolute lg:static inset-y-0 left-0 transform ${
        isOpen && "-translate-x-full"
      }  md:translate-x-0  transition duration-200 ease-in-out`}
    >
      <div className="">
      <div className="flex justify-center"><Link to="/" className="">
            <img src="https://i.postimg.cc/BnBymGpd/Tech-removebg-preview.png" alt="" className=" w-24 lg:w-32" />
          </Link></div>
        <div className="flex flex-col ms-5 mt-10">
          <ul className="ul space-y-4">
            {/* this route for user role */}
            {role?.role === "user" && (
              <>
                <Menu link="/Dashboard" RouteName="My Profile"></Menu>
                <Menu
                  link="/Dashboard/AddProduct"
                  RouteName="Add Product"
                ></Menu>
                <Menu
                  link="/Dashboard/MyProducts"
                  RouteName="My Products"
                ></Menu>
              </>
            )}
            {/* this route for Moderator */}
            {role?.role === "Moderator" && (
              <>
                <Menu link="/Dashboard" RouteName="My Profile"></Menu>
                <Menu
                  RouteName="Product Review Queue"
                  link="/Dashboard/ProductReviewQueue"
                ></Menu>
                <Menu
                  RouteName="Reported Contents"
                  link="/Dashboard/ReportedContents"
                ></Menu>
              </>
            )}

            {/* this route for admin role */}
            {role?.role === "Admin" && (
              <>
              <Menu link="/Dashboard" RouteName="My Profile"></Menu>
                <Menu
                  RouteName="Statistics"
                  link="/Dashboard/Statistics"
                ></Menu>
                <Menu
                  RouteName="Manage Users"
                  link="/Dashboard/ManageUsers"
                ></Menu>
                <Menu
                  RouteName="Manage Coupons"
                  link="/Dashboard/ManageCoupons"
                ></Menu>
              </>
            )}
          </ul>
        </div>
        <div className="divider divider-accent">OR</div>
        <div className="flex flex-col ms-5 mt-10">
          <ul className="ul space-y-4">
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
              <BiLogOutCircle className="text-2xl text-red-600" /> LogOut
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

SideBar.propTypes = {
  isOpen: PropTypes.bool,
  toggleMenu: PropTypes.func,
};

export default SideBar;
