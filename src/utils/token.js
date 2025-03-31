import {jwtDecode} from 'jwt-decode';

export const decodeToken = (token) =>{
    try{
        return jwtDecode(token);
    }
    catch(error){
        console.error("Invalid token: ",error);
        return null;
    }
};

export const getTokenExpiration = (token) =>{
    const decoded = decodeToken(token);
    return decoded ? decoded.exp * 1000 : null;
}