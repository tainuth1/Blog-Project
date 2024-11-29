import React from "react";
import { motion } from "motion/react";

const SuccessAlert = ({ message, closeAlert }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-96 flex items-center justify-between px-4 py-2 bg-green-50 border-l-8 border-green-500 text-green-700 rounded-lg shadow-md"
    >
      <div className="flex items-center">
        <i className="bx bx-check-circle text-green-500 text-xl mr-2"></i>
        <span className="text-sm font-medium">{message}</span>
      </div>
      <button
        onClick={closeAlert}
        className="text-green-700 hover:text-green-900 transition duration-200 active:scale-[0.95]"
      >
        <i className="bx bx-x text-2xl"></i>
      </button>
    </motion.div>
  );
};

export default SuccessAlert;
