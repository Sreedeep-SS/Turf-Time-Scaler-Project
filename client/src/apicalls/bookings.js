import { axiosInstance } from "./index";

export const FetchMyBookings = async() => {
    try{
        const response = await axiosInstance.get("/api/booking/my-bookings")
        return response.data
    }
    catch(error){
        console.error(error)
    }
}

export const CancelBooking = async() => {
    try{
        const response = await axiosInstance.get("/api/booking/cancel-booking")
        return response.data
    }
    catch(error){
        console.error(error)
    }
}

export const GetAdminBookings = async (filters = {}) => {
  try {
    const params = new URLSearchParams(filters).toString();
    const response = await axiosInstance.get(`/api/booking/admin-bookings?${params}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};