import axios from "axios";

import authStorage from "../auth/storage";

export const SIGNIN_LOADING = "SIGNIN_LOADING";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_ERROR = "SIGNIN_ERROR";
export const SIGNIN_FINISHED = "SIGNIN_FINISHED";
export const SIGNUP_LOADING = "SIGNUP_LOADING";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_ERROR = "SIGNUP_ERROR";
export const SIGNUP_FINISHED = "SIGNUP_FINISHED";
export const USER_LOG_OUT = "USER_LOG_OUT";
export const GET_USER = "GET_USER";
export const UPDATE_USER = "UPDATE_USER";
export const USER_SUSCRIBE_ITEM = "USER_SUSCRIBE_ITEM";
export const USER_UNSUSCRIBE_ITEM = "USER_UNSUSCRIBE_ITEM";

const initialState = {
  signinFormLoading: false,
  signinFormError: false,
  signupFormLoading: false,
  signupFormError: false,
  user: {},
  userSuscribedItems: {},
};

export function userSignin(email, password) {
  return async function (dispatch) {
    try {
      dispatch({ type: SIGNIN_LOADING });
      const { data } = await axios({
        method: "POST",
        baseURL: "http://10.0.2.2:8000",
        url: "/user/signin",
        data: { email, password },
      });
      if (data.token) {
        authStorage.storeToken(data.token);
      }
      dispatch({ type: SIGNIN_SUCCESS, payload: data.user });
    } catch (error) {
      console.log(error);
      dispatch({ type: SIGNIN_ERROR, payload: error });
    } finally {
      dispatch({ type: SIGNIN_FINISHED });
    }
  };
}

export function userLogOut() {
  return async function (dispatch) {
    try {
      authStorage.removeToken();
      dispatch({
        type: USER_LOG_OUT,
        payload: {},
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function getUser() {
  return async function (dispatch) {
    try {
      const token = await authStorage.getToken();
      if (!token) return;
      const { data } = await axios({
        method: "GET",
        baseURL: "http://10.0.2.2:8000",
        url: "/user/userInfo",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: GET_USER,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function userSignup(name, lastname, phone, email, password) {
  return async function (dispatch) {
    try {
      dispatch({ type: SIGNUP_LOADING });
      const { data } = await axios({
        method: "POST",
        baseURL: "http://10.0.2.2:8000",
        url: "/user/signup",
        data: { name, lastname, phone, email, password },
      });
      if (data.token) {
        authStorage.storeToken(data.token);
      }
      dispatch({ type: SIGNUP_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: SIGNUP_ERROR, payload: error });
    } finally {
      dispatch({ type: SIGNUP_FINISHED });
    }
  };
}

export function updateUser(name, lastname, phone, email, image) {
  return async function (dispatch) {
    try {
      const token = await authStorage.getToken();
      if (!token) return;
      const data = new FormData();
      if (name) {
        data.append("name", name);
      }
      if (lastname) {
        data.append("lastname", lastname);
      }
      if (phone) {
        data.append("phone", phone);
      }
      if (email) {
        data.append("email", email);
      }
      if (image[0] === undefined || image[0] === "") {
        data.append("profilePicture", "");
      } else {
        data.append("profilePicture", {
          uri: image[0],
          name: "profilePicture.jpg",
          type: "image/png",
        });
      }
      const { data: user } = await axios({
        method: "PUT",
        baseURL: "http://10.0.2.2:8000",
        url: "/user/userUpdate",
        data,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch({
        type: UPDATE_USER,
        payload: user,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function userSuscribeItem(itemId) {
  return async function (dispatch) {
    try {
      const token = await authStorage.getToken();
      if (!token) return;
      const { data } = await axios({
        method: "PUT",
        baseURL: "http://10.0.2.2:8000",
        url: "/user/userSuscribeItems",
        data: {
          itemId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: USER_SUSCRIBE_ITEM,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function userUnsuscribeItem(itemId) {
  return async function (dispatch) {
    try {
      const token = await authStorage.getToken();
      if (!token) return;
      const { data } = await axios({
        method: "PUT",
        baseURL: "http://10.0.2.2:8000",
        url: "/user/userUnsuscribeItems",
        data: {
          itemId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: USER_UNSUSCRIBE_ITEM,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNIN_LOADING: {
      return {
        ...state,
        signinFormLoading: true,
      };
    }
    case SIGNIN_SUCCESS: {
      return {
        ...state,
        signinFormLoading: false,
        user: action.payload,
      };
    }
    case SIGNIN_ERROR: {
      return {
        ...state,
        signFormError: true,
      };
    }
    case SIGNIN_FINISHED: {
      return {
        ...state,
        signFormLoading: false,
      };
    }
    case USER_LOG_OUT: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case GET_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case SIGNUP_LOADING: {
      return {
        ...state,
        signupFormLoading: true,
      };
    }
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        signupFormLoading: false,
        user: action.payload,
      };
    }
    case SIGNUP_ERROR: {
      return {
        ...state,
        signupFormError: true,
      };
    }
    case SIGNUP_FINISHED: {
      return {
        ...state,
        signupFormLoading: false,
      };
    }
    case UPDATE_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case USER_SUSCRIBE_ITEM: {
      return {
        ...state,
        userSuscribedItems: action.payload,
      };
    }
    case USER_UNSUSCRIBE_ITEM: {
      return {
        ...state,
        userSuscribedItems: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export default userReducer;
