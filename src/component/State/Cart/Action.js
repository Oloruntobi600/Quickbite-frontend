

import { api } from "../../config/api";
import { ADD_ITEMS_TO_CART_FAILURE, ADD_ITEMS_TO_CART_REQUEST, ADD_ITEMS_TO_CART_SUCCESS, CLEAR_CART_FAILURE, CLEAR_CART_REQUEST, CLEAR_CART_SUCCESS, FIND_CART_FAILURE, FIND_CART_REQUEST, FIND_CART_SUCCESS, GET_ALL_CART_ITEMS_FAILURE, GET_ALL_CART_ITEMS_REQUEST, GET_ALL_CART_ITEMS_SUCCESS, REMOVE_CARTITEM_FAILURE, REMOVE_CARTITEM_REQUEST, REMOVE_CARTITEM_SUCCESS, UPDATE_CARTITEM_FAILURE, UPDATE_CARTITEM_REQUEST, UPDATE_CARTITEM_SUCCESS } from "./ActionTypes";

export const findCart = (token) => {
    return async (dispatch) => {
        dispatch({type:FIND_CART_REQUEST});
        try {
            const response = await api.get(`/api/cart`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("my cart", response.data)
            dispatch({type:FIND_CART_SUCCESS, payload:response.data});
        }catch (error) {
            console.log("error", error)
            dispatch({type:FIND_CART_FAILURE, payload:error});
        }
    };
};

export const getAllCartItems = (reqData) => {
    return async (dispatch) => {
        dispatch({type:GET_ALL_CART_ITEMS_REQUEST});
        try {
            const response = await api.get(`/api/carts/${reqData.cartId}/items`,{
                headers: {
                    Authorization: `Bearer ${reqData.token}`,
                },
            });
            dispatch({type:GET_ALL_CART_ITEMS_SUCCESS, payload:response.data});
        }catch (error) {
            dispatch({type:GET_ALL_CART_ITEMS_FAILURE, payload:error});
        }
    };
};

export const addItemToCart = (reqData) => {
    return async (dispatch) => {
        dispatch({type:ADD_ITEMS_TO_CART_REQUEST});
        try {
            const {data} = await api.put(`/api/cart/add`,reqData.cartItem,{
                headers: {
                    Authorization: `Bearer ${reqData.token}`,
                },
            });
            console.log("add item to cart ", data)
            dispatch({type:ADD_ITEMS_TO_CART_SUCCESS, payload:data.food.cartItems[0]});
        }catch (error) {
            console.log("catch error ", error)
            dispatch({type:ADD_ITEMS_TO_CART_FAILURE, payload:error.message});
        }
    };
};

export const updateCartItem = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_CARTITEM_REQUEST });
        const token = localStorage.getItem("jwt"); // Retrieve token from localStorage
        try {
            // console.log("Request data being sent/: ", reqData.data);

            const response = await api.put(`/api/cart-item/update`, reqData, {
                headers: {
                    Authorization: `Bearer ${token}`, // Ensure token is set
                    'Content-Type': 'application/json'
                },
            });
            console.log("update cartItem ", response.data);
            dispatch({ type: UPDATE_CARTITEM_SUCCESS, payload: response.data });
        } catch (error) {
            console.log("catch error ", error);
            dispatch({ type: UPDATE_CARTITEM_FAILURE, payload: error.message });
        }
    };
};
export const removeCartItem = ({cartItemId, jwt}) => {
    return async (dispatch) => {
        dispatch({type:REMOVE_CARTITEM_REQUEST});
        try {
            const {data} = await api.delete(`/api/cart-item/${cartItemId}/remove`,{
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("remove cartItem ", data)
            dispatch({type:REMOVE_CARTITEM_SUCCESS, payload:cartItemId});
        }catch (error) {
            console.log("catch error ", error)
            dispatch({type:REMOVE_CARTITEM_FAILURE, payload:error.message});
        }
    };
};

export const clearCartAction = () => {
    return async (dispatch) => {
        dispatch({type:CLEAR_CART_REQUEST});
        try {
            const {data} = await api.put(`/api/cart/clear`,{},{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
            });
            dispatch({type:CLEAR_CART_SUCCESS, payload:data});
            console.log("clear cart ", data)   
        }catch (error) {
            console.log("catch error ", error)
            dispatch({type:CLEAR_CART_FAILURE, payload:error.message});
        }
    };
};