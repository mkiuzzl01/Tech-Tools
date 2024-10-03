import PropTypes from "prop-types";

const Section_Title = ({ title, sub_title, paragraph, img, img_width }) => {
  return (
    <div className="mb-10 mx-3 md:mx-0">
      <div className="flex justify-around items-center">
        <div>
          <h1 className="text-2xl md:text-3xl text-center font-semibold">{title}</h1>
          <h4 className="text-center text-sm md:text-lg">{sub_title}</h4>
        </div>
        <div>
        <img width={img_width} src={img} alt={title} />
        </div>
      </div>

      <div className="divider divider-accent"></div>
      <p className="text-center text-sm md:text-lg">{paragraph}</p>
    </div>
  );
};

Section_Title.propTypes = {
  title: PropTypes.string,
  sub_title: PropTypes.string,
  paragraph: PropTypes.string,
  img: PropTypes.string,
};

export default Section_Title;
