import TIngredientProps from "../../utils/TIngredientProps.types";
import { getIngredients } from "../../utils/apiBackend";
import { Dispatch } from "redux";

export const GET_FEED: 'GET_FEED' = 'GET_FEED';
export const GET_FEED_FAILED: 'GET_FEED_FAILED' = 'GET_FEED_FAILED';
export const GET_FEED_SUCCESS: 'GET_FEED_SUCCESS' = 'GET_FEED_SUCCESS';

type GetFeedAction = {
  type: typeof GET_FEED;
}

type GetFeedSuccessAction = {
  type: typeof GET_FEED_SUCCESS;
  ingredients: TIngredientProps[];
}

type GetFeedFailedAction = {
  type: typeof GET_FEED_FAILED;
}

export type FeedActions = GetFeedAction | GetFeedSuccessAction | GetFeedFailedAction;

export function fetchIngredients() {

  return function(dispatch: Dispatch<FeedActions>) {

    dispatch({
      type: GET_FEED
    })

      getIngredients()
      .then(data => {
        dispatch({
          type: GET_FEED_SUCCESS,
          ingredients: data.data
        });
      })
      .catch(err => {
        console.error(`Произошла ошибка запроса: ${err}`)
        dispatch({
          type: GET_FEED_FAILED
        });
      });
    }
}