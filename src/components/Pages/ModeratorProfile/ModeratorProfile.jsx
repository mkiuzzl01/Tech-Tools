import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useUserVerification from "../../../hooks/useUserVerification";

const ModeratorProfile = () => {
    const {role} = useUserVerification();
    console.log(role);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/${user?.email}`);
      return data;
    },
  });

  console.log(data);
  const handleSubscription = async () => {
    const subscription = "Verified";

    try {
      const { data: userSubscription } = await axiosSecure.patch(
        `/user-subscription/${data._id}`,
        { subscription }
      );
      if (userSubscription.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Subscription Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
    return (
        <div>
        <section className="bg-[#001f3f]">
          <div className="max-w-6xl px-6 py-10 mx-auto">
            <p className="text-xl font-medium text-blue-500">
              {" "}
              <span>{role?.role}</span> Profile
            </p>
  
            <main className="relative z-20 w-full mt-8 md:flex md:items-center xl:mt-12">
              <div className="absolute w-full bg-[#2F4F4F] -z-10 md:h-96 top-24 rounded-2xl"></div>
  
              <div className="w-full top-24 p-6 bg-blue-600 md:flex md:items-center rounded-2xl md:bg-transparent md:p-0 lg:px-12 md:justify-evenly">
                <img
                  className="h-24 w-24 lg:h-44 lg:w-44 md:mx-6 rounded-full object-cover  shadow-md md:rounded-2xl"
                  src={user?.photoURL}
                  alt=""
                />
  
                <div className="mt-2 md:mx-6 ">
                  <div>
                    <h1 className="text-xl font-medium tracking-tight text-white">
                      {user.displayName}
                    </h1>
                    <p className="text-blue-200">{user?.email}</p>
                  </div>
  
                  <div>
                    {data?.subscription === "Verified" ? (
                      <span className="text-green-500">Verified</span>
                    ) : (
                      <button
                      title="Please Subscription"
                      onClick={handleSubscription}
                      className="btn"
                    >
                      $ 45 Subscription 
                    </button>
                    )}
                   
                  </div>
                </div>
              </div>
            </main>
          </div>
        </section>
      </div>
    );
};

export default ModeratorProfile;