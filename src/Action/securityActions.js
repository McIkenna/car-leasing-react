import setJwtToken from "../securityUtils/setJwtToken";
import axios from "axios"
import jwt_decode from "jwt-decode"
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

export const login = LoginRequest => async dispatch => {
    try{
//post => Login Request
    const res = await axios.post('http://localhost:8000/api/login', LoginRequest)
    //extract token from res.data
    const {token} = res.data;
    // store the token in the localStorage
    localStorage.setItem("jwtToken", token)
    // set our toekn in the hearder 
    setJwtToken(token)
    //decode token on React 
    const decoded = jwt_decode(token);
    //dispatch to our securityReducer
    dispatch({
        type: SET_CURRENT_USER,
        payload: decoded
    });
    }catch(error){
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
    
}