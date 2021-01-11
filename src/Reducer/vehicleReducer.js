import {GET_VEHICLE, GET_VEHICLES, DELETE_VEHICLE, GET_MODEL} from "../Action/types"


const initialState = {
    vehicles: [],
    vehicle: {},
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_MODEL:
            return {
                ...state, 
                vehicles: action.payload,
         
            }
        case GET_VEHICLE:
            return {
                ...state,
                vehicle: action.payload,
             
            }
        case GET_VEHICLES:
                return {
                    ...state,
                    vehicles: action.payload,
                
                }
        case DELETE_VEHICLE:
            return {
                ...state,
                vehicles: state.vehicles.filter(vehicle => vehicle.vehicleId !== action.payload)
            }
            default:
                return state;
    }
}