import { create } from 'zustand'
import api from '../Utils/axios';
import toast from 'react-hot-toast';

const usePaymentStore = create((set, get) => ({
    payments: null,

    create_payment: async (data) => {
        try {
            const response = api.post("/payment/create-all-payment", data);
            toast.promise(response, {
                loading: "loading...",
                success: (res) => res.data.message || "Course added",
                error: "Internal server error"
            });
            await response;
            set({ payments: response.data });
            get().get_all_payments();
        } catch (error) {
            console.log(error)
            console.log(error?.response?.data?.details);
            console.log(error?.response?.data);
        }
    },

    get_payments_by_Students: async (id) => {
        try {
            const response = await api.get(`/payment/get-payment-history-by-student/${id}`);
            console.log(response);
            set({ payments: response.data });
        } catch (error) {
            toast.error("Error to fetch Payments")
            console.log(error)
            console.log(error?.response?.data?.details);
            console.log(error?.response?.data);
        }
    },

    get_all_due_payment: () => {
        if (!get().payments) toast.error("No reacords found")
        new_payment = get().payments.filter((payment) => payment.status == "due");
        return new_payment
    },

    get_all_payments: async () => {
        try {
            const response = await api.get("/payment/get-all-payment");
            console.log(response.data);
            set({ payments: response.data });
        } catch (error) {
            toast.error("Error to fetch Payments")
            console.log(error)
            console.log(error?.response?.data?.details);
            console.log(error?.response?.data);
        }
    }
}));

export default usePaymentStore;