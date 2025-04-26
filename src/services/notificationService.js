import axios from "axios";

const API_URL = import.meta.env.VITE_NOTIFICATION_PATH_URL;

export const sendNotification = async(bookingId) =>{
    try{
        const response = await axios.post(`${API_URL}/send-notification`,{bookingId:parseInt(bookingId)});
        return response.data;
    }
    catch(error) {
        if (error.response?.status === 400 && error.response?.data?.errors) {
            const validationErrors = Object.values(error.response.data.errors)
                .flat()
                .join(', ');
                console.log("validation error");
            throw new Error(`Validation error: ${validationErrors}`);
        }
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
   
        throw new Error(error.message || "Failed to send notifications");
    }
}

export const getNotificationByEmail = async(email) =>{
    try{
        const response = await axios.get(`${API_URL}/get-notifications-by-email/${email}`);
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
        if (error.response?.status === 404) {
            console.log("not found");
            throw new Error('Notifications not found');
        }

   
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
    }
}

export const markNotificationAsRead  = async(id) =>{
    try{
        const response = await axios.put(`${API_URL}/update/${id}`,{isRead:true});
        return response.data;
    }
    catch(error){
        if (error.response?.status === 404) {
            console.log("not found");
            throw new Error('Notifications not found');
        }

   
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
    }
};
