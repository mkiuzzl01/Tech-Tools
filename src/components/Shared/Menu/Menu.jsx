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
         ? " text-[#f1f141]"
         : " hover:text-green-400 rounded-lg"
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
