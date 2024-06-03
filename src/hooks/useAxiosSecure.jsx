import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL:'http://localhost:5000',

})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const {logOut} = useAuth();

    axiosSecure.interceptors.request.use((config)=>{
        const token = localStorage.getItem('Token');
        config.headers.authorization = `Bearer ${token}`;
        // console.log("request stop by interceptor",token);
        return config;
    },(error)=>{
        return Promise.reject(error);
    });

    axiosSecure.interceptors.response.use((config)=>{
        return config;
    }, async (error)=>{
        const status = error.response.status;
        if(status == 401 || status == 403){
           await logOut();
            navigate('/Login');
        }
        // console.log(status);
        return Promise.reject(error);
    })
    return axiosSecure;
};

export default useAxiosSecure;