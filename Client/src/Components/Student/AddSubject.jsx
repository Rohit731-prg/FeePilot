import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import api from "../../Utils/axios";
import useStudentStore from "../../Store/StudentStore";
import useSubjectStore from "../../Store/SubjectStore";
import {
  FaBookOpen,
  FaPlus,
  FaTimes,
  FaGraduationCap,
} from "react-icons/fa";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(2, 6, 23, 0.85)",
    backdropFilter: "blur(8px)",
    zIndex: 1000,
  },

  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    border: "none",
    background: "transparent",
    padding: "0px",
  },
};

function AddSubject({ is_model_open, setIs_model_open }) {

  const { teacher, student } = useStudentStore();
  const { add_subject_to_student } = useSubjectStore();

  const [loading, setLoading] = useState(false);

  const [subjectDetails, setSubjectDetails] = useState({
    student_id: student.id,
    subject_id: null,
  });

  const [all_subjects, set_all_subjects] = useState([]);

  function closeModal() {
    setIs_model_open(false);
  }

  const get_Subjects = async () => {
    try {

      const response = await api.get(
        `/subject/get-all-subjects/${teacher?.id}`
      );

      const data = response.data;

      set_all_subjects(data);

    } catch (error) {

      console.log(error);
      console.log(error?.response?.data?.details);
      console.log(error?.response?.data);
    }
  };

  const handleAddSubject = async () => {
    try {

      setLoading(true);

      await add_subject_to_student(subjectDetails);

      closeModal();

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    get_Subjects();
  }, []);

  return (
    <Modal
      isOpen={is_model_open}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Add Subject Modal"
    >

      <div className="w-[95vw] max-w-lg bg-[#0F172A] border border-slate-800 rounded-[32px] p-7 shadow-2xl relative overflow-hidden">

        {/* Glow */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>

        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 w-10 h-10 rounded-xl bg-[#111827] border border-slate-800 flex items-center justify-center hover:border-red-500 hover:text-red-400 transition-all duration-300"
        >
          <FaTimes />
        </button>

        <div className="relative z-10">

          {/* Header */}
          <div className="flex items-center gap-4 mb-8">

            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center">
              <FaGraduationCap className="text-3xl text-blue-400" />
            </div>

            <div>
              <p className="text-sm text-slate-400 uppercase tracking-[0.2em]">
                Student Enrollment
              </p>

              <h2 className="text-3xl font-bold mt-1">
                Add Subject
              </h2>
            </div>
          </div>

          {/* Student Card */}
          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5 mb-6">

            <p className="text-slate-400 text-sm mb-2">
              Student
            </p>

            <h3 className="text-xl font-semibold">
              {student?.name}
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              {teacher?.name || "Teacher"}
            </p>
          </div>

          {/* Select Subject */}
          <div className="mb-8">

            <label className="text-sm text-slate-400 mb-3 block">
              Choose Subject
            </label>

            <div className="relative">

              <select
                value={subjectDetails.subject_id || ""}
                onChange={(e) =>
                  setSubjectDetails({
                    ...subjectDetails,
                    subject_id: parseInt(e.target.value),
                  })
                }
                className="w-full bg-[#111827] border border-slate-800 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 transition-all duration-300 appearance-none text-white"
              >
                <option value="">
                  Select Subject
                </option>

                {all_subjects &&
                  all_subjects.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
              </select>

              {/* Icon */}
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                <FaBookOpen />
              </div>
            </div>
          </div>

          {/* Subject Preview */}
          {subjectDetails.subject_id && (

            <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-4 mb-8">

              <p className="text-sm text-blue-300">
                Selected subject will be added to the student's academic profile.
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">

            <button
              onClick={closeModal}
              className="flex-1 bg-[#111827] border border-slate-800 hover:border-slate-600 transition-all duration-300 py-4 rounded-2xl font-medium"
            >
              Cancel
            </button>

            <button
              onClick={handleAddSubject}
              disabled={!subjectDetails.subject_id || loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 py-4 rounded-2xl font-medium flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
            >
              {loading ? (
                "Adding..."
              ) : (
                <>
                  <FaPlus />
                  Add Subject
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default AddSubject;