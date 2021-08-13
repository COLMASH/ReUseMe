import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userSignInReducer from "./userSignInReducer";
import userSignUpReducer from "./userSignUpReducer";
import itemReducer from "./itemReducer";

const rootReducer = combineReducers({
  userSignUpReducer,
  userSignInReducer,
  itemReducer,
});

const middlewares = applyMiddleware(thunk);

const store = createStore(rootReducer, middlewares);

export default store;
