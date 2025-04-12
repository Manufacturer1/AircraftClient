import axios from 'axios';

const API_URL = import.meta.env.VITE_FLIGHT_API_URL;

export const searchFlights = async (searchData) => {
    try {
       
        const formatDate = (date) => {
            const d = new Date(date);
            return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        };

        const departureDate = formatDate(searchData.departureDate);

        const response = await axios.post(`${API_URL}/search`, {
            origin: searchData?.origin,
            destination: searchData?.destination,
            classType: searchData?.travelClass,
            passengerNumber: searchData?.passengerCount,
            tripType: searchData?.tripType,
            departureDate: departureDate,
            returnDate: searchData.returnDate === null ? null : formatDate(searchData.returnDate)
        });

        return response.data;
    }
    catch(error) {
        // Handle validation errors (400 BadRequest with ModelState)
        if (error.response?.status === 400 && error.response?.data?.errors) {
            const validationErrors = Object.values(error.response.data.errors)
                .flat()
                .join(', ');
            throw new Error(`Validation error: ${validationErrors}`);
        }
        
        // Handle not found (404)
        if (error.response?.status === 404) {
            throw new Error('Flight not found');
        }

   
        if (error.response?.data?.Message) {
            throw new Error(error.response.data.Message);
        }

        // Fallback for other errors
        console.error("Error searching flights: ", error);
        throw new Error(error.message || "Failed to fetch flights");
    }
};
export const getFlightByFlightNumber = async (flightNumber) => {
    try{
        const response = await axios.get(`${API_URL}/flight/${flightNumber}`);
        return response.data;
    }
    catch(error){
        if (error.response?.status === 404) {
            throw new Error('Flight not found');
        }

   
        if (error.response?.data?.Message) {
            throw new Error(error.response.data.Message);
        }
        console.error("Error searching flights: ", error);
        throw new Error(error.message || "Failed to fetch flights");
    }
};