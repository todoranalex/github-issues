import React, {useReducer} from 'react';
import {Issue} from '../../../issues/types';
import {getBookmarks, toggleBookmark} from '../../tasks';
import {Action, BookmarksReducer, State} from '../reducers';

type MiddlewarePayload = {
  bookmarks?: Issue[];
  bookmark?: Issue;
};

type Middleware = (
  action: Action,
  dispatch: React.Dispatch<Action>,
  payload?: MiddlewarePayload,
) => void;

const useReducerMiddleware = (
  initialState: State,
  reducer: BookmarksReducer,
  middlewares: Middleware[],
) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const dispatchMiddleware = (action: Action, payload?: MiddlewarePayload) => {
    middlewares.map(middleware => middleware(action, dispatch, payload));
  };

  return {state, dispatchMiddleware};
};

export const getBookmarksMiddleware = async (
  action: Action,
  dispatch: React.Dispatch<Action>,
) => {
  if (action.type === 'get-bookmarks') {
    dispatch({type: 'get-bookmarks'});
    const bookmarks = await getBookmarks();
    dispatch({type: 'get-bookmarks-success', payload: {bookmarks}});
  }
};

export const addBookmarkMiddleware = async (
  action: Action,
  dispatch: React.Dispatch<Action>,
  payload?: MiddlewarePayload,
) => {
  if (action.type === 'add-bookmark' && payload?.bookmark) {
    const bookmark = payload.bookmark;
    dispatch({type: 'add-bookmark'});
    await toggleBookmark(bookmark);
    dispatch({type: 'add-bookmark-success', payload: {bookmark}});
  }
};

export const removeBookmarkMiddleware = async (
  action: Action,
  dispatch: React.Dispatch<Action>,
  payload?: MiddlewarePayload,
) => {
  if (action.type === 'remove-bookmark' && payload?.bookmark) {
    const bookmark = payload.bookmark;
    dispatch({type: 'remove-bookmark'});
    await toggleBookmark(bookmark);
    dispatch({type: 'remove-bookmark-success', payload: {bookmark}});
  }
};

export default useReducerMiddleware;
