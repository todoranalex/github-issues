import {Issue} from '../../../issues/types';

export const initialState: State = {
  bookmarks: [],
  loading: true,
};

export type State = {
  bookmarks: Issue[];
  loading: boolean;
};

export type Action =
  | {
      type: 'get-bookmarks';
    }
  | {
      type: 'add-bookmark';
    }
  | {
      type: 'remove-bookmark';
    }
  | {
      type: 'get-bookmarks-success';
      payload: {
        bookmarks: Issue[];
      };
    }
  | {
      type: 'add-bookmark-success';
      payload: {
        bookmark: Issue;
      };
    }
  | {
      type: 'remove-bookmark-success';
      payload: {
        bookmark: Issue;
      };
    };

export type BookmarksReducer = (state: State, action: Action) => State;

const bookmarksReducer: BookmarksReducer = (
  state: State,
  action: Action,
): State => {
  switch (action.type) {
    case 'add-bookmark':
    case 'get-bookmarks':
    case 'remove-bookmark': {
      return {...state, loading: true};
    }
    case 'get-bookmarks-success': {
      return {bookmarks: action.payload.bookmarks, loading: false};
    }
    case 'add-bookmark-success': {
      return {
        ...state,
        bookmarks: [...state.bookmarks, action.payload.bookmark],
      };
    }
    case 'remove-bookmark-success': {
      return {
        ...state,
        bookmarks: [
          ...state.bookmarks.filter(
            x => x.number !== action.payload.bookmark.number,
          ),
        ],
      };
    }
  }
};

export default bookmarksReducer;
