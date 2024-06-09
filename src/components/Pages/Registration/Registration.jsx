import { useFormik } from "formik";
import { useState } from "react";
import { LuEyeOff } from "react-icons/lu";
import { FiEye } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import SocialLogin from "../../Shared/SocialLogin/SocialLogin";
import { GiOilySpiral } from "react-icons/gi";

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

  return errors;
};

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const Registration = () => {
  const axiosPublic = useAxiosPublic();
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const {
    registerUser,
    successToast,
    errorToast,
    setUser,
    profileUpdate,
    user,
    setLoading,
    loading,
  } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      Name: "",

      email: "",

      password: "",

      Photo: null,
    },

    validate,

    onSubmit: async (values) => {
      setLoading(true);
      const image = values?.Photo;
      const name = values?.Name;
      const email = values?.email;
      const pass = values?.password;

      setError("");
      const formData = new FormData();
      formData.append("image", image);
      // console.log(image);

      //upload to image imagebb from get input field
      let photoURL = null;
      if (image) {
        try {
          const { data } = await axios.post(imageHostingApi, formData, {
            headers: {
              "content-Type": "multipart/form-data",
            },
          });
          photoURL = data?.data?.display_url;
          // console.log(photoURL);
          // setPhoto(photoURL);
        } catch (error) {
          errorToast("Something went wrong with photo upload");
          setLoading(false);
          return;
        }
      }
      try {
        //set information to firebase
        await registerUser(email, pass);
        await profileUpdate(name, photoURL);
        successToast("Registration successful");
        navigate(location?.state ? location.state : "/");
        setUser({ ...user, photoURL: photoURL, displayName: name });
      } catch (error) {
        errorToast("Something Wrong");
        setError(error.message.split("/")[1].split(")"));
        // console.log(error.message);
      }

      try {
        //after all oke then user information sent to database
        const info = { name, email, image, photoURL };
        await axiosPublic.post("/users", info);
        // console.log(res.data);
      } catch (error) {
        errorToast("Something Wrong Sent to Database Your Information");
      }
    },
  });
  return (
    <div className="lg:w-1/2 lg:m-auto border-2 lg:p-10 m-4 p-5 lg:mt-2 rounded-lg">
      <div className="mb-10">
        <h1 className="text-5xl font-bold text-center">Registration</h1>
      </div>
      <div>
        <SocialLogin></SocialLogin>
      </div>
      <div className="flex items-center w-full my-4">
        <hr className="w-full dark:text-gray-600" />
        <p className="px-3 dark:text-gray-600">OR</p>
        <hr className="w-full dark:text-gray-600" />
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-control">
          <label htmlFor="Name" className="label">
            <span className="label-text">Name:</span>
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
            <span className="label-text">Email:</span>
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
            <span className="label-text">Password:</span>
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
            <span className="label-text">Photo:</span>
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
        <button disabled={loading} className="btn my-4 w-full" type="submit">
          {loading ? (
            <GiOilySpiral className="animate-spin text-2xl text-red-400" />
          ) : (
            <>Registration</>
          )}
        </button>
        <p className="text-center">
          Have an account?
          <Link to="/Login" className="">
            {" "}
            Login
          </Link>
        </p>
      </form>
      <ToastContainer limit={3} autoClose={1000} />
    </div>
  );
};

export default Registration;
