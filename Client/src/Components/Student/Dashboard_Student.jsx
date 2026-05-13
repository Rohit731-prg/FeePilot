import React, { useEffect, useState } from "react";
import useStudentStore from "../../Store/StudentStore";
import Update_Student_Details from "./Update_Student_Details";
import { Toaster } from "react-hot-toast";
import { IoIosNotificationsOutline } from "react-icons/io";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaMoneyBillWave,
  FaBookOpen,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Dashboard_Student() {
  const navigate = useNavigate();
  const { student, get_teachers, teacher } = useStudentStore();

  const [is_open_modal, setIs_open_modal] = useState(false);

  const fetch_teachers_fun = async (id) => {
    if (!id) return;
    await get_teachers(id);
  };

  useEffect(() => {
    fetch_teachers_fun(student?.professor_id);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white px-4 md:px-8 py-6">

      {/* Top Header */}
      <div className="flex items-center justify-between mb-10">

        <div>
          <p className="text-sm text-slate-400 tracking-wide">
            STUDENT PORTAL
          </p>

          <h1 className="text-3xl md:text-4xl font-bold mt-1">
            Welcome back,{" "}
            <span className="text-blue-400">
              {student?.name?.split(" ")[0]}
            </span>
          </h1>
        </div>

        <button className="bg-[#0F172A] border border-slate-800 hover:border-blue-500 transition-all duration-300 p-4 rounded-2xl">
          <IoIosNotificationsOutline className="text-2xl text-slate-300" />
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Side */}
        <div className="lg:col-span-1 space-y-6">

          {/* Profile Card */}
          {student && (
            <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-xl">

              {/* Glow */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 blur-3xl rounded-full"></div>

              <div className="relative z-10">

                {/* Avatar */}
                <div className="flex items-center gap-4 mb-6">

                  <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-2xl font-bold shadow-lg">
                    {student.name?.charAt(0)}
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold">
                      {student.name}
                    </h2>

                    <p className="text-sm text-slate-400">
                      Student Account
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3 text-sm">

                  <div className="bg-[#111827] border border-slate-800 rounded-xl p-3">
                    <p className="text-slate-400 mb-1">
                      Phone Number
                    </p>

                    <p className="font-medium">
                      {student.phone}
                    </p>
                  </div>

                  <div className="bg-[#111827] border border-slate-800 rounded-xl p-3">
                    <p className="text-slate-400 mb-1">
                      Email Address
                    </p>

                    <p className="font-medium break-all">
                      {student.email || "Email not available"}
                    </p>
                  </div>
                </div>

                {/* Button */}
                <button
                  onClick={() => setIs_open_modal(true)}
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 transition-all duration-300 py-3 rounded-2xl font-medium shadow-lg shadow-blue-500/10"
                >
                  Update Account
                </button>
              </div>
            </div>
          )}

          {/* Teacher Card */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 shadow-xl">

            <div className="flex items-center gap-3 mb-5">

              <div className="bg-blue-500/10 p-3 rounded-2xl">
                <FaChalkboardTeacher className="text-blue-400 text-xl" />
              </div>

              <div>
                <h2 className="text-xl font-semibold">
                  Assigned Teacher
                </h2>

                <p className="text-sm text-slate-400">
                  Academic supervisor
                </p>
              </div>
            </div>

            <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 hover:border-blue-500 transition-all duration-300">

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                  <FaUserGraduate className="text-xl text-slate-300" />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    {teacher?.name || "Teacher"}
                  </h3>

                  <p className="text-sm text-slate-400 break-all">
                    {teacher?.email || "teacher@email.com"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:col-span-2">

          <div className="flex items-center justify-between mb-6">

            <div>
              <h2 className="text-2xl font-bold">
                Student Services
              </h2>

              <p className="text-slate-400 mt-1">
                Access your academic resources and payment information
              </p>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

            {[
              {
                id: 1,
                name: "My Subjects",
                desc: "View enrolled subjects and papers",
                icon: <FaBookOpen className="text-2xl" />,
                navigate: "/student-subject"
              },
              {
                id: 2,
                name: "My Payments",
                desc: "Track fees, dues and payment history",
                icon: <FaMoneyBillWave className="text-2xl" />,
                navigate: "/student-payment"
              },
              {
                id: 3,
                name: "My Batches",
                desc: "Check your assigned batches and timing",
                icon: <FaUserGraduate className="text-2xl" />,
                navigate: "/student-batch"
              },
            ].map((item) => (
              <button
                key={item.id}
                className="group bg-[#0F172A] border border-slate-800 rounded-3xl p-6 text-left hover:border-blue-500 hover:-translate-y-1 transition-all duration-300 shadow-lg"
              >

                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-5 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>

                <h3 className="text-xl font-semibold mb-2">
                  {item.name}
                </h3>

                <p className="text-sm text-slate-400 leading-relaxed">
                  {item.desc}
                </p>

                <div 
                  onClick={() => navigate(item.navigate)}
                  className="mt-6 text-blue-400 text-sm font-medium">
                  Open Section →
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {is_open_modal && (
        <Update_Student_Details
          is_open_modal={is_open_modal}
          setIs_open_modal={setIs_open_modal}
        />
      )}

      <Toaster />
    </div>
  );
}

export default Dashboard_Student;