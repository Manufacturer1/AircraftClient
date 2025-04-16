import axios from "axios";

const API_URL = import.meta.env.VITE_AMENITIES_PATH_URL;

export const getAllAmenities = async () =>{
    try{
        const response = await axios.get(`${API_URL}/all`);
        return response.data;
    }
    catch(error){
        if (error.response?.status === 404) {
            throw new Error('Amenity not found');
        }
        if (error.response?.data?.Message) {
            throw new Error(error.response.data.Message);
        }
        console.error("Error getting amenities: ", error);
        throw new Error(error.message || "Failed to fetch amenities");
    }
};