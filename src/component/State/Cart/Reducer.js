
import { LOGOUT } from "../Authentication/ActionTypes";
import * as actionTypes from "./ActionTypes";


const initialState = {
    cart: null,
    cartItems: [],
    loading: false,
    error: null,
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FIND_CART_REQUEST:
        case actionTypes.GET_ALL_CART_ITEMS_REQUEST:
        case actionTypes.UPDATE_CARTITEM_REQUEST:
        case actionTypes.REMOVE_CARTITEM_REQUEST:
        case actionTypes.ADD_ITEMS_TO_CART_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case actionTypes.FIND_CART_SUCCESS:
            console.log("FIND_CART_SUCCESS payload:", action.payload);
            return {
                ...state,
                loading: false,
                cart: action.payload,
                cartItems: action.payload.items || [],
            };

            case actionTypes.ADD_ITEMS_TO_CART_SUCCESS:
                console.log("ADD_ITEMS_TO_CART_SUCCESS payload:", action.payload);
                return {
                    ...state,
                    loading: false,
                    cartItems: [...state.cartItems, action.payload], // Ensure item is correctly integrated
            };

            case actionTypes.UPDATE_CARTITEM_SUCCESS:
            console.log("UPDATE_CARTITEM_SUCCESS payload:", action.payload);
                const cartItems = [...state.cart.item];
                const cartItemIndex = cartItems.findIndex(item => item.id === action.payload.id);
                cartItems.splice(cartItemIndex, 1, action.payload);
                const newState = {
                ...state,
                loading: false,
                cart: {
                ...state.cart,
                item: cartItems,
                total: cartItems.reduce((acc, value) => acc + value.totalPrice, 0),
                },
            };
            return newState;

        case actionTypes.REMOVE_CARTITEM_SUCCESS:
            console.log("REMOVE_CARTITEM_SUCCESS payload:", action.payload);
            return {
            ...state,
            loading: false,
            // cartItems: state.cartItems.filter((item) =>
        //     item.id !== action.payload
        //     ),
        //  };
            cartItems: state.cartItems.filter(item => item.id !== action.payload), // Remove item from the cartItems array
        };

        case actionTypes.CLEAR_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: [], // Clear cartItems on success
      };

         case actionTypes.FIND_CART_FAILURE:
         case actionTypes.UPDATE_CARTITEM_FAILURE:
         case actionTypes.ADD_ITEMS_TO_CART_FAILURE:
         case actionTypes.REMOVE_CARTITEM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case LOGOUT:
            localStorage.removeItem("jwt");
            return { ...state, cartItems:[], cart:null, success: "logout success"};
        default:
          return state; 
    }
};

export default cartReducer;