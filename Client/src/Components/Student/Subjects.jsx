import React, { useEffect, useState } from "react";
import useSubjectStore from "../../Store/SubjectStore";
import useStudentStore from "../../Store/StudentStore";
import { Toaster } from "react-hot-toast";
import {
  FaBookOpen,
  FaGraduationCap,
  FaPlus,
} from "react-icons/fa";
import AddSubject from "./AddSubject";

function Subjects_Student() {
  const [is_model_open, setIs_model_open] = useState(false);

  const { student, teacher } = useStudentStore();
  const { subjects, get_subjects_by_Student } = useSubjectStore();

  const fetch_subject_data = async () => {
    if (!student?.id) return;

    await get_subjects_by_Student(student.id);
  };

  useEffect(() => {
    fetch_subject_data();
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white px-4 md:px-8 py-6">

      {/* Header */}
      <header className="mb-10">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          {/* Left Side */}
          <div>

            <p className="text-sm text-slate-400 tracking-[0.2em] uppercase">
              Student Subject Portal
            </p>

            <h1 className="text-4xl md:text-5xl font-bold mt-3 leading-tight">
              My Subjects 📚
            </h1>

            <p className="text-slate-400 mt-4 max-w-2xl leading-relaxed">
              View your enrolled subjects, fee information and academic
              enrollment details managed by your teacher.
            </p>
          </div>

          {/* Right Card */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 shadow-2xl w-full lg:w-auto">

            <div className="flex flex-col sm:flex-row sm:items-center gap-5">

              {/* Student Info */}
              <div className="flex items-center gap-4">

                <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <FaGraduationCap className="text-2xl text-white" />
                </div>

                <div>
                  <p className="text-slate-400 text-sm">
                    Student
                  </p>

                  <h2 className="text-xl font-semibold">
                    {student?.name}
                  </h2>

                  <p className="text-sm text-slate-500">
                    {teacher?.name || "Teacher"}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px h-14 bg-slate-800"></div>

              {/* Button */}
              <button
                onClick={() => setIs_model_open(true)}
                className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 px-5 py-3 rounded-2xl font-medium shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
              >
                <FaPlus />
                Add Subject
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">

        {/* Total Subjects */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">

          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex items-center justify-between">

            <div>
              <p className="text-slate-400 text-sm">
                Total Subjects
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {subjects?.length || 0}
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center">
              <FaBookOpen className="text-3xl text-blue-400" />
            </div>
          </div>
        </div>

        {/* Total Fees */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">

          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex items-center justify-between">

            <div>
              <p className="text-slate-400 text-sm">
                Monthly Fees
              </p>

              <h2 className="text-4xl font-bold mt-3 text-green-400">
                ₹
                {subjects?.reduce(
                  (acc, item) => acc + item.fee_at_join_time,
                  0
                ) || 0}
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center">
              <FaGraduationCap className="text-3xl text-green-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Subject Section */}
      <main>

        <div className="mb-8">

          <h2 className="text-3xl font-bold">
            Enrolled Subjects
          </h2>

          <p className="text-slate-400 mt-2">
            Active subjects currently assigned to your academic profile.
          </p>
        </div>

        {subjects?.length > 0 ? (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {subjects.map((subject) => (

              <div
                key={subject.id}
                className="group bg-[#0F172A] border border-slate-800 rounded-3xl p-6 hover:border-blue-500 hover:-translate-y-1 transition-all duration-300 shadow-xl relative overflow-hidden"
              >

                {/* Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full"></div>

                <div className="relative z-10">

                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                    <FaBookOpen className="text-2xl" />
                  </div>

                  {/* Subject Name */}
                  <h3 className="text-2xl font-semibold mb-6 leading-snug">
                    {subject.subject_details.name}
                  </h3>

                  {/* Fee Box */}
                  <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 mb-4">

                    <div className="flex items-center justify-between mb-3">

                      <span className="text-slate-400">
                        Monthly Fee
                      </span>

                      <span className="font-bold text-green-400 text-xl">
                        ₹{subject.fee_at_join_time}
                      </span>
                    </div>

                    <div className="text-xs text-slate-500">
                      Started on{" "}
                      {subject.start_date.split(" ")[0]}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between bg-[#111827] border border-slate-800 rounded-2xl p-4">

                    <span className="text-slate-400">
                      Status
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        subject.end_date
                          ? "bg-red-500/10 text-red-400"
                          : "bg-green-500/10 text-green-400"
                      }`}
                    >
                      {subject.end_date ? "Closed" : "Active"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        ) : (

          <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-12 text-center shadow-2xl">

            <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-6">
              <FaBookOpen className="text-4xl text-slate-500" />
            </div>

            <h2 className="text-3xl font-semibold mb-3">
              No Subjects Found
            </h2>

            <p className="text-slate-400 max-w-lg mx-auto leading-relaxed">
              Subjects assigned by your teacher will appear here once
              enrollment is completed.
            </p>
          </div>
        )}
      </main>

      {/* Modal */}
      {is_model_open && (
        <AddSubject
          is_model_open={is_model_open}
          setIs_model_open={setIs_model_open}
        />
      )}

      <Toaster />
    </div>
  );
}

export default Subjects_Student;