import React, { useEffect, useState } from "react";
import useCoureStore from "../../Store/Course";
import {
  FaBook,
  FaEdit,
  FaTrash,
  FaPlus,
} from "react-icons/fa";

function Model_Cousrse() {
  const { courses, get_all_cousrse, create_new_course } = useCoureStore();
  const [couse_name, setCourse_name] = useState("");

  const handelSubmit = (e) => {
    e.preventDefault();
    console.log(couse_name);
    create_new_course(couse_name)
  };

  const handel_delete = (id) => {
    console.log(id);
  };

  const handel_edit = (data) => {
    setCourse_name(data.name);
  };

  const fetch_all_course = () => {
    get_all_cousrse();
  }
  useEffect(() => {
    fetch_all_course();
  }, []);

  return (
    <div className="space-y-8">
      {/* Top Section */}
      <section className="bg-[#111827] border border-slate-800 rounded-3xl p-6">

        <div className="flex items-center gap-4 mb-6">

          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
            <FaBook className="text-2xl" />
          </div>

          <div>

            <h2 className="text-2xl font-bold text-white">
              Course Management
            </h2>

            <p className="text-slate-400 mt-1 text-sm">
              Add and manage academic courses.
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handelSubmit}
          className="flex flex-col md:flex-row gap-4"
        >

          <input
            type="text"
            placeholder="Enter course name..."
            value={couse_name}
            onChange={(e) =>
              setCourse_name(e.target.value)
            }
            className="flex-1 bg-[#020617] border border-slate-800 rounded-2xl px-5 py-4 text-white outline-none focus:border-indigo-500 transition-all duration-300"
          />

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 px-6 py-4 rounded-2xl text-white font-medium flex items-center justify-center gap-2"
          >

            <FaPlus />

            Save
          </button>
        </form>
      </section>

      {/* Table Section */}
      <section className="bg-[#111827] border border-slate-800 rounded-3xl overflow-hidden">

        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800">

          <h2 className="text-xl font-semibold text-white">
            All Courses
          </h2>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">

          <table className="w-full">

            <thead className="bg-[#020617]">

              <tr>

                <th className="text-left px-6 py-4 text-slate-400 font-medium">
                  SL.no
                </th>

                <th className="text-left px-6 py-4 text-slate-400 font-medium">
                  Course Name
                </th>

                <th className="text-center px-6 py-4 text-slate-400 font-medium">
                  Edit
                </th>

                <th className="text-center px-6 py-4 text-slate-400 font-medium">
                  Delete
                </th>
              </tr>
            </thead>

            <tbody>

              {courses?.length > 0 ? (

                courses.map((course, index) => (

                  <tr
                    key={course.id}
                    className="border-t border-slate-800 hover:bg-[#0F172A] transition-all duration-300"
                  >

                    <td className="px-6 py-5 text-slate-300">
                      {index + 1}
                    </td>

                    <td className="px-6 py-5 text-white font-medium">
                      {course.name}
                    </td>

                    <td className="px-6 py-5 text-center">

                      <button
                        onClick={() => handel_edit(course)}
                        className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300 inline-flex items-center justify-center"
                      >
                        <FaEdit />
                      </button>
                    </td>

                    <td className="px-6 py-5 text-center">

                      <button
                        onClick={() =>
                          handel_delete(course.id)
                        }
                        className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 inline-flex items-center justify-center"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))

              ) : (

                <tr>

                  <td
                    colSpan={4}
                    className="text-center py-10 text-slate-500"
                  >
                    No Courses Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden p-4 space-y-4">

          {courses?.length > 0 ? (

            courses.map((course, index) => (

              <div
                key={course.id}
                className="bg-[#020617] border border-slate-800 rounded-2xl p-4 flex items-center justify-between"
              >

                <div>

                  <p className="text-xs text-slate-500">
                    #{index + 1}
                  </p>

                  <h3 className="text-white font-medium mt-1">
                    {course.name}
                  </h3>
                </div>

                <div className="flex items-center gap-3">

                  <button
                    onClick={() => handel_edit(course)}
                    className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() =>
                      handel_delete(course.id)
                    }
                    className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))

          ) : (

            <div className="text-center py-10 text-slate-500">
              No Courses Found
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Model_Cousrse;