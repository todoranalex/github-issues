import {Issue} from '../../issues/types';
import useReducerMiddleware, {
  addBookmarkMiddleware,
  getBookmarksMiddleware,
  removeBookmarkMiddleware,
} from '../state/middlewares';
import bookmarksReducer, {initialState} from '../state/reducers';

export type BookmarksMiddlewareReducer = {
  bookmarks: Issue[];
  loading: boolean;
  addBookmark: (bookmark: Issue) => void;
  removeBookmark: (bookmark: Issue) => void;
  getBookmarks: () => void;
};

const useBookmarksReducer = (): BookmarksMiddlewareReducer => {
  const {state, dispatchMiddleware} = useReducerMiddleware(
    initialState,
    bookmarksReducer,
    [addBookmarkMiddleware, removeBookmarkMiddleware, getBookmarksMiddleware],
  );

  const addBookmark = (bookmark: Issue) =>
    dispatchMiddleware({type: 'add-bookmark'}, {bookmark});

  const removeBookmark = (bookmark: Issue) =>
    dispatchMiddleware({type: 'remove-bookmark'}, {bookmark});

  const getBookmarks = () => dispatchMiddleware({type: 'get-bookmarks'});

  return {
    ...state,
    addBookmark,
    removeBookmark,
    getBookmarks,
  };
};

export default useBookmarksReducer;
