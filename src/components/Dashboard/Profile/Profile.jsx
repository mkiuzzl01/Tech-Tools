import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUserVerification from "../../../hooks/useUserVerification";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";
import { Helmet } from "react-helmet-async";
import Payment from "../../Utility/Payment/Payment";

const Profile = () => {
  const { role } = useUserVerification();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/${user?.email}`);
      return data;
    },
  });

  if (isFetching) return <Loading></Loading>;

  const handleSubmit = e =>{
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const image = form.image.files[0];

  }

  return (
    <div>
      <Helmet>
        <title>{`Tech-Tools | ${role.role} Profile`}</title>
      </Helmet>

      <div className="flex flex-col md:flex-row items-center justify-center">
        <div>
          <img
            src={
              user?.photoURL ||
              "https://i.postimg.cc/vTN8PMKb/blank-profile-picture-973460-1280.png"
            }
            alt={user?.displayName}
            className="w-24 md:w-60 rounded-full"
          />
        </div>
        <div className="divide-y-4 divider-primary"></div>
        <div className="mt-10 md:mt-0 md:ps-10">
          <h3 className="text-xl font-bold md:text-2xl">
            Name: {user?.displayName}
          </h3>
          <p className="text-sm md:text-xl">Email: {user?.email}</p>
          <p className="text-sm md:text-xl">
            Creation Time: {user?.metadata?.creationTime}
          </p>
          <div>
            {data?.subscription === "Verified" ? (
              <span className="text-green-500">Verified</span>
            ) : (
              <button
                title="Please Subscription"
                onClick={()=>setIsOpen(true)}
                className="btn btn-sm"
              >
                $ 45 Subscription
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-xl m-auto pt-10">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            <span>New Name</span>
            <input name="name" type="text" className="input input-bordered w-full" />
          </label>
          <label htmlFor="image">
            <span>New Profile Picture</span>
            <input name="image" type="file" className="file-input file-input-bordered w-full" />
          </label>
          <div className="mt-4">
          <button className="btn btn-accent w-full">Submit</button>
          </div>
        </form>
      </div>

      {isOpen && (
        <Payment data={data} refetch={refetch} setIsOpen={setIsOpen}></Payment>
      )}
    </div>
  );
};

export default Profile;
