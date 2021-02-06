import {combineReducers} from "redux";
import errorReducer from "./errorReducer";
import modelReducer from "./modelReducer";
import vehicleReducer from "./vehicleReducer";
import orderReducer from "./orderReducer";
import customerReducer from "./customerReducer"
import securityReducer from "./securityReducer"

export default combineReducers({
    errors: errorReducer,
    model: modelReducer,
    vehicle: vehicleReducer,
    order: orderReducer,
    customer: customerReducer,
    security: securityReducer
})