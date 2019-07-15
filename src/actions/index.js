import { AUTH_TOKEN, DELETE_TOKEN, BASECAKES_LIST, INGREDIENTS_LIST } from "./types";
import LocalAPI from "./../apis/local";

//use for register and login
export const setAuthToken = (token) => {
    sessionStorage.setItem("token", token);
    return {
        type: AUTH_TOKEN,
        payload: token
    }
}

export const logoutAuthToken = () => {
    sessionStorage.clear("token");
    return {
        type: DELETE_TOKEN,
        payload: null
    }
}

//basecake Section!!!!!!!!!!!!!!!!!!!!
export const setBaseCakes = (baseCakes) => {
    console.log(baseCakes);
    return {
        type: BASECAKES_LIST,
        payload: baseCakes
    };
} 

export const fetchBaseCakes = () => {
    return async (dispatch, getState) => {
        const response = await LocalAPI.get("/baseCakes");
        dispatch(setBaseCakes(response.data));
    }
}

export const fetchShowBaseCakes = (id) => {
    return async (dispatch, getState) => {
        const response = await LocalAPI.get(`/baseCakes/show/${id}`);
        dispatch(setBaseCakes(response.data));
    }
}

export const createBaseCake = (recipe_name, total_people, description, ingredients_array) => {
    return async (dispatch, getState) => {
        const response = await LocalAPI.post(`/baseCakes`, { recipe_name, total_people, description, ingredients_array });
        dispatch(setBaseCakes(response.data));
    } 
}

// export const updateBaseCake = (recipe_name, total_people, description, ingredients_array, id) => {
//     return async (dispatch, getState) => {
//         const response = await LocalAPI.put(`/baseCakes/edit/${id}`, { recipe_name, total_people, description, ingredients_array });
//         dispatch(setBaseCakes(response.data));
//     } 
// }

export const fetchEditBaseCakes = (id) => {
    return async (dispatch, getState) => {
        const response = await LocalAPI.get(`/baseCakes/edit/${id}`);
        dispatch(setBaseCakes(response.data));
    } 
}

export const deleteBaseCake = (id) => {
    return async (dispatch, getState) => {
        const response = await LocalAPI.delete(`/baseCakes/${id}`);
        dispatch(setBaseCakes(response.data));
    } 
}

//ingredient Section!!!!!!!!!!!!!!!!!!!!
export const setIngredients = (ingredients) => {
    return {
        type: INGREDIENTS_LIST,
        payload: ingredients
    };
} 

export const fetchIngredients = () => {
    return async (dispatch, getState) => {
        const response = await LocalAPI.get("/ingredients");
        dispatch(setIngredients(response.data));
    }
}

export const createIngredient = (ingredients_name, ingredients_quantity, ingredients_measurement, ingredients_price) => {
    return async (dispatch, getState) => {
        const response = await LocalAPI.post(`/ingredients`, { ingredients_name, ingredients_quantity, ingredients_measurement, ingredients_price });
        dispatch(setIngredients(response.data));
    } 
}

export const deleteIngredient = (item) => {
    return async (dispatch, getState) => {
        const response = await LocalAPI.delete(`/ingredients/${item}`);
        dispatch(setIngredients(response.data));
    } 
}