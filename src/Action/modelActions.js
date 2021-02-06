import axios from "axios";
import {GET_MODELS, GET_ERRORS, GET_MODEL, DELETE_MODEL} from "./types";

export const createModel = (carModel, history) => async dispatch => {
    try {
        await axios.post(`http://localhost:8000/api/carMake/admin`, carModel)
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
};

export const getModels = () => async dispatch => {
    const res = await axios.get("http://localhost:8000/api/carMake/user/all")
    dispatch({
        type: GET_MODELS,
        payload: res.data
    })
}

export const getModel = (makeId, history) => async dispatch => {

    try {
        const res = await axios.get(`http://localhost:8000/api/carMake/user/${makeId}`)
    dispatch({
        type:GET_MODEL,
        payload: res.data
    });
    } catch (error) {
        history.push("/dashboard");
    }
}

export const updateModel = (carModel, history) => async dispatch => {
    try {
        await axios.put(`http://localhost:8000/api/admin/carMake`, carModel)
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
};

export const deleteModel = id => async dispatch => {
    if(window.confirm(`You are deleting this model`)){
    await axios.delete(`http://localhost:8000/api/carMake/admin/${id}`)
    dispatch({
        type: DELETE_MODEL,
        payload: id
    })
}
}
