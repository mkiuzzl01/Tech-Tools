import useUserVerification from "../../../hooks/useUserVerification";
import AdminProfile from "../../Pages/AdminProfile/AdminProfile";
import ModeratorProfile from "../../Pages/ModeratorProfile/ModeratorProfile";
import UserProfile from "../../Pages/UserProfile/UserProfile";

const Profile = () => {
  const { role} = useUserVerification();
  return (
    <div>
      {role.role === "Admin" && <AdminProfile></AdminProfile>}
      {role.role === "Moderator" && <ModeratorProfile></ModeratorProfile>}
      {role.role === "user" && <UserProfile></UserProfile>}
    </div>
  );
};

export default Profile;
