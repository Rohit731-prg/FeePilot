import { create } from 'zustand'
import api from '../Utils/axios';
import toast from 'react-hot-toast';

const useStudentStore = create((set, get) => ({
    student: null,
    teacher: null,
    login_student: async (data) => {
        try {
            const response = api.post("/student/student-login", {
                phone: data.phone,
                password: data.password
            });
            toast.promise(response, {
                loading: "loading..",
                success: (res) => res.data.message || "Login successful",
                error: "Internal Server Error"
            });
            const res = await response
            set({ student: res.data })
            return true;
        } catch (error) {
            console.log(error.response.data.details);
            console.log(error.response.data);
            return false;            
        }
    },

    update_student_details: async (data) => {
        try {
            console.log(data)
            const response = api.put("/student/update-student-details", data);
            toast.promise(response, {
                loading: "loading..",
                success: (res) => res.data.message || "Update successful",
                error: "Internal Server Error"
            });
            const res = await response;
            set({ student: res.data.user });
        } catch (error) {
            console.log(error.response.data.details);
            console.log(error.response.data);
        }
    },

    get_teachers: async (id) => {
        try {
            const response = await api.get(`/admin/teacher-details/${id}`);
            console.log(response)
            set({ teacher: response.data });
        } catch (error) {
            toast.error("Error to fetch Teachers")
            console.log(error)
            console.log(error?.response?.data?.details);
            console.log(error?.response?.data);
        }
    }
}));

export default useStudentStore;