import React, { useEffect, useState } from "react";
import useSubjectStore from "../../Store/SubjectStore";
import useBatchStore from "../../Store/BatchStore";
import { useParams } from "react-router-dom";
import useStudentStore from "../../Store/StudentStore";

import {
  FaUsers,
  FaBookOpen,
  FaMoneyBillWave,
  FaClock,
  FaPlus,
  FaTrash,
  FaUserGraduate,
} from "react-icons/fa";
import { Toaster } from "react-hot-toast";

function Batch_Details() {
  const { id } = useParams();
  const { add_subject_to_batch } = useBatchStore();
  const { get_all_students_by_batch, students } = useStudentStore();
  const { subjects, get_all_subjects_by_batch } = useSubjectStore();

  const [basicDetails] = useState([
    {
      id: 1,
      name: "Students",
      value: students?.length || 0,
      icon: <FaUsers />,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },

    {
      id: 2,
      name: "Subjects",
      value: subjects?.length || 0,
      icon: <FaBookOpen />,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10",
    },

    {
      id: 3,
      name: "Income",
      value: "₹0",
      icon: <FaMoneyBillWave />,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },

    {
      id: 4,
      name: "Pending",
      value: "₹0",
      icon: <FaClock />,
      color: "text-red-400",
      bg: "bg-red-500/10",
    },
  ]);

  const [subjectsList, setSubjectList] = useState([]);
  const [listed_subjects, setListed_subjects] = useState([]);

  const add_subject_List = (id) => {
    const subject = subjects.find((sub) => sub.id == id);

    if (!subject) return;

    const already_exist = subjectsList.find((sub) => sub.id == subject.id);

    if (already_exist) return;

    setSubjectList((prev) => [...prev, subject]);
  };

  const remove_subject = (id) => {
    const filtered = subjectsList.filter((sub) => sub.id !== id);

    setSubjectList(filtered);
  };

  const handelSumnit = async (e) => {
    e.preventDefault();

    await add_subject_to_batch(subjectsList, id);
  };

  useEffect(() => {
    const fetch_data = async () => {
      await get_all_students_by_batch(id);
      const res = await get_all_subjects_by_batch(id);
      setListed_subjects(res);
    };

    fetch_data();
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white px-4 md:px-8 py-6">
      {/* Header */}
      <div className="mb-8">
        <p className="text-slate-400 text-sm uppercase tracking-[0.2em]">
          Batch Overview
        </p>

        <h1 className="text-4xl font-bold mt-3">Batch Details 📚</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {basicDetails.map((item) => (
          <div
            key={item.id}
            className="bg-[#0F172A] border border-slate-800 rounded-2xl p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">{item.name}</p>

                <h2 className="text-2xl font-bold mt-2">{item.value}</h2>
              </div>

              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.bg}`}
              >
                <div className={item.color}>{item.icon}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Current Subjects */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-2xl font-bold">Assigned Subjects</h2>

            <p className="text-slate-400 text-sm mt-1">
              Subjects currently active in this batch
            </p>
          </div>

          <div className="bg-indigo-500/10 text-indigo-400 px-4 py-2 rounded-xl text-sm font-medium">
            {listed_subjects?.length || 0}
          </div>
        </div>

        {listed_subjects?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {listed_subjects.map((subject) => (
              <div
                key={subject.id}
                className="bg-[#0F172A] border border-slate-800 rounded-2xl p-5 hover:border-indigo-500 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {subject.name}
                    </h3>

                    <p className="text-green-400 text-sm mt-2 font-medium">
                      ₹{subject.default_fee}/month
                    </p>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                    <FaBookOpen />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-10 text-center text-slate-500">
            No subjects assigned yet
          </div>
        )}
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-6">
        {/* Left */}
        <section className="space-y-6">
          {/* Add Subject */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Assign Subjects</h2>

              <p className="text-slate-400 text-sm mt-2">
                Add subjects to this batch.
              </p>
            </div>

            <form onSubmit={handelSumnit} className="space-y-4">
              {/* Select */}
              <select
                onChange={(e) => add_subject_List(e.target.value)}
                className="w-full bg-[#020617] border border-slate-800 rounded-2xl px-5 py-4 text-white outline-none focus:border-indigo-500 transition-all duration-300"
              >
                <option value="">Select Subject</option>

                {subjects?.map((sub) => (
                  <option value={sub.id} key={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </select>

              {/* Selected Subjects */}
              <div className="space-y-3">
                {subjectsList?.length > 0 ? (
                  subjectsList.map((subject) => (
                    <div
                      key={subject.id}
                      className="bg-[#020617] border border-slate-800 rounded-2xl p-4 flex items-center justify-between"
                    >
                      <div>
                        <h3 className="font-semibold">{subject.name}</h3>

                        <p className="text-sm text-green-400 mt-1">
                          ₹{subject.default_fee}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => remove_subject(subject.id)}
                        className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center justify-center"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-slate-500 text-sm">
                    No subjects selected
                  </div>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 py-4 rounded-2xl text-white font-medium flex items-center justify-center gap-2"
              >
                <FaPlus />
                Assign Subjects
              </button>
            </form>
          </div>
        </section>

        {/* Right */}
        <section className="bg-[#0F172A] border border-slate-800 rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Students</h2>

              <p className="text-slate-400 text-sm mt-1">
                Students enrolled in this batch
              </p>
            </div>

            <div className="bg-indigo-500/10 text-indigo-400 px-4 py-2 rounded-xl text-sm font-medium">
              {students?.length || 0}
            </div>
          </div>

          {/* Student List */}
          <div className="p-4 space-y-4">
            {students?.length > 0 ? (
              students.map((student) => (
                <button
                  key={student.id}
                  className="w-full bg-[#020617] border border-slate-800 rounded-2xl p-4 flex items-center justify-between text-left hover:border-indigo-500 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                      <FaUserGraduate />
                    </div>

                    <div>
                      <h3 className="text-white font-semibold">
                        {student.name}
                      </h3>

                      <p className="text-sm text-slate-400 mt-1">
                        {student.phone}
                      </p>
                    </div>
                  </div>

                  <div className="text-sm text-slate-500">
                    {student.join_date}
                  </div>
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
      <Toaster />
    </div>
  );
}

export default Batch_Details;
