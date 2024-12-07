import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const initialValues = {
    id: Date.now(),
    nickname: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    profile:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg",
    created_at: new Date().toISOString(),
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long.")
      .required("Password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const { confirm_password, ...userData } = values;
    try {
      const responce = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!responce.ok) {
        throw new Error("Faild to sign up account.");
      }

      const data = await responce.json();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmailChange = (setFieldValue, value) => {
    const username = value.split("@")[0];
    setFieldValue("email", value);
    setFieldValue("username", username);
    setFieldValue("nickname", username);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <h2 className="text-4xl text-purple-500 font-bold">Blogger.</h2>
        </div>

        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
          Sign up
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
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
                    placeholder="Email"
                    onChange={(e) =>
                      handleEmailChange(setFieldValue, e.target.value)
                    }
                  />
                  <i className="bx bxs-envelope absolute text-xl right-3 top-2 text-gray-400"></i>
                </div>
              </div>

              <div className="mb-4 hidden">
                <label
                  htmlFor="username"
                  className="block text-gray-600 font-medium mb-2"
                >
                  Username
                </label>
                <div className="relative">
                  <Field
                    id="username"
                    type="text"
                    name="username"
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                    placeholder="Username auto-generated"
                  />
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
                    placeholder="Password"
                  />
                  <i className="bx bxs-lock-alt absolute text-xl right-3 top-2 text-gray-400"></i>
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="confirm_password"
                  className="block text-gray-600 font-medium mb-2"
                >
                  Confirm Password
                  <ErrorMessage
                    name="confirm_password"
                    component="span"
                    className="text-red-600 text-[10px] ml-5"
                  />
                </label>
                <div className="relative">
                  <Field
                    id="confirm_password"
                    type="password"
                    name="confirm_password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    placeholder="Confirm Password"
                  />
                  <i className="bx bxs-lock-alt absolute text-xl right-3 top-2 text-gray-400"></i>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              >
                Sign up
              </button>

              <div className="mt-6 text-center text-gray-500">
                Already have account? |{" "}
                <Link to="/login" className="underline text-blue-600">
                  Login
                </Link>
              </div>
              <div className="flex justify-between mt-4">
                <button type="button" className="w-full bg-white text-gray-600 border border-gray-300 rounded-lg py-1 px-4 flex items-center justify-center hover:bg-gray-50 active:scale-[0.96]">
                  <img className="w-7 h-7 object-cover mr-2" src="https://imagepng.org/wp-content/uploads/2019/08/google-icon.png" alt="" />
                  {/* <i className="bx bxl-google mr-2 text-3xl"></i> */}
                   Google
                </button>
                <button type="button" className="w-full bg-white border border-gray-300 rounded-lg py-1 px-4 flex items-center justify-center hover:bg-gray-50 active:scale-[0.96] ml-2">
                  {/* <img className="w-7 h-7 object-cover mr-2" src="https://www.pngarts.com/files/8/Github-Logo-Transparent-Background-PNG.png" alt="" /> */}
                  <i className="bx bxl-github mr-2 text-3xl"></i> 
                  GitHub
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
