import { create } from 'zustand'
import api from '../Utils/axios'
import toast from 'react-hot-toast'

const useSubjectStore = create((set, get) => ({
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

    get_all_subjects: async () => {
        try {
            const res = await api.get('/subject/get-all-subjects');
            console.log(res);
            set({ subjects: res.data });
        } catch (error) {
            toast.error("Internal server error");
            console.log(error)
            console.log(error?.response?.data?.details);
            console.log(error?.response?.data);
        }
    },

    get_all_subjects_by_batch: async (id) => {
        try {
            const res = await api.get(`/subject/get-all-subjects-by-batch/${id}`)
            console.log(res)
            return res.data;
        } catch (error) {
            console.log(error)
            console.log(error?.response?.data?.details);
            console.log(error?.response?.data);
        }
    },

    create_new_subject: async (data) => {
        try {
            const res = api.post("/subject/create-new-subject", data);
            toast.promise(res, {
                loading: "loading...",
                success: (res) => res.data.message || "Course added",
                error: "Internal server error"
            });
            await res;
            get().get_all_subjects();
        } catch (error) {
            console.log(error)
            console.log(error?.response?.data?.details);
            console.log(error?.response?.data);
        }
    }
}))

export default useSubjectStore;