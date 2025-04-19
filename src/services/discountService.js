import axios from "axios";

const API_URL = import.meta.env.VITE_DISCOUNTS_PATH_URL;

export const getAllDiscounts = async () =>{
    try{
        const response = await axios(`${API_URL}/all`);
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
          
            throw new Error('Discount not found');
        }

   
        if (error.response?.data?.Message) {
            throw new Error(error.response.data.Message);
        }

        // Fallback for other errors
        console.error("Error getting discount: ", error);
        throw new Error(error.message || "Failed to fetch discount");
    }
};