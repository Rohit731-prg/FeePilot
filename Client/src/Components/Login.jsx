import React, { useState } from "react";
import Login_Teacher from "./Teacher/Login_Teacher";
import SignUp from "./Teacher/SignUp";
import Login_Student from "./Student/Login_Student";
import { Toaster } from "react-hot-toast";

function Login() {
  const [is_student, setIs_student] = useState(false);
  const [is_teacher_login, setIS_teacher_login] = useState(true);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-4 py-10">
      
      {/* Glass Card */}
      <div className="w-full max-w-5xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        
        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-between p-10 bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 text-white relative overflow-hidden">
          
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -translate-x-20 -translate-y-20"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-black/20 rounded-full blur-3xl translate-x-20 translate-y-20"></div>

          <div className="relative z-10">
            <h1 className="text-5xl font-extrabold leading-tight">
              Welcome
              <br />
              Back 👋
            </h1>

            <p className="mt-6 text-lg text-white/80 leading-relaxed">
              Manage your classes, students, and learning journey in one
              beautiful place.
            </p>
          </div>

          <div className="relative z-10 flex gap-3 mt-10">
            <button
              onClick={() => setIs_student(false)}
              className={`px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
                !is_student
                  ? "bg-white text-slate-900 shadow-lg"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              Teacher
            </button>

            <button
              onClick={() => setIs_student(true)}
              className={`px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
                is_student
                  ? "bg-white text-slate-900 shadow-lg"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              Student
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="bg-white p-6 md:p-10">
          
          {/* Mobile Switch */}
          <div className="flex md:hidden gap-3 mb-6">
            <button
              onClick={() => setIs_student(false)}
              className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                !is_student
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              Teacher
            </button>

            <button
              onClick={() => setIs_student(true)}
              className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                is_student
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              Student
            </button>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800">
              {is_student ? "Student Login" : "Teacher Portal"}
            </h2>

            <p className="text-slate-500 mt-2">
              Access your dashboard securely 🚀
            </p>
          </div>

          {/* Teacher Tabs */}
          {!is_student && (
            <div className="flex bg-slate-100 rounded-2xl p-1 mb-8">
              <button
                onClick={() => setIS_teacher_login(true)}
                className={`flex-1 py-3 rounded-xl font-medium transition-all duration-300 ${
                  is_teacher_login
                    ? "bg-white shadow text-indigo-600"
                    : "text-slate-600"
                }`}
              >
                Login
              </button>

              <button
                onClick={() => setIS_teacher_login(false)}
                className={`flex-1 py-3 rounded-xl font-medium transition-all duration-300 ${
                  !is_teacher_login
                    ? "bg-white shadow text-indigo-600"
                    : "text-slate-600"
                }`}
              >
                Create Account
              </button>
            </div>
          )}

          {/* Forms */}
          <div className="animate-fadeIn">
            {is_student ? (
              <Login_Student />
            ) : is_teacher_login ? (
              <Login_Teacher />
            ) : (
              <SignUp />
            )}
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Login;