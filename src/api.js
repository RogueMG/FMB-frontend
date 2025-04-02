import axios from "axios"
import { ACCESS_TOKEN } from "./constants"

const baseURL = "https://fmb-tiffin-details-app.onrender.com";

const api = axios.create({
    baseURL : baseURL

})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api
