import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

// Configure Axios instance
const apiConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BACKEND_URL, // Base API URL
  timeout: 30000, // Optional: Timeout for requests
  headers: {
    'Content-Type': 'application/json',
  },
});



// axios function for axios get request
export const apiGet = async <T>(url: string, params = {}): Promise<T> => {
  const response = await apiConfig.get<T>(url, { params });
  return response.data;
};



// axios function for axios post request with files
export const apiPost = async <T>(
  url: string,
  data: unknown
): Promise<AxiosResponse<T>> => {
  try {
    // Check if data is FormData
    const isFormData = data instanceof FormData;
    
    // If the data is FormData, axios will handle the 'Content-Type' header correctly.
    const response = await apiConfig.post<T>(url, data, {
      headers: isFormData ? { ...apiConfig.defaults.headers.common } : undefined,
    });

    return response;
  } catch (error) {
    // Ensure the error is an AxiosError
    if (axios.isAxiosError(error)) {
      throw error; // Re-throw so it’s caught in the calling function (e.g., onSubmit)
    } else {
      // Wrap non-Axios errors (e.g., network errors) into an Axios-like error
      throw new axios.AxiosError(
        "An unexpected error occurred",
        "ERR_UNEXPECTED",
        undefined,
        undefined,
        undefined
      );
    }
  }
};


// axios function for the axios put request
export const apiPut = async <T>(url: string, data: any, params = {}): Promise<T> => {
  const isFormData = data instanceof FormData;
  console.log('PUT Request Data:', data);

  try {
    const response = await apiConfig.put<T>(url, data, {
      params,
      headers: isFormData
        ? { ...apiConfig.defaults.headers.common, "Content-Type": "multipart/form-data" }
        : apiConfig.defaults.headers.common,
    });
    return response.data;
  } catch (error: any) {
    console.error('PUT API Error:', error.response?.data || error.message);
    if(error?.response?.data?.error === "Only .png, .jpg and .jpeg format allowed!"){
      throw error.response?.data?.error;
    }else{
      throw error;
    }

  }
};

// Add a request interceptor to include the token automatically
apiConfig.interceptors.request.use(
  (config) => {
    if (!config.url) return config; // Ensure URL exists

    const finalUrl = config.baseURL + config.url;

    const doctorToken = localStorage.getItem("doctorToken");
  

    console.log(">>", finalUrl)


    if (finalUrl.includes("/api/doctor")) {
      config.headers.Authorization = doctorToken ? `Bearer ${doctorToken}` : "";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

  


export default apiConfig;
