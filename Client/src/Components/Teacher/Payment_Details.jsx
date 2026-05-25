import React, { useEffect, useState } from "react";
import Navber from "./Navber";
import usePaymentStore from "../../Store/PaymentStore";
import useStudentStore from "../../Store/StudentStore";
import {
  FaMoneyBillWave,
  FaExclamationCircle,
  FaCheckCircle,
  FaWallet,
} from "react-icons/fa";
import { Toaster } from "react-hot-toast";

function Payment_Details() {
  const { students } = useStudentStore();
  const { get_all_payments, create_payment, payments } = usePaymentStore();

  const [paymentDetails, setPaymentDetails] = useState({
    student_id: "",
    payment_date: "",
    month_for: "",
  });

  const handelSubmit = async (e) => {
    e.preventDefault();

    await create_payment(paymentDetails);

    setPaymentDetails({
      student_id: "",
      payment_date: "",
      month_for: "",
    });
  };

  useEffect(() => {
    get_all_payments();
  }, []);

  const details = [
    {
      id: 1,
      name: "Total Paid",
      value: payments?.Total_Paid || 0,
      icon: <FaWallet />,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },

    {
      id: 2,
      name: "Total Due",
      value: payments?.Total_Due || 0,
      icon: <FaExclamationCircle />,
      color: "text-red-400",
      bg: "bg-red-500/10",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#020617] text-white">
      <Navber />

      <div className="flex-1 p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-slate-400 text-sm uppercase tracking-[0.2em]">
            Finance
          </p>

          <h1 className="text-4xl font-bold mt-3">Payment Management 💳</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {details.map((item) => (
            <div
              key={item.id}
              className="bg-[#0F172A] border border-slate-800 rounded-2xl p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">{item.name}</p>

                  <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
                </div>

                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.bg}`}
                >
                  <div className={item.color}>{item.icon}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-[350px_1fr] gap-6">
          {/* Left Form */}
          <section className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 h-fit">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Add Payment</h2>

              <p className="text-slate-400 text-sm mt-2">
                Create monthly payment record
              </p>
            </div>

            <form onSubmit={handelSubmit} className="space-y-4">
              {/* Student */}
              <select
                value={paymentDetails.student_id}
                onChange={(e) =>
                  setPaymentDetails({
                    ...paymentDetails,
                    student_id: e.target.value,
                  })
                }
                className="w-full bg-[#020617] border border-slate-800 rounded-2xl px-5 py-4 outline-none focus:border-indigo-500"
              >
                <option value="">Select Student</option>

                {students?.map((student) => (
                  <option value={student.id} key={student.id}>
                    {student.name}
                  </option>
                ))}
              </select>

              {/* Month */}
              <label htmlFor="">Month for</label>
              <input
                type="month"
                value={paymentDetails.month_for}
                onChange={(e) =>
                  setPaymentDetails({
                    ...paymentDetails,
                    month_for: e.target.value,
                  })
                }
                className="w-full bg-[#020617] border border-slate-800 rounded-2xl px-5 py-4 outline-none focus:border-indigo-500"
              />

              {/* Payment Date */}
              <label htmlFor="" className="">Date of payment</label>
              <input
                type="date"
                value={paymentDetails.payment_date}
                onChange={(e) =>
                  setPaymentDetails({
                    ...paymentDetails,
                    payment_date: e.target.value,
                  })
                }
                className="w-full bg-[#020617] border border-slate-800 rounded-2xl px-5 py-4 outline-none focus:border-indigo-500"
              />

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 py-4 rounded-2xl font-medium"
              >
                Create Payment
              </button>
            </form>
          </section>

          {/* Payment List */}
          <section className="bg-[#0F172A] border border-slate-800 rounded-3xl overflow-hidden">
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Payment History</h2>

                <p className="text-slate-400 text-sm mt-1">
                  All student payments overview
                </p>
              </div>

              <div className="bg-indigo-500/10 text-indigo-400 px-4 py-2 rounded-xl text-sm font-medium">
                {payments?.length || 0}
              </div>
            </div>

            {/* Rows */}
            <div className="p-4 space-y-3">
              {payments?.payments?.length > 0 ? (
                payments?.payments?.map((payment, index) => (
                  <div
                    key={index}
                    className="bg-[#020617] border border-slate-800 rounded-2xl p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 hover:border-indigo-500 transition-all duration-300"
                  >
                    {/* Left */}
                    <div>
                      <h3 className="text-lg font-semibold">
                        {payment.student_name}
                      </h3>

                      <p className="text-sm text-slate-400 mt-1">
                        {payment.student_phone}
                      </p>
                    </div>

                    {/* Middle */}
                    <div className="flex flex-wrap gap-6 text-sm">
                      <div>
                        <p className="text-slate-500">Month</p>

                        <p className="mt-1 font-medium">{payment.month_for}</p>
                      </div>

                      <div>
                        <p className="text-slate-500">Fee</p>

                        <p className="mt-1 text-green-400 font-medium">
                          ₹{payment.total_fee}
                        </p>
                      </div>

                      <div>
                        <p className="text-slate-500">Paid</p>

                        <p className="mt-1 text-blue-400 font-medium">
                          ₹{payment.total_paid}
                        </p>
                      </div>

                      <div>
                        <p className="text-slate-500">Due</p>

                        <p className="mt-1 text-red-400 font-medium">
                          ₹{payment.due}
                        </p>
                      </div>
                    </div>

                    {/* Status */}
                    <div>
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
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16 text-slate-500">
                  No Payment Records Found
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      <Toaster />
    </div>
  );
}

export default Payment_Details;
