import { create } from 'zustand'
import api from '../Utils/axios'
import toast from 'react-hot-toast'

const useSubjectStore = create((set) => ({
    subjects: null,

    get_subjects_by_Student: async (id) => {
        try {
            const response = await api.get(`/subject/get-subjects-by-student/${id}`)
            console.log(response)
            set({ subjects: response.data })
        } catch (error) {
            toast.error("Error to fetch Subjects")
            console.log(error)
            console.log(error?.response?.data?.details);
            console.log(error?.response?.data);
        }
    },

    add_subject_to_student: async (data) => {
        try {
            const response = api.post("/student-subject/create-new-stu_sub", data);
            toast.promise(response, {
                loading: "loading..",
                success: (res) => res.data.message || "Update successful",
                error: "Internal Server Error"
            });
            await response
            get().get_subjects_by_Student(data.student_id)
        } catch (error) {
            console.log(error)
            console.log(error?.response?.data?.details);
            console.log(error?.response?.data);
        }
    },
}))

export default useSubjectStore;