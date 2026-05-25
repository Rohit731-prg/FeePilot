import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaBook,
  FaLayerGroup,
  FaMoneyBillWave,
  FaUsers,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";

import { useNavigate, useLocation } from "react-router-dom";
import useAdminStore from "../../Store/AdminStore";

function Navber() {
  const { admin } = useAdminStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [is_open, setIs_open] = useState(false);

  const nav = [
    {
      id: 1,
      name: "Dashboard",
      navigate: "/dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      id: 2,
      name: "Courses",
      navigate: "/course-info",
      icon: <FaBook />,
    },
    {
      id: 3,
      name: "Students",
      navigate: "/student-portal",
      icon: <FaUsers />,
    },
    {
      id: 4,
      name: "Payments",
      navigate: "/payment-details",
      icon: <FaUsers />,
    },
  ];

  return (
    <>
      {/* Mobile Topbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#020617] border-b border-slate-800 flex items-center justify-between px-4 z-50">

        <h1 className="text-xl font-bold text-white">
          feePilot
        </h1>

        <button
          onClick={() => setIs_open(!is_open)}
          className="text-white text-xl"
        >
          {is_open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Overlay */}
      {is_open && (
        <div
          onClick={() => setIs_open(false)}
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-70 bg-[#020617] border-r border-slate-800 z-50 transform transition-all duration-300 flex flex-col justify-between
          
          ${
            is_open
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >

        {/* Top */}
        <div>

          {/* Logo */}
          <div className="h-20 border-b border-slate-800 flex items-center px-6">

            <div>
              <h1 className="text-3xl font-bold text-white">
                feePilot
              </h1>

              <p className="text-xs text-slate-400 mt-1">
                Teacher Management Portal
              </p>
            </div>
          </div>

          {/* Teacher Info */}
          <div className="px-6 py-6 border-b border-slate-800">

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 text-xl font-bold">
                {admin?.name?.charAt(0) || "T"}
              </div>

              <div>

                <h2 className="text-white font-semibold">
                  {admin?.name || "Teacher"}
                </h2>

                <p className="text-sm text-slate-400 mt-1">
                  {admin?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="px-4 py-6 space-y-2">

            {nav.map((item) => {

              const is_active =
                location.pathname === item.navigate;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    navigate(item.navigate);
                    setIs_open(false);
                  }}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group
                  
                    ${
                      is_active
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                        : "text-slate-400 hover:bg-[#0F172A] hover:text-white"
                    }
                  `}
                >

                  <div className="text-lg">
                    {item.icon}
                  </div>

                  <span className="font-medium">
                    {item.name}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom */}
        <div className="p-4 border-t border-slate-800">

          <button
            className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all duration-300"
          >

            <FaSignOutAlt />

            <span className="font-medium">
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* Desktop Space */}
      <div className="hidden lg:block w-70"></div>
    </>
  );
}

export default Navber;