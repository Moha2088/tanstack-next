import Axios, { AxiosInstance } from "axios"

export const apiClient: AxiosInstance = Axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
})