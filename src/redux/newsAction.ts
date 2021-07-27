import { Dispatch } from "redux";
import {

  INewsArr,
  INews,
} from "../models/types";
import { HttpClient } from "../components/service/httpRequest";
import { NEWS_ACTIONS } from "./constants";

interface IActionGetSubscriptions {
  type: "ADD_NEWS";
  payload: INews[];
}
const request = new HttpClient("http://localhost:8806");

export const getNews = (id: Number) => (dispatch: Dispatch) => {
  request
    .get(`news`)
    .then((response) =>
      dispatch({
        type: NEWS_ACTIONS.ADD_NEWS,
        payload: response.data,
      })
    )
    .catch((err) => console.error(err));
};

export const addNews = (payload: any, id: Number) => (dispatch: Dispatch) => {
  request
    .post(`news`, payload)
    .then((response) => {
      dispatch({
        type: NEWS_ACTIONS.ADD_NEWS,
        payload: response.data,
      });
    })
    .catch((err) => console.error(err));
};

export const deleteNews =
  (userId: Number, newsId: Number) => (dispatch: Dispatch) => {
    request
      .delete(`news/${newsId}`)
      .then((response) =>
        dispatch({
          type: NEWS_ACTIONS.DELETE_NEWS,
          payload: response,
        })
      )
      .catch((err) => console.error(err));
  };
export const editNews =
  (payload: any, userId: Number, newsId: Number) => (dispatch: Dispatch) => {
    request
      .edit(`news/${newsId}`, payload)
      .then((response) => {
        console.log("edited data", response.data);
        dispatch({
          type: NEWS_ACTIONS.EDIT_NEWS,
          payload: response,
        });
      })
      .catch((err) => console.error(err));
  };

export type Actions = IActionGetSubscriptions;
export type DispatchType = (args: INewsArr) => INewsArr;
