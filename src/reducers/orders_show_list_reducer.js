import { ORDERS_SHOW_LIST } from "../actions/types";

const defaultState = [];

export default (state = defaultState, action) => {
    switch(action.type) {
        case ORDERS_SHOW_LIST:
            return action.payload;
        default:
            return state;
    }
}