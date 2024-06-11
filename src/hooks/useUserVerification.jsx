import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { data } from "autoprefixer";

const useUserVerification = () => {
    const axiosSecure = useAxiosSecure();
    const {user,loading} = useAuth();

    const {data:role = "" , isFetching } = useQuery({
        queryKey:['role',user?.email],
        enabled:!!user?.email,
        queryFn: async () =>{
            const {data} = await axiosSecure.get(`/user/${user?.email}`);
            return data
        }
    })
    // console.log(data);
    return {role,isFetching,loading}
};

export default useUserVerification;