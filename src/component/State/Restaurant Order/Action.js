
import axios from "axios";
import {
    UPDATE_ORDER_STATUS_REQUEST,
    UPDATE_ORDER_STATUS_SUCCESS,
    UPDATE_ORDER_STATUS_FAILURE,
    GET_RESTAURANTS_ORDER_REQUEST,
    GET_RESTAURANTS_ORDER_SUCCESS,
    GET_RESTAURANTS_ORDER_FAILURE,
} from "./ActionTypes";
import { api } from "../../config/api";

export const updateOrderStatus = ({orderId, orderStatus,jwt}) => {
    return async (dispatch) => {
        try {
            dispatch({type:UPDATE_ORDER_STATUS_REQUEST});

            if (!orderId || !orderStatus) {
                throw new Error("Invalid order ID or status");
            }

            const response = await api.put(
                `/api/admin/orders/${orderId}/${orderStatus}`, {} ,{
                 headers: {
                    Authorization: `Bearer ${jwt}`,
                 },
               }
            );

            const updatedOrder = response.data;
            dispatch({
                type: UPDATE_ORDER_STATUS_SUCCESS,
                payload: updatedOrder,
            });
        } catch (error) {
            console.log("catch error", error);
            dispatch({type:UPDATE_ORDER_STATUS_FAILURE, payload:error})
        }
    };
};

export const fetchRestaurantsOrder = ({restaurantId, orderStatus,jwt}) => {
    return async (dispatch) => {
        try {
            dispatch({type:GET_RESTAURANTS_ORDER_REQUEST});

            if (!restaurantId || typeof restaurantId !== 'number') {
                throw new Error("Invalid restaurant ID");
            }

            const response = await api.get(
                `/api/admin/order/restaurant/${restaurantId}` ,{
                 params: { order_status:orderStatus},
                 headers: {
                    Authorization: `Bearer ${jwt}`,
                 },
               }
            );

            const orders = response?.data;
            dispatch({
                type: GET_RESTAURANTS_ORDER_SUCCESS,
                payload: orders,
            });
        } catch (error) {
            dispatch({type:GET_RESTAURANTS_ORDER_FAILURE, error})
        }
    };
};