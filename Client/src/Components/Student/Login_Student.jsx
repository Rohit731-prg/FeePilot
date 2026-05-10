import React, { useState } from "react";
import useStudentStore from "../../Store/StudentStore";
import { ToastBar } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login_Student() {
  const navigate = useNavigate();
  const { login_student } = useStudentStore();
  const [studentDetails, setStudentDetails] = useState({
    phone: "",
    password: "",
  });

  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(studentDetails);
    const res = await login_student(studentDetails);
    if (res) {
      navigate("/student-dashbord")
    }
  };

  return (
    <form onSubmit={handelSubmit} className="space-y-5">
      
      {/* Phone */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          Phone Number
        </label>

        <input
          type="tel"
          id="phone"
          placeholder="Enter your phone number"
          value={studentDetails.phone}
          onChange={(e) =>
            setStudentDetails({
              ...studentDetails,
              phone: e.target.value,
            })
          }
          className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          Password
        </label>

        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={studentDetails.password}
          onChange={(e) =>
            setStudentDetails({
              ...studentDetails,
              password: e.target.value,
            })
          }
          className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        className="w-full py-3 rounded-2xl bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all duration-300"
      >
        Login as Student
      </button>
    </form>
  );
}

export default Login_Student;