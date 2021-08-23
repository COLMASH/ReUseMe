import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducer from "./userReducer";
import itemReducer from "./itemReducer";
import messageReducer from "./messageReducer";

const rootReducer = combineReducers({
  userReducer,
  itemReducer,
  messageReducer,
});

const middlewares = applyMiddleware(thunk);

const store = createStore(rootReducer, middlewares);

export default store;
