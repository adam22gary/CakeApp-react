import { AUTH_TOKEN, DELETE_TOKEN, BASECAKES_LIST, BASECAKES_EDIT_LIST, INGREDIENTS_LIST, ORDERS_LIST, ORDERS_NEW_LIST, ORDERS_ALL_LIST, ORDERS_SHOW_LIST } from "./types";
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

export const setEditBaseCakes = (editBaseCakes) => {
    return {
        type: BASECAKES_EDIT_LIST,
        payload: editBaseCakes
    };
}

export const updateBaseCake = (recipe_name, total_people, description, ingredients_array, id) => {
    return async (dispatch, getState) => {
        const response = await LocalAPI.put(`/baseCakes/edit/${id}`, { recipe_name, total_people, description, ingredients_array });
        dispatch(setEditBaseCakes(response.data));
    } 
}

export const fetchEditBaseCakes = (id) => {
    return async (dispatch, getState) => {
        const response = await LocalAPI.get(`/baseCakes/edit/${id}`);
        //console.log(response.data);
        dispatch(setEditBaseCakes(response.data));
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
        const response = await LocalAPI.post(`/ingredients`, { 
            ingredients_name, 
            ingredients_quantity, 
            ingredients_measurement, 
            ingredients_price 
        });
        dispatch(setIngredients(response.data));
    } 
}

export const deleteIngredient = (item) => {
    return async (dispatch, getState) => {
        const response = await LocalAPI.delete(`/ingredients/${item}`);
        dispatch(setIngredients(response.data));
    } 
}

//Orders section!!!!
export const setNewOrders = (ordersNew) => {
    return {
        type: ORDERS_NEW_LIST,
        payload: ordersNew
    };
} 

export const setShowOrders = (ordersShow) => {
    return {
        type: ORDERS_SHOW_LIST,
        payload: ordersShow
    };
}

export const setOrders = (orders) => {
    return {
        type: ORDERS_LIST,
        payload: orders
    };
}

export const setAllOrders = (ordersAll) => {
    return {
        type: ORDERS_ALL_LIST,
        payload: ordersAll
    };
}

export const createOrder = (due_date, customer_name, total_people_new, order_description, recipe_name, ingredients_array, total_people, description, total_price) => {
    return async (dispatch, getState) => {
        const response = await LocalAPI.post(`/orders`, { due_date, customer_name, total_people_new, order_description, recipe_name, ingredients_array, total_people, description, total_price });
        dispatch(setOrders(response.data));
    } 
}

export const fetchBaseCakesForNew = (id) => {
    return async (dispatch, getState) => {
        const response = await LocalAPI.get(`/orders/new/${id}`);
        dispatch(setNewOrders(response.data));
    }
}

export const fetchOrders = () => {
    return async (dispatch, getState) => {
        const response = await LocalAPI.get(`/orders/showAll`);
        dispatch(setAllOrders(response.data));
    }
}

export const fetchShowOrders = (id) => {
    return async (dispatch, getState) => {
        const response = await LocalAPI.get(`/orders/show/${id}`);
        dispatch(setShowOrders(response.data));
    }
}

export const deleteOrder = (item) => {
    return async (dispatch, getState) => {
        const response = await LocalAPI.delete(`/orders/${item}`);
        dispatch(setAllOrders(response.data));
    } 
}


// export const fetchEditOrder = (id) => {
//     return async (dispatch, getState) => {
//         const response = await LocalAPI.get(`/orders/edit/${id}`);
//         //console.log(response.data);
//         dispatch(setEditOrder(response.data));
//     } 
// }

// export const updateOrder = (date, customer_name, recipe_name, total_people, ingredients_array, description, total_price, order_status, id) => {
//     return async (dispatch, getState) => {
//         const response = await LocalAPI.put(`/orders/edit/${id}`, { date, customer_name, recipe_name, total_people, ingredients_array, description, total_price, order_status });
//         dispatch(setEditOrder(response.data));
//     } 
// }
