import React, {createContext} from 'react';
import {
  bookmarksInitialState,
  bookmarksReducer,
  BookmarksReducer,
} from '../../bookmarks';
import {issuesInitialState, issuesReducer, IssuesReducer} from '../../issues';
import useThunkReducer from '../middlewares';

type StoreContext = {
  bookmarksThunkReducer: BookmarksReducer;
  issuesThunkReducer: IssuesReducer;
};

export const StoreContext = createContext<StoreContext>({} as StoreContext);

export const StoreProvider = ({
  bookmarksThunkReducer,
  issuesThunkReducer,
  children,
}: {
  bookmarksThunkReducer: BookmarksReducer;
  issuesThunkReducer: IssuesReducer;
  children: any;
}) => {
  return (
    <StoreContext.Provider value={{bookmarksThunkReducer, issuesThunkReducer}}>
      {children}
    </StoreContext.Provider>
  );
};

const Store = ({children}: {children: any}) => {
  const bookmarksThunkReducer = useThunkReducer(
    bookmarksReducer,
    bookmarksInitialState,
  );
  const issuesThunkReducer = useThunkReducer(issuesReducer, issuesInitialState);

  return (
    <StoreProvider
      children={children}
      issuesThunkReducer={issuesThunkReducer}
      bookmarksThunkReducer={bookmarksThunkReducer}
    />
  );
};

export default Store;
