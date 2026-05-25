import React, { useEffect, useState } from "react";
import useSubjectStore from "../../Store/SubjectStore";

import {
  FaBookOpen,
  FaRupeeSign,
  FaPlus,
  FaTrash,
  FaEdit,
} from "react-icons/fa";

function Model_Subject() {
  const { subjects, get_all_subjects, create_new_subject } = useSubjectStore();

  const [subjectDetals, setSubjectDetails] = useState({
    name: "",
    default_fee: "",
  });

  const fetch_data = async () => {
    await get_all_subjects();
  };

  useEffect(() => {
    fetch_data();
  }, []);

  const handelSubmit = async (e) => {
    e.preventDefault();
    await create_new_subject(subjectDetals);
    setSubjectDetails({
      name: "",
      default_fee: "",
    });
  };

  // const handel_delete = async (id) => {
  //   await delete_subject(id);
  // };

  // const handel_edit = (subject) => {
  //   setSubjectDetails({
  //     name: subject.name,
  //     default_fee: subject.default_fee,
  //   });
  // };

  return (
    <div className="space-y-8">
      {/* Create Subject */}
      <section className="bg-[#111827] border border-slate-800 rounded-3xl p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
            <FaBookOpen className="text-2xl" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">
              Subject Management
            </h2>

            <p className="text-slate-400 text-sm mt-1">
              Create and manage academic subjects.
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handelSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {/* Subject Name */}
          <div className="md:col-span-2">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                <FaBookOpen />
              </div>

              <input
                type="text"
                placeholder="Enter subject name..."
                value={subjectDetals.name}
                onChange={(e) =>
                  setSubjectDetails({
                    ...subjectDetals,
                    name: e.target.value,
                  })
                }
                className="w-full bg-[#020617] border border-slate-800 rounded-2xl pl-12 pr-4 py-4 text-white outline-none focus:border-indigo-500 transition-all duration-300"
              />
            </div>
          </div>

          {/* Fee */}
          <div>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                <FaRupeeSign />
              </div>

              <input
                type="number"
                placeholder="Monthly Fee"
                value={subjectDetals.default_fee}
                onChange={(e) =>
                  setSubjectDetails({
                    ...subjectDetals,
                    default_fee: e.target.value,
                  })
                }
                className="w-full bg-[#020617] border border-slate-800 rounded-2xl pl-12 pr-4 py-4 text-white outline-none focus:border-indigo-500 transition-all duration-300"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="md:col-span-3 bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 py-4 rounded-2xl text-white font-medium flex items-center justify-center gap-2"
          >
            <FaPlus />
            Create Subject
          </button>
        </form>
      </section>

      {/* Subject List */}
      <section className="bg-[#111827] border border-slate-800 rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">All Subjects</h2>

            <p className="text-slate-400 text-sm mt-1">
              Manage available subjects and fees.
            </p>
          </div>

          <div className="bg-indigo-500/10 text-indigo-400 px-4 py-2 rounded-xl text-sm font-medium">
            {subjects?.length || 0} Subjects
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#020617]">
              <tr>
                <th className="text-left px-6 py-4 text-slate-400 font-medium">
                  Subject Name
                </th>

                <th className="text-left px-6 py-4 text-slate-400 font-medium">
                  Monthly Fee
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
              {subjects?.length > 0 ? (
                subjects.map((subject) => (
                  <tr
                    key={subject.id}
                    className="border-t border-slate-800 hover:bg-[#0F172A] transition-all duration-300"
                  >
                    <td className="px-6 py-5 text-white font-medium">
                      {subject.name}
                    </td>

                    <td className="px-6 py-5 text-green-400 font-semibold">
                      ₹{subject.default_fee}
                    </td>

                    {/* Edit */}
                    <td className="px-6 py-5 text-center">
                      <button
                        onClick={() => handel_edit(subject)}
                        className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300 inline-flex items-center justify-center"
                      >
                        <FaEdit />
                      </button>
                    </td>

                    {/* Delete */}
                    <td className="px-6 py-5 text-center">
                      <button
                        onClick={() => handel_delete(subject.id)}
                        className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 inline-flex items-center justify-center"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-12 text-slate-500">
                    No Subjects Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden p-4 space-y-4">
          {subjects?.length > 0 ? (
            subjects.map((subject) => (
              <div
                key={subject.id}
                className="bg-[#020617] border border-slate-800 rounded-2xl p-4 flex items-center justify-between"
              >
                {/* Left */}
                <div>
                  <h3 className="text-white font-semibold">{subject.name}</h3>

                  <p className="text-green-400 text-sm mt-1">
                    ₹{subject.default_fee}
                  </p>
                </div>

                {/* Right */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handel_edit(subject)}
                    className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => handel_delete(subject.id)}
                    className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-slate-500">
              No Subjects Found
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Model_Subject;