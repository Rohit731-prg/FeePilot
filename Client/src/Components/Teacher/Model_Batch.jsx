import React, { useEffect, useState } from "react";
import useBatchStore from "../../Store/BatchStore";
import useCoureStore from "../../Store/Course";

import {
  FaLayerGroup,
  FaPlus,
  FaClock,
  FaTrash,
  FaCalendarAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Model_Batch() {
  const navigate = useNavigate();
  const { courses } = useCoureStore();
  const {
    batches,
    get_all_batches,
    create_new_batch,
  } = useBatchStore();

  const [batchDetails, setBatchDetails] = useState({
    course_id: "",
    year: "",
    batch_name: "",
    shedule: ""
  });

  const fetch_data = async () => {
    await get_all_batches();
  };

  useEffect(() => {
    fetch_data();
  }, []);

  const handelSubmit = async (e) => {
    e.preventDefault();

    await create_new_batch(batchDetails);
  };

  return (
    <div className="space-y-8">

      {/* Create Batch */}
      <section className="bg-[#111827] border border-slate-800 rounded-3xl p-6">

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">

          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
            <FaLayerGroup className="text-2xl" />
          </div>

          <div>

            <h2 className="text-2xl font-bold text-white">
              Batch Management
            </h2>

            <p className="text-slate-400 text-sm mt-1">
              Create and manage academic schedules.
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handelSubmit}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
        >

          {/* Course */}
          <select
            value={batchDetails.course_id}
            onChange={(e) =>
              setBatchDetails({
                ...batchDetails,
                course_id: parseInt(e.target.value),
              })
            }
            className="bg-[#020617] border border-slate-800 rounded-2xl px-5 py-4 text-white outline-none focus:border-indigo-500 transition-all duration-300"
          >

            <option value="">
              Select Course
            </option>

            {courses?.map((course) => (
              <option
                value={course.id}
                key={course.id}
              >
                {course.name}
              </option>
            ))}
          </select>

          {/* Year */}
          <input
            type="text"
            placeholder="Year (1st / 2nd)"
            value={batchDetails.year}
            onChange={(e) =>
              setBatchDetails({
                ...batchDetails,
                year: e.target.value,
              })
            }
            className="bg-[#020617] border border-slate-800 rounded-2xl px-5 py-4 text-white outline-none focus:border-indigo-500 transition-all duration-300"
          />

          {/* Batch Name */}
          <input
            type="text"
            placeholder="Batch Name"
            value={batchDetails.batch_name}
            onChange={(e) =>
              setBatchDetails({
                ...batchDetails,
                batch_name: e.target.value,
              })
            }
            className="bg-[#020617] border border-slate-800 rounded-2xl px-5 py-4 text-white outline-none focus:border-indigo-500 transition-all duration-300"
          />

          <input
            type="text"
            placeholder="shedule time (SAT-9:30 am and SUN-11:30 am)"
            value={batchDetails.shedule}
            onChange={(e) =>
              setBatchDetails({
                ...batchDetails,
                shedule: e.target.value,
              })
            }
            className="bg-[#020617] border border-slate-800 rounded-2xl px-5 py-4 text-white outline-none focus:border-indigo-500 transition-all duration-300"
          />

          {/* Submit */}
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 rounded-2xl text-white font-medium flex items-center justify-center gap-2 px-5 py-4"
          >

            <FaPlus />

            Create Batch
          </button>
        </form>
      </section>

      {/* Batch List */}
      <section className="bg-[#111827] border border-slate-800 rounded-3xl overflow-hidden">

        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800">

          <h2 className="text-xl font-semibold text-white">
            All Batches
          </h2>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">

          <table className="w-full">

            <thead className="bg-[#020617]">
              <tr>
                <th className="text-left px-6 py-4 text-slate-400 font-medium">
                  Course
                </th>
                <th className="text-left px-6 py-4 text-slate-400 font-medium">
                  Batch
                </th>
                <th className="text-left px-6 py-4 text-slate-400 font-medium">
                  Shedule
                </th>
                <th className="text-left px-6 py-4 text-slate-400 font-medium">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>

              {batches?.length > 0 ? (

                batches.map((batch) => (

                  <tr
                    onClick={() => navigate(`/batch-details/${batch.id}`)}
                    key={batch.id}
                    className="border-t border-slate-800 hover:bg-[#0F172A] transition-all duration-300"
                  >

                    <td className="px-6 py-5 text-white">
                      {batch.course?.name}
                    </td>

                    <td className="px-6 py-5 text-slate-300">
                      {batch.batch_name}
                    </td>

                    <td className="px-6 py-5 text-slate-300">
                      {batch.shedule}
                    </td>
                    <td className="px-6 py-5 text-slate-300">
                      <button className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 inline-flex items-center justify-center"
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
                    No Batches Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden p-4 space-y-4">

          {batches?.length > 0 ? (

            batches.map((batch) => (

              <div
                key={batch.id}
                className="bg-[#020617] border border-slate-800 rounded-2xl p-4 flex items-center justify-between"
              >

                {/* Left */}
                <div>

                  <h3 className="text-white font-semibold">
                    {batch.batch_name}
                  </h3>

                  <p className="text-sm text-slate-400 mt-1">
                    {batch.course_details?.name}
                  </p>
                </div>

                {/* Right */}
                <div className="text-right">

                  <div className="flex items-center justify-end gap-2 text-sm text-slate-300">

                    <FaCalendarAlt className="text-xs text-indigo-400" />

                    <span>
                      {batch.day}
                    </span>
                  </div>

                  <div className="flex items-center justify-end gap-2 text-sm text-slate-400 mt-2">

                    <FaClock className="text-xs text-indigo-400" />

                    <span>
                      {batch.time}
                    </span>
                  </div>
                </div>
              </div>
            ))

          ) : (

            <div className="text-center py-10 text-slate-500">
              No Batches Found
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Model_Batch;