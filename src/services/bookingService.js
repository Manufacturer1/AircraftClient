import axios from "axios";

const API_URL = import.meta.env.VITE_BOOKING_PATH_URL;
const TICKET_API_URL = import.meta.env.VITE_TICKET_PATH_URL;

export const saveBookingState = async (bookingState,paymentIntentId,activeStep) =>{
    try{
        const payload = {
            passenger: {
                name: bookingState?.name || "",
                surname: bookingState?.surname || "",
                birthDay: bookingState?.birthday || (new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split("T")[0],
                nationality: bookingState?.nationality || "",
            },
            passport: {
                passportNumber: bookingState?.passportNumber || "",
                country: bookingState?.country || "",
                expiryDate: bookingState?.passportExpiryDate || (new Date().setFullYear(new Date().getFullYear() + 2)).toISOString().split("T")[0],
            },
            contactDetails: {
                name: bookingState?.contactName || "",
                surname: bookingState?.contactSurname || "",
                email: bookingState?.email || "",
                phoneNumber: bookingState?.phoneNumber || ""
            },
            paymentIntentId: paymentIntentId,
            activeStep:activeStep
        };

        const response = await axios.post(`${API_URL}/save-state`, payload, { 
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }
    catch(error){
        if (error.response?.status === 404) {
            
        }
        if (error.response?.status === 400 && error.response?.data?.errors) {
            const validationErrors = Object.values(error.response.data.errors)
                .flat()
                .join(', ');
                console.log("validation error");
            throw new Error(`Validation error: ${validationErrors}`);
        }
    }
};

export const getCurrentSavedState = async () => {
    try {
        const response = await axios.get(`${API_URL}/current`, {
            withCredentials: true 
        });
        return response.data;
    } catch (error) {
        if(!error.response?.status !== 404){
            console.error('Error fetching current state:', error);
            throw error;
        }
    }
};

export const bookFlight = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/book-flight`, data, {
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        if (error.response) {
          
            throw new Error(error.response.data); 
        } else if (error.request) {
            
            throw new Error("No response from server.");
        } else {
           
            throw new Error("An unexpected error occurred.");
        }
    }
};

export const getTicketByPaymentIntentId = async (paymentIntentId) =>{
    if (!paymentIntentId || typeof paymentIntentId !== 'string') {
        throw new Error('Invalid paymentIntentId');
    }

    try{
        const response = await axios.get(
            `${TICKET_API_URL}/get-ticket-by-payment/${paymentIntentId}`);
      
          // Validate response structure
          if (!response.data) {
            throw new Error('No data received from server');
          }
      
          return response.data;
    }
    catch(error){
        if (error.response) {
          
            throw new Error(error.response.data); 
        } else if (error.request) {
            
            throw new Error("No response from server.");
        } else {
           
            throw new Error("An unexpected error occurred.");
        }
    }
};

export const clearSession = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/clear-history`,
        {},
        {
          withCredentials: true, 
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error clearing session:', error);
      throw error;
    }
  };