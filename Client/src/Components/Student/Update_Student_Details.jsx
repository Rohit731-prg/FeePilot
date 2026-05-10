import React, { useState } from "react";
import Modal from "react-modal";
import useStudentStore from "../../Store/StudentStore";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.7)",
    backdropFilter: "blur(4px)",
    zIndex: 1000,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    border: "none",
    padding: "0px",
    background: "transparent",
  },
};

function Update_Student_Details({ is_open_modal, setIs_open_modal }) {
  const { student, update_student_details } = useStudentStore();

  const [studentDetais, setStudentDetails] = useState({
    id: student.id || null,
    name: student?.name || "",
    email: student?.email || "",
    phone: student?.phone || "",
    password: "",
  });

  function closeModal() {
    setIs_open_modal(false);
  }

  const handelSubmit = async (e) => {
    e.preventDefault();
    let updatedStudent = { ...studentDetais };
    console.log(updatedStudent)
    if (studentDetais.phone) {
      const phone_str = studentDetais.phone.split(" ")[1];
      console.log(phone_str)
      updatedStudent.phone = phone_str;
    }
    console.log(updatedStudent);
    await update_student_details(updatedStudent);
    setStudentDetails(updatedStudent);
  };

  return (
    <Modal
      isOpen={is_open_modal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Update Student"
    >
      <div className="w-[95vw] sm:w-105 bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-2xl text-white relative overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute w-40 h-40 bg-blue-500/20 rounded-full blur-3xl -top-10 -right-10"></div>

        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-sm"
        >
          ✕
        </button>

        {/* Heading */}
        <div className="mb-6 relative z-10">
          <h2 className="text-2xl font-bold">Update Profile</h2>
          <p className="text-sm text-gray-400 mt-1">
            Modify your student details securely.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handelSubmit} className="space-y-4 relative z-10">
          {/* Name */}
          <div>
            <label className="text-sm text-gray-300 block mb-1">
              Full Name
            </label>

            <input
              type="text"
              value={studentDetais.name}
              onChange={(e) =>
                setStudentDetails({
                  ...studentDetais,
                  name: e.target.value,
                })
              }
              placeholder="Enter your full name"
              className="w-full bg-[#1F2937] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-300 block mb-1">
              Email Address
            </label>

            <input
              type="email"
              value={studentDetais.email}
              onChange={(e) =>
                setStudentDetails({
                  ...studentDetais,
                  email: e.target.value,
                })
              }
              placeholder="Enter your email"
              className="w-full bg-[#1F2937] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500 transition"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm text-gray-300 block mb-1">
              Phone Number
            </label>

            <input
              type="text"
              value={studentDetais.phone}
              onChange={(e) =>
                setStudentDetails({
                  ...studentDetais,
                  phone: e.target.value,
                })
              }
              placeholder="Enter your phone number"
              className="w-full bg-[#1F2937] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-300 block mb-1">
              New Password
            </label>

            <input
              type="password"
              value={studentDetais.password}
              onChange={(e) =>
                setStudentDetails({
                  ...studentDetais,
                  password: e.target.value,
                })
              }
              placeholder="Enter new password"
              className="w-full bg-[#1F2937] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500 transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-lg font-semibold mt-2"
          >
            Update Details
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default Update_Student_Details;
