import axios from "axios";

export const LIST_ITEMS = "LIST_ITEMS";

const initialState = {
  item=[],
};

function itemReducer(state = initialState, action) {
  switch (action.type) {
    case LIST_ITEMS: {
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
}

export default itemReducer;
