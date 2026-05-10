import React from "react";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="min-h-screen bg-slate-950 overflow-hidden flex items-center justify-center px-6 relative">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>

      {/* Floating Shapes */}
      <div className="absolute top-24 left-20 w-6 h-6 bg-pink-500 rounded-full animate-bounce"></div>
      <div className="absolute bottom-32 left-1/4 w-4 h-4 bg-cyan-400 rounded-full animate-ping"></div>
      <div className="absolute top-1/3 right-20 w-5 h-5 bg-yellow-400 rounded-full animate-pulse"></div>

      {/* Card */}
      <div className="relative z-10 max-w-2xl w-full bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl text-center">
        
        {/* Fake Broken Planet */}
        <div className="relative mx-auto w-44 h-44 mb-8">
          
          <div className="absolute inset-0 rounded-full bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 animate-spin-slow"></div>

          <div className="absolute inset-3 rounded-full bg-slate-950 flex items-center justify-center text-7xl font-black text-white">
            4<span className="text-pink-500">0</span>4
          </div>

          {/* Orbit Ring */}
          <div className="absolute -inset-3.75 border border-white/20 rounded-full"></div>

          {/* Small Orbit Dot */}
          <div className="absolute top-1/2 -right-3 w-5 h-5 bg-cyan-400 rounded-full"></div>
        </div>

        {/* Text */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
          Lost in Space 🌌
        </h1>

        <p className="text-slate-300 text-lg leading-relaxed max-w-lg mx-auto">
          The page you are trying to visit drifted into a black hole,
          exploded into pixels, or simply never existed.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          
          <Link
            to="/"
            className="px-8 py-4 rounded-2xl bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition-all duration-300"
          >
            Return Home 🚀
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-8 py-4 rounded-2xl bg-white/10 border border-white/10 text-white font-semibold hover:bg-white/20 transition-all duration-300"
          >
            Go Back
          </button>
        </div>

        {/* Tiny Footer */}
        <p className="text-slate-500 text-sm mt-10">
          Error Code: SPACE_404_NOT_FOUND
        </p>
      </div>
    </div>
  );
}

export default Error;