import {GET_VEHICLE, GET_VEHICLES, DELETE_VEHICLE, GET_CARMAKE} from "../Action/types"


const initialState = {
    vehicle: [],
    vehicles: {}
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_CARMAKE:
            return {
                ...state, 
                vehicles: action.payload
            }
        case GET_VEHICLE:
            return {
                ...state,
                vehicle: action.payload
            }
        case GET_VEHICLES:
                return {
                    ...state,
                    vehicles: action.payload
                }
        case DELETE_VEHICLE:
            return {
                ...state
            }
            default:
                return state;
    }
}