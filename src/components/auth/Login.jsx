import React, { useState } from "react";
import { useAuth } from "./AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Formik, Form } from "formik";
import * as Yup from "yup";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [failedLogin, setFailedLogin] = useState(false);
  const initialValue = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format.")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = async (values, { setFieldError }) => {
    try {
      const response = await fetch(
        `http://localhost:3000/users?email=${values.email}`
      );

      if (!response.ok) {
        throw new Error("Unable to fetch user data.");
      }
      const data = await response.json();
      if (data.length === 0) {
        throw new Error("User not found. Please register first.");
      }
      const user = data[0];
      if (user.password !== values.password) {
        // If password is invalid, set the error on the password field using Formik's setFieldError
        setFieldError("password", "Invalid password.");
        return;
      }
      setFailedLogin(false);
      login(user, rememberMe);
      navigate("/");
    } catch (error) {
      setFailedLogin(true);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <div className="flex justify-center mb-6">
            {/* <i className="fas fa-water text-4xl text-purple-500"></i> */}
            <h2 className="text-4xl text-purple-500 font-bold">Blogger.</h2>
          </div>

          <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
            Sign in to your account
          </h2>

          {failedLogin && (
            <p className="text-center text-red-500 mb-6 border py-1 rounded-md border-red-300">
              Account not available.
            </p>
          )}

          <Formik
            initialValues={initialValue}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-600 font-medium mb-2"
                >
                  Email address
                  <ErrorMessage
                    name="email"
                    component="span"
                    className="text-red-600 text-[10px] ml-5"
                  />
                </label>
                <div className="relative">
                  <Field
                    id="email"
                    type="email"
                    name="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    placeholder="Enter your email"
                  />
                  <i className="bx bxs-envelope absolute text-xl right-3 top-2 text-gray-400"></i>
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-600 font-medium mb-2"
                >
                  Password
                  <ErrorMessage
                    name="password"
                    component="span"
                    className="text-red-600 text-[10px] ml-5"
                  />
                </label>
                <div className="relative">
                  <Field
                    id="password"
                    type="password"
                    name="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    placeholder="Enter your password"
                  />
                  <i className="bx bxs-lock-alt absolute text-xl right-3 top-2 text-gray-400"></i>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      onChange={() => setRememberMe(!rememberMe)}
                      className="form-checkbox h-4 w-4 text-purple-500"
                    />
                    <span className="ml-2 text-gray-700">Remember me</span>
                  </label>
                </div>
                <a href="#" className="text-purple-500 text-sm hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              >
                Sign in
              </button>

              <div className="mt-6 text-center text-gray-500">
                Don't have Account? |{" "}
                <Link to="/register" className="underline text-blue-600">
                  Register
                </Link>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Login;
