import { INGREDIENTS_LIST } from "../actions/types";

const defaultState = [];

export default (state = defaultState, action) => {
    switch(action.type) {
        case INGREDIENTS_LIST:
            return action.payload;
        default:
            return state;
    }
}