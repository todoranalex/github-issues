import bookmarksReducer, {BookmarksDispatch, State} from './reducers';

// state & action & dispatch type
export type {
  State as BookmarksState,
  Action as BookmarksAction,
  BookmarksDispatch,
} from './reducers';

// reducer type
export type BookmarksReducer = [State, BookmarksDispatch];

//reducer initial state
export {initialState as bookmarksInitialState} from './reducers';

// reducer
export {bookmarksReducer};
