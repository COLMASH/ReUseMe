import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SIGNIN_LOADING = "SIGNIN_LOADING";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_ERROR = "SIGNIN_ERROR";
export const SIGNIN_FINISHED = "SIGNIN_FINISHED";
export const USER_LOG_OUT = "USER_LOG_OUT";

const initialState = {
  email: "",
  password: "",
  signinFormLoading: false,
  signinFormError: false,
  user: {},
};

const storeData = async (value) => {
  try {
    await AsyncStorage.setItem("token", value);
    const token = await AsyncStorage.getItem("token");
    console.log(token);
  } catch (e) {
    console.log("error from storeData", e);
  }
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
        await storeData(data.token);
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
      dispatch({
        type: USER_LOG_OUT,
        payload: {},
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

function userSignInReducer(state = initialState, action) {
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
    default: {
      return state;
    }
  }
}

export default userSignInReducer;
