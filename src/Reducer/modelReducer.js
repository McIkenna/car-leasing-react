import {GET_MODEL, GET_MODELS, DELETE_MODEL} from "../Action/types"

const initialState = {
    models: [],
    model: {}
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_MODEL:
            return {
                ...state, 
                model: action.payload
            }
        case GET_MODELS:
            return {
                ...state,
                models: action.payload
            }
        case DELETE_MODEL:
            return {
                ...state,
                models: state.models.filter(model=>model.makeId !== action.payload)
            }
            default:
                return state;
    }
}