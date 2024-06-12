import PropTypes from 'prop-types';

const Section_Title = ({title,sub_title,paragraph}) => {
    return (
        <div className='py-5 my-5'>
            <h1 className='text-3xl text-center font-semibold'>{title}</h1>
            <h4 className='text-center '>{sub_title}</h4>
            <div className="divider divider-accent"></div>
            <p className='text-center'>{paragraph}</p>
        </div>
    );
};

Section_Title.propTypes = {
    title:PropTypes.string,
    sub_title:PropTypes.string,
    paragraph:PropTypes.string,
};

export default Section_Title;