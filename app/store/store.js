import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducer from "./userReducer";
import itemReducer from "./itemReducer";

const rootReducer = combineReducers({
  userReducer,
  itemReducer,
});

const middlewares = applyMiddleware(thunk);

const store = createStore(rootReducer, middlewares);

export default store;
