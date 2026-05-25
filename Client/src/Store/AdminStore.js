import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import api from '../Utils/axios'
import toast from 'react-hot-toast'

const useAdminStore = create(
  persist(
    (set) => ({
      // Default to null instead of 1 so you can easily check if logged in (!!admin)
      admin: null, 
      
      login: async (data) => {
        try {
          const response = api.post("/admin/login-Teacher", data)
          
          toast.promise(response, {
            loading: "Logging in...",
            success: (res) => res.data.message || "Login successful",
            error: (err) => err.response?.data?.detail || "Invalid credentials"
          });
          
          const res = await response;
          console.log(res)
          // Save the user data from your backend into the Zustand state
          set({ admin: res.data }); 
          return true;
          
        } catch (error) {
          console.error(error.response?.data?.detail || error.message);
          return false;
        }
      },
      
      // Add a logout function to clear the persisted cookie/storage state
      logout: () => {
        set({ admin: null });
      }
    }),
    {
      name: 'teacher-auth-storage', // Unique key name for localStorage
      storage: createJSONStorage(() => localStorage), // Tells Zustand to use localStorage
    }
  )
);

export default useAdminStore;