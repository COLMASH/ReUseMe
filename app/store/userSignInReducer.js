import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SIGNIN_LOADING = "SIGNIN_LOADING";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_ERROR = "SIGNIN_ERROR";
export const SIGNIN_FINISHED = "SIGNIN_FINISHED";

const initialState = {
  email: "",
  password: "",
  signinFormLoading: false,
  signinFormError: false,
};

const storeData = async (value) => {
  try {
    await AsyncStorage.setItem("token", value);
    const token = await AsyncStorage.getItem("token");
  } catch (e) {
    console.log("e from storeData", e); //////////////////////////////////////////////////////////////////////////////////////////////////////
  }
};

export function userSignin(email, password, navigation) {
  return async function (dispatch) {
    try {
      dispatch({ type: SIGNIN_LOADING });
      const { data } = await axios({
        method: "POST",
        baseURL: "http://localhost:8000",
        url: "/user/signin",
        data: { email, password },
      });
      await storeData(data.token);
      navigation.navigate("ListingsScreen");
      dispatch({ type: SIGNIN_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: SIGNIN_ERROR, payload: error });
    } finally {
      dispatch({ type: SIGNIN_FINISHED });
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
    default: {
      return state;
    }
  }
}

export default userSignInReducer;
