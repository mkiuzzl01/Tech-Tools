import PropTypes from "prop-types";
import { MdHowToVote } from "react-icons/md";

const UpVote_Button = ({vote}) => {
  return (
    <div>
      <button title="Please Give a Vote" className="btn text-green-600">
        <span>{vote}</span>
        <MdHowToVote />
        UpVote
      </button>
    </div>
  );
};

UpVote_Button.propTypes = {
    vote:PropTypes.number,
};

export default UpVote_Button;
