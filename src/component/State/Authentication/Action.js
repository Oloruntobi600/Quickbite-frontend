// Actions.js
import axios from 'axios';
import { api, API_URL } from '../../config/api';
import { 
  ADD_TO_FAVORITE_FAILURE, ADD_TO_FAVORITE_REQUEST, ADD_TO_FAVORITE_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS,
  LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS 
} from './ActionTypes';

export const registerUser = (reqData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const { data } = await axios.post(`${API_URL}/auth/signup`, reqData.userData);
    if (data.jwt) localStorage.setItem('jwt', data.jwt);
    if (data.role === 'ROLE_RESTAURANT_OWNER') {
      reqData.navigate('/admin/restaurant');
    } else {
      reqData.navigate('/');
    }
    dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
    console.log('Register success', data);
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error });
    console.log('Error', error);
  }
};

export const forgotPassword = (email) => {
  return async (dispatch) => {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    
    try {
      const response = await axios.post(`${API_URL}/auth/forgot-password`, { email }); // Fixed backticks
      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: 'Password reset email sent successfully',
      });
      // Optionally, you can show a success message
    } catch (error) {
      dispatch({
        type: FORGOT_PASSWORD_FAILURE,
        payload: error.response?.data?.message || 'An error occurred', // Capture error message
      });
    }
  };
};

export const loginUser = (reqData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await axios.post(`${API_URL}/auth/signin`, reqData.userData);
    if (data.jwt) localStorage.setItem('jwt', data.jwt);
    if (data.role === 'ROLE_RESTAURANT_OWNER') {
      reqData.navigate('/admin/restaurants');
    } else {
      reqData.navigate('/');
    }
    dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
    console.log('Login success', data);
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error });
    console.log('Error', error);
  }
};

export const getUser = (jwt) => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  try {
    const { data } = await api.get('/api/users/profile', {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({ type: GET_USER_SUCCESS, payload: data });
    console.log('User profile', data);
  } catch (error) {
    dispatch({ type: GET_USER_FAILURE, payload: error });
    console.log('Error', error);
  }
};

export const addToFavorites = ({ jwt, restaurantId }) => async (dispatch) => {
  dispatch({ type: ADD_TO_FAVORITE_REQUEST });
  try {
    const { data } = await api.put(`/api/restaurants/${restaurantId}/add-favorites`, {}, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({ type: ADD_TO_FAVORITE_SUCCESS, payload: data });
    console.log('Added to favorites', data);
  } catch (error) {
    dispatch({ type: ADD_TO_FAVORITE_FAILURE, payload: error });
    console.log('Error', error);
  }
};

export const logout = () => async (dispatch) => {
  
  try {
    localStorage.clear();
    dispatch({ type: LOGOUT });
    console.log('Logout success');
  } catch (error) {
    console.log('Error', error);
  }
};


