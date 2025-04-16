import axios from "axios";

const API_URL = import.meta.env.VITE_PLANE_PATH_URL;

export const getPlaneById = async (id) =>{
    try{
        const response = await axios.get(`${API_URL}/get/${id}`);
        return response.data;
    }
    catch(error){
        if(error.response?.status === 400 && error.response?.data?.errors){
            const validationErrors = Object.values(error.response.data.errors).flat().join(', ');
            console.log("validation error");
            throw new Error(`Validation error: ${validationErrors}`);
        }
        if(error.response?.status === 404){
            console.log("not found");
            throw new Error("Plane not found");
        }
        if(error.response?.data.message){
            throw new Error(error.response.data.message);
        }
        console.error("Error getting planes");
        throw new Error(error.message || "Failed to fetch");
    }
};