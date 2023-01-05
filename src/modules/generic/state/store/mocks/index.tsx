import React from 'react';
import {StoreProvider} from '..';
import {bookmarksReducer, bookmarksInitialState} from '../../../../bookmarks';
import {issuesReducer, issuesInitialState} from '../../../../issues';
import {mockIssue1, mockIssue2, mockIssue3} from '../../../../issues/mocks';
import useThunkReducer from '../../middlewares';

const StoreMock = ({children}: {children: any}) => {
  const bookmarksThunkReducer = useThunkReducer(bookmarksReducer, {
    ...bookmarksInitialState,
    bookmarks: [mockIssue1, mockIssue3],
  });
  const issuesThunkReducer = useThunkReducer(issuesReducer, {
    ...issuesInitialState,
    issues: [mockIssue1, mockIssue2, mockIssue3],
  });

  return (
    <StoreProvider
      children={children}
      issuesThunkReducer={issuesThunkReducer}
      bookmarksThunkReducer={bookmarksThunkReducer}
    />
  );
};

export default StoreMock;
