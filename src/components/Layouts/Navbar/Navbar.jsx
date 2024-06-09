import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { IoMdLogOut } from "react-icons/io";

const Navbar = () => {
  const { user, warningToast, logOut, errorToast } = useAuth();

  // console.log(user);
  const handleLogOut = () => {
    try {
      logOut();
      warningToast("Logout Successful");
    } catch (error) {
      console.log(error);
      errorToast("Something Wrong");
    }
  };

  const navLink = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/Products">Products</Link>
      </li>
    </>
  );

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content space-x-0 mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLink}
            </ul>
          </div>
          <Link to="/" className="text-3xl font-semibold">
            Tech-Tools
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLink}</ul>
        </div>
        <div className="navbar-end space-x-2">
          {user ? (
            <div>
              <div className="dropdown dropdown-end">
                <span
                  className={
                    user
                      ? `visible animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75`
                      : `hidden`
                  }
                ></span>
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      title={
                        user?.displayName
                          ? user.displayName
                          : "Username Not Found"
                      }
                      src={
                        user?.photoURL
                          ? user.photoURL
                          : "https://i.postimg.cc/vTN8PMKb/blank-profile-picture-973460-1280.png"
                      }
                      alt={user?.email}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
                  <div className="space-y-3">
                    <h4 className="text-center my-2">
                      {user?.displayName
                        ? user.displayName
                        : "Username Not Found"}
                    </h4>
                    <Link to='/Dashboard'>
                      <button className="btn btn-sm w-full">Dashboard</button>
                    </Link>
                    <button
                      onClick={handleLogOut}
                      className="btn btn-sm w-full"
                    >
                      <IoMdLogOut />
                      Logout
                    </button>
                  </div>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-x-4">
              <Link to="/Login">
                <button className="btn">Login</button>
              </Link>
              <Link to="/Registration">
                <button className="btn">Registration</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
