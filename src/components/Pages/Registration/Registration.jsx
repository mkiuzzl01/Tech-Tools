import { useFormik } from "formik";
import { useState } from "react";
import { LuEyeOff } from "react-icons/lu";
import { FiEye } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPublic from "../../../hooks/useAxiosPublic";


const validate = (values) => {
  const errors = {};
  if (!values.Name) {
    errors.Name = "Required";
  } else if (values.Name.length >= 20) {
    errors.Name = "Must be 20 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 6) {
    errors.password = "Must be 6 characters or longer";
  } else if (!/[A-Z]/.test(values.password)) {
    errors.password = "Should contain at least one upper case";
  } else if (!/[a-z]/.test(values.password)) {
    errors.password = "Should contain at least one lower case";
  } else if (!/[!#$%&? "]/.test(values.password)) {
    errors.password = "Must be use Special characters";
  } 
  
  if (!values.Photo) {
    errors.Photo = "Required";
  }
  return errors;
};

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const Registration = () => {
  const axiosPublic = useAxiosPublic();
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const {logInWithGoogle,registerUser,successToast,errorToast,setUser,profileUpdate,user} = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogle = async ()=>{
    try {
        await logInWithGoogle();
      } catch (error) {
        // console.log(error.message);
       return errorToast("Something Wrong");
      }
      successToast("Login successful");
      navigate(location?.state ? location.state : '/' );
  }

  const formik = useFormik({
    initialValues: {
      Name: "",

      email: "",

      password: "",

      Photo: null,
    },

    validate,

    onSubmit: async (values) => {
      const image = values?.Photo;
      const name = values?.Name;
      const email = values?.email;
      const pass = values?.password;
      setError("")
      const formData = new FormData();
      formData.append("image", image);
        console.log(image);
      if (image) {  
        try {
          const { data } = await axiosPublic.post(imageHostingApi, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          console.log(data);
          if (data.success) {
            const photo = data.data.display_url;
            // const userInfo = { name, email, pass, photo };
            // console.log(userInfo);

            // Send data to firebase

            try {
              await registerUser(email, pass);
              await profileUpdate(name, photo);
              successToast('Registration successful');
            } catch (error) {
                errorToast("Something Wrong");
                console.log(error.message);
                return setError(error.message.split("/")[1].split(")"));
            }
            setUser(...{ user, photoURL: photo, displayName: name });
            navigate(location?.state ? location.state : "/");
          }

        } catch (error) {
          console.log(error.message);
        }
      }
    },
  });
  return (
    <div className="lg:w-1/2 lg:m-auto border-2 lg:p-10 m-4 p-5 lg:mt-2 rounded-lg">
      <div className="mb-10">
        <h1 className="text-5xl font-bold text-center">Registration</h1>
      </div>
      <div onClick={handleGoogle} className="flex items-center justify-center space-x-4 border-2 border-dashed rounded-lg p-2 my-4">
        <span>
          <FcGoogle className="text-3xl" />
        </span>
        <span className="text-2xl">Login with Google</span>
      </div>
      <div className="flex items-center w-full my-4">
        <hr className="w-full dark:text-gray-600" />
        <p className="px-3 dark:text-gray-600">OR</p>
        <hr className="w-full dark:text-gray-600" />
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-control">
          <label htmlFor="Name" className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            className="input input-bordered"
            id="Name"
            name="Name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.Name}
          />
          {formik.errors.Name ? (
            <div className="text-red-600">{formik.errors.Name}</div>
          ) : null}
        </div>
        <div className="form-control">
          <label className="label" htmlFor="email">
            <span className="label-text">Email</span>
          </label>
          <input
            className="input input-bordered"
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />

          {formik.errors.email ? (
            <div className="text-red-600">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="form-control">
          <label htmlFor="password" className="label">
            <span className="label-text">Password</span>
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input
              className="grow"
              id="password"
              name="password"
              type={showPass ? "text" : "password"}
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <span onClick={() => setShowPass(!showPass)}>
              {showPass ? <LuEyeOff /> : <FiEye />}
            </span>
          </label>
          {formik.errors.password ? (
            <div className="text-red-600">{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="form-control">
          <label className="label" htmlFor="Photo">
            <span className="label-text">Photo</span>
          </label>
          <input
            type="file"
            id="Photo"
            name="Photo"
            onChange={(e) =>
              formik.setFieldValue("Photo", e.currentTarget.files[0])
            }
            value={formik.values.files}
            className="file-input file-input-bordered w-full"
          />
          {formik.errors.Photo ? (
            <div className="text-red-600">{formik.errors.Photo}</div>
          ) : null}
        </div>
        <p className="text-red-600">{error}</p>
        <button className="btn my-4 w-full" type="submit">
          Registration
        </button>
        <p className="text-center">
          Have an account? 
          <Link to="/Login" className=""> Login</Link>
        </p>
      </form>
      <ToastContainer limit={3} autoClose={1000}/>
    </div>
  );
};

export default Registration;
