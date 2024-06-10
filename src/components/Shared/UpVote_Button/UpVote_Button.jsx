import PropTypes from "prop-types";
import { useState } from "react";
import { MdHowToVote } from "react-icons/md";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UpVote_Button =({vote,id,refetch}) => {
  const {user,warningToast} = useAuth();
  const axiosSecure = useAxiosSecure();
    let [initialVote,setVote] = useState(vote);

    const {data:existingVoter = []} = useQuery({
      queryKey:['existing-voter'],
      enabled:!!user?.email,
      queryFn: async ()=>{
        const {data} = await axiosSecure.get(`/existing-voter/${user?.email}`);
        return (data);
      }
    })

    const handleVoteUp = async ()=>{
      refetch();
      const ID = id;
      const existing = existingVoter.find(voter => voter._id === ID);
      if(existing) return warningToast("Your already voted")
      

      const up = initialVote +=  1;
      setVote(up);
      const voter = user?.email;
      const info = {vote:initialVote,voter};
      try {
        const {data} = await axiosSecure.patch(`/update-product/${ID}`,info);
        if(!user) return;
        // console.log(data);
        if(data.modifiedCount){
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Vote Accepted!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        console.log(error.message);
      }



      console.log(initialVote);
    }
  return (
    <div>
      <button onClick={handleVoteUp} title="Please Give a Vote" className="btn text-green-600">
        <span>{initialVote}</span>
        <MdHowToVote />
        UpVote
      </button>
    </div>
  );
};

UpVote_Button.propTypes = {
    vote:PropTypes.number,
    id:PropTypes.string,
    refetch:PropTypes.func,
};

export default UpVote_Button;
