/* eslint-disable react-hooks/rules-of-hooks */
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useFormik, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import { LockClosedIcon } from "@heroicons/react/solid";
import * as Yup from "yup";
import Link from "next/link";
import { loginTry, setUserDataFromCookie } from "@/redux/slices/userSlices";
import { getCookie, hasCookie } from "cookies-next";
import jwtDecode from "jwt-decode";
import Page from "./component/commons/Page";

export default function signin() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { error, user } = useSelector((state : any) => state.users);
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().min(3).max(10).required("Password is required"),
  });

  useEffect(() => {
    if(hasCookie('access_token') || user){
      router.push("/app");
    } 
  }, [user]);
  

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let payload = {
        username: values.username,
        password: values.password,
      };
      dispatch(loginTry(payload));
    },
  });

  if(user){
    return (<Page><h1>redirect....</h1></Page>)
  }

  return (
    <div>
      <div className="text-center mt-24">
        <div className="flex items-center justify-center">
          <img
            className="h-10 w-auto"
            src="/assets/images/codeid_logo.png"
            alt="codeid"
          />
        </div>
        <h2 className="text-4xl tracking-tight">Sign in into your account</h2>
        <span className="text-sm">
          or{" "}
          <Link
            href="/signup"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            sign up your account
          </Link>
        </span>
      </div>
      <div className="flex justify-center my-2 mx-4 md:mx-0">
        <form onSubmit={formik.handleSubmit} className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
        {error && <h1 className="text-white bg-red-400 p-3 my-2 rounded-md text-center">{error}</h1>}
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="username"
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                placeholder="Username"
                required
              />
              {formik.touched.username && formik.errors.username ? (
                <span className="mt-2 text-sm text-red-600">
                  {formik.errors.username}
                </span>
              ) : null}
            </div>
            <div className="w-full md:w-full px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="Password"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="current-password"
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                placeholder="Password"
                required
              />
              {formik.touched.password && formik.errors.password ? (
                <span className="mt-2 text-sm text-red-600">
                  {formik.errors.password}
                </span>
              ) : null}
            </div>
            <div className="w-full md:w-full px-3 mb-6">
              <button type="submit"
                className="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-white focus:border-gray-500"
              >
                Sign In
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
