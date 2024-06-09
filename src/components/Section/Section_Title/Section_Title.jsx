import PropTypes from 'prop-types';

const Section_Title = ({title,sub_title}) => {
    return (
        <div>
            <h1 className='text-2xl font-semibold'>{title}</h1>
            <p>{sub_title}</p>
        </div>
    );
};

Section_Title.propTypes = {
    title:PropTypes.string,
    sub_title:PropTypes.string,
};

export default Section_Title;