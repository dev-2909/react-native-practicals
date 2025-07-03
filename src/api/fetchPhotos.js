import axiosInstance from "./apiInstance";
export const fetchPhotosData = async () => {
    try {
      const response = await axiosInstance.get('/photos');
      return response.data
    } catch (err) {
      Promise.reject(err);
    }
};