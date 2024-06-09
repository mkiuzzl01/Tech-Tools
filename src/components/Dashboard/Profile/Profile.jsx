import useAuth from "../../../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();
  //   console.log(user);
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
      <div className="w-full h-64 flex flex-col justify-center items-center bg-gray-300 bg-center bg-cover rounded-lg shadow-md">
        <div className="">
          <img src={user.photoURL} alt="" className="rounded-full w-32 border-violet-500 border-4 " />
        </div>
        <p>{user.email}</p>
      </div>

      <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
        <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">
          {user.displayName}
        </h3>

        <div className="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
          <span className="font-bold text-gray-800 dark:text-gray-200">
            Change Role
          </span>
          <button className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none">
            Click
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
