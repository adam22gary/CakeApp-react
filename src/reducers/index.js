import { combineReducers } from "redux";
import authReducer from "./auth_reducer";
import baseCakesListReducer from "./baseCakes_list_reducer";
import ingredientsListReducer from "./ingredients_list_reducer";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
    auth: authReducer,
    baseCakes: baseCakesListReducer,
    ingredients: ingredientsListReducer,
    form: formReducer
});