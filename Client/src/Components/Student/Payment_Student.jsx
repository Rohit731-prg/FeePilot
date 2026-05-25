import React, { useEffect, useState } from "react";
import usePaymentStore from "../../Store/PaymentStore";
import useStudentStore from "../../Store/StudentStore";
import {
  FaMoneyBillWave,
  FaCheckCircle,
  FaExclamationCircle,
  FaFilter,
  FaWallet,
} from "react-icons/fa";

function Payment_Student() {
  const { payments, get_payments_by_Students } = usePaymentStore();
  const { student } = useStudentStore();

  const [filter_payment, setFilterPayment] = useState([]);

  const fetch_payments = async () => {
    await get_payments_by_Students(student.id);
  };

  useEffect(() => {
    fetch_payments();
  }, []);

  useEffect(() => {
    if (payments) {
      setFilterPayment(payments?.payments);
    }
  }, [payments]);

  const update_payments = (type) => {
    if (type === "all") {
      setFilterPayment(payments?.payments);
    } else if (type === "due") {
      const duePayments = payments.payments.filter(
        (payment) => payment.status === "Due",
      );

      setFilterPayment(duePayments);
    } else {
      setFilterPayment(payments?.payments);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white px-4 md:px-8 py-6">
      {/* Header */}
      <header className="mb-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Left */}
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Student Finance Portal
            </p>

            <h1 className="text-4xl md:text-5xl font-bold mt-3">
              Payment History 💳
            </h1>

            <p className="text-slate-400 mt-4 max-w-2xl leading-relaxed">
              Track your monthly tuition payments, pending dues and academic fee
              summaries in one place.
            </p>
          </div>

          {/* Filter Card */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-5 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                <FaFilter className="text-2xl text-blue-400" />
              </div>

              <div>
                <p className="text-sm text-slate-400 mb-2">Filter Payments</p>

                <select
                  onChange={(e) => update_payments(e.target.value)}
                  className="bg-[#111827] border border-slate-800 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all duration-300"
                >
                  <option value="all">All Payments</option>

                  <option value="due">Due Payments</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-3 gap-3 mb-8">

  {/* Total */}
  <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center">

    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-3">
      <FaWallet className="text-blue-400 text-lg" />
    </div>

    <p className="text-slate-400 text-xs">
      Total
    </p>

    <h2 className="text-2xl font-bold mt-1">
      {payments?.payments?.length || 0}
    </h2>
  </div>

  {/* Paid */}
  <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center">

    <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center mb-3">
      <FaCheckCircle className="text-green-400 text-lg" />
    </div>

    <p className="text-slate-400 text-xs">
      Paid
    </p>

    <h2 className="text-2xl font-bold mt-1 text-green-400">
      {payments?.Total_Paid}
    </h2>
  </div>

  {/* Due */}
  <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center">

    <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center mb-3">
      <FaExclamationCircle className="text-red-400 text-lg" />
    </div>

    <p className="text-slate-400 text-xs">
      Due
    </p>

    <h2 className="text-2xl font-bold mt-1 text-red-400">
      {payments?.Total_Due}
    </h2>
  </div>
</section>

      {/* Payment Cards */}
      <main>
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Payment Records</h2>

          <p className="text-slate-400 mt-2">
            Monthly fee summaries and payment status.
          </p>
        </div>

        {filter_payment?.length > 0 ? (
          <div className="space-y-4">
            {filter_payment.map((payment, index) => (
              <div
                key={index}
                className="bg-[#0F172A] border border-slate-800 rounded-2xl p-4 flex items-center justify-between hover:border-blue-500 transition-all duration-300"
              >
                {/* Left */}
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                      payment.status === "Paid"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    <FaMoneyBillWave className="text-xl" />
                  </div>

                  {/* Info */}
                  <div>
                    <h3 className="text-lg font-semibold">
                      {payment.month_for}
                    </h3>

                    <p className="text-sm text-slate-400 mt-1">
                      Fee: ₹{payment.total_fee}
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      Paid ₹{payment.total_paid} • Due ₹{payment.due}
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="text-right">
                  <p
                    className={`text-lg font-bold ${
                      payment.status === "Paid"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    ₹{payment.total_paid}
                  </p>

                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                      payment.status === "Paid"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {payment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-12 text-center shadow-2xl">
            <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-6">
              <FaMoneyBillWave className="text-4xl text-slate-500" />
            </div>

            <h2 className="text-3xl font-semibold mb-3">No Payments Found</h2>

            <p className="text-slate-400 max-w-lg mx-auto leading-relaxed">
              Payment records will appear here once transactions are added by
              your teacher.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Payment_Student;
