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

function Dashboard_Student() {
  const { student, get_teachers, teachers } = useStudentStore();

  const [is_open_modal, setIs_open_modal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const fetch_teachers_fun = async (id) => {
    if (!id) return;
    await get_teachers(id);
  };

  useEffect(() => {
    fetch_teachers_fun(student?.id);
  }, []);

  return (
    <div className="min-h-screen bg-[#0F172A] text-white px-4 py-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-gray-400 text-sm">Welcome Back 👋</p>
          <h1 className="text-3xl font-bold mt-1">
            {student?.name || "Student"}
          </h1>
        </div>

        <div className="bg-[#1E293B] p-3 rounded-xl border border-gray-700 cursor-pointer hover:bg-[#273549] transition">
          <IoIosNotificationsOutline className="text-2xl" />
        </div>
      </div>

      {/* Student Profile Card */}
      {student && (
        <div className="bg-[#111827] border border-gray-800 rounded-3xl p-6 shadow-xl mb-8 relative overflow-hidden">

          {/* Glow */}
          <div className="absolute w-44 h-44 bg-blue-500/10 rounded-full blur-3xl -top-10 -right-10"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-2xl font-bold">
                {student.name?.charAt(0)}
              </div>

              <div>
                <h2 className="text-xl font-semibold">{student.name}</h2>
                <p className="text-gray-400 text-sm">
                  {student.email || "Email not found"}
                </p>
              </div>
            </div>

            <div className="space-y-2 text-gray-300">
              <p>
                📞 {student.phone}
              </p>

              <p>
                🎓 Student Dashboard Access Enabled
              </p>
            </div>

            <button
              onClick={() => setIs_open_modal(true)}
              className="mt-6 bg-blue-600 hover:bg-blue-700 transition px-5 py-3 rounded-xl font-medium"
            >
              Update Account
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {is_open_modal && (
        <Update_Student_Details
          is_open_modal={is_open_modal}
          setIs_open_modal={setIs_open_modal}
        />
      )}

      {/* Teacher Section */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-5">
          <FaChalkboardTeacher className="text-xl text-blue-400" />
          <h2 className="text-2xl font-semibold">My Teachers</h2>
        </div>

        {teachers?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {teachers.map((teacher) => (
              <div
                key={teacher.id}
                onClick={() => setSelectedTeacher(teacher)}
                className={`cursor-pointer rounded-2xl border p-5 transition-all duration-300 ${
                  selectedTeacher?.id === teacher.id
                    ? "bg-blue-600 border-blue-500"
                    : "bg-[#111827] border-gray-800 hover:border-blue-500 hover:translate-y-[-3px]"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-[#1E293B] flex items-center justify-center">
                    <FaUserGraduate />
                  </div>

                  <div>
                    <h3 className="font-semibold">{teacher.name}</h3>
                    <p className="text-sm text-gray-400">
                      {teacher.email}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-300">
                  Tap to view teacher related features.
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 text-gray-400">
            No teachers assigned yet.
          </div>
        )}
      </div>

      {/* Teacher Feature Actions */}
      {selectedTeacher && (
        <div>
          <div className="flex items-center gap-2 mb-5">
            <FaBookOpen className="text-blue-400 text-xl" />
            <h2 className="text-2xl font-semibold">
              {selectedTeacher.name}'s Section
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

            {[
              {
                id: 1,
                name: "My Subjects",
                icon: <FaBookOpen className="text-2xl" />,
              },
              {
                id: 2,
                name: "My Payments",
                icon: <FaMoneyBillWave className="text-2xl" />,
              },
              {
                id: 3,
                name: "My Batches",
                icon: <FaUserGraduate className="text-2xl" />,
              },
            ].map((item) => (
              <button
                key={item.id}
                className="bg-[#111827] border border-gray-800 rounded-2xl p-6 hover:border-blue-500 hover:bg-[#172036] transition text-left"
              >
                <div className="mb-4 text-blue-400">
                  {item.icon}
                </div>

                <h3 className="text-lg font-semibold">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  Access your {item.name.toLowerCase()} quickly.
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      <Toaster />
    </div>
  );
}

export default Dashboard_Student;