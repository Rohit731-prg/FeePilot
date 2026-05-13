import { create } from 'zustand'
import api from '../Utils/axios'
import toast from 'react-hot-toast';

const useBatchStore = create((set) => ({
    batches: null,

    get_all_batches_by_student: async (id) => {
        try {
            const response = await api.get(`/batch/get-batches-by-student/${id}`)
            console.log(response);
            set({ batches: response.data });
        } catch (error) {
            toast.error("Error to fetch Payments")
            console.log(error)
            console.log(error?.response?.data?.details);
            console.log(error?.response?.data);
        }
    }
}));

export default useBatchStore;