import PropTypes from "prop-types";
import { MdHowToVote } from "react-icons/md";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";

const UpVote_Button = ({ vote, id, refetch }) => {
  const { user, logOut, warningToast } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  // const [undo,setUndo] = useState(false);
  // console.log(undo);

  const handleVoteUp = async () => {
    if (!user) {
      logOut();
      return navigate("/Login");
    }

    const voter = user?.email;
    try {
      const { data } = await axiosSecure.patch(`/upVote/${id}`, { voter });
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
      console.log(error);
      return warningToast(error?.response?.data);
    }

    // setTimeout(() => {
    //   setUndo(true);
    // }, 2000);
    // return setUndo(false);
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
        Vote
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
