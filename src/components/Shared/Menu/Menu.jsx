import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Menu = ({link,RouteName}) => {
    return (
        <li>
          <Link to={link}>{RouteName}</Link>
        </li>
    );
  };

Menu.propTypes = {
    link:PropTypes.string,
    RouteName:PropTypes.string
};

export default Menu;