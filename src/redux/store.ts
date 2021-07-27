import { createStore, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";
import { INewsArr } from "../models/types";
import { Actions, DispatchType } from "./newsAction";
import subscriptionReducer from "./reducer";

const store: Store<INewsArr, Actions> & {
  dispatch: DispatchType;
} = createStore(subscriptionReducer, applyMiddleware(thunk));

export default store;