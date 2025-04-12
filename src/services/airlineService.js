import axios from 'axios';

const API_URL = import.meta.env.VITE_AIRLINE_PATH_URL;

export const getAirlines = async () => {
    try{
        const response = await axios.get(`${API_URL}/all`);
        return response.data;
    }
    catch (error) {
        if(error.response?.status === 404) {
            throw new Error('Airlines not found');
        }

        if (error.response?.data?.Message) {
            throw new Error(error.response.data.Message);
        }
        console.error('Error fetching airlines:', error);
        throw error;
    }
};

export const getAirlineById = async (id) => {
    try{
        const response = await axios.get(`${API_URL}/get/${id}`);

        return response.data;
    }
    catch(error){
        if(error.response?.status === 404) {
            throw new Error('Airline not found');
        }

        if (error.response?.data?.Message) {
            throw new Error(error.response.data.Message);
        }
        console.error('Error fetching airline:', error);
        throw error;
    }
};