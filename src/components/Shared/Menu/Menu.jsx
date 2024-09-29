import PropTypes from "prop-types";
import {NavLink } from "react-router-dom";

const Menu = ({ link, RouteName }) => {
  return (
    <li>
      <NavLink
      end
        to={link}
        className={({ isActive }) =>
       isActive
       ? "border-b-2 text-[#23BE0A] border-red-500 rounded-none"
       : "hover:text-red-300"
     }
      >
        {RouteName}
      </NavLink>
    </li>
  );
};

Menu.propTypes = {
  link: PropTypes.string,
  RouteName: PropTypes.string,
};

export default Menu;
