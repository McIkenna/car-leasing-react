import axios from "axios";
import {GET_ERRORS} from "./types";

export const createMake = (carMake, history) => async dispatch => {
    try {
        await axios.post(`http://localhost:8000/api/carMake`, carMake)
        history.push("/dashboard");
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
}