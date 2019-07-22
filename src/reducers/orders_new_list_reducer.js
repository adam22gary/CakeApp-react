import { ORDERS_NEW_LIST } from "../actions/types";

const defaultState = [];

export default (state = defaultState, action) => {
    switch(action.type) {
        case ORDERS_NEW_LIST:
            return action.payload;
        default:
            return state;
    }
}