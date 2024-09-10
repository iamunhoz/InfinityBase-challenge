import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { RequestResponse } from "../definitions"

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
})

// Set up an interceptor to add the Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token && config.headers) {
      config.headers.set("Authorization", `Bearer ${token}`)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

type RequestBody = Record<any, unknown> | FormData

export const getRequest = async <T>(url: string) =>
  await apiRequest<T>({
    method: "GET",
    url,
  })

export const putRequest = async <T>(url: string, requestBody?: RequestBody) =>
  await apiRequest<T>({
    method: "PUT",
    url,
    data: requestBody,
  })

export const deleteRequest = async <T>(url: string, requestBody: RequestBody) =>
  await apiRequest<T>({
    method: "DELETE",
    url,
    data: requestBody,
  })

// self: checar se headers opcionais estão sendo enviados
export const postRequest = async <T>(
  url: string,
  requestBody: RequestBody,
  headers = {}
) =>
  await apiRequest<T>({
    method: "POST",
    url,
    data: requestBody,
    headers,
  })

type BaseResponse<T> = {
  data: RequestResponse<T>
  status: number
  statusText: string
}
const apiRequest = async <T>(
  axiosConfig: AxiosRequestConfig
): Promise<RequestResponse<T>> => {
  try {
    const response: BaseResponse<T> = await axiosInstance(axiosConfig)

    // // console.log("apiRequest response", response)
    return response.data
  } catch (error) {
    if ((error as AxiosError).response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // console.log((error as AxiosError).response?.data)
      // console.log((error as AxiosError).response?.status)
      // console.log((error as AxiosError).response?.headers)
    } else if ((error as AxiosError).request) {
      // The request was made but no response was received
      // `(error as AxiosError).request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      // console.log((error as AxiosError).request)
    } else {
      // Something happened in setting up the request that triggered an Error
      // console.log("Error", (error as AxiosError).message)
    }

    //ERRO DE CONTATE O SUPORTE TÉCNICO
    // toast.error("An unexpected error has occurred, contact support.")

    return {
      success: false,
      error,
    }
  }
}
