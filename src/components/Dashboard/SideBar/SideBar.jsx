import PropTypes from "prop-types";
import useAuth from "../../../hooks/useAuth";
import Menu from "../../Shared/Menu/Menu";

const SideBar = ({ isOpen }) => {
  const { logOut } = useAuth();

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div
    className={`z-10  flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 md:w-1/4 space-y-6 px-2 py-4 absolute lg:static inset-y-0 left-0 transform ${
        isOpen && '-translate-x-full'
      }  md:translate-x-0  transition duration-200 ease-in-out`}
    >
      <div className="">
        <div className="menu">
          <ul className="ul space-y-2">
            <Menu link="/Dashboard" RouteName="My Profile"></Menu>
            <Menu link="/Dashboard/AddProduct" RouteName="Add Product"></Menu>
            <Menu link="/Dashboard/MyProducts" RouteName="My Profile"></Menu>
          </ul>
        </div>
        <div className="divider">OR</div>
        <div className="menu">
          <ul className="ul space-y-2">
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
  );
};

SideBar.propTypes = {
  isOpen: PropTypes.bool,
  toggleMenu: PropTypes.func,
};

export default SideBar;
