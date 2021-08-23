import axios from "axios";

import authStorage from "../auth/storage";

export const CREATE_MESSAGE = "CREATE_MESSAGE";
export const DELETE_MESSAGE = "DELETE_MESSAGE";

const initialState = {
  message: {},
};

export function createMessage(message, itemId) {
  return async function (dispatch) {
    try {
      const token = await authStorage.getToken();
      if (!token) return;
      const { data } = await axios({
        method: "POST",
        baseURL: "http://10.0.2.2:8000",
        url: "/message/messageCreate",
        data: {
          message,
          itemId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: CREATE_MESSAGE,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function deleteMessage(messageId) {
  return async function (dispatch) {
    try {
      const { data } = await axios({
        method: "DELETE",
        baseURL: "http://10.0.2.2:8000",
        url: "/message/messageDelete",
        data: {
          messageId,
        },
      });
      dispatch({
        type: DELETE_MESSAGE,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

function messageReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_MESSAGE: {
      return {
        ...state,
        message: action.payload,
      };
    }
    case DELETE_MESSAGE: {
      return {
        ...state,
        message: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export default messageReducer;
