import { ORDER_EDIT_LIST } from "../actions/types";

const defaultState = [];

export default (state = defaultState, action) => {
    switch(action.type) {
        case ORDER_EDIT_LIST:
            return action.payload;
        default:
            return state;
    }
}