import { create } from 'zustand'
import api from '../Utils/axios'
import toast from 'react-hot-toast';

const useBatchStore = create((set, get) => ({
    batches: null,

    get_all_batches_by_student: async (id) => {
        try {
            const response = await api.get(`/batch/get-batches-by-student/${id}`)
            console.log(response);
            set({ batches: response.data });
        } catch (error) {
            toast.error("Error to fetch Batches")
            console.log(error)
            console.log(error?.response?.data?.details);
            console.log(error?.response?.data);
        }
    },

    get_all_batches: async () => {
        try {
            const response = await api.get("/batch/get-all-batches")
            console.log(response);
            set({ batches: response.data });
        } catch (error) {
            toast.error("Error to fetch Payments")
            console.log(error)
            console.log(error?.response?.data?.details);
            console.log(error?.response?.data);
        }
    },

    create_new_batch: async (data) => {
        try {
            const response = api.post("/batch/create-new-batch", data);
            toast.promise(response, {
                loading: "loading...",
                success: (res) => res.data.message || "Batch added",
                error: "Internal server error"
            });
            await response
            get().get_all_batches()
        } catch (error) {
            console.log(error)
            console.log(error?.response?.data?.details);
            console.log(error?.response?.data);
        }
    },

    add_subject_to_batch: async (data, id) => {
        try {
            console.log("data: ", data)
            const res = api.post(`/batch/add-batch-subject/${id}`, data);
            toast.promise(res, {
                loading: "loading...",
                success: (res) => res.data.message || "Subjects added",
                error: "Internal server error"
            });
            await res;
        } catch (error) {
            console.log(error)
            console.log(error?.response?.data?.details);
            console.log(error?.response?.data);
        }
    }
}));

export default useBatchStore;