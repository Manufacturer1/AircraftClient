import axios from 'axios';

const API_URL = import.meta.env.VITE_FLIGHT_API_URL;

export const searchFlights = async (searchData) =>{
    try{
        const response = await axios.post(`${API_URL}/search`,{
            origin:searchData.origin,
            destination:searchData.destination,
            classType:searchData.travelClass,
            passengerNumber: searchData.passengerCount,
            tripType:searchData.tripType,
            departureDate:searchData.departureDate === null ? searchData.departureDate = new Date() : searchData.departureDate = searchData.departureDate,
            returnDate: searchData.tripType === 'RoundTrip' ? searchData.returnDate : null
        });

        return response.data;
    }
    catch(error){
        console.error("Error searching flights: ",error.message);
        throw new Error(error.response?.data?.message || "Failed to fetch");
    }
};