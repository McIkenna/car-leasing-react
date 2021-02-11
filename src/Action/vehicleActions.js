import axios from "axios";
import {DELETE_VEHICLE, GET_ERRORS, GET_VEHICLE, GET_VEHICLES, SHOW_LOADER, HIDE_LOADER} from "./types";
import {useState} from 'react'

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
      payload: res.data,
      
  });
  
  } catch (error){
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
  })
  }
}


export const getVehicle = (makeId, vehicleId, history) => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:8000/api/vehicle/${makeId}/${vehicleId}`)
    dispatch({
      type: GET_VEHICLE,
      payload: res.data
    })
  } catch (error) {
    history.push("/dashboard");
  }
}

export const updateVehicle = (makeId, vehicleId, vehicle, history) => async dispatch => {
  try {
    await axios.put(`http://localhost:8000/api/vehicle/${makeId}/${vehicleId}`, vehicle)
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


export const deleteVehicle = (make_Id, vehicle_Id) => async dispatch => {
  if(window.confirm(`You are deleting a vehicle`)){
      await axios.delete(`http://localhost:8000/api/vehicle/${make_Id}/${vehicle_Id}`)
    dispatch({
      type: DELETE_VEHICLE,
      payload: vehicle_Id
    });
  }
}

