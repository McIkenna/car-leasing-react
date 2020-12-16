import {GET_CARMAKE, GET_CARMAKES, DELETE_CARMAKE} from "../Action/types"

const initialState = {
    model: [],
    models: {}
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_CARMAKE:
            return {
                ...state, 
                model: action.payload
            }
        case GET_CARMAKES:
            return {
                ...state,
                models: action.payload
            }
        case DELETE_CARMAKE:
            return {
                ...state
            }
            default:
                return state;
    }
}