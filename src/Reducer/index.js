import {combineReducers} from "redux";
import errorReducer from "./errorReducer";
import modelReducer from "./modelReducer";
import vehicleReducer from "./vehicleReducer";

export default combineReducers({
    errors: errorReducer,
    model: modelReducer,
    vehicle: vehicleReducer
})