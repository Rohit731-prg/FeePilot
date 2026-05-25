import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import useAdminStore from "../../Store/AdminStore";
import { useNavigate } from "react-router-dom";

function Login_Teacher() {
  const navigate = useNavigate();
  const { login } = useAdminStore();
  const [teacherDetails, setTeacherDetails] = useState({
    email: "",
    password: "",
  });

  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(teacherDetails);
    const res = await login(teacherDetails);
    if (res) navigate("/dashboard")
  };

  return (
    <form
      onSubmit={handelSubmit}
      className="space-y-6"
    >

      {/* Email */}
      <div>

        <label className="block text-sm font-medium text-slate-600 mb-2">
          Email Address
        </label>

        <div className="relative">

          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <FaEnvelope />
          </div>

          <input
            type="email"
            placeholder="Enter your email"
            value={teacherDetails.email}
            onChange={(e) =>
              setTeacherDetails({
                ...teacherDetails,
                email: e.target.value,
              })
            }
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-slate-50"
          />
        </div>
      </div>

      {/* Password */}
      <div>

        <label className="block text-sm font-medium text-slate-600 mb-2">
          Password
        </label>

        <div className="relative">

          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <FaLock />
          </div>

          <input
            type="password"
            placeholder="Enter your password"
            value={teacherDetails.password}
            onChange={(e) =>
              setTeacherDetails({
                ...teacherDetails,
                password: e.target.value,
              })
            }
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-slate-50"
          />
        </div>
      </div>

      {/* Forgot Password */}
      <div className="flex items-center justify-end">

        <button
          type="button"
          className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-all duration-300"
        >
          Forgot Password?
        </button>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 rounded-2xl font-semibold shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:scale-[1.01]"
      >
        Login to Dashboard 🚀
      </button>

      {/* Bottom Text */}
      <p className="text-center text-sm text-slate-500">
        Secure teacher access portal
      </p>
    </form>
  );
}

export default Login_Teacher;