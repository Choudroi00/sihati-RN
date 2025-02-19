import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { API_URL } from "./constants";


const apiClient = axios.create({
    baseURL: API_URL,
})

apiClient.interceptors.request.use((config) => {
    return {
        ...config,
        headers: {
            ...config.headers,
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
    } as InternalAxiosRequestConfig
})

export default apiClient;