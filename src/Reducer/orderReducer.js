import { DELETE_ORDER, GET_ORDER, GET_ORDERS, GET_VEHICLE } from "../Action/types"

const initialState = {
    orders : [],
    order : {}
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_VEHICLE:
            return {
                ...state,
                order: action.payload
            }
        case GET_ORDER:
            return{
                ...state,
                order: action.payload
            }
        case GET_ORDERS:
            return{
                ...state,
                orders: action.payload
            }
        case DELETE_ORDER:
            return{
                ...state,
                order: state.orders.filter(order => order.leasingId !== action.payload)
            }
            default:
                return state;
    }
}