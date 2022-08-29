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

const Store = (props: any) => {
  const bookmarksThunkReducer = useThunkReducer(
    bookmarksReducer,
    bookmarksInitialState,
  );
  const issuesThunkReducer = useThunkReducer(issuesReducer, issuesInitialState);

  return (
    <StoreContext.Provider value={{bookmarksThunkReducer, issuesThunkReducer}}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default Store;
