import axios from "axios";

export const SIGNUP_LOADING = "SIGNUP_LOADING";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_ERROR = "SIGNUP_ERROR";
export const SIGNUP_FINISHED = "SIGNUP_FINISHED";

const initialState = {
  name: "",
  lastname: "",
  email: "",
  phone: "",
  password: "",
  signupFormLoading: false,
  signupFormError: false,
};

export function userSignup(name, lastname, email, phone, password, navigation) {
  return async function (dispatch) {
    try {
      dispatch({ type: SIGNUP_LOADING });
      const { data } = await axios({
        method: "POST",
        baseURL: "http://localhost:8000",
        url: "/user/signup",
        data: { name, lastname, email, phone, password },
      });
      console.log("data from userSignup", data); /////////////////////////////////////////////////////////////////////////////////////////////
      navigation.navigate("WelcomeScreen");
      dispatch({ type: SIGNUP_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: SIGNUP_ERROR, payload: error });
    } finally {
      dispatch({ type: SIGNUP_FINISHED });
    }
  };
}

function userSignUpReducer(state = initialState, action) {
  switch (action.type) {
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
    default: {
      return state;
    }
  }
}

export default userSignUpReducer;
