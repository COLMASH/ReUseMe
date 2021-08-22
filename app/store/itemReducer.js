import axios from "axios";

import authStorage from "../auth/storage";

export const GET_ALL_ITEMS = "GET_ALL_ITEMS";
export const GET_USER_ITEMS = "GET_USER_ITEMS";
export const CREATE_ITEM = "CREATE_ITEM";
export const SET_ITEM_LOCATION = "SET_ITEM_LOCATION";
export const DELETE_ITEM = "DELETE_ITEM";

const initialState = {
  item: {},
  items: {},
  itemLocation: {},
  userItems: {},
};

export function createItem(
  title,
  price,
  description,
  category,
  images,
  itemLocation
) {
  return async function (dispatch) {
    try {
      const token = await authStorage.getToken();
      if (!token) return;
      const data = new FormData();
      if (title) {
        data.append("title", title);
      }
      if (category) {
        data.append("category", category.label);
      }
      if (price) {
        data.append("price", price);
      }
      if (description) {
        data.append("description", description);
      }
      if (itemLocation.latitude) {
        data.append("latitude", itemLocation.latitude.toString());
      }
      if (itemLocation.longitude) {
        data.append("longitude", itemLocation.longitude.toString());
      }
      if (images[0]) {
        data.append("picture1", {
          uri: images[0],
          name: "image0.jpg",
          type: "image/jpg",
        });
      }
      if (images[1]) {
        data.append("picture2", {
          uri: images[1],
          name: "image1.jpg",
          type: "image/jpg",
        });
      }
      if (images[2]) {
        data.append("picture3", {
          uri: images[2],
          name: "image2.jpg",
          type: "image/jpg",
        });
      }
      const { data: item } = await axios({
        method: "POST",
        baseURL: "http://10.0.2.2:8000",
        url: "/item/itemCreate",
        data,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch({
        type: CREATE_ITEM,
        payload: item,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function getAllItems() {
  return async function (dispatch) {
    try {
      const { data } = await axios({
        method: "GET",
        baseURL: "http://10.0.2.2:8000",
        url: "/item/itemList",
      });
      dispatch({
        type: GET_ALL_ITEMS,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function setItemLocation(location) {
  return async function (dispatch) {
    try {
      dispatch({
        type: SET_ITEM_LOCATION,
        payload: location,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function getUserItems(userId) {
  return async function (dispatch) {
    try {
      const token = await authStorage.getToken();
      if (!token) return;
      const { data } = await axios({
        method: "GET",
        baseURL: "http://10.0.2.2:8000",
        url: "/item/itemInfo",
        data: {
          userId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: GET_USER_ITEMS,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function deleteItem(itemId) {
  return async function (dispatch) {
    try {
      const { data } = await axios({
        method: "DELETE",
        baseURL: "http://10.0.2.2:8000",
        url: "/item/itemDelete",
        data: {
          itemId,
        },
      });
      dispatch({
        type: DELETE_ITEM,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

function itemReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ITEMS: {
      return {
        ...state,
        items: action.payload,
      };
    }
    case GET_USER_ITEMS: {
      return {
        ...state,
        userItems: action.payload,
      };
    }
    case CREATE_ITEM: {
      return {
        ...state,
        item: action.payload,
      };
    }
    case SET_ITEM_LOCATION: {
      return {
        ...state,
        itemLocation: action.payload,
      };
    }
    case DELETE_ITEM: {
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload._id),
        userItems: state.userItems.filter(
          (item) => item._id !== action.payload._id
        ),
      };
    }
    default: {
      return state;
    }
  }
}

export default itemReducer;
