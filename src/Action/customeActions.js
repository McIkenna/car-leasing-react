import axios from "axios";
import {GET_CUSTOMER, GET_ERRORS, GET_CUSTOMERS, DELETE_CUSTOMER} from "./types";


export const addCustomer = (customer, history) => async dispatch => {
    try {
      const res =   await axios.post("http://localhost:8000/api/customer", customer)
        history.push(`/dashboard`);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
        console.log(res)
    } catch(error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data,
            
        })
        console.log(error)
    }
}



export const getCustomer = (customerId, history) => async dispatch => {

    try {
        const res = await axios.get(`http://localhost:8000/api/customer/${customerId}`)
    dispatch({
        type:GET_CUSTOMER,
        payload: res.data
    });
    } catch (error) {
        history.push("/dashboard");
    }
}

