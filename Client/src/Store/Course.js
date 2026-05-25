import { create } from 'zustand'
import api from '../Utils/axios'
import toast from 'react-hot-toast';

const useCoureStore = create((set, get) => ({
    courses: null,

    get_all_cousrse: async (id) => {
        try {
            const response = await api.get(`/course/get-course`);
            console.log(response);
            set({ courses: response.data });
        } catch (error) {
            toast.error("Error to fetch Payments")
            console.log(error)
            console.log(error?.response?.data?.details);
            console.log(error?.response?.data);
        }
    },

    create_new_course: async (data) => {
        try {
            const res = api.post("/course/create_new_course", { name: data });
            toast.promise(res, {
                loading: "loading...",
                success: (res) => res.data.message || "Course added",
                error: "Internal server error"
            });
            await res
            get().get_all_cousrse()
        } catch (error) {
            console.log(error)
            console.log(error?.response?.data?.details);
            console.log(error?.response?.data);
        }
    }
}));

export default useCoureStore;