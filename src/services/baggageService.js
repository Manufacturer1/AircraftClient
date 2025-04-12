import axios from 'axios';

const API_URL = import.meta.env.VITE_BAGGAGE_PATH_URL;

export const getBaggageById = async (id) => {
    try{
        const response = await axios.get(`${API_URL}/get/${id}`);
        return response.data;
    }
    catch (error) {
        if(error.status === 404) {
            console.error('Baggage not found:', error);
            throw new Error('Baggage not found');
        }
        console.error('Error fetching baggage:', error);
        throw error;
    }
};
