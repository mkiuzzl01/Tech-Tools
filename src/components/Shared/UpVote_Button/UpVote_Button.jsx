import PropTypes from "prop-types";
import { MdHowToVote } from "react-icons/md";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UpVote_Button = ({ vote, id, refetch }) => {
  const { user, warningToast } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleVoteUp = async () => {

    const voter = user?.email;
    try {
      const { data } = await axiosSecure.patch(`/upVote/${id}`, { voter });
      // console.log(data);
      if (data.modifiedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Vote Accepted!",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    } catch (error) {
      warningToast(error?.response?.data);
      // console.log();
    }
  };
  return (
    <div>
      <button
        onClick={handleVoteUp}
        title="Please Give a Vote"
        className="btn text-green-600"
      >
        <span>{vote}</span>
        <MdHowToVote />
        UpVote
      </button>
    </div>
  );
};

UpVote_Button.propTypes = {
  vote: PropTypes.number,
  id: PropTypes.string,
  refetch: PropTypes.func,
  ownerEmail: PropTypes.string,
};

export default UpVote_Button;
