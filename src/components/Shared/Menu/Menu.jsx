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
         ? "border-b-2 rounded-lg text-[#f1f141] p-2"
         : " hover:border-gray-300 hover:border-t-2 rounded-lg"
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
