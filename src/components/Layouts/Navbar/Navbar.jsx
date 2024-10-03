import { Link, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { IoMdLogOut } from "react-icons/io";
import { useEffect, useState } from "react";
import Menu from "../../Shared/Menu/Menu";

const Navbar = () => {
  const { user, warningToast, logOut, errorToast } = useAuth();
  const [isTransparent, setIsTransparent] = useState(true);
  const location = useLocation();
  const [isOpen,setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsTransparent(false);
      } else if (location.pathname === "/") {
        setIsTransparent(true);
      }
    };

    if (location.pathname === "/") {
      window.addEventListener("scroll", handleScroll);
    } else {
      setIsTransparent(false);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);

  const handleLogOut = () => {
    try {
      logOut();
      warningToast("Logout Successful");
    } catch (error) {
      errorToast("Something Wrong");
    }
  };

  const navLink = (
    <>
      <Menu link={"/"} RouteName="Home"></Menu>
      <Menu link={"/About"} RouteName="About"></Menu>
      <Menu link={"/Products"} RouteName="Products"></Menu>
      <Menu link={"/Contact"} RouteName="Contact"></Menu>
    </>
  );


  return (
    <div className="fixed top-0 left-0 w-full z-10">
      <div
        className={`max-w-7xl mx-auto ${
          isTransparent
            ? "bg-[#C4D7FF] bg-opacity-20 text-white"
            : "bg-[#C4D7FF] text-black"
        } transition-all duration-300`}
      >
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
                onClick={()=> setIsOpen(!isOpen)}
              >
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
              {
                isOpen && <ul
                tabIndex={0}
                className="dropdown-content flex flex-col mt-3 z-40 p-2 shadow bg-[#C4D7FF] text-black rounded-box w-40"
              >
              <span className="space-y-2" onClick={()=> setIsOpen(!isOpen)}>{navLink}</span>
              </ul>
              }
            </div>
            <Link to="/" className="">
              <img
                src="https://i.postimg.cc/BnBymGpd/Tech-removebg-preview.png"
                alt=""
                className="w-24 lg:w-32"
              />
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu-horizontal px-2 space-x-4">{navLink}</ul>
          </div>
          <div className="navbar-end space-x-2">
            {user ? (
              <div>
                <div className="dropdown z-50 dropdown-end">
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
                    className="mt-3 z-50 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                  >
                    <div className="space-y-3">
                      <h4 className="text-center my-2 text-black">
                        {user?.displayName
                          ? user.displayName
                          : "Username Not Found"}
                      </h4>
                      <Link to="/Dashboard">
                        <button className="btn btn-sm w-full">Dashboard</button>
                      </Link>
                      <button
                        onClick={handleLogOut}
                        className="btn btn-sm w-full"
                      >
                        <IoMdLogOut className="text-orange-600 text-xl" />
                        Logout
                      </button>
                    </div>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-x-4">
                <Link to="/Login">
                  <button
                    className={`btn bg-[#96CEB4] border-none ${
                      isTransparent && "text-white"
                    }`}
                  >
                    Login
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
