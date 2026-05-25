import React, { useState } from "react";
import Navber from "./Navber";
import Model_Cousrse from "./Model_Cousrse";
import Model_Batch from "./Model_Batch";
import Model_Subject from "./Model_Subject";
import { Toaster } from "react-hot-toast";

function Course() {

  const [details, setDetails] = useState(0);

  const btns = [
    { id: 0, name: "Course" },
    { id: 1, name: "Batch" },
    { id: 2, name: "Subject" },
  ];

  return (
    <div className="min-h-screen bg-[#020617] flex">

      {/* Sidebar */}
      <Navber />

      {/* Main Content */}
      <div className="flex-1 px-4 md:px-8 py-6 lg:ml-0">

        {/* Header */}
        <div className="mb-8">

          <p className="text-slate-400 text-sm uppercase tracking-[0.2em]">
            Academic Management
          </p>

          <h1 className="text-4xl font-bold text-white mt-3">
            Course Control Panel 📚
          </h1>

          <p className="text-slate-400 mt-3 max-w-2xl leading-relaxed">
            Manage courses, batches and subjects from one centralized academic dashboard.
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-3 inline-flex gap-3 mb-8 overflow-x-auto">

          {btns.map((btn) => {

            const is_active = details === btn.id;

            return (
              <button
                key={btn.id}
                onClick={() => setDetails(btn.id)}
                className={`px-6 py-3 rounded-2xl font-medium whitespace-nowrap transition-all duration-300
                
                ${
                  is_active
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                    : "text-slate-400 hover:bg-[#111827] hover:text-white"
                }
                `}
              >
                {btn.name}
              </button>
            );
          })}
        </div>

        {/* Dynamic Content */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-4 md:p-6 shadow-xl">

          {details === 0 ? (
            <Model_Cousrse />
          ) : details === 1 ? (
            <Model_Batch />
          ) : (
            <Model_Subject />
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Course;