import axios from 'axios';

const API_URL = import.meta.env.VITE_FLIGHT_API_URL;

export const searchFlights = async (searchData) => {
    try {
        // Helper function to format date as YYYY-MM-DD
        const formatDate = (date) => {
            const d = new Date(date);
            return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        };

        const departureDate = 
           formatDate(searchData.departureDate);

        const response = await axios.post(`${API_URL}/search`, {
            origin: searchData?.origin,
            destination: searchData?.destination,
            classType: searchData?.travelClass,
            passengerNumber: searchData?.passengerCount,
            tripType: searchData?.tripType,
            departureDate: departureDate,
            returnDate: searchData.returnDate === null ? null :  formatDate(searchData.returnDate)
        });

        return response.data;
    }
    catch(error) {
        console.error("Error searching flights: ", error.message);
        throw new Error(error.response?.data?.message || "Failed to fetch");
    }
};