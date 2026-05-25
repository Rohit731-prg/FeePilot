import React, { useEffect, useState } from "react";
import useBatchStore from "../../Store/BatchStore";
import useCoureStore from "../../Store/Course";
import useStudentStore from "../../Store/StudentStore";
import Navber from "./Navber";

import {
  FaUserGraduate,
  FaPhone,
  FaBook,
  FaLayerGroup,
  FaCalendarAlt,
  FaPlus,
  FaTrash
} from "react-icons/fa";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Student_Portal() {
  const navigate = useNavigate();
  const { batches } = useBatchStore();
  const { students, create_new_student, get_all_students, setStudent } = useStudentStore();
  const [studentDetails, setStudentDetails] = useState({
    name: "",
    phone: "",
    batch_id: "",
    join_date: "",
  });

  const handelSubmit = async (e) => {
    e.preventDefault();
    await create_new_student(studentDetails);
  };

  useEffect(() => {
    get_all_students();
  }, []);

  const navigate_Student_details = (stu) => {
    setStudent(stu);
    navigate("/student-details");
  }

  return (
    <div className="min-h-screen bg-[#020617] flex">
      {/* Sidebar */}
      <Navber />

      {/* Main */}
      <main className="flex-1 px-4 md:px-8 py-6">
        {/* Header */}
        <div className="mb-8">
          <p className="text-slate-400 text-sm uppercase tracking-[0.2em]">
            Student Management
          </p>

          <h1 className="text-4xl font-bold text-white mt-3">
            Student Portal 🎓
          </h1>

          <p className="text-slate-400 mt-3 max-w-2xl leading-relaxed">
            Add students, manage enrollments and navigate to detailed student
            profiles.
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-[400px_1fr] gap-6">
          {/* Form */}
          <section className="bg-[#111827] border border-slate-800 rounded-3xl p-6 h-fit">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <FaUserGraduate className="text-2xl" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">Add Student</h2>

                <p className="text-slate-400 text-sm mt-1">
                  Create new student profile
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handelSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Student Name
                </label>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    <FaUserGraduate />
                  </div>

                  <input
                    value={studentDetails.name}
                    onChange={(e) =>
                      setStudentDetails({
                        ...studentDetails,
                        name: e.target.value,
                      })
                    }
                    type="text"
                    placeholder="Enter student name"
                    className="w-full bg-[#020617] border border-slate-800 rounded-2xl pl-12 pr-4 py-4 text-white outline-none focus:border-indigo-500 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Phone Number
                </label>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    <FaPhone />
                  </div>

                  <input
                    value={studentDetails.phone}
                    onChange={(e) =>
                      setStudentDetails({
                        ...studentDetails,
                        phone: e.target.value,
                      })
                    }
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full bg-[#020617] border border-slate-800 rounded-2xl pl-12 pr-4 py-4 text-white outline-none focus:border-indigo-500 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Course */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Course
                </label>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    <FaBook />
                  </div>

                  <select
                    value={studentDetails.course_id}
                    onChange={(e) =>
                      setStudentDetails({
                        ...studentDetails,
                        batch_id: e.target.value,
                      })
                    }
                    className="w-full bg-[#020617] border border-slate-800 rounded-2xl pl-12 pr-4 py-4 text-white outline-none focus:border-indigo-500 transition-all duration-300 appearance-none"
                  >
                    <option value="">Select Course</option>

                    {batches?.map((batch) => (
                      <option value={batch.id} key={batch.id}>
                        {batch.batch_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Join Date */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Join Date
                </label>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    <FaCalendarAlt />
                  </div>

                  <input
                    value={studentDetails.join_date}
                    onChange={(e) =>
                      setStudentDetails({
                        ...studentDetails,
                        join_date: e.target.value,
                      })
                    }
                    type="date"
                    className="w-full bg-[#020617] border border-slate-800 rounded-2xl pl-12 pr-4 py-4 text-white outline-none focus:border-indigo-500 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 py-4 rounded-2xl text-white font-medium flex items-center justify-center gap-2"
              >
                <FaPlus />
                Create Student
              </button>
            </form>
          </section>

          {/* Student List */}
          <section className="bg-[#111827] border border-slate-800 rounded-3xl overflow-hidden">
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">All Students</h2>

                <p className="text-slate-400 text-sm mt-1">
                  Click any student to manage details
                </p>
              </div>

              <div className="bg-indigo-500/10 text-indigo-400 px-4 py-2 rounded-xl text-sm font-medium">
                {students?.length || 0} Students
              </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#020617]">
                  <tr>
                    <th className="text-left px-6 py-4 text-slate-400 font-medium">
                      Name
                    </th>

                    <th className="text-left px-6 py-4 text-slate-400 font-medium">
                      Phone
                    </th>

                    <th className="text-left px-6 py-4 text-slate-400 font-medium">
                      Batch
                    </th>

                    <th className="text-left px-6 py-4 text-slate-400 font-medium">
                      Join Date
                    </th>

                    <th className="text-center px-6 py-4 text-slate-400 font-medium">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {students?.length > 0 ? (
                    students.map((student) => (
                      <tr
                        onClick={() => navigate_Student_details(student)}
                        key={student.id}
                        className="border-t border-slate-800 hover:bg-[#0F172A] transition-all duration-300 text-[13px]"
                      >
                        <td className="px-6 py-5 text-white font-medium">
                          {student.name}
                        </td>

                        <td className="px-6 py-5 text-slate-300">
                          {student.phone}
                        </td>

                        <td className="px-6 py-5 text-slate-300">
                          {student.batch?.batch_name}
                        </td>

                        <td className="px-6 py-5 text-slate-300">
                          {student.join_date}
                        </td>

                        <td className="px-6 py-5 text-center">
                          <button className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all duration-300 inline-flex items-center justify-center">
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-12 text-slate-500"
                      >
                        No Students Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden p-4 space-y-4">
              {students?.length > 0 ? (
                students.map((student) => (
                  <button
                    key={student.id}
                    className="w-full bg-[#020617] border border-slate-800 rounded-2xl p-4 flex items-center justify-between text-left"
                  >
                    <div>
                      <h3 className="text-white font-semibold">
                        {student.name}
                      </h3>

                      <p className="text-sm text-slate-400 mt-1">
                        {student.phone}
                      </p>

                      <p className="text-xs text-slate-500 mt-2">
                        {student.course_details?.name}
                      </p>
                    </div>

                    {/* <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                      <FaArrowRight />
                    </div> */}
                  </button>
                ))
              ) : (
                <div className="text-center py-12 text-slate-500">
                  No Students Found
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      <Toaster />
    </div>
  );
}

export default Student_Portal;
