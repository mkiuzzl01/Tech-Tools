import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { logInWithGoogle, successToast, errorToast, loading, setLoading } =
    useAuth();
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location?.state ? location?.state?.from?.pathname : "/";
  const handleGoogle = async () => {
    setLoading(true);
    try {
      const { user } = await logInWithGoogle();
      if (user) {
        const name = user?.displayName;
        const email = user?.email;
        const photo = user?.photoURL;
        const info = { name, email, photo, role:'user' };

        try {
          await axiosPublic.post("/users", info);
          successToast("Login successful");
          navigate(from);
        } catch (error) {
          errorToast(error?.response?.data?.error?.message);
          return setLoading(false);
        }
      }
    } catch (error) {
      errorToast("something wrong")
      errorToast(error.message.split("/")[1].split(")"));
      return setLoading(false);
    }
  };

  return (
    <button
      disabled={loading}
      onClick={handleGoogle}
      className="flex items-center justify-center space-x-4 border-2 hover:bg-slate-100 border-dashed rounded-lg p-2 my-4 w-full"
    >
      <span>
        <FcGoogle className="text-3xl" />
      </span>
      <span className="text-2xl">Login with Google</span>
    </button>
  );
};

export default SocialLogin;
