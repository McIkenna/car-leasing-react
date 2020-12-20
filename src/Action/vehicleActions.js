import axios from "axios";
import {GET_ERRORS, GET_VEHICLE, GET_VEHICLES} from "./types";

export const addVehicle = (makeId, model, history) => async dispatch => {
try {
  await axios.post(`http://localhost:8000/api/vehicle/${makeId}`, model)
        history.push(`/Vehicles/${makeId}`);
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

export const getVehicles = (makeId) => async dispatch => {
  try {

    const res = await axios.get(`http://localhost:8000/api/vehicle/${makeId}`)
    dispatch({
      type: GET_VEHICLES,
      payload: res.data
  });
  } catch (error){}
}