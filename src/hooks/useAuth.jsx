import { useContext } from "react";
import { AuthContext } from "../AuthProvide/AuthProvider";

const useAuth = () => {
    const useAuth = useContext(AuthContext);
    return useAuth;
};

export default useAuth;