import React, { useEffect } from "react";
import useBatchStore from "../../Store/BatchStore";
import useStudentStore from "../../Store/StudentStore";
import { FaClock, FaCalendarAlt, FaLayerGroup } from "react-icons/fa";

function Student_batch() {
  const { batches, get_all_batches_by_student } = useBatchStore();

  const { student } = useStudentStore();

  useEffect(() => {
    if (student?.id) {
      get_all_batches_by_student(student.id);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <p className="text-slate-400 text-sm uppercase tracking-[0.2em]">
          Batch Schedule
        </p>

        <h1 className="text-3xl font-bold mt-2">My Batches 📚</h1>
      </div>

      {/* Batch List */}
      {batches?.length > 0 ? (
        <div className="space-y-4">
          {batches.map((batch) => (
            <div
              key={batch.id}
              className="bg-[#0F172A] border border-slate-800 rounded-2xl p-4 flex items-center justify-between hover:border-blue-500 transition-all duration-300"
            >
              {/* Left */}
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <FaLayerGroup className="text-lg" />
                </div>

                {/* Info */}
                <div>
                  <h2 className="text-lg font-semibold">{batch.batch_name}</h2>

                  <div className="flex items-center gap-2 mt-1 text-sm text-slate-400">
                    <FaCalendarAlt className="text-xs" />

                    <span>{batch.day || "Not Assigned"}</span>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="text-right">
                <div className="flex items-center justify-end gap-2 text-sm text-slate-300">
                  <FaClock className="text-xs text-blue-400" />

                  <span>{batch.time || "N/A"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
            <FaLayerGroup className="text-2xl text-slate-500" />
          </div>

          <h2 className="text-xl font-semibold mb-2">No Batches Found</h2>

          <p className="text-slate-400 text-sm">
            Batch schedules assigned by your teacher will appear here.
          </p>
        </div>
      )}
    </div>
  );
}

export default Student_batch;
