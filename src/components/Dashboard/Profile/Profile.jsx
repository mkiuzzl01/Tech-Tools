import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUserVerification from "../../../hooks/useUserVerification";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";
import { Helmet } from "react-helmet-async";
import Payment from "../../Utility/Payment/Payment";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const Profile = () => {
  const { role } = useUserVerification();
  const [isOpen, setIsOpen] = useState(false);
  const { user, profileUpdate, successToast, errorToast } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/${user?.email}`);
      return data;
    },
  });

  if (isFetching) return <Loading></Loading>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const image = form.image.files[0];

    let photo = user?.photoURL;
    let Name = user?.displayName;

    if (image) {
      const imagePath = new FormData();
      imagePath.append("image", image);

      try {
        const { data } = await axiosPublic.post(imageHostingApi, imagePath);
        photo = data?.data?.display_url;
      } catch (error) {
        return errorToast(error?.response?.data?.error?.message);
      }
    }

    if (name) {
      Name = name;
    }

    try {
      await profileUpdate(Name, photo);
      refetch();
      return successToast("Profile Update Successfully");
    } catch (error) {
      return errorToast("Something Wrong");
    }
  };

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
            className="w-32 md:w-60 rounded-full"
          />
        </div>
        <div className="divider lg:divider-horizontal"></div>
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
                onClick={() => setIsOpen(true)}
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
            <input
              name="name"
              type="text"
              className="input input-bordered w-full"
            />
          </label>
          <label htmlFor="image">
            <span>New Profile Picture</span>
            <input
              name="image"
              type="file"
              className="file-input file-input-bordered w-full"
            />
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
