import React, { useEffect } from "react";
import useStudentStore from "../../Store/StudentStore";
import usePaymentStore from "../../Store/PaymentStore";

import {
  FaUserGraduate,
  FaPhoneAlt,
  FaEnvelope,
  FaBook,
  FaCalendarAlt,
  FaClock,
  FaTrash,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

function Student_details() {
  const { student } = useStudentStore();
  const { payments, get_payments_by_Students } = usePaymentStore();

  useEffect(() => {
    if (student?.id) {
      get_payments_by_Students(student.id);
    }
  }, []);

  const hendelDelete = (id) => {
    // do nothing here...!
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-slate-400 text-sm uppercase tracking-[0.2em]">
          Student Profile
        </p>

        <h1 className="text-4xl font-bold mt-3">{student?.name}</h1>
      </div>

      {/* Student Card */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Left */}
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-3xl">
              <FaUserGraduate />
            </div>

            <div>
              <h2 className="text-2xl font-bold">{student?.name}</h2>

              <p className="text-slate-400 mt-2 flex items-center gap-2">
                <FaPhoneAlt />
                {student?.phone}
              </p>

              <p className="text-slate-400 mt-2 flex items-center gap-2">
                <FaEnvelope />
                {student?.email || "No Email"}
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#020617] border border-slate-800 rounded-2xl p-4">
              <p className="text-xs text-slate-500">Total Paid</p>

              <h3 className="mt-2 font-semibold">{payments?.Total_Paid}</h3>
            </div>
            <div className="bg-[#020617] border border-slate-800 rounded-2xl p-4">
              <p className="text-xs text-slate-500">Total Due</p>

              <h3 className="mt-2 font-semibold">{payments?.Total_Due}</h3>
            </div>
            <div className="bg-[#020617] border border-slate-800 rounded-2xl p-4">
              <p className="text-xs text-slate-500">Course</p>

              <h3 className="mt-2 font-semibold">{student?.course?.name}</h3>
            </div>

            <div className="bg-[#020617] border border-slate-800 rounded-2xl p-4">
              <p className="text-xs text-slate-500">Batch</p>

              <h3 className="mt-2 font-semibold">
                {student?.batch?.batch_name}
              </h3>
            </div>

            <div className="bg-[#020617] border border-slate-800 rounded-2xl p-4">
              <p className="text-xs text-slate-500">Schedule</p>

              <h3 className="mt-2 font-semibold text-sm">
                {student?.batch?.shedule}
              </h3>
            </div>

            <div className="bg-[#020617] border border-slate-800 rounded-2xl p-4">
              <p className="text-xs text-slate-500">Joined</p>

              <h3 className="mt-2 font-semibold">{student?.join_date}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Payment History</h2>

            <p className="text-slate-400 text-sm mt-1">
              Monthly payment records
            </p>
          </div>

          <div className="bg-indigo-500/10 text-indigo-400 px-4 py-2 rounded-xl text-sm font-medium">
            {payments?.length || 0}
          </div>
        </div>

        {/* Payments */}
        <div className="p-4 space-y-3">
          {payments?.payments?.length > 0 ? (
            payments?.payments?.map((payment, index) => (
              <div
                key={index}
                className="bg-[#020617] border border-slate-800 rounded-2xl p-4 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 hover:border-indigo-500 transition-all duration-300"
              >
                {/* Left */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                    <FaBook />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">
                      {payment.month_for}
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      Monthly Fee Record
                    </p>
                  </div>
                </div>

                {/* Middle */}
                <div className="flex flex-wrap gap-6">
                  <div>
                    <p className="text-xs text-slate-500">Total Fee</p>

                    <p className="mt-1 text-green-400 font-semibold">
                      ₹{payment.total_fee}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Paid</p>

                    <p className="mt-1 text-blue-400 font-semibold">
                      ₹{payment.total_paid}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Due</p>

                    <p className="mt-1 text-red-400 font-semibold">
                      ₹{payment.due}
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-3">
                  <div
                    className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 ${
                      payment.status === "Paid"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {payment.status === "Paid" ? (
                      <FaCheckCircle />
                    ) : (
                      <FaExclamationCircle />
                    )}

                    {payment.status}
                  </div>

                  <button
                    onClick={() => hendelDelete(payment.id)}
                    className="w-11 h-11 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center justify-center"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 text-slate-500">
              No Payment Records Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Student_details;
