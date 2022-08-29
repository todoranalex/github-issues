import React from 'react';
import {Issue} from '../../../issues/types';
import {getBookmarks as getBookmarksTask, toggleBookmark} from '../../tasks';
import {Action} from '../reducers';

export const getBookmarks = () => async (dispatch: React.Dispatch<Action>) => {
  dispatch({type: 'get-bookmarks'});
  const bookmarks = await getBookmarksTask();
  dispatch({type: 'get-bookmarks-success', payload: {bookmarks}});
};

export const addBookmark =
  (bookmark: Issue) => async (dispatch: React.Dispatch<Action>) => {
    dispatch({type: 'add-bookmark'});
    await toggleBookmark(bookmark);
    dispatch({type: 'add-bookmark-success', payload: {bookmark}});
  };

export const removeBookmark =
  (bookmark: Issue) => async (dispatch: React.Dispatch<Action>) => {
    dispatch({type: 'remove-bookmark'});
    await toggleBookmark(bookmark);
    dispatch({type: 'remove-bookmark-success', payload: {bookmark}});
  };
