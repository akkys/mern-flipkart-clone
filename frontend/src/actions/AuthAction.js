import axiosInstance from "../helper/axios";
import { authConstants, cartConstants } from "./Constants";

export const login = (user) => {
  return async (dispatch) => {
    console.log(user);
    dispatch({ type: authConstants.LOGIN_REQUEST });
    const res = await axiosInstance.post("/signin", {
      ...user,
    });
    if (res.status === 200) {
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: authConstants.LOGIN_SUCCESS, payload: { token, user } });
    } else {
      if (res.status === 400) {
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

export const signup = (user) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.LOGIN_REQUEST });
      const res = await axiosInstance.post("/signup", {
        ...user,
      });
      if (res.status === 200) {
        const { message } = res.data;
        dispatch({ type: authConstants.LOGIN_SUCCESS, payload: { message } });
      } else {
        if (res.status === 400) {
          dispatch({
            type: authConstants.LOGIN_FAILURE,
            payload: { error: res.data.error },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({ type: authConstants.LOGIN_SUCCESS, payload: { token, user } });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: "Failed to login" },
      });
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_REQUEST });
    // localStorage.removeItem("user");
    // localStorage.removeItem("token");
    localStorage.clear();
    dispatch({
      type: authConstants.LOGOUT_SUCCESS,
    });
    dispatch({
      type: cartConstants.RESET_CART,
    });
    // const res = await axiosInstance.post("/signout");

    // if (res.status === 200) {
    //   localStorage.clear();
    //   dispatch({
    //     type: authConstants.LOGOUT_SUCCESS,
    //   });
    // } else {
    //   dispatch({
    //     type: authConstants.LOGOUT_FAILURE,
    //     payload: { error: res.data.error },
    //   });
    // }
  };
};
