import useAuth from "../../../hooks/useAuth";

const UserProfile = () => {
  const { user } = useAuth();
//   console.log(user);
  return (
    <div className="flex justify-center flex-col">
      <div className="">
        <img src={user?.photoURL} className="w-1/4" />
      </div>
      <div className="">
        <h1>{user?.displayName}</h1>
        <p>{user?.email}</p>
      </div>
    </div>
  );
};

export default UserProfile;
