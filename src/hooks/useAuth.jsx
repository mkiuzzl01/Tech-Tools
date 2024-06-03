import { useContext } from "react";
import { AuthContext } from "../AuthProvide/AuthProvider";

const useAuth = () => {
    const Auth = useContext(AuthContext);
    return Auth;
};

export default useAuth;