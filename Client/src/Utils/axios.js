import axios from "axios";

const api = await axios.create({
    withCredentials: true,
    baseURL: "http://localhost:8000/api"
});

export default api