import { ErrorMessage, Field, Form, Formik } from "formik";
import { motion } from "motion/react";
import { useOutletContext } from "react-router-dom";
import * as Yup from "yup";

const EditProfile = () => {
  const { UserId, setShowEditProfile } = useOutletContext();
  const initialValue = {
    nickname: "",
    username: "",
    email: "",
    profile: "",
  };

  const validationSchema = Yup.object({
    nickname: Yup.string()
      .required("Nickname is required.")
      .min(6, "Nickname is too short"),
    username: Yup.string()
      .required("Username is required")
      .min(6, "Username is too short"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    profile: Yup.string().required("Profile is required"),
  });
  const handleFrom = () => {
    setShowEditProfile(false);
  };
  const handleSubmit = () => {};
  return (
    <motion.div
      initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
      animate={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
      exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
      transition={{ duration: 0.1 }}
      className="fixed transition-all inset-0 flex justify-center items-center bg-black z-10"
    >
      <div onClick={handleFrom} className="absolute w-full h-full"></div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.15 }}
        className="z-20"
      >
        <div className="w-[900px] bg-white rounded-2xl shadow-2xl overflow-hidden relative">
          {/* {loading && (
            <div className="absolute top-6 left-[500px]">
              <Loading />
            </div>
          )} */}
          <div className="w-full px-3 py-1 border-b-[1px] bg-slate-200">
            <div className="w-full flex justify-between items-center">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded-full bg-[#FF5F56] cursor-pointer"></div>
                <div className="w-4 h-4 rounded-full bg-[#FFBD2E] cursor-pointer"></div>
                <div className="w-4 h-4 rounded-full bg-[#27c93f] cursor-pointer"></div>
              </div>
              <button
                onClick={handleFrom}
                className="w-10 h-10 transition-all flex justify-center items-center rounded-full text-gray-600 hover:text-gray-700 active:scale-[0.95] hover:bg-gray-100"
              >
                <i className="bx bx-x text-3xl "></i>
              </button>
            </div>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 mt-3">
                <Formik
                  initialValues={initialValue}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  <Form>
                    <div className="flex items-start gap-5">
                      <div className="w-1/2">
                        <label htmlFor="" className="text-sm text-gray-600">
                          Nickname
                        </label>
                        <Field
                          type="text"
                          name="nickname"
                          className={
                            "border w-full px-5 py-3 rounded-lg focus:outline-blue-600 text-gray-700 "
                          }
                          placeholder="Nickname"
                        />
                        <ErrorMessage
                          name="nickname"
                          component="span"
                          className="text-red-600 text-[10px]"
                        />
                      </div>
                      <div className="w-1/2">
                        <label htmlFor="" className="text-sm text-gray-600">
                          Username
                        </label>
                        <Field
                          type="text"
                          name="username"
                          className={
                            "border w-full px-5 py-3 rounded-lg focus:outline-blue-600 text-gray-700 "
                          }
                          placeholder="Username"
                        />
                        <ErrorMessage
                          name="username"
                          component="span"
                          className="text-red-600 text-[10px]"
                        />
                      </div>
                    </div>
                    <div className="w-full mt-3">
                      <label htmlFor="" className="text-sm text-gray-600">
                        Email
                      </label>
                      <Field
                        type="text"
                        name="email"
                        className={
                          "border w-full px-5 py-3 rounded-lg focus:outline-blue-600 text-gray-700 "
                        }
                        placeholder="Email"
                      />
                      <ErrorMessage
                        name="email"
                        component="span"
                        className="text-red-600 text-[10px]"
                      />
                    </div>
                    <div className="w-full mt-3">
                      <label htmlFor="" className="text-sm text-gray-600">
                        Profile
                      </label>
                      <Field
                        type="text"
                        name="profile"
                        autoComplete="off"
                        className="border w-full px-5 py-3 rounded-lg focus:outline-blue-600 text-gray-700"
                        placeholder="eg. https://example.com/pexels-photo.jpg"
                      />
                      <ErrorMessage
                        name="profile"
                        component="span"
                        className="text-red-600 text-[10px]"
                      />
                    </div>
                    <div className="flex gap-3 justify-end items-center mt-3">
                      <button
                        type="reset"
                        className="px-5 py-2 bg-red-600 text-white rounded-lg active:scale-[0.96]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-8 py-2 bg-blue-600 text-white rounded-lg active:scale-[0.96]"
                      >
                        Update
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
              <div className="col-span-1 mt-3">
                <label htmlFor="" className="text-sm text-gray-600">
                  Thumbnail Preview
                </label>
                <div className="w-full p-1 aspect-square flex justify-center items-center rounded-lg border-[2px] overflow-hidden"></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EditProfile;
