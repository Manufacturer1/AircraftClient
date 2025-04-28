import axios from "axios";

const API_URL = import.meta.env.VITE_CURRENCY_PATH_URL;

export const getExchangeCurrency = async(amount,to) =>{
    try{
        const response = await axios.get(`${API_URL}/convert?amount=${amount}&target=${to}`);
        return response.data;
    }
    catch(error){
        console.error(error.response.message);
        throw error;
    }
};