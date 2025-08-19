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

export const GetAdminTurfs = async (ownerId) => {
  try {
    const response = await axiosInstance.post("/api/turf/get-all-turfs-by-owner", { owner: ownerId });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
