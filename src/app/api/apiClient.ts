import Axios, { AxiosInstance } from "axios"

export const apiClient: AxiosInstance = Axios.create({
    baseURL: 'http://localhost:3001/api/todos',
})