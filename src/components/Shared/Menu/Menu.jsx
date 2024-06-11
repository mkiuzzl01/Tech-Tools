import PropTypes from "prop-types";
import {NavLink } from "react-router-dom";

const Menu = ({ link, RouteName }) => {
  return (
    <li>
      <NavLink
      end
        to={link}
        className={({ isActive }) =>
          `flex items-center transition-colors duration-300 transform  hover:bg-gray-300 text-white   hover:text-gray-700 ${
            isActive ? "bg-gray-300" : ""
          }`
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
