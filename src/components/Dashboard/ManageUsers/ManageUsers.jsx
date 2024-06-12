import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../Shared/Loading/Loading";
import useUserVerification from "../../../hooks/useUserVerification";

const ManageUsers = () => {
  const {loading,isFetching} = useUserVerification();
  const {errorToast, warningToast } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["manage_users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users");
      return data;
    },
  });

  if(isLoading || loading || isFetching ) return <Loading></Loading>

  const handleMakeAdmin = async (id) => {
    const role = "Admin";
    try {
      const { data } = await axiosSecure.patch(`/user-subscription/${id}`, {
        role,
      });
      // console.log(data);
      if (data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Admin creation successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      } else {
        warningToast("This User Already Admin");
      }
    } catch (error) {
      errorToast("Something Wrong");
      // console.log(error);
    }
    // console.log(id);
  };
  const handleMakeModerator = async (id) => {
    const role = "Moderator";
    try {
      const { data } = await axiosSecure.patch(`/user-subscription/${id}`, {
        role,
      });
      console.log(data);
      if (data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Moderator creation successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }else{
        warningToast("This User Already Moderator");
      }
    } catch (error) {
      errorToast("Something Wrong");
      // console.log(error);
    }
  };
  // console.log(data);
  return (
    <div className="bg-[#001f3f] text-[rgba(240,240,240,0.82)] rounded-lg">
      <Helmet>
        <title>Tech-Tools | Manage Users</title>
      </Helmet>
      {data.length > 0 ? (
        <div className="overflow-x-auto">
          <h1 className="text-2xl font-bold text-center my-4">
            All user Information
          </h1>
          <p className="text-center font-mono"> Total user : ({data.length})</p>
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th className="text-orange-400">SL</th>
                <th className="text-orange-400">user Info</th>
                <th className="text-orange-400">User Email</th>
                <th className="text-orange-400">Make Moderator</th>
                <th className="text-orange-400">Make Admin</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user, idx) => (
                <tr key={user._id}>
                  <th>
                    <label>{idx + 1}</label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={user?.photo} alt={user?.name} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user?.name}</div>
                        <div className="text-sm opacity-50">
                          {user?.subscription}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p>{user?.email}</p>
                  </td>
                  <td>
                    <button
                      onClick={() => handleMakeModerator(user?._id)}
                      className={user?.role === 'Moderator' ? 'btn btn-sm bg-yellow-400' : 'btn btn-sm' }
                    >
                      Make Moderator
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleMakeAdmin(user?._id)}
                      className={user?.role === 'Admin' ? 'btn btn-sm bg-yellow-400' : 'btn btn-sm' }
                    >
                      Make Admin
                    </button>
                  </td>
                  <th></th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <h1 className="text-center text-6xl pt-32">Empty</h1>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
