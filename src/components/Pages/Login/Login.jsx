import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { FiEye } from "react-icons/fi";
import { LuEyeOff } from "react-icons/lu";
import {
  LoadCanvasTemplate,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../../Shared/SocialLogin/SocialLogin";
import { GiOilySpiral } from "react-icons/gi";

const validate = (values) => {
  const errors = {};

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

  if (!values.captcha) {
    errors.captcha = "Required";
  }
  return errors;
};

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [captchaValid, setCaptchaValid] = useState(false);
  const { logInUser, successToast, errorToast, setLoading, loading } =
    useAuth();
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validate,

    onSubmit: async (values) => {
      setLoading(true);
      if (validateCaptcha(values.captcha)) {
        const { email, password } = values;
        // const userInfo = { email, password };

        // console.log(userInfo);

        try {
          await logInUser(email, password);
          successToast("Login successful");
         return navigate(location?.state ? location.state : "/");
        } catch (error) {
          errorToast("Something Wrong");
          return setLoading(false);
        }
      } else {
        setCaptchaValid(false);
        loadCaptchaEnginge(6); // Reload captcha if validation fails
      }
    },
  });
  return (
    <div className="lg:w-1/2 lg:m-auto border-2 lg:p-10 m-4 p-5 lg:mt-10 rounded-lg bg-[#96CEB4]">
      <div className="mb-10">
        <h1 className="text-5xl font-bold text-center">Login</h1>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex justify-center border-2 border-dashed rounded-lg">
          <label>
            <LoadCanvasTemplate />
          </label>
        </div>

        <div className="form-control">
          <label htmlFor="email" className="label">
            <span className="label-text">Email Address</span>
          </label>
          <input
            className="input input-bordered"
            placeholder="Enter Your Email"
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </div>

        {formik.errors.email ? (
          <div className="text-red-500">{formik.errors.email}</div>
        ) : null}

        <div className="form-control">
          <label htmlFor="password" className="label">
            <span className="label-text">Password</span>
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input
              className="grow"
              placeholder="Enter Password"
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
          <label htmlFor="Captcha" className="label">
            <span className="label-text">Captcha</span>
          </label>
          <input
            placeholder="Enter Your Captcha Code"
            type="text"
            name="captcha"
            id="captcha"
            className="input input-bordered"
            onChange={formik.handleChange}
            value={formik.values.captcha}
            onBlur={() =>
              setCaptchaValid(validateCaptcha(formik.values.captcha))
            }
          />
          {formik.errors.captcha ? (
            <div className="text-red-600">{formik.errors.captcha}</div>
          ) : null}
        </div>
        <button
          className="btn w-full mt-4"
          type="submit"
          disabled={!captchaValid}
        >
          {loading ? (
            <GiOilySpiral className="animate-spin text-2xl text-red-400" />
          ) : (
            <>Login</>
          )}
        </button>
        <div>
          <SocialLogin></SocialLogin>
        </div>
        <p className="text-center">
          Don't have an account?
          <Link to="/Registration" className="text-[#C7253E]">
            {" "}
            Registration
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
