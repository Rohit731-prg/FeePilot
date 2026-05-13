import { create } from 'zustand'
import api from '../Utils/axios';
import toast from 'react-hot-toast';

const usePaymentStore = create((set) => ({
    payments: null,

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
    }
}));

export default usePaymentStore;