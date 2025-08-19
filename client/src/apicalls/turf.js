import { axiosInstance } from "./index";

export const GetAllVenues = async() => {
    try{
        const response = await axiosInstance.get("api/turf/get-all-turfs")
        return response.data
    }
    catch (error){
        console.log(error)
    }
}
