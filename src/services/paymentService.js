import axios from "axios";

const API_URL = import.meta.env.VITE_PAYMENT_PATH_URL;


const getStoredPaymentIntent = () =>{
    const stored = sessionStorage.getItem('paymentIntent');
    return stored ? JSON.parse(stored) : null;
};

const storePaymentIntent = (intent) => {
    sessionStorage.setItem('paymentIntent', JSON.stringify(intent));
};

export const createPaymentIntent = async (amount,currency="usd") =>{
    try{
        const storedIntent = getStoredPaymentIntent();

        if(storedIntent && storedIntent.amount === amount){
            return storedIntent.clientSecret;
        }


        const response = await axios.post(`${API_URL}/create-payment-intent`,{amount,currency});
        if(response.data.clientSecret){
            const intentData = {
                clientSecret:response.data.clientSecret,
                amount:amount,
                currency: currency,
                created: Date.now()
            }
            storePaymentIntent(intentData);
         return response.data.clientSecret;
        }
    }   
    catch(error){
        if (getStoredPaymentIntent()) {
            sessionStorage.removeItem('paymentIntent');
          }
        if(error.response?.status === 400 && error.response.data.errorMessage){
            const validationErrors = Object.values(error.response.data.errors)
            .flat()
            .join(', ');
            console.log("validation error");
        throw new Error(`Validation error: ${validationErrors}`);
        }
        console.error("Error createing payment intent: ",error);
        throw new Error(error.message || "Failed to create payment intent");
    }
};
export const clearStoredPaymentIntent = () => {
    sessionStorage.removeItem('paymentIntent');
  };