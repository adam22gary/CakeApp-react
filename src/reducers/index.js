import { combineReducers } from "redux";
import authReducer from "./auth_reducer";
import baseCakesListReducer from "./baseCakes_list_reducer";
import baseCakes_edit_list_reducer from "./baseCakes_edit_list_reducer";
import ingredientsListReducer from "./ingredients_list_reducer";
import ordersListReducer from "./orders_list_reducer";
import ordersNewListReducer from "./orders_new_list_reducer";
import ordersShowListReducer from "./orders_show_list_reducer";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
    auth: authReducer,
    baseCakes: baseCakesListReducer,
    editBaseCakes: baseCakes_edit_list_reducer,
    ingredients: ingredientsListReducer,
    orders: ordersListReducer,
    ordersNew: ordersNewListReducer,
    ordersShow: ordersShowListReducer,
    form: formReducer
});