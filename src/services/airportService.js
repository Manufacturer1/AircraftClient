import axios from 'axios';

const API_URL = import.meta.env.VITE_AIRPORT_PATH_URL;


export const getAirportById = async (id) =>{
    try{
        const response = await axios.get(`${API_URL}/get/${id}`);
        
        return response.data;
    }
    catch(error){
        if (error.response?.status === 400 && error.response?.data?.errors) {
            const validationErrors = Object.values(error.response.data.errors)
                .flat()
                .join(', ');
                console.log("validation error");
            throw new Error(`Validation error: ${validationErrors}`);
        }
           // Handle not found (404)
           if (error.response?.status === 404) {
          
            throw new Error('Airport not found');
        }

   
        if (error.response?.data?.Message) {
            throw new Error(error.response.data.Message);
        }

        // Fallback for other errors
        console.error("Error getting airport: ", error);
        throw new Error(error.message || "Failed to fetch airport");
    }
};