import axios from "axios"
import {GET_ERRORS, GET_ORDER, DELETE_ORDER} from "./types"


export const addOrder = (makeId, vehicleId, order, history) => async dispatch => {
    try {
        await axios.post(`http://localhost:8000/api/order/admin/${makeId}/${vehicleId}`, order)
        history.push(`/Vehicles/${makeId}`);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch(error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
}

export const getOrder = (leasingId) => async dispatch => {
    try {
      const res = await axios.get(`http://localhost:8000/api/order/user/${leasingId}`)
      dispatch({
        type: GET_ORDER,
        payload: res.data
      })
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.res.data
      });
    }
  }

export const deleteOrder = (leasingId) => async dispatch => {
    if(window.confirm(`You are deleting a vehicle`)){
      await axios.delete(`http://localhost:8000/api/order/admin/${leasingId}`);
      dispatch({
        type: DELETE_ORDER,
        payload: leasingId
      })
    }
  }
  