import { INewsArr } from "../models/types";
import { Actions } from "./newsAction";
import { NEWS_ACTIONS } from "./constants";

const initialState: INewsArr = {
  news: []
};
export default function newsReducer(
  state: INewsArr = initialState,
  action: Actions
): INewsArr {
  switch (action.type) {
    case NEWS_ACTIONS.ADD_NEWS: {
      return { ...state, news: action.payload };
    }
    default:
      return state;
  }
}