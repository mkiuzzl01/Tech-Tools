import { Outlet } from "react-router-dom";
import { useState } from "react";
import SideBar from "../components/Dashboard/SideBar/SideBar";
import { IoMenu } from "react-icons/io5";
import { GiSplitCross } from "react-icons/gi";

const Dashboard = () => {
  const [isOpen, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!isOpen);
  };

  return (
    <div className="max-w-7xl m-auto">
      <div className="relative h-screen md:flex justify-between">
        {/* This is NavLink part  */}
        <SideBar isOpen={isOpen} toggleMenu={toggleMenu}></SideBar>
        {/* this is content part */}
        <div className="md:w-3/4 m-2 md:m-0 md:ps-5 md:py-5">
          <div className="flex justify-end">
            <button onClick={toggleMenu} className="md:hidden px-4 py-3">
              {isOpen ? (
                <IoMenu className="text-orange-600 text-2xl" />
              ) : (
                <GiSplitCross className="text-orange-600 text-2xl" />
              )}
            </button>
          </div>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
