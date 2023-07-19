import { ACTION, declaredStateOrder,  } from "../../model/index.d"

const initialState = {
    order: {},
    orders: [],
    message: null,
    orderSuccess: false,
    orderError: false
}

export default (state:  declaredStateOrder= initialState, action: ACTION) => {
    switch (action.type) {
        case "orders_completed_status_by_Customer":
            return {
                ...state,
                orders: action.payload,
                orderSuccess: true 
            }
        case "order_by_id":
            return {
                ...state,
                order: action.payload,
                orderSuccess: true
            }
         case "order_update_from_websocket_Subscription":
            return {
                ...state,
                order: action.payload,
                orderSuccess: true
            }
        case "order_create":
            return {
                ...state,
                order: action.payload,
                orderSuccess: true
            }
        case "order_error":
            return {
                ...state,
                message: action.payload,
                orderError: true
            }
        case "order_reset":
            return {
                ...state,
                message: null,
                orderSuccess: false,
                orderError: false,
                order: {},
                orders: [],
            }
        case "active_order_reset":
            return {
                ...state,
                message: null,
                orderSuccess: false,
                orderError: false,
                orders: [],
            }
        default: 
            return state
    }
}